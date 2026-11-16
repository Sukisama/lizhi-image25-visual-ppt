#!/usr/bin/env python3
"""Generate one slide with an explicitly selected GPT Image model."""
import argparse
import base64
import datetime
import json
import os
from pathlib import Path
import struct
import sys
import urllib.error
import urllib.request

MODELS = tuple(f"gpt-image-{version}-{variant}" for version in ("2.6", "2.5") for variant in ("sunburst", "flare"))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--prompt-file", required=True, type=Path)
    parser.add_argument("--out", required=True, type=Path)
    parser.add_argument("--model", choices=MODELS, default="gpt-image-2.6-sunburst")
    parser.add_argument("--quality", choices=("low", "medium", "high", "xhigh", "max", "auto"), default="max")
    parser.add_argument("--size", choices=("1536x864", "2560x1440"), default="2560x1440")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    prompt = args.prompt_file.read_text(encoding="utf-8").strip()
    if not prompt:
        parser.error("Prompt file is empty")
    sidecar = args.out.with_suffix(".generation.json")
    if args.out.suffix.lower() != ".png":
        parser.error("Output must end in .png")
    if args.out.exists() or sidecar.exists():
        parser.error("Output or generation record already exists; choose a new filename")
    settings = dict(model=args.model, size=args.size, quality=args.quality, output_format="png", n=1)
    if args.dry_run:
        print(json.dumps({"dry_run": True, **settings}))
        return
    key = os.environ.get("OPENAI_API_KEY")
    if not key:
        parser.error("OPENAI_API_KEY is required (use --dry-run for an offline check)")
    request = urllib.request.Request(
        "https://api.openai.com/v1/images/generations",
        data=json.dumps({**settings, "prompt": prompt}).encode(),
        headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=600) as response:
            result = json.load(response)
    except urllib.error.HTTPError as error:
        raise RuntimeError(f"Images API returned HTTP {error.code}; no retry or model fallback was attempted") from None
    data = base64.b64decode(result["data"][0]["b64_json"], validate=True)
    if data[:8] != b"\x89PNG\r\n\x1a\n" or len(data) < 24:
        raise ValueError("API did not return a valid PNG header")
    width, height = struct.unpack(">II", data[16:24])
    record = {"created_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
              "backend": "openai-images-api", "requested_model": args.model,
              "returned_model": result.get("model"), "size_requested": args.size,
              "width": width, "height": height, "quality": args.quality,
              "image": args.out.name}
    args.out.parent.mkdir(parents=True, exist_ok=True)
    with args.out.open("xb") as output:
        output.write(data)
    with sidecar.open("x", encoding="utf-8") as output:
        json.dump(record, output, ensure_ascii=False, indent=2)
    print(f"Saved {args.out} ({width}x{height}); record: {sidecar}")
    if (width, height) != tuple(map(int, args.size.split("x"))):
        print("Returned dimensions differ from requested size; inspect before packaging.", file=sys.stderr)


if __name__ == "__main__":
    try:
        main()
    except (OSError, ValueError, KeyError, IndexError, RuntimeError) as error:
        sys.exit(str(error))

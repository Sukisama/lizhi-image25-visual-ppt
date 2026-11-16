# Image backend

The skill keeps its requested name `lizhi-image25-visual-ppt`. Its quality-first default is now `gpt-image-2.6-sunburst`; do not interpret the name as a model pin.

## Selection

- Prefer `gpt-image-2.6-sunburst` for detailed slide compositions. Flare prioritizes speed. Keep one model across a deck unless explicitly changed.
- Use a host image tool only when it confirms the selected model. If its version is unknown, disclose that and use the API route when exact selection is required.
- The helper accepts 2.6 Sunburst/Flare and 2.5 Sunburst/Flare. Model availability errors stop the run; no automatic downgrade or paid retries.
- For final slides default to `quality=max`, `size=2560x1440`, PNG. Inspect the returned image dimensions and text; these settings do not guarantee error-free lettering.

## API route

Requires Python 3 and an existing `OPENAI_API_KEY` environment variable. Never embed keys in prompts, logs, files, or the repository. The helper calls the official Images API, one image per invocation. Generation uses separately billed API access.

Save the complete slide prompt as UTF-8 text. After blueprint approval:

```bash
python3 <skill-dir>/scripts/generate_slide.py \
  --prompt-file <project>/lizhi_image25_visual_ppt/prompts/P01.txt \
  --out <project>/lizhi_image25_visual_ppt/pages/P01-cover.png
```

Use `--dry-run` to validate and display only model/settings without making a request. Use `--model gpt-image-2.5-sunburst` only when 2.5 is explicitly wanted. Existing output files are refused; use a new filename for revisions. Each image receives a `.generation.json` sidecar recording requested model, returned model if supplied, dimensions, and settings; it never claims independent verification of a model the server does not return.

The helper is text-to-image. For supplied logos, reference images, or targeted corrections, use a verified host editing tool or the official Images edit API, preserving the requested model and original assets. Do not claim reference-image conditioning with this text-only helper. If that route is unavailable, finish the prompts and report the missing capability.

## Official sources

Checked 2026-11-16; recheck before changing model IDs or parameters:

- [Images 2.6 announcement](https://openai.com/index/introducing-images-2-6/)
- [Images API generation reference](https://developers.openai.com/api/reference/resources/images/methods/generate)
- [Image generation guide](https://developers.openai.com/api/docs/guides/image-generation)

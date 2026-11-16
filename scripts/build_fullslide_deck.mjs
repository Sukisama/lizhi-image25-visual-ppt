#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

function printHelp() {
  console.log(`Usage:
  node build_fullslide_deck.mjs --images-dir <dir> --out <deck.pptx> [options]

Options:
  --images-dir <dir>   Directory containing slide images.
  --out <file>         Output PPTX file.
  --layout <name>      PPT layout: wide or 4:3. Default: wide.
  --help               Show this help.

The script sorts PNG/JPG images by filename and creates one full-bleed image slide per file.
It intentionally adds no text boxes, shapes, notes, or branding.`);
}

function parseArgs(argv) {
  const args = {
    layout: "wide",
  };

  for (let i = 0; i < argv.length; i += 1) {
    const key = argv[i];
    if (key === "--help" || key === "-h") {
      args.help = true;
      continue;
    }

    const value = argv[i + 1];
    if (!value || value.startsWith("--")) {
      throw new Error(`Missing value for ${key}`);
    }

    if (key === "--images-dir") args.imagesDir = value;
    else if (key === "--out") args.out = value;
    else if (key === "--layout") args.layout = value;
    else throw new Error(`Unknown option: ${key}`);
    i += 1;
  }

  return args;
}

function loadPptxGen() {
  const candidatePaths = [
    process.cwd(),
    path.dirname(new URL(import.meta.url).pathname),
    path.join(os.homedir(), ".cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules"),
    path.join(os.homedir(), ".codex/node_modules"),
  ];

  for (const basePath of candidatePaths) {
    try {
      const resolved = require.resolve("pptxgenjs", { paths: [basePath] });
      const mod = require(resolved);
      return mod.default ?? mod;
    } catch {
      // Try the next known runtime location.
    }
  }

  throw new Error(
    "Cannot find pptxgenjs. Run with the Codex workspace Node runtime or install pptxgenjs in the current project.",
  );
}

function listImages(imagesDir) {
  const imagePattern = /\.(png|jpe?g)$/i;
  return fs
    .readdirSync(imagesDir)
    .filter((name) => imagePattern.test(name))
    .sort((a, b) => a.localeCompare(b, "zh-Hans-CN", { numeric: true }))
    .map((name) => path.join(imagesDir, name));
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  if (!args.imagesDir) throw new Error("--images-dir is required");
  if (!args.out) throw new Error("--out is required");

  const imagesDir = path.resolve(args.imagesDir);
  const outPath = path.resolve(args.out);

  if (!fs.existsSync(imagesDir) || !fs.statSync(imagesDir).isDirectory()) {
    throw new Error(`Images directory does not exist: ${imagesDir}`);
  }

  const images = listImages(imagesDir);
  if (images.length === 0) {
    throw new Error(`No PNG/JPG images found in: ${imagesDir}`);
  }

  const PptxGenJS = loadPptxGen();
  const pptx = new PptxGenJS();
  pptx.author = "Codex";
  pptx.company = "";
  pptx.subject = "Full-slide image deck";
  pptx.title = path.basename(outPath, path.extname(outPath));
  pptx.lang = "zh-CN";
  pptx.layout = args.layout.toLowerCase() === "4:3" ? "LAYOUT_4X3" : "LAYOUT_WIDE";
  pptx.theme = {
    headFontFace: "Aptos",
    bodyFontFace: "Aptos",
    lang: "zh-CN",
  };

  const slideWidth = args.layout.toLowerCase() === "4:3" ? 10 : 13.333333;
  const slideHeight = 7.5;

  for (const imagePath of images) {
    const slide = pptx.addSlide();
    slide.background = { color: "FFFFFF" };
    slide.addImage({
      path: imagePath,
      altText: path.basename(imagePath),
      objectName: `Slide image ${path.basename(imagePath)}`,
      x: 0,
      y: 0,
      w: slideWidth,
      h: slideHeight,
      sizing: { type: "cover", x: 0, y: 0, w: slideWidth, h: slideHeight },
    });
  }

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  await pptx.writeFile({ fileName: outPath });

  console.log(`Created ${outPath}`);
  console.log(`Slides: ${images.length}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

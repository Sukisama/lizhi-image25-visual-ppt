# Test Prompts

Use these prompts to sanity-check whether the skill triggers, separates content from style, and follows the image-first workflow.

## Test 1: Default Style

请把这个 8 页分享大纲做成 PPT：每页都必须用 image2.5 直接生成整页图，不要用 Python 或 PPT 文字排版拼。内容不能删减，最后给我 PPTX 和每页 PNG。

Expected: The agent first creates a standardized `content-blueprint.md` with a narrative arc and complete per-slide modules, presents it for confirmation, and stops before image generation. After explicit approval, it selects `blue-white`, generates each page image, and packages the images into a PPTX.

## Test 2: Explicit Blue-White Selection

把这份产品发布会讲稿做成 10 页图片式 PPT，选择蓝白商务信息图风格。内容不是白皮书，但页面要精致、信息密度高。

Expected: The agent selects `blue-white` based on visual direction and does not treat “whitepaper” as the content or style requirement.

## Test 3: Reference Style Without Brand Leakage

参考我给的 PPT 截图，把这份行业研究报告做成 12 页演示稿。只学习配色、排版和视觉语言，不要沿用截图里的公司名、logo 或文案。每页都用 image2.5 生成完整图。

Expected: The agent inspects the reference, extracts reusable style traits, avoids copying brand-specific material, and uses image generation for complete slide images.

## Test 4: Uninstalled Style

把这份课程大纲做成一套复古杂志风图片式 PPT，以后我还想重复用这种风格。

Expected: Because the requested reusable preset is not installed and no reference is supplied, the agent asks for a reference or permission to design and register a new preset instead of silently calling it `blue-white`.

## Test 5: Raw Long-Form Source

我给你的是一篇 8000 字行业文章，不是 PPT 大纲。请不要直接按段落切页。先把它整理成 12 页高密度 PPT 的逐页内容方案，再用 image2.5 出图。

Expected: The agent derives a thesis and audience journey, creates a 12-page content blueprint with one dominant thesis and two to five visualizable modules per slide, checks callbacks and unsupported claims, then waits for approval before visual generation.

## Test 6: Explicit Confirmation Waiver

这是最终版大纲，内容已经确认。不要再停下来问我，直接按默认蓝白风格用 image2.5 生成并打包 PPT。

Expected: The agent validates the blueprint but treats the explicit instruction as a confirmation waiver and proceeds directly to image generation without an extra checkpoint.

## Test 7: Quality-First Default

用默认最好的模型做这份蓝白 PPT，直接生成。

Expected: Select gpt-image-2.6-sunburst with max quality. Do not infer the model from a tool name; use the API helper if the host cannot confirm it. Do not silently downgrade on access errors.

## Test 8: Explicit 2.5

这次必须用 GPT Image 2.5 Sunburst。

Expected: Explicit selection overrides the 2.6 default and records requested_model=gpt-image-2.5-sunburst.

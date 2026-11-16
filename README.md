# 栗知 · Visual PPT

技能名：`lizhi-image25-visual-ppt`。把文章、讲稿、报告或大纲整理成逐页内容方案，再由图像模型生成每一页完整画面，最后封装为 PPTX。

名称保留 image25；按「质量优先」要求，当前默认模型为 **GPT Image 2.6 Sunburst**，API 默认 `max` 质量、`2560×1440`。可明确指定 2.5 Sunburst。模型可用性取决于运行环境和账号权限。

- 默认蓝白商务信息图，另含 WorkBuddy 白绿样式。
- 保留必需内容、核对中文和数字，每页 PPTX 只有一张整页图片。
- 先交付内容方案供确认；已明确要求直接生成时继续执行。
- 不把模型名写进提示词就当作已经切换模型；无法核实内置工具版本时明确说明。

## 安装与使用

将本仓库克隆到客户端的 skills 目录，确保 `SKILL.md` 位于技能目录根部，例如：

```bash
git clone https://github.com/Sukisama/lizhi-image25-visual-ppt.git ~/.codex/skills/lizhi-image25-visual-ppt
```

已有该目录时不要覆盖，先更新已有安装。重新启动客户端后调用：

```text
用 $lizhi-image25-visual-ppt 把这份大纲做成蓝白高密度 PPT，保留全部要点，先给我逐页内容方案。
```

技能兼容可读取 `SKILL.md` 的 Agent；具体发现方式因客户端而异。

## 依赖与脚本

在仓库目录执行 `npm install`，安装 PPTX 封装依赖。API 生成脚本仅需要 Python 3 标准库及已配置的 `OPENAI_API_KEY`，单独按 API 用量计费。使用可核实模型版本的内置生图工具时不需要这个脚本。

```bash
python3 scripts/generate_slide.py --prompt-file /path/to/P01.txt --out /path/to/P01.png --dry-run
python3 scripts/generate_slide.py --prompt-file /path/to/P01.txt --out /path/to/P01.png
node scripts/build_fullslide_deck.mjs --images-dir /path/to/pages --out /path/to/deck.pptx
```

第一条离线检查参数，第二条实际生成一页并保存模型请求记录，第三条按文件名数字顺序打包。图片式 PPT 中的文字不是原生可编辑文本；不要承诺中文零错误。参考图和 logo 的使用需要具备参考图输入能力的生成或编辑工具；随附 API 脚本仅支持文生图。

流程：[SKILL.md](SKILL.md) · 模型接入：[image25-backend.md](references/image25-backend.md) · 样式：[style-catalog.md](references/style-catalog.md)

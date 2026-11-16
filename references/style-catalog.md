# Style Catalog

Choose one installed preset for the whole deck unless the user explicitly requests a mixed-style deck.

## Default

- `blue-white`

## Installed Presets

| Preset ID | Name | Use when | Reference |
|---|---|---|---|
| `blue-white` | 蓝白商务信息图 | The user asks for blue-white, light technology, consulting, polished business, or does not specify a style | `styles/blue-white.md` |
| `workbuddy-white-green` | WorkBuddy 白绿品牌风 | The user asks for WorkBuddy brand style, white-green, teal-green, fresh product style, or Tencent WorkBuddy training material | `styles/workbuddy-white-green.md` |

The default preset remains `blue-white` unless the user explicitly asks to change it. Whitepapers, reports, speeches, proposals, and other content types may all use this style; content type and visual style are separate choices.

## Registration Rule

For each new reusable style:

1. Create one file under `references/styles/`.
2. Add one row to the installed preset table.
3. State its trigger language clearly enough to distinguish it from the other presets.
4. Do not change the default unless the user explicitly asks.

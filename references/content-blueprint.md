# High-Density Slide Content Blueprint

This reference defines the content-engineering format that should exist before any slide image is generated. Its purpose is to convert raw material into page-level instructions strong enough that image generation is designing, not guessing.

## Why This Format Produces Better Slides

1. **One page, one dominant thesis.** High density remains readable because every module serves the same question or conclusion.
2. **Narrative before pagination.** Slides form an argument: establish context, explain mechanisms, expose tension, offer an answer, prove it, elevate the insight, and close.
3. **Information hierarchy is explicit.** Titles, module heads, evidence, takeaway copy, and visual emphasis are separated before design begins.
4. **Content is already visualizable.** Tables, comparisons, timelines, cards, pyramids, maps, processes, and cases give the image model a concrete composition instead of a paragraph to decorate.
5. **Evidence and interpretation are paired.** Numbers or facts answer “what happened”; the takeaway answers “so what”.
6. **Page purpose controls density.** A definition page, tension page, solution page, and closing page should not all use the same layout.
7. **Callbacks create a whole deck.** A clue introduced early can become a tension or answer later, making the deck feel authored rather than assembled.
8. **Exact copy and boundaries reduce model drift.** Mandatory wording, assets, and avoid rules are decided before generation.

## Deck-Level Blueprint

Start the Markdown file with:

```markdown
# [Deck title] · Content Blueprint ([N] slides)

> **Purpose**: [What this deck must accomplish]
> **Core thesis**: [The single sentence the audience should remember]
> **Audience**: [Who will see it and what they already know]
> **Context**: [Presentation, proposal, course, report, internal review, etc.]
> **Slide count / duration**: [N slides / N minutes]
> **Available evidence**: [Reports, interviews, cases, data, user-provided facts]
> **Content constraints**: [Must include / must avoid / cannot invent]

## Narrative Arc

| Stage | Slides | Audience movement |
|---|---|---|
| Opening | P1 | Why should I care? |
| Definition / context | P2–P? | What is happening? |
| Mechanism / evidence | P?–P? | Why is it happening and how does it work? |
| Tension / problem | P?–P? | Where does the apparent story break? |
| Answer / proof | P?–P? | What resolves the problem and why believe it? |
| Elevation / close | P?–PN | What larger conclusion should I carry away? |

## Planned Callbacks

- P[ ] introduces [signal] → P[ ] turns it into [tension] → P[ ] resolves it with [answer].
```

Adapt the arc to the source. Do not force every deck into the same number of stages, but make the progression explicit.

## Per-Slide Blueprint

Use this structure for every slide:

```markdown
# P[N] · [Slide title] ([2–5 content modules])

> **Page mission**: [One sentence: what the audience must understand, feel, or remember after this page]
> **Role in the arc**: [Opening / definition / mechanism / evidence / tension / answer / proof / elevation / close]

**▶ [Module 1: definition / key claim / question]**
- [Required content]
- [Required content]

**▶ [Module 2: comparison / data / process / case]**
| [Use a table when comparison is the information] |
|---|
| ... |

**▶ [Module 3: evidence / implication / example]**
- [Required content]

**【Key takeaway】**
[The one sentence that interprets the page; this is not merely another fact.]

**【Exact copy】**
- Title: “...”
- Critical label / number / quote: “...”

**【Layout plan】**
- [Example: left 40% definition and diagram; center 30% comparison; right 30% data cards]
- [State hierarchy, not just decoration]

**【Visual elements】**
- [Diagram, scene, icons, metaphor, user-supplied image, logo if requested]

**【Constraints】**
- [No invented data / no old brand / no QR code / preserve specified wording / etc.]

**【Source】** (optional unless required for accuracy or external publication)
- [User-supplied source]
```

## Content Density Rules

- Use **two to five modules** on most inner slides. One module is usually too sparse; more than five often becomes a wall of fragments.
- Combine modules only when they answer the same page-level question. Do not merge unrelated topics merely to reduce slide count.
- Prefer compact evidence forms:
  - definition + model
  - before/after comparison
  - three-stage timeline
  - four-quadrant matrix
  - layered pyramid
  - numbered process
  - data cards + interpretation
  - problem / cause / answer
  - case + mechanism + result
- Pair each evidence-heavy page with a clear takeaway. A page full of numbers without interpretation is a data dump.
- Use prose only where voice, story, or nuance matters. Convert list-like prose into visible structure.
- Cover and closing slides can be sparse. Density should serve the page mission, not become a universal decoration rule.

## Narrative Quality Check

Before visual generation, verify:

- Can every slide be summarized in one sentence?
- Does every content module support that sentence?
- Does each slide create a reason to see the next one?
- Are definition, evidence, tension, answer, and conclusion distinguishable?
- Is there at least one deliberate callback in a deck longer than six slides?
- Are data and claims traceable to supplied material, or clearly marked as interpretation?
- Are title, takeaway, and layout hierarchy explicit enough that a designer would not need to guess?
- Has content type been kept separate from visual style?

## What Not to Copy From the Exemplar

The reusable value is the structure, not any former project wording, brand, event, data, source, logo, or color palette. Always rebuild the blueprint from the current source material.

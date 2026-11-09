# Visual-First Deep Learning Experience — Design Contract V1

**Scope:** Lessons 1.1.1 and 1.1.2, with a reusable foundation for later lessons.  
**Principle:** Visual structure and learner participation should make deep technical explanations *easier to understand*, not replace them.

## Problem this redesign solves

The previous authored lesson pages rendered large portions of each canonical Markdown section inside a single bordered text region, with substantial simulations often positioned *after* the prose. Although the content was technically deep, reading felt like traversing a pasted manuscript rather than exploring an engineering mechanism. Small navigation typography and a long vertical section list compounded the problem.

The new rendering creates three progressively deeper layers:

1. **Orient visually:** a nine-stage route and a section-specific engineering question establish where the learner is and why the topic matters.
2. **Explore actively:** a clickable causal/authority/source model gives every concept a role, an explanation, explicit evidence status and a counterexample. Existing richer simulations/challenges are placed ahead of the deep reading in relevant sections.
3. **Read fully with control:** every authored Markdown block remains available, organized into short reading beats. Learners may use **Guided steps** for progressive disclosure or **Read all** to review the complete original text in separated, readable panels.

This is a **presentation transformation**, not an abridgement or replacement of the authoritative manuscript.

## Source-of-truth boundaries

- \`content/lessons/1.1.1.md\`: unchanged authoritative technical content (13 sections).
- \`content/lessons/1.1.2.md\`: unchanged authoritative technical content (14 sections).
- \`src/lessons/lesson111/scenes.ts\`: 13 curated, domain-specific interactive visual models. These represent business authority **assumptions**; not production runtime evidence.
- \`src/lessons/lesson112/scenes.ts\`: 14 curated, use-case-specific diagrams, with clear **IN CODE / FUTURE / OPEN / MODEL** labels. Java code/evidence links remain pinned to an immutable verified application commit.
- \`src/lessons/shared/StoryCanvas.tsx\`: reusable reading-beat parser and interactive diagram inspector. It is not a content summarizer.
- \`src/lessons/shared/StageJourney.tsx\`: a stage-level visual map preserving the order of actual learning stages, not an invented forced sequence.

The diagrams describe causal or conceptual relationships, not automatically calls between deployed services. A clickable model and “What changes if…?” contrast are educational tools. They do not execute Java or validate merchant/payment contracts. **Actual Java test evidence remains separately identified** in Lesson 1.1.2.

## Learner interactions and accessibility

For each authored section:

- Select **any diagram node** to inspect its specific authority, decision, mechanism, limitation or evidence classification.
- Reveal **What changes if…?** to confront an adversarial assumption; hide it when returning to the main model.
- In sections with real learning labs, change inputs, predict outcomes, inspect timelines and diagnoses **before** reading the full textual explanation.
- Choose **Guided steps** to read manageable consecutive passages. Select a numbered beat directly or use Previous idea / Next idea.
- Choose **Read all** to browse every original Markdown passage, in original order, without editorial deletion.
- Use **Check your understanding** for an explicit retrieval question and a revealable core distinction.
- Use the nine-stage route to jump between Orient, Understand, Explore, Predict, Engineer/Diagnose, Verify, Defend and Retain while the detailed section navigation remains available.

Controls use native buttons, clear selected states, keyboard-focus styling, readable type sizing, semantic regions, responsive layouts and a reduced-motion rule. The existing dark/light theme applies across the design.

## Fidelity and regression gates

\`src/lessons/shared/StoryCanvas.test.tsx\` checks that splitting the canonical Markdown into reading beats **preserves the complete ordered sequence of blocks** for all 27 sections, with exactly one authored diagram per section. It tests that the accessible diagram and reading controls render.

\`e2e/story-reading.spec.ts\` exercises actual Chromium interactions in both lessons, including changing a diagram node, showing a counterexample, navigating reading beats, switching to full text and retaining the existing scenario lab.

\`e2e/lesson-responsive.spec.ts\` checks the two lesson routes at a narrow phone viewport, stage navigation, theme switching, and unexpected whole-page horizontal overflow.

The original lesson-specific browser tests, the Phase 0 race-lab tests, content audits, TypeScript checks and production build remain part of the required regression suite.

## Future lesson authoring contract

Do not generate another static markdown-as-a-page view. Every fully authored lesson should:

1. Preserve authoritative technical explanations in versioned source, including caveats, alternative mechanisms and failure windows.
2. Create an intentional section map derived from the lesson's engineering questions and dependencies rather than a generic decorative diagram.
3. Make every visual node explain a real mechanism or authority boundary; distinguish implemented, hypothetical and unresolved pathways.
4. Present concrete scenario changes and causal consequences before the comprehensive technical reading, where pedagogically appropriate.
5. Allow the learner to access **all** source content, with reading assistance that does not silently discard nuance.
6. Include prediction, diagnosis, evidence interpretation, Staff-level defense and transfer exercises suited to the topic.
7. Verify mobile and desktop routing, accessibility of controls, source fidelity, test coverage, project evidence links and actual executed backend boundaries.

The goal is to become *more technically understandable* as the curriculum grows, not merely prettier.

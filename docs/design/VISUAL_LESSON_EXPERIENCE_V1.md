# Visual-First Deep Learning Experience — Design Contract V1

**Scope:** Lessons 1.1.1 and 1.1.2, with a reusable foundation for later lessons.  
**Principle:** Visual structure and learner participation should make deep technical explanations *easier to understand*, not replace them.

## Problem this redesign solves

The previous authored lesson pages rendered large portions of each canonical Markdown section inside a single bordered text region, with substantial simulations often positioned *after* the prose. Although the content was technically deep, reading felt like traversing a pasted manuscript rather than exploring an engineering mechanism. Small navigation typography and a long vertical section list compounded the problem.

The new rendering creates three progressively deeper layers:

1. **Orient visually:** an expandable chapter/lesson/section outline in the single primary sidebar and a section-specific engineering question establish where the learner is and why the topic matters.
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
- Expand a chapter in the global left menu, choose a lesson, and expand its authored study sections (including Orient, Understand, Explore, Predict, Engineer/Diagnose, Verify, Defend and Retain). Selecting a section changes the deep-linkable `?section=N` query without hiding content behind a second navigation rail.

Controls use native buttons, clear selected states, keyboard-focus styling, readable type sizing, semantic regions, responsive layouts and a reduced-motion rule. The existing dark/light theme applies across the design.

## Fidelity and regression gates

\`src/lessons/shared/StoryCanvas.test.tsx\` checks that splitting the canonical Markdown into reading beats **preserves the complete ordered sequence of blocks** for all 27 sections, with exactly one authored diagram per section. It tests that the accessible diagram and reading controls render.

\`e2e/story-reading.spec.ts\` exercises actual Chromium interactions in both lessons, including changing a diagram node, showing a counterexample, navigating reading beats, switching to full text and retaining the existing scenario lab.

\`e2e/lesson-responsive.spec.ts\` checks the two lesson routes at a narrow phone viewport, primary-sidebar expansion, section deep linking, theme switching, and unexpected whole-page horizontal overflow.

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

## Navigation and reading-space revision (2026-11-09)

The original visual-first redesign still had redundant navigation: the global sidebar listed chapters, while each lesson body displayed a second **Study Journey** sidebar and a nine-stage strip. That consumed space better used for interactive diagrams and explanatory writing.

The revised contract uses **one** left navigation tree:

- **Chapter** expands/collapses in the global sidebar and offers an overview link.
- **Lesson** is a direct link. Authored lessons can expand their sections; blueprint-only lessons do not fabricate authored section navigation.
- **Section** is a direct link with a `?section=N` query. The selected section is highlighted with `aria-current`, and browser history/direct links work.
- The active chapter and lesson expand automatically when navigating. Explicit manual expansion does not change lesson content until a lesson/section link is followed.
- On narrow screens the tree lives in the mobile drawer, which closes when a section is selected.

**Body-space rule:** the entire lesson is one wide reading canvas (with normal responsive page padding). Neither an internal study sidebar nor a large stage strip appears in the lesson body. A compact title and progress indicator remain; all visual learning, source-linked engineering and descriptive material are preserved.

**Evidence/fidelity:** the original 27 lesson manuscript sections, diagrams, simulations, labs, acceptance and Java evidence are unchanged. New regression tests check sidebar expansion, deep linking, browser history, keyboard interaction, mobile, theme and full-width geometry. The separate Food Ordering Platform is unchanged.

## Semantic reading typography and editorial annotations (2026-11-09)

The deep explanation is not displayed as a pasted Markdown page. Every canonical Markdown block is preserved byte-for-byte within its source segment, but is organized into deliberately distinct visual roles:

- **Core concept (teal):** definition or fundamental distinction that subsequent ideas depend on.
- **How it works (blue):** a causal mechanism, decision chain or code-execution explanation.
- **Worked example (violet):** the concrete business situation that instantiates an abstract principle.
- **Important limit (amber):** non-guarantee, invalid inference, counterexample, or missing authority.
- **Evidence & scope (green):** what a test, model or business assertion can genuinely establish.
- **Try this (rose):** a meaningful prediction, transfer or retrieval task.

Color is only a supplementary signal: every highlighted passage has a visible text label, a concise editorial heading, a context note explaining **why it matters**, and appropriate semantic markup. Ordinary paragraphs remain clean, book-like prose with a comfortable reading measure, generous line-height and contrast. Avoid boxing or coloring every sentence.

Each of 27 lesson sections has exactly three manually authored, source-indexed highlight annotations. The anchors live in `src/lessons/shared/readingEditorial.ts`, independent of the authoritative Markdown. They are not assigned using random keywords or automatic sentiment classification. Unit tests fail when an anchor is invalid or points to a heading; when the underlying manuscript changes, update the editorial map intentionally.

**Navigation:** a compact 'Three moments worth understanding' strip jumps to the reading step containing an anchored concept. Reading-step titles prefer authored editorial titles rather than clipped raw paragraph beginnings. The existing left sidebar remains the only chapter/lesson/section navigation, while local reading controls operate only within the active explanation.

**Comfort controls:** A− / A+ for modest font enlargement, Comfort width / Wider text, Highlights on/off, Guided steps / Read all. All controls are keyboard-operable and use React state without storing or transmitting learner data. Hiding annotations never changes the source paragraphs; the user can always restore them. In full mode all paragraphs remain in canonical order. The same renderer is reused in both lessons and supports dark, light and narrow screens.

**Evidence boundary:** the reading cues are explanatory annotations, not extra domain facts or a replacement for sources. React models remain illustrations; only executed Java tests and live HTTP verification can support the previously reported backend evidence.

**Regression gates:** the existing source-fidelity test retains every Markdown block in original order. New checks validate all 81 editorial anchors, semantic rendering, toggle behavior, font size, the reading route, full-source mode, desktop and mobile interaction, existing lesson simulations and Java source links. A green build alone is insufficient; Chromium must render and interact with the reading interface.

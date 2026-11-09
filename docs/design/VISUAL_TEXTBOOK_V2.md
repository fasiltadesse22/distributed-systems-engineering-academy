# Visual Textbook V2 — Design Contract and Rebuild Checkpoint

## Purpose

Improve understanding of complex distributed-systems engineering without reducing technical depth. The earlier reading surface had a stack of compulsory interactive models, highlighted-moment cards, separate reading modes, nested bordered passages and repeated navigators. Learners had to manage the interface before following the engineering argument.

The Order Flow Trading Academy was inspected as a high-level reference for continuous instructional material and intentionally placed laboratories. This implementation is not a copy of its trading curriculum or UI.

## Core design

1. Continuous reading is the default. Both complete authored manuscripts appear in the correct order, with no reading-step gates.
2. A single expandable chapter, lesson and topic outline in the left sidebar. Source sections are addressable through query-string topic links; no second in-body navigation rail.
3. Restrained typography and whitespace establish hierarchy. Long conceptual arguments remain prose; special figures appear only where there is a genuine comparison, multi-step mechanism or distinct evidence level.
4. Source-anchored technical figures make dense material scan-able: capabilities versus use cases, decision/fact authority, an eight-step PlaceOrder intake flow, and the AC-01–AC-07 acceptance outcomes.
5. Meaningful labs are embedded after related source passages, not required before the learner can read. Prediction, variation, evidence and diagnosis are kept where input affects reasoning.
6. Dark/light themes, mobile styles, visible focus and keyboard-operable controls remain supported.

## Source integrity and implementation

Canonical lesson source files are content/lessons/1.1.1.md and content/lessons/1.1.2.md. Neither is modified by the redesign. The single shared renderer is src/lessons/shared/TextbookReader.tsx, styled by textbook.css. Its section titles derive from the existing subject-first sectionNavigation module. Section query parameters point to on-page anchors.

Only explicitly mapped source sections/blocks are eligible for structural figures. The figure parser verifies ordered markers and falls back to the unchanged paragraph if a source changes. The original paragraph is inspectable underneath the figure. Remaining prose receives only non-semantic spacing and paragraph grouping; its claim, words and order are unchanged.

The retired card reader, compulsory clickable scene maps, paragraph-margin annotation system, legacy reading-step styles and related obsolete tests have been removed. Domain modeling and lab implementations remain intact, including the separate Race Lab. Existing laboratory styles are retained only where the exercise components still use them.

## Business and engineering truth

Lesson 1.1.1 is domain discovery and conceptual authority reasoning, not a Java runtime feature. Lesson 1.1.2 is linked to the unchanged Java 21/Spring Boot executable PlaceOrder intake checkpoint at commit 08b33714431a53f6b1cb1e1e09718b0281da1ce8.

A new request produces an intake resource, not restaurant acceptance or financial processing. Restaurant decision is PENDING and payment status is NOT_STARTED. The Java implementation uses a fictional catalog and process-local non-durable storage. React scenarios are educational models, not provider or merchant integrations.

## Quality gates

Complete source coverage across 27 topics; source-block fidelity and authored structural markers; no unsupported business assertions; preserved exercise behavior; precise immutable Java source links; TypeScript; unit/model/component tests; production build; desktop and narrow/mobile Chromium; sidebar deep links and browser history; dark/light styling; keyboard navigability and no blank-startup regression. Any failing check is reported rather than described as passed.

## Reuse for future lessons

Write explanations before UI. Choose a sequence diagram for ordered operations, a comparison for independent concepts, a state model for legal transitions, and a small interactive lab only where varying inputs teaches a causal principle. Do not produce an unrelated card for every paragraph. Maintain authoritative source text, local business scope and executed evidence labels.


## Lesson 1.1.3 application of the V2 design contract (2026-11-09)

The commands/decisions/facts lesson reuses the single continuous reader and chapter→lesson→topic sidebar, adding only one static six-boundary process visualization and one input-consequential prediction lab inside the appropriate passages. Long technical prose remains readable and fully authored; source-backed Markdown tables classify business messages, rejections, facts and acknowledgements. No compulsory concept cards or extra reading modes are introduced. The deterministic lab is distinguished from the pinned 18-test Java execution evidence and from external merchant/provider facts.

# Distributed Systems Engineering Academy — React V0.1

A React + TypeScript interactive learning academy for **evidence-driven distributed systems architecture and system design**.

## Authoritative sources

- [Master Roadmap V1.0](docs/roadmap/MASTER_ROADMAP_V1.md) — complete 19-phase, 93-cluster mastery boundary.
- [Cluster 1.1 Deep-Learning Blueprint V0.1](docs/blueprints/CLUSTER_1_1_BLUEPRINT_V0_1.md) — 4 chapters, 20 lesson specifications, requirements coverage, 5 laboratory briefs, and Java evolution sequence.
- [Visual-first deep learning design contract](docs/design/VISUAL_LESSON_EXPERIENCE_V1.md) — interactive diagrams, guided or full reading, and fidelity/accessibility requirements.
- [Authored Lesson 1.1.1](content/lessons/1.1.1.md) — 13-section actor authority manuscript and interactive exercises.
- [Authored Lesson 1.1.2](content/lessons/1.1.2.md) — 14-section use-case discovery, real Java trace and scenario/acceptance labs.
- [Applied Lesson 1.1.2 Java walkthrough](docs/engineering/LESSON_1_1_2_APPLIED_WALKTHROUGH.md) — verified Java code, tests, 201/422 runtime evidence and design alternatives.
- [Lesson 1.1.1 Domain Discovery Contract](docs/domain/CLUSTER_1_1_LESSON_1_1_1_DOMAIN_DISCOVERY.md) — actors, capabilities, decision authority, scenarios and open policy questions.
- [Learning progress](docs/progress/LEARNING_PROGRESS.md) — current verified checkpoints.
- [Dual-Repository Contract](docs/contracts/DUAL_REPOSITORY_EXECUTION_CONTRACT_V1.md) — independent Git histories, verification rules, evidence language.

## Run the academy

Requires Node.js 22+ and npm.

~~~bash
npm install
npm run dev
~~~

Open the Vite development URL displayed by the terminal.

## Verify the academy

~~~bash
npm run check:content
npm run typecheck
npm run test
npm run build
npm run test:e2e  # requires Playwright Chromium installed
~~~

GitHub Actions runs the same checks for every push and pull request. Inspect the actual results; an unexecuted or failing test is not verification.

## Interactive visual learning (Lessons 1.1.1 and 1.1.2)

**Navigation:** the global left menu expands chapters and their lessons, then the authored lesson's study sections. The entire body width is dedicated to visual diagrams, interactive labs, and descriptive reading. Direct links such as `/#/lesson/1.1.2?section=8` are bookmarkable and support browser back/forward. On mobile, open the main menu to navigate; selecting a section closes it and returns to the lesson content.


Instead of displaying the manuscripts as long text blocks, both lesson routes use an expandable **Chapter → Lesson → Section** outline in the application's primary left sidebar, with 27 author-curated clickable causal/authority diagrams, revealable counterexamples, and interactive exercises ahead of guided reading. **Guided steps** shows smaller passages, while **Read all** displays every original authored block in sequence. Neither option removes technical depth. Conceptual and Java-implemented claims are labeled separately. Browser tests cover both formats, source fidelity, and phone usability.

## Deep explanation: editorial reading layer

The **Deep explanation** pane in each authored lesson is now an intentionally formatted technical reader, not a raw Markdown block. The original source text remains authoritative and complete. Each lesson section has exactly **three author-selected reading cues** with specific roles: **Core concept** (definition), **How it works** (causal mechanism), **Worked example** (application), **Important limit** (non-guarantee), **Evidence & scope** (what is actually demonstrated), or **Try this** (active reasoning). These cues use restrained color, semantic labels, and explanatory margin notes, not indiscriminate decoration.

At the start of an explanation, **Three moments worth understanding** provides quick jumps to the selected concepts. **Guided steps** presents shorter consecutive ideas with meaningful editorial titles; **Read all** shows every original source block in order with the same annotations. Reader controls let learners increase text size, widen the reading measure, or turn highlighting off without dropping source material. Dark/light mode and mobile layouts remain supported.

The curated editorial anchors are defined in `src/lessons/shared/readingEditorial.ts`; `ReadingArticle.tsx` renders source-preserving prose plus margin guidance. Tests validate the anchor positions across all 27 sections, original Markdown block ordering, both reading modes, and browser interactions. **Color has an explicit learning purpose rather than representing a business status or actual runtime evidence.**

## Implemented foundation

- Responsive React application with dark/light mode, hash-based deep links, one expandable chapter/lesson/section sidebar, direct links to specific reading sections, and search across 93 roadmap clusters and 20 lesson plans.
- Complete master roadmap reader; phase and cluster detail explorer linked to the authoritative V1.0 Markdown.
- Cluster 1.1 blueprint reader with chapter/lesson plans, prerequisite concept explorer, traceability, project evolution, exit criteria and lab catalog.
- **Lesson 1.1.1 fully authored and integrated**: 13 navigable deep-learning sections, editable actor-capability/authority atlas, branchable Food Ordering business journey, prediction-before-reveal ownership challenges, incident evidence explorer, and audience-adapted technical defense.
- **Lesson 1.1.2 interactive deep learning**: use-case explorer, branching scenario, acceptance tests, source-linked Java execution trace, diagnostic evidence room and Staff defense.
- Reusable lesson reader for **remaining planned lessons**, displaying technical scope, prerequisites, mechanism traces, examples, experiments, engineering classification, diagnosis, and interview mastery criteria. **Lessons 1.1.1 and 1.1.2 are fully authored; later lessons remain blueprint specifications.**
- Controlled cancellation-versus-acceptance simulator. Change interleavings and guard strategy, predict success/failure, then reveal a causal execution timeline and invariant diagnosis.
- Pure deterministic simulator unit tests, content integrity checks and CI workflow.

## What is not yet delivered

The remaining Lesson 1.1.3–1.1.20 teaching manuscripts, the other four Cluster 1.1 lab implementations, persisted learner progress, merchant acceptance, external payments, and production durability are not yet delivered. The interleaving lab is an **educational model**, not a Java test result.

## Companion application

The [Food Ordering Platform](https://github.com/fasiltadesse22/food-ordering-platform-new) is maintained independently. Its [verified intake implementation](https://github.com/fasiltadesse22/food-ordering-platform-new/tree/08b33714431a53f6b1cb1e1e09718b0281da1ce8) provides a real Java 21/Spring Boot 4.1.2 application with [13 Maven tests and live 201/422 HTTP smoke](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/42514283048).

## Project layout

- src/App.tsx — React navigation and roadmap/blueprint/lesson readers.
- src/data/roadmap.ts — import of authoritative roadmap source and typed blueprint data.
- content/cluster-1.1/blueprint.json — structured source of chapter and lesson specifications.
- src/components — interactive lab and visual primitives.
- src/simulation/race.ts — pure, deterministic model separated from the UI.
- scripts/check-content.mjs — source and blueprint integrity checks.
- .github/workflows/academy-verify.yml — GitHub verification workflow.

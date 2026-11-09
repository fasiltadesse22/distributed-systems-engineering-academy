# Distributed Systems Engineering Academy — Visual Textbook V2

A React + TypeScript interactive learning academy for **evidence-driven distributed systems architecture and system design**.

## Authoritative sources

- [Master Roadmap V1.0](docs/roadmap/MASTER_ROADMAP_V1.md) — complete 19-phase, 93-cluster mastery boundary.
- [Cluster 1.1 Deep-Learning Blueprint V0.1](docs/blueprints/CLUSTER_1_1_BLUEPRINT_V0_1.md) — 4 chapters, 20 lesson specifications, requirements coverage, 5 laboratory briefs, and Java evolution sequence.
- [Visual Textbook V2 design contract](docs/design/VISUAL_TEXTBOOK_V2.md) — continuous reading, source integrity, purposeful visuals and contextual laboratories.
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

## Visual Textbook V2 — an uncluttered technical reader

Both complete lessons now read continuously on one calm page: 13 authored topics in Lesson 1.1.1, 14 in Lesson 1.1.2. The expandable Chapter → Lesson → Topic left menu stays the only lesson navigation. Bookmarkable links such as /#/lesson/1.1.2?section=3 scroll to their real heading; browser back/forward remains functional.

The new reader does not impose a separate concept map, compulsory click-to-reveal panels, three takeaway cards, or a guided-step toggle in every section. It reserves diagrams and structure for knowledge that needs them: a compact four-definition comparison, a permanently readable eight-stage Java intake flow, independently listed acceptance criteria, decision rights and competing hypotheses. Original paragraphs remain available beside those presentations.

Interactive tools still appear **within** the relevant authored explanation: actor authority, business workflow, use-case discovery, scenario modeling, acceptance evidence, Java source tracing, diagnosis, defense and transfer. They retain their distinction between conceptual teaching and executed Java behavior.

The original manuscripts are unchanged; tests audit their sections, source blocks and source-anchored editorial figures. For architecture and implementation details, see the [V2 reading design contract](docs/design/VISUAL_TEXTBOOK_V2.md).

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

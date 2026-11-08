# Distributed Systems Engineering Academy — React V0.1

A React + TypeScript interactive learning academy for **evidence-driven distributed systems architecture and system design**.

## Authoritative sources

- [Master Roadmap V1.0](docs/roadmap/MASTER_ROADMAP_V1.md) — complete 19-phase, 93-cluster mastery boundary.
- [Cluster 1.1 Deep-Learning Blueprint V0.1](docs/blueprints/CLUSTER_1_1_BLUEPRINT_V0_1.md) — 4 chapters, 20 lesson specifications, requirements coverage, 5 laboratory briefs, and Java evolution sequence.
- [Authored Lesson 1.1.1](content/lessons/1.1.1.md) — 13-section deep-learning manuscript with interactive authority, business workflow, diagnostics and communication exercises.
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

## Implemented foundation

- Responsive React application with dark/light mode, hash-based deep links, sidebar and chapter navigation, and search across 93 roadmap clusters and 20 planned lessons.
- Complete master roadmap reader; phase and cluster detail explorer linked to the authoritative V1.0 Markdown.
- Cluster 1.1 blueprint reader with chapter/lesson plans, prerequisite concept explorer, traceability, project evolution, exit criteria and lab catalog.
- **Lesson 1.1.1 fully authored and integrated**: 13 navigable deep-learning sections, editable actor-capability/authority atlas, branchable Food Ordering business journey, prediction-before-reveal ownership challenges, incident evidence explorer, and audience-adapted technical defense.
- Reusable lesson reader for **remaining planned lessons**, displaying technical scope, prerequisites, mechanism traces, examples, experiments, engineering classification, diagnosis, and interview mastery criteria. **Only Lesson 1.1.1 is currently fully authored.**
- Controlled cancellation-versus-acceptance simulator. Change interleavings and guard strategy, predict success/failure, then reveal a causal execution timeline and invariant diagnosis.
- Pure deterministic simulator unit tests, content integrity checks and CI workflow.

## What is not yet delivered

The remaining Lesson 1.1.2–1.1.20 teaching manuscripts, the other four Cluster 1.1 lab implementations, persistent learner progress tracking, real Java application execution, payment provider integration, and genuine backend experiment evidence are not yet delivered. The interleaving lab is an **educational model**, not a Java test result.

## Companion application

The [Food Ordering Platform](https://github.com/fasiltadesse22/food-ordering-platform-new) is maintained independently. Its [immutable planning baseline](https://github.com/fasiltadesse22/food-ordering-platform-new/tree/2258cb1b8fc788a2ca8e35a2419e031fddbcb0eb) contains documentation only. The first meaningful, verified Spring Boot application change is assigned to Lesson 1.1.2.

## Project layout

- src/App.tsx — React navigation and roadmap/blueprint/lesson readers.
- src/data/roadmap.ts — import of authoritative roadmap source and typed blueprint data.
- content/cluster-1.1/blueprint.json — structured source of chapter and lesson specifications.
- src/components — interactive lab and visual primitives.
- src/simulation/race.ts — pure, deterministic model separated from the UI.
- scripts/check-content.mjs — source and blueprint integrity checks.
- .github/workflows/academy-verify.yml — GitHub verification workflow.

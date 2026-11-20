# Distributed Systems Engineering Academy — Visual Textbook V2

React 19 · TypeScript · Vite · **continuous, desktop-first distributed-systems learning**. This is an educational application, not an operational merchant/payment system. The [Food Ordering Platform](https://github.com/fasiltadesse22/food-ordering-platform-new) evolves independently in Java/Spring Boot.

## Current learning state

The authoritative [Master Roadmap V1](docs/roadmap/MASTER_ROADMAP_V1.md) covers **19 phases and 93 clusters**. The [Cluster 1.1 blueprint](docs/blueprints/CLUSTER_1_1_BLUEPRINT_V0_1.md) defines **20 planned lessons** in four chapters. **Lessons 1.1.1–1.1.8 are fully authored and interactive**: eight canonical manuscripts, **152 topics**, and **34 embedded contextual laboratories**. Lessons 1.1.9–1.1.20 remain blueprint-only.

| Authored lesson | Topics | Canonical source |
|---|---:|---|
| 1.1.1 · Actors and authority | 13 | [Manuscript](content/lessons/1.1.1.md) |
| 1.1.2 · Business use cases | 14 | [Manuscript](content/lessons/1.1.2.md) |
| 1.1.3 · Commands, decisions, facts | 16 | [Manuscript](content/lessons/1.1.3.md) |
| 1.1.4 · Business identity and authority | 16 | [Manuscript](content/lessons/1.1.4.md) |
| 1.1.5 · Connected business workflows | 22 | [Manuscript](content/lessons/1.1.5.md) |
| 1.1.6 · Independent lifecycle models | 19 | [Manuscript](content/lessons/1.1.6.md) |
| 1.1.7 · Guards, preconditions, postconditions | 26 | [Manuscript](content/lessons/1.1.7.md) |
| 1.1.8 · Reversal, compensation and irreversible effects | 26 | [Manuscript](content/lessons/1.1.8.md) |

The [progress ledger](docs/progress/LEARNING_PROGRESS.md) is the *only current lesson-status register*. [Historical checkpoints](checkpoints/LESSON_1_1_8.md) record what was verified in a specific earlier revision.

## Run and verify

Use **Node 22** and npm. The committed `package-lock.json` pins the dependency graph; use a clean install.

```bash
npm ci
npm run dev
```

Open the local Vite URL displayed in the terminal (normally http://localhost:5173), and navigate to `/#/lesson/1.1.8`.

```bash
npm run check:content       # roadmap, blueprint, manuscript hashes, coverage and internal links
npm run check:governance    # current lesson progress and structural coverage
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e           # desktop Chromium acceptance (after npm ci)
```

CI uses `npm ci`, source/coverage governance checks, TypeScript, Vitest, production build and Chromium Playwright. Browser verification targets desktop/laptop; new mobile-specific tests are intentionally **not required**.

## Visual Textbook V2

The complete Markdown lessons remain the canonical text. The reader keeps one uninterrupted reading surface, ample body width, restrained diagrams, integrated prediction-before-reveal exercises, dark/light themes, and **one expandable Chapter → Lesson → Topic sidebar**. Lessons are registered once in [the typed lesson registry](src/lessons/registry.tsx). The registry holds editorial labels, stable topic IDs, baseline numerical link mappings, build-time-resolved lesson components and exact source-passage lab anchors.

Existing links such as `/#/lesson/1.1.7?section=14` continue working. Preferred stable links use `?topic=<topic-id>`; the numeric mapping is deliberately frozen so future inserted topics do not redirect earlier bookmarks to different meanings. Invalid source anchors are detectable in CI and visual content remains accessible as a fallback.

This is **not** a new reading mode, LMS, backend, or generic visual-framework migration. [Visual Textbook V2 design contract](docs/design/VISUAL_TEXTBOOK_V2.md) remains authoritative.

## Evidence and engineering boundaries

Academy scenarios may be purely conceptual, Java-backed pure models, or references to executed Java evidence; these are **not equivalent**. Selected [reviewed parity fixtures](content/evidence/java-model-parity.json) pin immutable Java model SHAs/tests and separate local candidate facts from external effect claims. The [blueprint traceability map](content/coverage/cluster-1.1-authored.json) contains structural pointers, **not automatic expert certification of technical depth**.

The actual Java application remains a **single deployable** with process-local request intake and pure illustrative independent merchant/payment/preparation models; it does not provide durability, customer idempotency, external merchant acceptance, captured payment, refunds or fulfilled orders. The [latest verified Java business implementation](https://github.com/fasiltadesse22/food-ordering-platform-new/tree/8c5e5144b40adbd8679f4fe3f8046020b0279d2b) passed [59 JUnit tests and packaged HTTP 201/422 smoke](https://github.com/fasiltadesse22/food-ordering-platform-new/actions/runs/44745491071). POL-01–POL-10 remain [unresolved](docs/domain/CLUSTER_1_1_LESSON_1_1_5_DECISION_BACKLOG.md).

## Architecture, documentation and next lesson

- [Current academy architecture](docs/architecture/ACADEMY_CURRENT_STATE.md) — actual modules, dependencies and non-guarantees.
- [Visual Textbook V2](docs/design/VISUAL_TEXTBOOK_V2.md) — reader, styling and diagram contract.
- [Academy lesson-authoring governance](docs/governance/LESSON_AUTHORING.md) — exact preflight, registry, anchors, evidence and verification.
- [Dual-repository contract](docs/contracts/DUAL_REPOSITORY_EXECUTION_CONTRACT_V1.md) — independent histories and executable evidence semantics.
- [Coverage and manuscript baselines](content/coverage/cluster-1.1-authored.json) — structurally checked requirements and unchanged source blobs.
- [Governance stabilization checkpoint](checkpoints/PRE_1_1_8_ACADEMY_ARCHITECTURE_STABILIZATION.md) — implementation/evidence record.

Do not interpret an academy simulation or conceptual diagram as executed Java, source-authorized financial effects, or approved business policy. Lesson **1.1.8** is merged and post-merge verified; the next lesson is **1.1.9**, not started.

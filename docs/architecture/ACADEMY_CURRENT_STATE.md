# Current Academy Architecture — Through Lesson 1.1.8

**Purpose:** current capabilities, data ownership and non-guarantees. This is not a copy of the full manuscripts, an ADR or an historical checkpoint.

**Current verified lesson implementation:** academy merged `main` `c162becb4c54fd7ab84bdcc95664f9317f4d4fae`, Java read-only `081d1f1a877772e41d7a30ce0052e9609c71f6b5`. [Lesson 1.1.8 checkpoint](../../checkpoints/LESSON_1_1_8.md) records post-merge CI, and the [earlier governance checkpoint](../../checkpoints/PRE_1_1_8_ACADEMY_ARCHITECTURE_STABILIZATION.md) remains historical. Revalidate both current `main` SHAs before future execution.

## Actual modules and authoritative sources

| Layer | Source | Role and authority |
|---|---|---|
| Learning scope | `docs/roadmap/MASTER_ROADMAP_V1.md` and `content/cluster-1.1/blueprint.json` | 19-phase/93-cluster roadmap; 20 planned lessons in Cluster 1.1 |
| Full canonical text | `content/lessons/1.1.1.md` through `1.1.8.md` | Eight manuscripts (152 sections); earlier seven untouched, independent of React |
| Authored registry | `src/lessons/registry.tsx` | One typed authored catalog with editorial labels, stable topic IDs, old numerical link identity, lab source anchors and build-time component path references |
| Source-fidelity baseline | `content/coverage/manuscript-baselines.json` | Git blob SHA of each original manuscript; changes require deliberate source review |
| Blueprint trace | `content/coverage/cluster-1.1-authored.json` | Structural pointers to existing topics/tests, **not proof of pedagogical adequacy** |
| React reader | `src/lessons/shared/TextbookReader.tsx` | Continuous source rendering and exact topic/lab placement; original text accessible |
| Lesson visuals | `src/lessons/lesson111/` … `lesson118/` | Domain-specific diagrams, scenarios and prediction models; NOT Java execution |
| Application shell | `src/App.tsx`, `src/components/CourseOutline.tsx` | One Chapter → Lesson → Topic sidebar and hash router |
| Java evidence | `content/evidence/java-model-parity.json` and pinned source/CI URLs | Reviewed scenario correspondence only; NO Java runtime is executed in academy CI |
| CI / quality | `scripts/check-content.mjs`, `scripts/check-academy-governance.mjs`, `scripts/check-progress-governance.mjs`, Vitest, Playwright | Source, metadata, application and desktop Chromium regression gates |

## Stability contracts

- A topic has stable `id`, exact original `heading`, concise editorial `nav`, and frozen `legacySection` for pre-stabilization `?section=N` links. New stable links are `?topic=<id>`. An inserted topic may omit a historic index; old links must continue locating the original meaning.
- Each contextual lab has a stable `topicId`, `id`, descriptive `label` and a source-passage `marker`. The renderer places it by matching the marker, not by assuming the paragraph count. If an anchor cannot be found, the interactive lab and full source remain available with a visible diagnostic; governance tests must fail so CI prevents silent drift.
- The base V2 reader still preserves legacy `#topic-N` anchors and `data-testid` identities for desktop browser regressions. The retired guided-card reading mode and second navigation rail are not reintroduced.
- `sectionNavigation.ts` is now a compatibility view of the one registry, not a second authored-title source.
- The registry contains only UI component paths; `src/lessons/lessonComponents.tsx` resolves them eagerly through Vite's build-time glob. The sidebar never imports the UI modules and direct navigation has no lazy-loading gap.
- Reproducibility: committed npm lockfile, `npm ci`, Node 22 CI; existing Rollup `4.68.4` override preserved.

## Evidence and non-guarantees

Lesson 1.1.8 adds six conceptual effects, eight prediction variants, an undo-versus-compensate inspector, and a source-fact/forward-remedy timeline; no new Java effect or real compensation exists. Conceptual React models do not run Java or external systems. A locally simulated payment/merchant/kitchen state is NOT a payment, source-authoritative merchant commitment or real preparation. Source-pinned Java tests establish narrow code properties, not arbitrary distributed resilience. `content/evidence/java-model-parity.json` maps reviewed Java pure-model fixtures only and never runs the Java test suite in academy CI. POL-01–POL-10 remain [unresolved](../domain/CLUSTER_1_1_LESSON_1_1_5_DECISION_BACKLOG.md). The separately governed [Java platform current-state index](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/main/docs/architecture/CURRENT_STATE.md) is authoritative for Java capabilities.

## Deliberately deferred

No CMS, backend learner accounts, Java clone in CI, microservices, generic diagram framework, forced CSS redesign, full-text search, persistent learner progress, mobile-specific new E2E tests, automated instructional correctness determination, or unapproved business behavior. Existing `src/App.tsx` still owns multiple overview pages; extracting them is deferred unless measured coupling justifies change. Desktop automated checks cannot alone certify human learning effectiveness.

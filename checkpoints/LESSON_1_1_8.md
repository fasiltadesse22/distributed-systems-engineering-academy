# Lesson 1.1.8 — Terminal, reversible and irreversible business effects

**Roadmap:** Master Roadmap V1 · Cluster 1.1 · Chapter 2 · Lesson 1.1.8.  
**Derived blueprint:** `docs/blueprints/CLUSTER_1_1_BLUEPRINT_V0_1.md` and `content/cluster-1.1/blueprint.json`.  
**Execution class:** **C conceptual/analysis + D academy learning integration**. No Java source changes justified.
**Engineering question:** When is “undo” a genuine reversal and when is a new compensation required?

## Immutable baselines and merged implementation

- Academy starting `main`: `b8867b08a3211a174c5c7e1f585e775e18f371ef`.
- Java read-only starting and ending `main`: `081d1f1a877772e41d7a30ce0052e9609c71f6b5`.
- Academy [implementation PR #12](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/pull/12), feature tip `95545f9fe9b69f78ce39103f9e2004e316d2c288`, **merged main** `c162becb4c54fd7ab84bdcc95664f9317f4d4fae`.
- Implementation [feature standard CI 44788957718](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/44788957718), **PASS** 83/83 Vitest over 19 files, canonical content, governance fixtures, TypeScript and Vite build.
- Implementation [feature Chromium CI 44788957696](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/44788957696), **PASS** 56/56 Playwright tests, including four new Lesson 1.1.8 browser tests and prior lessons.
- **Post-merge** [standard CI 44789327526](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/44789327526), **PASS**, [desktop Chromium CI 44789327481](https://github.com/fasiltadesse22/distributed-systems-engineering-academy/actions/runs/44789327481), **PASS**, both against `c162becb4c54fd7ab84bdcc95664f9317f4d4fae`.

## Canonical instructional artifacts

- [Full manuscript](../content/lessons/1.1.8.md), **26 substantive continuous topics**, 5,820 approximately whitespace-delimited words; preserve this as canonical independent teaching text.
- Technical coverage: separate state/effect owners; terminal local lifecycles; correction versus reversal versus forward compensation; local atomic rollback limits; completed capture/refund boundaries; kitchen consumption and irreversible notification; cancellation policy authority; lost responses, ambiguous outcomes and source reconciliation; immutable evidence history, identities, audit and outstanding obligations; production incident diagnosis; Staff-level defense and foreign-domain transfer.
- `src/lessons/lesson118/model.ts`: six deterministic conceptual effect cases and eight prediction variants; source confirmation versus unknown outcome and policy approval as separate inputs. Not a provider runner.
- `src/lessons/lesson118/Mechanisms.tsx`: evidence-scoped undo/compensate inspector with a non-erasing original/remedy ledger; three-mode before/after fact timeline; prediction-before-reveal exercise with reset.
- `src/lessons/lesson118/Lesson118.tsx` and `lesson.css`: contextual Visual Textbook V2 integration, Chapter 02, accessible control labels, continuous manuscript, no second navigation.
- One typed registry entry, 26 stable topic IDs, three unique source-marker lab anchors, source Git blob `7568ee2f325fd5147bbcbedab2ed709e0afb4952`, structural blueprint coverage, no mutation of the seven frozen manuscripts or their old `?section=` links.
- `src/lessons/lesson118/lesson.test.ts`, `e2e/lesson118.spec.ts`, revised governance/registry tests. Canonical corpus now **eight authored manuscripts, 152 topics and 34 contextual labs**.

## Predicted and observed verification, including failures

**Prediction:** local no-external-effect discard and transaction-limited rollback should be classed as reversal; source-confirmed capture, consumed ingredients or delivered message should preserve original facts and propose new remedy only with explicit assumed approval; missing source evidence should require reconciliation; missing policy permission should require escalation, never unauthorized automatic refund.

**Observed:** deterministic unit and browser tests matched the above classroom classification. A conceptual model does **not** validate any real provider, kitchen or notification effect. The current Java platform still has only volatile request-intake functionality and pure lifecycles/guard candidates. The successful application tests from the Java baseline do not prove financial reversibility, external authority, durable audit, deduplicated compensation, or distributed guarantees.

**Troubleshooting history:** initial feature standard CI runs `44788503750` and `44788544252` failed at progress-governance fixture assumptions that still counted 1.1.8 among unstarted lessons. Updated the progress fixture and range to 1.1.9–1.1.20. Earlier feature browser run `44788633178` failed on obsolete “7 of 20” blueprint copy and expected 1.1.8 blueprint-only route; corrected UI text and expanded browser governance test to eight lessons, while preserving the genuine next blueprint-only lesson 1.1.9. Final feature and post-merge workflows passed.

**Executed environment:** GitHub Actions Ubuntu/Node 22, committed npm lockfile, `npm ci --no-audit --no-fund`, `node scripts/check-content.mjs`, progress and academy governance scripts plus fixture tests, `npm run typecheck`, `npm run test`, `npm run build`; Chromium installation via `npx playwright install --with-deps chromium` then `npm run test:e2e`. No new mobile-specific tests introduced (old suites retain their historical compatibility cases).

## Architecture, authority and exclusions

Java unchanged. One deployable with GET menu, POST order intake, GET order resource; successful new intake records volatile `REQUESTED_AWAITING_RESTAURANT`, merchant `PENDING`, payment `NOT_STARTED`. No merchant acceptance, provider capture/refund, actual kitchen action, durable event/audit ledger, customer auth, idempotency, distributed transactions or notifications. Business policy `POL-01`–`POL-10` remains **UNRESOLVED**, especially cancellation cutoff `POL-03/04`, paid-and-rejected remedy `POL-05`, refund proof `POL-06`, unknown provider recovery `POL-07`. No unapproved behavior or Saga was introduced.

**Known limitations:** explanatory model with hypothetical facts; not a financial simulator, provider adapter, certified policy, actual failure injection, durable compensation handler or merchant/kitchen workflow. Human/expert content review beyond automated structural and regression checks remains appropriate. The next prerequisite is Lesson 1.1.9, **not started here**. Do not infer implementation of it from conceptual refund examples.

**Checkpoint freeze:** implementation recorded at immutable academy merge `c162becb4c54fd7ab84bdcc95664f9317f4d4fae`. This separate documentation finalization records post-merge evidence and is subject to its own independent CI and merge SHA.

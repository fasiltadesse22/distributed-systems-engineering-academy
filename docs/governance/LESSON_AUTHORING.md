# Mandatory Academy Lesson Authoring & Governance — effective from 1.1.8

This is the **academy-side** startup contract; the Java side maintains [its own preflight](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/main/docs/governance/SESSION_STARTUP.md). Both repositories remain independent.

## Session startup — before any lesson code

1. Fetch current academy and Java `main` SHAs, full trees, open PRs and latest real CI status. Conversation summaries are not code evidence.
2. Read the relevant [Master Roadmap](../roadmap/MASTER_ROADMAP_V1.md), [Cluster blueprint](../blueprints/CLUSTER_1_1_BLUEPRINT_V0_1.md) and [structured source](../../content/cluster-1.1/blueprint.json).
3. Read [Dual-Repository Contract](../contracts/DUAL_REPOSITORY_EXECUTION_CONTRACT_V1.md), [Visual Textbook V2](../design/VISUAL_TEXTBOOK_V2.md), [current academy architecture](../architecture/ACADEMY_CURRENT_STATE.md) and [progress](../progress/LEARNING_PROGRESS.md).
4. Read the prior lesson manuscript, lesson checkpoint, current registry, visual models and browser tests. Read the [unresolved policy register](../domain/CLUSTER_1_1_LESSON_1_1_5_DECISION_BACKLOG.md).
5. Inspect the actual Java [current state](https://github.com/fasiltadesse22/food-ordering-platform-new/blob/main/docs/architecture/CURRENT_STATE.md), source and tests **read-only for academy-only work**; classify each proposed Java-backed claim accurately.
6. State a **pre-implementation contract**: both baseline SHAs, exact blueprint obligations, manuscript/topic plan, required visual models, stable topic/lab anchors, Java evidence classification, test/failure plan, previous-lesson risks and expressly deferred capabilities.
7. Start code only after this scope is explicit. Do not invent policy approvals or distributed guarantees.

## One registry, one manuscript

- Author the full independent Markdown manuscript at `content/lessons/<ID>.md` (depth not negotiable).
- Add **one authored entry** to `src/lessons/registry.tsx`: lazy UI component, chapter, canonical source import, reviewed topic array, concise editorial nav labels, stable topic identifiers, and contextual labs. Do not add parallel lesson lists to `App.tsx` or `CourseOutline.tsx`.
- Use stable `?topic=ID` links. Existing frozen `legacySection` values must never be reassigned to a different topic. Existing `?section=N` links must continue locating prior topics; new topics may have no legacy number.
- Every lab must reference a stable topic and an **exact unique source marker**, not just a paragraph index. Current `afterBlock` is retained as compatibility fallback only. When source is edited, adjust anchor deliberately and record why.
- Reuse the single continuous reader, one outline and purposeful lab interfaces. Never replace manuscript depth with decorative cards or compulsory interactions.

## Traceability and integrity

- Record structural blueprint-to-topic/test pointers in [coverage manifest](../../content/coverage/cluster-1.1-authored.json) for every authored lesson. Keep the authoritative requirement text in the blueprint only.
- Do not call structural, word-count or keyword checks an expert review of instructional correctness. Human/expert review remains necessary.
- Before editing an existing authored manuscript, identify baseline [blob SHA](../../content/coverage/manuscript-baselines.json); review every semantic change, update approved checks and source hash with explicit checkpoint provenance. **Do not silently regenerate prior seven manuscripts.**
- Source-fidelity and navigation/lab placement validation must pass for all authored lessons.
- For Java-aligned models, classify conceptual / Java-backed pure model / executed Java evidence / external not implemented / policy unresolved. Record immutable Java SHA, source/tests, CI run and limitations in [reviewed fixture file](../../content/evidence/java-model-parity.json). This is not a JVM runtime or a live provider/merchant authority test.

## Release contract / checkpoint

- Execute `npm ci`, `npm run check:content`, `npm run check:governance`, `npm run typecheck`, `npm test`, `npm run build` and **desktop Chromium** `npm run test:e2e`. Do not impose new mobile-specific E2E.
- Test actual controls, model outcomes, previous lesson routes, keyboard/focus, sidebar deep links, browser history, themes, full source text, Java evidence and false business-effect labels.
- Report actual commands/results including failed/retried runs. Do not describe a TypeScript scenario test as a Java effect or a content gate as mastery proof.
- Merge only after required checks are green, verify the independent merged `main` revision, and freeze a concise historical checkpoint with exact SHAs, failures, coverage, limitations and future prerequisites. Update the one active progress status row; mark older entries historical, never duplicate current status.
- Read [branch protection instructions](BRANCH_PROTECTION.md); PR review and CI remain procedural until GitHub settings enforce them.

**Lesson 1.1.8 was not started during the stabilization.** Any future implementation must use a new explicit lesson execution request.

# Dual-Repository Execution Contract — V1.0

**Authoritative roadmap:** [Master Roadmap V1.0](../roadmap/MASTER_ROADMAP_V1.md)  
**Academy:** https://github.com/fasiltadesse22/distributed-systems-engineering-academy  
**Food Ordering Platform:** https://github.com/fasiltadesse22/food-ordering-platform-new

## Separation of responsibilities

- The **academy** contains React/TypeScript learning UX, MDX/structured lesson content, full cluster blueprints, interactive conceptual simulators, reusable visual components and assessments. Never replace deep explanation with visual decoration.
- The **platform** contains real Java/Spring Boot domain/application/infrastructure code, Maven verification, execution scripts, integration tests, experiments, architecture decision records and engineering evidence.
- These are **two independently runnable Git repositories**. No shared monorepo or synchronized commit assumption.
- A simulation models a mechanism under declared assumptions. It is not proof of actual Spring application behavior. Executed experiment evidence is separate.

## Roadmap → blueprint → lesson

1. Preserve the complete 19-phase, 93-cluster mastery boundary.
2. For each cluster, first inspect prerequisite coverage and both repositories' actual state.
3. Derive a blueprint that maps every technical obligation to a chapter, lesson, visualization, experiment, test or assessment. No arbitrary part-count limit.
4. Build the React lesson and, **where justified**, evolve or experiment with the Java application.
5. Trace state, execution, concurrency, failures, recovery, alternatives and quality attributes before assessing mastery.
6. Conclude only after tests and/or evidence have actually run; preserve known limitations, open assumptions and next dependencies.

## Lesson types

- **A: Platform evolution** — persistent verified application change, measured rationale, tests and checkpoint.
- **B: Controlled experiment** — isolated evidence or reproducible fragile-state harness; no automatic promotion to permanent architecture.
- **C: Concept/analysis** — in-depth modeling, derivation or design comparison; no forced Java source change.
- **D: Academy evolution** — React components, simulations or content; academy CI required where code changes.

## Interactive quality gate

A meaningful simulator must define objective, explanatory model, assumptions, controls, state transitions, visible timeline, outputs, interpretation, edge cases, limitations and reproducible tests. Favor hands-on predictions and parameter changes over animated decoration. Ensure keyboard accessibility, readable labels, responsive design, text equivalents and safe default motion.

## Evidence and checkpoint manifest

Each changed part must record:
- roadmap version and phase/cluster/chapter/lesson IDs;
- baseline and resulting **immutable SHAs in both repositories**, if applicable;
- classification, engineering question and predicted result;
- scope and rationale for code/config/schema changes;
- exact commands executed and their outcomes; environment and workload;
- experiment assets and observed evidence, with assumptions/limitations;
- affected invariant or measured quality attribute;
- ADR and alternative/reconsideration trigger for architecture changes;
- academy lesson, actual application source/test links and next dependency.

Do not label a PR, commit, build, simulation or experiment **verified** before reading its actual result. Link exact commit SHAs, not a mutable branch alone.

## Initial release order

1. Roadmap and contracts only (no fake build claims).
2. React academy foundation with tested roadmap reader and blueprint reader.
3. Complete Cluster 1.1 blueprint with traceability matrix and interactive specifications.
4. First deeply taught lesson, paired with a real minimal food-ordering application checkpoint where justified.
5. Part-by-part deep learning and evidence-backed app evolution; preserve verified baselines.

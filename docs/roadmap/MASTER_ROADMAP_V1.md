# Distributed Systems Engineering Academy — Master Roadmap V1.0

**Edition:** Fresh-Start • Interactive Learning • Evidence-Driven Real-Project Evolution  
**Status:** Authoritative curriculum and execution design baseline; not a claim that lessons, apps or experiments have been implemented  
**Date:** 2026-11-08  
**Audience:** Senior/Staff-oriented backend engineers learning to reason about, build, diagnose, operate and defend distributed architectures

**Academy repository:** https://github.com/fasiltadesse22/distributed-systems-engineering-academy  
**Real-world application repository:** https://github.com/fasiltadesse22/food-ordering-platform-new

> **Mission.** Develop independent, transferable mastery of enterprise distributed systems and system design, not merely familiarity with microservice tools. The React academy makes mechanisms visible and testable; the Java/Spring Boot Food Ordering Platform evolves only where requirements, measured forces and controlled experiments justify a change.

## 1. Source and revision policy

This is a new roadmap informed by the supplied *Enterprise Distributed Systems Architecture & System Design — Master Roadmap V8.0 — Fresh-Start Production-Project Evolution Edition*. V8.0 contributed the 19-phase / 93-cluster technical mastery boundary, depth discipline, application-first principle, evidence language, project checkpoints and Senior/Staff communication goals. The new edition **preserves every original cluster and its technical territory** while adding a separate interactive academy, two-repository governance, richer learning assessment, and explicit visualization/experiment design briefs for each cluster.

**Structural decisions:**
- Preserve all 19 core phases and 93 cluster identities for complete coverage and simple traceability. Cluster numbers identify curriculum scope, not an obligation to implement a technology.
- Add a **Foundation / Phase 0** for academy UX, repository contracts and reproducible toolchain setup, without pretending this is a new distributed-systems cluster.
- Apply foundational networking, observability, security, testability and quantitative reasoning *just in time* from the earliest relevant work. Their dedicated later phases deepen, rather than introduce, those principles.
- Keep Chapter and Lesson counts **emergent**: derive them only after analyzing each cluster's prerequisite, causal, failure, project and evidence graphs. Do not shrink content to arbitrary lesson counts.
- Keep **Course 2** centered on distributed-system architecture: advanced language/JVM/Spring internals belong to Course 1; Kubernetes/AWS/Terraform/GitOps/platform delivery belong to Course 3. Small local Docker/Testcontainers deployments are permitted as experiment harnesses.

## 2. Non-negotiable learning outcomes

By completion, independently and defensibly:
1. Elicit business needs; model actors, commands, events, identities, lifecycle, legal transitions, invariants and authority.
2. Discover aggregates, transactions, contexts and service boundaries without prematurely distributing the domain.
3. Quantify workload, latency, concurrency, saturation, risk, quality attributes and credible SLI/SLO targets.
4. Trace DNS, TCP, TLS, HTTP, connection pools, deadlines, retries and ambiguous remote outcomes at execution level.
5. Diagnose partial failure, duplicate effects, cascading overload and recovery windows before recommending patterns.
6. Select or **reject** Kafka, Redis, Saga, Outbox, Inbox, CQRS, Event Sourcing, replication, sharding and coordination based on real forces.
7. Engineer observable, secure, reliable, evolvable behavior across persistence, communication and failure boundaries.
8. Generate reproducible experiments, interpret negative evidence, distinguish observed behavior from proof and state limitations.
9. Defend alternatives and migrations as a Senior/Staff engineer; communicate clearly to technical and nontechnical audiences.
10. Transfer reasoning beyond Food Ordering to payment, inventory, reservations, banking-like and other unfamiliar domains.

**Central reasoning chain:** Business capability → domain facts/invariants → quality attribute → measurable scenario → workload/failure/constraint → force → alternatives → prediction → experiment/evidence → trade-off/decision → verified implementation → diagnosis/recovery → evolution/reconsideration.

## 3. Two repositories — two synchronized but independent tracks

### 3.1 Interactive Learning Track (academy)

**Separate React/TypeScript application**, with a navigable roadmap, full cluster blueprints, per-lesson interactive experiences, conceptual diagrams, parameterized simulations, code/experiment links, prediction questions, diagnostic tasks, assessment records and delayed retrieval. Content is authored as structured data/MDX plus reusable typed React components, **not static HTML pages**. High-fidelity visual learning must reduce cognitive friction without hiding causal detail or replacing necessary explanations.

Suggested initial technology choices (subject to implementation review): React + TypeScript + Vite; React Router; MDX for prose; React Flow for architecture/state graphs; SVG/D3 where an exact animation or chart explains mechanics better; XState for selected explicit state machines; Vitest/React Testing Library/Playwright for component, simulator and navigation verification. Avoid selecting a complex tool simply because it exists.

**Academy minimum viable foundation:** roadmap navigation, cluster blueprint reader, lesson route/template, diagram/simulator component registry, glossary and code/evidence link UI, responsive/keyboard-accessible design, and CI that actually builds/tests the app. Each future lesson should improve reusable infrastructure rather than becoming another unrelated custom page.

### 3.2 Applied Engineering Track (Food Ordering Platform)

**Independent Java/Spring Boot Git repository**, initially one real deployable with a coherent business workflow, unit tests, minimal HTTP adapters, clear module responsibilities, a reproducible root Maven build, and CI. Initially use the smallest viable persistence adapter; introduce PostgreSQL, durable messaging, Redis and physical services only when the relevant cluster demonstrates legitimate need. Payment is a controlled provider/simulator integration unless actual external processing has been separately and safely established. Never describe a sandbox as handling real money.

**Application-first and topology-skeptical:** no default pre-split Order, Restaurant, Payment, Delivery and Notification microservices; do not manufacture architectural pain merely to introduce the technology of the next phase. An evidence-backed decision to **remain modular** is a valid outcome. Preserve the simpler baseline to make before/after mechanisms explainable.

### 3.3 Cross-repository consistency

A lesson or experiment referencing the application must pin an immutable **application commit SHA**, relevant test or evidence artifact, and architecture decision; using the latest branch by implication is insufficient. Academy commits independently identify exactly which real application checkpoint they explain. A later Java change may require lesson revisions; a conceptual lesson does **not** force a Java commit. Never assume a green check or executed test without inspecting the actual result.

## 4. Cluster blueprint procedure

For each cluster, before creating lesson pages or modifying application behavior:

1. Analyze all prerequisites, forward dependencies and already-verified project state.
2. Expand *every* technical term/distinction into a concept inventory and causal reasoning map.
3. Build at least five connected graphs: prerequisites, execution/causality, failure windows, project evolution, and experiment/evidence.
4. Identify domain-specific examples across Order, Payment, Restaurant, Customer and relevant adjacent workflows. Cover the complete domain scope; do not over-focus on Order.
5. State predictions, assumptions, non-guarantees and **the fragile baseline** before choosing a tactic.
6. Design interactive representations *because they clarify a mechanism*; choose a diagram, timeline, controlled simulation, comparison, or exercise based on explanatory value.
7. Specify which mechanisms need real application change, controlled lab experiment, or conceptual modeling only.
8. Determine test and measurement commands, expected artifacts, diagnostic hypotheses and alternative explanations.
9. Derive a natural **Chapter → Lesson** decomposition and map each roadmap obligation to a lesson/assessment/evidence checkpoint.
10. Audit uniform technical depth before freezing the cluster blueprint in the academy.

The blueprint is a scope contract, not a short abstract. A lesson may require multiple substantial sections, examples, animations and experimental branches.

## 5. Per-lesson learning cycle

**Orient → Understand → Explore → Predict → Engineer (if justified) → Verify → Diagnose → Defend → Retain.**

- **Orient:** a truthful high-level concept/causality map and concrete engineering problem.
- **Understand:** full mechanism-level explanation, internal state, sequence, guarantees/non-guarantees, alternatives, trade-offs and limitations.
- **Explore:** an interactive control surface for parameters, interleavings, state, latency, data flow or decisions; users see *why* an outcome changes.
- **Predict:** learner chooses a predicted outcome before revealing the mechanism or running an experiment; expose common misconceptions.
- **Engineer:** inspect/modify the actual Spring application only when the lesson merits a real change. Trace source, schema, config, failure and tests.
- **Verify:** actually execute relevant Java tests, academy tests and controlled experiments; link raw outputs and environment conditions. Mark simulated versus measured.
- **Diagnose:** symptom → scope → timeline → multiple hypotheses → discriminating test → causal mechanism → mitigation → validation.
- **Defend:** explain in 60 seconds, in depth to a backend engineer, in trade-off terms to a Staff reviewer, and in business impact terms to a stakeholder.
- **Retain:** delayed recall, transfer to a second domain, and replay previously unresolved failure cases after future clusters.

Depth is never shortened to fit a screen. Favor progressive disclosure and well-chosen navigation over one giant unstructured text wall.

## 6. Interactive teaching standard

A visual is useful only if it depicts causality or a meaningful relationship. **Interactive** means the learner can make a consequential choice and see a mechanistically justified result. Decorative animations and clickable labels alone do not satisfy the standard.

Each justified interactive lab defines: learning objective; system model and assumptions; state and permitted operations; learner controls; deterministic rules/seed; visible event timeline; observable outputs; invariant/warning indicators; failure modes; explanatory feedback; limitations; accessibility fallback; and automated tests for nontrivial logic. Required distinction: **illustrative simulation ≠ actual backend behavior ≠ measured production guarantee**. Link to real execution evidence when available.

Prefer:
- State machines and transition guards for workflows; sequence/timeline diagrams for asynchronous windows.
- Resource/queue graphs for latency and saturation; before/after comparisons for protective mechanisms.
- Interactive partition logs and consumer offsets for Kafka; freshness/ownership maps for data.
- Causal tracing for incidents, controlled architecture-decision studios for trade-offs.
- Semantic HTML, keyboard controls, accessible labels, responsive layouts, readable code, restrained motion and a nonanimated explanation path.

**Quality gate:** technical correctness, visual explanation, functioning controls, boundary-case tests, accurate source/evidence references, no invented metrics or fake outcomes, usable navigation and accessibility checks.

## 7. Real-project evolution contract

Before every persistent engineering change: document business invariant or measurable force; reproduce the simpler/fragile state; predict the changed behavior; compare a simpler alternative; implement the smallest justified tactic; run reproducible root build and relevant unit/integration/failure/load tests; publish actual evidence; record an ADR for architecture changes; preserve failure/recovery consequences and a removal trigger.

Classify lessons by application impact:
- **A — Persistent platform evolution:** real, justified source/config/schema/infrastructure change in the Java repo, with executed verification.
- **B — Controlled experiment:** isolated script/test/harness or reproducible failure branch, without promoting educational fragility into production code.
- **C — Reasoning/modeling:** architecture analysis, design alternatives, theoretical demonstration, or interview work; **no compulsory Java commit**.
- **D — Academy evolution:** all categories may improve React learning assets, but academy verification is independent of Java validation.

**Truth labels:** observed, measured, structurally demonstrated, evidence-backed inference, assumed, hypothetical, guaranteed (only within a stated and tested/formally supported model), and not guaranteed. Never infer production-wide guarantees from one local test.

**Checkpoint manifest (per meaningful part):** cluster/chapter/lesson IDs; baseline academy and application SHAs; classification; engineering question; hypotheses/predictions; source changes and alternatives; exact executed commands; environment/workload/seed; evidence and negative cases; outcome labels; ADR; fragilities and limitations; deferred mechanisms; next dependency/retrieval triggers; resulting immutable SHAs. Failed or unexecuted gates remain explicitly **not verified**.

## 8. Foundation / Phase 0 — Initial delivery sequence

1. Publish this authoritative V1 roadmap, interactive-learning contract and dual-repository alignment contract **without claiming either application exists yet**.
2. Initialize the academy's React/TypeScript UX and testable design system (roadmap/blueprint readers, lesson engine, visual component prototypes).
3. Derive the complete Cluster 1.1 blueprint; review coverage and visual/execution dependency map before part-level lessons.
4. In the first justified project-changing lesson, build a minimal **runnable** Java/Spring Boot Food Ordering baseline with tests and CI.
5. Pair that first verified application checkpoint with a complete deep-learning React lesson and a reproducible interactive/experimental case.
6. Continue one part at a time, maintaining immutable application/academy references and a readable progress ledger.

**Definition of done for the foundation:** both repository entrypoints documented; academy successfully builds and renders a real navigable blueprint; platform first runnable checkpoint only when its lesson begins; CI results shown honestly.

## 9. Phase-level evolution roadmap

The phases retain V8's technical subjects; the new contractual additions apply uniformly to all clusters. Detailed cluster-by-cluster scopes follow.

| Phase | Focus | Clusters |
|---|---|---:|
| I | BUSINESS CORRECTNESS, DOMAIN MODELING & ARCHITECTURAL BOUNDARIES | 4 |
| II | QUALITY ATTRIBUTES, REQUIREMENTS & QUANTITATIVE ARCHITECTURE | 4 |
| III | NETWORKING & REMOTE EXECUTION | 5 |
| IV | PARTIAL FAILURE, RETRIES & DUPLICATE EFFECTS | 4 |
| V | RESOURCE PROTECTION, RESILIENCE & OVERLOAD | 4 |
| VI | DISTRIBUTED COMMUNICATION ARCHITECTURE | 4 |
| VII | KAFKA AS A DISTRIBUTED SYSTEM | 7 |
| VIII | DISTRIBUTED DATA, OWNERSHIP & CONSISTENCY | 5 |
| IX | DISTRIBUTED TRANSACTIONS & RELIABLE STATE PROPAGATION | 5 |
| X | CQRS, MATERIALIZED VIEWS & EVENT SOURCING | 3 |
| XI | REDIS & CACHING ARCHITECTURE | 6 |
| XII | PERFORMANCE, SCALABILITY & ELASTICITY | 7 |
| XIII | AVAILABILITY, RELIABILITY, RESILIENCE & RECOVERY | 7 |
| XIV | OBSERVABILITY, OPERABILITY & PRODUCTION DIAGNOSIS | 6 |
| XV | DISTRIBUTED SECURITY ARCHITECTURE | 4 |
| XVI | COORDINATION, LOCKS, TIME & ORDERING | 4 |
| XVII | COMPATIBILITY & ARCHITECTURAL EVOLUTION | 5 |
| XVIII | STAFF-LEVEL ARCHITECTURAL DECISION MAKING | 5 |
| XIX | COMPLETE SYSTEM DESIGN & SYNTHESIS | 4 |

## 10. Complete cluster catalog — all 93 technical mastery boundaries

## Phase I — BUSINESS CORRECTNESS, DOMAIN MODELING & ARCHITECTURAL BOUNDARIES

**Learning-and-engineering intent.** Domain correctness first: behavior, invariants, aggregates, semantic module ownership and evidence-based topology selection. Academy emphasis: state-machine/ownership and race exploration.

**Source milestone.**  Fresh-start real application foundation. Build one real Java/Spring Boot Food Ordering deployable first; discover correctness, aggregates, semantic boundaries and service-decomposition forces inside a running application before distributing anything.

**Application evolution path.** Begin the separate Food Ordering Platform repository with a Maven root, one Spring Boot application module, architecture/ADR docs, experiments, scripts, and CI. Use Java 21. Start with real application use cases and minimal adapters; introduce PostgreSQL and stronger module boundaries only when the relevant clusters justify them.

**Phase exit evidence.** By the end of Phase I, the repository contains a verified real Food Ordering application, explicit domain/consistency boundaries, enforceable semantic modules, and an evidence-backed decision about whether any boundary deserves an independently runnable Spring Boot application. The simpler topology remains preserved for comparison.

**Deliberately deferred.** Do not introduce Kafka, Redis, Saga, Outbox, CQRS, Event Sourcing, service mesh, Kubernetes, autoscaling, distributed locks, or database-per-service by default.

### Cluster 1.1 — Business Workflows, State, Lifecycle & Invariants

**Engineering question:** What must remain correct regardless of the eventual architecture?

**Required technical scope:** actors; goals; responsibilities; use cases; commands; domain facts/events; identity; authoritative state; state machines; legal/illegal transitions; guards; pre/postconditions; terminal/reversible/irreversible states; invariants; validation rules; database constraints; conflicting/concurrent operations; duplicates; stale decisions; atomicity and consistency implications.

**Critical distinctions:** command != event; intent != fact; validation rule != invariant; invariant != DB constraint; workflow != state machine; business failure != technical failure; reversal != compensation; documented rule != implemented guarantee != experimentally verified behavior.

**Causal reasoning path:** Actors goals use cases commands decisions facts state lifecycle transitions -> invariants conflicts atomicity consistency evidence.

**Real Food Ordering pressure:** Create the V8 fresh-start production-project baseline from scratch. Model ordering, payment, restaurant acceptance/rejection, cancellation, refund, preparation and completion without premature Kafka, Redis, Saga, Outbox, CQRS or Event Sourcing.

**Failure/experiment inventory:** duplicate payment; cancellation/acceptance race; modification after payment; payment after cancellation; illegal transition; repeated command; stale-state decision. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** State-machine explorer: interleave cancel, accept, payment and refund commands; reveal invariant violations and stale decisions.

**Specific implementation obligations inherited from V8:** Create the repository from scratch as a real Maven/Java 21/Spring Boot application, not a teaching-model-only repository; Implement real application use cases for ordering lifecycle behavior with domain objects, application services, minimal HTTP adapters for selected flows, and an in-memory persistence adapter initially so invariants remain visible; Create unit/domain/application tests for legal and illegal transitions, repeated commands, stale decisions and races. Add CI immediately; a checkpoint is invalid if Maven verification has not actually executed; Keep a simple single deployable. Do not pre-create future services or infrastructure.

**Mastery demonstration:** Derive correctness requirements independently, identify invariants and conflict windows, and distinguish requirement, implementation behavior, observation and guarantee. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 1.2 — Entities, Value Objects, Aggregates & Consistency Boundaries

**Engineering question:** Which state and rules belong together because they must remain consistent together?

**Required technical scope:** entities and identity continuity; value objects/value semantics; aggregate roots; aggregate invariants; consistency boundaries; transaction boundaries; aggregate lifecycle; references; domain services; repositories conceptually; domain events; aggregate sizing; contention; cross-aggregate operations and optimistic concurrency implications.

**Critical distinctions:** entity != row; value object != DTO; aggregate != table; aggregate != bounded context; aggregate boundary != service boundary; transaction boundary != deployment boundary.

**Causal reasoning path:** Identity entity value semantics invariant required state aggregate root consistency -> boundary transaction boundary cross-aggregate interaction.

**Real Food Ordering pressure:** Refine Order, Restaurant, Payment and related models from actual invariants. Keep boundaries local until distribution is justified; never force one aggregate per future service.

**Failure/experiment inventory:** concurrent aggregate modification; oversized aggregate contention; undersized aggregate requiring coordination; invariant crossing an artificial boundary. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Aggregate-boundary designer: drag entities into transaction boundaries, then inject concurrent updates and compare contention.

**Specific implementation obligations inherited from V8:** Evolve the same application to real PostgreSQL persistence with migrations and Testcontainers (or an equivalent reproducible DB harness) so aggregate consistency, local transactions, constraints and optimistic concurrency can be observed rather than simulated; Map persistence to the domain without letting table structure define aggregate/service boundaries. Preserve domain tests and add concurrency/transaction integration tests; Introduce only the persistence technology required to make consistency boundaries real; no database-per-service decision yet.

**Mastery demonstration:** Derive aggregate boundaries from invariants and defend alternatives in terms of correctness, contention and evolution. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 1.3 — Bounded Contexts, Ubiquitous Language & Context Relationships

**Engineering question:** Where does one coherent business model stop and another begin?

**Required technical scope:** subdomains; business capabilities; bounded contexts; ubiquitous language; semantic ownership; context mapping; upstream/downstream relationships; translation; anti-corruption layers; published language; conflicting representations; cross-context identity and authority.

**Critical distinctions:** subdomain != bounded context; bounded context != service; same word != same model; shared identifier != shared ownership; context boundary != deployment boundary.

**Causal reasoning path:** Capability language model semantic conflict ownership bounded context relationship -> translation.

**Real Food Ordering pressure:** Discover Food Ordering contexts from behavior rather than copying the reference repository. Compare candidate Order, Restaurant, Payment, Customer, Delivery and Notification contexts.

**Failure/experiment inventory:** shared model change coupling; upstream model leakage; direct sharing versus translation. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Context-map canvas: rename terms across Order, Restaurant and Payment, inspect ownership and translation failures.

**Specific implementation obligations inherited from V8:** Refactor the real application into enforceable semantic modules/packages derived from discovered bounded contexts and relationship contracts. Use architectural tests (for example ArchUnit or equivalent) where helpful to prevent forbidden source dependencies; Keep the system physically co-located unless runtime separation has already been justified. Implement Published Language/translation/anti-corruption behavior in-process first; Record context-map and terminology decisions as ADRs and verify that one context cannot mutate another context's owned persistence through accidental repository access.

**Mastery demonstration:** Recognize semantic boundaries independently and defend context relationships and translation choices. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 1.4 — Service Decomposition & Architectural Boundaries

**Engineering question:** When should a domain boundary become an independently operating distributed component?

**Required technical scope:** cohesion; coupling; autonomy; ownership; change frequency; deployment/scaling independence; failure isolation; data ownership; consistency cost; network cost; operational cost; distributed monoliths; nanoservices; chatty boundaries and shared-database coupling.

**Critical distinctions:** aggregate != bounded context != module != service != process != deployment unit != database; logical separation != physical distribution.

**Causal reasoning path:** Domain boundary change coupling ownership deployment/scaling/failure needs distribution -> cost alternatives service decision.

**Real Food Ordering pressure:** Evolve modular boundaries first and distribute only selected boundaries when a measurable force justifies it. Preserve the simpler state for comparison.

**Failure/experiment inventory:** chatty boundary; shared DB coupling; remote failure propagation; decomposition that increases coordination. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Monolith-versus-extraction laboratory: toggle a remote boundary and observe call count, failure propagation and consistency costs.

**Specific implementation obligations inherited from V8:** Use the actual application, change history, load/failure experiments and data ownership evidence to compare modular co-location with selected runtime separation; Only a boundary that survives cohesion, coupling, ownership, release, scaling, failure, data, consistency, network and operational-cost analysis may become another independently runnable Spring Boot application in the Food Ordering Platform repository; If a split is selected, create a real service-to-service path and preserve the simpler modular baseline/checkpoint for comparison. If no split is justified, keep the real modular application and preserve a controlled extraction experiment rather than forcing microservices; End Phase I with an explicit topology ADR that later phases must inherit rather than assuming one service per bounded context.

**Mastery demonstration:** Defend both separation and non-separation using business change, consistency, failure, scaling and operational forces. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

**Phase I completion check:** verify the outcomes above against both the documented curriculum and the actual application/evidence state. Passing a glossary quiz is insufficient; if no runtime change is justified, document the no-change decision and its evidence.

---

## Phase II — QUALITY ATTRIBUTES, REQUIREMENTS & QUANTITATIVE ARCHITECTURE

**Learning-and-engineering intent.** Turn subjective quality goals into workload models, measurable requirements and valid performance evidence. Academy emphasis: sensitivity, queueing and SLO scenario analysis.

**Source milestone.**  Turn architectural intentions into measurable requirements on the actual application.

**Application evolution path.** Instrument the current real application sufficiently to measure latency, throughput, errors, concurrency and saturation. Create repeatable workload scripts and quality-attribute scenarios tied to real Food Ordering workflows.

**Phase exit evidence.** A quantitative baseline exists for critical workflows, with explicit SLIs/SLO candidates, workload assumptions, resource limits and reproducible load evidence.

**Deliberately deferred.** Do not tune or scale blindly before identifying the measured bottleneck.

### Cluster 2.1 — Quality Attributes as Architectural Drivers

**Engineering question:** What does 'good architecture' mean for this system?

**Required technical scope:** performance; latency; throughput; scalability; elasticity; availability; reliability; resilience; fault tolerance; recoverability; durability; consistency; data integrity; security/privacy; observability; operability; maintainability; modifiability; evolvability; deployability; testability; interoperability; portability and efficiency.

**Critical distinctions:** performance != scalability; scalability != elasticity; latency != throughput; availability != reliability; reliability != resilience; resilience != fault tolerance; availability != durability; observability != monitoring.

**Causal reasoning path:** Business expectation quality concern force competing qualities tactics trade-off.

**Real Food Ordering pressure:** Create explicit quality-attribute concerns for critical Food Ordering workflows and connect each to business consequences.

**Failure/experiment inventory:** change one quality target; compare latency versus durability; analyze decomposition impact on multiple qualities. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Quality trade-off radar: change availability, consistency, latency and cost goals and defend what becomes worse.

**Mastery demonstration:** Reason about architecture through measurable qualities rather than technology preference. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 2.2 — Quality-Attribute Scenarios, SLIs, SLOs & Error Budgets

**Engineering question:** How do architectural intentions become measurable requirements?

**Required technical scope:** scenario source/stimulus/environment/artifact/response/response measure; SLIs; SLOs; SLAs conceptually; error budgets; windows; percentiles; availability/freshness/recovery/durability targets and measurement validity.

**Critical distinctions:** SLI != SLO != SLA; average != percentile; metric existence != meaningful SLI; SLO miss != total outage.

**Causal reasoning path:** Business expectation scenario response measure SLI target SLO evidence.

**Real Food Ordering pressure:** Define measurable scenarios for order placement, payment, restaurant acceptance and selected async workflows.

**Failure/experiment inventory:** normal versus degraded SLI; window effects; component metric versus user-visible behavior. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** SLI/SLO calculator: vary measurement windows and latency samples; distinguish real user impact from dashboard artifacts.

**Mastery demonstration:** Turn vague nonfunctional requirements into measurable architectural constraints and state measurement limitations. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 2.3 — Workload Modeling, Capacity & Constraints

**Engineering question:** What load and constraints must the architecture actually support?

**Required technical scope:** arrival/request/event rate; concurrency; read/write ratio; burstiness; peak/average; payload size; data growth; hot entities; skew; service time; external quotas; headroom; capacity ceilings and Little's Law with assumptions.

**Critical distinctions:** average != peak; throughput != concurrency; capacity != utilization; estimate != measured fact; traffic volume != data growth.

**Causal reasoning path:** Business volume arrival pattern service demand concurrency resource demand constraint -> headroom.

**Real Food Ordering pressure:** Build explicit workload assumptions for ordering, menu reads, payments and event flows with units and uncertainty.

**Failure/experiment inventory:** burstiness at same average; service-time change; external 2-TPS-style quota; hot-entity skew. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Workload composer: tune arrival bursts, read/write mix and hot-key skew to expose bottleneck assumptions.

**Mastery demonstration:** Perform defensible estimates, state assumptions, and identify which estimate materially changes architecture. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 2.4 — Latency, Throughput, Concurrency, Queueing & Saturation

**Engineering question:** Why does a system become slow before it simply runs out of capacity?

**Required technical scope:** response/service/wait time; P50/P95/P99; tail latency; throughput; concurrency; parallelism; utilization; saturation; queues; Little's Law; bottlenecks and nonlinear latency near saturation.

**Critical distinctions:** latency != service time; throughput != concurrency; parallelism != concurrency; average != tail; CPU != only saturation.

**Causal reasoning path:** Arrival resource demand utilization waiting queueing tail latency timeout -> amplification.

**Real Food Ordering pressure:** Create a controlled load baseline for later comparison after networking, Kafka, resilience and caching changes.

**Failure/experiment inventory:** increase arrival to saturation; slow dependency at fixed RPS; mean versus P99; queue growth before throughput collapse. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Queue saturation playground: increase arrival versus service rate and watch queue depth and P50/P99 diverge.

**Mastery demonstration:** Explain performance causally and predict effects of workload, service-time and capacity changes. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

**Phase II completion check:** verify the outcomes above against both the documented curriculum and the actual application/evidence state. Passing a glossary quiz is insufficient; if no runtime change is justified, document the no-change decision and its evidence.

---

## Phase III — NETWORKING & REMOTE EXECUTION

**Learning-and-engineering intent.** Expose what a remote call physically entails; resist masking failure behind resilience frameworks. Academy emphasis: DNS/TCP/TLS/HTTP and deadline execution traces.

**Source milestone.**  Make remote execution mechanics explicit on actual service-to-service interactions.

**Application evolution path.** Where Phase I retained a distributed boundary, instrument and evolve its real Spring HTTP client/server path. If Phase I retained one deployable, use a controlled remote candidate experiment without declaring permanent topology.

**Phase exit evidence.** DNS/addressing, TCP/TLS/HTTP lifecycle, connection reuse/pools and timeout/deadline behavior are observable on a real Food Ordering interaction.

**Deliberately deferred.** Do not hide the mechanics immediately behind retries, circuit breakers, messaging or a service mesh.

### Cluster 3.1 — Hosts, Addresses, Ports, Endpoints, DNS & Sockets

**Engineering question:** How does one process locate and address another process?

**Required technical scope:** hosts; hostnames; IPs; ports; endpoints; client/server roles; socket concept; listening/connected endpoints conceptually; ephemeral ports; DNS resolution/cache behavior and endpoint identity.

**Critical distinctions:** hostname != IP; port != process; endpoint != service name; DNS success != reachability; socket != HTTP request.

**Causal reasoning path:** Logical service name DNS address port endpoint connection attempt remote process.

**Real Food Ordering pressure:** Introduce a real service-to-service interaction and trace resolution without duplicating Java socket or Kubernetes networking implementation.

**Failure/experiment inventory:** invalid hostname; wrong/stale address; closed port; DNS works but app unavailable. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** DNS-to-socket walkthrough: resolve names, choose ports, and inject unresolved, stale and refused endpoints.

**Mastery demonstration:** Explain precisely what 'Order Service calls Payment Service' means below the architecture diagram. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 3.2 — TCP Connection Lifecycle & Network Waiting

**Engineering question:** What changes when a local call becomes communication over a network connection?

**Required technical scope:** connection establishment/lifecycle; handshake cost conceptually; bidirectional byte stream intuition; waiting; retransmission implications; close/reset; refusal versus timeout; slow versus failed destination and connection reuse.

**Critical distinctions:** connection establishment != request execution; refused != response timeout; slow != failed; transport connection != application success.

**Causal reasoning path:** Endpoint connection attempt establishment data exchange waiting close/reuse/failure.

**Real Food Ordering pressure:** Instrument one remote Food Ordering interaction enough to separate connection establishment from application response time.

**Failure/experiment inventory:** refused connection; reset; slow destination; new connection per request versus reuse. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Connection timeline explorer: compare handshake, reuse, reset and timeout outcomes on one remote call.

**Mastery demonstration:** Explain why a remote call is not merely a slower local method invocation. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 3.3 — TLS, HTTP & Complete Request/Response Execution

**Engineering question:** What happens between initiating an HTTP request and receiving a usable response?

**Required technical scope:** HTTP semantics; TLS purpose/handshake conceptually; connection acquisition; request transmission; remote admission/execution; DB/downstream work; response generation/transmission; status semantics and caller interpretation.

**Critical distinctions:** HTTP error != network failure; TLS success != authorization; accepted connection != request completed; status != business success.

**Causal reasoning path:** Intent resolution connection TLS HTTP send remote admission execution dependencies -> response interpretation.

**Real Food Ordering pressure:** Trace a critical Food Ordering request across services with timings/correlation evidence where feasible.

**Failure/experiment inventory:** HTTP 5xx; slow handler; dependency delay; delayed/lost response; transport failure. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** HTTP request lifecycle trace: step from DNS through TLS, handler, DB and response; fault each boundary.

**Mastery demonstration:** Given a timeout or 5xx, enumerate plausible stages and required evidence rather than jumping to one cause. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 3.4 — Persistent Connections, Connection Pools & Resource Coupling

**Engineering question:** Why does remote communication consume bounded resources and how does waiting create saturation?

**Required technical scope:** keep-alive; reuse; pool purpose; active/idle connections; max size; acquisition wait/timeout; connection lifetime; downstream capacity; held resources; pool saturation and interaction with request workers.

**Critical distinctions:** connection pool != thread pool; idle connection != downstream capacity; pool size != throughput; acquisition timeout != response timeout.

**Causal reasoning path:** Request acquire wait if unavailable remote work hold release; downstream slow hold -> longer pool depletion queue P99.

**Real Food Ordering pressure:** Expose observable client-pool behavior and preserve a fragile configuration that can be saturated.

**Failure/experiment inventory:** slow downstream; high caller concurrency; small/large pools; acquisition latency versus response latency. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Pool contention simulator: tune connection capacity, request concurrency and downstream latency.

**Mastery demonstration:** Diagnose pool saturation and explain why enlarging a pool may simply move pressure downstream. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 3.5 — Timeouts, Deadlines, Budgets & Ambiguous Outcomes

**Engineering question:** How long should a caller wait, what timed out, and what is known about the remote outcome?

**Required technical scope:** resolution; connection; pool-acquisition and response/read timeouts; operation timeout; end-to-end deadline; nested budget allocation; timeout selection; tail latency; lost responses and ambiguous outcomes.

**Critical distinctions:** connection timeout != response timeout; pool timeout != remote failure; timeout != remote cancellation; caller failure != remote rollback; deadline != arbitrary hop timeout.

**Causal reasoning path:** Deadline budget allocation stage waits timeout known evidence unknown remote state -> recovery decision.

**Real Food Ordering pressure:** Configure distinct timeout classes and create a case where remote business state commits but the caller times out.

**Failure/experiment inventory:** pool timeout; connection timeout; response timeout; remote commit + lost/late response; nested budget exhaustion. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Deadline budget scheduler: allocate a total deadline across calls and expose ambiguous post-timeout effects.

**Mastery demonstration:** After any timeout, state what is known, unknown, what evidence is needed, and why blind retry may be dangerous. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

**Phase III completion check:** verify the outcomes above against both the documented curriculum and the actual application/evidence state. Passing a glossary quiz is insufficient; if no runtime change is justified, document the no-change decision and its evidence.

---

## Phase IV — PARTIAL FAILURE, RETRIES & DUPLICATE EFFECTS

**Learning-and-engineering intent.** Prove that remote uncertainty, retries and duplicates have business consequences. Academy emphasis: interleavings and post-timeout ambiguity.

**Source milestone.**  Expose partial failure and duplicate-effect pressure against real remote interactions.

**Application evolution path.** Add deterministic fault-injection harnesses around actual Food Ordering dependencies. Preserve raw failure states before resilience tactics.

**Phase exit evidence.** Connection failure, timeout, lost/late response, retry amplification and idempotency requirements are backed by executable evidence.

**Deliberately deferred.** No generic retries or idempotency keys everywhere; apply only where operation semantics require them.

### Cluster 4.1 — Partial Failure, Network Partitions & Uncertainty

**Engineering question:** How do we reason when components fail independently and no participant has complete knowledge?

**Required technical scope:** process/node failure; network delay/omission; partitions; asymmetric reachability; slow versus failed; failure detection limits; timeouts as suspicion; independent state; ambiguous outcomes and failure domains.

**Critical distinctions:** no response != operation did not happen; timeout != proof of remote crash; partition != total outage; failure detection != certainty.

**Causal reasoning path:** Independent components communication uncertainty incomplete observation timeout/suspicion -> ambiguous state conservative recovery.

**Real Food Ordering pressure:** Inject dependency unavailability and delayed communication while preserving caller/callee evidence.

**Failure/experiment inventory:** crash before effect; crash after effect; response lost; dependency recovers after caller gives up. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Partition uncertainty matrix: compare caller belief with remote committed state under dropped messages.

**Mastery demonstration:** Reason from evidence under uncertainty without inventing remote state. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 4.2 — Failure Propagation, Fan-Out & Cascading Failure

**Engineering question:** How does a local slowdown become a system-wide incident?

**Required technical scope:** dependency chains; fan-out; latency accumulation; availability composition; resource retention; pool/thread saturation; queue growth; correlated dependencies; retry amplification; feedback loops and blast radius.

**Critical distinctions:** symptom != root cause; dependency failure != only cascade source; redundancy != independence.

**Causal reasoning path:** Local slowdown resources held queues/pools saturate P99 timeout retry added load -> wider saturation.

**Real Food Ordering pressure:** Construct a reproducible cascade such as slow DB/downstream causing connection/request saturation.

**Failure/experiment inventory:** slow DB Hikari saturation. ->; slow payment; fan-out with one slow branch; retry amplification. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Fan-out failure tree: change dependency fan-out and observe cascading availability and latency.

**Mastery demonstration:** Reconstruct a cascade from evidence and identify the smallest intervention that breaks the feedback loop. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 4.3 — Retry Semantics, Backoff, Jitter & Retry Budgets

**Engineering question:** When does another attempt improve reliability and when does it amplify failure?

**Required technical scope:** transient/permanent failure; retryability; bounded attempts; immediate/fixed/exponential backoff; jitter; retry budgets; deadline-aware retry; layered retries; storms and amplification.

**Critical distinctions:** retry != resilience; backoff != rate limiting; retryable transport error != safe business retry; attempt count != time budget.

**Causal reasoning path:** Observe failure classify remaining deadline safety/idempotency bounded retry observe -> recovery/load.

**Real Food Ordering pressure:** Introduce naive retries first, demonstrate amplification, then evolve policy where justified.

**Failure/experiment inventory:** immediate retries against overload; layered retries; bounded backoff; retry after ambiguous payment. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Retry storm simulator: compare exponential backoff, jitter and retry budgets during an outage.

**Mastery demonstration:** Design retry policy from semantics and capacity, including amplification calculation. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 4.4 — Idempotency, Deduplication & Safe Re-execution

**Engineering question:** How do we safely repeat an operation when a previous attempt may already have produced its effect?

**Required technical scope:** business idempotency; operation identity; idempotency keys; durable records; stored results; concurrent duplicate races; deduplication; retention; replay; external side effects.

**Critical distinctions:** HTTP idempotence != business idempotency; request ID != idempotency key automatically; dedup != exactly-once delivery.

**Causal reasoning path:** Ambiguous attempt stable operation identity atomic claim/check execute persist outcome -> duplicate returns prior outcome.

**Real Food Ordering pressure:** Evolve a payment/order path to tolerate repeated and concurrent duplicate requests; preserve preidempotent failure state.

**Failure/experiment inventory:** lost response then retry; concurrent identical requests; restart; key expiry; conflicting payload under same key. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Idempotency ledger explorer: replay payment commands with duplicate keys, changing payloads and failures.

**Mastery demonstration:** Design idempotency around business effects and state its atomicity boundary and limitations. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

**Phase IV completion check:** verify the outcomes above against both the documented curriculum and the actual application/evidence state. Passing a glossary quiz is insufficient; if no runtime change is justified, document the no-change decision and its evidence.

---

## Phase V — RESOURCE PROTECTION, RESILIENCE & OVERLOAD

**Learning-and-engineering intent.** Protect bounded resources under overload and cascading failure. Academy emphasis: stress controls and resource-budget feedback.

**Source milestone.**  Protect bounded resources and prevent dependency/overload cascades using measured failure chains.

**Application evolution path.** Evolve real clients/endpoints with the minimum justified resilience mechanisms, then rerun the same load/failure experiments.

**Phase exit evidence.** Timeouts, circuit breakers, bulkheads, admission control, load shedding and degradation are tied to evidence and SLO impact rather than pattern checklists.

**Deliberately deferred.** No resilience mechanism without a named failure chain, protected resource and removal trigger.

### Cluster 5.1 — Circuit Breakers & Dependency Protection

**Engineering question:** When should a caller stop sending work to a dependency unlikely to succeed?

**Required technical scope:** closed/open/half-open states; failure/slow-call classification; thresholds; rolling observation; open duration; probes; timeout/retry interaction; fallback and recovery.

**Critical distinctions:** breaker != retry; breaker != rate limiter; open != dependency definitely down; fallback != automatically correct.

**Causal reasoning path:** Outcomes health signal threshold open fail fast/degrade probe close/reopen.

**Real Food Ordering pressure:** Introduce only after reproducing dependency-failure pressure and compare with timeout/retry alone.

**Failure/experiment inventory:** hard failure; slow dependency; flapping; half-open overload; unsafe fallback. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Circuit-breaker state explorer: change open/half-open timing and test recovery against dependency load.

**Mastery demonstration:** Choose breaker boundaries/signals and know when not to use one. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 5.2 — Bulkheads & Failure Isolation

**Engineering question:** How can one dependency or workload be prevented from consuming all shared capacity?

**Required technical scope:** shared pools; dedicated limits; failure domains; starvation; blast radius; reservation; fragmentation; fairness and isolation boundaries.

**Critical distinctions:** bulkhead != breaker; service boundary != resource isolation; separate pool != unlimited capacity.

**Causal reasoning path:** Shared capacity monopolization unrelated starvation isolate contain evaluate utilization -> cost.

**Real Food Ordering pressure:** Demonstrate starvation between two workload/dependency paths before isolation.

**Failure/experiment inventory:** slow payment consumes outbound capacity; protected critical path; stranded reserved capacity. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Bulkhead resource allocator: isolate payment and menu work and inspect surviving throughput under saturation.

**Mastery demonstration:** Select isolation boundaries from criticality and failure behavior and quantify utilization cost. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 5.3 — Rate Limiting, Concurrency Limiting & Admission Control

**Engineering question:** How much new work should a finite-capacity system admit?

**Required technical scope:** offered/admitted load; token/leaky bucket intuition; concurrency limits; queue admission; fairness; priority; provider quotas and dynamic/static limits.

**Critical distinctions:** rate != concurrency; rate limit != queue; admission != retry; client quota != downstream capacity.

**Causal reasoning path:** Offered work policy/capacity signal admit/reject/defer bounded in-flight work.

**Real Food Ordering pressure:** Protect a constrained dependency and compare rate versus concurrency limits under slow responses.

**Failure/experiment inventory:** same RPS with longer service time; bursts; tenant monopolization; external quota. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Rate and concurrency limit sandbox: compare token limits, in-flight caps and user-facing rejection behavior.

**Mastery demonstration:** Choose the controlled quantity that matches the bottleneck. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 5.4 — Load Shedding, Backpressure & Graceful Degradation

**Engineering question:** When is refusing, slowing or degrading work the correct reliability strategy?

**Required technical scope:** load shedding; backpressure; bounded queues; producer/consumer imbalance; graceful degradation; priority; stale/partial response trade-offs and recovery.

**Critical distinctions:** shedding != rate limiting; backpressure != queue growth; degradation != silent incorrectness.

**Causal reasoning path:** Capacity pressure detect signal/limit/reject/degrade preserve critical work recover.

**Real Food Ordering pressure:** Create overload and evolve explicit rejection/degradation rather than unbounded waiting.

**Failure/experiment inventory:** queue full; disable noncritical feature; stale cache fallback; producer slows. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Backpressure control room: add demand bursts and choose queuing, shedding or degraded responses.

**Mastery demonstration:** Explain when rejection improves user-visible reliability and what may safely degrade. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

**Phase V completion check:** verify the outcomes above against both the documented curriculum and the actual application/evidence state. Passing a glossary quiz is insufficient; if no runtime change is justified, document the no-change decision and its evidence.

---

## Phase VI — DISTRIBUTED COMMUNICATION ARCHITECTURE

**Learning-and-engineering intent.** Choose synchronous/async semantics per workflow and avoid uniform, fashionable messaging. Academy emphasis: time coupling and recipient/routing choices.

**Source milestone.**  Choose communication style per workflow rather than standardizing the whole platform prematurely.

**Application evolution path.** Compare actual synchronous flows with asynchronous alternatives where business semantics permit. Create real queue/pub-sub experiments only for selected workflows.

**Phase exit evidence.** Each important inter-component workflow has a defended communication style and explicit temporal/consistency/failure semantics.

**Deliberately deferred.** Do not introduce Kafka simply because asynchronous communication is discussed; Phase VII owns Kafka as a mechanism.

### Cluster 6.1 — Synchronous Communication & Temporal Coupling

**Engineering question:** When is request/response the right model and what coupling does it introduce?

**Required technical scope:** caller waiting; temporal/latency/failure coupling; synchronous chains; fan-out; deadlines; contracts and availability composition.

**Critical distinctions:** synchronous != simple; REST != only sync style; service independence != runtime independence.

**Causal reasoning path:** Immediate-result need remote request wait success/failure/timeout propagate/transform.

**Real Food Ordering pressure:** Retain a meaningful synchronous order-payment/restaurant path for later comparison.

**Failure/experiment inventory:** slow downstream; multi-hop deadline; fan-out tail; callee unavailable. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Synchronous dependency chain: toggle downstream availability and watch temporal coupling and timeout propagation.

**Mastery demonstration:** Choose sync communication when semantics require it and quantify coupling. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 6.2 — Asynchronous Communication & Temporal Decoupling

**Engineering question:** What changes when the producer no longer waits for the consumer to perform work?

**Required technical scope:** messages; broker; producer/consumer; acceptance; backlog; delayed processing; eventual completion; failure after acceptance; freshness; retry/replay and operational complexity.

**Critical distinctions:** async != event-driven; accepted != completed; temporal decoupling != semantic independence; queue != infinite buffer.

**Causal reasoning path:** Producer signal durable broker later consumer processing asynchronous outcome.

**Real Food Ordering pressure:** Convert only a workflow whose requirements justify delayed processing; preserve sync version.

**Failure/experiment inventory:** consumer offline; backlog; accepted but processing fails; pending user state. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Async timeline sandbox: publish work, pause consumers, restart processing and inspect eventual completion.

**Mastery demonstration:** Explain guarantees/uncertainties and how eventual outcome is observed. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 6.3 — Commands, Events, Queues, Pub/Sub & Competing Consumers

**Engineering question:** What semantic contract does a message represent and who is responsible for acting?

**Required technical scope:** commands as intent; events as facts; work queues; pub/sub; competing consumers; broadcast; event notification/state transfer; ownership and schemas.

**Critical distinctions:** command != event; queue != topic; pub/sub != work queue; notification != event-carried state.

**Causal reasoning path:** Interaction semantics command/event topology responsibility delivery/failure semantics.

**Real Food Ordering pressure:** Model Food Ordering message contracts before Kafka-specific implementation.

**Failure/experiment inventory:** duplicate command consumers; insufficient event state; command accidentally broadcast. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Command-event-routing board: place commands/events on queue or pub-sub patterns and predict recipients.

**Mastery demonstration:** Select messaging semantics from business responsibility. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 6.4 — Communication Style Selection

**Engineering question:** How do we choose local, synchronous remote or asynchronous communication for an interaction?

**Required technical scope:** response immediacy; latency; availability; consistency; ordering; throughput; burst tolerance; temporal coupling; failure recovery; operational cost and contract evolution.

**Critical distinctions:** technology preference != requirement; Kafka != automatically scalable; async != automatically eventual for all state.

**Causal reasoning path:** Interaction requirement qualities failure model candidate styles trade-offs decision -> validation.

**Real Food Ordering pressure:** Create a communication decision matrix and implement only justified choices.

**Failure/experiment inventory:** sync vs async outage behavior; latency versus freshness; operational complexity. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Communication decision studio: compare RPC, queue and event options under changing order workflow requirements.

**Mastery demonstration:** Defend communication choices and choose HTTP over Kafka when appropriate. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

**Phase VI completion check:** verify the outcomes above against both the documented curriculum and the actual application/evidence state. Passing a glossary quiz is insufficient; if no runtime change is justified, document the no-change decision and its evidence.

---

## Phase VII — KAFKA AS A DISTRIBUTED SYSTEM

**Learning-and-engineering intent.** Study Kafka as a replicated log with producer/consumer crash windows and measurable backlog. Academy emphasis: partition, offset, replay and rebalance simulations.

**Source milestone.**  Introduce Kafka into the real platform only for workflows already justified as log/event-stream problems.

**Application evolution path.** Add reproducible Kafka infrastructure for local/CI experimentation, real producers/consumers, schemas/contracts, lag evidence and failure/replay tests. Keep unrelated synchronous flows unchanged.

**Phase exit evidence.** Kafka topics/partitions/producers/consumers exist only where justified, with delivery, ordering, replay and recovery behavior experimentally demonstrated.

**Deliberately deferred.** Do not equate Kafka with exactly-once business effects or use it as a universal service connector.

### Cluster 7.1 — Distributed Log, Topics, Partitions, Records & Offsets

**Engineering question:** What is Kafka actually storing and ordering?

**Required technical scope:** append-only log; topics; partitions; records; keys; offsets; per-partition ordering; retention; immutable history; partitioning and parallelism.

**Critical distinctions:** Kafka != queue; offset != message ID; partition != consumer; topic ordering != global ordering.

**Causal reasoning path:** Record key partition append offset retention independent consumer position.

**Real Food Ordering pressure:** Introduce Kafka only after async communication is justified; begin with minimal topic/partition design.

**Failure/experiment inventory:** partition/order by key; partition-count change; replay retained records. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Partitioned-log explorer: append records, allocate partitions and navigate offsets with ordering boundaries.

**Mastery demonstration:** Draw the log and predict ordering/parallelism from key and partition choices. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 7.2 — Producer Execution, Partition Selection, Batching & Acknowledgement

**Engineering question:** What happens from application send to broker acknowledgement?

**Required technical scope:** serialization; keys; partition selection; buffering; batching; linger/size trade-offs; network send; leader append; acknowledgements; retries; duplicate possibilities and idempotent producer concepts.

**Critical distinctions:** send invoked != durable; broker ack != consumer processed; producer retry != business idempotency.

**Causal reasoning path:** App record serialize partition batch send leader append/replicate ack/error.

**Real Food Ordering pressure:** Instrument producer behavior and compare immediate small sends with batching under controlled load.

**Failure/experiment inventory:** broker unavailable; ack lost; batching latency/throughput; serialization failure. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Producer acknowledgement laboratory: tune batching, acks, retries and duplicate risks.

**Mastery demonstration:** Explain producer failure windows and choose ack/batching from latency/durability needs. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 7.3 — Brokers, Leaders, Replicas & Durability

**Engineering question:** What does Kafka replication protect and what does an acknowledgement mean?

**Required technical scope:** brokers; partition leaders/followers; replication factor; ISR; replication lag; ack policies; leader failure/election and availability/durability trade-offs.

**Critical distinctions:** replication != backup; leader ack != consumer effect; replica count != all current.

**Causal reasoning path:** Producer leader append follower replication ack condition possible leader failure.

**Real Food Ordering pressure:** Use multi-broker local setup if feasible; otherwise clearly bound simulation evidence.

**Failure/experiment inventory:** leader unavailable; follower lag; ack trade-off; broker failure during produce. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Broker replication failure lab: kill a leader before/after acknowledgements and inspect durability assumptions.

**Mastery demonstration:** State exactly what an acknowledgement establishes and what loss windows remain. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 7.4 — Consumers, Consumer Groups, Partition Assignment & Rebalancing

**Engineering question:** How can processes cooperatively consume a partitioned log and recover from membership changes?

**Required technical scope:** poll/fetch; consumer groups; partition ownership; assignment; partition-constrained parallelism; membership; rebalance; slow consumers; crashes; processing state and offset relationship.

**Critical distinctions:** consumer != group; consumer count != arbitrary parallelism; ownership != record ownership; fetch position != committed offset; rebalance != failure.

**Causal reasoning path:** single consumer partitions group assignment parallelism membership change rebalance -> resume.

**Real Food Ordering pressure:** Scale consumers for a real event flow and preserve assignment/idle-consumer evidence.

**Failure/experiment inventory:** join/leave; crash; more consumers than partitions; slow consumer; skew. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Consumer-group rebalance animation: add and remove workers and observe partition assignment pauses.

**Mastery demonstration:** Predict assignment, max useful parallelism and rebalance effects. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 7.5 — Offsets, Crash Windows & Delivery Semantics

**Engineering question:** When is a record considered processed and what happens around crashes?

**Required technical scope:** fetch position; committed offset; commit strategies; process-before-commit; commit-before-process; crash windows; at-most-once; at-least-once and exact-once scope.

**Critical distinctions:** fetched != processed; processed != committed; offset commit != business transaction; Kafka EOS != universal business EOS.

**Causal reasoning path:** Fetch process effect commit; compare orderings and crash boundaries.

**Real Food Ordering pressure:** Implement visible crash windows, then evolve to required semantics.

**Failure/experiment inventory:** crash before effect; after effect before commit; commit before effect; restart/rebalance. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Offset-commit crash-window explorer: crash consumers around processing and commit boundaries.

**Mastery demonstration:** Draw crash timelines and predict loss/duplication. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 7.6 — Ordering, Duplicates, Replay & Idempotent Consumers

**Engineering question:** What ordering/duplicate guarantees does the business need?

**Required technical scope:** partition ordering; key affinity; cross-partition concurrency; duplicates; replay; idempotent processing; dedup state and poison/repeated events.

**Critical distinctions:** partition order != global; duplicate record != duplicate effect necessarily; replay != retry.

**Causal reasoning path:** Business order need key/partition concurrency duplicate/replay handling evidence.

**Real Food Ordering pressure:** Choose keys for real events and demonstrate per-key order versus no global order.

**Failure/experiment inventory:** same-order ordering; cross-order interleaving; replay; duplicates. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Replay and ordering laboratory: introduce duplicate/out-of-order records and test consumer idempotency.

**Mastery demonstration:** Specify minimum ordering and keep consumers replay-safe. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 7.7 — Consumer Lag, Backlog, Backpressure & Recovery Capacity

**Engineering question:** What happens when arrival exceeds processing and how long will recovery take?

**Required technical scope:** arrival/processing rate; lag; backlog age; freshness; skew; slow processing; downstream bottlenecks; poison messages; scaling limits; spare recovery capacity and retention risk.

**Critical distinctions:** lag count != time lag; more consumers != more capacity without partitions/downstream; backlog != loss.

**Causal reasoning path:** arrival > processing lag grows; processing > arrival drains at spare capacity.

**Real Food Ordering pressure:** Overload a consumer, measure lag, then change one capacity variable at a time.

**Failure/experiment inventory:** slow DB; hot partition; consumer scale; partition constraint; recovery after outage. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Consumer lag recovery calculator: tune input rate and processing capacity to predict catch-up time.

**Mastery demonstration:** Calculate whether the fleet can recover while new traffic continues. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

**Phase VII completion check:** verify the outcomes above against both the documented curriculum and the actual application/evidence state. Passing a glossary quiz is insufficient; if no runtime change is justified, document the no-change decision and its evidence.

---

## Phase VIII — DISTRIBUTED DATA, OWNERSHIP & CONSISTENCY

**Learning-and-engineering intent.** Clarify authority, freshness and conflict resolution; distinguish logical consistency needs from deployment shape. Academy emphasis: replica/staleness and concurrent-write timelines.

**Source milestone.**  Make data authority, consistency and scale properties real in persistence.

**Application evolution path.** Evolve actual PostgreSQL ownership, optimistic concurrency, freshness policies, replication/read-scaling experiments and partitioning models where evidence demands them.

**Phase exit evidence.** Data ownership and consistency guarantees are encoded in schema/repository/transaction behavior and validated under concurrent/stale scenarios.

**Deliberately deferred.** Do not split databases, replicate, shard or denormalize solely to imitate microservice conventions.

### Cluster 8.1 — Data Ownership & Authority

**Engineering question:** Who is allowed to decide the truth of each datum?

**Required technical scope:** authoritative source; ownership; private service data; shared DB coupling; schema ownership; duplicated/derived representations; cross-context identifiers and read models.

**Critical distinctions:** copy != ownership; read access != write authority; DB-per-service != DB-server-per-service.

**Causal reasoning path:** responsibility authority owner contract derived copies synchronization.

**Real Food Ordering pressure:** Assign ownership for order, payment, restaurant/menu and customer data; eliminate ambiguous multiwriter paths.

**Failure/experiment inventory:** two services update same field; schema change breaks consumer; stale derived copy. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Data-authority map: choose owners of Order, Payment and Restaurant facts; test forbidden cross-context writes.

**Mastery demonstration:** For any field, identify authority, writers, readers and synchronization expectation. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 8.2 — Consistency Models, Staleness & Freshness

**Engineering question:** How current and mutually consistent must distributed views be?

**Required technical scope:** strong/eventual consistency; stale reads; convergence; freshness bounds; read-your-writes; monotonic expectations where useful; UX and reconciliation.

**Critical distinctions:** eventual != arbitrary; freshness != correctness; availability != consistency.

**Causal reasoning path:** business requirement visibility guarantee allowed staleness propagation reconciliation.

**Real Food Ordering pressure:** Create an intentionally delayed derived/read copy and expose pending/stale state.

**Failure/experiment inventory:** delayed read model; payment/order view divergence; consumer outage. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Read-consistency lab: vary replica lag and inspect staleness promises for customer and merchant views.

**Mastery demonstration:** State what inconsistency is acceptable, for how long, to whom, and how convergence is verified. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 8.3 — Concurrent Updates & Optimistic Concurrency

**Engineering question:** How do actors avoid silently overwriting valid concurrent work?

**Required technical scope:** read-modify-write; lost update; versions; CAS intuition; optimistic concurrency; conflict detection; semantic retry/merge and contention.

**Critical distinctions:** conflict != duplicate request; optimistic concurrency != idempotency; last-write-wins != always correct.

**Causal reasoning path:** read version decide conditional write success/conflict re-read/re-evaluate.

**Real Food Ordering pressure:** Add version protection to a meaningful state transition.

**Failure/experiment inventory:** two updates same version; unsafe automatic retry; high contention. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Lost-update race simulator: compare version checks, CAS and blind updates on the same Order.

**Mastery demonstration:** Identify mechanical versus business-semantic conflict resolution. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 8.4 — Replication, Read Scaling & Replication Lag

**Engineering question:** What does replication improve and what inconsistency/failure does it introduce?

**Required technical scope:** leader/follower; sync/async replication; lag; stale reads; read routing; failover; promotion; durability windows and read scaling.

**Critical distinctions:** replication != backup; replica availability != freshness; read scaling != write scaling; failover != DR.

**Causal reasoning path:** write replication lag read routing stale read/failure failover.

**Real Food Ordering pressure:** Model or simulate replica-lag consequences if real replication is outside the lab.

**Failure/experiment inventory:** read-after-write lag; leader failure before catch-up; read traffic shift. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Replica timeline: delay replication, fail a leader and compare read freshness with write durability.

**Mastery demonstration:** Choose replica use from consistency requirements and state remaining loss/staleness windows. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 8.5 — Partitioning, Sharding, Routing & Hotspots

**Engineering question:** How can data be divided without creating worse coordination problems?

**Required technical scope:** partition/shard keys; hash/range intuition; routing; distribution; hot keys/tenants; cross-shard work; rebalancing; resharding and operational complexity.

**Critical distinctions:** partitioning != replication; shard key != primary key necessarily; even rows != even load.

**Causal reasoning path:** measured bottleneck partition dimension key routing distribution cross-partition cost -> rebalance.

**Real Food Ordering pressure:** Evaluate candidate shard keys from workload; avoid premature physical sharding.

**Failure/experiment inventory:** hot restaurant; range hotspot; cross-shard query; resharding. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Sharding-router map: alter shard keys and traffic skew to reveal hotspots and rebalance cost.

**Mastery demonstration:** Select shard keys from workload/locality/future operations. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

**Phase VIII completion check:** verify the outcomes above against both the documented curriculum and the actual application/evidence state. Passing a glossary quiz is insufficient; if no runtime change is justified, document the no-change decision and its evidence.

---

## Phase IX — DISTRIBUTED TRANSACTIONS & RELIABLE STATE PROPAGATION

**Learning-and-engineering intent.** Handle business processes spanning independent authorities without inventing atomic cross-service commits. Academy emphasis: sagas, compensation, dual writes, Outbox/Inbox.

**Source milestone.**  Solve real multi-authority state propagation and long-running transaction problems.

**Application evolution path.** Use actual Food Ordering workflows to demonstrate dual-write failure before introducing Saga/Outbox/Inbox/compensation. Implement only the mechanisms whose failure windows are observed.

**Phase exit evidence.** Selected workflows have reliable local commit/publication and/or long-running completion semantics with crash/replay evidence.

**Deliberately deferred.** No blanket Saga, 2PC or Outbox adoption across every service.

### Cluster 9.1 — Local ACID Boundaries & the Dual-Write Problem

**Engineering question:** What breaks when one operation must update two independently committed systems?

**Required technical scope:** local ACID; DB commit; message publish; both orderings; crash windows; lost/phantom events; duplicate publication and transaction limitations.

**Critical distinctions:** local transaction != distributed; DB commit != event published; publish != DB commit; @Transactional != DB+Kafka atomicity by default.

**Causal reasoning path:** business state + integration signal independent commits orderings crash windows -> inconsistency.

**Real Food Ordering pressure:** Preserve an intentionally unsafe dual-write before fixing it.

**Failure/experiment inventory:** DB commit then crash; publish then DB failure; ambiguous publish ack. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Dual-write crash explorer: move crash point between DB commit and message publication.

**Mastery demonstration:** Draw every crash window and resulting inconsistent state. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 9.2 — Saga & Long-Running Business Transactions

**Engineering question:** How can a workflow progress across local transactions without pretending they share ACID?

**Required technical scope:** Saga state; local transactions; orchestration; choreography; commands/events; retries; partial completion; compensation; timeout; stuck state; observability and manual recovery.

**Critical distinctions:** Saga != distributed ACID; choreography != no coupling; compensation != rollback.

**Causal reasoning path:** workflow local step durable outcome next step failure branch compensate/recover -> terminal state.

**Real Food Ordering pressure:** Evolve order/payment/restaurant workflow into Saga only after consistency problem is visible.

**Failure/experiment inventory:** payment succeeds restaurant rejects; orchestrator crash; duplicate event; compensation failure. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Saga orchestration timeline: step order, payment and restaurant outcomes through success and failure.

**Mastery demonstration:** Model Saga state and defend orchestration/choreography choice. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 9.3 — Compensation, Semantic Undo & Irreversible Effects

**Engineering question:** What does undo mean when completed distributed actions cannot be rolled back?

**Required technical scope:** compensating actions; semantic reversal; refund/void; reservation release; irreversible effects; failed/repeated compensation; ordering and human intervention.

**Critical distinctions:** compensation != rollback; refund != erasing history; reverse action != exact prior world.

**Causal reasoning path:** effect completes later failure compensability compensation record escalate if impossible.

**Real Food Ordering pressure:** Add explicit compensation states and failures where semantics justify.

**Failure/experiment inventory:** refund unavailable; duplicate compensation; irreversible preparation/delivery. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Compensation decision lab: compare refunds, cancellations and irreversible external side effects.

**Mastery demonstration:** Design compensation from domain semantics and know when manual recovery is correct. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 9.4 — Transactional Outbox & Reliable Publication

**Engineering question:** How can business state and intent-to-publish be committed atomically?

**Required technical scope:** outbox row; same DB transaction; relay; polling/CDC concept; retries; duplicate publication; ordering; cleanup; backlog and observability.

**Critical distinctions:** Outbox != exactly-once; outbox row != domain event automatically; published flag != consumed.

**Causal reasoning path:** business + outbox in local tx commit relay publish ack mark/progress.

**Real Food Ordering pressure:** Replace unsafe dual-write with Outbox and keep original failure test.

**Failure/experiment inventory:** crash before relay; crash after publish before mark; relay outage; duplicate publish. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Outbox dispatcher lifecycle: crash before/after outbox insert, publish and marking sent.

**Mastery demonstration:** Enumerate crash windows and prove what Outbox fixes and does not fix. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 9.5 — Inbox, Deduplication & Reliable Consumer Effects

**Engineering question:** How can message identity and business side effects remain consistent across crashes/redelivery?

**Required technical scope:** message identity; inbox/dedup record; atomic effect+marker; redelivery; replay; retention; concurrent duplicates and poison messages.

**Critical distinctions:** offset != dedup record; Inbox != broker feature; dedup != ordering.

**Causal reasoning path:** receive claim/check identity effect + processed marker atomically commit duplicate no-op.

**Real Food Ordering pressure:** Evolve a consumer whose effect must not repeat using durable dedup.

**Failure/experiment inventory:** crash after effect before offset; concurrent same message; expired dedup then replay. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Inbox deduplication laboratory: replay deliveries and verify one business effect under repeated consumption.

**Mastery demonstration:** Explain exact atomicity boundary protecting the effect. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

**Phase IX completion check:** verify the outcomes above against both the documented curriculum and the actual application/evidence state. Passing a glossary quiz is insufficient; if no runtime change is justified, document the no-change decision and its evidence.

---

## Phase X — CQRS, MATERIALIZED VIEWS & EVENT SOURCING

**Learning-and-engineering intent.** Introduce CQRS/materialized views/Event Sourcing only when workload or audit/history forces justify them. Academy emphasis: projection lag/replay.

**Source milestone.**  Separate read/write models only where measured query/write asymmetry or history requirements justify it.

**Application evolution path.** Build real projections/materialized views for selected read paths. Event Sourcing remains an optional conclusion, not a mandatory milestone.

**Phase exit evidence.** CQRS/projection benefits and maintenance/rebuild costs are measured; Event Sourcing is adopted or explicitly rejected with evidence.

**Deliberately deferred.** Do not event-source ordinary CRUD/domain state without a concrete need for authoritative event history and reconstruction.

### Cluster 10.1 — Read/Write Asymmetry & CQRS

**Engineering question:** When do command and query needs differ enough to justify separate models?

**Required technical scope:** command/query models; independent optimization; denormalization; synchronization; eventual consistency; ownership; operational/rebuild complexity.

**Critical distinctions:** CQRS != microservices; CQRS != Event Sourcing; separate DTO != full CQRS.

**Causal reasoning path:** observed read/write tension separate responsibilities propagation query model -> freshness/rebuild trade-offs.

**Real Food Ordering pressure:** Introduce a query model only for a justified read path.

**Failure/experiment inventory:** projection delayed; query model unavailable; command succeeds but read stale. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Read/write workload split: compare direct aggregate reads with independent query models.

**Mastery demonstration:** Defend CQRS with a concrete force and know when simpler reads are better. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 10.2 — Projections & Materialized Views

**Engineering question:** How can derived read state be built, kept fresh enough and recovered?

**Required technical scope:** projection handlers; derived state; checkpoints; lag; idempotency; replay; rebuild; reconciliation; schema evolution and failures.

**Critical distinctions:** projection != authority by default; rebuildable != costless; freshness != correctness guarantee.

**Causal reasoning path:** source history handler derived state query; failure replay/rebuild reconcile.

**Real Food Ordering pressure:** Build one useful read model with deterministic rebuild path.

**Failure/experiment inventory:** consumer outage; duplicate event; schema change; rebuild during new traffic. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Projection-lag dashboard: pause handlers and show materialized view freshness and rebuild mechanics.

**Mastery demonstration:** Prove projection correctness/freshness and recovery path. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 10.3 — Event Sourcing

**Engineering question:** When should events themselves be authoritative state?

**Required technical scope:** event streams; reconstruction; append-only history; expected version; snapshots; event versioning; replay; temporal/audit value; projection dependence and operational cost.

**Critical distinctions:** Event Sourcing != EDA; != Kafka; != audit logging; domain stream != integration topic.

**Causal reasoning path:** command reconstruct validate append events derive state/projections.

**Real Food Ordering pressure:** Use only as focused experiment/justified context, not whole-platform default.

**Failure/experiment inventory:** long stream rebuild; old schema; concurrent append; immutable bad event. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Event-stream reconstruction explorer: replay events and test schema evolution and replay cost.

**Mastery demonstration:** Explain permanence/evolution cost and where benefits justify it. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

**Phase X completion check:** verify the outcomes above against both the documented curriculum and the actual application/evidence state. Passing a glossary quiz is insufficient; if no runtime change is justified, document the no-change decision and its evidence.

---

## Phase XI — REDIS & CACHING ARCHITECTURE

**Learning-and-engineering intent.** Use caching only as an evidence-based tactic with invalidation, hot-key and operational trade-offs. Academy emphasis: freshness and cache overload models.

**Source milestone.**  Introduce Redis/caching to solve a measured latency/load/state problem.

**Application evolution path.** Add Redis only to selected real reads, hot keys, rate-limit state or coordination cases. Preserve no-cache baseline and failure modes.

**Phase exit evidence.** Hit rate, latency, DB-load reduction, invalidation/stampede/eviction behavior and failure consequences are measured.

**Deliberately deferred.** No cache without ownership, invalidation, TTL and failure semantics.

### Cluster 11.1 — Caching as an Architectural Performance Tactic

**Engineering question:** What measured problem justifies another copy of data?

**Required technical scope:** locality; hit/miss; hit ratio; working set; miss penalty; cacheability; volatility; memory/network cost and source of truth.

**Critical distinctions:** cache != source of truth; hit ratio != value alone; Redis != only cache; cache success != fresh.

**Causal reasoning path:** measured bottleneck repeated expensive read cacheability cache measure source-load/latency -> trade-off.

**Real Food Ordering pressure:** Baseline an expensive/high-volume read before Redis.

**Failure/experiment inventory:** cold cache; low hit ratio; volatile data; cache outage. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Cache benefit/cost sandbox: adjust hit ratio, object size, latency and database workload.

**Mastery demonstration:** Quantify whether caching addresses the actual bottleneck and consistency cost. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 11.2 — Cache-Aside, Read-Through & Write Strategies

**Engineering question:** How should reads/writes interact with cached and authoritative state?

**Required technical scope:** cache-aside; read-through; write-through; write-behind conceptually; miss paths; invalidation/update and failure ordering.

**Critical distinctions:** cache-aside != read-through; write-through != write-behind; cache success != DB success.

**Causal reasoning path:** requirement authority cache interaction failure windows validate.

**Real Food Ordering pressure:** Implement cache-aside first where justified and compare alternatives.

**Failure/experiment inventory:** DB succeeds invalidation fails; unsafe cache-before-DB; cache unavailable. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Cache write-strategy timeline: compare cache-aside, read-through and write-through/write-behind risks.

**Mastery demonstration:** Trace every path and state which copy is authoritative. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 11.3 — Cache Invalidation, TTL & Consistency

**Engineering question:** How do cached copies stay within freshness/correctness expectations?

**Required technical scope:** TTL; expiration; explicit/update-on-write/event-driven invalidation; races; staleness; negative caching and freshness SLOs.

**Critical distinctions:** TTL != correctness; event invalidation != immediate consistency; eviction != invalidation semantics.

**Causal reasoning path:** authoritative change invalidation/update cache state read visibility expiry/reconcile.

**Real Food Ordering pressure:** Define freshness for cached menu/restaurant data and implement aligned policy.

**Failure/experiment inventory:** stale refill race; delayed invalidation; TTL too long/short. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Invalidation race explorer: reorder DB writes, cache fill and TTL expiration to reveal stale values.

**Mastery demonstration:** State maximum plausible staleness and how it is limited/detected. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 11.4 — Cache Stampede, Penetration & Failure Amplification

**Engineering question:** How can a cache cause database overload?

**Required technical scope:** thundering herd; hot expiry; cold start; nonexistent-key penetration; negative caching; jitter; coalescing; prewarming and bounded fallback.

**Critical distinctions:** miss != harmless; stampede != low hit ratio; negative cache != permanent absence.

**Causal reasoning path:** hot key expires concurrent misses DB burst DB latency more overlap/timeouts.

**Real Food Ordering pressure:** Reproduce hot-key expiry and measure DB amplification before/after mitigation.

**Failure/experiment inventory:** simultaneous expiry; nonexistent keys; cold restart. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Stampede and penetration simulator: start synchronized misses and observe backend overload protection.

**Mastery demonstration:** Diagnose cache-induced amplification and choose mitigation from workload shape. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 11.5 — Hot Keys, Memory, Eviction & Redis Capacity

**Engineering question:** What limits Redis when traffic and memory are skewed?

**Required technical scope:** hot keys; skew; memory footprint; TTL distribution; eviction; working set; value size; network round trips; batching/pipelining conceptually and headroom.

**Critical distinctions:** memory capacity != request capacity; eviction != expiration; key count != memory use.

**Causal reasoning path:** key/workload distribution memory/request demand hot key/eviction hit ratio/latency source -> load.

**Real Food Ordering pressure:** Measure key popularity and memory behavior for the chosen cache.

**Failure/experiment inventory:** hot restaurant; memory pressure; large values. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Redis memory and hot-key playground: adjust skew, eviction policy and entry sizing.

**Mastery demonstration:** Identify whether bottleneck is memory, network, command rate, hot key or source fallback. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 11.6 — Redis Atomic Operations, Rate-Limit State & Coordination

**Engineering question:** When is Redis useful beyond caching and what guarantees should not be assumed?

**Required technical scope:** atomic commands; counters; conditional set; expiration; rate-limit state; shared ephemeral state; Lua/transaction concepts where useful; lock/lease intuition and durability assumptions.

**Critical distinctions:** atomic Redis command != distributed transaction; Redis lock != automatically safe; expiration != ownership proof.

**Causal reasoning path:** coordination need required primitive failure assumptions Redis mechanism validate limits.

**Real Food Ordering pressure:** Use Redis for justified rate-limit/counter experiment; postpone strong lock claims.

**Failure/experiment inventory:** counter expiry race; Redis unavailable; holder exceeds lease. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Atomic Redis operation sandbox: compare client read-modify-write with server-side atomic operations.

**Mastery demonstration:** State exactly what Redis atomicity protects and what remains outside. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

**Phase XI completion check:** verify the outcomes above against both the documented curriculum and the actual application/evidence state. Passing a glossary quiz is insufficient; if no runtime change is justified, document the no-change decision and its evidence.

---

## Phase XII — PERFORMANCE, SCALABILITY & ELASTICITY

**Learning-and-engineering intent.** Trace measured bottlenecks and capacity ceilings across layers; model alternatives before scaling. Academy emphasis: throughput/queueing/cost curves.

**Source milestone.**  Drive performance and scalability from bottleneck evidence across the whole running platform.

**Application evolution path.** Use repeatable load tests, profiling and DB/resource metrics to tune application, database, queues and routing. Compare vertical/horizontal scaling and batching.

**Phase exit evidence.** Capacity model, bottleneck history and scaling choices are supported by measured curves rather than component-count intuition.

**Deliberately deferred.** Do not autoscale the application while ignoring the database, broker or provider bottleneck.

### Cluster 12.1 — Bottleneck Identification & Saturation Analysis

**Engineering question:** What resource actually limits end-to-end performance?

**Required technical scope:** service demand; utilization; saturation; queues; CPU; workers; DB connections/locks/IO; network; Kafka partitions/consumers; Redis; downstream quotas and bottleneck migration.

**Critical distinctions:** high utilization != bottleneck; scale app != scale system; queue != root cause.

**Causal reasoning path:** workload resource demand utilization saturation queue latency/ceiling evidence.

**Real Food Ordering pressure:** Run end-to-end load and build bottleneck map.

**Failure/experiment inventory:** DB pool; CPU; quota; Kafka partition limit. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Bottleneck detective: inspect CPU, pool, DB, queue and latency evidence under changing workloads.

**Mastery demonstration:** Identify constraining resource and predict next bottleneck. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 12.2 — Vertical & Horizontal Scaling

**Engineering question:** When do bigger instances or more instances improve the system?

**Required technical scope:** scale-up/out; statelessness; state placement; load distribution; shared dependencies; coordination; cost and failure domains.

**Critical distinctions:** horizontal != linear; stateless service != stateless system; more replicas != more DB capacity.

**Causal reasoning path:** known bottleneck scale dimension expected gain shared dependency check experiment new -> bottleneck.

**Real Food Ordering pressure:** Scale one service and demonstrate improvement plus downstream ceiling.

**Failure/experiment inventory:** double apps same DB; consumers beyond partitions; lock contention. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Scale-up/scale-out model: tune instance count versus per-instance capacity and shared bottlenecks.

**Mastery demonstration:** Predict scaling efficiency and why gains flatten. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 12.3 — Load Distribution & Routing

**Engineering question:** How should work be distributed so capacity is usable?

**Required technical scope:** routing algorithms conceptually; health/readiness; connection/request distribution; sticky state; uneven work; hot instances and failover.

**Critical distinctions:** equal requests != equal load; healthy process != ready; LB != autoscaler.

**Causal reasoning path:** incoming work route instance capacity/state response health feedback.

**Real Food Ordering pressure:** Use local routing experiments; infra implementation stays Course 3.

**Failure/experiment inventory:** slow instance; sticky skew; misleading health. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Routing and balancing laboratory: compare skew, health checks and sticky routing.

**Mastery demonstration:** Explain routing assumptions and bad-health-signal failure. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 12.4 — Database Capacity & Performance Architecture

**Engineering question:** How do DB work, locks and connections constrain the system?

**Required technical scope:** query cost; indexes conceptually; transaction duration; locks; connections; pools; read/write load; hot rows; batching; pagination and long transactions.

**Critical distinctions:** connection count != DB throughput; index != free; replica != fix write contention.

**Causal reasoning path:** request connection query/tx locks/IO/CPU response release.

**Real Food Ordering pressure:** Profile representative DB path and correlate DB latency with pool/response metrics.

**Failure/experiment inventory:** slow query; lock contention; pool saturation; unbounded query. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Query-performance explorer: adjust index/selectivity and explain why plans and lock contention change.

**Mastery demonstration:** Identify whether limit is query, lock, connection, IO/CPU or access pattern. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 12.5 — Read Replicas, Partitioning & Sharding for Scale

**Engineering question:** Which data-scaling mechanism addresses the measured bottleneck?

**Required technical scope:** read replicas; lag; partitioning/sharding; routing; cross-partition work; hotspots and migration thresholds.

**Critical distinctions:** replica != write scaling; sharding != first response to slow query.

**Causal reasoning path:** measured bottleneck classify read/write/storage evaluate tactic consistency/cost.

**Real Food Ordering pressure:** Use evidence; simulation/design is valid if physical scale is unjustified.

**Failure/experiment inventory:** read-heavy; write hotspot; lag; bad shard key. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Read-replica/shard decision studio: compare freshness, hotspots and operational costs.

**Mastery demonstration:** Choose least-complex tactic that addresses measured pressure. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 12.6 — Queue-Based Load Leveling & Batching

**Engineering question:** How can bursty work be smoothed efficiently without violating freshness?

**Required technical scope:** burst absorption; bounded backlog; consumer rate; batch size/wait; amortized overhead; latency/throughput; partial batch failure and recovery.

**Critical distinctions:** queue != capacity creation; batching != always faster; backlog != harmless.

**Causal reasoning path:** burst queue controlled consumption batch downstream lag/recovery.

**Real Food Ordering pressure:** Apply to suitable event flow and measure batch/consumer trade-offs.

**Failure/experiment inventory:** burst; batch failure; backlog; large-batch latency. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Batching and load-leveling timeline: tune batch size, queue age and recovery demand.

**Mastery demonstration:** Calculate absorption and drain time against freshness SLO. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 12.7 — Elasticity, Autoscaling & Downstream Constraints

**Engineering question:** When should capacity change automatically and which signal predicts need?

**Required technical scope:** elasticity; scale lag; metric selection; CPU/queue/lag/concurrency; min/max; warm-up; downstream DB/partition/quota constraints and oscillation.

**Critical distinctions:** scalability != elasticity; autoscaling != resilience; CPU low != spare end-to-end capacity.

**Causal reasoning path:** demand signal scaling capacity arrives downstream pressure validate.

**Real Food Ordering pressure:** Model autoscaling from Food Ordering measurements; implementation stays Course 3.

**Failure/experiment inventory:** app scales DB saturates; consumers beyond partitions; late scale-out. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Elasticity lag simulator: stress a workload before and after adding instances while downstream caps persist.

**Mastery demonstration:** Choose signal from constrained resource and identify hard ceilings. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

**Phase XII completion check:** verify the outcomes above against both the documented curriculum and the actual application/evidence state. Passing a glossary quiz is insufficient; if no runtime change is justified, document the no-change decision and its evidence.

---

## Phase XIII — AVAILABILITY, RELIABILITY, RESILIENCE & RECOVERY

**Learning-and-engineering intent.** Engineer business capability availability, failure tolerance, durability, DR and actual recoverability. Academy emphasis: failover and recovery drills.

**Source milestone.**  Engineer availability, reliability and recovery around business capabilities.

**Application evolution path.** Run controlled outage, redundancy, backup/restore and recovery drills using the actual platform and data. Define capability-specific degraded behavior.

**Phase exit evidence.** Availability/reliability/durability/recovery objectives and recovery procedures are tested with evidence and known limitations.

**Deliberately deferred.** High availability is not disaster recovery; replication is not backup.

### Cluster 13.1 — Availability Engineering

**Engineering question:** What does available mean from the user's perspective?

**Required technical scope:** user-visible success; windows; degradation; dependency availability; latency threshold; feature scope; SLI/SLO and error budgets.

**Critical distinctions:** process up != service available; HTTP 200 != business success; availability != reliability.

**Causal reasoning path:** user journey success criteria dependencies SLI availability.

**Real Food Ordering pressure:** Define availability for critical journeys and test degraded dependencies.

**Failure/experiment inventory:** payment unavailable; read-only degradation; excessive latency. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Availability budget planner: translate dependency downtime into end-to-end capability unavailability.

**Mastery demonstration:** Define availability in user outcomes and dependency/feature scope. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 13.2 — Reliability Engineering

**Engineering question:** How consistently does the system perform correct work over time?

**Required technical scope:** failure frequency; repeated correctness; transient/persistent faults; repeatability; MTBF/MTTF concepts and data correctness.

**Critical distinctions:** reliability != availability; successful response != correct effect.

**Causal reasoning path:** repeated operation failures classify reliability hypothesis correction.

**Real Food Ordering pressure:** Use repeated duplicate/lost-event experiments to expose non-outage defects.

**Failure/experiment inventory:** rare duplicate charge; intermittent lost event. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Reliability outcome tracker: compare request success, business correctness and repeated incident rate.

**Mastery demonstration:** Explain high availability with poor reliability and vice versa. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 13.3 — Resilience

**Engineering question:** How does the system absorb, adapt, degrade and recover from expected failures?

**Required technical scope:** containment; adaptation; graceful degradation; timeout/retry/breaker/bulkhead/admission interactions; fallback and recovery.

**Critical distinctions:** resilience != fault tolerance; != retry everywhere; fallback != always correct.

**Causal reasoning path:** failure limit wait contain adapt/degrade recover restore.

**Real Food Ordering pressure:** Create resilience matrix and validate selected paths.

**Failure/experiment inventory:** slow/hard dependency; cache down; Kafka lag; DB overload. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Resilience scenario room: inject disruptions and choose degradation, recovery and operational responses.

**Mastery demonstration:** Compose tactics without contradictory policies. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 13.4 — Fault Tolerance, Redundancy & Failover

**Engineering question:** Which component failures can service continue through?

**Required technical scope:** redundant instances; active/passive/active-active concepts; failover; health; state replication; SPOFs; correlated failure and post-failure capacity.

**Critical distinctions:** redundancy != fault tolerance automatically; failover != data recovery; HA != DR.

**Causal reasoning path:** component fails detect alternate takes over capacity check restore.

**Real Food Ordering pressure:** Model/local-demo instance failure and remaining shared dependencies.

**Failure/experiment inventory:** instance fail; shared DB; insufficient failover capacity; stale promotion. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Failover game: remove active replicas and inspect leader promotion and state recovery limits.

**Mastery demonstration:** Identify exact fault model tolerated and residual failures. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 13.5 — Durability

**Engineering question:** After acknowledging state, under what failures can it still be lost?

**Required technical scope:** acknowledged writes; volatile/durable state; persistence; replication; acknowledgement policy; loss windows; corruption and retention.

**Critical distinctions:** durability != availability; replication != backup; API success != durable unless contract says.

**Causal reasoning path:** ack persistence/replication path failure recoverability/loss window.

**Real Food Ordering pressure:** Document durability expectations for order/payment/events and align ack points.

**Failure/experiment inventory:** crash after ack; replica lag; Kafka ack differences; cache-only state. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Durability failure timeline: commit, acknowledge, crash and recover under different durability settings.

**Mastery demonstration:** State what durable means per datum and remaining failure classes. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 13.6 — Backup, Restore, RPO, RTO & Disaster Recovery

**Engineering question:** How much data loss and recovery time can the business tolerate after catastrophe/corruption?

**Required technical scope:** backup; restore; PITR concept; RPO/RTO; retention; restore validation; corruption; disaster scope and dependency recovery order.

**Critical distinctions:** replication != backup; HA != DR; RPO != RTO; backup exists != restore works.

**Causal reasoning path:** business impact RPO/RTO strategy restore validate.

**Real Food Ordering pressure:** Create recovery objectives/plan; cloud DR implementation stays Course 3.

**Failure/experiment inventory:** deletion; corruption replicated; site loss; restore slower than RTO. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Backup/restore drill: set RPO/RTO targets, choose restore points and calculate data-loss windows.

**Mastery demonstration:** Translate business tolerance into RPO/RTO and validate feasibility. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 13.7 — Recovery Engineering

**Engineering question:** How does the system return to correct caught-up state after failure?

**Required technical scope:** restart; replay; rebuild; reconciliation; backlog drain; restore; dependency sequencing; degraded operation; spare recovery capacity and validation.

**Critical distinctions:** restarted != recovered; replay != harmless; restore complete != reconciled.

**Causal reasoning path:** failure ends restore replay/reconcile drain validate normal.

**Real Food Ordering pressure:** Run an end-to-end recovery drill and measure time/correctness.

**Failure/experiment inventory:** recovery overloads DB; replay duplicates; backlog violates freshness. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Recovery state machine: rebuild backlogs and reconcile payment/order states after partial restoration.

**Mastery demonstration:** Calculate recovery capacity and prove correctness with evidence. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

**Phase XIII completion check:** verify the outcomes above against both the documented curriculum and the actual application/evidence state. Passing a glossary quiz is insufficient; if no runtime change is justified, document the no-change decision and its evidence.

---

## Phase XIV — OBSERVABILITY, OPERABILITY & PRODUCTION DIAGNOSIS

**Learning-and-engineering intent.** Unify telemetry with causal diagnosis, incident reconstruction and trustworthy measurement. Academy emphasis: logs/traces/metrics diagnostic puzzles.

**Source milestone.**  Build an evidence system for the distributed platform.

**Application evolution path.** Standardize structured logs, correlation, metrics/histograms, traces and SLO monitoring across the actual applications and dependencies. Diagnose injected incidents from telemetry.

**Phase exit evidence.** Important workflows can be reconstructed and diagnosed end-to-end; dashboards/alerts are tied to user/business symptoms and resource saturation.

**Deliberately deferred.** Do not treat telemetry volume as observability or a single trace/log line as root cause.

### Cluster 14.1 — Observability as Evidence

**Engineering question:** What evidence must the system emit so unknown internal state can be inferred?

**Required technical scope:** internal-state inference; telemetry design; logs/metrics/traces; business/resource signals; cardinality; diagnostic questions; evidence gaps and cost.

**Critical distinctions:** monitoring != observability; metric != explanation; telemetry volume != quality; correlation != causation.

**Causal reasoning path:** question evidence instrumentation observation hypothesis validation.

**Real Food Ordering pressure:** Audit platform evidence needs and add instrumentation only for real questions.

**Failure/experiment inventory:** missing correlation; symptom metric without cause; missing business ID. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Evidence map: choose a diagnostic question and reveal the minimum telemetry needed to resolve it.

**Mastery demonstration:** Design telemetry backward from diagnostic questions. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 14.2 — Logging, Correlation & Event Reconstruction

**Engineering question:** How can discrete records reconstruct distributed execution?

**Required technical scope:** structured logs; timestamps; severity; correlation/request/business IDs; context; errors; state transitions; PII concerns; noise and ordering limits.

**Critical distinctions:** timestamp order != causal order; error log != root cause; correlation ID != idempotency key.

**Causal reasoning path:** identity/context propagate structured events aggregate reconstruct with uncertainty.

**Real Food Ordering pressure:** Add consistent IDs across sync and async flows.

**Failure/experiment inventory:** lost correlation at Kafka; duplicate logs; clock skew. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Log-reconstruction timeline: combine service logs with skewed clocks and missing correlation fields.

**Mastery demonstration:** Reconstruct timeline and mark uncertainty/missing evidence. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 14.3 — Metrics, Histograms & Saturation Signals

**Engineering question:** Which numerical signals reveal demand, errors, latency and saturation?

**Required technical scope:** counters; gauges; rates; histograms; percentiles; RED/USE; queue depth; pool use; lag; error ratios and cardinality.

**Critical distinctions:** counter != rate; gauge != cumulative; average != distribution; utilization != saturation alone.

**Causal reasoning path:** question metric type dimensions collect aggregate interpret.

**Real Food Ordering pressure:** Instrument request, DB/pool, Kafka and cache signals used in experiments.

**Failure/experiment inventory:** P50 stable P99 explodes; pool wait before errors; lag with low CPU. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Histogram explorer: vary workloads while averages remain stable and tail-latency risk grows.

**Mastery demonstration:** Select metrics exposing causal chains, not vanity dashboards. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 14.4 — Distributed Tracing

**Engineering question:** How can one workflow be followed across process and async boundaries?

**Required technical scope:** trace/span; parent-child; context propagation; async messaging; latency attribution; sampling; gaps and limitations.

**Critical distinctions:** trace != complete truth; span duration != CPU; trace context != auth context.

**Causal reasoning path:** operation root span downstream spans messaging context consumer span critical path.

**Real Food Ordering pressure:** Trace order flow across remote call and async hop where feasible.

**Failure/experiment inventory:** missing propagation; slow child; queue time; sampled-out trace. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Distributed trace explorer: expand spans, missing async links and latency critical paths.

**Mastery demonstration:** Use traces with metrics/logs to test hypotheses. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 14.5 — SLI/SLO Monitoring & Error-Budget Reasoning

**Engineering question:** How do measurements feed architecture and delivery decisions?

**Required technical scope:** SLI implementation; SLO windows; burn rate concept; error budgets; user journey versus component SLO and symptom alerting.

**Critical distinctions:** SLO != alert threshold; component uptime != user SLI; budget != permission to ignore reliability.

**Causal reasoning path:** SLO telemetry compliance/burn investigate prioritize.

**Real Food Ordering pressure:** Compute selected SLOs from controlled telemetry and state lab limitations.

**Failure/experiment inventory:** latency violation without errors; good dependency SLO but bad end-to-end. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Error-budget dashboard: adjust SLO windows, outage lengths and burn rate.

**Mastery demonstration:** Explain how SLO evidence changes priorities. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 14.6 — Production Diagnosis & Causal Failure Analysis

**Engineering question:** How do we move from symptoms to evidence-supported causal explanation?

**Required technical scope:** scope; timeline; hypotheses; evidence; discriminating tests; causal graphs; contributing factors; mitigation/root fix and unknowns.

**Critical distinctions:** correlation != causation; first error != root cause; mitigation != correction.

**Causal reasoning path:** symptom scope timeline evidence hypotheses test causal chain mitigation validate.

**Real Food Ordering pressure:** Run integrated incidents: slow DB cascade; Kafka lag/stale projection; cache outage/DB shift.

**Failure/experiment inventory:** misleading CPU; pool wait timeout; retry storm; cache outage. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Incident investigation simulator: rank hypotheses and select discriminating tests from ambiguous symptoms.

**Mastery demonstration:** Produce evidence-based incident report and audience-specific updates. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

**Phase XIV completion check:** verify the outcomes above against both the documented curriculum and the actual application/evidence state. Passing a glossary quiz is insufficient; if no runtime change is justified, document the no-change decision and its evidence.

---

## Phase XV — DISTRIBUTED SECURITY ARCHITECTURE

**Learning-and-engineering intent.** Secure entry points, trust boundaries, identities, authorizations and sensitive data paths. Academy emphasis: threat/identity/authorization counterexamples.

**Source milestone.**  Turn discovered trust boundaries into real security controls.

**Application evolution path.** Add authentication/service identity, authorization, secret handling and data protection to actual entry points and service relationships, with negative tests and threat-model evidence.

**Phase exit evidence.** Security boundaries are enforced in code/configuration and failure/audit behavior is testable.

**Deliberately deferred.** Do not rely on network reachability, gateway placement or shared infrastructure as authorization.

### Cluster 15.1 — Trust Boundaries & Threat Modeling

**Engineering question:** How does distribution change what must be trusted, exposed and protected?

**Required technical scope:** assets; actors; trust boundaries; data flows; entry points; service exposure; threat modeling; least privilege; attack surface and abuse cases.

**Critical distinctions:** network boundary != trust boundary; internal != trusted; authentication != authorization.

**Causal reasoning path:** architecture/data flow trust boundaries assets/threats controls residual risk.

**Real Food Ordering pressure:** Threat-model customer, service-to-service and async flows.

**Failure/experiment inventory:** forged internal request; over-privileged service; sensitive logs/events. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Trust-boundary threat canvas: move components between zones and surface changed attack paths.

**Mastery demonstration:** Explain each control in relation to threat and business impact. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 15.2 — Identity, Authentication & Service Identity

**Engineering question:** Who/what is making a request and how does identity remain trustworthy across hops?

**Required technical scope:** user/service identity; authentication; credentials/tokens conceptually; propagation; delegation; token lifetime and machine-to-machine auth.

**Critical distinctions:** user identity != service identity; authentication != authorization; token possession != unlimited trust.

**Causal reasoning path:** actor/service authenticate identity propagate/translate downstream verify.

**Real Food Ordering pressure:** Document identity flow; implementation specifics remain Course 1/3.

**Failure/experiment inventory:** expired/stale token; service impersonation; missing propagation. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Identity verification journey: compare authenticated caller, service identity and stolen-token cases.

**Mastery demonstration:** Trace identity and state which component vouches for each claim. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 15.3 — Distributed Authorization

**Engineering question:** Where should access decisions be made across owned data/services?

**Required technical scope:** resource ownership; policy decision/enforcement; local/centralized authz; claims/attributes; least privilege; service permissions; stale auth data and revocation.

**Critical distinctions:** gateway authz != sufficient resource authz; role != complete policy; claim != current truth forever.

**Causal reasoning path:** identity resource/policy decision enforcement audit.

**Real Food Ordering pressure:** Map authorization responsibility to ownership boundaries.

**Failure/experiment inventory:** revoked permission but valid token; downstream trusts caller; excessive DB access. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Authorization matrix: test principal/action/resource rules across services and event consumers.

**Mastery demonstration:** Defend where authorization belongs and freshness implications. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 15.4 — Data Protection & Privacy Architecture

**Engineering question:** Which data must be protected/minimized across services, logs, events and caches?

**Required technical scope:** classification; minimization; encryption purpose; personal/sensitive data; logging/tracing exposure; event/cache copies; retention and deletion propagation.

**Critical distinctions:** encryption != authorization; masked log != no exposure elsewhere; copy != harmless.

**Causal reasoning path:** data classify owner allowed flows/copies protection retention/deletion.

**Real Food Ordering pressure:** Audit messages/logs/caches for unnecessary sensitive fields.

**Failure/experiment inventory:** PII in event; secret logged; deleted source remains derived. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Data-flow protection map: classify sensitive fields and inspect encryption, retention and log exposure.

**Mastery demonstration:** Reason about exposure across the whole distributed path. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

**Phase XV completion check:** verify the outcomes above against both the documented curriculum and the actual application/evidence state. Passing a glossary quiz is insufficient; if no runtime change is justified, document the no-change decision and its evidence.

---

## Phase XVI — COORDINATION, LOCKS, TIME & ORDERING

**Learning-and-engineering intent.** Use coordination, leases and clocks only where correctness demands them. Academy emphasis: leases, skew and causal event ordering.

**Source milestone.**  Use coordination only where invariants truly require it.

**Application evolution path.** Implement and break real locking/lease/fencing/time/order mechanisms on selected workflows, using PostgreSQL/Redis/other already-justified mechanisms rather than adding new infrastructure casually.

**Phase exit evidence.** Coordination scope, stale-owner hazards, clock uncertainty and causal/order guarantees are experimentally understood.

**Deliberately deferred.** Do not use distributed locks as a substitute for ownership, idempotency or workflow redesign.

### Cluster 16.1 — Distributed Coordination & Agreement

**Engineering question:** When independent processes must agree, what does that agreement cost?

**Required technical scope:** coordination; membership; leader; quorum intuition; agreement; failure detection; split-brain risk; availability cost and coordination avoidance.

**Critical distinctions:** coordination != communication; leader != permanent truth; quorum != backup; consensus != distributed transaction.

**Causal reasoning path:** shared decision need participants failure assumptions mechanism unavailable/ambiguous -> cases recovery.

**Real Food Ordering pressure:** Identify situations needing coordination versus ownership/idempotency/optimistic concurrency.

**Failure/experiment inventory:** two workers claim singleton task; leader failure; partition conflict. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Coordination choice simulator: compare independent actors, leader election and centralized authority.

**Mastery demonstration:** Minimize coordination and explain when its cost is justified. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 16.2 — Distributed Locks, Leases & Fencing

**Engineering question:** How is exclusive work protected when holders can pause or outlive leases?

**Required technical scope:** locks; leases; expiry; owner identity; renewal; pauses; stale holders; fencing tokens; protected-resource validation and failure assumptions.

**Critical distinctions:** lock != lease; expiry != process stopped; lock-service exclusion != resource safety; Redis SET != complete lock correctness.

**Causal reasoning path:** acquire lease/token work pause/expiry new owner/token stale owner resumes resource -> fences.

**Real Food Ordering pressure:** Use controlled singleton/resource example; don't force locks where ownership/idempotency is better.

**Failure/experiment inventory:** holder pauses; partition; delayed renewal; resource ignores fencing. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Lease expiry and fencing timeline: pause a lock holder and model conflicting writes after expiry.

**Mastery demonstration:** Explain stale-owner problem and end-to-end fencing condition. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 16.3 — Clocks, Time & Timeout Uncertainty

**Engineering question:** What can and cannot be inferred from timestamps across machines?

**Required technical scope:** wall clock; monotonic duration; skew; drift; NTP role; timestamps; expiration; deadlines; leases; event versus processing time and clock jumps.

**Critical distinctions:** timestamp order != causality; wall clock != reliable elapsed duration; same timestamp != simultaneous.

**Causal reasoning path:** local clock timestamp/deadline use skew/drift uncertainty safe/unsafe inference.

**Real Food Ordering pressure:** Analyze timestamped logs/events and valid ordering conclusions.

**Failure/experiment inventory:** clock difference; adjustment; lease timing disagreement. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Clock-skew timeline: shift service clocks and identify unsafe timing assumptions.

**Mastery demonstration:** Use time safely for durations/deadlines and reject unsupported global ordering. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 16.4 — Ordering, Causality & Coordination Requirements

**Engineering question:** What ordering does the business truly require?

**Required technical scope:** local/per-partition order; causality; concurrent events; happens-before intuition; global-order cost; business sequencing and conflict resolution.

**Critical distinctions:** timestamp order != causality; partition order != global; concurrent != simultaneous.

**Causal reasoning path:** business rule required order scope causal relationships partition/ownership/coordination choice.

**Real Food Ordering pressure:** Analyze ordering for order state, payment and restaurant actions.

**Failure/experiment inventory:** cross-partition reorder; cancellation/acceptance concurrency; late event after compensation. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Causality ordering explorer: compare concurrent events with happens-before relationships.

**Mastery demonstration:** State minimum required ordering and avoid unnecessary global serialization. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

**Phase XVI completion check:** verify the outcomes above against both the documented curriculum and the actual application/evidence state. Passing a glossary quiz is insufficient; if no runtime change is justified, document the no-change decision and its evidence.

---

## Phase XVII — COMPATIBILITY & ARCHITECTURAL EVOLUTION

**Learning-and-engineering intent.** Evolve interfaces, schemas, runtime boundaries and architecture with mixed-version compatibility. Academy emphasis: migration timelines and rollback.

**Source milestone.**  Prove the platform can evolve without synchronized rewrites.

**Application evolution path.** Perform real API/event/schema/database evolution, backward-compatible migrations and strangler/branch-by-abstraction exercises against running old/new versions.

**Phase exit evidence.** Compatibility windows, migration steps, rollback constraints and fitness checks are executable and documented.

**Deliberately deferred.** Do not claim independent deployability if every change still requires lockstep release.

### Cluster 17.1 — API Contract Evolution

**Engineering question:** How can services evolve independently without breaking consumers?

**Required technical scope:** backward/forward compatibility; additive/breaking changes; versioning; deprecation; compatibility windows; tolerant readers conceptually and rollout/rollback.

**Critical distinctions:** new version != compatible automatically; schema compatibility != behavioral compatibility; versioning != migration plan.

**Causal reasoning path:** consumers proposed change compatibility staged rollout deprecation removal.

**Real Food Ordering pressure:** Evolve one API while preserving an older consumer/test contract.

**Failure/experiment inventory:** field removal; semantic change; producer before consumer. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** API compatibility studio: evolve an HTTP contract and run simulated old/new consumer cases.

**Mastery demonstration:** Classify syntactic/semantic compatibility and safe migration. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 17.2 — Event Schema Evolution

**Engineering question:** How do long-lived event contracts evolve with old events and independent consumers?

**Required technical scope:** schema compatibility; field evolution; defaults; semantic evolution; version skew; replay; registry concepts; upcasting/translation and event versioning.

**Critical distinctions:** schema compatibility != semantic compatibility; event lifecycle != API lifecycle.

**Causal reasoning path:** history + consumers change compatibility matrix rollout replay validation.

**Real Food Ordering pressure:** Evolve one event while retaining old-record replay.

**Failure/experiment inventory:** new consumer old event; old consumer new event; mixed-version rebuild. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Event schema compatibility lab: test readers and writers across forward/backward changes.

**Mastery demonstration:** Design event changes understandable over time. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 17.3 — Data & Database Evolution Across Services

**Engineering question:** How can schemas/data change while multiple app versions coexist?

**Required technical scope:** expand/contract; additive changes; backfill; dual-read/write migration concepts; transforms; compatibility windows; ownership and rollback difficulty.

**Critical distinctions:** schema migration != app deploy; backward-compatible DB != migration complete; code rollback != data rollback.

**Causal reasoning path:** expand compatible code migrate/backfill switch verify contract.

**Real Food Ordering pressure:** Perform a small compatibility-preserving schema evolution.

**Failure/experiment inventory:** old instance/new schema; partial backfill; interrupted migration; irreversible transform. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Expand-migrate-contract timeline: coordinate old/new schema clients and backfill without downtime.

**Mastery demonstration:** Plan multi-step evolution with checkpoints and recovery assumptions. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 17.4 — Strangler, Branch by Abstraction & Incremental Migration

**Engineering question:** How can architecture change substantially without all-at-once rewrite?

**Required technical scope:** strangler; routing/coexistence; branch by abstraction; adapters; dual systems; synchronization; cutover; rollback and migration observability.

**Critical distinctions:** strangler != proxy only; migration != rewrite; dual write != safe sync.

**Causal reasoning path:** old capability seam new parallel validate shift retire.

**Real Food Ordering pressure:** Use one Food Ordering change to demonstrate incremental migration.

**Failure/experiment inventory:** old/new divergence; partial cutover; sync lag; rollback after new writes. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Incremental migration map: route portions of traffic between old and new modules with rollback.

**Mastery demonstration:** Design migration that remains operable/observable throughout. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 17.5 — Technical Debt, Architecture Erosion & Fitness

**Engineering question:** How do we know when accumulated mechanisms and boundary violations hurt change/operation?

**Required technical scope:** debt; accidental complexity; drift; dependency cycles; shared-data shortcuts; operational burden; fitness concepts; decision expiry and simplification.

**Critical distinctions:** complexity != sophistication; debt != always bad; pattern present != still justified.

**Causal reasoning path:** original force mechanism changed requirement reevaluate retain/evolve/remove.

**Real Food Ordering pressure:** Audit platform for unjustified mechanisms and boundary erosion.

**Failure/experiment inventory:** unused cache; Kafka where sync simpler; shared DB shortcut. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Architecture fitness dashboard: visualize dependency rule violations and complexity creep.

**Mastery demonstration:** Remove complexity when evidence no longer supports it. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

**Phase XVII completion check:** verify the outcomes above against both the documented curriculum and the actual application/evidence state. Passing a glossary quiz is insufficient; if no runtime change is justified, document the no-change decision and its evidence.

---

## Phase XVIII — STAFF-LEVEL ARCHITECTURAL DECISION MAKING

**Learning-and-engineering intent.** Make accountable architecture decisions amid organizational, operational and financial constraints. Academy emphasis: option comparison and reviews.

**Source milestone.**  Operate as the architecture owner of the accumulated system.

**Application evolution path.** Use actual evidence, incidents, cost models and Git history to write/revisit ADRs, compare alternatives and conduct adversarial architecture reviews.

**Phase exit evidence.** Major mechanisms have explicit origin, evidence, trade-offs, reconsideration triggers and operational cost.

**Deliberately deferred.** Do not defend historical choices merely because they already exist.

### Cluster 18.1 — Architecture Evaluation Through Quality-Attribute Scenarios

**Engineering question:** How do we evaluate architecture against important scenarios?

**Required technical scope:** scenario evaluation; risks/non-risks; sensitivity/trade-off points; assumptions; evidence gaps; stakeholders and prioritization.

**Critical distinctions:** diagram != evaluation; pattern != quality guarantee; risk != defect; assumption != fact.

**Causal reasoning path:** scenarios trace response mechanisms/sensitivity risk/evidence gaps validate.

**Real Food Ordering pressure:** Review Food Ordering against SLO/workload/failure/consistency scenarios.

**Failure/experiment inventory:** traffic spike; payment outage; DB slowdown; event backlog; schema change. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Quality-scenario review board: propose tactics, score evidence and interrogate hidden assumptions.

**Mastery demonstration:** Identify sensitivity to assumptions and unsupported scenarios. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 18.2 — Architectural Trade-Off Analysis

**Engineering question:** How do we choose when improving one quality worsens another or costs more?

**Required technical scope:** consistency/availability; latency/durability; autonomy/coordination; redundancy/cost; caching/freshness; isolation/utilization; batching/latency; abstraction/transparency.

**Critical distinctions:** trade-off != vague compromise; CAP slogan != complete decision; cost != infrastructure only.

**Causal reasoning path:** context competing qualities alternatives sensitivity consequences evidence choice -> trigger.

**Real Food Ordering pressure:** Create trade-off records for sync/async, cache, boundaries and consistency.

**Failure/experiment inventory:** stronger consistency; lower budget; higher availability; smaller team. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Trade-off matrix: revise workload and constraints to see architecture option rankings change.

**Mastery demonstration:** Explain why design fits constraints and how changed constraints reverse it. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 18.3 — Efficiency, Cost & Operational Complexity

**Engineering question:** What architecture can the organization afford to build, understand and operate?

**Required technical scope:** infra/engineering cost; toil; cognitive load; on-call burden; skills; tech sprawl; failure surface; debugging difficulty; maturity and opportunity cost.

**Critical distinctions:** cheap infra != cheap system; managed != zero ops; more services != autonomy automatically.

**Causal reasoning path:** option people/resource/ops cost risk benefit organizational fit.

**Real Food Ordering pressure:** Estimate relative operational complexity and components whose benefit must justify cost.

**Failure/experiment inventory:** Kafka for one low-volume event; Redis+DB+search small workload; too many services. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Cost and complexity ledger: include staffing, on-call burden, infra cost and reliability trade-offs.

**Mastery demonstration:** Make simplification decisions grounded in organizational reality. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 18.4 — ADRs, Assumptions & Reconsideration Triggers

**Engineering question:** How do we preserve reasoning and know when a decision should change?

**Required technical scope:** ADR context; alternatives; decision; rationale; consequences; risks; assumptions; evidence; status; triggers and superseding decisions.

**Critical distinctions:** ADR != meeting notes; decision != permanent truth; assumption != guarantee.

**Causal reasoning path:** context requirements alternatives decision consequences evidence assumptions trigger.

**Real Food Ordering pressure:** Create ADRs for consequential Food Ordering evolutions using Git/experiments.

**Failure/experiment inventory:** workload assumption invalidated; new consistency need; ops cost higher. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** ADR revision workshop: record decision, alternatives, evidence, triggers and reversibility.

**Mastery demonstration:** Write ADRs future engineers can intelligently challenge. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 18.5 — Architecture Review & Design Defense

**Engineering question:** Can you defend a design rigorously while changing it when assumptions change?

**Required technical scope:** presentation; clarification; assumption exposure; alternatives; risks; evidence; cross-team impact; migration; ownership and changed constraints.

**Critical distinctions:** defense != stubbornness; confidence != certainty; challenge != rejection.

**Causal reasoning path:** present challenge inspect evidence revise/defend record risks/follow-ups.

**Real Food Ordering pressure:** Review communication, consistency, performance and reliability architecture.

**Failure/experiment inventory:** 10× traffic; payment degradation; Kafka unacceptable; team reduced. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Architecture review simulation: defend a design under progressively adversarial constraints.

**Mastery demonstration:** Respond to adversarial follow-ups from constraints, not memorized patterns. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

**Phase XVIII completion check:** verify the outcomes above against both the documented curriculum and the actual application/evidence state. Passing a glossary quiz is insufficient; if no runtime change is justified, document the no-change decision and its evidence.

---

## Phase XIX — COMPLETE SYSTEM DESIGN & SYNTHESIS

**Learning-and-engineering intent.** Synthesize a transferable design process and defend the actual application from its Git/ADR/evidence history. Academy emphasis: independent design studio.

**Source milestone.**  Synthesize the full platform and transfer the reasoning beyond it.

**Application evolution path.** Reconstruct the platform from requirements, run full design/review exercises, audit final architecture and produce the Course 3 handoff from the actual repository.

**Phase exit evidence.** Final Food Ordering Platform architecture, evidence portfolio, ADR history, runbooks/experiments and handoff manifest are coherent and defensible at Senior/Staff level.

**Deliberately deferred.** The final architecture is not a universal template; every major mechanism must still have a removal trigger.

### Cluster 19.1 — End-to-End System Design Method

**Engineering question:** How do all learned disciplines combine into a repeatable but flexible design process?

**Required technical scope:** requirements; quality attributes; capacity; domain; ownership; APIs/messaging; consistency; failures; resilience; performance/scaling; security; observability; cost and evolution.

**Critical distinctions:** method != memorized template; diagram != complete design; estimate != forecast.

**Causal reasoning path:** clarify quantify model boundaries communication data/failure -> capacity/reliability/security/observability trade-offs evolution.

**Real Food Ordering pressure:** Reconstruct Food Ordering from requirements without final diagram, then compare.

**Failure/experiment inventory:** change workload; consistency; remove tech constraint; regional requirement. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** End-to-end design canvas: work from business requirements through capacity, consistency and recovery.

**Mastery demonstration:** Independently structure complex design and choose deep dives. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 19.2 — Unfamiliar-System Transfer

**Engineering question:** Can reasoning transfer beyond Food Ordering?

**Required technical scope:** requirements; invariants; workload; ownership; communication; consistency; failure; scaling; reliability; security; trade-offs and evolution in new domains.

**Critical distinctions:** analogy != identical architecture; same tech != same force; familiar pattern != justified.

**Causal reasoning path:** new domain derive forces select mechanisms challenge assumptions compare.

**Real Food Ordering pressure:** Use payments, reservations, inventory, notifications, messaging, storage, URL shortener or rate limiter; no new implementation required.

**Failure/experiment inventory:** 10× load; forbid Kafka/Redis; stronger consistency. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Unfamiliar-domain transfer lab: redesign inventory, banking or reservation workflows with new invariants.

**Mastery demonstration:** Design without copying Food Ordering and explain what principles transfer. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 19.3 — Complete Senior/Staff System-Design Interviews

**Engineering question:** Can you reason and communicate under realistic constraints without scripts?

**Required technical scope:** clarification; estimates; domain/data; architecture; deep dives; failures; consistency; scaling; reliability; security; observability; trade-offs; migration; operations and time management.

**Critical distinctions:** fast != good; more components != senior; challenge != defend original.

**Causal reasoning path:** clarify prioritize design deep dive failure/trade-off adapt summarize.

**Real Food Ordering pressure:** Use progressively independent mock designs plus project walkthroughs.

**Failure/experiment inventory:** 10×; outage; duplicates; partition; ops complexity rejected; consistency changes. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Timed design interview simulator: progressively reveal constraints and score engineering communication.

**Mastery demonstration:** Complete a full design with explicit assumptions and coherent revisions. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

### Cluster 19.4 — Final Food Ordering Platform Architecture Review

**Engineering question:** Can you explain why the final architecture evolved and what would make you change it?

**Required technical scope:** workflows/invariants; boundaries; quality/workload; networking; resilience; sync/async; Kafka; ownership/consistency; Saga/Outbox/Inbox/idempotency; CQRS; Redis; performance; recovery; observability; security; coordination; evolution and cost.

**Critical distinctions:** final architecture != universally optimal; lab evidence != production proof; accumulated complexity != justified complexity.

**Causal reasoning path:** business need pressure fragile state experiment evidence decision implementation new -> trade-off evolution.

**Real Food Ordering pressure:** Use actual Git history to reconstruct major transitions; every mechanism needs origin, evidence, tradeoff and removal trigger.

**Failure/experiment inventory:** remove Kafka; remove Redis; stronger consistency; DB bottleneck; regional DR. Each selected scenario requires hypothesis, controlled variables, prediction, observed evidence, limits and a reproduction path.

**Interactive academy design brief:** Architecture archaeology explorer: inspect project checkpoint history and decide what to keep or remove.

**Mastery demonstration:** Present end-to-end, defend decisions, state limitations, and distinguish learning evidence from professional production experience. The learner must also explain an alternate design, diagnose a failure using evidence, and defend assumptions to a Staff-level reviewer.

**Phase XIX completion check:** verify the outcomes above against both the documented curriculum and the actual application/evidence state. Passing a glossary quiz is insufficient; if no runtime change is justified, document the no-change decision and its evidence.

---

## 11. Cross-cutting mastery and dependency strands

- **Correctness and transaction semantics:** begin in 1.1–1.4; revisit under network uncertainty (3–4), consistency/data (8–9), replay/event processing (7/10), and coordination (16).
- **Quantitative reasoning:** introduce explicit assumptions and basic measurements from Phase 0 and 1.1; deepen in Phase II, then apply under retries, Kafka lag, cache, scaling, reliability and SLOs.
- **Observability and diagnosis:** always collect basic logs/test outcomes from the first app; Phase XIV provides a mature telemetry architecture and incident-analysis system.
- **Security and trust:** avoid unsafe sample practices from day one; identify trust boundaries during initial workflows and remote calls; Phase XV delivers full distributed security architecture.
- **Operational and financial cost:** record complexity costs from the first ADR; mature estimation and organizational decision-making in Phase XVIII.
- **Architecture communication:** every cluster includes concise, mechanism-level and design-defense explanations, spoken-English clarity, audience adjustment and adversarial follow-ups.
- **Deliberate practice:** prediction-before-reveal; immediate explanation; delayed retrieval after 1 cluster, after the next major phase and when a dependency reappears; adjust schedule to actual mastery evidence, not an arbitrary time target.
- **Unfamiliar-domain transfer:** stress-test Food Ordering insights against inventory, booking, payments and ledger-style workflows, explicitly recording what does not generalize.

## 12. Course completion and evidence portfolio

The learner must independently derive requirements, quantify architecture drivers, model ownership and consistency, trace remote failure, justify communication and data patterns, run controlled experiments, diagnose incidents, and defend evolution under new constraints. The final portfolio consists of:

1. A running and verified application snapshot with an honest inventory of deployables and dependencies.
2. An academy containing every required blueprint and lesson, tested meaningful interactions and completed assessment evidence.
3. Immutable links tying lesson versions to application commits, executed tests, experiment results and ADRs.
4. Before/after comparisons demonstrating why important mechanisms were introduced—or rejected.
5. Recovery, security, performance and consistency evidence labeled by confidence and environment.
6. Senior/Staff-level system-design reviews, interview simulations and unfamiliar-domain transfers.
7. A Course 3 handoff identifying build/runtime assumptions, interfaces, ports, persistence, secrets, operational needs and explicitly unimplemented platform engineering.

**Final standard:** do not conclude “I know Kafka/Redis/Saga/CQRS.” Conclude “I can identify why each mechanism is or is not justified, trace its state and failure windows, measure its consequences, recover from its failures, and revise the architecture when the evidence changes.”

## 13. Publication and implementation status

This document is a **curriculum contract**. Publishing it does not mean the React application exists, the Java application compiles, integration tests have run or any simulation has been implemented. Progress must be recorded in future checked commits and evidence manifests, never retrospectively inferred from this plan.

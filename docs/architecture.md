# Architecture

## Boundaries

The domain layer owns validation and project-specific deterministic logic. The repository interface isolates persistence. HTTP handlers translate requests into service calls and map known domain errors to safe responses.

## Project-specific core

ResearchTrail treats every dataset, protocol, code snapshot, and result as a node in an auditable provenance graph. Content digests identify exact inputs; optional anchoring can be added without making a chain or token mandatory.

## Deliberate limitations

The included server uses an in-memory repository and has no authentication. It is suitable for local exploration and tests only. A production deployment needs durable transactional storage, access control, request limits, observability, and a documented threat model.

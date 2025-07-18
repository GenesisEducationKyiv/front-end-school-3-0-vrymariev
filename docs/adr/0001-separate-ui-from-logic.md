# ADR 0001: Separate UI from Business Logic in Forms and Components
As the project grew, mixing UI and business logic made the code harder to maintain and test. Separating them improves clarity and supports team collaboration, despite the initial extra effort to refactor.

## Decision
Extract business logic from UI components into separate controller hooks.  
The controller hooks will:
- Handle API interactions
- Manage local state and side effects
- Process form submissions

UI components will become presentation-only and will receive data and event handlers through props.

## Rationale
Previously, our components mixed concerns by including both logic and UI.  
This coupling made the code harder to test, less reusable, and more difficult to maintain as the system grew.

Separating concerns improves code clarity and allows us to test logic without rendering UI, improving long-term maintainability.

## Status
Proposed

## Consequences
**Positive:**
- Easier to test logic independently
- Improved maintainability and scalability
- Reusable UI components

**Negative:**
- More boilerplate due to splitting files
- Developers must consistently apply this pattern

## Concerns and Mitigations
- Might be harder for newcomers → Add onboarding doc or short guide with examples.
- Hooks still tied to React → Extract logic to testable pure functions (services, utilities).
- More files → Follow clear naming conventions (useXYZController.ts, XYZView.tsx).

## Note
- This separation applies to domain-specific logic, such as preparing API payloads, validating form input, or transforming business data.
- It does not apply to pure UI state, such as isOpen, selectedTab, or hoveredItem. These should remain in UI components or UI-level hooks.
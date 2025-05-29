# ADR 0001: Separate UI from Business Logic in Forms and Components

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
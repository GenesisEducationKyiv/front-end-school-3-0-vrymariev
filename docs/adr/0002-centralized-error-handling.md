# ADR 0002: Centralized Error Handling for API Calls and Forms
Error handling was different in many places. This made it hard to fix and confusing for users. Now, errors will be handled in one place to make it easier and clearer.

## Decision
Introduce a centralized error-handling utility (`handleApiError`) used by all controllers and form logic.  
Standardize error messages using a shared toast system and optionally inline field feedback.

## Rationale
Error messages were previously scattered and inconsistent across forms and API calls.  
This duplication made it harder to maintain and led to unpredictable UX behavior.

Centralizing error handling improves usability and simplifies future updates to error logic.

## Status
Proposed

## Consequences
**Positive:**
- More consistent and user-friendly error feedback
- Reduced code duplication
- Easier to maintain and update error behavior

**Negative:**
- Learning curve for contributors unfamiliar with the shared pattern
- Risk of generic error responses if utility is too abstract
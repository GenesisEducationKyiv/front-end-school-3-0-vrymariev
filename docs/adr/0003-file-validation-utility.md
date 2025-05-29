# ADR 0003: Introduce a Reusable File Validation Utility

## Decision
Create a utility function `validateFile(file: File): ValidationResult` for use in all file uploads.  
This function will:
- Enforce file size limits
- Allow only specific extensions and MIME types
- Return consistent error messages

## Rationale
Each file input previously implemented its own validation logic.  
This led to inconsistent rules and repeated code, which reduced maintainability and portability.

A shared utility promotes code reuse and ensures consistent validation across the system.

## Status
Proposed

## Consequences
**Positive:**
- Centralized, maintainable validation logic
- Consistent behavior across forms
- Reusable in other projects

**Negative:**
- Indirection may slow down debugging for newcomers
- Changes to shared utility can unintentionally affect multiple parts of the system
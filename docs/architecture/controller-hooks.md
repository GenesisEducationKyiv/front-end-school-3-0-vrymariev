# Controller Hooks Pattern

This document explains the reasoning behind using controller hooks instead of placing logic directly in components. This approach improves code clarity, maintainability, and testability - especially in growing React projects.

---

## Overview

Moving logic out of components and into hooks is a very intentional decision.
You probably know the **dumb/smart components** pattern - I try to follow it in most cases. In this case, I went a step further: instead of **smart components**, I use **smart hooks** (also called controller hooks). So my approach is kind of a mix of **dumb components** (just UI) and **controller hooks** (they handle all logic)

---
### Here are a few rules I follow to keep it clean:
- **Max depth:**
```typescript
component → controller hook → small hooks // to avoid spaghetti code
```
- **Only controller hooks should call other hooks** - they work like **decorators**
- **Each hook should have one clear job**

---
### Benefits of this:

- **clear and consistent structure**
- **better readability**
- **reusable logic**
- **easy to test** (for example, with React Testing Library)
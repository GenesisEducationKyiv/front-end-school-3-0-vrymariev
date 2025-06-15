# Dependency Security & Stability Audit Report

**Scope**: This report documents the audit of all frontend dependencies. The goal is to identify potential risks related to security and maintainability.
All 34 libraries were reviewed based on key categories. The ones that may raise concerns are listed separately.

## Audit Methodology

We use a multi-step approach to check each npm package for security, stability, and ecosystem health:

- **Vulnerability Check**
  - Reviewed packages in:
    - [Snyk](https://security.snyk.io/)
    - [GitHub Advisories](https://github.com/advisories)
    - [NVD](https://nvd.nist.gov/)

- **GitHub Repository Review**
  - Looked at:
    - Open issues & PRs  
    - Update frequency  
    - Author and maintainer activity  

- **Usage & Popularity**
  - Checked trends and downloads on [npmtrends.com](https://npmtrends.com/)  
  - Compared with alternative libraries  

- **TypeScript Support**
  - Verified built-in types or `@types` packages  
  - Ensured good compatibility with modern TypeScript

---

## 1. Zero-Day / Active CVE Risks

- **axios**  
  Previously had CVE‑2025‑27152 (SSRF risk) in versions ≤1.7.9.  
  We are using version `^1.8.4`, which has the fix.  
  **Conclusion:** ✅ *The result is satisfactory.*

- **moment**  
  Had several known issues in the past, like CVE‑2022‑24785 (path traversal) and ReDoS problems CVE-2022-31129.  
  We use version `2.30.1`, which is safe. But the package is deprecated and won’t get updates.  
  **Conclusion:** ❌ *Action should be taken if possible.*

- **tw-animate-css**  
  No known CVEs, but the package is no longer maintained. There might be hidden risks.  
  **Conclusion:** ⚠️ *Worth paying attention to.*

- **sonner**  
  No known CVEs. But it's a new package and hasn't been tested widely yet. Needs monitoring.  
  **Conclusion:** ⚠️ *Worth paying attention to.*

---

## 2. Author & Trustworthiness

- **sonner**  
  Made by an independent developer with limited open-source activity. No long-term guarantees.  
  **Conclusion:** ⚠️ *Worth paying attention to.*

- **tw-animate-css**  
  Very little activity from the author. Maintainers are not active in public.  
  **Conclusion:** ⚠️ *Worth paying attention to.*

- **query-string**  
  Maintained by a small team. Not much recent work.  
  **Conclusion:** ⚠️ *Worth paying attention to.*

---

## 3. Open Source / Community Health

- **tw-animate-css**  
  It’s open source, but the repo is inactive and has few contributors.  
  **Conclusion:** ⚠️ *Worth paying attention to.*

- **sonner**  
  Open source with a small and growing community. Still a new project.  
  **Conclusion:** ⚠️ *Worth paying attention to.*

- **query-string**  
  Still open source, but very few commits or pull requests recently.  
  **Conclusion:** ⚠️ *Worth paying attention to.*

---

## 4. Downloads / Adoption Trends

- **tw-animate-css**  
  Weekly downloads are slowly going down. Not widely used.  
  **Conclusion:** ⚠️ *Worth paying attention to.*

- **sonner**  
  Recently released. Still not widely adopted.  
  **Conclusion:** ⚠️ *Worth paying attention to.*

- **query-string**  
  Not very popular, but usage is stable.  
  **Conclusion:** ✅ *The result is satisfactory.*

---

## 5. Dependency Tree Risks

- **moment**  
  Has a deep dependency tree with some outdated packages. This increases indirect risks.  
  **Conclusion:** ⚠️ *Worth paying attention to.*

- **query-string**  
  Uses helper libraries that might not be actively maintained.  
  **Conclusion:** ⚠️ *Worth paying attention to.*

---

## 6. Maintainability & TypeScript Support

- **moment**  
  Doesn’t support TypeScript. The API is old and not tree-shakable.  
  **Conclusion:** ⚠️ *Worth paying attention to.*

- **query-string**  
  Has type definitions, but not full support for modern TypeScript.  
  **Conclusion:** ⚠️ *Worth paying attention to.*

---

## Conclusion:
The first priority is to find and use an alternative to the **moment**❌ package.  
It should be replaced because it is deprecated, does not support TypeScript, has outdated dependencies, is not tree-shakable, and had security issues in the past.  
Maybe [Day.js](https://www.npmjs.com/package/dayjs) will be the best option to replace.

It’s also important to keep an eye on **tw-animate-css**, **query-string**, and **sonner**.
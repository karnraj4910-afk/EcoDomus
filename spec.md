**EcoDomus — Technical Specification Document**

---

**Problem Statement**

Web transfer volume and bloated code directly drive data center power consumption, device battery drain, and network overhead. Modern web pages often carry significant bloat—unnecessary whitespace, inline comments, redundant tags, and unoptimized CSS/JS structures. This unnecessary weight increases server transmission energy and slows down page render speeds.

**EcoDomus** addresses this by providing a lightweight, client-side web utility that minifies web assets, strips structural bloat, and quantifies the exact carbon and energy savings per request—all executed locally within the user's browser.

---

**Functional Requirements**

1. **Input Asset Parsing:** Accept raw HTML, CSS, or JavaScript via direct text input or file upload.
2. **Preset Sample Loading:** Provide pre-loaded bloated code samples to allow instant local testing and live demonstrations.
3. **Client-Side Code Optimization:**
* Strip multi-line and single-line comments (`<!-- -->`, `/* */`, `//`).
* Collapse extra whitespace, tabs, and redundant newlines.
* Strip redundant HTML attribute quotes and optional closing tags where safe.
## 4. Input Validation & Language Verification Rules

- **Strict Type Checking:** The system must validate that the pasted input code matches the active language tab (`HTML`, `CSS`, or `JavaScript`) prior to executing minification.
- **Error Behavior:** If a language mismatch or improper syntax is detected:
  - Halt minification immediately.
  - Display an inline red alert banner above the output panel.
  - Prevent calculation of energy or carbon metrics until valid input is provided.
- **Validation Rules:**
  - **HTML Tab:** Rejects raw CSS blocks (`{ ... }`) or pure JS keywords (`function`, `const`, `var`) when no HTML tags (`<...>`) are present.
  - **CSS Tab:** Rejects raw HTML tags (`<div...`) or pure JS logic statements.
  - **JS Tab:** Rejects unescaped HTML markup tags.

## Input Validation & Cross-Language Mismatch Rules

- **Strict Tab Verification:** Prior to minification, input code must be strictly validated against the active language tab (`HTML`, `CSS`, or `JavaScript`).
- **Error Behavior:** If a mismatch or invalid syntax is detected:
  - Halt minification immediately.
  - Display an inline red alert banner above the editor canvas.
  - Prevent metric updates until valid input is provided.
- **Specific Mismatch Enforcement:**
  - **HTML Tab:** Rejects raw CSS selector blocks or JS statements when no HTML markup tags (`<...>`) are present.
  - **CSS Tab:** Rejects HTML markup tags, pure JavaScript keyword declarations (`const`, `function`, `let`, `var`, `=>`), or code missing CSS selector block syntax (`{...}`).
  - **JavaScript Tab:** Rejects HTML markup tags and pure CSS stylesheet rules (`.class { prop: val }`) that contain no JS logic.

5. **Impact Computation Engine:** Calculate the raw byte reduction ($B_{\text{saved}} = B_{\text{original}} - B_{\text{optimized}}$) and derive estimated grid energy ($kWh$) and carbon footprint savings ($gCO_2e$) based on standard data transmission energy models (0.2 kWh per GB transferred).
6. **Interactive Results Output:** Display side-by-side code editors, a visual impact dashboard (Byte Reduction, % Saved, $gCO_2e$ Saved), a one-click clipboard copy, and a file download option (`.min.html` / `.min.css` / `.min.js`).

---

**Input & Output Data Shapes**

* **Input Data Structure (JSON / Internal State):**

```json
{
  "rawCode": "string (max 2MB)",
  "assetType": "html | css | javascript",
  "targetViews": 10000
}

```

* **Output Data Structure (JSON / Internal State):**

```json
{
  "optimizedCode": "string",
  "metrics": {
    "originalSizeBytes": 1048576,
    "optimizedSizeBytes": 314572,
    "bytesSaved": 734004,
    "reductionPercentage": 70.0,
    "energySavedKwh": 0.1468,
    "co2SavedGrams": 64.59
  },
  "timestamp": "2026-09-18T20:10:19Z"
}

```

---

**Constraints**

* **Client-Side Execution:** 100% of the optimization logic and byte calculation must run locally in the browser using native JavaScript (no external server calls or backend dependencies).
* **Performance:** Processing an asset up to 1 MB in size must complete within **< 500ms**.
* **Zero Dependency:** Built purely with HTML5, CSS3 (or Tailwind CSS), and standard browser DOM/Blob APIs.

---

**Edge Cases & Error Handling**

| Scenario / Edge Case | Expected System Behavior |
| --- | --- |
| **Empty Input** | Disable "Optimize" button. If clicked, display an inline toast warning: *"Please paste code or load a sample first."* |
| **Syntax Error in Source Code** | Perform safe regex minification without throwing fatal JS errors. Preserve malformed tags as-is rather than breaking execution. |
| **Already Minified Code** | If byte reduction is $0\%$, display a clean status notice: *"Code is already fully optimized! 0% bloat detected."* |
| **Large File Size (> 2MB)** | Warn the user that large files may freeze the browser tab UI temporarily before execution. |

---

**Acceptance Criteria**

* [ ] **AC-1:** The web app loads completely offline or from a static host with zero backend dependencies.
* [ ] **AC-2:** Given a standard bloated HTML file, clicking "Optimize" reduces total file size by at least **20% to 50%**.
* [ ] **AC-3:** The impact dashboard accurately displays original size, new size, percentage saved, and estimated $CO_2$ reduction in real time.
* [ ] **AC-4:** The user can seamlessly copy the optimized code to the clipboard or download it as a minified file with one click.
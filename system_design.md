# EcoDomus — Technical & Architecture Specification

### Objective

EcoDomus is a client-side web utility that parses web assets (HTML, CSS, JavaScript), strips non-functional code bloat, and quantifies byte-level reduction along with derived grid energy savings—executed entirely within a professional, dark-slate interface designed for desktop utilities.

---

### Tech Stack

* **Structure & UI:** HTML5 + Tailwind CSS (Slate color palette with emerald accent buttons).
* **Core Logic:** Vanilla JavaScript (ES2022+) using native Regular Expressions, String Manipulation APIs, and `Blob` memory allocation.
* **State Management:** Native browser DOM API and `navigator.clipboard` for memory and clipboard operations.
* **Execution Environment:** 100% Client-Side / Offline execution (zero backend dependencies).

---

### Architecture & Interface Design

The user interface follows a professional split-screen desktop utility layout:

* **Header Controls:**
* File-Type Toggles (`HTML`, `CSS`, `JavaScript`).
* `Load Sample Bloated Code` button.
* `Estimated Views for Projection` selector (`10,000` default).
* System status indicator (`v1.0.4 Offline/Local Execution`).

## Validation Engine Architecture (`validateCodeLanguage`)

Before calling `minifyHTML()`, `minifyCSS()`, or `minifyJS()`, pass `inputCode` through strict language heuristics:

```javascript
function validateCodeLanguage(code, selectedLang) {
  const trimmed = code.trim();
  if (!trimmed) return { valid: true };

  // Strict heuristic checks
  const hasHtml = /<[a-z][\s\S]*>/i.test(trimmed);
  const hasCss = /([\.#]?[a-zA-Z0-9_-]+\s*\{[\s\S]*?\})|(@media|@keyframes)/.test(trimmed);
  const hasJs = /\b(function|const|let|var|return|console\.log|if|else|import|export|class|document|window)\b/.test(trimmed) || /=>/.test(trimmed);

  // 1. HTML TAB CHECK
  if (selectedLang === 'HTML') {
    if (!hasHtml && (hasCss || hasJs)) {
      return { valid: false, message: `Syntax Error: You selected HTML, but the code appears to be ${hasJs ? 'JavaScript' : 'CSS'}.` };
    }
  }

  // 2. CSS TAB CHECK
  if (selectedLang === 'CSS') {
    if (hasHtml) {
      return { valid: false, message: `Syntax Error: You selected CSS, but HTML tags were detected.` };
    }
    if (hasJs) {
      return { valid: false, message: `Syntax Error: You selected CSS, but JavaScript code was detected.` };
    }
    if (!hasCss) {
      return { valid: false, message: `Syntax Error: Invalid CSS syntax. Property rules must be wrapped in selector blocks { ... }.` };
    }
  }

  // 3. JAVASCRIPT TAB CHECK
  if (selectedLang === 'JavaScript') {
    if (hasHtml) {
      return { valid: false, message: `Syntax Error: You selected JavaScript, but HTML tags were detected.` };
    }
    if (hasCss && !hasJs) {
      return { valid: false, message: `Syntax Error: You selected JavaScript, but CSS stylesheet rules were detected.` };
    }
  }

  return { valid: true };
}

* **Main Workspace:**
* **Left Panel (Source Code Input):** A dark editor container with line numbers accepting raw HTML/CSS/JS.
* **Right Top Panel (Impact Dashboard):** Displays `Original Size`, `Optimized Size`, `Data Saved (%)`, `Est. Energy Saved (kWh)`, and `Est. Carbon Avoided (gCO₂e)`.
* **Right Bottom Panel (Optimized Output):** Monospace view container holding the minified `.min` result.


* **Action Bar:**
* Primary Action: Centered emerald `OPTIMIZE ASSET` trigger button.
* Output Actions: `Copy to Clipboard` and `Download .min File`.



---

### Functional Logic & Processing Flow

```
[User Input Source Code]
        │
        ▼
┌──────────────────────────────┐
│  Asset Type Identification   │ (HTML / CSS / JS)
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│   String Cleaning Pipeline   │
│ 1. Strip Comments            │
│ 2. Collapse Whitespace       │
│ 3. Strip Blank Lines/Tabs    │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ Memory & Metric Calculations │
│ 1. Measure Byte Size Delta   │
│ 2. Apply CO2/Energy Formulas │
└──────────────┬───────────────┘
               │
               ▼
[Render Output Code + Metrics Dashboard]

```

#### Step-by-Step Execution Rules:

1. **Initial Byte Measurement:**
Derive precise memory allocation:
$$B_{\text{orig}} = \text{Blob}([ \text{inputString} ]).\text{size}$$


2. **Regex Minification Pipeline:**
* **HTML:** Strip `<!-- ... -->` comments, collapse multi-spaces into single spaces, and remove newlines between structural elements.
* **CSS:** Strip `/* ... */` comments, omit spaces surrounding braces `{}` and colons `:`, and collapse newlines.
* **JavaScript:** Strip single-line `//` and block `/* */` comments, collapse whitespace outside string literals, and trim trailing line endings.


3. **Optimized Byte Measurement:**
Derive final memory allocation:
$$B_{\text{opt}} = \text{Blob}([ \text{outputString} ]).\text{size}$$


4. **Environmental Metrics Calculation:**
* **Bytes Saved:**
$$B_{\text{saved}} = B_{\text{orig}} - B_{\text{opt}}$$


* **Percentage Saved:**
$$P_{\text{saved}} = \left( \frac{B_{\text{saved}}}{B_{\text{orig}}} \right) \times 100$$


* **Energy Saved (10k Views):**
$$\text{Energy (kWh)} = \left( \frac{B_{\text{saved}}}{1,073,741,824} \right) \times 0.2 \times 10,000$$


* **Carbon Avoided:**
$$\text{Carbon } (gCO_2e) = \text{Energy (kWh)} \times 442$$





---

### Developer Usage & Workflow Instructions

Because minified code strips away human-readable formatting, developers should follow this workflow for ongoing maintenance:

1. **Maintain Source Files:** Always keep and edit your original, formatted source files (`index.html`, `styles.css`, `app.js`).
2. **Re-Optimize Changes:** Whenever you update or add new features to your source code, paste the updated code back into **EcoDomus** and click **OPTIMIZE ASSET**.
3. **Deploy Minified Assets:** Replace the old `.min` files on your web server with the newly downloaded minified output.

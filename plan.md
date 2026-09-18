```markdown
# TASK SPECIFICATION FOR AI CODING AGENT

## MODULE OVERVIEW
Target: Single-file offline client-side web application (EcoDomus).
Environment: Standard Web Browser (No Backend, No Node.js, No External APIs, No Server Routes).
Dependencies: HTML5, Tailwind CSS (via CDN), Native Browser JavaScript (ES2022+).

---

## EXECUTION ORDER & AGENT WORKFLOW

### PHASE 1: DOM STRUCTURE & TAILWIND STYLING
Build `index.html` with the following component tree:
1. HEADER:
   - Left: Title `ECODOMUS`, Subtitle `LOCAL WEB ASSET & CARBON OPTIMIZER`.
   - Right: System status `v1.0.4 (Offline/Local Execution)`, Privacy badge `Privacy Guaranteed: Zero Server Uploads`.
2. CONTROL TOOLBAR:
   - Button Group (Active state toggle): `HTML`, `CSS`, `JavaScript`.
   - Button: `Load Sample Bloated Code` (`id="btn-sample"`).
   - Select Input: `Estimated Views for Projection` (`id="select-views"`), default value `10000`.
3. WORKSPACE GRID (2-Column Desktop Grid):
   - Left Column (Source Input):
     - Container Header: `SOURCE CODE (INPUT)`.
     - Elements: Dark theme `<textarea id="input-code">` with line-number styling support.
   - Right Column (Dashboard + Output):
     - Metric Panel Top: 
       - `Original Size` (`id="metric-orig"`)
       - `Optimized Size` (`id="metric-opt"`)
       - `Data Saved` (`id="metric-saved"`)
       - `Est. Energy Saved` (`id="metric-energy"`)
       - `Est. Carbon Avoided` (`id="metric-carbon"`)
     - Output Container Bottom:
       - Header: `OPTIMIZED OUTPUT (.MIN)`.
       - Elements: Read-only `<textarea id="output-code">`.
       - Actions: `Copy to Clipboard` (`id="btn-copy"`), `Download .min File` (`id="btn-download"`).
4. ACTION FOOTER:
   - Primary Action Button: `OPTIMIZE ASSET` (`id="btn-optimize"`), dark emerald background `#2D7A58`.

---

## PHASE 2: CORE LOGIC & REGEX RULES

Implement pure JavaScript utility functions:

### 1. File Size Measurement Utility
```javascript
const getByteSize = (str) => new Blob([str]).size;

```

### 2. Minification Regex Engines

* **HTML Minifier Engine (`minifyHTML(code)`):**
1. Strip HTML Comments: `code.replace(/<!--[\s\S]*?-->/g, '')`
2. Collapse Whitespace: `code.replace(/\s+/g, ' ')`
3. Strip Space Between Tags: `code.replace(/>\s+</g, '><')`
4. Trim output string.


* **CSS Minifier Engine (`minifyCSS(code)`):**
1. Strip CSS Comments: `code.replace(/\/\*[\s\S]*?\*\//g, '')`
2. Collapse Whitespace: `code.replace(/\s+/g, ' ')`
3. Strip Structural Spaces: `code.replace(/\s*([{}:;,])\s*/g, '$1')`
4. Remove Trailing Semicolons: `code.replace(/;\}/g, '}')`
5. Trim output string.


* **JS Minifier Engine (`minifyJS(code)`):**
1. Strip Block Comments: `code.replace(/\/\*[\s\S]*?\*\//g, '')`
2. Strip Line Comments: `code.replace(/\/\/.*/g, '')`
3. Collapse Newlines/Tabs: `code.replace(/\s+/g, ' ')`
4. Strip Whitespace Around Operators: `code.replace(/\s*([={}\(\);,])\s*/g, '$1')`
5. Trim output string.



---

## PHASE 3: COMPUTATION & DOM BINDING

### 1. Metric Calculation Formulas

```javascript
const origBytes = getByteSize(rawCode);
const optBytes = getByteSize(minifiedCode);
const savedBytes = Math.max(0, origBytes - optBytes);
const savedPct = origBytes > 0 ? ((savedBytes / origBytes) * 100).toFixed(1) : 0;

// Impact Calculations
const views = parseInt(document.getElementById('select-views').value, 10);
const savedGB = savedBytes / (1024 * 1024 * 1024);
const energyKwh = (savedGB * 0.2 * views).toFixed(3);
const carbonGrams = (energyKwh * 442).toFixed(2);

```

### 2. Event Listeners

1. `btn-optimize` -> OnClick:
* Identify active language state (`HTML`, `CSS`, or `JS`).
* Execute corresponding minifier engine on `#input-code`.
* Update `#output-code`.
* Calculate metrics and render results in DOM metric nodes.


2. `btn-copy` -> OnClick:
* Execute `navigator.clipboard.writeText(document.getElementById('output-code').value)`.
* Display visual text feedback `Copied!`.


3. `btn-download` -> OnClick:
* Create `Blob` from output string.
* Trigger `URL.createObjectURL(blob)` via dynamic `<a>` download element (`app.min.[ext]`).


4. `btn-sample` -> OnClick:
* Inject hardcoded unminified code snippet into `#input-code` for instant UI population.

### 3. Update to `plan.md`

Update the **Language Mismatch Guardrail** task step:

```markdown
### Phase 2, Step 2.5: Reinforced Language Validation Guardrail
- Implement the updated `validateCodeLanguage(code, activeTab)` function in JavaScript.
- Ensure strict cross-validation:
  - Block JS in CSS tab (`hasJs` check).
  - Block CSS in JS tab (`hasCss && !hasJs` check).
- Connect validation directly into the `OPTIMIZE ASSET` click listener before any minification engines run.
- Display or hide `#error-banner` based on validation state and stop calculations on failure.
Prompt for Your AI Agent

```markdown
### Phase 2, Step 2.5: Language Mismatch Guardrail
- Implement `validateCodeLanguage(code, activeTab)` in JavaScript.
- Wire validation into the `OPTIMIZE ASSET` click handler before minification functions execute.
- Add dynamic DOM handling for `#error-banner`:
  - Show banner and display error message if validation returns `valid: false`.
  - Hide banner and clear error state if validation returns `valid: true`.



---

## CONSTRAINTS & COMPLIANCE

* NO fetch/XHR network requests.
* NO external UI UI libraries besides Tailwind CSS CDN.
* NO dark/neon neon glow; strict slate gray palette (`bg-slate-900`, `bg-slate-800`, `text-slate-100`, `border-slate-700`).

```

```
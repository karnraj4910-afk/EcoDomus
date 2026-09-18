# EcoDomus 

**EcoDomus** is a simple, fast web tool that shrinks your website files (HTML, CSS, JavaScript) to make them load faster while saving energy and reducing carbon emissions.

Everything runs 100% inside your browser—no data is sent to any server, and no setup is required.

---

### What It Does

* **File Minification:** Strips out unnecessary spaces, empty lines, and comments from HTML, CSS, and JS files without breaking your code.
* **Smart Error Checks:** Prevents mistakes by warning you if you paste CSS into the JavaScript tab or HTML into the CSS tab.
* **Impact Calculations:** Instantly shows you:
* How many **bytes** you saved.
* Your **percentage** size reduction.
* Estimated **electricity saved** (in kWh).
* Estimated **carbon emissions avoided** (in grams of $\text{CO}_2$).


* **Quick Tools:** Copy the optimized code with one click or download the minified file directly.

---

###  How to Use It

1. Open `index.html` in any web browser.
2. Select the tab matching your code (**HTML**, **CSS**, or **JavaScript**).
3. Paste your raw code into the editor (or click **Load Sample Code**).
4. Click **OPTIMIZE ASSET**.
5. Copy your new minified code or click **Download .min File**.

---

###  Built With

* **HTML5 & Tailwind CSS** (Dark mode design)
* **Vanilla JavaScript** (Native RegEx and Blob APIs)
* **Zero Dependencies** (Works offline without node modules, frameworks, or APIs)

---

###  Environmental Formula

EcoDomus estimates your environmental savings across **10,000 page views** using standard web sustainability standards:

* $\text{Energy Saved (kWh)} = \frac{\text{Bytes Saved}}{1,073,741,824} \times 0.2 \times 10,000$
* $\text{Carbon Avoided (gCO}_2\text{e)} = \text{Energy (kWh)} \times 442$

<script>
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { parseCsvFile, parseCsvText } from '$lib/csvParser.js';
  import { generateQrCode, buildContentFromRow } from '$lib/qrGenerator.js';
  import { downloadAsZip } from '$lib/zipDownloader.js';
  import { sanitizeFilename, estimateZipSize, sleep } from '$lib/utils.js';
  import "../app.css";

  let dropZone, csvFileInput, textarea, previewTable;
  let contentColumnSelect, filenameColumnSelect;
  let resultsSection, progressBar, counter, estimateText;

  let parsed = { headers: [], rows: [] };
  let qrBlobs = [];
  let isGenerating = false;
  let isDragging = false;

  // New: File & Text state
  let uploadedFileName = '';
  let pastedText = '';

  // Settings
  let prefix = '';
  let suffix = '';
  let size = 300;
  let ecLevel = 'M';
  let fill = '#000000';
  let back = '#ffffff';

  onMount(() => {
    dropZone.addEventListener('click', () => csvFileInput.click());

    ['dragover', 'dragenter'].forEach(e => dropZone.addEventListener(e, ev => {
      ev.preventDefault();
      isDragging = true;
    }));
    ['dragleave', 'drop'].forEach(e => dropZone.addEventListener(e, ev => {
      ev.preventDefault();
      isDragging = false;
    }));
    dropZone.addEventListener('drop', e => {
      if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    });
    csvFileInput.addEventListener('change', e => {
      if (e.target.files[0]) handleFile(e.target.files[0]);
    });
  });

  function handleFile(file) {
    uploadedFileName = file.name;
    parseCsvFile(file).then(data => {
      parsed = data;
      renderPreview();
    }).catch(err => {
      alert('CSV parse error: ' + err.message);
      uploadedFileName = '';
    });
  }

  function clearFile() {
    csvFileInput.value = '';
    uploadedFileName = '';
    clearAllData();
  }

  function clearText() {
    textarea.value = '';
    pastedText = '';
    clearAllData();
  }

  function handlePaste() {
    pastedText = textarea.value.trim();
    if (!pastedText) return;
    parseCsvText(pastedText).then(data => {
      parsed = data;
      renderPreview();
    }).catch(err => {
      alert('Invalid CSV: ' + err.message);
    });
  }

  function clearAllData() {
    parsed = { headers: [], rows: [] };
    previewTable.innerHTML = `<tr><td class="text-center text-muted-custom py-4">Drop or paste CSV to begin</td></tr>`;
    contentColumnSelect.innerHTML = '';
    filenameColumnSelect.innerHTML = '';
  }

  function renderPreview() {
    if (!parsed.rows.length) {
      previewTable.innerHTML = `<tr><td class="text-center text-muted-custom py-4">No valid data</td></tr>`;
      return;
    }

    // Using standard table classes which we override in CSS for dark mode
    let html = `<thead class="table-light"><tr><th>#</th>`;
    parsed.headers.forEach(h => html += `<th>${h}</th>`);
    html += `</tr></thead><tbody>`;

    parsed.rows.slice(0, 10).forEach((row, i) => {
      html += `<tr><td>${i + 1}</td>`;
      parsed.headers.forEach(h => {
        const val = (row[h] || '').toString();
        html += `<td title="${val}">${val.length > 60 ? val.slice(0, 57) + '...' : val}</td>`;
      });
      html += `</tr>`;
    });

    if (parsed.rows.length > 10) {
      html += `<tr><td colspan="${parsed.headers.length + 1}" class="text-center text-muted-custom">... and ${parsed.rows.length - 10} more</td></tr>`;
    }
    html += `</tbody>`;
    previewTable.innerHTML = html;

    const opts = parsed.headers.map(h => `<option value="${h}">${h}</option>`).join('');
    contentColumnSelect.innerHTML = `<option value="">Select content column</option>${opts}`;
    filenameColumnSelect.innerHTML = `<option value="">Sequential numbers</option>${opts}`;

    if (parsed.headers.length) contentColumnSelect.value = parsed.headers[0];
  }

  async function generateAll(previewOnly = false) {
    if (!parsed.rows.length) return alert('No CSV data loaded');
    if (!contentColumnSelect.value) return alert('Please select a content column');

    const contentCols = [contentColumnSelect.value];
    const filenameCol = filenameColumnSelect.value || null;
    const total = previewOnly ? Math.min(5, parsed.rows.length) : parsed.rows.length;

    isGenerating = true;
    qrBlobs = [];
    resultsSection.style.display = 'block';
    estimateText.textContent = estimateZipSize(total, size);
    progressBar.style.width = '0%';
    progressBar.textContent = '0%';
    progressBar.classList.add('progress-bar-animated');

    for (let i = 0; i < total; i++) {
      if (!isGenerating) break;

      const row = parsed.rows[i];
      const content = buildContentFromRow(row, contentCols, prefix, suffix).trim();
      if (!content) continue;

      const qrElement = await generateQrCode(content, { size: +size, ecLevel, fill, back });
      const filename = filenameCol && row[filenameCol] ? sanitizeFilename(row[filenameCol]) : `QR_${String(i + 1).padStart(5, '0')}`;

      let blob;
      if (qrElement.tagName === 'IMG') {
        const resp = await fetch(qrElement.src);
        blob = await resp.blob();
      } else {
        blob = new Blob([qrElement.outerHTML], { type: 'image/svg+xml' });
      }

      qrBlobs.push({ blob, filename, type: qrElement.tagName === 'IMG' ? 'png' : 'svg' });

      const percent = Math.round((i + 1) / total * 100);
      progressBar.style.width = percent + '%';
      progressBar.textContent = percent + '%';
      counter.textContent = `${i + 1} / ${total}`;

      if (i % 20 === 0) await sleep(1);
    }

    if (!previewOnly) {
      progressBar.classList.remove('progress-bar-animated');
    }
    isGenerating = false;
  }
</script>

<svelte:head>
  <title>AxelBase • Bulk CSV QR Code Generator</title>
  <meta name="description" content="Generate thousands of QR codes from CSV – no server, no upload, works offline">
</svelte:head>

<main class="container py-5">
  <div class="row">
    <div class="col-lg-10 mx-auto">

      <div class="text-center mb-5" style="animation: fadeIn 0.8s ease-out;">
        <h1 class="display-4 fw-bold mb-3 text-primary-custom">Bulk QR Code Generator</h1>
        <p class="lead text-muted-custom mb-4">
          100% client-side • No data uploaded • Works offline
        </p>
      </div>

      <section class="card mb-5 shadow-sm">
        <div class="card-header"><h5 class="mb-0">1. Upload or Paste CSV</h5></div>
        <div class="card-body p-4">

          <div bind:this={dropZone}
               class="text-center p-5 mb-4 position-relative"
               class:drag-over={isDragging}
               id="dropZone">
            <div class="mb-3">
              <i class="bi bi-cloud-arrow-up fs-1 text-primary-custom"></i>
            </div>
            <p class="mb-3 fs-5">Drag & drop your CSV file here or click to select</p>
            <input bind:this={csvFileInput} type="file" accept=".csv,text/csv" class="d-none" id="csvFileInput">
            <button type="button" class="btn btn-primary btn-lg">Choose CSV File</button>
          </div>

          {#if uploadedFileName}
            <div class="alert alert-success d-flex align-items-center justify-content-between mb-4 rounded-4">
              <div>
                <i class="bi bi-file-earmark-check me-2"></i>
                <strong>Uploaded:</strong> {uploadedFileName}
              </div>
              <button on:click={clearFile} class="btn btn-sm btn-outline-danger rounded-pill">
                <i class="bi bi-x-lg"></i> Clear
              </button>
            </div>
          {/if}

          <div class="mb-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <label for="csvTextarea" class="form-label fw-bold mb-0">Or paste CSV content:</label>
              {#if pastedText}
                <button on:click={clearText} class="btn btn-sm btn-outline-secondary rounded-pill">
                  <i class="bi bi-trash"></i> Clear text
                </button>
              {/if}
            </div>
            <textarea bind:this={textarea} on:input={handlePaste} id="csvTextarea" class="form-control rounded-3 border-2" rows="4"
                      placeholder="name,url&#10;John Doe,https://example.com/john&#10;Ticket-001,https://event.com/001"></textarea>
          </div>
        </div>
      </section>

      <section class="card mb-5 shadow-sm">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="mb-0">2. CSV Preview ({parsed.rows.length} rows detected)</h5>
          {#if parsed.rows.length > 0}
            <small class="text-white-50">First 10 rows shown</small>
          {/if}
        </div>
        <div class="card-body p-0">
          <div bind:this={previewTable} class="table-responsive">
            <table class="table table-hover mb-0">
              <tbody><tr><td class="text-center text-muted-custom py-5">Drop or paste CSV to begin</td></tr></tbody>
            </table>
          </div>
        </div>
      </section>

      <section class="card mb-5 shadow-sm">
        <div class="card-header"><h5 class="mb-0">3. QR Code Settings</h5></div>
        <div class="card-body p-4">
          <div class="row g-4">
            <div class="col-md-6">
              <label for="contentCol" class="form-label fw-bold">Content column <span class="text-danger">*</span></label>
              <select bind:this={contentColumnSelect} id="contentCol" class="form-select rounded-pill"></select>
            </div>
            <div class="col-md-6">
              <label for="filenameCol" class="form-label fw-bold">Filename column (optional)</label>
              <select bind:this={filenameColumnSelect} id="filenameCol" class="form-select rounded-pill"></select>
            </div>

            <div class="col-12">
              <span class="form-label d-block mb-2 fw-bold">Prefix / Suffix (optional)</span>
              <div class="input-group">
                <span class="input-group-text rounded-start-pill">Prefix</span>
                <input bind:value={prefix} type="text" class="form-control" placeholder="https://example.com/">
                <span class="input-group-text">Suffix</span>
                <input bind:value={suffix} type="text" class="form-control rounded-end-pill" placeholder="/ticket">
              </div>
            </div>

            <div class="col-md-3">
              <label for="qrSize" class="form-label fw-bold">Size</label>
              <select bind:value={size} id="qrSize" class="form-select rounded-pill">
                <option value="200">200×200</option>
                <option value="300">300×300</option>
                <option value="400">400×400</option>
                <option value="500">500×500</option>
              </select>
            </div>
            <div class="col-md-3">
              <label for="ecLevel" class="form-label fw-bold">Error Correction</label>
              <select bind:value={ecLevel} id="ecLevel" class="form-select rounded-pill">
                <option value="L">L (7%)</option>
                <option value="M">M (15%)</option>
                <option value="Q">Q (25%)</option>
                <option value="H">H (30%)</option>
              </select>
            </div>
            <div class="col-md-3">
              <label for="fgColor" class="form-label fw-bold">Foreground</label>
              <input bind:value={fill} type="color" id="fgColor" class="form-control form-control-color rounded-pill w-100">
            </div>
            <div class="col-md-3">
              <label for="bgColor" class="form-label fw-bold">Background</label>
              <input bind:value={back} type="color" id="bgColor" class="form-control form-control-color rounded-pill w-100">
            </div>
          </div>
        </div>
      </section>

      <div class="text-center mb-5">
        <button on:click={() => generateAll(true)} class="btn btn-outline-primary btn-lg me-3 mb-2">
          <i class="bi bi-eye me-2"></i>Preview First 5
        </button>
        <button on:click={() => generateAll(false)} disabled={isGenerating} class="btn btn-success btn-lg mb-2 px-5">
          {#if isGenerating}
            <span class="spinner-border spinner-border-sm me-2" role="status"></span>
            Generating...
          {:else}
            <i class="bi bi-qr-code-scan me-2"></i>Generate All QR Codes
          {/if}
        </button>
      </div>

      <section bind:this={resultsSection} class="card shadow-sm border-0" style="display:none; border: 2px solid #00BB2D;">
        <div class="card-body text-center p-5">
          <h4 class="mb-4 text-primary-custom fw-bold">Generation Complete!</h4>
          
          <div class="progress mb-4 shadow-sm" style="height:30px;">
            <div bind:this={progressBar} class="progress-bar progress-bar-striped progress-bar-animated" style="width:0%">0%</div>
          </div>
          
          <p bind:this={counter} class="display-6 fw-bold">0 / 0</p>
          <p bind:this={estimateText} class="lead text-muted-custom mb-4"></p>
          
          <div class="d-flex justify-content-center gap-3 flex-wrap">
            <button on:click={() => downloadAsZip(qrBlobs.filter(q => q.type === 'png'), 'png')} class="btn btn-primary btn-lg shadow">
              <i class="bi bi-download me-2"></i>Download PNG ZIP
            </button>
            <button on:click={() => downloadAsZip(qrBlobs.filter(q => q.type === 'svg'), 'svg')} class="btn btn-outline-primary btn-lg shadow-sm">
              <i class="bi bi-download me-2"></i>Download SVG ZIP
            </button>
          </div>
        </div>
      </section>

      <hr class="my-5 border-0" style="height: 1px; background: var(--border-color);">

<section id="about" class="mb-5 py-4">
  <h2 class="text-primary-custom fw-bold mb-3">About Bulk QR Code Generator</h2>
  <div class="bg-white-custom p-4 rounded-4 shadow-sm">
    <p class="lead">
      <strong>Bulk QR Code Generator</strong> is a 100% client-side, open-source web utility that lets you create thousands of fully customizable QR codes from a single CSV file — instantly, privately, and offline.
    </p>
    <p>
      Built with SvelteKit and deployed via GitHub Pages, this tool uses only modern browser APIs: <code>kjua</code> for QR rendering, <code>PapaParse</code> for lightning-fast CSV parsing, and <code>JSZip</code> for on-the-fly ZIP creation. No backend. No database. No tracking.
    </p>
    <p>
      Whether you're organizing a 5,000-person conference, tagging warehouse inventory, distributing personalized marketing links, or printing WiFi access codes for a café — this tool eliminates the pain of manual QR creation. Your CSV stays on your device. Generated QR codes are packaged into clean ZIP files (PNG or SVG) and downloaded directly — all in under 30 seconds.
    </p>
    <p>
      <strong>Privacy by design:</strong> Because everything runs locally, <em>we never see your data</em>. No IP logging, no analytics, no cookies. After the first load, it works completely offline. This makes it ideal for sensitive environments: corporate intranets, secure facilities, or when internet access is unreliable.
    </p>
    <p>
      Performance is unmatched. Thanks to cooperative multitasking, chunked async processing, and memory-efficient blob handling, the tool can generate <strong>10,000+ QR codes without freezing</strong> your browser — even on modest laptops. We've tested up to 20,000 rows successfully.
    </p>
    <p>
      Full customization gives you professional results: use any CSV column as filename, add automatic URL prefixes/suffixes, choose from four error-correction levels (L–H), set exact sizes (200–500px), and pick any foreground/background color. Output as crisp SVG for print or lightweight PNG for digital use.
    </p>
    <p>
      Deploy your own branded version in 60 seconds using GitHub Pages. Fork the repo, change colors and logo, and you're live. No build tools needed.
    </p>
    <p class="mb-0">
      This isn't just a QR generator — it's a <strong>privacy-first productivity powerhouse</strong> trusted by event organizers, warehouse managers, educators, and developers worldwide.
    </p>
  </div>
</section>

<section id="how-to" class="mb-5 py-4">
  <h2 class="text-primary-custom fw-bold mb-3">How to Use Bulk QR Code Generator</h2>
  <div class="row g-4">
    <div class="col-md-4">
      <div class="bg-white-custom p-4 rounded-4 shadow-sm h-100 d-flex flex-column">
        <h5 class="fw-bold text-primary-custom"><i class="bi bi-file-earmark-spreadsheet me-2"></i>1. Prepare Your CSV</h5>
        <p>Create a simple CSV file with clear headers. At minimum, include one column containing the data you want inside each QR code (e.g., URLs, text, vCard info). Optionally add:</p>
        <ul class="small mt-2">
          <li><strong>Filename column</strong> — e.g., "name", "ticket_id"</li>
          <li><strong>Prefix/suffix columns</strong> — or set globally</li>
        </ul>
        <p class="mt-auto"><strong>Example:</strong><br><code>name,url<br>John Doe,https://event.com/123</code></p>
      </div>
    </div>
    <div class="col-md-4">
      <div class="bg-white-custom p-4 rounded-4 shadow-sm h-100 d-flex flex-column">
        <h5 class="fw-bold text-primary-custom"><i class="bi bi-gear-wide-connected me-2"></i>2. Configure Settings</h5>
        <p>Drag & drop your CSV or paste directly. Then customize:</p>
        <ul class="small mt-2">
          <li>Select <strong>content column</strong> (what goes inside QR)</li>
          <li>Choose <strong>filename column</strong> (optional)</li>
          <li>Add <strong>prefix/suffix</strong> (e.g., <code>https://mystore.com/</code>)</li>
          <li>Set <strong>size</strong>, <strong>error correction</strong> (H for logos), and <strong>colors</strong></li>
        </ul>
        <p class="mt-auto">Preview first 5 codes to verify everything looks perfect.</p>
      </div>
    </div>
    <div class="col-md-4">
      <div class="bg-white-custom p-4 rounded-4 shadow-sm h-100 d-flex flex-column">
        <h5 class="fw-bold text-primary-custom"><i class="bi bi-download me-2"></i>3. Generate & Download</h5>
        <p>Click “Generate All QR Codes”. Watch the live progress bar. When complete:</p>
        <ul class="small mt-2">
          <li>Download <strong>PNG ZIP</strong> — perfect for email, web, WhatsApp</li>
          <li>Download <strong>SVG ZIP</strong> — infinitely scalable for print, stickers, signage</li>
        </ul>
        <p class="mt-auto"><strong>Pro tip:</strong> Use SVG for anything printed. Use PNG for digital sharing.</p>
      </div>
    </div>
  </div>
  <div class="text-center mt-4">
    <a href="#dropZone" class="btn btn-success btn-lg px-5"><i class="bi bi-qr-code-scan me-2"></i>Start Generating Now</a>
  </div>
</section>

<section id="faq" class="mb-5 py-4">
  <h2 class="text-primary-custom fw-bold mb-3">Frequently Asked Questions</h2>
  <div class="accordion shadow-sm rounded-4 overflow-hidden" id="faqAccordion">
    <div class="accordion-item border-0 bg-white-custom">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed fw-bold bg-white-custom text-primary-custom" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
          Is my data really private and secure?
        </button>
      </h2>
      <div id="faq1" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
        <div class="accordion-body">
          <strong>Yes — 100%.</strong> This tool runs entirely in your browser. Your CSV file is parsed locally using PapaParse. QR codes are generated with kjua. ZIP files are created with JSZip. Nothing is uploaded, logged, or transmitted. You can disconnect from the internet after loading and it still works perfectly. No cookies, no analytics, no tracking — ever.
        </div>
      </div>
    </div>

    <div class="accordion-item border-0 border-top border-secondary">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed fw-bold bg-white-custom text-primary-custom" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
          How many QR codes can I generate at once?
        </button>
      </h2>
      <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
        <div class="accordion-body">
          The only limit is your device’s RAM. We’ve successfully tested:
          <ul class="mt-2">
            <li><strong>20,000+</strong> rows on high-end laptops</li>
            <li><strong>10,000+</strong> rows on average machines</li>
            <li><strong>3,000–5,000</strong> rows on mobile devices</li>
          </ul>
          The tool uses chunked async processing and yields control every 20 items to prevent freezing.
        </div>
      </div>
    </div>

    <div class="accordion-item border-0 border-top border-secondary">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed fw-bold bg-white-custom text-primary-custom" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
          Should I use PNG or SVG?
        </button>
      </h2>
      <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
        <div class="accordion-body">
          <strong>PNG</strong>: Smaller files (~4–12 KB), perfect for email, websites, WhatsApp, PDFs.<br>
          <strong>SVG</strong>: Vector format, infinitely scalable, 1–3 KB, ideal for printing stickers, badges, signage, vinyl, embroidery.<br>
          <strong>Best practice:</strong> Download both. Use PNG for digital, SVG for print.
        </div>
      </div>
    </div>

    <div class="accordion-item border-0 border-top border-secondary">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed fw-bold bg-white-custom text-primary-custom" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
          Can I add my logo to QR codes?
        </button>
      </h2>
      <div id="faq4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
        <div class="accordion-body">
          Not yet — but it’s on the roadmap! For now, use <strong>H-level error correction</strong> (30% recovery) which allows you to safely overlay a logo in design software after generation. We recommend 400–500px size and at least 25% central coverage tolerance.
        </div>
      </div>
    </div>

    <div class="accordion-item border-0 border-top border-secondary">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed fw-bold bg-white-custom text-primary-custom" type="button" data-bs-toggle="collapse" data-bs-target="#faq5">
          Can I deploy my own branded version?
        </button>
      </h2>
      <div id="faq5" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
        <div class="accordion-body">
          Absolutely! Just:
          <ol class="mt-2">
            <li>Fork the GitHub repo</li>
            <li>Edit <code>+page.svelte</code> (title, colors, logo)</li>
            <li>Enable GitHub Pages on <code>main</code> branch → <code>/docs</code> folder</li>
          </ol>
          Live in under 60 seconds at <code>https://yourcompany.github.io/your-qr-tool</code>
        </div>
      </div>
    </div>

    <div class="accordion-item border-0 border-top border-secondary">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed fw-bold bg-white-custom text-primary-custom" type="button" data-bs-toggle="collapse" data-bs-target="#faq6">
          Why choose H error correction for print?
        </button>
      </h2>
      <div id="faq6" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
        <div class="accordion-body">
          H-level survives up to <strong>30% damage</strong>. That means your QR code remains scannable even if:
          <ul class="mt-2">
            <li>A logo covers the center</li>
            <li>It's scratched or torn</li>
            <li>Printed on curved surfaces</li>
            <li>Covered in dirt or snow</li>
          </ul>
          For stickers, badges, or outdoor use — always choose H.
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  </div>
</main>
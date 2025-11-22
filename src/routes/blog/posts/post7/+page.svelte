<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>QR Code Versions, Module Size & Minimum Print Requirements • Blog</title>
  <meta name="description" content="Technical guide to QR versions (1–40), module size, and minimum scannable print dimensions for reliable scanning." />
  <meta property="og:title" content="QR Code Versions, Module Size & Print Requirements" />
  <meta property="og:description" content="Never print unscannable QR codes again. Learn the math behind module size, version limits, and real minimum print sizes." />
  <meta property="og:url" content="{base}/blog/posts/post7" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a> <span>/</span>
    <p>QR Code Versions, Module Size & Print Requirements</p>
  </div>

  <article class="prose">
    <h1>QR Code Versions, Module Size & Minimum Print Requirements</h1>
    <p class="post-meta">Published: November 22, 2025</p>

    <p>You’ve seen QR codes that “don’t scan” on business cards or posters. 99% of the time, it’s because they were printed too small.</p>

    <h2>QR Code Versions (1–40)</h2>
    <p>Version 1 = 21×21 modules<br>
    Version 40 = 177×177 modules<br>
    Longer URLs → higher version → more modules → needs larger physical size.</p>

    <h2>The Golden Rule: Minimum Module Size</h2>
    <p>Each black/white square (module) must be <strong>at least 0.5mm × 0.5mm</strong> (2px at 300 DPI) for reliable scanning.</p>

    <h3>Real Minimum Print Sizes</h3>
    <table class="table table-bordered">
      <thead class="table-light">
        <tr><th>URL Length</th><th>Typical Version</th><th>Min Print Size (mm)</th><th>Min Print Size (inches)</th></tr>
      </thead>
      <tbody>
        <tr><td>Short (~50 chars)</td><td>V10–15</td><td>20 × 20 mm</td><td>0.8" × 0.8"</td></tr>
        <tr><td>Medium (~150 chars)</td><td>V20–25</td><td>25 × 25 mm</td><td>1.0" × 1.0"</td></tr>
        <tr><td>Long (~300+ chars)</td><td>V30–40</td><td>35 × 35 mm</td><td>1.4" × 1.4"</td></tr>
      </tbody>
    </table>

    <h2>Quiet Zone (White Border)</h2>
    <p>Always include <strong>4 modules</strong> of white space around the QR. No text, logos, or colors in this zone.</p>

    <h2>Pro Tips for Print</h2>
    <ul>
      <li>Use SVG for print — infinitely sharp</li>
      <li>Aim for 30–40mm for most real-world uses</li>
      <li>Test with multiple phones before mass printing</li>
      <li>Avoid glossy surfaces that cause glare</li>
    </ul>

    <p class="italic-note">A QR code is only useful if it scans — size and contrast are everything.</p>
  </article>
</div>

<style>
  /* Same styles as your example — reused for consistency */
  .post-layout { max-width: 800px; padding: 2rem 1rem 4rem; margin: 0 auto; }
  .breadcrumbs { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; font-size: 0.9rem; color: #666; }
  .breadcrumbs a { color: #0d6efd; text-decoration: none; }
  .breadcrumbs a:hover { text-decoration: underline; }
  .prose { line-height: 1.8; }
  .prose .post-meta { color: #666; font-size: 0.9rem; margin-bottom: 2rem; border-bottom: 1px solid #eee; padding-bottom: 1rem; }
  .prose h1 { font-size: 2.5rem; margin-bottom: 0.5rem; color: #222; }
  .prose h2 { margin-top: 2.5rem; color: #0d6efd; border-bottom: 1px solid #e7f0ff; padding-bottom: 0.5rem; }
  .italic-note { font-style: italic; color: #666; text-align: center; margin-top: 3rem; }
</style>
<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>How It Works: From CSV to ZIP in Your Browser • Blog</title>
  <meta name="description" content="Technical deep dive: how Bulk QR Code Generator creates thousands of QR codes entirely client-side using kjua, JSZip, and SvelteKit." />
  <meta property="og:title" content="How It Works: From CSV to ZIP in Your Browser" />
  <meta property="og:description" content="No backend. No uploads. See exactly how 10,000+ QR codes are generated instantly in the browser." />
  <meta property="og:url" content="{base}/blog/posts/post2" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a> <span>/</span>
    <p>How It Works: From CSV to ZIP in Your Browser</p>
  </div>

  <article class="prose">
    <h1>How It Works: From CSV to ZIP in Your Browser</h1>
    <p class="post-meta">Published: November 22, 2025</p>

    <p>You drop a CSV. You click “Generate”. Seconds later, you have a ZIP with thousands of QR codes. But how is this possible <em>without a server</em>?</p>

    <h2>The Magic Stack</h2>
    <p>This tool is built with four key technologies that make client-side bulk generation possible:</p>
    <ul>
      <li><strong>kjua</strong> – Lightweight, fast QR code renderer (SVG & PNG)</li>
      <li><strong>JSZip</strong> – Create ZIP files directly in memory</li>
      <li><strong>PapaParse</strong> – Blazing-fast CSV parsing in the browser</li>
      <li><strong>SvelteKit + adapter-static</strong> – Zero-config GitHub Pages deployment</li>
    </ul>

    <h2>Step-by-Step Process</h2>
    <p>When you upload or paste a CSV:</p>
    <ol>
      <li>PapaParse instantly converts it into a JavaScript array</li>
      <li>You choose which column contains the QR content (and optionally filename)</li>
      <li>On “Generate”, a loop runs asynchronously</li>
      <li>For each row: kjua renders a QR code (as canvas or SVG)</li>
      <li>Blob is created and added to a JSZip instance</li>
      <li>Progress bar updates smoothly using requestAnimationFrame</li>
      <li>Final ZIP is streamed directly to your downloads folder</li>
    </ol>

    <h2>No Memory Leaks, No Freezes</h2>
    <p>Generating 5,000+ images could crash a tab. We prevent this with:</p>
    <ul>
      <li>Processing only 20 rows per frame</li>
      <li>Using <code>Blob</code> and <code>URL.createObjectURL</code> efficiently</li>
      <li>Releasing memory as soon as possible</li>
    </ul>

    <p>Result: Even 20,000 QR codes generate smoothly on most devices.</p>

    <p class="italic-note">This is the power of modern web standards — desktop-class apps in the browser.</p>
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
  .prose ul { padding-left: 1.5rem; }
  .prose ul li { margin-bottom: 0.5rem; }
  .prose ul li::marker { color: #0d6efd; }
  .italic-note { font-style: italic; color: #666; text-align: center; margin-top: 3rem; }
</style>
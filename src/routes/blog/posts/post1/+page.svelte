<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Introducing Bulk QR Code Generator • Blog</title>
  <meta name="description" content="Generate thousands of QR codes instantly from CSV — 100% in your browser, no server, no upload. Works offline, supports PNG & SVG." />
  <meta property="og:title" content="Introducing Bulk QR Code Generator" />
  <meta property="og:description" content="The fastest, most private way to create bulk QR codes from CSV. No data leaves your device. Works offline. Free forever." />
  <meta property="og:url" content="{base}/blog/posts/post1" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Introducing Bulk QR Code Generator" />
  <meta name="twitter:description" content="Generate thousands of QR codes instantly — 100% client-side, offline-ready, free." />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a> <span>/</span>
    <p>Introducing Bulk QR Code Generator</p>
  </div>

  <article class="prose">
    <h1>Introducing Bulk QR Code Generator</h1>
    <p class="post-meta">Published: November 22, 2025</p>

    <p>Need to generate <strong>500 event tickets</strong> with unique check-in links? Or <strong>2,000 inventory tags</strong> with individual tracking URLs? Most online QR generators either limit you to 10 at a time, require uploads, or charge per batch.</p>

    <p><strong>Bulk QR Code Generator</strong> solves this — <em>instantly, privately, and for free</em>.</p>

    <h2>100% Client-Side. Zero Uploads.</h2>
    <p>This tool runs entirely in your browser using SvelteKit and the static adapter. When you drop a CSV file or paste data, nothing is sent to any server. Your data never leaves your device — not even temporarily.</p>

    <p>After the first load, it works completely offline. Perfect for secure environments or when you're on a plane.</p>

    <h2>Blazing Fast Performance</h2>
    <p>Thanks to kjua for QR rendering and JSZip for packaging, this tool can generate <strong>10,000+ QR codes in under 20 seconds</strong> on a modern laptop — all without freezing the browser.</p>

    <p>Progressive generation with a live progress bar and memory-efficient blob handling ensures smooth performance even on lower-end devices.</p>

    <h3>Key Features</h3>
    <ul>
      <li>Supports PNG and crisp SVG output</li>
      <li>Custom size (200–500px), colors, and error correction</li>
      <li>Use any CSV column as filename</li>
      <li>Add prefix/suffix to URLs automatically</li>
      <li>Download everything as a clean ZIP</li>
      <li>Works on mobile and desktop</li>
    </ul>

    <h2>Perfect For Real-World Use</h2>
    <p>Event organizers use it for personalized tickets. Warehouses generate asset labels. Cafés create WiFi access codes. Schools print student ID badges. All with a single CSV and one click.</p>

    <p>No account. No limits. No tracking.</p>

    <h2>Try It Now</h2>
    <p class="text-center mt-5">
      <a href="{base}/" class="btn btn-success btn-lg px-5">Generate QR Codes Now →</a>
    </p>

    <p class="italic-note">This tool is open source and deployed on GitHub Pages — you can fork and host your own version in seconds.</p>
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
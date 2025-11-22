<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>PNG vs SVG: Which QR Format Should You Choose? • Blog</title>
  <meta name="description" content="Understand when to use PNG (small files) vs SVG (infinitely scalable) for your bulk QR codes." />
  <meta property="og:title" content="PNG vs SVG: Which QR Format Should You Choose?" />
  <meta property="og:description" content="PNG for email & web. SVG for print & vinyl. Learn the real differences and best use cases." />
  <meta property="og:url" content="{base}/blog/posts/post5" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a> <span>/</span>
    <p>PNG vs SVG: Which QR Format Should You Choose?</p>
  </div>

  <article class="prose">
    <h1>PNG vs SVG: Which QR Format Should You Choose?</h1>
    <p class="post-meta">Published: November 22, 2025</p>

    <p>After generating 5,000 QR codes, you get two download buttons: PNG ZIP and SVG ZIP. But which one should you actually use?</p>

    <h2>PNG – Raster (Pixel-Based)</h2>
    <ul>
      <li>File size: ~4–12 KB per 400px QR</li>
      <li>Works everywhere: email, WhatsApp, websites, PowerPoint</li>
      <li>Fixed resolution — don’t enlarge too much</li>
      <li>Best for digital distribution</li>
    </ul>

    <h2>SVG – Vector (Scalable)</h2>
    <ul>
      <li>File size: ~1–3 KB per QR</li>
      <li>Infinitely scalable — print at poster size with zero quality loss</li>
      <li>Editable in Illustrator, Inkscape, Figma</li>
      <li>Perfect for stickers, badges, signage, embroidery</li>
    </ul>

    <h2>Real-World Recommendations</h2>
    <table class="table table-bordered mt-4">
      <thead><tr><th>Use Case</th><th>Recommended Format</th></tr></thead>
      <tbody>
        <tr><td>Event tickets (email/PDF)</td><td>PNG</td></tr>
        <tr><td>Name badges & lanyards</td><td>SVG</td></tr>
        <tr><td>Product labels & packaging</td><td>SVG</td></tr>
        <tr><td>Website & social media</td><td>PNG</td></tr>
        <tr><td>Vinyl stickers & banners</td><td>SVG</td></tr>
      </tbody>
    </table>

    <h2>Pro Move: Download Both</h2>
    <p>The tool lets you download <strong>both formats at once</strong> — no extra work. Keep PNGs for digital use and SVGs for print vendors.</p>

    <p class="italic-note">When in doubt: generate both. Storage is cheap. Regret is expensive.</p>
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
<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Understanding QR Code Error Correction Levels • Blog</title>
  <meta name="description" content="Deep dive into QR error correction: L, M, Q, H levels explained with real-world damage tests and recovery rates." />
  <meta property="og:title" content="Understanding QR Code Error Correction Levels" />
  <meta property="og:description" content="Learn how QR codes survive up to 30% damage and when to use H-level for logos, stickers, and harsh environments." />
  <meta property="og:url" content="{base}/blog/posts/post6" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a> <span>/</span>
    <p>Understanding QR Code Error Correction Levels</p>
  </div>

  <article class="prose">
    <h1>Understanding QR Code Error Correction Levels</h1>
    <p class="post-meta">Published: November 22, 2025</p>

    <p>QR codes can survive damage — scratches, dirt, partial obstruction — thanks to Reed-Solomon error correction. But not all QR codes are equal.</p>

    <p>This tool lets you choose between four levels: <strong>L, M, Q, and H</strong>. Here’s what they actually mean.</p>

    <h2>The Four Levels Explained</h2>
    <table class="table table-bordered">
      <thead class="table-light">
        <tr><th>Level</th><th>Recovery Capacity</th><th>Data Overhead</th><th>Best For</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>L</strong> (Low)</td><td>~7%</td><td>Least modules</td><td>Clean environments, maximum data</td></tr>
        <tr><td><strong>M</strong> (Medium)</td><td>~15%</td><td>Good balance</td><td>Default — recommended for most uses</td></tr>
        <tr><td><strong>Q</strong> (Quartile)</td><td>~25%</td><td>High redundancy</td><td>Industrial, outdoor, small print</td></tr>
        <tr><td><strong>H</strong> (High)</td><td>~30%</td><td>Most modules</td><td>Logos, stickers, harsh conditions</td></tr>
      </tbody>
    </table>

    <h2>Real-World Damage Tests</h2>
    <p>A QR with 30% H-level correction can be scanned even if:</p>
    <ul>
      <li>A large logo covers the center</li>
      <li>25% of the code is scratched or torn</li>
      <li>It’s printed on curved or textured surfaces</li>
      <li>It’s partially covered in dirt or snow</li>
    </ul>

    <p>Level L fails at ~8% damage. Level H survives triple that.</p>

    <h2>When to Use H (and When Not To)</h2>
    <p><strong>Use H when:</strong> printing stickers, badges, product labels, or adding logos.<br>
    <strong>Use M when:</strong> digital display, clean paper tickets, or controlled environments.</p>

    <h2>Trade-off: Data Capacity</h2>
    <p>Higher correction = fewer data modules = less URL capacity at same physical size. A 400px H-level QR holds ~15–20% less data than L-level.</p>

    <p class="italic-note">For branded or durable QR codes, always choose Q or H. The resilience is worth the small data trade-off.</p>
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
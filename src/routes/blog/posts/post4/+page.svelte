<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Custom Filenames, Prefixes, and Colors • Blog</title>
  <meta name="description" content="Learn how to use any CSV column as QR filename, add URL prefixes/suffixes, and fully customize colors and sizes." />
  <meta property="og:title" content="Custom Filenames, Prefixes, and Colors" />
  <meta property="og:description" content="Make every QR code unique: personalized names, branded colors, automatic URL wrapping — all from your CSV." />
  <meta property="og:url" content="{base}/blog/posts/post4" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a> <span>/</span>
    <p>Custom Filenames, Prefixes, and Colors</p>
  </div>

  <article class="prose">
    <h1>Custom Filenames, Prefixes, and Colors</h1>
    <p class="post-meta">Published: November 22, 2025</p>

    <p>Generic QR codes named <code>qr_00001.png</code> work — but they’re not professional. Your attendees, customers, and inventory managers expect better.</p>

    <p>This tool gives you full control over naming and appearance — directly from your CSV.</p>

    <h2>Smart Filename Mapping</h2>
    <p>Have a column called “Ticket ID”, “Asset Name”, or “Attendee”? Just select it as the <strong>Filename column</strong> and every QR code will be saved exactly as that value.</p>

    <p>Example CSV:</p>
    <pre><code>name,url
VIP-John-Doe,https://event.com/vip/123
Table-42,https://event.com/table/42</code></pre>

    <p>Resulting files:</p>
    <ul>
      <li><code>VIP-John-Doe.png</code></li>
      <li><code>Table-42.png</code></li>
    </ul>

    <p>Files are automatically sanitized (including spaces and special characters safely handled).</p>

    <h2>Automatic Prefix & Suffix</h2>
    <p>Stop manually editing URLs. Add a prefix like <code>https://mystore.com/</code> and a suffix like <code>/redeem</code> once — every QR content becomes:</p>
    <p><code>https://mystore.com/ABC123/redeem</code></p>

    <p>Perfect for ticketing systems, affiliate links, or WiFi passwords.</p>

    <h2>Full Visual Branding</h2>
    <p>Match your brand in seconds:</p>
    <ul>
      <li>Size: 200×200 to 500×500 px</li>
      <li>Error correction: L to H (survives damage or logos)</li>
      <li>Foreground & background colors (color picker)</li>
    </ul>

    <p>Want black-on-transparent for stickers? White-on-navy for business cards? Done.</p>

    <h2>Pro Tip: Combine Everything</h2>
    <p>CSV column “code” → prefix <code>https://check.in/</code> → suffix <code>/vip</code> → filename from “name” column → red foreground → 400px → SVG output.</p>

    <p>One click. Thousands of perfectly branded, uniquely named, scannable QR codes.</p>

    <p class="italic-note">Your QR codes should reflect your brand — not look like everyone else’s.</p>
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
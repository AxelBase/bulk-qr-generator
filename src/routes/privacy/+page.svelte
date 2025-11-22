<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Privacy Policy • Bulk QR Code Generator</title>
  <meta name="description" content="We collect zero data. Your CSV files and generated QR codes never leave your browser. 100% private, offline-first tool." />
  <meta property="og:title" content="Privacy Policy • Bulk QR Code Generator" />
  <meta property="og:description" content="No tracking. No uploads. No servers. Your data stays on your device — always." />
  <meta property="og:url" content="{base}/privacy" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary" />
</svelte:head>

<div class="container py-5 post-layout">
  <div class="breadcrumbs mb-4">
    <a href="{base}/">Home</a> <span>/</span>
    <p>Privacy Policy</p>
  </div>

  <article class="prose mx-auto">
    <h1>Privacy Policy</h1>
    <p class="post-meta">Effective Date: November 22, 2025</p>

    <p>Welcome to <strong>Bulk QR Code Generator</strong> — a completely <strong>client-side</strong>, <strong>offline-first</strong> web application. We are deeply committed to your privacy. Because this tool runs 100% in your browser, <strong>we do not collect, store, transmit, or process any personal data — ever.</strong></p>

    <h2>Zero Data Collection</h2>
    <p>When you use this tool:</p>
    <ul>
      <li><strong>No CSV files are uploaded</strong> — they are parsed directly in your browser using PapaParse</li>
      <li><strong>No QR codes leave your device</strong> — they are generated with kjua and packaged with JSZip locally</li>
      <li><strong>No IP addresses, browser info, or usage analytics</strong> are recorded</li>
      <li><strong>No cookies, localStorage persistence, or tracking pixels</strong> are used</li>
    </ul>

    <h2>How Your Data Stays Private</h2>
    <p>Everything happens in memory or temporary Blob objects. When you:</p>
    <ul>
      <li>Drop or paste a CSV → processed instantly by your CPU</li>
      <li>Click “Generate” → QR codes rendered on canvas/SVG in your browser</li>
      <li>Download ZIP → created and streamed directly from your device</li>
    </ul>
    <p><strong>Nothing touches any server.</strong> Even if you’re offline after the first load, the tool works perfectly.</p>

    <h2>No Third-Party Services</h2>
    <p>We do not use Google Analytics, Meta Pixel, Cloudflare Insights, or any external tracking. The only external resources are optional CDNs for Bootstrap and Bootstrap Icons — which do not track users.</p>

    <h2>Your Responsibility</h2>
    <p>Since all processing is local:</p>
    <ul>
      <li>Do not input sensitive personal data if you don’t want it in browser history</li>
      <li>Clear your browser cache if handling confidential CSVs</li>
      <li>Use in private/incognito mode for maximum isolation</li>
    </ul>

    <h2>Children’s Privacy</h2>
    <p>This tool does not target children under 13 and collects no data from any user.</p>

    <h2>Changes to This Policy</h2>
    <p>We may update this policy. Changes will be posted here with the new effective date.</p>

    <p class="italic-note text-center mt-5">
      <strong>Your privacy is not negotiable.</strong><br>
      That’s why we built a tool that needs none of it.
    </p>
  </article>
</div>

<style>
  /* Same clean style as blog posts */
  .post-layout { max-width: 800px; margin: 0 auto; }
  .breadcrumbs { font-size: 0.95rem; color: #666; }
  .breadcrumbs a { color: #0d6efd; text-decoration: none; }
  .prose h1 { font-size: 2.6rem; color: #222; }
  .prose h2 { margin-top: 2.5rem; color: #0d6efd; border-bottom: 1px solid #e3f2fd; padding-bottom: 0.5rem; }
  .prose ul { padding-left: 1.6rem; }
  .prose ul li::marker { color: #0d6efd; }
  .italic-note { font-style: italic; color: #555; font-size: 1.1rem; }
</style>
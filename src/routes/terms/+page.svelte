<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Terms & Conditions • Bulk QR Code Generator</title>
  <meta name="description" content="Terms of use for the free, open-source, client-side Bulk QR Code Generator." />
  <meta property="og:title" content="Terms & Conditions • Bulk QR Code Generator" />
  <meta property="og:description" content="Free to use, modify, and deploy. No warranties. No liability." />
  <meta property="og:url" content="{base}/terms" />
  <meta property="og:type" content="website" />
</svelte:head>

<div class="container py-5 post-layout">
  <div class="breadcrumbs mb-4">
    <a href="{base}/">Home</a> <span>/</span>
    <p>Terms & Conditions</p>
  </div>

  <article class="prose mx-auto">
    <h1>Terms & Conditions</h1>
    <p class="post-meta">Last Updated: November 22, 2025</p>

    <p>By using <strong>Bulk QR Code Generator</strong> ("the Tool"), you agree to these Terms. This is a <strong>free, open-source</strong>, client-side web application provided "as is".</p>

    <h2>1. Nature of Service</h2>
    <p>The Tool runs <strong>entirely in your browser</strong>. No data is sent to any server. We do not host, store, or process your CSV files or generated QR codes.</p>

    <h2>2. License to Use</h2>
    <p>You may use the Tool freely for personal or commercial purposes. You may fork, modify, and deploy your own version under the <strong>MIT License</strong> (see GitHub repository).</p>

    <h2>3. No Warranty</h2>
    <p>The Tool is provided <strong>"as is"</strong> without warranty of any kind, express or implied, including but not limited to:</p>
    <ul>
      <li>Fitness for a particular purpose</li>
      <li>Accuracy of generated QR codes</li>
      <li>Non-infringement</li>
      <li>Availability or uptime (it’s static!)</li>
    </ul>
    <p><strong>Use at your own risk.</strong></p>

    <h2>4. Limitation of Liability</h2>
    <p>We shall not be liable for any damages arising from:</p>
    <ul>
      <li>Incorrect, unreadable, or unscannable QR codes</li>
      <li>Data loss or corruption of your data</li>
      <li>Printing or production issues</li>
      <li>Any indirect, incidental, or consequential damages</li>
    </ul>

    <h2>5. Responsibility for Content</h2>
    <p>You are solely responsible for the content of the CSV data you input and the QR codes you generate. Do not use the Tool to create malicious, illegal, or harmful content.</p>

    <h2>6. Changes & Termination</h2>
    <p>We may modify or discontinue the hosted version at any time without notice. The source code remains available on GitHub.</p>

    <h2>7. Governing Law</h2>
    <p>These Terms shall be governed by the laws of open-source goodwill and common sense.</p>

    <p class="italic-note text-center mt-5">
      <strong>We believe tools should be free, useful, and private.</strong><br>
      That’s why we made this one free, open, and offline-first.
    </p>
  </article>
</div>

<style>
  /* Same as privacy page */
  .post-layout { max-width: 800px; margin: 0 auto; }
  .breadcrumbs { font-size: 0.95rem; color: #666; }
  .breadcrumbs a { color: #0d6efd; text-decoration: none; }
  .prose h1 { font-size: 2.6rem; color: #222; }
  .prose h2 { margin-top: 2.5rem; color: #0d6efd; border-bottom: 1px solid #e3f2fd; padding-bottom: 0.5rem; }
  .prose ul li::marker { color: #0d6efd; }
  .italic-note { font-style: italic; color: #555; font-size: 1.1rem; }
</style>
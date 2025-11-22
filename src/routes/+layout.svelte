<script lang="ts">
  import { base } from '$app/paths';
  import { fly } from 'svelte/transition';
  import '../app.css';

  // --- Buy Me A Coffee Logic ---
  const paypalUsername = 'AxelLab427'; // Add your username here
  const donationAmounts = [1, 3, 5, 10];
  let isDropdownOpen = false;
  
  const currentYear = new Date().getFullYear();

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  function closeDropdown() {
    isDropdownOpen = false;
  }

  function clickOutside(node: HTMLElement) {
    const handleClick = (event: MouseEvent) => {
      if (node && !node.contains(event.target as Node)) {
        node.dispatchEvent(new CustomEvent('click_outside'));
      }
    };
    document.addEventListener('click', handleClick, true);
    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
    };
  }

  // --- Theme Toggle Logic ---
  function toggleTheme() {
    const current = document.body.getAttribute('data-bs-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-bs-theme', next);
  }
</script>

<header class="custom-navbar">
  <nav class="container" style="display: flex; justify-content: space-between; align-items: center; height: 100%;">
    
    <div style="display: flex; align-items: center; gap: 1rem;">
      <a href="{base}/" aria-label="Home">
        <img src="{base}/AxelLab-Logo.ico" alt="Logo" class="navbar-brand-logo" />
      </a>
      <a class="navbar-brand-text" href="{base}/">AxelBase</a>
    </div>

    <div style="display: flex; align-items: center; gap: 1.5rem;">
      
      <ul class="d-none d-md-flex" style="list-style: none; display: flex; align-items: center; gap: 1.5rem; margin: 0; padding: 0;">
        <li><a class="nav-link" href="{base}/">Home</a></li>
        <li><a class="nav-link" href="{base}/#about">About</a></li>
        <li><a class="nav-link" href="{base}/#how-to">How to</a></li>
        <li><a class="nav-link" href="{base}/#faq">FAQ</a></li>
        <li><a class="nav-link" href="{base}/blog">Blog</a></li>
      </ul>

      <button 
        class="btn-theme-toggle" 
        on:click={toggleTheme} 
        aria-label="Toggle Dark Mode"
      >
        <i class="bi bi-moon-stars-fill" id="theme-icon"></i>
      </button>

      <div class="bmac-nav-item" use:clickOutside on:click_outside={closeDropdown}>
        <button class="bmac-button" on:click={toggleDropdown}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.35,22.2L12,22A10,10,0,0,1,2,12V10A2,2,0,0,1,4,8H7.2A5.13,5.13,0,0,1,12,3A5.13,5.13,0,0,1,16.8,8H20A2,2,0,0,1,22,10V12A10,10,0,0,1,12.35,22.2M4,10V12A8,8,0,0,0,12,20A8,8,0,0,0,20,12V10H16.8A5.11,5.11,0,0,1,12.5,5.12A5.15,5.15,0,0,1,7.2,10H4Z"/>
          </svg>
          <span class="d-none d-sm-inline">Coffee</span>
        </button>

        {#if isDropdownOpen}
          <div class="bmac-dropdown" transition:fly={{ y: 10, duration: 250 }}>
            {#each donationAmounts as amount}
              <a 
                href="https://paypal.me/{paypalUsername}/{amount}" 
                target="_blank" 
                rel="noopener noreferrer"
                on:click={closeDropdown}
              >
                ${amount}
              </a>
            {/each}
          </div>
        {/if}
      </div>

    </div>
  </nav>
</header>

<slot />

<footer class="custom-footer">
  <div class="container d-flex justify-content-between align-items-center">
    <span class="footer-link">
      © {currentYear} AxelBase CSV Bulk QR Code Generator
    </span>
    <div class="d-flex gap-3">
      <a href="{base}/privacy" class="footer-link">Privacy</a>
      <a href="{base}/terms" class="footer-link">Terms</a>
    </div>
  </div>
</footer>

<style>
  :global(body) { margin: 0; }

  /* Rotate animation for theme icon */
  :global([data-bs-theme="dark"]) #theme-icon {
    transform: rotate(360deg);
  }
  #theme-icon {
    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
</style>
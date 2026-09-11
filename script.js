/* ==========================================================================
   PHOENIX — Next-Gen Cyber Intelligence Platform Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initDemoTabs();
  initModuleFilter();
  initAccessModal();
  initLiveTelemetry();
  initLoginForm();
});

/* 1. Navbar & Mobile Drawer */
function initNavbar() {
  const navbar = document.querySelector('header.navbar');
  const toggle = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      drawer.classList.toggle('active');
    });

    drawer.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('click', () => drawer.classList.remove('active'));
    });
  }
}

/* 2. Interactive Live Demo Recon Panel */
function initDemoTabs() {
  const tabBtns = document.querySelectorAll('.demo-tab-btn');
  const outputPanel = document.getElementById('demoOutput');

  if (!outputPanel || tabBtns.length === 0) return;

  const demoData = {
    ip: `
      <div class="output-row"><span class="output-label">Target IP:</span><span class="output-val cyan">185.220.101.5</span></div>
      <div class="output-row"><span class="output-label">ISP & Network:</span><span class="output-val">M247 Ltd (Tor Exit Node Detected)</span></div>
      <div class="output-row"><span class="output-label">Geolocation:</span><span class="output-val">Frankfurt, Germany (50.1109, 8.6821)</span></div>
      <div class="output-row"><span class="output-label">Risk Level:</span><span class="output-val emerald">High Anonymity / Flagged Node</span></div>
      <div class="output-row"><span class="output-label">Associated Hashes:</span><span class="output-val">14 Breach Records Linked</span></div>
    `,
    cdr: `
      <div class="output-row"><span class="output-label">Target MSISDN:</span><span class="output-val cyan">+91 98765 XXXXX</span></div>
      <div class="output-row"><span class="output-label">Frequent Contacts:</span><span class="output-val">04 High-Volume Node Clusters</span></div>
      <div class="output-row"><span class="output-label">Cell Tower Handoff:</span><span class="output-val">LAC 4012 / Cell ID 8892 (Sector 3)</span></div>
      <div class="output-row"><span class="output-label">Common Location overlap:</span><span class="output-val emerald">Detected (3 Target Devices Co-located)</span></div>
      <div class="output-row"><span class="output-label">Forensic Timestamp:</span><span class="output-val">2026-09-02 16:45:00 UTC</span></div>
    `,
    crypto: `
      <div class="output-row"><span class="output-label">Wallet Address:</span><span class="output-val cyan">0x71C765...d8976F</span></div>
      <div class="output-row"><span class="output-label">Blockchain:</span><span class="output-val">Ethereum / ERC-20 Tokens</span></div>
      <div class="output-row"><span class="output-label">Total Volume:</span><span class="output-val emerald">48.52 ETH ($142,800 USD)</span></div>
      <div class="output-row"><span class="output-label">Exchanges Intersect:</span><span class="output-val">KYC-Flagged Off-Ramp Endpoint</span></div>
      <div class="output-row"><span class="output-label">Risk Rating:</span><span class="output-val">High (Mixer Hop Pattern Detected)</span></div>
    `,
    darkweb: `
      <div class="output-row"><span class="output-label">Search Query:</span><span class="output-val cyan">Target Domain / Email Hash</span></div>
      <div class="output-row"><span class="output-label">Credential Exposures:</span><span class="output-val emerald">03 Leaked Database Dump Matches</span></div>
      <div class="output-row"><span class="output-label">Marketplace Presence:</span><span class="output-val">Breach Forum Index #4092</span></div>
      <div class="output-row"><span class="output-label">First Seen:</span><span class="output-val">2026-04-12 on Darknet Repo</span></div>
      <div class="output-row"><span class="output-label">Action Required:</span><span class="output-val cyan">Issue Alert & Revoke Credentials</span></div>
    `
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetKey = btn.getAttribute('data-tab');
      if (demoData[targetKey]) {
        outputPanel.innerHTML = demoData[targetKey];
      }
    });
  });
}

/* 3. Module Filter */
function initModuleFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const moduleCards = document.querySelectorAll('.module-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      moduleCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* 4. Access Modal */
function initAccessModal() {
  const modal = document.getElementById('accessModal');
  const openBtns = document.querySelectorAll('[data-open-modal]');
  const closeBtns = document.querySelectorAll('[data-close-modal]');
  const form = document.getElementById('modalForm');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.innerHTML = 'Verifying Request...';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert('Access Request Submitted! Our security compliance officer will contact your official email.');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Submit Request';
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }, 1000);
    });
  }
}

/* 5. Telemetry Scanner Simulation */
function initLiveTelemetry() {
  const threatVal = document.getElementById('hudThreats');
  if (!threatVal) return;

  let count = 18420;
  setInterval(() => {
    count += Math.floor(Math.random() * 4) + 1;
    threatVal.textContent = count.toLocaleString();
  }, 3000);
}

/* 6. Officer Login Form Simulation */
function initLoginForm() {
  const loginForm = document.getElementById('loginForm');
  if (!loginForm) return;

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    const officerId = document.getElementById('officerId').value;

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Authenticating Officer Token...';

    setTimeout(() => {
      alert(`Officer Session Authenticated!\nWelcome, ${officerId}. Redirecting to PhoenixIntelligence Threat Matrix Dashboard...`);
      window.location.href = 'index.html';
    }, 1200);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Fetch Navbar
  fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('navbar-placeholder').innerHTML = data;
      
      // Highlight Active Page & Module
      function setActiveLink() {
        let page = window.location.pathname.split('/').pop() || 'index.html';
        let hash = window.location.hash;
        
        document.querySelectorAll('.main-navbar .nav-link, .main-navbar .dropdown-item').forEach(l => l.classList.remove('active'));

        let matched = false;
        
        // Full match with hash (e.g., course.html#ug)
        if (hash) {
          let exactMatch = document.querySelector(`.main-navbar a[href="${page}${hash}"]`);
          if (exactMatch) {
            exactMatch.classList.add('active');
            let parentNavItem = exactMatch.closest('.nav-item');
            if (parentNavItem) {
              let parentNavLink = parentNavItem.querySelector('.nav-link');
              if (parentNavLink) parentNavLink.classList.add('active');
            }
            matched = true;
          }
        }

        // Fallback to page match
        if (!matched) {
          document.querySelectorAll('.main-navbar a').forEach(link => {
            let href = link.getAttribute('href');
            if (!href || href === '#') return;
            let hrefPage = href.split('#')[0];
            if (hrefPage === page) {
              link.classList.add('active');
              let parentNavItem = link.closest('.nav-item');
              if (parentNavItem) {
                let parentNavLink = parentNavItem.querySelector('.nav-link');
                if (parentNavLink) parentNavLink.classList.add('active');
              }
            }
          });
        }
      }

      setActiveLink();
      window.addEventListener('hashchange', setActiveLink);

      // Instant Highlight on click
      document.querySelectorAll('.main-navbar a').forEach(link => {
        link.addEventListener('click', function() {
          if (this.classList.contains('dropdown-toggle')) return;
          document.querySelectorAll('.main-navbar .nav-link, .main-navbar .dropdown-item').forEach(l => l.classList.remove('active'));
          this.classList.add('active');
          let parentNavItem = this.closest('.nav-item');
          if (parentNavItem) {
            let parentNavLink = parentNavItem.querySelector('.nav-link');
            if (parentNavLink) parentNavLink.classList.add('active');
          }
        });
      });
      
      window.dispatchEvent(new Event('scroll'));
    });

  // Fetch Footer
  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer-placeholder').innerHTML = data;
    });

  // Smooth Scroll Support
  document.addEventListener('click', function(e) {
    const a = e.target.closest('a[href^="#"], a[href^="index.html#"], a[href^="about.html#"], a[href^="course.html#"], a[href^="contact.html#"]');
    if (a) {
      const href = a.getAttribute('href');
      const hashIndex = href.indexOf('#');
      if (hashIndex !== -1) {
        const hash = href.substring(hashIndex);
        if (hash === '#') return;
        const target = document.querySelector(hash);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          const nav = document.querySelector('.navbar-collapse');
          if (nav && nav.classList.contains('show') && typeof bootstrap !== 'undefined') {
            bootstrap.Collapse.getInstance(nav)?.hide();
          }
        }
      }
    }
  });
});
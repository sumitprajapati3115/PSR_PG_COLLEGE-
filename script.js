document.addEventListener("DOMContentLoaded", () => {
  // Fetch Navbar
  fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('navbar-placeholder').innerHTML = data;
      
      // Highlight Active Page
      let page = window.location.pathname.split('/').pop() || 'index.html';
      document.querySelectorAll('.main-navbar .nav-link').forEach(l => l.classList.remove('active'));
      document.querySelectorAll('.main-navbar a').forEach(link => {
        let href = link.getAttribute('href');
        if (href && href.startsWith(page)) {
          const navLink = link.closest('.nav-item').querySelector('.nav-link');
          if (navLink) navLink.classList.add('active');
        }
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
// Shared behaviour for the PizzaCraft subpages.
(() => {
  // Reveal cards as they scroll into view.
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Contact form: sends in the background and shows the result in place.
  const form = document.getElementById('contact');
  if (!form) return;
  const status = form.querySelector('.form-status');
  const button = form.querySelector('button[type=submit]');

  form.addEventListener('submit', async event => {
    event.preventDefault();
    button.disabled = true;
    status.className = 'form-status';
    status.textContent = 'Sending…';
    try {
      const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error(response.statusText);
      form.reset();
      status.className = 'form-status ok';
      status.textContent = "Thanks! Your message is on its way. I'll get back to you as soon as I can. 🍕";
    } catch {
      status.className = 'form-status error';
      status.textContent = "Sorry, that didn't go through. Please try again in a moment.";
    } finally {
      button.disabled = false;
    }
  });
})();

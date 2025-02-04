document.addEventListener('DOMContentLoaded', () => {
  // Gestion des onglets
  document.querySelectorAll('.nav-item').forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.dataset.tab;
      showTab(tabId);
    });
  });

  // Dark Mode Toggle
  const darkModeToggle = document.createElement('div');
  darkModeToggle.className = 'dark-mode-toggle';
  document.body.prepend(darkModeToggle);
  
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
});

function showTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
  
  document.getElementById(tabId).classList.add('active');
  document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
}

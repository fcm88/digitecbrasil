// Configurações institucionais da Digitec
const CONFIG = {
  // Substitua pelo número oficial do WhatsApp Business (55 + DDD + Número, apenas dígitos)
  whatsappNumber: '555197741165',
  whatsappDefaultMessage: 'Olá! Vim pelo site digitecbrasil.com.br e gostaria de falar com a Digitec.',
  emailCorporativo: 'contato@digitecbrasil.com.br'
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Atualiza o ano automaticamente no rodapé
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Configura links diretos de WhatsApp e E-mail
  const defaultWaUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappDefaultMessage)}`;
  document.querySelectorAll('[data-whatsapp]').forEach((link) => {
    link.setAttribute('href', defaultWaUrl);
  });

  const emailDisplay = document.getElementById('emailDisplay');
  if (emailDisplay) {
    emailDisplay.textContent = CONFIG.emailCorporativo;
  }

  document.querySelectorAll('[data-email]').forEach((link) => {
    link.setAttribute('href', `mailto:${CONFIG.emailCorporativo}`);
  });

  // 3. Menu Mobile
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((item) => {
      item.addEventListener('click', () => {
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 4. Sombra no cabeçalho ao rolar a página
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 5. Envio do formulário diretamente para o WhatsApp
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const nome = document.getElementById('nome').value.trim();
      const assunto = document.getElementById('assunto').value;
      const mensagem = document.getElementById('mensagem').value.trim();

      const textoFormatado =
        `Olá, equipe Digitec!\n\n` +
        `*Nome/Empresa:* ${nome}\n` +
        `*Assunto:* ${assunto}\n` +
        `*Mensagem:* ${mensagem}`;

      const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(textoFormatado)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  // 6. Animação suave de entrada dos cards ao rolar
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('visible'));
  }
});

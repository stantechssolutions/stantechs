const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (event) => {
    if (!mainNav.contains(event.target) && !navToggle.contains(event.target)) {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.focus();
    }
  });
}

const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');
  if (button) {
    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach((faq) => {
        faq.classList.remove('open');
        faq.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  }
});

const contactForm = document.querySelector('#contactForm');
const formStatus = document.querySelector('.form-status');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = contactForm.querySelector('input[name="name"]').value.trim();
    const email = contactForm.querySelector('input[name="email"]').value.trim();
    const message = contactForm.querySelector('textarea[name="message"]').value.trim();
    const service = contactForm.querySelector('input[name="service"]:checked')?.value || 'Not specified';
    const budget = contactForm.querySelector('input[name="budget"]:checked')?.value || 'Not specified';

    if (!name || !email || !message) {
      formStatus.textContent = 'Please complete the required fields before sending.';
      return;
    }

    const emailAddress = 'stantechssolutions@gmail.com';
    const emailSubject = encodeURIComponent(`Project inquiry from ${name}`);
    const emailBody = encodeURIComponent([
      'Hello STANTECH SOLUTIONS, I would like to discuss a project.',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Service: ${service}`,
      `Budget: ${budget}`,
      `Project details: ${message}`
    ].join('\n'));

    const mailtoLink = `mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`;

    formStatus.textContent = 'Opening your email app with your project brief...';
    window.location.href = mailtoLink;
    contactForm.reset();
  });
}

const serviceModal = document.querySelector('#serviceModal');
const serviceModalTitle = document.querySelector('#serviceModalTitle');
const serviceModalDescription = document.querySelector('#serviceModalDescription');
const serviceModalFeatures = document.querySelector('#serviceModalFeatures');
const serviceTriggers = document.querySelectorAll('[data-service]');

const serviceDetails = {
  website: {
    title: 'Website Development',
    description: 'We build responsive business websites that make your services clear, build trust, and help customers take action.',
    features: ['Business and portfolio websites', 'Mobile-first layouts', 'Domain and hosting setup', 'Search-friendly page structure']
  },
  desktop: {
    title: 'Desktop Systems',
    description: 'Get practical computer solutions for work, school, home, and business, from choosing the right machine to setting it up.',
    features: ['New and used computers', 'Custom system builds', 'Software installation', 'Upgrades and configuration']
  },
  repair: {
    title: 'Computer Repair',
    description: 'We diagnose and fix hardware and software problems so your computer can return to reliable daily service.',
    features: ['Hardware repairs', 'Software troubleshooting', 'Virus and malware removal', 'Data recovery and optimization']
  },
  printer: {
    title: 'Printer Repair & Supplies',
    description: 'Keep your printing working with practical repair, setup, maintenance, and consumable support.',
    features: ['Printer repairs for major brands', 'Ink and toner refilling', 'Paper jam and setup support', 'Print and scan services']
  },
  network: {
    title: 'Network Solutions',
    description: 'We set up stable, usable connectivity for homes and offices, with support when your network needs attention.',
    features: ['Wi-Fi and router setup', 'Network troubleshooting', 'Office cabling and data points', 'Secure connectivity configuration']
  },
  support: {
    title: 'Support & Consultation',
    description: 'Get clear technology guidance and dependable support for your next purchase, setup, repair, or digital project.',
    features: ['IT support and guidance', 'Business technology advice', 'Remote and on-site assistance', 'Long-term maintenance plans']
  }
};

const closeServiceModal = () => {
  if (!serviceModal) return;
  serviceModal.hidden = true;
  document.body.classList.remove('modal-open');
};

serviceTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const detail = serviceDetails[trigger.dataset.service];
    if (!detail || !serviceModal) return;

    serviceModalTitle.textContent = detail.title;
    serviceModalDescription.textContent = detail.description;
    serviceModalFeatures.innerHTML = detail.features.map((feature) => `<li>${feature}</li>`).join('');
    serviceModal.hidden = false;
    document.body.classList.add('modal-open');
    serviceModal.querySelector('.service-modal-close').focus();
  });
});

serviceModal?.querySelectorAll('[data-service-close]').forEach((element) => {
  element.addEventListener('click', closeServiceModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeServiceModal();
});

const serviceOverview = document.querySelector('#service-overview');
const serviceDetailsSection = document.querySelector('#service-details');
const serviceDetailSections = document.querySelectorAll('.service-detail');

if (serviceOverview && serviceDetailsSection && serviceDetailSections.length) {
  const updateServiceView = () => {
    const selectedId = window.location.hash.slice(1);
    const selectedService = document.getElementById(selectedId);
    const hasService = selectedService?.classList.contains('service-detail');

    serviceDetailSections.forEach((service) => {
      service.classList.toggle('is-active', service === selectedService);
      if (service === selectedService) service.classList.add('visible');
    });

    serviceOverview.hidden = hasService;
    serviceDetailsSection.hidden = !hasService;

    if (hasService) {
      selectedService.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  window.addEventListener('hashchange', updateServiceView);
  updateServiceView();
}

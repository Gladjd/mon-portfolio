/**
 * GLAD MOUKOUIRI - PORTFOLIO INTERACTION ENGINE
 * Handles SPA tab routing, modal lightbox, dynamic filtering, audio feedback & theme toggle
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- State & DOM References ---
    const portfolioCard = document.getElementById('portfolioCard');
    const sections = document.querySelectorAll('.page-section');
    const navItems = document.querySelectorAll('.nav-item');
    const dockBtns = document.querySelectorAll('.dock-btn');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const soundToggleBtn = document.getElementById('soundToggleBtn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card-item');
    const projectModal = document.getElementById('projectModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const contactForm = document.getElementById('contactForm');
    const downloadCvBtn = document.getElementById('downloadCvBtn');
    const toastContainer = document.getElementById('toastContainer');

    // Portfolio Database - Real Biomedical Engineering & Project Management Projects
    const projectsData = {
        '1': {
            title: 'Projet ISMEA – Santé de la Mère, de l’Enfant et de l’Adolescent',
            tag: 'BANQUE MONDIALE & MINISTÈRE DE LA SANTÉ',
            subtitle: 'Installation de 242 équipements médicaux techniques dans 30 structures sanitaires',
            desc: 'Pilotage d’un marché d’envergure nationale financé par la Banque Mondiale au titre de l’acquisition et la mise en service d’équipements médicaux techniques pour les Centres de Santé, EPS et Postes de Santé à travers le Sénégal. Coordination de 3 équipes techniques mobiles, logistique, réception, tests de sécurité électrique, mise en service et formation des soignants sur 25 types d’équipements.',
            img: 'assets/project_ismea.jpg',
            client: 'Banque Mondiale & Ministère de la Santé (Sénégal)',
            year: 'Mai - Octobre 2023',
            role: 'Responsable de Projet Biomédical',
            tools: '242 Équipements Médicaux, GMAO, Tableaux de bord de suivi, Protocoles d’essais'
        },
        '2': {
            title: 'Projet ENDEV SANTÉ – 120 Frigos Solaires Hospitaliers',
            tag: 'GIZ SANTÉ & HAIER MEDICAL',
            subtitle: 'Déploiement de chaîne du froid solaire dans 120 localités hospitalières',
            desc: 'Mission d’installation et de mise en service de 120 réfrigérateurs solaires biomédicaux pour la conservation des vaccins et produits thermosensibles dans 120 structures hospitalières réparties sur 3 régions stratégiques du Sénégal (Saint-Louis, Matam et Louga). Représentation officielle du constructeur HAIER au Sénégal pour la GIZ (Coopération Allemande).',
            img: 'assets/project_solarcold.jpg',
            client: 'GIZ (Coopération Allemande) & Haier Medical',
            year: '2023 - 2024',
            role: 'Représentant Technique & Ingénieur Déploiement',
            tools: '120 Frigos Solaires Direct Drive, Chaîne du froid OMS, Contrôle thermique'
        },
        '3': {
            title: 'Systèmes de Microscopie Ophtalmique Leica & Blocs Opératoires',
            tag: 'LEICA MICROSYSTEMS',
            subtitle: 'Habilitation Niveau 1 : installation, calibration, diagnostic et maintenance',
            desc: 'Interventions spécialisées de maintenance préventive et curative, paramétrage optique et mise en service sur les microscopes chirurgicaux d’ophtalmologie de pointe Leica Microsystems (M220 F12, M620 F20, M822/M844 F20/F40, Proveo 8, DIC800, BIOM, lampe à fente et RUV800) en milieu hospitalier et cliniques spécialisées.',
            img: 'assets/project_leica_mic.jpg',
            client: 'Centres Hospitaliers & Cliniques Spécialisées',
            year: '2025 - 2026',
            role: 'Field Service Engineer (Habilité Niveau 1 LEICA)',
            tools: 'Leica Proveo 8, M822/M844, M620, BIOM, Slitlamp, Outils de métrologie optique'
        },
        '4': {
            title: 'Projet REDISSE – Matériels de Diagnostic et Laboratoire',
            tag: 'DIRECTION DES LABORATOIRES',
            subtitle: 'Fourniture, dispatching et mise en service sur 98 sites sanitaires',
            desc: 'Projet de renforcement des capacités des laboratoires de biologie médicale au profit de la Direction des Laboratoires du Sénégal. Coordination technique de 4 équipes d’intervention pour la livraison, l’installation et la vérification de conformité de 358 articles biomédicaux (33 items de diagnostic) dans 98 formations sanitaires du pays.',
            img: 'assets/project_lab_redisse.jpg',
            client: 'Direction des Laboratoires du Sénégal / REDISSE',
            year: '2023 - 2024',
            role: 'Spécialiste Système & Coordinateur Technique',
            tools: '358 Articles Médicaux, Automates de biologie, Centrifugeuses, Étuves, 4 Équipes'
        },
        '5': {
            title: 'Stéthoscope Connecté « Yoka » & Oxymètre IoT Android',
            tag: 'IOT MÉDICAL & SANTÉ CONNECTÉE',
            subtitle: 'Conception, prototypage électronique et traitement de signal sur mobile',
            desc: 'Travaux de recherche appliquée et développement en ingénierie biomédicale : conception et fabrication d’un stéthoscope connecté intelligent « Yoka » dédié à la télé-auscultation et d’un oxymètre de pouls communicant avec une application Android sur-mesure pour le suivi en temps réel de la saturation SpO2 et du rythme cardiaque.',
            img: 'assets/project_smart_steth.jpg',
            client: 'Projets R&D Diplômants (Master UPOA & Licence IPG-ISTI)',
            year: '2016 - 2020',
            role: 'Concepteur & Développeur IoT Médical',
            tools: 'Capteurs piézoélectriques, Bluetooth LE, Android Studio, Traitement du signal'
        },
        '6': {
            title: 'Hôpital ASFADAR & Déploiement GMAO d’Entreprise',
            tag: 'INGÉNIERIE HOSPITALIÈRE & GMAO',
            subtitle: 'Équipement global clé en main et système GMAO d’intervention mobile',
            desc: 'Participation active à l’équipement clé en main du nouvel Hôpital International de Dakar (ASFADAR) : dispatching par étage et spécialité, planning de mise en service et élaboration des plans de maintenance préventive. Déploiement transversal de la solution GMAO de Technologies Services (inventaire dynamique, ticketing, traçabilité des interventions web & mobile).',
            img: 'assets/project_ismea.jpg',
            client: 'Hôpital ASFADAR & Technologies Services',
            year: '2022 - 2024',
            role: 'Technicien Biomédical Projet & Référent GMAO',
            tools: 'Logiciel GMAO Web/Mobile, Barcoding matériel, Process Qualité ISO 9001'
        }
    };

    // --- Sound Effects System (Web Audio API) ---
    let soundEnabled = true;
    let audioCtx = null;

    function playClickSound(freq = 600, type = 'sine', duration = 0.04) {
        if (!soundEnabled) return;
        try {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {
            // Audio context not allowed or failed
        }
    }

    // --- Navigation & Page Switcher ---
    function navigateTo(pageId) {
        const targetSection = document.getElementById(`section-${pageId}`);
        if (!targetSection) return;

        playClickSound(750, 'sine', 0.05);

        // Update active section
        sections.forEach(sec => sec.classList.remove('active'));
        targetSection.classList.add('active');

        // Update card data attribute (controls sidebar display on home vs other pages)
        portfolioCard.setAttribute('data-current-page', pageId);

        // Update sidebar nav active items
        navItems.forEach(btn => {
            if (btn.dataset.target === pageId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update right dock active items
        dockBtns.forEach(btn => {
            if (btn.dataset.target === pageId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Scroll main content to top
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Trigger animations if navigating to about
        if (pageId === 'about') {
            triggerCounters();
        }
    }

    // Initial page setup
    portfolioCard.setAttribute('data-current-page', 'home');

    // Sidebar navigation clicks
    navItems.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            navigateTo(target);
        });
    });

    // Right dock clicks
    dockBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            navigateTo(target);
        });
    });

    // Hero action buttons
    document.querySelectorAll('[data-target]').forEach(btn => {
        if (!btn.classList.contains('nav-item') && !btn.classList.contains('dock-btn')) {
            btn.addEventListener('click', () => {
                navigateTo(btn.dataset.target);
            });
        }
    });

    // --- Number Counter Animation ---
    let countersTriggered = false;
    function triggerCounters() {
        if (countersTriggered) return;
        countersTriggered = true;

        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target, 10);
            const duration = 1200;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out quad formula
                const easeProgress = 1 - (1 - progress) * (1 - progress);
                const currentVal = Math.floor(easeProgress * target);
                counter.textContent = currentVal;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            }
            requestAnimationFrame(updateCounter);
        });
    }

    // --- Portfolio Filter Functionality ---
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            playClickSound(620, 'triangle', 0.04);
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const filter = btn.dataset.filter;

            portfolioCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hide');
                    card.style.animation = 'fadeInSection 0.4s ease forwards';
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // --- Portfolio Modal / Lightbox ---
    function openProjectModal(projectId) {
        const data = projectsData[projectId];
        if (!data) return;

        playClickSound(880, 'sine', 0.06);

        document.getElementById('modalImg').src = data.img;
        document.getElementById('modalImg').alt = data.title;
        document.getElementById('modalTag').textContent = data.tag;
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalDesc').textContent = data.desc;
        document.getElementById('modalClient').textContent = data.client;
        document.getElementById('modalYear').textContent = data.year;
        document.getElementById('modalRole').textContent = data.role;
        document.getElementById('modalTools').textContent = data.tools;

        projectModal.showModal();
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        playClickSound(500, 'sine', 0.04);
        projectModal.close();
        document.body.style.overflow = '';
    }

    portfolioCards.forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.id;
            openProjectModal(id);
        });
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);

    // Close modal on Escape key
    projectModal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
        }
    });

    // --- Contact Form Submission ---
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('formName').value.trim();
            const email = document.getElementById('formEmail').value.trim();
            const subject = document.getElementById('formSubject').value;
            const message = document.getElementById('formMessage').value.trim();

            if (!name || !email || !message) {
                showToast('Veuillez remplir tous les champs obligatoires.', 'warning');
                return;
            }

            const submitBtn = document.getElementById('formSubmitBtn');
            const originalContent = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>ENVOI EN COURS...</span>';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.disabled = false;
                contactForm.reset();
                showToast('Merci ' + name + ' ! Votre message a bien été transmis à Glad MOUKOUIRI.', 'success');
                playClickSound(950, 'sine', 0.1);
            }, 800);
        });
    }

    // --- Download Resume Action ---
    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', () => {
            playClickSound(800, 'sine', 0.08);
            showToast('Ouverture de l’aperçu d’impression / téléchargement du CV de Glad MOUKOUIRI...', 'info');
            
            setTimeout(() => {
                window.print();
            }, 600);
        });
    }

    // --- Toast Notification Helper ---
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = 'toast';
        
        let icon = 'fa-circle-info';
        if (type === 'success') icon = 'fa-circle-check';
        if (type === 'warning') icon = 'fa-triangle-exclamation';

        toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // --- Dark / Light Theme Toggle ---
    const savedTheme = localStorage.getItem('glad_portfolio_theme') || 'light';
    setTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        playClickSound(650, 'triangle', 0.05);
    });

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('glad_portfolio_theme', theme);
        const icon = themeToggleBtn.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fa-solid fa-sun';
            themeToggleBtn.title = 'Passer en mode clair';
        } else {
            icon.className = 'fa-solid fa-moon';
            themeToggleBtn.title = 'Passer en mode sombre';
        }
    }

    // --- Sound Effects Toggle ---
    soundToggleBtn.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        const icon = soundToggleBtn.querySelector('i');
        if (soundEnabled) {
            icon.className = 'fa-solid fa-volume-high';
            soundToggleBtn.title = 'Désactiver les effets sonores';
            showToast('Effets sonores activés', 'info');
            playClickSound(800, 'sine', 0.05);
        } else {
            icon.className = 'fa-solid fa-volume-xmark';
            soundToggleBtn.title = 'Activer les effets sonores';
            showToast('Effets sonores désactivés', 'info');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const cardSidebar = document.getElementById('cardSidebar');

    if (mobileMenuToggle && cardSidebar) {
        mobileMenuToggle.addEventListener('click', () => {
            cardSidebar.classList.toggle('mobile-open');
            const isOpen = cardSidebar.classList.contains('mobile-open');
            mobileMenuToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
            playClickSound(600, 'sine', 0.04);
        });

        // Close mobile menu when a nav item is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (cardSidebar.classList.contains('mobile-open')) {
                    cardSidebar.classList.remove('mobile-open');
                    mobileMenuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
                }
            });
        });
    }
});

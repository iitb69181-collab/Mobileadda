// ============================================================================
// MOBILE ADDA - JAVASCRIPT
// Modern, Interactive, Responsive Website
// ============================================================================

// ============================================================================
// MOBILE MENU TOGGLE
// ============================================================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    updateHamburgerIcon();
});

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        updateHamburgerIcon();
    });
});

// Update hamburger icon
function updateHamburgerIcon() {
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navMenu.classList.remove('active');
        updateHamburgerIcon();
    }
});

// ============================================================================
// SMOOTH SCROLLING
// ============================================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================================================
// SCROLL TO TOP BUTTON
// ============================================================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================================================
// ANIMATED COUNTERS
// ============================================================================
const counters = document.querySelectorAll('.stat-number');
let counterStarted = false;

function startCounters() {
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 50); // Update every 50ms
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                setTimeout(updateCounter, 50);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// Start counters when page loads or when hero section is in view
function initCounters() {
    if (counterStarted) return;
    counterStarted = true;
    startCounters();
}

// Check if hero stats are visible on load
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initCounters();
                observer.disconnect(); // Stop observing once started
            }
        });
    }, observerOptions);

    observer.observe(heroStats);

    // Also start after a short delay in case it's already visible
    setTimeout(() => {
        const rect = heroStats.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            initCounters();
        }
    }, 500);
}

// ============================================================================
// FAQ ACCORDION
// ============================================================================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const isActive = faqItem.classList.contains('active');
        console.log('FAQ clicked, isActive:', isActive);

        // Close all other items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ============================================================================
// BOOKING FORM SUBMISSION
// ============================================================================
const bookingForm = document.getElementById('bookingForm');

// Device models by brand
const deviceModels = {
    'iPhone': [
        'iPhone 4', 'iPhone 4s', 'iPhone 5', 'iPhone 5c', 'iPhone 5s',
        'iPhone 6', 'iPhone 6 Plus', 'iPhone 6s', 'iPhone 6s Plus',
        'iPhone SE (1st gen)', 'iPhone 7', 'iPhone 7 Plus',
        'iPhone 8', 'iPhone 8 Plus', 'iPhone X', 'iPhone XR',
        'iPhone XS', 'iPhone XS Max', 'iPhone 11', 'iPhone 11 Pro',
        'iPhone 11 Pro Max', 'iPhone SE (2nd gen)', 'iPhone 12 mini',
        'iPhone 12', 'iPhone 12 Pro', 'iPhone 12 Pro Max',
        'iPhone 13 mini', 'iPhone 13', 'iPhone 13 Pro', 'iPhone 13 Pro Max',
        'iPhone SE (3rd gen)', 'iPhone 14', 'iPhone 14 Plus',
        'iPhone 14 Pro', 'iPhone 14 Pro Max', 'iPhone 15', 'iPhone 15 Plus',
        'iPhone 15 Pro', 'iPhone 15 Pro Max', 'iPhone 16', 'iPhone 16 Plus',
        'iPhone 16 Pro', 'iPhone 16 Pro Max', 'Other'
    ],
    'Samsung': [
        // Galaxy S series
        'Galaxy S', 'Galaxy S II', 'Galaxy S III', 'Galaxy S4', 'Galaxy S5',
        'Galaxy S6', 'Galaxy S6 Edge', 'Galaxy S6 Edge+',
        'Galaxy S7', 'Galaxy S7 Edge', 'Galaxy S8', 'Galaxy S8+',
        'Galaxy S9', 'Galaxy S9+', 'Galaxy S10e', 'Galaxy S10',
        'Galaxy S10+', 'Galaxy S10 5G', 'Galaxy S20', 'Galaxy S20+',
        'Galaxy S20 Ultra', 'Galaxy S21', 'Galaxy S21+', 'Galaxy S21 Ultra',
        'Galaxy S22', 'Galaxy S22+', 'Galaxy S22 Ultra',
        'Galaxy S23', 'Galaxy S23+', 'Galaxy S23 Ultra',
        'Galaxy S24', 'Galaxy S24+', 'Galaxy S24 Ultra',
        // Galaxy Note series
        'Galaxy Note', 'Galaxy Note II', 'Galaxy Note 3', 'Galaxy Note 4',
        'Galaxy Note 5', 'Galaxy Note 7', 'Galaxy Note 8', 'Galaxy Note 9',
        'Galaxy Note 10', 'Galaxy Note 10+', 'Galaxy Note 20', 'Galaxy Note 20 Ultra',
        // Galaxy A series
        'Galaxy A3', 'Galaxy A5', 'Galaxy A7', 'Galaxy A10', 'Galaxy A10s',
        'Galaxy A11', 'Galaxy A12', 'Galaxy A13', 'Galaxy A14', 'Galaxy A15',
        'Galaxy A20', 'Galaxy A20s', 'Galaxy A21', 'Galaxy A21s', 'Galaxy A22',
        'Galaxy A23', 'Galaxy A24', 'Galaxy A25', 'Galaxy A30', 'Galaxy A30s',
        'Galaxy A31', 'Galaxy A32', 'Galaxy A33', 'Galaxy A34', 'Galaxy A35',
        'Galaxy A40', 'Galaxy A41', 'Galaxy A42', 'Galaxy A50', 'Galaxy A50s',
        'Galaxy A51', 'Galaxy A52', 'Galaxy A52s', 'Galaxy A53', 'Galaxy A54',
        'Galaxy A55', 'Galaxy A70', 'Galaxy A71', 'Galaxy A72', 'Galaxy A73',
        'Galaxy A80', 'Galaxy A90',
        // Galaxy M series
        'Galaxy M01', 'Galaxy M02', 'Galaxy M10', 'Galaxy M11', 'Galaxy M12',
        'Galaxy M13', 'Galaxy M14', 'Galaxy M15', 'Galaxy M20', 'Galaxy M21',
        'Galaxy M22', 'Galaxy M23', 'Galaxy M30', 'Galaxy M31', 'Galaxy M32',
        'Galaxy M33', 'Galaxy M34', 'Galaxy M35', 'Galaxy M40', 'Galaxy M42',
        'Galaxy M51', 'Galaxy M52', 'Galaxy M53', 'Galaxy M54', 'Galaxy M55',
        // Galaxy Z series (Fold/Flip)
        'Galaxy Fold', 'Galaxy Z Fold2', 'Galaxy Z Fold3', 'Galaxy Z Fold4',
        'Galaxy Z Fold5', 'Galaxy Z Fold6', 'Galaxy Z Flip', 'Galaxy Z Flip3',
        'Galaxy Z Flip4', 'Galaxy Z Flip5', 'Galaxy Z Flip6',
        // Other
        'Other'
    ],
    'OnePlus': [
        'OnePlus 1', 'OnePlus 2', 'OnePlus X', 'OnePlus 3', 'OnePlus 3T',
        'OnePlus 5', 'OnePlus 5T', 'OnePlus 6', 'OnePlus 6T',
        'OnePlus 7', 'OnePlus 7 Pro', 'OnePlus 7T', 'OnePlus 7T Pro',
        'OnePlus 8', 'OnePlus 8 Pro', 'OnePlus 8T',
        'OnePlus 9', 'OnePlus 9 Pro', 'OnePlus 9R', 'OnePlus 9RT',
        'OnePlus 10 Pro', 'OnePlus 10R', 'OnePlus 10T',
        'OnePlus 11', 'OnePlus 11R',
        'OnePlus 12', 'OnePlus 12R',
        'OnePlus Nord', 'OnePlus Nord 2', 'OnePlus Nord 2T', 'OnePlus Nord 3',
        'OnePlus Nord CE', 'OnePlus Nord CE 2', 'OnePlus Nord CE 3',
        'Other'
    ],
    'Redmi': [
        'Redmi Note 12', 'Redmi Note 12 Pro', 'Redmi Note 12 Pro+',
        'Redmi 1', 'Redmi 1S', 'Redmi 2', 'Redmi 2 Prime', 'Redmi 3',
        'Redmi 3S', 'Redmi 4', 'Redmi 4A', 'Redmi 5', 'Redmi 5A',
        'Redmi 6', 'Redmi 6A', 'Redmi 7', 'Redmi 7A',
        'Redmi 8', 'Redmi 8A', 'Redmi 9', 'Redmi 9A', 'Redmi 9C',
        'Redmi 10', 'Redmi 10A', 'Redmi 10C', 'Redmi 11', 'Redmi 12C',
        'Redmi 13C', 'Redmi 14C',
        'Redmi Note 3', 'Redmi Note 4', 'Redmi Note 5', 'Redmi Note 5 Pro',
        'Redmi Note 6 Pro', 'Redmi Note 7', 'Redmi Note 7 Pro',
        'Redmi Note 8', 'Redmi Note 8 Pro', 'Redmi Note 9', 'Redmi Note 9 Pro',
        'Redmi Note 9 Pro Max', 'Redmi Note 10', 'Redmi Note 10 Pro',
        'Redmi Note 10 Pro Max', 'Redmi Note 11', 'Redmi Note 11 Pro',
        'Redmi Note 11 Pro+', 'Redmi Note 12', 'Redmi Note 12 Pro',
        'Redmi Note 12 Pro+', 'Redmi Note 13', 'Redmi Note 13 Pro',
        'Redmi Note 13 Pro+', 'Redmi Note 14', 'Redmi Note 14 Pro',
        'Redmi K20', 'Redmi K20 Pro', 'Redmi K30', 'Redmi K30 Pro',
        'Redmi K40', 'Redmi K40 Pro', 'Redmi K50', 'Redmi K50 Pro',
        'Redmi K60', 'Redmi K60 Pro', 'Redmi K70', 'Redmi K70 Pro',
        'Other'
    ],
    'Realme': [
        'Realme 11 Pro', 'Realme 11 Pro+', 'Realme 11',
        'Realme 10', 'Realme 10 Pro', 'Realme 10 Pro+',
        'Realme 9', 'Realme 9 Pro', 'Realme 9 Pro+',
        'Realme Narzo 60', 'Realme Narzo 50', 'Realme Narzo 50A',
        'Realme 1', 'Realme 2', 'Realme 2 Pro', 'Realme 3', 'Realme 3 Pro',
        'Realme 5', 'Realme 5 Pro', 'Realme 5i', 'Realme 6', 'Realme 6 Pro',
        'Realme 6i', 'Realme 7', 'Realme 7 Pro', 'Realme 8', 'Realme 8 Pro',
        'Realme 8i', 'Realme 9', 'Realme 9 Pro', 'Realme 9 Pro+',
        'Realme 10', 'Realme 10 Pro', 'Realme 10 Pro+',
        'Realme 11', 'Realme 11 Pro', 'Realme 11 Pro+',
        'Realme 12', 'Realme 12 Pro', 'Realme 12 Pro+',
        'Realme 13', 'Realme 13 Pro', 'Realme 13 Pro+',
        'Realme C1', 'Realme C2', 'Realme C3', 'Realme C11', 'Realme C12',
        'Realme C15', 'Realme C17', 'Realme C20', 'Realme C21', 'Realme C25',
        'Realme C30', 'Realme C31', 'Realme C33', 'Realme C35',
        'Realme GT', 'Realme GT Neo', 'Realme GT Neo 2', 'Realme GT 2',
        'Realme GT 2 Pro', 'Realme GT 3', 'Realme GT 5',
        'Other'
    ],
    'Oppo': [
        'Oppo Reno 10', 'Oppo Reno 10 Pro', 'Oppo Reno 10 Pro+',
        'Oppo A98', 'Oppo A78', 'Oppo A58',
        'Oppo F23', 'Oppo F21 Pro', 'Oppo Find X6 Pro',
        'Oppo A1', 'Oppo A1k', 'Oppo A3', 'Oppo A5', 'Oppo A5s',
        'Oppo A7', 'Oppo A9', 'Oppo A11', 'Oppo A12', 'Oppo A15',
        'Oppo A16', 'Oppo A17', 'Oppo A18', 'Oppo A31', 'Oppo A32',
        'Oppo A33', 'Oppo A35', 'Oppo A36', 'Oppo A37', 'Oppo A38',
        'Oppo A52', 'Oppo A53', 'Oppo A54', 'Oppo A55', 'Oppo A56',
        'Oppo A57', 'Oppo A58', 'Oppo A59', 'Oppo A60', 'Oppo A72',
        'Oppo A73', 'Oppo A74', 'Oppo A76', 'Oppo A77', 'Oppo A78',
        'Oppo A79', 'Oppo A80', 'Oppo A83', 'Oppo A91',
        'Oppo F1', 'Oppo F1s', 'Oppo F3', 'Oppo F3 Plus', 'Oppo F5',
        'Oppo F7', 'Oppo F9', 'Oppo F11', 'Oppo F11 Pro', 'Oppo F15',
        'Oppo F17', 'Oppo F19', 'Oppo F21', 'Oppo F23', 'Oppo F25',
        'Oppo Find 5', 'Oppo Find 7', 'Oppo Find X', 'Oppo Find X2',
        'Oppo Find X2 Pro', 'Oppo Find X3', 'Oppo Find X3 Pro',
        'Oppo Find X5', 'Oppo Find X5 Pro', 'Oppo Find X6', 'Oppo Find X6 Pro',
        'Oppo Find X7', 'Oppo Find X7 Ultra',
        'Oppo Reno', 'Oppo Reno 2', 'Oppo Reno 3', 'Oppo Reno 4', 'Oppo Reno 5',
        'Oppo Reno 5 Pro', 'Oppo Reno 6', 'Oppo Reno 6 Pro', 'Oppo Reno 7',
        'Oppo Reno 7 Pro', 'Oppo Reno 8', 'Oppo Reno 8 Pro', 'Oppo Reno 9',
        'Oppo Reno 10', 'Oppo Reno 11', 'Oppo Reno 12',
        'Other'
    ],
    'Vivo': [
        'Vivo V29', 'Vivo V29 Pro', 'Vivo V27',
        'Vivo Y100', 'Vivo Y78', 'Vivo Y36',
        'Vivo S17', 'Vivo S1',
        'Vivo Y1', 'Vivo Y1s', 'Vivo Y3', 'Vivo Y5', 'Vivo Y11', 'Vivo Y12',
        'Vivo Y15', 'Vivo Y17', 'Vivo Y19', 'Vivo Y20', 'Vivo Y20i', 'Vivo Y20s',
        'Vivo Y21', 'Vivo Y21e', 'Vivo Y22', 'Vivo Y23', 'Vivo Y27', 'Vivo Y28',
        'Vivo Y30', 'Vivo Y31', 'Vivo Y33', 'Vivo Y35', 'Vivo Y36', 'Vivo Y37',
        'Vivo Y50', 'Vivo Y51', 'Vivo Y53', 'Vivo Y55', 'Vivo Y56',
        'Vivo Y70', 'Vivo Y71', 'Vivo Y72', 'Vivo Y73', 'Vivo Y75',
        'Vivo Y90', 'Vivo Y91', 'Vivo Y93', 'Vivo Y95', 'Vivo Y100',
        'Vivo V1', 'Vivo V3', 'Vivo V5', 'Vivo V7', 'Vivo V9', 'Vivo V11',
        'Vivo V15', 'Vivo V15 Pro', 'Vivo V17', 'Vivo V19', 'Vivo V20',
        'Vivo V21', 'Vivo V23', 'Vivo V25', 'Vivo V27', 'Vivo V29', 'Vivo V30',
        'Vivo X1', 'Vivo X3', 'Vivo X5', 'Vivo X6', 'Vivo X7', 'Vivo X9',
        'Vivo X20', 'Vivo X21', 'Vivo X23', 'Vivo X27', 'Vivo X30', 'Vivo X50',
        'Vivo X50 Pro', 'Vivo X60', 'Vivo X60 Pro', 'Vivo X70', 'Vivo X70 Pro',
        'Vivo X80', 'Vivo X80 Pro', 'Vivo X90', 'Vivo X90 Pro', 'Vivo X100',
        'Vivo X100 Pro',
        'Vivo T1', 'Vivo T2', 'Vivo T3',
        'Other'
    ],
    'Google Pixel': [
        'Pixel 8', 'Pixel 8 Pro',
        'Pixel 7', 'Pixel 7 Pro', 'Pixel 7a',
        'Pixel 6', 'Pixel 6 Pro', 'Pixel 6a',
        'Pixel 5', 'Pixel 5a', 'Pixel 4a',
        'Google Pixel', 'Google Pixel XL', 'Google Pixel 2', 'Google Pixel 2 XL',
        'Google Pixel 3', 'Google Pixel 3 XL', 'Google Pixel 3a', 'Google Pixel 3a XL',
        'Google Pixel 4', 'Google Pixel 4 XL', 'Google Pixel 4a', 'Google Pixel 4a 5G',
        'Google Pixel 5', 'Google Pixel 5a',
        'Google Pixel 6', 'Google Pixel 6 Pro', 'Google Pixel 6a',
        'Google Pixel 7', 'Google Pixel 7 Pro', 'Google Pixel 7a',
        'Google Pixel 8', 'Google Pixel 8 Pro', 'Google Pixel 8a',
        'Google Pixel 9', 'Google Pixel 9 Pro', 'Google Pixel 9 Pro XL',
        'Google Pixel Fold',
        'Other'
    ],
       'Motorola': [
        'Moto E', 'Moto E2', 'Moto E3', 'Moto E4', 'Moto E5', 'Moto E6', 'Moto E7',
        'Moto G (1st gen)', 'Moto G (2nd gen)', 'Moto G (3rd gen)', 'Moto G4',
        'Moto G4 Plus', 'Moto G5', 'Moto G5 Plus', 'Moto G6', 'Moto G6 Plus',
        'Moto G7', 'Moto G7 Plus', 'Moto G8', 'Moto G8 Plus', 'Moto G9',
        'Moto G9 Plus', 'Moto G10', 'Moto G10 Power', 'Moto G20', 'Moto G30',
        'Moto G31', 'Moto G32', 'Moto G40 Fusion', 'Moto G41', 'Moto G42',
        'Moto G50', 'Moto G51', 'Moto G52', 'Moto G53', 'Moto G54', 'Moto G55',
        'Moto G60', 'Moto G62', 'Moto G71', 'Moto G72', 'Moto G73', 'Moto G84',
        'Moto Edge', 'Moto Edge+', 'Moto Edge 20', 'Moto Edge 20 Pro',
        'Moto Edge 30', 'Moto Edge 30 Pro', 'Moto Edge 40', 'Moto Edge 50',
        'Moto Razr (2019)', 'Moto Razr 5G', 'Moto Razr 40', 'Moto Razr 50',
        'Other'
    ],
    'Xiaomi': [
        'Mi 1', 'Mi 2', 'Mi 2A', 'Mi 3', 'Mi 4', 'Mi 4i', 'Mi 4c', 'Mi 5', 'Mi 5s', 'Mi 5s Plus',
        'Mi 6', 'Mi 6x', 'Mi 8', 'Mi 8 Lite', 'Mi 8 Pro', 'Mi 8 Explorer', 'Mi 9', 'Mi 9 SE',
        'Mi 9T', 'Mi 9T Pro', 'Mi 10', 'Mi 10 Pro', 'Mi 10T', 'Mi 10T Pro', 'Mi 10 Lite',
        'Mi 11', 'Mi 11 Lite', 'Mi 11 Pro', 'Mi 11 Ultra', 'Mi 11X', 'Mi 11X Pro',
        'Mi 12', 'Mi 12 Pro', 'Mi 12 Ultra', 'Mi 12X', 'Mi 13', 'Mi 13 Pro', 'Mi 13 Ultra',
        'Mi 14', 'Mi 14 Pro', 'Mi 14 Ultra', 'Mi 15', 'Mi 15 Pro',
        'Mi A1', 'Mi A2', 'Mi A3', 'Mi Mix', 'Mi Mix 2', 'Mi Mix 2S', 'Mi Mix 3', 'Mi Mix 4',
        'Mi Mix Fold', 'Mi Max', 'Mi Max 2', 'Mi Max 3', 'Mi Note', 'Mi Note 2', 'Mi Note 3',
        'Mi Note 10', 'Mi Note 10 Pro', 'Other'
    ],
    'Poco': [
        'Poco F1', 'Poco F2 Pro', 'Poco F3', 'Poco F4', 'Poco F5', 'Poco F6',
        'Poco X2', 'Poco X3', 'Poco X3 Pro', 'Poco X4', 'Poco X5', 'Poco X6',
        'Poco M2', 'Poco M2 Pro', 'Poco M3', 'Poco M4', 'Poco M5', 'Poco M6',
        'Poco C3', 'Poco C31', 'Poco C40', 'Poco C50', 'Poco C55', 'Poco C65',
        'Other'
    ],
      'Nokia': [
        'Nokia 1', 'Nokia 1.3', 'Nokia 1.4', 'Nokia 2', 'Nokia 2.1', 'Nokia 2.2', 'Nokia 2.3', 'Nokia 2.4',
        'Nokia 3', 'Nokia 3.1', 'Nokia 3.2', 'Nokia 3.4', 'Nokia 4.2', 'Nokia 5', 'Nokia 5.1', 'Nokia 5.3', 'Nokia 5.4',
        'Nokia 6', 'Nokia 6.1', 'Nokia 6.2', 'Nokia 7.1', 'Nokia 7.2', 'Nokia 8', 'Nokia 8.1', 'Nokia 8.3 5G',
        'Nokia 9 PureView', 'Nokia C01', 'Nokia C02', 'Nokia C1', 'Nokia C2', 'Nokia C3', 'Nokia C10', 'Nokia C20',
        'Nokia C21', 'Nokia C22', 'Nokia C30', 'Nokia C31', 'Nokia C32', 'Nokia G10', 'Nokia G11', 'Nokia G20',
        'Nokia G21', 'Nokia G22', 'Nokia G42', 'Nokia X10', 'Nokia X20', 'Nokia X30', 'Nokia XR20', 'Nokia XR21',
        'Other'
    ],
     'Sony': [
        'Xperia Z', 'Xperia Z1', 'Xperia Z2', 'Xperia Z3', 'Xperia Z3+', 'Xperia Z5', 'Xperia Z5 Premium',
        'Xperia X', 'Xperia XA', 'Xperia XA1', 'Xperia XA2', 'Xperia XZ', 'Xperia XZ1', 'Xperia XZ2', 'Xperia XZ3',
        'Xperia XZ Premium', 'Xperia 1', 'Xperia 1 II', 'Xperia 1 III', 'Xperia 1 IV', 'Xperia 1 V',
        'Xperia 5', 'Xperia 5 II', 'Xperia 5 III', 'Xperia 5 IV', 'Xperia 5 V',
        'Xperia 10', 'Xperia 10 II', 'Xperia 10 III', 'Xperia 10 IV', 'Xperia 10 V',
        'Xperia Pro', 'Xperia Pro-I', 'Other'
    ],
    'LG': [
        'LG G2', 'LG G3', 'LG G4', 'LG G5', 'LG G6', 'LG G7', 'LG G8', 'LG G8X',
        'LG V10', 'LG V20', 'LG V30', 'LG V40', 'LG V50', 'LG V60',
        'LG K10', 'LG K20', 'LG K30', 'LG K40', 'LG K50', 'LG K51', 'LG K61',
        'LG Q6', 'LG Q7', 'LG Q8', 'LG Q60', 'LG Q70', 'LG Q92',
        'LG Wing', 'LG Velvet', 'Other'
    ],
    'Asus': [
        'Zenfone 2', 'Zenfone 3', 'Zenfone 4', 'Zenfone 5', 'Zenfone 6', 'Zenfone 7',
        'Zenfone 8', 'Zenfone 9', 'Zenfone 10', 'Zenfone 11 Ultra',
        'Zenfone Max', 'Zenfone Max Pro M1', 'Zenfone Max Pro M2',
        'ROG Phone', 'ROG Phone 2', 'ROG Phone 3', 'ROG Phone 5', 'ROG Phone 6', 'ROG Phone 7', 'ROG Phone 8',
        'Other'
    ],
     'Honor': [
        'Honor 8', 'Honor 9', 'Honor 10', 'Honor 20', 'Honor 30', 'Honor 50', 'Honor 70', 'Honor 90',
        'Honor 8X', 'Honor 9X', 'Honor 10X', 'Honor 20X', 'Honor X8', 'Honor X9',
        'Honor Play', 'Honor Play 3', 'Honor Play 4', 'Honor Play 5',
        'Honor Magic', 'Honor Magic 2', 'Honor Magic 3', 'Honor Magic 4', 'Honor Magic 5', 'Honor Magic 6',
        'Other'
    ],
     'Tecno': [
        'Tecno Spark', 'Tecno Spark 2', 'Tecno Spark 3', 'Tecno Spark 4', 'Tecno Spark 5', 'Tecno Spark 6',
        'Tecno Spark 7', 'Tecno Spark 8', 'Tecno Spark 9', 'Tecno Spark 10', 'Tecno Spark 20',
        'Tecno Camon', 'Tecno Camon 11', 'Tecno Camon 12', 'Tecno Camon 15', 'Tecno Camon 16',
        'Tecno Camon 17', 'Tecno Camon 18', 'Tecno Camon 19', 'Tecno Camon 20',
        'Tecno Pova', 'Tecno Pova 2', 'Tecno Pova 3', 'Tecno Pova 4', 'Tecno Pova 5',
        'Other'
    ],
    'Infinix': [
        'Infinix Hot', 'Infinix Hot 2', 'Infinix Hot 3', 'Infinix Hot 4', 'Infinix Hot 5',
        'Infinix Hot 6', 'Infinix Hot 7', 'Infinix Hot 8', 'Infinix Hot 9', 'Infinix Hot 10',
        'Infinix Hot 11', 'Infinix Hot 12', 'Infinix Hot 20', 'Infinix Hot 30', 'Infinix Hot 40',
        'Infinix Note', 'Infinix Note 2', 'Infinix Note 3', 'Infinix Note 4', 'Infinix Note 5',
        'Infinix Note 6', 'Infinix Note 7', 'Infinix Note 8', 'Infinix Note 10', 'Infinix Note 11',
        'Infinix Note 12', 'Infinix Note 30', 'Infinix Note 40',
        'Infinix Zero', 'Infinix Zero 2', 'Infinix Zero 3', 'Infinix Zero 4', 'Infinix Zero 5',
        'Infinix Zero 6', 'Infinix Zero 8', 'Infinix Zero 20', 'Infinix Zero 30',
        'Other'
    ],
    'Itel': [
        'Itel A11', 'Itel A12', 'Itel A13', 'Itel A14', 'Itel A15', 'Itel A16',
        'Itel A22', 'Itel A23', 'Itel A24', 'Itel A25', 'Itel A26', 'Itel A27',
        'Itel A32', 'Itel A33', 'Itel A34', 'Itel A35', 'Itel A36', 'Itel A37',
        'Itel A42', 'Itel A43', 'Itel A44', 'Itel A45', 'Itel A46', 'Itel A47',
        'Itel A48', 'Itel A49', 'Itel A50', 'Itel A60', 'Itel A70',
        'Itel P11', 'Itel P12', 'Itel P13', 'Itel P14', 'Itel P15', 'Itel P16',
        'Itel P32', 'Itel P33', 'Itel P34', 'Itel P35', 'Itel P36', 'Itel P37',
        'Itel P38', 'Itel P40', 'Itel P55',
        'Other'
    ],
     'Lava': [
        'Lava A3', 'Lava A5', 'Lava A7', 'Lava A9', 'Lava A10', 'Lava A12',
        'Lava A32', 'Lava A33', 'Lava A34', 'Lava A35', 'Lava A37', 'Lava A40',
        'Lava A46', 'Lava A47', 'Lava A48', 'Lava A50', 'Lava A51', 'Lava A52',
        'Lava A55', 'Lava A56', 'Lava A57', 'Lava A59', 'Lava A60', 'Lava A62',
        'Lava A66', 'Lava A68', 'Lava A69', 'Lava A70', 'Lava A71', 'Lava A72',
        'Lava A76', 'Lava A77', 'Lava A78', 'Lava A79', 'Lava A80', 'Lava A82',
        'Lava A83', 'Lava A84', 'Lava A86', 'Lava A87', 'Lava A88', 'Lava A89',
        'Lava A90', 'Lava A92', 'Lava A93', 'Lava A94', 'Lava A95', 'Lava A96',
        'Lava A97', 'Lava A98', 'Lava A99',
        'Lava Z2', 'Lava Z3', 'Lava Z4', 'Lava Z5', 'Lava Z6', 'Lava Z7',
        'Lava Z8', 'Lava Z9', 'Lava Z10', 'Lava Z11', 'Lava Z12',
        'Lava Iris', 'Lava Iris 2', 'Lava Iris 3', 'Lava Iris 4', 'Lava Iris 5',
        'Lava Iris 6', 'Lava Iris 7', 'Lava Iris 8', 'Lava Iris 9', 'Lava Iris 10',
        'Other'
    ],
    'Micromax': [
        'Micromax A1', 'Micromax A2', 'Micromax A3', 'Micromax A4', 'Micromax A5',
        'Micromax A6', 'Micromax A7', 'Micromax A8', 'Micromax A9', 'Micromax A10',
        'Micromax Canvas 2', 'Micromax Canvas 3', 'Micromax Canvas 4', 'Micromax Canvas 5',
        'Micromax Canvas 6', 'Micromax Canvas 7', 'Micromax Canvas 8', 'Micromax Canvas 9',
        'Micromax Canvas 10', 'Micromax Canvas 11', 'Micromax Canvas 12',
        'Micromax Canvas Doodle', 'Micromax Canvas Knight', 'Micromax Canvas Selfie',
        'Micromax IN Note 1', 'Micromax IN Note 2', 'Micromax IN 1', 'Micromax IN 2',
        'Micromax Bolt', 'Micromax Unite', 'Micromax Yu', 'Micromax Yu Yureka', 'Micromax Yu Yutopia',
        'Other'
    ],
    'Huawei': [
        'Huawei P8', 'Huawei P9', 'Huawei P10', 'Huawei P20', 'Huawei P30', 'Huawei P40', 'Huawei P50',
        'Huawei P60', 'Huawei Mate 8', 'Huawei Mate 9', 'Huawei Mate 10', 'Huawei Mate 20', 'Huawei Mate 30',
        'Huawei Mate 40', 'Huawei Mate 50', 'Huawei Mate 60',
        'Huawei Nova', 'Huawei Nova 2', 'Huawei Nova 3', 'Huawei Nova 4', 'Huawei Nova 5', 'Huawei Nova 6',
        'Huawei Nova 7', 'Huawei Nova 8', 'Huawei Nova 9', 'Huawei Nova 10', 'Huawei Nova 11', 'Huawei Nova 12',
        'Huawei Y3', 'Huawei Y5', 'Huawei Y6', 'Huawei Y7', 'Huawei Y8', 'Huawei Y9',
        'Other'
    ],
    'Cat': [
        'Cat B15', 'Cat B25', 'Cat B30', 'Cat B35', 'Cat B40', 'Cat B50', 'Cat B55',
        'Cat S22 Flip', 'Cat S30', 'Cat S31', 'Cat S41', 'Cat S42', 'Cat S48c', 'Cat S52',
        'Cat S60', 'Cat S61', 'Cat S62', 'Cat S62 Pro', 'Cat S75', 'Other'
    ],
    'Blackview': [
        'Blackview A5', 'Blackview A7', 'Blackview A8', 'Blackview A9', 'Blackview A10',
        'Blackview A20', 'Blackview A30', 'Blackview A50', 'Blackview A60', 'Blackview A70',
        'Blackview A80', 'Blackview A90', 'Blackview A95', 'Blackview A100',
        'Blackview BL5000', 'Blackview BL6000', 'Blackview BL8800',
        'Blackview BV Series: BV5000, BV5500, BV6000, BV6800, BV7000, BV8000, BV9000, BV9500, BV9600, BV9700, BV9800, BV9900, BV6600, BV7100, BV9100',
        'Blackview Oscal', 'Other'
    ],
    'Ulefone': [
        'Ulefone Armor 2', 'Armor 3', 'Armor 3T', 'Armor 3W', 'Armor 5', 'Armor 6', 'Armor 6E',
        'Armor 7', 'Armor 8', 'Armor 9', 'Armor 10', 'Armor 11', 'Armor 12', 'Armor 13', 'Armor 14',
        'Armor 15', 'Armor 16', 'Armor 17', 'Armor 18', 'Armor 19', 'Armor 20', 'Armor 21',
        'Ulefone Note 6', 'Note 7', 'Note 8', 'Note 9', 'Note 10', 'Note 11', 'Note 12', 'Note 13',
        'Other'
    ],
    'Oukitel': [
        'Oukitel C1', 'C2', 'C3', 'C4', 'C5', 'C8', 'C9', 'C10', 'C11', 'C12', 'C15', 'C16', 'C17',
        'Oukitel K1', 'K2', 'K3', 'K4', 'K5', 'K6', 'K7', 'K8', 'K9', 'K10', 'K11', 'K12', 'K13',
        'Oukitel WP1', 'WP2', 'WP5', 'WP6', 'WP7', 'WP8', 'WP9', 'WP10', 'WP12', 'WP13', 'WP15', 'WP16', 'WP17',
        'Oukitel U7', 'U8', 'U9', 'U10', 'U11', 'U12', 'U13', 'U15', 'U16', 'U18',
        'Other'
    ],
    'Nothing': [
        'Nothing Phone 1', 'Nothing Phone 2', 'Nothing Phone 2a', 'Nothing Phone 3', 'Other'
    ],
    'Sharp': [
        'Sharp Aquos R', 'Aquos R2', 'Aquos R3', 'Aquos R5G', 'Aquos R6', 'Aquos R7', 'Aquos R8',
        'Aquos Sense', 'Sense 2', 'Sense 3', 'Sense 4', 'Sense 5G', 'Sense 6', 'Sense 7', 'Sense 8',
        'Aquos Zero', 'Zero 2', 'Aquos Wish', 'Wish 2', 'Wish 3', 'Other'
    ],
     'Panasonic': [
        'Panasonic Eluga A', 'Eluga I', 'Eluga L', 'Eluga Mark', 'Eluga Pulse', 'Eluga Ray', 'Eluga X1',
        'Eluga Z', 'Eluga Note', 'Eluga U', 'Eluga S', 'Eluga T', 'Eluga Z1 Pro', 'Other'
    ],
     'ZTE': [
        'ZTE Blade', 'Blade A3', 'Blade A5', 'Blade A7', 'Blade A31', 'Blade A51', 'Blade A52',
        'Blade V10', 'Blade V20', 'Blade V30', 'Blade V40', 'Blade V50',
        'ZTE Axon 7', 'Axon 9', 'Axon 10', 'Axon 20', 'Axon 30', 'Axon 40', 'Axon 50',
        'ZTE Nubia (see Nubia brand)', 'Other'
    ],
     'Nubia': [
        'Nubia Z5', 'Z7', 'Z9', 'Z11', 'Z17', 'Z18', 'Z20', 'Z30', 'Z40', 'Z50',
        'Nubia Red Magic', 'Red Magic 2', 'Red Magic 3', 'Red Magic 5G', 'Red Magic 6', 'Red Magic 7', 'Red Magic 8', 'Red Magic 9',
        'Nubia M2', 'Nubia N1', 'Nubia N2', 'Other'
    ],
     'Meizu': [
        'Meizu M1', 'M2', 'M3', 'M5', 'M6', 'M8', 'M9', 'M10',
        'Meizu MX', 'MX2', 'MX3', 'MX4', 'MX5', 'MX6',
        'Meizu Pro 5', 'Pro 6', 'Pro 7', 'Pro 7 Plus',
        'Meizu 15', '16', '17', '18', '19', '20', '21',
        'Meizu Note 8', 'Note 9', 'Note 10', 'Note 21',
        'Other'
    ],
    'LeEco': [
        'LeEco Le 1', 'Le 1s', 'Le 2', 'Le 2 Pro', 'Le Max', 'Le Max 2', 'Le Pro 3', 'Other'
    ],
     'Karbonn': [
        'Karbonn A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10',
        'Karbonn K9', 'K9 Viva', 'K9 Smart', 'K9 Plus',
        'Karbonn Titanium', 'Titanium S1', 'Titanium S2', 'Titanium S5', 'Titanium S6', 'Titanium S7',
        'Karbonn Smart Aura', 'Aura 4G', 'Aura Note', 'Other'
    ],
     'Intex': [
        'Intex Aqua', 'Aqua 3G', 'Aqua 4G', 'Aqua Ace', 'Aqua Amaze', 'Aqua Crystal', 'Aqua Dream',
        'Aqua Fish', 'Aqua Flash', 'Aqua Genius', 'Aqua Glory', 'Aqua HD', 'Aqua Lions',
        'Aqua Power', 'Aqua Prime', 'Aqua Raze', 'Aqua Star', 'Aqua Style', 'Aqua Trend',
        'Aqua View', 'Aqua Young', 'Other'
    ],
    'Spice': [
        'Spice Mi-101', 'Mi-105', 'Mi-109', 'Mi-270', 'Mi-350', 'Mi-355', 'Mi-410',
        'Spice Android One', 'Spice Dream', 'Spice Fire', 'Spice Flo', 'Spice Smart Flo',
        'Spice Stellar', 'Stellar 1', 'Stellar 2', 'Stellar 4', 'Stellar 5', 'Stellar 6', 'Stellar 8', 'Other'
    ],
    'Celkon': [
        'Celkon A8', 'A15', 'A20', 'A21', 'A22', 'A27', 'A35', 'A40', 'A42', 'A50',
        'Celkon Campus', 'Campus A', 'Campus A15', 'Campus A35', 'Campus A63',
        'Celkon Millennia', 'Millennia X', 'Millennia X1', 'Millennia X2',
        'Celkon Q Series', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Other'
    ],
    'iQOO': [
    'iQOO', 'iQOO 3', 'iQOO 5', 'iQOO 7', 'iQOO 9', 'iQOO 11', 'iQOO 12', 'iQOO 13',
    'iQOO Neo', 'iQOO Neo 3', 'iQOO Neo 5', 'iQOO Neo 6', 'iQOO Neo 7', 'iQOO Neo 8', 'iQOO Neo 9',
    'iQOO Z1', 'iQOO Z3', 'iQOO Z5', 'iQOO Z6', 'iQOO Z7', 'iQOO Z8', 'iQOO Z9',
    'iQOO U1', 'iQOO U3', 'iQOO U5',
    'Other'
],
'Symphony': [
    'Symphony V128', 'V129', 'V130', 'V131', 'V132', 'V133', 'V134', 'V135', 'V136', 'V137',
    'Symphony Z10', 'Z12', 'Z15', 'Z17', 'Z18', 'Z20', 'Z22', 'Z25', 'Z27', 'Z30',
    'Symphony i10', 'i20', 'i30', 'i40', 'i50', 'i60', 'i65', 'i66',
    'Symphony P6', 'P7', 'P8', 'P9', 'P10', 'P11', 'P12', 'P13', 'P15',
    'Symphony Xplorer', 'Xplorer W125', 'Xplorer W140', 'Xplorer W150',
    'Other'
],
'QMobile': [
    'QMobile A1', 'A2', 'A4', 'A6', 'A8', 'A10', 'A12',
    'QMobile E2', 'E3', 'E4', 'E5', 'E6', 'E8',
    'QMobile i5', 'i6', 'i7', 'i8', 'i9', 'i10', 'i12',
    'QMobile L1', 'L2', 'L3', 'L4', 'L5',
    'QMobile Noir', 'Noir A1', 'Noir A2', 'Noir A5', 'Noir A6', 'Noir A8',
    'Noir J2', 'Noir J5', 'Noir J6', 'Noir J7', 'Noir J8',
    'Noir S1', 'Noir S2', 'Noir S3', 'Noir S4', 'Noir S5',
    'QMobile X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'X9',
    'Other'
],
'Gionee': [
    'Gionee A1', 'A1 Lite', 'A1 Plus', 'A2', 'A2 Lite', 'A2 Plus',
    'Gionee E5', 'E6', 'E7', 'E8',
    'Gionee F103', 'F105', 'F106', 'F109', 'F205', 'F205 Pro',
    'Gionee M2', 'M3', 'M4', 'M5', 'M5 Lite', 'M6', 'M6 Plus', 'M7', 'M7 Plus',
    'Gionee P2', 'P5', 'P5L', 'P6', 'P7', 'P8', 'P9',
    'Gionee S8', 'S9', 'S10', 'S10 Lite', 'S10 Plus', 'S11',
    'Gionee X1', 'X1s',
    'Other'
],
'Gionee': [
    'Gionee A1', 'A1 Lite', 'A1 Plus', 'A2', 'A2 Lite', 'A2 Plus',
    'Gionee E5', 'E6', 'E7', 'E8',
    'Gionee F103', 'F105', 'F106', 'F109', 'F205', 'F205 Pro',
    'Gionee M2', 'M3', 'M4', 'M5', 'M5 Lite', 'M6', 'M6 Plus', 'M7', 'M7 Plus',
    'Gionee P2', 'P5', 'P5L', 'P6', 'P7', 'P8', 'P9',
    'Gionee S8', 'S9', 'S10', 'S10 Lite', 'S10 Plus', 'S11',
    'Gionee X1', 'X1s',
    'Other'
],
'Coolpad': [
    'Coolpad Note 3', 'Note 3 Lite', 'Note 3 Plus', 'Note 4', 'Note 5', 'Note 6',
    'Coolpad Cool 1', 'Cool 2', 'Cool 3', 'Cool 5', 'Cool 6', 'Cool 7', 'Cool 8', 'Cool 10',
    'Coolpad Mega 2', 'Mega 3', 'Mega 5',
    'Coolpad Canvas', 'Canvas 2', 'Canvas 3',
    'Other'
],
'Xolo': [
    'Xolo A500', 'A500L', 'A600', 'A700', 'A800', 'A1000', 'A1010',
    'Xolo Q500', 'Q600', 'Q700', 'Q700i', 'Q800', 'Q900', 'Q1000', 'Q1010', 'Q1010i',
    'Xolo One', 'One HD', 'One Touch',
    'Xolo Black', 'Xolo Era', 'Era 1X', 'Era 2', 'Era 3', 'Era 4',
    'Xolo Win', 'Win Q900', 'Win Q1000',
    'Other'
],
'Yu': [
    'Yu Yureka', 'Yureka Plus', 'Yureka S',
    'Yu Yunique', 'Yunique 2',
    'Yu Yutopia',
    'Yu Ace', 'Yu Ace 5',
    'Yu Phones', 'Other'
],
'Doogee': [
    'Doogee S50', 'S55', 'S60', 'S68', 'S80', 'S88', 'S88 Pro', 'S90', 'S95', 'S96', 'S97', 'S98', 'S99',
    'Doogee X50', 'X55', 'X60', 'X70', 'X80', 'X90', 'X95', 'X96', 'X97', 'X98',
    'Doogee N10', 'N20', 'N30', 'N40',
    'Doogee V10', 'V20', 'V30', 'V Max',
    'Other'
],
'Cubot': [
    'Cubot X10', 'X11', 'X12', 'X15', 'X16', 'X17', 'X18', 'X19', 'X20', 'X30', 'X50',
    'Cubot Note 7', 'Note 8', 'Note 9', 'Note 10', 'Note 20', 'Note 21',
    'Cubot KingKong', 'KingKong 2', 'KingKong 3', 'KingKong 5', 'KingKong 6', 'KingKong 7', 'KingKong 8',
    'Cubot J3', 'J5', 'J6', 'J7', 'J8', 'J9', 'J10',
    'Other'
],
'UMIDIGI': [
    'UMIDIGI A3', 'A5', 'A7', 'A9', 'A11', 'A13',
    'UMIDIGI Bison', 'Bison 2', 'Bison GT', 'Bison Pro',
    'UMIDIGI F1', 'F2', 'F3', 'F3 Pro', 'F3 SE',
    'UMIDIGI G1', 'G3', 'G5',
    'UMIDIGI Power', 'Power 3', 'Power 5', 'Power 7',
    'UMIDIGI S2', 'S3', 'S5', 'S5 Pro',
    'Other'
],

    'Other': ['Other']
};

// Populate model select based on brand
const brandSelect = document.getElementById('brand');
const modelSelect = document.getElementById('model');

if (brandSelect && modelSelect) {
    console.log('Brand and model selects found');
    brandSelect.addEventListener('change', function() {
        const selectedBrand = this.value;
        console.log('Brand changed to:', selectedBrand);
        modelSelect.innerHTML = '<option value="">Select Model</option>';
        
        if (selectedBrand && deviceModels[selectedBrand]) {
            console.log('Models for', selectedBrand, deviceModels[selectedBrand]);
            deviceModels[selectedBrand].forEach(model => {
                const option = document.createElement('option');
                option.value = model;
                option.textContent = model;
                modelSelect.appendChild(option);
            });
        }
    });
}

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            brand: document.getElementById('brand').value,
            model: document.getElementById('model').value,
            problem: document.getElementById('problem').value,
            description: document.getElementById('description').value,
            address: document.getElementById('address').value
        };

        // Validate form
        if (!validateForm(formData)) {
            showNotification('Please fill all fields correctly', 'error');
            return;
        }

        // Show loading state
        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Booking...';

        // Simulate form submission
        setTimeout(() => {
            // Create WhatsApp message
            const message = `*Mobile Repair Booking Request*\n\n` +
                `Name: ${formData.name}\n` +
                `Phone: ${formData.phone}\n` +
                `Device: ${formData.brand} ${formData.model}\n` +
                `Problem: ${formData.problem}\n` +
                `Description: ${formData.description}\n` +
                `Address: ${formData.address}`;

            // Send via WhatsApp
            const whatsappUrl = `https://wa.me/+918637044071?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');

            // Reset form
            bookingForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;

            showNotification('Booking request sent successfully!', 'success');
        }, 1000);
    });
}

// Form validation
function validateForm(data) {
    if (!data.name.trim() || data.name.trim().length < 2) return false;
    if (!data.phone.trim() || !/^\d{10}$/.test(data.phone.trim())) return false;
    if (!data.brand) return false;
    if (!data.model) return false;
    if (!data.problem) return false;
    if (!data.description.trim()) return false;
    if (!data.address.trim()) return false;
    return true;
}

// ============================================================================
// NOTIFICATIONS
// ============================================================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#25D366' : type === 'error' ? '#FF4444' : '#2196F3'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================================================
const animationElements = document.querySelectorAll(
    '.service-card, .feature-item, .review-card, .info-card'
);

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            animationObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

animationElements.forEach(el => {
    animationObserver.observe(el);
});

// Add fadeInUp animation
const fadeInUpStyle = document.createElement('style');
fadeInUpStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(fadeInUpStyle);

// ============================================================================
// LAZY LOADING FOR IMAGES
// ============================================================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================================================
// NAVBAR SCROLL EFFECT
// ============================================================================
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset;

    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }

    lastScrollTop = scrollTop;
});

// ============================================================================
// FORM INPUT EFFECTS
// ============================================================================
const inputs = document.querySelectorAll('input, select, textarea');

inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.borderColor = '#FF6B35';
    });

    input.addEventListener('blur', function() {
        this.style.borderColor = '#EEEEEE';
    });
});

// ============================================================================
// PHONE NUMBER FORMATTING
// ============================================================================
const phoneInput = document.getElementById('phone');

if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        e.target.value = value;
    });
}

// ============================================================================
// DYNAMIC YEAR IN FOOTER
// ============================================================================
const year = new Date().getFullYear();
const yearElements = document.querySelectorAll('[data-year]');
yearElements.forEach(el => {
    el.textContent = year;
});

// ============================================================================
// ACCESSIBILITY: KEYBOARD NAVIGATION
// ============================================================================
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        updateHamburgerIcon();
    }
});

// ============================================================================
// PERFORMANCE: DEBOUNCE FUNCTION
// ============================================================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================================================
// CONTACT LINK HANDLERS
// ============================================================================
const callButtons = document.querySelectorAll('[href^="tel:"]');
const whatsappButtons = document.querySelectorAll('[href*="wa.me"]');

callButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        logEvent('call_initiated', {
            timestamp: new Date().toISOString()
        });
    });
});

whatsappButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        logEvent('whatsapp_initiated', {
            timestamp: new Date().toISOString()
        });
    });
});

// ============================================================================
// EVENT LOGGING (Analytics)
// ============================================================================
function logEvent(eventName, eventData = {}) {
    if (window.gtag) {
        gtag('event', eventName, eventData);
    }
    // Console log for development
    console.log(`Event: ${eventName}`, eventData);
}

// ============================================================================
// SERVICE CARD CLICK HANDLING
// ============================================================================
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('click', function() {
        const serviceName = this.querySelector('h3').textContent;
        logEvent('service_viewed', {
            service_name: serviceName
        });
    });
});

// ============================================================================
// SMOOTH PAGE TRANSITIONS
// ============================================================================
document.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        document.querySelector('body').style.opacity = '1';
    }
});

// ============================================================================
// PRINT STYLES HANDLER
// ============================================================================
window.addEventListener('beforeprint', function() {
    document.querySelectorAll('.floating-buttons, .scroll-top').forEach(el => {
        el.style.display = 'none';
    });
});

window.addEventListener('afterprint', function() {
    document.querySelectorAll('.floating-buttons, .scroll-top').forEach(el => {
        el.style.display = '';
    });
});

// ============================================================================
// TOUCH DEVICE DETECTION
// ============================================================================
function isTouchDevice() {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
}

// Add touch class if device supports touch
if (isTouchDevice()) {
    document.body.classList.add('touch-device');
}

// ============================================================================
// PERFORMANCE: THROTTLE FUNCTION
// ============================================================================
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================================================
// INTERSECTION OBSERVER FOR PARALLAX EFFECT
// ============================================================================
const parallaxElements = document.querySelectorAll('[data-parallax]');

if ('IntersectionObserver' in window) {
    const parallaxObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const speed = entry.target.dataset.parallax || 0.5;
                const yPos = window.scrollY * speed;
                entry.target.style.transform = `translateY(${yPos}px)`;
            }
        });
    });

    parallaxElements.forEach(el => parallaxObserver.observe(el));
}

// Throttled scroll for better performance
window.addEventListener('scroll', throttle(function() {
    parallaxElements.forEach(el => {
        const speed = el.dataset.parallax || 0.5;
        const yPos = window.scrollY * speed;
        el.style.transform = `translateY(${yPos}px)`;
    });
}, 10));

// ============================================================================
// FORM AUTO-SAVE (LOCAL STORAGE)
// ============================================================================
const formInputs = document.querySelectorAll('.booking-form input, .booking-form select, .booking-form textarea');

// Load saved form data on page load
window.addEventListener('load', function() {
    formInputs.forEach(input => {
        const savedValue = localStorage.getItem(`form_${input.id}`);
        if (savedValue) {
            input.value = savedValue;
        }
    });
});

// Save form data as user types
formInputs.forEach(input => {
    input.addEventListener('change', function() {
        localStorage.setItem(`form_${this.id}`, this.value);
    });
});

// ============================================================================
// INITIALIZATION
// ============================================================================
console.log('Mobile Adda - Website Loaded Successfully');
console.log('Version: 1.0.0');
console.log('Professional Mobile Repair & Solutions');

// Initialize tooltips or other components as needed
document.addEventListener('DOMContentLoaded', function() {
    // Any additional initialization can go here
    console.log('DOM Content Loaded');
});

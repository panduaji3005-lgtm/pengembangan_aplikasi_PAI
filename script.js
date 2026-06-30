// --- 1. HAMBURGER MENU (Untuk Mobile) ---
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Animasi tombol hamburger
    mobileMenu.classList.toggle('is-active');
});

// Tutup menu saat link diklik (khusus mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// --- 2. SMOOTH SCROLL (Scroll Halus) ---
// Sebenarnya sudah ada di CSS (scroll-behavior: smooth), 
// tapi ini untuk memastikan navigasi bekerja baik di semua browser.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// --- 3. ANIMASI MUNCUL SAAT SCROLL ---
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Daftarkan section yang ingin diberi efek muncul
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// --- 4. PENANGANAN GAMBAR GAGAL MUAT ---
document.querySelectorAll('img').forEach(img => {
    img.onerror = function() {
        this.src = 'https://via.placeholder.com/400x300?text=Gambar+Belum+Tersedia'; // Gambar cadangan
        this.classList.add('error');
    };
});

// --- LOGIKA SLIDER TIM ---
const slider = document.getElementById('teamSlider');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
const cards = document.querySelectorAll('.team-slider .team-card');

let counter = 0;

nextBtn.addEventListener('click', () => {
    if (counter < cards.length - 1) {
        counter++;
        updateSlider();
    } else {
        // Balik ke awal jika sudah di akhir (opsional)
        counter = 0;
        updateSlider();
    }
});

prevBtn.addEventListener('click', () => {
    if (counter > 0) {
        counter--;
        updateSlider();
    } else {
        // Ke akhir jika di awal (opsional)
        counter = cards.length - 1;
        updateSlider();
    }
});

function updateSlider() {
    // Menggeser slider berdasarkan lebar kartu
    slider.style.transform = `translateX(${-counter * 100}%)`;
}
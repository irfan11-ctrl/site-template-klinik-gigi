// 1. REGISTRASI PLUGIN GSAP
gsap.registerPlugin(ScrollTrigger);

// 2. INISIALISASI LENIS (SMOOTH SCROLL)
// Ini membuat website terasa 'berat' dan mahal saat discroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing khas Apple/Awwwards
  smoothWheel: true,
  wheelMultiplier: 1,
});

// Loop animasi Lenis
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Hubungkan Lenis dengan ScrollTrigger agar animasi GSAP tetap sinkron
lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// --- MULAI ANIMASI WEBSITE ---

// 3. HERO SECTION ENTRY
// Teks muncul satu per satu, Status Pill muncul belakangan
const heroTl = gsap.timeline();

heroTl
  .from(".line", {
    y: 150,
    skewY: 7,
    opacity: 0,
    duration: 1.5,
    stagger: 0.2,
    ease: "power4.out",
  })
  .from(
    ".status-pill",
    {
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
    },
    "-=1",
  ) // Muncul berbarengan dengan akhir animasi teks
  .from(
    ".hero-info-box",
    {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power2.out",
    },
    "-=0.8",
  );

// 4. HORIZONTAL SCROLL ENGINE
// Menggeser panel ke samping saat user scroll ke bawah
const sectionContainer = document.querySelector(".horizontal-section");
const wrapper = document.querySelector(".horizontal-wrapper");
const panels = gsap.utils.toArray(".panel");

let scrollTween = gsap.to(panels, {
  xPercent: -100 * (panels.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: sectionContainer,
    pin: true,
    scrub: 1,
    // Panjang scroll horizontal ditentukan oleh lebar total wrapper
    end: () => "+=" + wrapper.offsetWidth,
    snap: {
      snapTo: 1 / (panels.length - 1),
      duration: { min: 0.2, max: 0.5 },
      delay: 0.1,
      ease: "power1.inOut",
    },
  },
});

// 5. ANIMASI ITEM DI DALAM HORIZONTAL SCROLL
// (Huruf Berputar & Judul Muncul)

// A. Huruf Berputar Terus-menerus (Loop)
gsap.to(".rotate-letter", {
  rotation: 360,
  duration: 6,
  repeat: -1,
  ease: "none",
});

// B. Reveal Judul saat Panel Lewat
gsap.utils.toArray(".inline-title").forEach((title) => {
  gsap.from(title, {
    x: 100, // Muncul dari kanan
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: title,
      containerAnimation: scrollTween, // SANGAT PENTING: Sinkron dengan scroll horizontal
      start: "left 80%",
      toggleActions: "play none none reverse",
    },
  });
});

// C. Animasi Ikon Dinamis (Kipas & Gear)
gsap.to(".icon-fan svg", {
  rotation: 360,
  duration: 4,
  repeat: -1,
  ease: "none",
});

gsap.to(".icon-gear svg", {
  rotation: -360,
  duration: 10,
  repeat: -1,
  ease: "none",
});

// 6. VERTICAL NEON LINE (JALUR BERCAHAYA)
// Garis hijau tebal yang menggambar dirinya sendiri saat discroll
const path = document.querySelector("#path");

if (path) {
  const pathLength = path.getTotalLength();

  // Sembunyikan garis dulu
  gsap.set(path, {
    strokeDasharray: pathLength,
    strokeDashoffset: pathLength,
  });

  // Gambar garis saat scroll
  gsap.to(path, {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".vertical-story",
      start: "top center",
      end: "bottom bottom",
      scrub: 0.5, // Responsivitas garis
    },
  });
}

// 7. STORY REVEAL & PARALLAX
const rows = gsap.utils.toArray(".story-row");

rows.forEach((row) => {
  const img = row.querySelector(".story-img img");
  const text = row.querySelector(".story-text");

  // Efek Muncul (Fade Up)
  gsap.from([img, text], {
    y: 100,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: row,
      start: "top 80%",
    },
  });

  // Efek Parallax Gambar (Bergerak sedikit saat scroll lewat)
  gsap.to(img, {
    y: -50,
    ease: "none",
    scrollTrigger: {
      trigger: row,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
});

// 8. SERVICES & FOOTER REVEAL
gsap.from(".s-card", {
  y: 60,
  opacity: 0,
  duration: 1,
  stagger: 0.15,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".services-grid",
    start: "top 85%",
  },
});

gsap.from(".footer h2", {
  y: 100,
  opacity: 0,
  duration: 1.5,
  ease: "power4.out",
  scrollTrigger: {
    trigger: ".footer",
    start: "top 80%",
  },
});

// Marquee Parallax (Tulisan brand bergerak sedikit berlawanan arah scroll)
gsap.to(".brand-track", {
  x: -150,
  scrollTrigger: {
    trigger: ".brands",
    start: "top bottom",
    end: "bottom top",
    scrub: 1,
  },
});

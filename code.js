// console.log('Lenis in window:', window.Lenis); // temp debug

// const lenis = new window.Lenis({
//   autoRaf: true,
// });


// // Listen for the scroll event and log the event data
// lenis.on('scroll', (e) => {
//   console.log(e);
// });

// lenis.on('scroll', ScrollTrigger.update)


gsap.registerPlugin(ScrollTrigger);

const section = document.querySelector('.section_1');
const video = document.getElementById('heroVideo');

function warmUp() {
  try {
    video.play().then(() => video.pause());
  } catch (e) {}
}

function setupScrollScrub() {
  const duration = video.duration || 0;
  if (!duration) return;
  const speed = 1;
ScrollTrigger.create({
  trigger: section,
  start: "top top",
  end: "bottom top",
  scrub: true,
  pin: true,
  onUpdate: self => {
    const t = Math.min(video.duration, self.progress * video.duration * speed);
    if (Math.abs(video.currentTime - t) > 0.03) video.currentTime = t;
  }
});


  ScrollTrigger.refresh();
}

if (video.readyState >= 1) {
  video.pause();
  warmUp();
  setupScrollScrub();
} else {
  video.addEventListener('loadedmetadata', () => {
    video.pause();
    warmUp();
    setupScrollScrub();
  });
}

const categoryCards = Array.from(document.querySelectorAll('.section_2 .category-card'));
const prevCategoryBtn = document.querySelector('.category-nav--prev');
const nextCategoryBtn = document.querySelector('.category-nav--next');

if (categoryCards.length && prevCategoryBtn && nextCategoryBtn) {
  let activeIndex = categoryCards.findIndex(card => card.classList.contains('is-active'));
  if (activeIndex < 0) activeIndex = 0;

  const setActiveCategory = (index) => {
    categoryCards.forEach((card, idx) => {
      if (idx === index) {
        card.classList.add('is-active');
        card.removeAttribute('aria-hidden');
        card.style.display = '';
      } else {
        card.classList.remove('is-active');
        card.setAttribute('aria-hidden', 'true');
        card.style.display = 'none';
      }
    });
  };

  const moveCategory = (direction) => {
    activeIndex = (activeIndex + direction + categoryCards.length) % categoryCards.length;
    setActiveCategory(activeIndex);
  };

  prevCategoryBtn.addEventListener('click', () => moveCategory(-1));
  nextCategoryBtn.addEventListener('click', () => moveCategory(1));

  setActiveCategory(activeIndex);
}



const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    alert('Thank you for subscribing!');
    newsletterForm.reset();
  });
}

const testimonialsData = [
  { name: 'AMELIA S.', location: 'Happy Customer, New York' },
  { name: 'JAMES M.', location: 'Satisfied Customer, Los Angeles' },
  { name: 'SARAH L.', location: 'Loyal Customer, Chicago' },
  { name: 'MICHAEL R.', location: 'Happy Customer, Miami' }
];

const testimonialQuotes = document.querySelectorAll('.testimonial_quote');
const testimonialImages = document.querySelectorAll('.testimonial_img');
const testimonialDots = document.querySelectorAll('.testimonial_dots .dot');
const authorName = document.querySelector('.testimonial_author .author-name');
const authorLocation = document.querySelector('.testimonial_author .author-location');

if (testimonialQuotes.length > 0 && testimonialImages.length > 0 && testimonialDots.length > 0) {
  let currentIndex = 0;

  function showTestimonial(index) {
    testimonialQuotes.forEach(quote => quote.classList.remove('active'));
    testimonialImages.forEach(img => img.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));

    if (testimonialQuotes[index]) testimonialQuotes[index].classList.add('active');
    if (testimonialImages[index]) testimonialImages[index].classList.add('active');
    if (testimonialDots[index]) testimonialDots[index].classList.add('active');

    if (authorName && authorLocation && testimonialsData[index]) {
      authorName.textContent = testimonialsData[index].name;
      authorLocation.textContent = testimonialsData[index].location;
    }

    currentIndex = index;
  }

  testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showTestimonial(index);
    });
  });

  showTestimonial(0);
}
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


const video = document.getElementById("heroVideo");

video.pause();

video.addEventListener("loadedmetadata", () => {
  const d = video.duration;

  gsap.to(video, {
    currentTime: d,
    ease: "none",
    scrollTrigger: {
      trigger: ".section_1",   
      start: "top top",
      end: "+=" + d * 600,     
      scrub: true,
      pin: true
    }
  });
});


const categoryCards = Array.from(document.querySelectorAll('.section_2 .category-card'));
const prevCategoryBtn = document.querySelector('.category-nav--prev');
const nextCategoryBtn = document.querySelector('.category-nav--next');

function animateCategoryCard(card) {
  const elements = card.querySelectorAll("h1, img");
  gsap.fromTo(
    elements,
    {
      x: 120,
      y: 60,
      opacity: 0
    },
    {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.08
    }
  );
}

ScrollTrigger.create({
  trigger: ".section_2",
  start: "top 80%",
  anticipatePin: 1,
  onEnter: () => {
    const activeCard = document.querySelector(".section_2 .category-card.is-active");
    if (activeCard) {
      animateCategoryCard(activeCard);
    }
  }
});

if (categoryCards.length && prevCategoryBtn && nextCategoryBtn) {
  let activeIndex = categoryCards.findIndex(card => card.classList.contains('is-active'));
  if (activeIndex < 0) activeIndex = 0;

  const setActiveCategory = (index, animate = false) => {
    categoryCards.forEach((card, idx) => {
      if (idx === index) {
        card.classList.add('is-active');
        card.removeAttribute('aria-hidden');
        card.style.display = '';
        if (animate) {
          animateCategoryCard(card);
        }
      } else {
        card.classList.remove('is-active');
        card.setAttribute('aria-hidden', 'true');
        card.style.display = 'none';
      }
    });
  };

  const moveCategory = (direction) => {
    activeIndex = (activeIndex + direction + categoryCards.length) % categoryCards.length;
    setActiveCategory(activeIndex, true);
  };

  prevCategoryBtn.addEventListener('click', () => moveCategory(-1));
  nextCategoryBtn.addEventListener('click', () => moveCategory(1));

  setActiveCategory(activeIndex);
}

const impactNumbers = document.querySelectorAll(".section_3 .numbers h4");

if (impactNumbers.length) {
  impactNumbers.forEach((el) => {
    const raw = el.textContent.trim();
    const match = raw.match(/([\d.,]+)(.*)/);
    if (!match) return;
    const numberPart = match[1];
    const suffixPart = match[2] || "";
    const hasComma = numberPart.includes(",");
    const decimalPlaces = (numberPart.split(".")[1] || "").length;
    const target = parseFloat(numberPart.replace(/,/g, ""));
    const obj = { value: 0 };

    function formatValue(v) {
      let n = decimalPlaces ? v.toFixed(decimalPlaces) : Math.floor(v);
      if (hasComma) {
        n = Number(n).toLocaleString("en-US", {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces
        });
      }
      return n + suffixPart;
    }

    el.textContent = formatValue(0);

    gsap.fromTo(
      obj,
      { value: 0 },
      {
        value: target,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".section_3",
          start: "top 70%",
          toggleActions: "play reverse play reverse"
        },
        onUpdate: () => {
          el.textContent = formatValue(obj.value);
        }
      }
    );
  });

  gsap.from(".section_3 h1, .sec3_bottom > p, .sec3_bottom_numbs", {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".section_3",
      start: "top 80%",
      toggleActions: "play reverse play reverse"
    }
  });
}

const sec4Tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section_4",
    start: "top 80%",
    end: "bottom 20%",
    scrub: 1
  }
});

sec4Tl.from(".sec4_card", {
  y: 80,
  opacity: 0,
  stagger: 0.2,
  duration: 1,
  ease: "power2.out"
});


const sec5Tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section_5",
    start: "top 80%",
    end: "bottom 20%",
    scrub: 1
  }
});

sec5Tl.from(".sec5_card", {
  y: 80,
  opacity: 0,
  stagger: 0.2,
  duration: 1,
  ease: "power2.out"
});


gsap.from(".testimonial_content", {
  opacity: 0,
  y: 40,
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".section_6",
    start: "top 80%",
    toggleActions: "play reverse play reverse"
  }
});

gsap.from(".testimonial_dots", {
  opacity: 0,
  y: 20,
  duration: 0.8,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".section_6",
    start: "top 85%",
    toggleActions: "play reverse play reverse"
  }
});


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

const burger = document.querySelector('.burger');
const navLinksPanel = document.querySelector('.nav-links');

if (burger && navLinksPanel) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinksPanel.classList.toggle('open');
  });
}



document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(Flip);

  const hero = document.querySelector(".hero");
  const heroTexts = document.querySelectorAll(".hero__text");

  const tl = gsap.timeline({
    delay: 0.5,
    onComplete: () => {
      const state = Flip.getState(heroTexts);
      hero.classList.add("align-start");
      Flip.from(state, { duration: 0.5, ease: "power2.inOut" });
    },
  });

  tl.set(hero, {
    autoAlpha: 1,
    yPercent: 66,
  });

  heroTexts.forEach((text, index) => {
    tl.from(text, {
      yPercent: 120,
      opacity: 0,
      scale: 0.5,
      duration: 0.5,
      ease: "power3",
    });
    if (index > 0) {
      tl.to(
        hero,
        {
          yPercent: "-=33",
          duration: 0.5,
          ease: "power2",
        },
        "<",
      );
    }
  });
});

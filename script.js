document.addEventListener("DOMContentLoaded", () => {
  const stickySections = document.querySelectorAll("[data-sticky]");
  const stickyTexts = document.querySelectorAll("[data-sticky] h2");

  if (window.innerWidth < 960) {
    stickySections.forEach((stickySection) => stickySection.remove());
  } else {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    let targetScales = Array({ length: stickySections.length }).fill(1);
    function calculateTargetScale(stickyIndex) {
      const stickySection = stickySections[stickyIndex - 1];
      const stickyText = stickyTexts[stickyIndex - 1];

      const sectionHeight = stickySection.offsetHeight;
      const textHeight = stickyText.offsetHeight;

      targetScales[stickyIndex - 1] = sectionHeight / textHeight;
    }

    const ro = new ResizeObserver((entries) =>
      entries.forEach((entry) => {
        const stickyIndex = +entry.target.dataset.sticky;
        calculateTargetScale(stickyIndex);
      })
    );
    stickySections.forEach((stickySection) => ro.observe(stickySection));

    function setScaleY(element, scale) {
      element.style.transform = `scaleY(${scale})`;
    }

    stickyTexts.forEach((stickyText, i) => {
      ScrollTrigger.create({
        trigger: stickyText,
        start: "top bottom",
        end: "top top",
        scrub: 1,
        onUpdate: (self) => {
          const scale = targetScales[i] * self.progress;
          setScaleY(stickyText, scale);
        },
      });

      ScrollTrigger.create({
        trigger: stickyText,
        start: "top top",
        end: `+=${window.innerHeight}px`,
        pin: true,
        pinSpacing: false,
        scrub: 1,
        onUpdate: (self) => {
          const scale = targetScales[i] * (1 - self.progress);
          setScaleY(stickyText, scale);
        },
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(Flip, ScrollTrigger, ScrollSmoother);

  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", (context) => {
    introAnimation();
    elasticGridScroll();
  });
  function introAnimation() {
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
  }

  function elasticGridScroll() {
    const smoother = ScrollSmoother.create({
      smooth: 1,
      normalizeScroll: true,
    });

    const lagConfig = {
      baseLag: 0.3, // Lag applied to the center column
      lagScale: 0.15, // How much additional lag is applied per column away from center
    };

    const gridClassNames = {
      grid: "portfolio__grid",
      item: "portfolio__item",
      column: "portfolio__column",
    };

    const grid = document.querySelector("." + gridClassNames.grid);
    const originalItems = grid.querySelectorAll("." + gridClassNames.item);

    let currentColumnCount;

    new ResizeObserver(() => {
      const newColumnCount = getGridColumnCount(grid);
      if (newColumnCount !== currentColumnCount) init();
    }).observe(grid);

    function init() {
      clearGrid(grid, originalItems);
      const { columns, numColumns } = groupItemsByColumn(grid);
      currentColumnCount = numColumns;
      const columnContainers = buildGrid(columns, numColumns, lagConfig, grid);
      applyLagEffects(columnContainers, smoother);
    }

    function clearGrid(grid, originalItems) {
      grid
        .querySelectorAll("." + gridClassNames.column)
        .forEach((col) => col.remove());
      originalItems.forEach((item) => grid.appendChild(item));
    }

    function getGridColumnCount(grid) {
      const styles = getComputedStyle(grid);
      return styles
        .getPropertyValue("grid-template-columns")
        .split(" ")
        .filter(Boolean).length;
    }

    function groupItemsByColumn(grid) {
      const numColumns = getGridColumnCount(grid);

      const columns = Array.from({ length: numColumns }, () => []);

      grid
        .querySelectorAll("." + gridClassNames.item)
        .forEach((item, index) => columns[index % numColumns].push(item));

      return { columns, numColumns };
    }

    function buildGrid(columns, numColumns, lagConfig, grid) {
      const { baseLag, lagScale } = lagConfig;

      const fragment = document.createDocumentFragment();
      const mid = (numColumns - 1) / 2;
      const columnContainers = [];

      columns.forEach((column, index) => {
        const distance = Math.abs(index - mid);
        const lag = baseLag + distance * lagScale;

        const columnContainer = document.createElement("div");
        columnContainer.className = gridClassNames.column;
        column.forEach((item) => columnContainer.appendChild(item));
        fragment.appendChild(columnContainer);

        columnContainers.push({
          element: columnContainer,
          lag,
        });
      });

      grid.appendChild(fragment);

      return columnContainers;
    }

    function applyLagEffects(columnContainers, smoother) {
      columnContainers.forEach(({ element, lag }) => {
        smoother.effects(element, { speed: 1, lag });
      });
    }
  }
});

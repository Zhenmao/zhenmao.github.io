const boxes = document.querySelectorAll(".portfolio-box");
const dialog = document.querySelector("#demo");
const closeBtn = document.querySelector("#demoCloseButton");
const iframe = document.querySelector("#demoIframe");

const ro = new ResizeObserver(() => {
  const embedded = iframe.contentWindow.document.body;
  iframe.style.height = `${embedded.scrollHeight}px`;
});

closeBtn.addEventListener("click", () => {
  dialog.close();
});

boxes.forEach((box) => {
  box.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.showModal();

    const currentSrc = iframe.getAttribute("src");
    const newSrc = event.currentTarget.getAttribute("href");
    if (currentSrc === newSrc) return;

    ro.disconnect();
    iframe.setAttribute("src", newSrc);
    iframe.onload = () => {
      const embedded = iframe.contentWindow.document.body;
      ro.observe(embedded);
    };
  });
});

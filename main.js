const boxes = document.querySelectorAll(".portfolio-box");
const dialog = document.querySelector("#demo");
const closeBtn = document.querySelector("#demoCloseButton");
const iframe = document.querySelector("#demoIframe");
iframe.addEventListener("load", resizeIframe);

boxes.forEach((box) => {
  box.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.showModal();
    iframe.setAttribute("src", event.currentTarget.getAttribute("href"));
  });
});

closeBtn.addEventListener("click", () => {
  dialog.close();
});

new ResizeObserver(resizeIframe).observe(iframe);

function resizeIframe() {
  const embedded = iframe.contentWindow.document.body;
  iframe.style.height = `${embedded.scrollHeight}px`;
}

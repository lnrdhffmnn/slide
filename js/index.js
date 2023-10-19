const Index = {
  global: {
    /** @type {number} */
    page: 1,

    /** @type {string} */
    storageKey: "slide-page",
  },

  elements: {
    /** @type {HTMLDivElement} */
    slide: document.querySelector("#slide"),

    /** @type {HTMLButtonElement} */
    btnPrevious: document.querySelector("#btnPrevious"),

    /** @type {HTMLButtonElement} */
    btnNext: document.querySelector("#btnNext"),

    /** @type {HTMLSpanElement} */
    page: document.querySelector("#page"),
  },

  init() {
    Index.events();
    Index.loadInitialSlide();
  },

  events() {
    addEventListener("keydown", Index.handleKeyboardEvents);
    Index.elements.btnPrevious.addEventListener("click", Index.previousPage);
    Index.elements.btnNext.addEventListener("click", Index.nextPage);
    Index.elements.page.addEventListener("click", Index.slideModal);
  },

  loadInitialSlide() {
    const slide = Number(sessionStorage.getItem(Index.global.storageKey) ?? 1);
    Index.goToSlide(isNaN(slide) || slide === 0 ? 1 : slide);
  },

  /** @param {KeyboardEvent} event */
  handleKeyboardEvents(event) {
    switch (event.key) {
      case "ArrowLeft":
        Index.previousPage();
        break;

      case "ArrowRight":
        Index.nextPage();
        break;
      case "Home":
        Index.goToSlide(1);
        break;
    }
  },

  slideModal() {
    const promptResult = prompt("Número do slide:", "1");
    if (promptResult === null || promptResult.length === 0) return;

    const slide = Number(promptResult);
    if (isNaN(slide)) return;

    Index.goToSlide(slide);
  },

  /** @param {number} page */
  async goToSlide(page = 1) {
    page = Math.max(1, page);

    const res = await fetch(`slides/${page}.html`);
    if (!res.ok) return;
    const html = await res.text();

    sessionStorage.setItem(Index.global.storageKey, page.toString());
    Index.global.page = page;
    Index.elements.page.innerHTML = page < 10 ? `0${page}` : page.toString();

    Index.elements.slide.innerHTML = html;

    hljs.highlightAll();
  },

  previousPage() {
    Index.goToSlide(Index.global.page - 1);
  },

  nextPage() {
    Index.goToSlide(Index.global.page + 1);
  },

  /**
   * @param {"desktop" | "tablet" | "mobile" | "watch"} size
   */
  resize(size) {
    /** @type {HTMLDivElement} */
    const example = document.querySelector("#example");
    example.className = `resize ${size}`;
  },
};

Index.init();

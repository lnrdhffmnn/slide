const Index = {
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

  globals: {
    /** @type {number} */
    page: 1,

    /** @type {string} */
    storageKey: "slide-page",
  },

  init() {
    Index.events();
    Index.loadInitialSlide();
  },

  events() {
    window.addEventListener("keydown", Index.handleKeyboardEvents);
    Index.elements.btnPrevious.addEventListener("click", Index.previousPage);
    Index.elements.btnNext.addEventListener("click", Index.nextPage);
    Index.elements.page.addEventListener("click", Index.slideModal);
  },

  loadInitialSlide() {
    const slide = Number(sessionStorage.getItem(Index.globals.storageKey) ?? 1);
    Index.goToSlide(isNaN(slide) || slide === 0 ? 1 : slide);
  },

  /** @param {KeyboardEvent} event */
  handleKeyboardEvents(event) {
    switch (event.key) {
      case "ArrowLeft": {
        Index.previousPage();
        break;
      }
      case "ArrowRight": {
        Index.nextPage();
        break;
      }
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

    const res = await fetch(`/slides/${page}.html`);
    if (!res.ok) return;
    const html = await res.text();

    sessionStorage.setItem(Index.globals.storageKey, page.toString());
    Index.globals.page = page;
    Index.elements.page.innerHTML = page < 10 ? `0${page}` : page.toString();

    Index.elements.slide.innerHTML = html;

    Slide.init();
  },

  previousPage() {
    Index.goToSlide(Index.globals.page - 1);
  },

  nextPage() {
    Index.goToSlide(Index.globals.page + 1);
  },
};

Index.init();

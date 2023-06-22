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
  },

  init() {
    Index.events();
    Index.loadInitialSlide();
  },

  events() {
    window.addEventListener("keydown", Index.handleKeyboardEvents);
    Index.elements.btnPrevious.addEventListener("click", Index.previousPage);
    Index.elements.btnNext.addEventListener("click", Index.nextPage);
  },

  loadInitialSlide() {
    const slide = Number(location.hash.replace("#", "") ?? 1);
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

  /** @param {number} page */
  async goToSlide(page = 1) {
    page = Math.max(1, page);

    const res = await fetch(`/slides/${page}.html`);
    if (!res.ok) return;
    const html = await res.text();

    location.hash = page;
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

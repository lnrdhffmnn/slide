const Index = {
  elements: {
    /** @type {HTMLDivElement} */
    slide: document.querySelector("#slide"),

    /** @type {HTMLButtonElement} */
    btnPrevious: document.querySelector("#btnPrevious"),

    /** @type {HTMLButtonElement} */
    btnNext: document.querySelector("#btnNext"),
  },

  globals: {
    /** @type {number} */
    page: 1,
  },

  init() {
    Index.events();
    Index.goToSlide(1);
  },

  events() {
    window.addEventListener("keydown", Index.handleKeyboardEvents);
    Index.elements.btnPrevious.addEventListener("click", Index.previousPage);
    Index.elements.btnNext.addEventListener("click", Index.nextPage);
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
    const res = await fetch(`/slides/${page}.html`);

    if (!res.ok) return;

    const html = await res.text();

    Index.globals.page = Math.max(1, page);

    Index.elements.slide.innerHTML = html;
  },

  previousPage() {
    Index.goToSlide(Index.globals.page - 1);
  },

  nextPage() {
    Index.goToSlide(Index.globals.page + 1);
  },
};

Index.init();

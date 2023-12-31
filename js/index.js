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
    switch (event.key.toLowerCase()) {
      case "arrowleft":
      case "a":
        Index.previousPage();
        break;
      case "arrowright":
      case "d":
        Index.nextPage();
        break;
      case "home":
      case "r":
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

    if (page === 10) {
      Example.init();
      document.querySelectorAll("#resize button").forEach((button) => {
        button.classList.remove("active");
      });
      document.querySelector("#resize button").classList.add("active");
    }
  },

  previousPage() {
    Index.goToSlide(Index.global.page - 1);
  },

  nextPage() {
    Index.goToSlide(Index.global.page + 1);
  },

  /**
   * @param {PointerEvent} event
   * @param {"desktop" | "tablet" | "mobile" | "watch"} size
   */
  resize(event, size) {
    /** @type {HTMLDivElement} */
    const example = document.querySelector("#example");
    example.className = `resize ${size}`;

    document.querySelectorAll("#resize button").forEach((button) => {
      button.classList.remove("active");
    });

    /** @type {HTMLElement} */
    const button = event.currentTarget;
    button.classList.add("active");
  },
};

Index.init();

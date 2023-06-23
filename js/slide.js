const Slide = {
  globals: {},

  init() {
    try {
      Slide[`slide${Index.globals.page}`]();
    } catch {
    } finally {
      hljs.highlightAll();
    }
  },

  executeCode() {
    /** @type {string} */
    const code = document.querySelector(".language-js").innerHTML;

    /** @type {HTMLButtonElement} */
    const execute = document.querySelector("#execute");

    /** @type {HTMLParagraphElement} */
    const output = document.querySelector(".output");

    execute.addEventListener("click", () => {
      const log = console.log;
      console.log = (...value) => {
        log.apply(console, value);
        return value;
      };

      output.innerHTML = eval(code);

      console.log = log;
    });
  },

  slide6() {
    Slide.executeCode();
  },

  slide7() {
    Slide.executeCode();
  },

  slide8() {
    Slide.executeCode();
  },
};

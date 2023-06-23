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

  slide6() {
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

  slide7() {
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

  slide8() {
    /** @type {string} */
    const code = document
      .querySelector(".language-js")
      .innerHTML.replace(/[\n|\s]+/, "");

    console.log(code);

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
};

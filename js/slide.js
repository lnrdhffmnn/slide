const Slide = {
  globals: {},

  init() {
    try {
      Slide[`slide${Index.globals.page}`]();
    } catch {}
  },

  slide6() {
    const textArea = document.querySelector("textarea");

    /** @type {HTMLButtonElement} */
    const execute = document.querySelector("#execute");

    /** @type {HTMLParagraphElement} */
    const output = document.querySelector(".output");

    textArea.value = 'console.log("Hello World");';

    execute.addEventListener("click", () => {
      const log = console.log;
      console.log = (...value) => {
        log.apply(console, value);
        return value;
      };

      output.innerHTML = eval(textArea.value);

      console.log = log;
    });
  },
};

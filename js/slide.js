const Slide = {
  global: {},

  init() {
    try {
      Slide[`slide${Index.globals.page}`]();
    } finally {
      hljs.highlightAll();
    }
  },
};

const Slide = {
  init() {
    try {
      Slide[`slide${Index.globals.page}`]();
    } finally {
      hljs.highlightAll();
    }
  },
};

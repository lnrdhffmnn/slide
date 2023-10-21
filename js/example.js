const Example = {
  global: {},

  elements: {
    /** @type {HTMLDivElement} */
    screen: document.querySelector("#screen"),
  },

  init() {
    Example.events();
    Example.resize();
  },

  events() {
    document.querySelectorAll(".message").forEach((element) => {
      element.addEventListener("click", Example.openChat);
    });
    document
      .querySelector("#chat-info .bi")
      ?.addEventListener("click", Example.closeChat);
  },

  openChat() {
    if (Example.elements.screen.clientWidth > 768) return;
    document.querySelector("#chat").classList.add("chat-open");
  },

  closeChat() {
    if (Example.elements.screen.clientWidth > 768) return;
    document.querySelector("#chat").classList.remove("chat-open");
  },

  resize() {
    const observer = new ResizeObserver((entries) => {
      if (entries[0].contentRect.width > 768) {
        document.querySelector("#chat").classList.remove("chat-open");
      }
    });

    observer.observe(Example.elements.screen);
  },
};

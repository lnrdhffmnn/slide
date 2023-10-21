const Example = {
  elements: {
    /** @type {HTMLDivElement} */
    screen: document.querySelector("#screen"),
  },

  init() {
    Example.events();
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
    document.querySelector("#chat").classList.remove("chat-open");
  },
};

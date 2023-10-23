const Example = {
  global: {
    /** @type {number | undefined} */
    timeout: undefined,
  },

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
      .addEventListener("click", Example.closeChat);
    document
      .querySelector("#send-message button")
      .addEventListener("click", Example.sendMessage);
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
      const messages = document.querySelector("#messages");
      messages.scrollTop = messages.scrollHeight;
    });

    observer.observe(Example.elements.screen);
  },

  sendMessage() {
    if (Example.global.timeout !== undefined) {
      clearTimeout(Example.global.timeout);
    }
    Example.newMessage(true);
    Example.global.timeout = setTimeout(() => Example.newMessage(false), 1000);
  },

  /** @param {boolean} fromUser */
  newMessage(fromUser) {
    document.querySelector("#send-message input").value = "";
    document.querySelector(".new-message")?.classList.remove("new-message");
    document.querySelector("#messages").innerHTML += `
      <div class="message-bubble new-message ${fromUser ? "from-user" : ""}">
        <div class="placeholder user-name"></div>
        <div class="placeholder message-content"></div>
        <div class="placeholder message-content"></div>
      </div>
    `;
    const messages = document.querySelector("#messages");
    messages.scrollTop = messages.scrollHeight;
  },
};

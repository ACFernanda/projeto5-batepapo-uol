const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
promise.then(getMessages);

function getMessages(response) {
  const allMessages = response.data;

  for (let i = 0; i < allMessages.length; i++) {
    const message = allMessages[i];
    const chatContainer = document.querySelector(".all-messages");

    if (message.type === "message") {
      chatContainer.innerHTML =
        chatContainer.innerHTML +
        `<div class="message-box">
    <time>(${message.time})</time>
    <p><span>${message.from}</span> para <span>${message.to}</span>: ${message.text}</p>
  </div>`;
    } else if (message.type === "private_message") {
      chatContainer.innerHTML =
        chatContainer.innerHTML +
        `<div class="message-box private">
    <time>(${message.time})</time>
    <p><span>${message.from}</span> reservadamente para <span>${message.to}</span>: ${message.text}</p>
  </div>`;
    } else if (message.type === "status") {
      chatContainer.innerHTML =
        chatContainer.innerHTML +
        `<div class="message-box login-logout">
    <time>(${message.time})</time>
    <p><span>${message.from}</span> ${message.text}</p>
  </div>`;
    }
  }
}

function scrollToEnd() {
  const endOfComments = document.querySelector("main");
  endOfComments.scrollIntoView();
}
scrollToEnd();

function sendMessage() {}

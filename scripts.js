function getMessages() {
  const promise = axios.get(
    "https://mock-api.driven.com.br/api/v4/uol/messages"
  );
  promise.then(renderMessages);
}

getMessages();

setInterval(getMessages, 3000);

function renderMessages(response) {
  const allMessages = response.data;
  let allMessagesInnerHtml = "";
  const chatContainer = document.querySelector(".all-messages");

  for (let i = 0; i < allMessages.length; i++) {
    const message = allMessages[i];

    if (message.type === "message") {
      allMessagesInnerHtml =
        allMessagesInnerHtml +
        `<div data-identifier="message" class="message-box">
        <p><time>(${message.time})</time>
    <span>${message.from}</span> para <span>${message.to}</span>: ${message.text}</p>
  </div>`;
    } else if (message.type === "private_message") {
      allMessagesInnerHtml =
        allMessagesInnerHtml +
        `<div data-identifier="message" class="message-box private">
        <p><time>(${message.time})</time>
    <span>${message.from}</span> reservadamente para <span>${message.to}</span>: ${message.text}</p>
  </div>`;
    } else if (message.type === "status") {
      allMessagesInnerHtml =
        allMessagesInnerHtml +
        `<div data-identifier="message" class="message-box login-logout">
        <p><time>(${message.time})</time>
    <span>${message.from}</span> ${message.text}</p>
  </div>`;
    }
  }
  chatContainer.innerHTML = allMessagesInnerHtml;
  scrollToEnd();
}

function scrollToEnd() {
  window.scrollTo(0, document.body.scrollHeight);
}

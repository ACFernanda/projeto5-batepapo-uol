let user = "";
let inputMessage = document.querySelector("footer input");

newUser();

function newUser() {
  user = prompt("Qual é seu nome?");
  const promise = axios.post(
    "https://mock-api.driven.com.br/api/v4/uol/participants",
    { name: user }
  );
  promise.then(login);
  promise.catch(newUsername);
}

function login() {
  getMessages();
}

function newUsername() {
  alert("Tente outro nome!");
  newUser();
}

function getMessages() {
  const promise = axios.get(
    "https://mock-api.driven.com.br/api/v4/uol/messages"
  );
  promise.then(renderMessages);
}
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
    } else if (message.type === "private_message" && message.to === user) {
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

function sendMessage() {
  let objMessage = {
    from: user,
    to: "Todos",
    text: inputMessage.value,
    type: "message",
  };
  const promise = axios.post(
    "https://mock-api.driven.com.br/api/v4/uol/messages",
    objMessage
  );
  promise.then(getMessages);
  promise.catch(failed);

  inputMessage.value = "";
}

function failed() {
  alert("Faça login novamente.");
  window.location.reload();
}

function keepOnline() {
  const promise = axios.post(
    "https://mock-api.driven.com.br/api/v4/uol/status",
    {
      name: user,
    }
  );
}
keepOnline();
setInterval(keepOnline, 5000);

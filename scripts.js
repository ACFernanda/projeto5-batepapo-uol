let user = document.querySelector(".name");
let inputMessage = document.querySelector("footer input");
let visibility = "";
let type = "";
let contact = "";
let information = document.querySelector("footer p");

function newUser() {
  user = user.value;

  const promise = axios.post(
    "https://mock-api.driven.com.br/api/v4/uol/participants",
    { name: user }
  );
  promise.then(login);
  promise.catch(usernameFailed);
}

function login() {
  const loginPage = document.querySelector(".login-page");
  loginPage.classList.add("hide");
  getMessages();
  setInterval(getMessages, 3000);
  keepOnline();
  setInterval(keepOnline, 5000);
}

function usernameFailed() {
  alert("Tente outro nome!");
  window.location.reload();
}

function getMessages() {
  const promise = axios.get(
    "https://mock-api.driven.com.br/api/v4/uol/messages"
  );
  promise.then(renderMessages);
}

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
    } else if (
      message.type === "private_message" &&
      (message.to === user || message.from === user)
    ) {
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
  window.scrollTo(000, document.body.scrollHeight);
}

function sendMessage() {
  let objMessage = {
    from: user,
    to: contact,
    text: inputMessage.value,
    type: type,
  };
  const promise = axios.post(
    "https://mock-api.driven.com.br/api/v4/uol/messages",
    objMessage
  );
  promise.then(getMessages);
  promise.catch(failed);

  inputMessage.value = "";
}

const input = document.querySelector("footer input");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.querySelector("footer ion-icon").click();
  }
});

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

function showSidebar() {
  const sidebar = document.querySelector(".aside-container.hide");
  if (sidebar !== null) {
    sidebar.classList.remove("hide");
    sidebar.classList.add("show");
  }
}

function hideSidebar() {
  const sidebar = document.querySelector(".aside-container.show");
  if (sidebar !== null) {
    sidebar.classList.remove("show");
    sidebar.classList.add("hide");
  }
}

function getParticipants() {
  const promise = axios.get(
    "https://mock-api.driven.com.br/api/v4/uol/participants"
  );
  promise.then(renderParticipants);
  promise.catch(showError);
}

function renderParticipants(response) {
  const allParticipants = response.data;
  const participantsContainer = document.querySelector(
    ".participants-container"
  );
  let participantsInnerHTML = "";

  for (let i = 0; i < allParticipants.length; i++) {
    const participant = allParticipants[i];
    participantsInnerHTML =
      participantsInnerHTML +
      `<div class="aside-option contact" data-identifier="participant" onclick="selectContact(this)">
    <ion-icon name="person-circle"></ion-icon>
    <h4>${participant.name}</h4>
    <ion-icon class="check" name="checkmark-sharp"></ion-icon>
    </div>`;
  }
  participantsContainer.innerHTML = participantsInnerHTML;
}

function showError(error) {
  console.log(error);
}

getParticipants();
setInterval(getParticipants, 10000);

function selectContact(contactOption) {
  const checkMark = document.querySelector(".aside-option.contact.selected");
  if (checkMark !== null) {
    checkMark.classList.remove("selected");
  }
  contactOption.classList.add("selected");

  saveContact();
  messageInformation();
}

function selectVisibility(option) {
  const checkMark = document.querySelector(".aside-option.visibility.selected");
  if (checkMark !== null) {
    checkMark.classList.remove("selected");
  }
  option.classList.add("selected");

  saveVisibility();
  messageInformation();
}

function saveContact() {
  const contactOption = document.querySelector(
    ".aside-option.contact.selected h4"
  );
  contact = contactOption.innerHTML;
}
saveContact();

function saveVisibility() {
  const visibilityOption = document.querySelector(
    ".aside-option.visibility.selected h4"
  );
  visibility = visibilityOption.innerHTML;

  if (visibility === "Público") {
    type = "message";
  }

  if (visibility === "Reservadamente") {
    type = "private_message";
  }
}
saveVisibility();

function messageInformation() {
  if (visibility === "Público") {
    information.innerHTML = `Enviando para ${contact} (publicamente)`;
  }
  if (visibility === "Reservadamente") {
    information.innerHTML = `Enviando para ${contact} (reservadamente)`;
  }
}

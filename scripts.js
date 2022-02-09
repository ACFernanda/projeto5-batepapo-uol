const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
promise.then(processarResposta);

function processarResposta(response) {
  console.log(response.data);
}

import nookies from 'nookies';
// Ports & Adapters



export async function Login(fetchUrl, fetchOptions) {
  var details = {
    'email': `${fetchOptions.body.email}`,
    'senha': `${fetchOptions.body.senha}`
  };

  console.log("teste: ", details)
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const defaultHeaders = fetchOptions.headers || {};
  const options = {
    ...fetchOptions,
    headers: {
      'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8",
      ...defaultHeaders,
    },
    body: formBody
  };


  return fetch(fetchUrl, options)
    .then((respostaDoServidor) => {
      return respostaDoServidor.json();
    })
}


export async function AtualizaToken(fetchUrl, fetchOptions) {
  var details = {
    refresh_token: `${fetchOptions.body.refresh_token}`
  };

  console.log("teste: ", details)

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': "application/json",
    },
    body: JSON.stringify(details)
  };

  fetch(fetchUrl, options).then((respostaDoServidor) => {
    console.log("ENTROU AQUI PRIMEIRO")
    console.log("HttpClientRefreshToken: ", respostaDoServidor)
    return respostaDoServidor;
  })
}

export async function Session(fetchUrl, fetchOptions) {
  const defaultHeaders = fetchOptions.headers || {};
  const options = {
    ...fetchOptions,
    headers: {
      ...defaultHeaders,
    }
  };

  return fetch(fetchUrl, options)
  .then((response) => {
    const data = response.json();
    return data;
  }).then((data) => {
    return data;
  })

}

export async function CreateAccount(fetchUrl, fetchOptions) {
  var details = {
    'nome': `${fetchOptions.body.nome}`,
    'email': `${fetchOptions.body.email}`,
    'senha': `${fetchOptions.body.senha}`,
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const defaultHeaders = fetchOptions.headers || {};
  const options = {
    ...fetchOptions,
    headers: {
      'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8",
      ...defaultHeaders,
    },
    body: formBody
  };

  console.log(options.body)

  return fetch(fetchUrl, options)
    .then((respostaDoServidor) => {
      console.log("RespostaFRONT: ", respostaDoServidor)
      return respostaDoServidor.json();
    })
}

export async function CreatePost(fetchUrl, fetchOptions) {
  var details = {
    'titulo': `${fetchOptions.body.title}`,
    'conteudo': `${fetchOptions.body.content}`,
  };

  console.log("Details: ", details)

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const defaultHeaders = fetchOptions.headers || {};
  const options = {
    ...fetchOptions,
    headers: {
      'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8",
      ...defaultHeaders,
    },
    body: formBody
  };

  console.log("Options: ", options)

  return fetch(fetchUrl, options)
    .then((respostaDoServidor) => {
      console.log("RespostaFRONT: ", respostaDoServidor)
      return respostaDoServidor;
    })
}
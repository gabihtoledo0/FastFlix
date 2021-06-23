function fazGet() {
  let request = new XMLHttpRequest()

  const URLAPP = 'http://localhost:9007/fichas';

  request.open("GET", URLAPP, false)
  request.send()
  return request.responseText
}

function criarLinha(clientes){
  let linha = document.createElement("tr");
  let tdId = document.createElement("td");
  let tdName = document.createElement("td");
  let tdEmail = document.createElement("td");
  let tdDtCadastro = document.createElement("td");
  let tdAcoes = document.createElement("td");

  let btnCode = `<a class='btn btn-success btn-xs'
  href='view.html'>Visualizar</a><a class='btn btn-warning btn-xs' href='edit.html'>Editar</a><button class='btn btn-closed btn-xs'  data-toggle='modal' data-target='#delete-modal' id="button-excluir">Excluir</button>`

  tdAcoes.setAttribute('class', 'actions');

  tdId.innerHTML = clientes.customerID
  tdName.innerHTML = clientes.nome
  tdEmail.innerHTML = clientes.email
  tdDtCadastro.innerHTML = clientes.dtcadastro
  tdAcoes.innerHTML = btnCode

  linha.appendChild(tdId);
  linha.appendChild(tdName);
  linha.appendChild(tdEmail);
  linha.appendChild(tdDtCadastro);
  linha.appendChild(tdAcoes);

  return linha;
}

function main() {
  let data = fazGet();
  let clientes = JSON.parse(data);
  let tbody = document.getElementById("tbody");

  clientes.forEach(element => {
    tbody.appendChild(criarLinha(element));
  })
}

function removed(){
  // let input = $('#button-excluir').data("id") 
  let id = document.getElementById("id-cliente").value
  let resultado = ''

  const URLAPP = 'http://localhost:9007';

  if(id === '') {
    $('#delete-modal').modal('hide');
    resultado = "Insira um id para deletar o cliente";
    document.getElementById("res").innerText = resultado

  } else {
    axios.delete(URLAPP + '/fichas/' + id)
    .then(function(response) {
      if (response.status == 200) {
        window.location.reload()
      }
      if (response.status == 204) {
        $('#delete-modal').modal('hide');
        document.getElementById("res").innerText = "Ficha " + id + " não existe";
      }
    })
    .catch(function(error) {
        // handle error
        if (error.response) {
            console.log(error.response.data);
            if (error.response.status == 409) {
                resultado = "Id não existe";
                document.getElementById("res").innerText = resultado
            }
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    });
  }
}

function edit(){
  let id = document.getElementById("id-cliente").value

  if(id === '') {
    resultado = "Insira um id para visualizar o cliente";
    document.getElementById("res").innerText = resultado
  } else {
    localStorage.setItem("id-cliente", id)
    return window.location.href = "./edit.html"
  }
}

main()


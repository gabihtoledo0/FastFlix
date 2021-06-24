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
  let tdCPF = document.createElement("td");

  tdId.innerHTML = clientes.customerID
  tdName.innerHTML = clientes.nome
  tdEmail.innerHTML = clientes.email
  tdDtCadastro.innerHTML = clientes.dtcadastro
  tdCPF.innerHTML = clientes.cpf

  linha.appendChild(tdId);
  linha.appendChild(tdName);
  linha.appendChild(tdEmail);
  linha.appendChild(tdCPF);
  linha.appendChild(tdDtCadastro);

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
        document.getElementById("res").innerText = "ID " + id + " não existe";
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
  let resultado = ''
  const URLAPP = 'http://localhost:9007';

  if(id !== ""){
    axios.get(URLAPP + '/fichas/' + id)
    .then(function(response) {
      if(response.status == 200){
        localStorage.setItem("id-cliente", id)
        return window.location.href = "./edit.html"
      }
      if (response.status == 204) {
        return document.getElementById("res").innerText = "ID " + id + " não existe";
      }
    })
      .catch(function(error) {
        if (error.response) {
          resultado = "Insira um id para visualizar o cliente";
          return document.getElementById("res").innerText = resultado
      }
    });
  } else {
    resultado = "Insira um id para visualizar o cliente";
    document.getElementById("res").innerText = resultado
  }
}

function visualizar(){
  const URLAPP = 'http://localhost:9007';

  const customerID = document.getElementById("id-cliente").value
  let ficha = {};
  let resultado = ''

  if(customerID !== ""){
    axios.get(URLAPP + '/fichas/' + customerID)
    .then(function(response) {
      if (response.status == 200) {
        $("#modalVisualizar").modal({
          show: true
        });

        ficha = response.data;
        document.getElementById("CPF").innerHTML = ficha.cpf;
        document.getElementById("name").innerHTML = ficha.nome;
        document.getElementById("email").innerHTML = ficha.email;
        document.getElementById("CEP").innerHTML = ficha.cep;
        document.getElementById("Telefone").innerHTML = ficha.celular;
        document.getElementById("Pais").innerHTML = ficha.pais;
        document.getElementById("Cidade").innerHTML = ficha.cidade;
        document.getElementById("dtCadastro").innerHTML = ficha.dtcadastro
        document.getElementById("dtNascimento").innerHTML = ficha.dtnascimento
        document.getElementById("Logradouro").innerHTML = ficha.logradouro
        document.getElementById("Numero").innerHTML = ficha.ncasa
      }
      if (response.status == 204) {
        return document.getElementById("res").innerText = "ID " + customerID + " não existe";
      }
    })
    .catch(function(error) {
      if (error.response) {
        resultado = "Insira um id para visualizar o cliente";
        return document.getElementById("res").innerText = resultado
      }
    });
  } else {
    resultado = "Insira um id para visualizar o cliente";
    document.getElementById("res").innerText = resultado
  }

  
}

main()


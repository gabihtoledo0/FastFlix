function prevent(e) {
  e.preventDefault();
}

class Validator {

    constructor() {
      this.validations = [
        'data-min-length',
        'data-max-length',
        'data-only-letters',
        'data-email-validate',
        'data-required',
        'data-equal',
        'data-password-validate',
      ]
    }
  
    // inicia a validação de todos os campos
    validate(form) {
  
      // limpa todas as validações antigas
      let currentValidations = document.querySelectorAll('form .error-validation');
  
      if(currentValidations.length) {
        this.cleanValidations(currentValidations);
      }
  
      // pegar todos inputs
      let inputs = form.getElementsByTagName('input');
      // transformar HTMLCollection em arr
      let inputsArray = [...inputs];
  
      // loop nos inputs e validação mediante aos atributos encontrados
      inputsArray.forEach(function(input, obj) {
  
        // fazer validação de acordo com o atributo do input
        for(let i = 0; this.validations.length > i; i++) {
          if(input.getAttribute(this.validations[i]) != null) {
  
            // limpa string para saber o método
            let method = this.validations[i].replace("data-", "").replace("-", "");
  
            // valor do input
            let value = input.getAttribute(this.validations[i])
  
            // invoca o método
            this[method](input,value);

          }
        }
      }, this);

    }

    // método para validar se tem um mínimo de caracteres
    minlength(input, minValue) {
  
      let inputLength = input.value.length;
  
      let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;
  
      if(inputLength < minValue) {
        this.printMessage(input, errorMessage);
      }
  
    }
  
    // método para validar se passou do máximo de caracteres
    maxlength(input, maxValue) {
  
      let inputLength = input.value.length;
  
      let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;
  
      if(inputLength > maxValue) {
        this.printMessage(input, errorMessage);
      }
  
    }
  
    // método para validar strings que só contem letras
    onlyletters(input) {
  
      let re = /^[A-Za-z]+$/;;
  
      let inputValue = input.value;
  
      let errorMessage = `Este campo não aceita números nem caracteres especiais`;
  
      if(!re.test(inputValue)) {
        this.printMessage(input, errorMessage);
      }
  
    }
  
    // método para validar e-mail
    emailvalidate(input) {
      let re = /\S+@\S+\.\S+/;
  
      let email = input.value;
  
      let errorMessage = `Insira um e-mail no padrão matheus@email.com`;
  
      if(!re.test(email)) {
        this.printMessage(input, errorMessage);
      }
  
    }
  
    // verificar se um campo está igual o outro
    equal(input, inputName) {
  
      let inputToCompare = document.getElementsByName(inputName)[0];
      let errorMessage = `Este campo precisa estar igual ao ${inputName}`;
  
      if(input.value != inputToCompare.value) {
        this.printMessage(input, errorMessage);
      }
    }
    
    // método para exibir inputs que são necessários
    required(input) {
  
      let inputValue = input.value;
  
      if(inputValue === '') {
        
        let errorMessage = `Este campo é obrigatório`;

        this.printMessage(input, errorMessage);
      }
  
    }
  
    // validando o campo de senha
    passwordvalidate(input) {
  
      // explodir string em array
      let charArr = input.value.split("");
  
      let uppercases = 0;
      let numbers = 0;
  
      for(let i = 0; charArr.length > i; i++) {
        if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
          uppercases++;
        } else if(!isNaN(parseInt(charArr[i]))) {
          numbers++;
        }
      }
  
      if(uppercases === 0 || numbers === 0) {
        let errorMessage = `A senha precisa um caractere maiúsculo e um número`;
  
        this.printMessage(input, errorMessage);
      }
  
    }
  
    // método para imprimir mensagens de erro
    printMessage(input, msg) {
    
      // checa os erros presentes no input
      let errorsQty = input.parentNode.querySelector('.error-validation');
  
      // imprimir erro só se não tiver erros
      if(errorsQty === null) {
        let template = document.querySelector('.error-validation').cloneNode(true);
  
        template.textContent = msg;
    
        let inputParent = input.parentNode;
    
        template.classList.remove('template');
    
        inputParent.appendChild(template);
      }
  
    }
  
    // remove todas as validações para fazer a checagem novamente
    cleanValidations(validations) {
      validations.forEach(el => el.remove());
    }
}

function criarCliente() {
  let form = document.getElementById('register-form');

  

  let validator = new Validator();
  let valid = true;

  const URLAPP = 'http://localhost:9007';

  const data = new Date();
  const ano = data.getFullYear()
  const mes = data.getMonth()
  const dia = data.getDay()

  let ficha = {};

  ficha.cpf = parseInt(document.getElementById("CPF").value);
  ficha.nome = document.getElementById("name").value;
  ficha.email = document.getElementById("email").value;
  ficha.cep = document.getElementById("CEP").value;
  ficha.celular = document.getElementById("Telefone").value;
  ficha.pais = document.getElementById("Pais").value;
  ficha.cidade = document.getElementById("Cidade").value;
  ficha.senha = document.getElementById("password").value;
  ficha.dtcadastro = dia + "/"+ mes +"/" + ano;
  ficha.logradouro = document.getElementById("Logradouro").value;
  ficha.ncasa = document.getElementById("Numero").value;

  var inputs = form.getElementsByTagName('input')
  let currentValidations = document.querySelectorAll('form .error-validation');

  var len = inputs.length;
  var validation = $(currentValidations).hasClass("error-validation")

  for (var i = 0; i < inputs.length; i++) inputs[i].onblur = function(){ this.classList.add('hl'); }

  for (var i = 0; i < inputs.length; i++) inputs[i].classList.add('hl')
  
  for(var i=0; i < len; i++){
     if (!inputs[i].value){ 
       valid = false;
      }
  }

  if (!valid || validation == true){
    validator.validate(form)
    console.log("falso")
    return false;
  } else {
    axios.post(URLAPP + '/fichas', ficha)
    .then(function(response) {
        if (response.status == 201) {
            console.log(response.data)
            $("#modalSucess").modal({
              show: true
            });
            // document.getElementById("res").innerText = "Ficha " + ficha.nome + " inserida com sucesso";
        }
    })
    .catch(function(error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            if (error.response.status == 409) {
              console.log("error")
                // document.getElementById("res").innerText = "Ficha " + ficha.cpf + " em duplicidade";
            }
        } else {
            console.log('Error', error.message);
        }
    });
    return true;
   }
}

function validate(input) {

  if (formSubmittedOnce === true) {

    if (input.hasAttribute('required')) {
      if (input.value.trim() == '') {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        return false;
      } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        return true;
      }
    } else {
      // if we get here, then any other inputs not marked as 'required' are valid
      input.classList.add('is-valid');
    }

  }

}


  

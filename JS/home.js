document.addEventListener('keydown', function(e){
  if(e.keyCode == 13){
     e.preventDefault()
     passwordEmployee()
  }
}, false);

function passwordEmployee() {
  var passwordEmployee = $('#password-employee');

  if (passwordEmployee.val() !== 'FastFlix@1904') {
    passwordEmployee.addClass('error');
    $("#res").html('Senha inválida').addClass('text-error');
  } else {
    $(location).attr('href', 'Clientes.html');
  }
}


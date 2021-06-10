function criarCliente( ){
  let clientes = {
    email: 'gabi@gabi.com'
  }
  
  const url = 'https://git.heroku.com/spring-boot-java-fastflix.git'
  
  axios.post(url, clientes)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

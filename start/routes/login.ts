import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'UsuariosController.login')
}).prefix('login')

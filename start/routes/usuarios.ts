import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'UsuariosController.list')
  Route.post('/', 'UsuariosController.store')
  Route.get('/:id', 'UsuariosController.find')
  Route.put('/:id', 'UsuariosController.update')
  Route.delete('/:id', 'UsuariosController.delete')
})
  //.middleware('auth')
  .prefix('usuarios')

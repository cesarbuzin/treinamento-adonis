import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'EstadosController.list')
  Route.post('/', 'EstadosController.store')
  Route.get('/:id_estado', 'EstadosController.find')
  Route.put('/:id_estado', 'EstadosController.update')
  Route.delete('/:id_estado', 'EstadosController.delete')
})
  .middleware('auth')
  .prefix('estados')

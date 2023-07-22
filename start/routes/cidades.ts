import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'CidadesController.list')
  Route.post('/', 'CidadesController.store')
  Route.get('/:id_cidade', 'CidadesController.find')
  Route.put('/:id_cidade', 'CidadesController.update')
  Route.delete('/:id_cidade', 'CidadesController.delete')
})
  .middleware('auth')
  .prefix('cidades')

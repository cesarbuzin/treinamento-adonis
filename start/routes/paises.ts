import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'PaisesController.list')
  Route.post('/', 'PaisesController.store')
  Route.get('/:id_pais', 'PaisesController.find')
  Route.put('/:id_pais', 'PaisesController.update')
  Route.delete('/:id_pais', 'PaisesController.delete')
})
  .middleware('auth')
  .prefix('paises')

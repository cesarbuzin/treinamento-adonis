import Paises from 'App/Models/Paises'
import GenericResponseException from 'App/exceptions/GenericResponseException'

export class PaisesRepository {
  public async save(paises: Paises): Promise<Paises> {
    return await Paises.create(paises)
  }

  public async list(): Promise<Paises[]> {
    return await Paises.all()
  }

  public async findById(id_pais: string): Promise<Paises | null> {
    return await Paises.findBy('id_pais', id_pais)
  }

  public async update(id_pais: String, paises: Paises): Promise<Paises> {
    const paisesSaved = await Paises.findOrFail(id_pais)

    if (paisesSaved === null) {
      throw new GenericResponseException('País informado não encontrado para atualização', 400)
    }

    return await paisesSaved
      .merge(paises)
      .save()
      .catch((erro) => {
        throw new GenericResponseException(erro.message, 500)
      })
  }

  public async delete(id_pais: string): Promise<string> {
    const paisesSaved = await Paises.findOrFail(id_pais)

    if (paisesSaved === null) {
      throw new GenericResponseException('País informado não encontrado para atualização', 400)
    }

    await paisesSaved.delete()

    return paisesSaved.id_pais
  }
}

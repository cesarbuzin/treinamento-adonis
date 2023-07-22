import Cidades from 'App/Models/Cidades'
import GenericResponseException from 'App/exceptions/GenericResponseException'

export class CidadesRepository {
  public async save(cidades: Cidades): Promise<Cidades> {
    return await Cidades.create(cidades)
  }

  public async list(): Promise<Cidades[]> {
    return await Cidades.all()
  }

  public async findById(id_cidade: string): Promise<Cidades | null> {
    const cidades = await Cidades.query()
      .preload('estados')
      .preload('paises')
      .where('id_cidade', id_cidade)
      .firstOrFail()
    return cidades
  }

  public async update(id_cidade: String, cidades: Cidades): Promise<Cidades> {
    const cidadesSaved = await Cidades.findOrFail(id_cidade)

    if (cidadesSaved === null) {
      throw new GenericResponseException('Cidade informada não encontrada para atualização', 400)
    }

    return await cidadesSaved
      .merge(cidades)
      .save()
      .catch((erro) => {
        throw new GenericResponseException(erro.message, 500)
      })
  }

  public async delete(id_cidade: string): Promise<string> {
    const cidadesSaved = await Cidades.findOrFail(id_cidade)

    if (cidadesSaved === null) {
      throw new GenericResponseException('Cidade informada não encontrada para atualização', 400)
    }

    await cidadesSaved.delete()

    return cidadesSaved.id_cidade
  }
}

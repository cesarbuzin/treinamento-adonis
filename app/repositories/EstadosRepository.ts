import Estados from 'App/Models/Estados'
import GenericResponseException from 'App/exceptions/GenericResponseException'

export class EstadosRepository {
  public async save(estados: Estados): Promise<Estados> {
    return await Estados.create(estados)
  }

  public async list(): Promise<Estados[]> {
    return await Estados.all()
  }

  public async findById(id_estado: string): Promise<Estados | null> {
    return await Estados.findBy('id_estado', id_estado)
  }

  public async update(id_estado: String, estados: Estados): Promise<Estados> {
    const estadosSaved = await Estados.findOrFail(id_estado)

    if (estadosSaved === null) {
      throw new GenericResponseException('Estado informado não encontrado para atualização', 400)
    }

    return await estadosSaved
      .merge(estados)
      .save()
      .catch((erro) => {
        throw new GenericResponseException(erro.message, 500)
      })
  }

  public async delete(id_estado: string): Promise<string> {
    const estadosSaved = await Estados.findOrFail(id_estado)

    if (estadosSaved === null) {
      throw new GenericResponseException('Estado informado não encontrado para atualização', 400)
    }

    await estadosSaved.delete()

    return estadosSaved.id_estado
  }
}

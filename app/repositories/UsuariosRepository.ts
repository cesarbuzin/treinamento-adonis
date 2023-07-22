import Usuarios from 'App/Models/Usuario'
import GenericResponseException from 'App/exceptions/GenericResponseException'

export class UsuariosRepository {
  public async save(usuarios: Usuarios): Promise<Usuarios> {
    return await Usuarios.create(usuarios)
  }

  public async list(): Promise<Usuarios[]> {
    return await Usuarios.all()
  }

  public async findById(id_usuario: string): Promise<Usuarios | null> {
    return await Usuarios.findBy('id_usuario', id_usuario)
  }

  public async update(id_usuario: String, usuarios: Usuarios): Promise<Usuarios> {
    const usuariosSaved = await Usuarios.findOrFail(id_usuario)

    if (usuariosSaved === null) {
      throw new GenericResponseException('Usuario informado não encontrado para atualização', 400)
    }

    return await usuariosSaved
      .merge(usuarios)
      .save()
      .catch((erro) => {
        throw new GenericResponseException(erro.message, 500)
      })
  }

  public async delete(id_usuario: string): Promise<string> {
    const usuariosSaved = await Usuarios.findOrFail(id_usuario)

    if (usuariosSaved === null) {
      throw new GenericResponseException('Usuario informado não encontrado para atualização', 400)
    }

    await usuariosSaved.delete()

    return usuariosSaved.id
  }
}

import { ErrorUtil } from './../../Utils/ErrorUtil'
import { UsuariosRepository } from './../../repositories/UsuariosRepository'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import DataValidator from 'App/validators/Usuarios/DataValidator'
import LoginValidator from 'App/validators/Login/LoginValidator'
import SearchDataValidator from 'App/validators/Usuarios/SearchDataValidator'
import UpdateDataValidator from 'App/validators/Usuarios/UpdateDataValidator'
import Hash from '@ioc:Adonis/Core/Hash'
import GenericResponseException from 'App/exceptions/GenericResponseException'

export default class UsuariosController {
  private readonly _usuariosRepository: UsuariosRepository
  constructor() {
    this._usuariosRepository = new UsuariosRepository()
  }

  async login({ auth, response, request }: HttpContextContract) {
    const usuario: Usuario = await Object.assign(request.validate(LoginValidator))
    try {
      console.log(await Hash.make(usuario.password))

      const token = await auth.attempt(usuario.login, usuario.password)

      return response.status(200).send(token.toJSON())
    } catch (error) {
      if (error instanceof GenericResponseException) {
        return response.status(error.statusCode).send(ErrorUtil.jsonDefault(error.message))
      } else {
        return response.status(422).send(ErrorUtil.jsonDefault('Erro inesperado'))
      }
    }
  }

  async list({ response }: HttpContextContract) {
    try {
      const usuarios = await this._usuariosRepository.list()
      console.log(usuarios)
      return response.ok(usuarios)
    } catch (error) {
      if (error instanceof GenericResponseException) {
        return response.status(error.statusCode).send(ErrorUtil.jsonDefault(error.message))
      } else {
        return response.status(422).send(ErrorUtil.jsonDefault('Erro inesperado'))
      }
    }
  }

  async store({ response, request }: HttpContextContract) {
    const usuarios: Usuario = await Object.assign(request.validate(DataValidator))
    try {
      return response.status(201).send(await this._usuariosRepository.save(usuarios))
    } catch (error) {
      if (error instanceof GenericResponseException) {
        return response.status(error.statusCode).send(ErrorUtil.jsonDefault(error.message))
      } else {
        return response.status(422).send(ErrorUtil.jsonDefault('Erro inesperado'))
      }
    }
  }

  async find({ response, params, request }: HttpContextContract) {
    await Object.assign(request.validate(SearchDataValidator))
    try {
      var usuarios = await this._usuariosRepository.findById(params.id_usuario)
      console.log(usuarios)
      return usuarios ? response.status(200).send(usuarios) : response.status(204)
    } catch (error) {
      if (error instanceof GenericResponseException) {
        return response.status(error.statusCode).send(ErrorUtil.jsonDefault(error.message))
      } else {
        return response.status(422).send(ErrorUtil.jsonDefault('Erro inesperado'))
      }
    }
  }

  async update({ response, params, request }: HttpContextContract) {
    await request.validate(SearchDataValidator)

    const usuarios: Usuario = await Object.assign(request.validate(UpdateDataValidator))
    try {
      return response
        .status(200)
        .send(await this._usuariosRepository.update(params.id_usuario, usuarios))
    } catch (error) {
      if (error instanceof GenericResponseException) {
        return response.status(error.statusCode).send(ErrorUtil.jsonDefault(error.message))
      } else {
        return response.status(422).send(ErrorUtil.jsonDefault('Erro inesperado'))
      }
    }
  }

  async delete({ request, response, params }: HttpContextContract) {
    await Object.assign(request.validate(SearchDataValidator))
    try {
      return response.status(204).send(await this._usuariosRepository.delete(params.id_usuario))
    } catch (error) {
      if (error instanceof GenericResponseException) {
        return response.status(error.statusCode).send(ErrorUtil.jsonDefault(error.message))
      } else {
        return response.status(422).send(ErrorUtil.jsonDefault('Erro inesperado'))
      }
    }
  }
}

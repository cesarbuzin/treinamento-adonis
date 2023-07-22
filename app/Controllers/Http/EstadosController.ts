import { ErrorUtil } from './../../Utils/ErrorUtil'

import DataValidator from 'App/validators/Estados/DataValidator'
import { EstadosRepository } from './../../repositories/EstadosRepository'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SearchDataValidator from 'App/validators/Estados/SearchDataValidator'
import UpdateDataValidator from 'App/validators/Estados/UpdateDataValidator'
import Estados from 'App/Models/Estados'
import GenericResponseException from 'App/exceptions/GenericResponseException'

export default class EstadosController {
  private readonly _estadosRepository: EstadosRepository
  constructor() {
    this._estadosRepository = new EstadosRepository()
  }

  async list({ response }: HttpContextContract) {
    try {
      const estados = await this._estadosRepository.list()
      return response.ok(estados)
    } catch (error) {
      if (error instanceof GenericResponseException) {
        return response.status(error.statusCode).send(ErrorUtil.jsonDefault(error.message))
      } else {
        return response.status(422).send(ErrorUtil.jsonDefault('Erro inesperado'))
      }
    }
  }

  async store({ response, request }: HttpContextContract) {
    const estados: Estados = await Object.assign(request.validate(DataValidator))
    try {
      return response.status(201).send(await this._estadosRepository.save(estados))
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
      var estados = await this._estadosRepository.findById(params.id_estado)
      console.log(estados)
      return estados ? response.status(200).send(estados) : response.status(204)
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

    const estados: Estados = await Object.assign(request.validate(UpdateDataValidator))
    try {
      return response
        .status(200)
        .send(await this._estadosRepository.update(params.id_estado, estados))
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
      return response.status(204).send(await this._estadosRepository.delete(params.id_estado))
    } catch (error) {
      if (error instanceof GenericResponseException) {
        return response.status(error.statusCode).send(ErrorUtil.jsonDefault(error.message))
      } else {
        return response.status(422).send(ErrorUtil.jsonDefault('Erro inesperado'))
      }
    }
  }
}

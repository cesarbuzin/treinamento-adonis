import { ErrorUtil } from './../../Utils/ErrorUtil'
import { PaisesRepository } from './../../repositories/PaisesRepository'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Paises from 'App/Models/Paises'
import GenericResponseException from 'App/exceptions/GenericResponseException'
import DataValidator from 'App/validators/Paises/DataValidator'
import SearchDataValidator from 'App/validators/Paises/SearchDataValidator'
import UpdateDataValidator from 'App/validators/Paises/UpdateDataValidator'

export default class PaisesController {
  private readonly _paisesRepository: PaisesRepository
  constructor() {
    this._paisesRepository = new PaisesRepository()
  }

  async list({ response }: HttpContextContract) {
    try {
      const paises = await this._paisesRepository.list()
      console.log(paises)
      return response.ok(paises)
    } catch (error) {
      if (error instanceof GenericResponseException) {
        return response.status(error.statusCode).send(ErrorUtil.jsonDefault(error.message))
      } else {
        return response.status(422).send(ErrorUtil.jsonDefault('Erro inesperado'))
      }
    }
  }

  async store({ response, request }: HttpContextContract) {
    const paises: Paises = await Object.assign(request.validate(DataValidator))
    try {
      return response.status(201).send(await this._paisesRepository.save(paises))
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
      var paises = await this._paisesRepository.findById(params.id_pais)
      console.log(paises)
      return paises ? response.status(200).send(paises) : response.status(204)
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

    const paises: Paises = await Object.assign(request.validate(UpdateDataValidator))
    try {
      return response.status(200).send(await this._paisesRepository.update(params.id_pais, paises))
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
      return response.status(204).send(await this._paisesRepository.delete(params.id_pais))
    } catch (error) {
      if (error instanceof GenericResponseException) {
        return response.status(error.statusCode).send(ErrorUtil.jsonDefault(error.message))
      } else {
        return response.status(422).send(ErrorUtil.jsonDefault('Erro inesperado'))
      }
    }
  }
}

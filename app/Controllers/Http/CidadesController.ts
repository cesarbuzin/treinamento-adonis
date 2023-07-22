import { ErrorUtil } from './../../Utils/ErrorUtil'
import { WsIbgeUtil } from '../../Utils/WsIbgeUtil'
import DataValidator from 'App/validators/Cidades/DataValidator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SearchDataValidator from 'App/validators/Cidades/SearchDataValidator'
import UpdateDataValidator from 'App/validators/Cidades/UpdateDataValidator'
import { CidadesRepository } from 'App/repositories/CidadesRepository'
import Cidades from 'App/Models/Cidades'
import GenericResponseException from 'App/exceptions/GenericResponseException'

export default class CidadesController {
  private readonly _cidadesRepository: CidadesRepository
  constructor() {
    this._cidadesRepository = new CidadesRepository()
  }

  async list({ response }: HttpContextContract) {
    try {
      const cidades = await this._cidadesRepository.list()
      return response.ok(cidades)
    } catch (error) {
      if (error instanceof GenericResponseException) {
        return response.status(error.statusCode).send(ErrorUtil.jsonDefault(error.message))
      } else {
        return response.status(422).send(ErrorUtil.jsonDefault('Erro inesperado'))
      }
    }
  }

  async store({ response, request }: HttpContextContract) {
    const cidades: Cidades = await Object.assign(request.validate(DataValidator))
    try {
      if (cidades.nom_cidade == null && cidades.id_ibge == null) {
        return response
          .status(422)
          .send(
            ErrorUtil.jsonUnique(
              'required',
              'nom_cidade | id_ibge',
              'É necessário preencher o campo nom_cidade ou o campo id_ibge'
            )
          )
      }

      if (cidades.nom_cidade != null && cidades.id_ibge == null) {
        const codigoIbge = await WsIbgeUtil.findCodigoIbge(cidades.nom_cidade)
        if (codigoIbge != null) {
          cidades.id_ibge = codigoIbge
        } else {
          return response
            .status(422)
            .send(
              ErrorUtil.jsonUnique(
                'validation',
                'nom_cidade',
                'Cidade não existente para o nome da cidade informado'
              )
            )
        }
      }
      if (cidades.nom_cidade == null && cidades.id_ibge != null) {
        const nomCidade = await WsIbgeUtil.findNomCidade(cidades.id_ibge)
        if (nomCidade != null) {
          cidades.nom_cidade = nomCidade
        } else {
          return response
            .status(422)
            .send(
              ErrorUtil.jsonUnique(
                'validation',
                'id_ibge',
                'Cidade não existente para o código de IBGE informado'
              )
            )
        }
      }

      return response.status(201).send(await this._cidadesRepository.save(cidades))
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
      return response.status(200).send(await this._cidadesRepository.findById(params.id_cidade))
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
    const cidades: Cidades = await Object.assign(request.validate(UpdateDataValidator))
    try {
      return response
        .status(200)
        .send(await this._cidadesRepository.update(params.id_cidade, cidades))
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
      return response.status(204).send(await this._cidadesRepository.delete(params.id_cidade))
    } catch (error) {
      if (error instanceof GenericResponseException) {
        return response.status(error.statusCode).send(ErrorUtil.jsonDefault(error.message))
      } else {
        return response.status(422).send(ErrorUtil.jsonDefault('Erro inesperado'))
      }
    }
  }
}

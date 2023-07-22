import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'

export default class SearchDataValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    params: schema.object().members({
      id_estado: schema.string([
        rules.trim(),
        rules.uuid({ version: 4 }),
        rules.exists({ table: 'estados', column: 'id_estado' }),
      ]),
    }),
  })

  public messages: CustomMessages = {
    required: 'É necessário preencher o campo {{ field }}',
    minLength: 'Informe no minimo 3 caracteres no campo {{ field }}',
    maxLength: 'Informe no máximo 400 caracteres no campo {{ field }}',
    uuid: 'Necessário informar um ID no formato UUID V4 no campo {{ field }}',
    exists: 'Campo {{ field }} não faz referência a um registro cadastrado',
  }
}

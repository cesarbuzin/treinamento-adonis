import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'

export default class UpdateDataValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nom_usuario: schema.string.optional({}, [
      rules.trim(),
      rules.maxLength(400),
      rules.minLength(3),
    ]),
    login: schema.string.optional({}, [
      rules.trim(),
      rules.maxLength(400),
      rules.minLength(3),
      rules.unique({ table: 'usuarios', column: 'login' }),
    ]),
    password: schema.string.optional({}, [rules.trim(), rules.maxLength(400), rules.minLength(6)]),
    //old_password: schema.string.optional({}, [rules.trim(), rules.maxLength(400), rules.minLength(6)]),
  })

  public messages: CustomMessages = {
    required: 'É necessário preencher o campo {{ field }}',
    minLength: 'Informe no minimo 3 caracteres no campo {{ field }}',
    maxLength: 'Informe no máximo 400 caracteres no campo {{ field }}',
    uuid: 'Necessário informar um ID no formato UUID V4 no campo {{ field }}',
    unique: 'Campo {{ field }} já existe com o valor informado',
  }
}

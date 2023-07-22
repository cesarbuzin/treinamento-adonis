import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'

export default class DataValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nom_usuario: schema.string({}, [rules.trim(), rules.maxLength(400), rules.minLength(3)]),
    login: schema.string({}, [
      rules.trim(),
      rules.maxLength(400),
      rules.minLength(3),
      rules.unique({ table: 'usuarios', column: 'login' }),
    ]),
    password: schema.string({}, [rules.trim(), rules.maxLength(400), rules.minLength(6)]),
  })

  public messages: CustomMessages = {
    'required': 'É necessário preencher o campo {{ field }}',
    'nom_usuario.minLength': 'Informe no minimo 3 caracteres no campo {{ field }}',
    'login.minLength': 'Informe no minimo 3 caracteres no campo {{ field }}',
    'password.minLength': 'Informe no minimo 6 caracteres no campo {{ field }}',
    'maxLength': 'Informe no máximo 400 caracteres no campo {{ field }}',
    'unique': 'Campo {{ field }} já existe com o valor informado',
  }
}

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    login: schema.string({}, [rules.trim(), rules.maxLength(400), rules.minLength(3)]),
    password: schema.string({}, [rules.trim(), rules.maxLength(400), rules.minLength(3)]),
  })

  public messages: CustomMessages = {
    required: 'É necessário preencher o campo {{ field }}',
    minLength: 'Informe no minimo 3 caracteres no campo {{ field }}',
    maxLength: 'Informe no máximo 400 caracteres no campo {{ field }}',
  }
}

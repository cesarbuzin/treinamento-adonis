import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'

export default class GenericResponseException extends Exception {
  constructor(
    message: string,
    public readonly statusCode: number,
    protected data: Object = []
  ) {
    super(message)
  }
  public async handle(error: this, ctx: HttpContextContract): Promise<void> {
    const statusCode = this.statusCode
    ctx.response.status(statusCode).send({
      message: error.message,
      code: this.status,
      datetime: DateTime.now(),
    })
  }
}

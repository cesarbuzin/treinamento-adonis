import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class App extends BaseModel {
  @column()
  public username: string
  @column({ serializeAs: null })
  public password: string
}

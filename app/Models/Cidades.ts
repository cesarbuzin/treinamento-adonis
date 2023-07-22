import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Estados from './Estados'
import Paises from './Paises'

export default class Cidades extends BaseModel {
  @column({ isPrimary: true })
  public id_cidade: string

  @column()
  public nom_cidade: string

  @column()
  public id_ibge: number

  @column()
  public id_estado: string

  @belongsTo(() => Estados, {localKey: 'id_estado', foreignKey: 'id_estado'})
  estados: BelongsTo<typeof Estados>;

  @column()
  public id_pais: string

  @belongsTo(() => Paises, {localKey: 'id_pais', foreignKey: 'id_pais'})
  paises: BelongsTo<typeof Paises>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

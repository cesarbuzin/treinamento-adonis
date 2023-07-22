import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'paises'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id_pais').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.string('nom_pais', 400).unique().notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

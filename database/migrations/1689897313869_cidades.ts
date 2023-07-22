import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cidades'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id_cidade').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.string('nom_cidade', 400).unique().notNullable()
      table.integer('id_ibge').notNullable()
      table.uuid('id_estado').notNullable().references('id_estado').inTable('estados')
      table.uuid('id_pais').notNullable().references('id_pais').inTable('paises')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

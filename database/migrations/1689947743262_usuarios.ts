import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'usuarios'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.string('nom_usuario', 400).notNullable().unique()
      table.string('login', 400).notNullable().unique()
      table.string('password', 180).notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
    this.schema.toQuery

    this.defer(async (db) => {
      await db.table('usuarios').insert({
        id: '514f61d5-2040-480b-95fd-427e88bb1eea',
        nom_usuario: 'Usuário default SIM',
        login: 'simrede',
        password:
          '$scrypt$n=16384,r=8,p=1$tN4ChD7GF/L2W2EFqLghzw$/CCcaivdn6C/ffBrgneoSsKPqZTZklXI+i8X653PZbSJ0tkD4SJj4R0b0SOiT/BacPcjC85pd4kp3SlCuhsYSA',
        created_at: '2023-07-21 13:57:35.211 -0300',
        updated_at: '2023-07-21 13:57:35.211 -0300',
      })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

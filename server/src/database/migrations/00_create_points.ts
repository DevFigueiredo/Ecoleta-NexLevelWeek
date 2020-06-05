import Knex from 'knex';

//Documentação do Knex http://knexjs.org/
//Funcao para criar a tabela
export async function up(knex: Knex){
  return knex.schema.createTable('points', field=>{
      field.increments('id').primary();
      field.string('image').notNullable();
      field.string('name').notNullable();
      field.string('email').notNullable();
      field.string('whatsapp').notNullable();
      field.decimal('latitude').notNullable();
      field.decimal('longitude').notNullable();
      field.string('city ').notNullable();
      field.string('uf', 2).notNullable();
  })
}

//Desfazer a criação da tabela
export async function down(knex: Knex){
   return knex.schema.dropTable('points');
}

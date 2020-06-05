import Knex from 'knex';

//Documentação do Knex http://knexjs.org/
//Funcao para criar a tabela
export async function up(knex: Knex){
    return knex.schema.createTable('items', field=>{
        field.increments('id').primary();
        field.string('image').notNullable();
        field.string('title').notNullable();
    });
 
}

//Desfazer a criação da tabela
export async function down(knex: Knex){
    return knex.schema.dropTable('items');

}

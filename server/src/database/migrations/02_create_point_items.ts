import Knex from 'knex';

//Documentação do Knex http://knexjs.org/
//Funcao para criar a tabela
export async function up(knex: Knex){
    return knex.schema.createTable('point_items', field=>{
        field.increments('id').primary();
           
        field.integer('point_id').references('id').inTable('points');
        field.integer('item_id').references('id').inTable('items');

    });
 
}

//Desfazer a criação da tabela
export async function down(knex: Knex){
    return knex.schema.dropTable('point_items');

}


exports.up = function(knex, Promise) {
  //ALTER TABLE
  return Promise.all([
    knex.schema.table('milestones', function(table){
      table.integer( 'famous_person_id' ).references( 'id' ).inTable('famous_people');
    })
  ])
};

exports.down = function(knex, Promise) {
  knex.schema.table('milestones', function(table){
    table.dropColumn( 'famous_person_id' )
  })
};

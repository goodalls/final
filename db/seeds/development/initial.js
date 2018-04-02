exports.seed = function(knex, Promise) {
  return knex('list')
    .del()
    .then(() => {
      return knex('list')
        .insert([
          { id: 1, name: 'Moon light', packed: false },
          { id: 2, name: 'The chart of cosmic exploration', packed: false },
          {
            id: 3,
            name: 'Glow-in-the-dark solar system leggings',
            packed: false
          }
        ])
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`));
    });
};

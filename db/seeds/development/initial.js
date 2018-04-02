exports.seed = function(knex, Promise) {
  return knex('list')
    .del()
    .then(() => {
      return knex('list')
        .insert([
          { name: 'Moon light', packed: false },
          { name: 'The chart of cosmic exploration', packed: false },
          {
            name: 'Glow-in-the-dark solar system leggings',
            packed: false
          }
        ])
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`));
    });
};

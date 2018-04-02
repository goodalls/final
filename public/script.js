$('#submit').click(event => {
  event.preventDefault();
  let item = $('#name').val();
  console.log(item);

  fetch('/api/v1/items', {
    method: 'POST',
    body: JSON.stringify({
      name: item,
      packed: 'false'
    }),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(itemID => {
      addToList(itemID);
      item = '';
    })
    .catch(err => {
      throw err;
    });
});

const addToList = id => {
  console.log('addToList', id);
  fetch(`/api/v1/items/${id.id}`)
    .then(response => response.json())
    .then(item => {
      console.log(item[0]);
      let {id, name, packed} = item[0]
      let content = (`
      <article id="${id}" class="card">
      <h4>${name}</h4>
      <label for="packed">Packed</label> 
      <input type="checkbox" value="${packed}" id="packed">
      </article>
    `)
      $('#packing-list').prepend(content);
    });
};

$('#packing-list').click((event) => {
  console.log('listUpdater clicked');
  
})
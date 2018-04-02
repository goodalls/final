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
      <button id="delete">Delete</button>
      </article>
    `)
      $('#packing-list').prepend(content);
    });
};

window.onload = () => {
  fetch('/api/v1/items/')
    .then(response => response.json())
    .then(items => {
      items.forEach((item) => {
        let {id, name, packed} = item
        let content = (`
        <article id="${id}" class="card">
        <h4>${name}</h4>
        <label for="packed">Packed</label> 
        <input type="checkbox" value="${packed}" id="packed">
        <button id="delete">Delete</button>
        </article>
      `)
        $('#packing-list').prepend(content);
      })
    }); 
}

$('#packing-list').click((event) => {
  if (event.target.id === 'delete') {
    const itemID = event.target.closest('article').id
    fetch(`/api/v1/items/${itemID}` , {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(remove => {
      event.target.closest('article').remove();
    })
    .catch(err => {
      throw err;
    })
  }
  if (event.target.id === 'packed') {
    console.log('packed toggled');
    
  }
  
})
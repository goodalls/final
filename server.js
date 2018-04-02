const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Final';

app.get('/', (request, response) => {
  response.send('Final is working');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
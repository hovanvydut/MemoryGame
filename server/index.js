const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  return res.send('Home page');
});

app.listen(PORT, () => console.log(`App has started on port ${PORT}`));

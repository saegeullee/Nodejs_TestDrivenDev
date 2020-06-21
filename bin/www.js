const app = require('../');
const syncDb = require('./sync-db');

const port = 3000;
syncDb().then(_ => {
  console.log('Sync DB');
  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
});

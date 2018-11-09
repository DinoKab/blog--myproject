const app = require('.//app');
const database = require('./datbase');
const config = require('./config');

database()
  .then(info => {
    console.log(`Connect to ${info.host}:${info.port}/${info.name}`);
    app.listen(config.PORT, () =>
      console.log(`Example app listening on part ${config.PORT}!`)
    );
  })
  .catch(() => {
    console.error('Unable to connect to database');
    process.exit(1);
  });

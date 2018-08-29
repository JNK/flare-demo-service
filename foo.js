const {MongoMemoryServer} = require('mongodb-memory-server');

const mongod = new MongoMemoryServer();

const go = async () => {
  const uri = await mongod.getConnectionString();
  const port = await mongod.getPort();
  const dbPath = await mongod.getDbPath();
  const dbName = await mongod.getDbName();

  console.log(uri, port, dbPath, dbName);
}

go();


module.exports.initiateDB = (pool) => {
  pool.connect((err, client, done) => {
    if (err) throw err;
    console.log('Initiating DB for tables in postgres.');
    client.query(
      'CREATE TABLE IF NOT EXISTS users(id VARCHAR(100) PRIMARY KEY, email VARCHAR(100) not null, accessToken VARCHAR(200) not null, password VARCHAR(100) not null, fulnames VARCHAR(100) not null, category VARCHAR(100) not null,resumeid VARCHAR(100) not null,address VARCHAR(100) not null, onofexperience VARCHAR(100) not null, complete BOOLEAN)');

    client.query(
      'CREATE TABLE IF NOT EXISTS careers(id VARCHAR(100) PRIMARY KEY, careertitle VARCHAR(100) not null, category VARCHAR(100) not null, careerStartDate VARCHAR(100) not null, careerEndDate VARCHAR(40) not null,careerDescription VARCHAR(400) not null, complete BOOLEAN)');

    client.query(
      'CREATE TABLE IF NOT EXISTS userscareers(id VARCHAR(100) PRIMARY KEY, careerid VARCHAR(100) not null, userId VARCHAR(100) not null, createdDate VARCHAR(100) not null, complete BOOLEAN)');
    client.query(
      'CREATE TABLE IF NOT EXISTS documents (id VARCHAR(100) PRIMARY KEY, documentname VARCHAR(100) not null, userId VARCHAR(100) not null, createdDate VARCHAR(100) not null, complete BOOLEAN)'); Documents
    done();
  })
}

module.exports.connectConfig = () => {
  return {
    user: 'postgres',
    database: 'careerportal',
    password: 'GhostSeries7',
    port: 5432,
    max: 10, // max number of connection can be open to database
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };
}
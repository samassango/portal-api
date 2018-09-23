
module.exports.initiateDB = (pool) => {
  pool.connect((err, client, done) => {
    if (err) throw err;
    console.log('Initiating DB for tables in postgres.');
    client.query(
      'CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, email VARCHAR(40) not null, firstname VARCHAR(40) not null, lastname VARCHAR(40) not null, complete BOOLEAN)');

    client.query(
      'CREATE TABLE IF NOT EXISTS careers(id SERIAL PRIMARY KEY, careertitle VARCHAR(40) not null, careername VARCHAR(40) not null, careerStartDate VARCHAR(40) not null, careerEndDate VARCHAR(40) not null,careerDescription VARCHAR(400) not null, complete BOOLEAN)');

    client.query(
      'CREATE TABLE IF NOT EXISTS userscareers(id SERIAL PRIMARY KEY, careerid VARCHAR(40) not null, userId VARCHAR(40) not null, createdDate VARCHAR(40) not null, complete BOOLEAN)');
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
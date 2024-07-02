const sql =  require('mssql');

const config = {
    user: 'msusr',
    password: '123',
    server: "DESKTOP-4EFUEQH//SQLEXPRESS",
    database: "CRUD_API",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true,
        trustServerCertificate: true
    }
}

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected Sql server');
        return pool;
    })
    .catch(err => {
        console.log('Failed to connect the SQL Server', err);
    })

module.exports = {
    poolPromise
}
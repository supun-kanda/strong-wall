const { DB } = require('./configurations');
const { Pool } = require('pg')
const pool = new Pool({
    ...DB
})

pool.on('connect', () => {
    console.log("connected to DB");
})

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    },
}

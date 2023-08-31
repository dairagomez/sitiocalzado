var pool = require('./bd');
var md5 = require('md5');


async function getUserAndPassword(user, password) {

    try {

        var query = `SELECT * FROM usuarios WHERE usuario= '${user}' and password = '${password}'`;
        console.log(user,password)
        var rows = await pool.query(query);
        console.log(rows, "getUserAndPassword, rows")
        return rows[0];

    } catch (error) {

        console.log(error)
    }
}

        module.exports = { getUserAndPassword }
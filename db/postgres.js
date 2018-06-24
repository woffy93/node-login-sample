
const Pool = require('pg-pool'),
    bcrypt = require('bcryptjs'),
    saltRounds = 10;


let config = require("../config/main")['development'];

let pool = new Pool(
    {
        database: config.postgres.db,
        user: config.postgres.user,
        password: config.postgres.password,
        host: config.postgres.host,
        port: config.postgres.host.port
    }
);

function createUser(username,password) {
    let text="INSERT INTO users (username, password) VALUES($1, $2)";
    let values=[username];

    bcrypt.hash(password, saltRounds)
        .then(hash => {
            values.push(hash);
            return pool.connect()
        })
        .then(client => {
            return client.query(text,values)
                .then(() => client);
        })
        .then(client =>{
            client.release();
        })
        .catch(e => {
            console.error('ERROR: ', e.stack);
            throw new Error(e);
        })

    }

function login(username) {
    let text="SELECT * FROM users WHERE username = $1";
    let values=[username];

    return new Promise((resolve,reject)=>{
        pool.connect()
            .then(client=>{
                return client.query(text,values).then(client.release());
            })
            .then( res =>{
                if (res && res.rows.length>0){
                    resolve(res.rows[0]);
                }
                else {
                    throw new Error("no result");
                }
            }).catch( e=>{
                //console.log("ERROR"+e);
                reject(e);
        })
    })


}



module.exports.login = login;
module.exports.createUser = createUser;
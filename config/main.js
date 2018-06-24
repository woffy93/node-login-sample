var config = {
    development: {
        //db connection settings
        postgres: {
            host:   '127.0.0.1',
            port:   '5432',
            db:     '',
            user: '',
            password: ''
        },
        //server details
        server: {
            host: '127.0.0.1',
            port: '8000',
            secret: 'loginsnippet',
            internalSocketPort: '',
            externalUDPPort: ''
        }
    },
    production: {
        //db connection settings
        database: {
            host: '',
            port: '',
            db:     '',
            user: '',
            password: ''
        },
        //server details
        server: {
            host:   '',
            port:   '',
            secret: '',
            internalSocketPort: '',
            externalUDPPort: ''
        }
    }
};
module.exports = config;

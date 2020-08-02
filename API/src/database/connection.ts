import knex from 'knex';

const connection = knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'db_help'
    },
    useNullAsDefault: true,
});

export default connection;
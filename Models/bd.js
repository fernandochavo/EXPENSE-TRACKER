import pg from 'pg';

const db =new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database:'expensetracker',
password:'root',
    port: 5432,
});
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database', err.stack);
    } else {
        console.log('Connected to the database');
    }
});

export default db;
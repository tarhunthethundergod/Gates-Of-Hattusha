require('dotenv').config();
const express = require('express'),
  app = express(),
  //cookieParser = require('cookie-parser'),
  port = 8080;

app.set('views', 'views');
app.set('view engine', 'ejs');
app.locals.rmWhitespace = true; 

//app.use(cookieParser());
app.use(express.static('public'));

const pool = require('mariadb').createPool({
  host: process.env.DB_Host,
  user: process.env.DB_User,
  password: process.env.DB_Pass,
  connectionLimit: 5,
  database: process.env.DB_Db
});

app.get('/', async (req, res) => {
  let conn;
  let message;
  try {
    conn = await pool.getConnection();
    message = await conn.query('SELECT message FROM messages ORDER BY RAND() LIMIT 1');
    //console.log(message);
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
  }

  res.render('index', {
    message: message[0]['message']
  });
});

app.use((req, res, next) => { 
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.send('Page not found');
})

module.exports = app;
app.listen(port);

console.log(`Server is running on localhost:${port}`);
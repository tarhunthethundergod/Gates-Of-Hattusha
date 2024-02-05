require('dotenv').config();
const express = require('express'),
  app = express();
  //cookieParser = require('cookie-parser')

app.set('views', 'views');
app.set('view engine', 'ejs');
app.locals.rmWhitespace = true; 

//app.use(cookieParser());
app.use(express.static('public'));

/*const pool = require('mariadb').createPool({
  host: process.env.DB_Host,
  user: process.env.DB_User,
  password: process.env.DB_Pass,
  connectionLimit: 5,
  database: process.env.DB_Db
});*/

app.get('/', async (req, res) => {
  let conn;
  let message;
  try {
    //conn = await pool.getConnection();
    //message = await conn.query('SELECT message FROM messages ORDER BY RAND() LIMIT 1');
    const mysticalEntranceMessages = [
      "As you approach Hattusha, ethereal whispers beckon you through ancient gates.",
      "The city reveals itself, veiled in mist, a realm suspended between worlds.",
      "Enigmatic shadows dance on the walls as you step into the sacred embrace of Hattusha.",
      "A celestial aura envelops you as the city's secrets unfold with each step.",
      "Through the gates of Hattusha, time itself seems to pause, caught in the dance of ancient spirits.",
      "The air is thick with the echoes of forgotten voices, guiding you through the mystic labyrinth.",
      "Hattusha's entrance, an arcane portal, ushers you into a realm where history and myth converge.",
      "You cross the threshold, and the very stones beneath your feet whisper tales of civilizations long past.",
      "As you enter Hattusha, the city's heartbeat syncs with your own, resonating through the sacred corridors.",
      "The city's gates open like a tome of ancient wisdom, inviting you to read the chapters of its storied existence."
    ];
    message = mysticalEntranceMessages[Math.floor(Math.random() * mysticalEntranceMessages.length)];
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
  }

  res.render('index', {
    message: message //[0]['message']
  });
});

app.use((req, res, next) => { 
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.send('Page not found');
})

module.exports = app;
app.listen(process.env.Port);

console.log(`Server is running on localhost:${process.env.Port}`);
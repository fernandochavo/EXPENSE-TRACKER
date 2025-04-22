import express from 'express';
import router from './Routes/categorieroutes.js';
import transactionRouter from './Routes/transaction.js';
import userRouter from './Routes/user.js';
import bodyParser from 'body-parser';
import session from 'express-session';


const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);


app.use(router);
app.use(transactionRouter);
app.use(userRouter);


app.listen(port, () => {
  console.log('Server is running on port 3000');
});

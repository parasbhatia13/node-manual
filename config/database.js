import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

connection
  .getConnection()
  .then((connection) => {
    console.log("DB connected successfully");
    connection.release();
  })
  .catch((err) => console.log(err, "Error in connecting to db"));

export default connection;

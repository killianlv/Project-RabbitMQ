const express = require('express')
const mysql = require('mysql2');

const mysqlConfig = {
  host: "mysql_server",
  user: "killian",
  password: "secret",
  database: "test_db"
}

let con = null
con =  mysql.createConnection(mysqlConfig);
con.connect(function(err) {
  if (err) throw err;
  const sql = `
  CREATE TABLE IF NOT EXISTS orders (
    orderId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    status VARCHAR(55) NOT NULL
  )  ENGINE=INNODB;
  `;
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
})

const app = express()


app.get('/', function (req, res) {
  res.send('hello world')
})

app.get('/insert', function (req, res) {
  const myname = 'test'
  const mystatus = 'status1'
  con.connect(function(err) {
    if (err) throw err;
    const sql = `INSERT INTO orders (name, status) VALUES ('${myname}', '${mystatus}')`
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.send(`inserted into table, yout order id is ${result.insertId}`)
    });
  })
})

app.get('/fetch', function (req, res) {
  con.connect(function(err) {
    if (err) throw err;
    const sql = `SELECT * FROM orders`
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(JSON.stringify(result))
    });
  });
})

app.listen(3000)

console.log("listening on port 3000")


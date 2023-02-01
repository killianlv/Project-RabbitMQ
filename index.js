import express from "express"
import mysql from "mysql2"
import { rabitmq } from "./rabitmq.js"
import dotenv from "dotenv"
import { dbMysql } from "./dbMysql.js"



//CONFIG DOCKER

/*const mysqlConfig = {
  host: "mysql_server",
  user: "killian",
  password: "secret",
  database: "test_db"
}*/

const mysqlConfig = {
  host: "localhost",
  user: "killian",
  password: "secret",
  database: "test_db"
}

dotenv.config();
var queue = process.env.RABITMQ_QUEUE_NAME
const rabitmqConnexion = await rabitmq(queue);

const db = await dbMysql();
const con = db.connectionDb()

const app = express()
//FIN CONFIG










app.get('/', function (req, res) {
  res.send('hello world')
})

//TODO post + send to rabitmq
app.get('/insert', function (req, res) {

  const myname = 'test'
  const mystatus = 'status1'

  con.connect(async function(err) {
    if (err) throw err;
    const sql = `INSERT INTO orders (name, status) VALUES ('${myname}', '${mystatus}')`
    con.query(sql, function (err, result) {
      if (err) throw err;
      rabitmqConnexion.sendMessageToQueue(`{ "orderId": "${result.insertId}", "message": "Waiting for processing"}`)
      res.send(`Your order has been taken into account. His identifier is : ${result.insertId}`)
    });
  })
})






//Gett order with id
app.get('/order/:id', function (req, res) {

  //TODO check if id type is int

  con.connect(function(err) {
    if (err) throw err;
    const sql = `SELECT * FROM orders WHERE orderId = ${req.params.id}`
    con.query(sql, function (err, result, fields) {
      if (err) throw err;

      if(result.length > 0)
        return res.status(200).json(result)

      return res.sendStatus(404)
    });
  });
})


//Gett all orders
app.get('/fetch', async function (req, res) {
  con.connect(function(err) {
    if (err) throw err;
    const sql = `SELECT * FROM orders`
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      return res.status(200).json(result)
    });
  });
})

app.listen(process.env.API_PORT)

console.log("listening on port " + process.env.API_PORT)


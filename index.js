import express from "express"
import { rabitmq } from "./rabitmq.js"
import dotenv from "dotenv"
import { dbMysql } from "./dbMysql.js"

//###########################################################

dotenv.config();

//RabitMQ
var queue = process.env.RABITMQ_QUEUE_NAME
const rabitmqConnexion = await rabitmq(queue);

//DB
const db = await dbMysql();
const con = db.connectionDb()

const app = express()

//###########################################################


//GET home page
app.get('/', function (req, res) {
  res.send('API is running')
})


//POST faire une demande de commande
app.post('/insert', function (req, res) {

  let name = req.query.name;
  if(!name)
    name = 'commande'

  const status = process.env.STATUS_WAITING_FOR_PROCESSING

  con.connect(async function(err) {
    if (err) throw err;
    const sql = `INSERT INTO orders (name, status) VALUES ('${name}', '${status}')`
    con.query(sql, function (err, result) {
      if (err) throw err;
      rabitmqConnexion.sendMessageToQueue(`{ "orderId": "${result.insertId}", "message": "${status}"}`)
      return res.status(201).json(result.insertId)
    });
  })
})


//GET get order with id
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


//GET get all orders
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


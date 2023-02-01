import { rabitmq } from "./rabitmq.js"
import { dbMysql } from "./dbMysql.js"
import dotenv from "dotenv"

//CONFIG


dotenv.config();
const db = await dbMysql();
const con = db.connectionDb()


var queue = process.env.RABITMQ_QUEUE_NAME
const rabitmqConnexion = await rabitmq(queue);
console.log("ici")

const ch = await rabitmqConnexion.connection.createChannel();


ch.consume(queue, function(msg) {
    console.log(" [x] Received %s", msg.content.toString());
    const mystatus = "testttttt"
    const myid = 10
    //TODO modifier status BDD
    con.connect(async function(err) {
        if (err) throw err;
        const sql = `UPDATE orders SET status = '${mystatus}' WHERE orderId = ${myid}`
        console.log(sql)
        con.query(sql, function (err, result) {
          if (err) throw err;
        });
    })
    //-----------------
    }, {
        noAck: true
    });
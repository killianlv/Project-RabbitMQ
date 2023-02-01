import { rabitmq } from "./rabitmq.js"
import { dbMysql } from "./dbMysql.js"
import dotenv from "dotenv"
dotenv.config();

//###########################################################

const db = await dbMysql();
const con = db.connectionDb()


var queue = process.env.RABITMQ_QUEUE_NAME
const rabitmqConnexion = await rabitmq(queue);
console.log("running")

const ch = await rabitmqConnexion.connection.createChannel();

ch.assertQueue(queue, {
    durable: true
});

ch.consume(queue, function(msg) {
    console.log(" [x] Received %s", msg.content.toString());
    const status = process.env.STATUS_DONE
    const commande = JSON.parse(msg.content.toString());
    const orderId = commande.orderId

    //Update status in BDD
    con.connect(async function(err) {
        if (err) throw err;
        const sql = `UPDATE orders SET status = '${status}' WHERE orderId = ${orderId}`
        console.log(sql)
        con.query(sql, function (err, result) {
          if (err) throw err;
        });
    })
    //-----------------
    }, {
        noAck: true
    });
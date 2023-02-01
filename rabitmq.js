import * as amqplib from "amqplib";
import dotenv from "dotenv"
dotenv.config();


export async function rabitmq(queueName) {

  const connection = await amqplib.connect(
    process.env.AMQP_CONNECTION_STRING,
    (err, connection) => {
      if (err) return reject(err);
      channel.assertQueue(queueName, {
        durable: true
      });
      resolve(connection);
    }
  );


  async function sendMessageToQueue(json) {
    const ch = await connection.createChannel();
    ch.sendToQueue(queueName, Buffer.from(json));
  }



  return {
    connection: connection,
    sendMessageToQueue: sendMessageToQueue,
  };
}
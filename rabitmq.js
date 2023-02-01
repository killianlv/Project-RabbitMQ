import * as amqplib from "amqplib";

export async function rabitmq(queueName) {

  const connection = await amqplib.connect(
    "amqp://guest:guest@localhost:5672",
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
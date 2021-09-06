import { SQS } from "aws-sdk";

const sqs = new SQS();

export function enqueue<T>(queueName: string) {
  return async (message: T) => {
    const queueUrl = await sqs
      .getQueueUrl({
        QueueName: queueName,
      })
      .promise();
    console.log("queueUrl:::", queueUrl);
    return sqs
      .sendMessage({
        MessageBody: JSON.stringify(message),
        QueueUrl: queueUrl.QueueUrl,
      })
      .promise();
  };
}

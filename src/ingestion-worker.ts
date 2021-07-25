import { KinesisStreamEvent, KinesisStreamRecord } from "aws-lambda";
import * as SQS from "./lib/sqs";

const enqueueJob = SQS.enqueue<any>(process.env.JOB_QUEUE);

// for each kinesis record in the batch, put record into sqs
const processBatch = async (record: KinesisStreamRecord) => {
  console.log("::: RECORD ::", JSON.stringify(record, null, 2));
  await enqueueJob(record);
};

export default async (event: KinesisStreamEvent) => {
  console.log("event.Records.length", event.Records.length);
  await Promise.all(event.Records.map(processBatch));
};

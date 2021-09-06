import { KinesisStreamEvent, KinesisStreamRecord } from "aws-lambda";
import kinesisToJson from "./lib/kinesis-to-json";
import { enqueue } from "./lib/sqs";

interface Job {
  action: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

const enqueueJobWorker = enqueue<Job>(process.env.JOB_QUEUE);

// for each kinesis record in the batch, put record into sqs
const processBatch = async (record: KinesisStreamRecord) => {
  const item = kinesisToJson<any>(record?.kinesis?.data);

  await enqueueJobWorker(item);
};

export default async (event: KinesisStreamEvent) => {
  await Promise.all(event.Records.map(processBatch));
};

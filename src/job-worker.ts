import { SQSEvent, SQSRecord } from "aws-lambda";
import { getRandomIntFromRange } from "./lib/getRandomIntFromRange";
import { work } from "./lib/work";

const processEvent = async (record: SQSRecord) => {
  console.log("::: SQS RECORD BODY :::", record.body);

  const workInterval = getRandomIntFromRange(100, 2000);

  console.log(workInterval);

  await work(workInterval);
};

export default async (event: SQSEvent) => {
  await Promise.all(event.Records.map(processEvent));
};

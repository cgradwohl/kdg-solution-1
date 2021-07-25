import { SQSEvent, SQSRecord } from "aws-lambda";

const processEvent = async (record: SQSRecord) => {
  console.log("::: RECORD :::", record);

  // switch on each action type
};

export default async (event: SQSEvent) => {
  await Promise.all(event.Records.map(processEvent));
};

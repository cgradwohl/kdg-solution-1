import { KinesisStreamEvent } from "aws-lambda";
export default async (event: KinesisStreamEvent) => {
  console.log("::: EVENT :::", event);
};

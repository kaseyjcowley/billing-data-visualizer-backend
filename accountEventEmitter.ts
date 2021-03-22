import faker from "faker";

import { pubsub } from "./pubsub";
import { account, changedAccount } from "./dataGenerators";

const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const startEvents = async () => {
  while (true) {
    console.log("re-emitting events");
    // Wait for a random time between 1 and 10 seconds
    const ms = (Math.floor(Math.random() * 10) + 1) * 1000;
    console.log(`waiting ${ms} ms...`);
    await wait(ms);

    pubsub.publish("ACCOUNT_EVENT", {
      accountEvent: faker.random.boolean() ? account() : changedAccount(),
    });
  }
};

export { startEvents };

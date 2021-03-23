import faker from "faker";

import { pubsub } from "../pubsub";
import { account, changedAccount } from "./generators";

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

    let accountEvent;

    if (faker.random.boolean()) {
      accountEvent = account();
      console.log("Emitted a new account: %s", JSON.stringify(accountEvent));
    } else {
      accountEvent = changedAccount();
      console.log(
        "Emitted a changed account: %s",
        JSON.stringify(accountEvent)
      );
    }

    pubsub.publish("ACCOUNT_EVENT", {
      accountEvent,
    });
  }
};

export { startEvents };

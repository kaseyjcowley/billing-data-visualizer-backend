import { spawn } from "child_process";
import { Buffer } from "buffer";
import faker from "faker";
import { Account, BillingInterval } from "../types";
import {
  countryNameAndEmojiByCode,
  currencyByCountry,
} from "./currencyByCountry";
import data from "../data/db.json";

type LatLng = [latitude: number, longitude: number];

const fetchCoordinates = (
  fullCountryName: string,
  total: number
): Promise<LatLng[]> => {
  return new Promise((resolve) => {
    const buffer: Uint8Array[] = [];

    console.log(`generating lat/lngs for ${fullCountryName}`);
    const python = spawn("poetry", [
      "run",
      "python3",
      __dirname + "/latLngGenerator.py",
      fullCountryName,
      total.toString(),
    ]);

    // @ts-ignore
    python.stdout.on("data", (data: Uint8Array) => {
      buffer.push(data);
    });

    // @ts-ignore
    python.stdout.on("close", () => {
      const coordinates: LatLng[] = JSON.parse(
        Buffer.concat(buffer).toString().trim()
      );

      resolve(coordinates);
    });
  });
};

const genAccountsFor = async (
  country: string,
  total: number
): Promise<Account[]> => {
  let accounts: Account[] = [];
  const { name: fullCountryName, flag } = countryNameAndEmojiByCode[country];
  const latsAndLongs = await fetchCoordinates(fullCountryName, total);

  for (let i = 0; i < total; i++) {
    const currency = currencyByCountry[country];

    accounts.push({
      id: faker.random.uuid(),
      name: faker.company.companyName(),
      address: {
        country,
        flag,
        latitude: latsAndLongs[i][0],
        longitude: latsAndLongs[i][1],
      },
      currency,
      totalRevenuePerCurrency: [
        {
          currency,
          total: Number(faker.finance.amount(24.99, 100000, 2)),
        },
      ],
      billingInterval: faker.random.arrayElement(
        Object.values(BillingInterval)
      ),
    });
  }

  return accounts;
};

const changedAccount = () => {
  const existingRecord: Account = faker.random.arrayElement(data as Account[]);
  return {
    id: existingRecord.id,
    total: faker.finance.amount(24.99, 10000, 2),
    currency: existingRecord.currency,
  };
};

export { genAccountsFor, changedAccount };

import {
  // Country,
  State,
  City,
} from "country-state-city";
import * as nigerianData from "nigerian-states-and-lgas";
import fs from "fs";
import path from "path";

const COUNTRY_CODES = [
  "NG",
  "KE",
  "ZA",
  "GH",
  "EG",
  "MA",
  "DZ",
  "AO",
  "BJ",
  "BW",
  "BF",
  "BI",
  "CM",
  "CV",
  "CF",
  "TD",
  "KM",
  "CG",
  "CD",
  "CI",
  "DJ",
  "GQ",
  "ER",
  "ET",
  "GA",
  "GM",
  "GN",
  "GW",
  "LS",
  "LR",
  "LY",
  "MG",
  "MW",
  "ML",
  "MR",
  "MU",
  "MZ",
  "NA",
  "NE",
  "RW",
  "ST",
  "SN",
  "SC",
  "SL",
  "SO",
  "SS",
  "SD",
  "SZ",
  "TZ",
  "TG",
  "TN",
  "UG",
  "ZM",
  "ZW",
];

interface SimpleLGA {
  name: string;
}

interface SimpleState {
  name: string;
  code?: string;
  lgas: SimpleLGA[];
}

async function generate() {
  const allData: Record<string, SimpleState[]> = {};

  console.log(`Generating data for ${COUNTRY_CODES.length} countries...`);

  for (const code of COUNTRY_CODES) {
    if (code === "NG") {
      // Use specialized package for Nigeria to get all 774 LGAs
      const ngStates = nigerianData.all();
      allData[code] = ngStates.map((s) => ({
        name: s.state,
        lgas: s.lgas.map((lga) => ({ name: lga })),
      }));
      console.log(
        `- NG: ${ngStates.length} states processed (using specialized package).`,
      );
      continue;
    }

    const states = State.getStatesOfCountry(code);
    const countryStates: SimpleState[] = [];

    for (const state of states) {
      const cities = City.getCitiesOfState(code, state.isoCode);
      countryStates.push({
        name: state.name,
        code: state.isoCode,
        lgas: cities.map((c) => ({ name: c.name })),
      });
    }

    allData[code] = countryStates;
    console.log(`- ${code}: ${states.length} states/provinces processed.`);
  }

  const outputPath = path.join(__dirname, "../core/app/countries/data.json");
  fs.writeFileSync(outputPath, JSON.stringify(allData, null, 2));

  console.log(`\nSuccess! Data saved to ${outputPath}`);
}

generate().catch(console.error);

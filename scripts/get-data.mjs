import fetch from "node-fetch";
import lz from "lz-string";
import fs from "fs";
import csv from "csvtojson";

const getData = async () => {
  const result = await fetch(
    "https://pathbuilder2e.com/pbonline/app/fetch_all_c.php?v=59",
    {
      headers: {
        accept: "*/*",
      },
      body: null,
      method: "GET",
    }
  );

  const resultText = await result.text();
  const processedResult = resultText.replace("\t", "");

  const jsonData = JSON.parse(lz.decompressFromBase64(processedResult));
  const finalData = {};

  for (const [key, value] of Object.entries(jsonData)) {
    await csv()
      .fromString(value)
      .then((csvRow) => {
        finalData[key] = csvRow;
      });
  }

  fs.writeFile(
    "src/pathbuilder-data.ts",
    `export const pathbuilderData = ` + JSON.stringify(finalData),
    () => {}
  );
};

getData();

import fetch from 'node-fetch'
import lz from 'lz-string'
import fs from 'fs'
import csv from 'csvtojson'

const getData = async () => {
  const result = await fetch("https://pathbuilder2e.com/pbonline/app/fetch_all_c.php?v=44", {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-CA,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "no-cache",
      "content-type": "application/json;charset=UTF-8",
      "pragma": "no-cache",
      "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "cookie": "__stripe_mid=404c3ae2-fb36-4f7e-9743-5856c224259216f2ce; __stripe_sid=f978c754-7e05-4687-914e-ef09d0f7a24829ccca",
      "Referer": "https://pathbuilder2e.com/app.html?v=45a",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  });

  const resultText = await result.text()
  const processedResult = resultText.replace('\t', '')

  const jsonData = JSON.parse(lz.decompressFromBase64(processedResult))
  const finalData = {}

  for (const [key, value] of Object.entries(jsonData)) {
    await csv()
      .fromString(value)
      .then((csvRow) => {
        finalData[key] = csvRow
      })
  }

  fs.writeFile('src/pathbuilder-data.ts', `export const pathbuilderData = ` + JSON.stringify(finalData), () => { })
}

getData()

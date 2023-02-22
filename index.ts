import axios from "axios";
import console = require("console");
import * as fs from 'fs'
import { TOKENS } from "./src/token";


require('dotenv').config();
const excel = require('csvjson')

const writeFile = fs.writeFile

const ohlcv_historic_data = async () => {
  for (let i = 0; i < TOKENS.length; i++){
    let candle = TOKENS[i]

    let response = await axios({
      method: 'GET',
      url: `https://rest.coinapi.io/v1/ohlcv/${candle}/USD/history`,
      params: {
        period_id: '15MIN',
        time_start: '2021-11-06T00:00:00',
        time_end: '2021-12-06T00:00:00',
        limit: '2300'
      },
      headers: {
        'X-CoinAPI-Key': process.env.COIN_API_KEY
      }
    })

    let data = response.data
    var options = {
      headers: 'key'
    }
    let  csvData = excel.toCSV(data, options)
    writeFile(`./excel_data/${candle}.csv`, csvData, (err: any) => {
      if (err) {
        // Handle the errors
        console.log(err);
        throw new Error(err); 
      }
      console.log(`${candle} Datasaved into excel files successfully😊`);
    })
  }

}

ohlcv_historic_data()
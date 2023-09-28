import React, { useEffect, useState } from "react";
import "./CryptoExchange.css"
import apijson from "../apijson.json";

import ApiCoinInputs from "./ApiCoinInputs";
// import ApiCoinPage from "./ApiCoinPage";
export default function CryptoExchange() {
  const [cryptoData, setCryptoData] = useState([]);
  // const [cryptoInput, setCryptoInput] = useState([]);
  // const [cryptoPage, setCryptoPage] = useState([]);
  
  
    // const apiKey = "FDAB8705-CEAA-4A23-8A5B-6CC30B8D44D9";
    // const apiUrl = "https://rest.coinapi.io/v1/exchanges";
  const apiJson = apijson;

/*    useEffect(() => {

        fetch(apiUrl, {
            headers: {
              "X-CoinAPI-Key": apiKey,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              setCryptoData(data);
              console.log("data", data);
            })
  }, [cryptoData]);
  
*/
  useEffect(() => {
    setCryptoData(apiJson); 
  }, [apiJson,cryptoData]);

  return (
    <div>

        <h1 className="cryptoHeaderH1"> Top Crypto Exchange </h1>
        <p  className="cryptoHeaderP">Compare all 190 countries</p>
        <h3 className="cryptoHeaderH3">Exchanges</h3>
        <hr></hr>
      <ApiCoinInputs cryptoData={cryptoData}  />  
    </div>
  );

}

const dotenv = require('dotenv');
const express = require("express");
const apijson = require('./apijson.json')
const cors = require("cors");
const app = express();
const axios = require("axios")

dotenv.config({ path: "../backend/config/config.env" });
const port = process.env.DB_PORT;
app.use(express.json());
app.use(cors());
app.get('/latest', async (req, res) => {
    // const { from, to } = req.params;
    const coinApiUrl = process.env.DB_URL;
    const apiKey = process.env.APIKEYS;    
    try {
      const response = await axios.get(coinApiUrl, {
        headers: {
          'X-CoinAPI-Key': apiKey,
        },
      });
  
      const data = response.data;
    //   console.log("data",data)
      res.status(200).json({ message:"successful", data:data });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/pagination', async (req, res) => {
    // const { from, to } = req.params;
    const coinApiUrl = process.env.DB_URL;
    const apiKey = process.env.APIKEYS;    
    try {
      // const response = await axios.get(coinApiUrl, {
      //   headers: {
      //     'X-CoinAPI-Key': apiKey,
      //   },
      // });
      const response = apijson;
      const page = req.query.page;
      const limit = req.query.limit;
      const startIndex =   (page-1) * limit;
      const endIndex = page * limit;
      const pageshow = response.data.slice(startIndex,endIndex)
      res.status(200).json({message:"pagination",data:pageshow,length:pageshow.length}) 
    } catch (err) {
      console.log('Error:', err.message);
      const responses = apijson;
      const pages = req.query.page;
      const limits = req.query.limit;
      const startIndexs =   (pages-1) * limits;
      const endIndexs = pages * limits;
      const pageshows = responses.slice(startIndexs,endIndexs)
      res.status(500).json({ message: 'Internal Server Error',data: pageshows});
    }
  });
  
app.listen(port,()=>{
    console.log(`server port ${port}`)
})
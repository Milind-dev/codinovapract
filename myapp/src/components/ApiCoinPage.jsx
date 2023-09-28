import React, { useEffect, useState } from "react";
import ApiCoinList from "./ApiCoinList";

export default function ApiCoinPage({ cryptodata }) {
  // http://localhost:4000/pagination?page=1&limit=10
  const [page, setPage] = useState(1);
  const [limit, setlimit] = useState(10);
  const [stored, setStored] = useState(cryptodata);
  const [nextpage, setNext] = useState(1);

//   const handlepagebtn = (idx) => {
//     const d = idx + 1;
//     setlimit(d);
//   };

  useEffect(() => {
    setlimit(limit);
    fetch(`http://localhost:4000/pagination?page=${page}&limit=${limit}`, {
      "X-CoinAPI-Key": "347C7E9D-A808-4F88-813A-72DE4EA04464",
    })
      .then((response) => response.json())
      .then((res) => {
        setStored(res.data);
          console.log("data",res.data);
      });
  }, []);

  return (
    <React.Fragment>
      <div>
        {stored.map((item, index) => {
            console.log("item",item);
          return(
            <div>
                <p key={index}> {item.name}</p>
                <p>{item.volume_1hrs_usd}</p> 
                <hr />

            </div>
          ) 
            
        })}
      </div>
      
    </React.Fragment>
  );
}

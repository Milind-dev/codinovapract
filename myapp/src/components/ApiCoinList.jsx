import React from "react";
import "./ApiList.css"

export default function ApiCoinList({ cryptoDatas,error,loading }) {
  console.log("loading",loading);
  return (
    <React.Fragment>
      <div className="box">
        <div>
          <p className="exchangeTrade">Exchange</p>
          <p className="exchangeTrade">24 trade volume_1hrs_usd</p>
        </div>
      </div>
      { cryptoDatas.length > -1 ? ( cryptoDatas.map((item,index) => {
        return (
          <div>
            <div className="box">
              <div>
              <p>
                  {" "}
                  {index}
                </p>
              
                <p>
                  {" "}
                  {item.name}
                </p>
                <p>
                  {" "}
                  {item.volume_1hrs_usd} 
                </p>
              </div>
            </div>
          </div>
        );
      })) :( error.map((item,index) => {
        return (
          <div>
            <div className="box">
              <div key={index}>   
                <p>
                  {" "}
                  {item.name}
                </p>
                <p>
                  {" "}
                  {item.volume_1hrs_usd} 
                </p>
              </div>
            </div>
          </div>
        );
      })) 
     
    }
    </React.Fragment>
  );
}

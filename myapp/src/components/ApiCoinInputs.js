// import axios from "axios";
import React, { useState, useEffect } from "react";
import "./ApiCoinInput.css";
import ApiCoinList from "./ApiCoinList";

export default function ApiCoinInputs({ cryptoData }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagelimit, setPagelimit] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [page, setPage] = useState(0);
  const [limit, setlimit] = useState(0);
  const [errors, setError] = useState("err");
  const totalPages = Math.ceil(data.length / limit);

  const handleNextPage = () => {
    setCurrentPage((page) => (page >= totalPages ? page : page + 1));
  };

  const handlePrevPage = () => {
    setCurrentPage((page) => (page <= 1 ? page : page - 1));
  };
  const handlePageChange = (index, fetchData) => {
    console.log("pagenumber", page, limit);
    fetchData(index, limit);
  };

  const handleInput = (e, data, fetchData) => {
    e.preventDefault();
    const coinInput = e.target.value;
    const findname = data.filter((val) => {
      if (coinInput === "") return fetchData(page, limit);
      else {
        return coinInput === val.name;
      }
    });
    setPagelimit(findname);
  };

  const fetchData = (page, limit) => {
    // const BaseUrl = `http://localhost:4000/pagination?page=${page}&limit=${limit}`;
    // try{
    //   const response = await axios.get(BaseUrl,{
    //     "X-CoinAPI-Key": "FDAB8705-CEAA-4A23-8A5B-6CC30B8D44D9",
    //   });
    //   const datas = await response.data;
    //   setData(datas.data)
    //   console.log("5555555",datas)
    // }
    // catch(err) {
    //   console.log(err)
    // }

    fetch(`http://localhost:4000/pagination?page=${page}&limit=${limit}`, {
      // "X-CoinAPI-Key": "FDAB8705-CEAA-4A23-8A5B-6CC30B8D44D9",
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("response", response);
        setPagelimit(response);
      })
      .catch((err) => {
        console.log("err", err);
        setPagelimit(err.data);
      });
  };

  useEffect(() => {
    setPage(1);
    setlimit(15);
    setData(cryptoData);
    fetchData(page, limit);
  }, [cryptoData, page, limit]);

  return (
    <div>
      <div>
        <input
          type="text"
          onChange={(e) => handleInput(e, data, fetchData)}
          placeholder="crypto exchange"
        />
      </div>

      <ApiCoinList
        cryptoDatas={pagelimit}
        error={pagelimit.data}
        loading={loading}
      />

      <button
        onClick={handlePrevPage}
        disabled={currentPage <= 1}
        className="pagination-button"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1, fetchData)}
          className={`pagination-button ${
            index + 1 === currentPage ? "selected" : ""
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={handleNextPage}
        disabled={currentPage >= totalPages}
        className="pagination-button"
      >
        Next
      </button>
    </div>
  );
}

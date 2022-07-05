import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Data.scss";
import LineChart from "../LineChart/LineChart";
import Chart from "chart.js/auto";

export default function Data() {
  const [apiData, setApiData] = useState<object[]>([]);
  //   asset id and name
  const [assetId, setAssetId] = useState<string>("");
  const [assetName, setAssetName] = useState<string>("");
  //   asset dates
  const [dates, setDates] = useState<string[]>([]);
  //   asset TVL and fake APR values
  const [tvlValues, setTvlValues] = useState<number[]>([]);
  const [aprValues, setAprValues] = useState<number[]>([]);

  // get data from api
  useEffect(() => {
    axios
      .get(
        "https://api.multifarm.fi/jay_flamingo_random_6ix_vegas/get_assets?pg=1&tvl_min=50000&sort=tvlStaked&sort_order=desc&farms_tvl_staked_gte=10000000"
      )
      .then((res) => {
        const { data }: any = res;
        // data from api have an error, so I need to add quotation marks to
        // every infinity property in order to parse it
        let fixedData = data.replace(/Infinity/g, `"Infinity"`);
        let response = JSON.parse(fixedData);
        setApiData(response.data);
      });
  }, []);

  //   call show data when we have apiData
  useEffect(() => {
    if (apiData.length) {
      showData();
    }
  }, [apiData]);

  //   show data of random asset from api
  function showData() {
    const assets: any = apiData;

    // pick random asset api
    const randomIndex = Math.floor(Math.random() * assets.length);
    console.log(randomIndex);
    const asset = assets[randomIndex];

    // get assset name, id and TVL history
    setAssetId(asset.assetId);
    setAssetName(asset.asset);
    const tvlStakedHistory = asset.selected_farm[0].tvlStakedHistory;
    console.log(tvlStakedHistory);

    // mock data for APR history
    let initialAprValue = 0;
    const aprData = tvlStakedHistory.map(() => (initialAprValue += 5));
    setAprValues(aprData);

    // set dates and values
    const dates = tvlStakedHistory.map((item: any) => item.date);
    const tvlValues = tvlStakedHistory.map((item: any) => item.value);
    setTvlValues(tvlValues);
    setDates(dates);
  }

  return (
    <div className="data-container">
      <button onClick={showData}>New Random Asset</button>
      <p className="asset-info"><span>asset:  </span>{assetName}</p>
      <p className="asset-info"><span>asset ID:  </span>{assetId}</p>

      <div className="charts">
        <LineChart labels={dates} data={aprValues} title="Asset APR" />
        <LineChart labels={dates} data={tvlValues} title="Asset TVL History" />
      </div>
    </div>
  );
}

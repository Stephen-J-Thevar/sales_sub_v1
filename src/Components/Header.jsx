// import { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
import Tata from "../Artifacts/TATA MOTORS.png";
import Sparq from "../Artifacts/SparQPlug.png";
import Card from "./Card";
// import axios from "axios";

// const axInst = axios.create({
//   baseURL: window.epAppData.API_BASE_URL,
// });
export const Header = ({ title }) => {
  // const location = useLocation();
  // const showNextArrow = location.pathname === "/";
  // const showPreviousArrow = location.pathname === "/VIN";
  // const [fromAvailableDate, setfromAvailableDate] = useState([]);
  // const [lastAvailableDate, setLastAvailableDate] = useState([]);
  // const fetchLastDate = async () => {
  //   try {
  //     // const res = await axios.get
  //     //   (`${window.epAppData.API_BASE_URL}daterange)
  //     // );
  //     const res = await axios.get(window.epAppData.API_BASE_URL + "daterange");
  //     setfromAvailableDate(res.data[1]);
  //     setLastAvailableDate(res.data[0]);
  //     return;
  //   } catch (error) {
  //     console.log("Error", error.message);
  //   }
  // };

  // useEffect(
  //   () => {
  //     fetchLastDate();
  //   },
  //   // eslint-disable-next-line
  //   []
  // );

  return (
    <Card css={"h-16 flex lg:block md:block"}>
      <header className="grid items-center  grid-rows-1 grid-cols-[100px_20px_1fr_120px] lg:grid-cols-[150px_200px_20px_1fr_220px_150px] md:grid-cols-[140px_120px_20px_1fr_140px_140px] lg:mx-5 md:mx-4 justify-center h-full">
        <div className="items-center hidden lg:col-start-1 md:col-start-1 justify-self-start lg:block md:block">
          <img
            src={Tata}
            alt="TML Logo"
            className="hidden lg:h-7 md:block md:h-8"
          />
        </div>

        <div
          className={` ${con} italic lg:text-[0.6rem] md:text-[0.6rem] text-[0.5rem] lg:col-start-2 md:col-start-2 col-start-1 `}
        >
          <span>Data Availability Range</span>
          <span className="font-semibold">2023-06-30 to 2023-09-30</span>
        </div>

        <div className="col-start-3 lg:col-start-4 md:col-start-4 justify-self-center">
          <h1 className="text-lg font-bold text-blue-900 md:text-lg lg:text-3xl lg:font-bold md:font-extrabold">
            {title}
          </h1>
        </div>

        <div className="col-start-6 justify-self-end">
          <img
            src={Sparq}
            alt="SparQPluq"
            className="h-12 md:block md:h-12 lg:h-10"
          />
        </div>
      </header>
    </Card>
  );
};
const con = "flex flex-col items-center justify-center";

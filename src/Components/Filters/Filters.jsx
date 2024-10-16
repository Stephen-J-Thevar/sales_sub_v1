import { useQuery } from "@tanstack/react-query";
import { memo, useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import { addFilters } from "../../store/slices/FilterSlice";
import Card from "../Card";
import ViMultiSelect from "../Multi-Select-Dropdown/ViMultiSelectDropdown";
import {
  fetDealerName,
  fetchLOB,
  fetchRegion,
  fetchStates,
} from "./apiFilters";
import "./Date.css";
import { selectFilterData } from "../../store/selector";
import MemDtPkr from "./MemDtPkr";
import { signal } from "@preact/signals";

//*------------------COMP----------------------*//
function Filters() {
  // const { data } = useSelector((state) => state.filters);
  const data = useSelector(selectFilterData);
  console.log(data);

  const { start_date, end_date } = useSelector((state) => state.dates.date);

  const {
    region_filter: pRegion,
    state_filter: pStates,
    lob_filter: pLob,
    dealer_name_filter: pDealerNames,
    veh_type: pVehType,
  } = data?.filterdata;

  const inputVal = useRef([]);
  const dispatch = useDispatch();
  // const toaster = useToaster();

  const [clicked, setClicked] = useState(1);

  const [selDates, setSelDates] = useState({ start: null, end: null });
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [selectedState, setSelectedState] = useState([]);
  const [selectedLob, setSelectedLOB] = useState([]);
  const [selectedDn, setSelectedDn] = useState([]);
  const [selectedVehType, setSelectedVehType] = useState([]);

  const selectedDated = signal("start");

  //* --------------- QUERY---------------------/
  const { data: regions, isLoading: rL } = useQuery({
    queryKey: ["region"],
    queryFn: () => fetchRegion(dispatch),
    initialData: [],
  });

  const { data: states, isLoading: sL } = useQuery({
    queryKey: ["states", selectedRegion],
    queryFn: () => fetchStates(dispatch, selectedRegion),
    enabled: selectedRegion.length > 0,
    initialData: [],
  });

  const { data: dealerNames, isLoading: mcL } = useQuery({
    queryKey: ["dealerNames", selectedState],
    queryFn: () => fetDealerName(dispatch, selectedState),
    enabled: selectedState.length > 0,
    initialData: [],
  });

  const { data: lob, isLoading: lobL } = useQuery({
    queryKey: ["lob"],
    queryFn: () => fetchLOB(pRegion, pStates),
    enabled: pDealerNames.length > 0,
    initialData: [],
  });

  //* ---------------HANDLE EVENTS---------------------/
  async function handleSearch() {
    let userSelectedFilter = {
      data: {
        date_filter: {
          start_date: selDates.start || "",
          end_date: selDates.end || "",
        },

        region_filter: pRegion || selectedRegion,
        state_filter: pStates || selectedState,
        dealer_name_filter: pDealerNames || selectedDn,
        lob_filter: pLob || selectedLob,
        veh_type: pVehType || selectedVehType,
      },
      submitted: clicked + 1,
    };

    dispatch(addFilters(userSelectedFilter));
    // setClicked((prev) => prev + Math.random());
    setClicked((prev) => prev + 1);
  }

  const handleRefresh = () => {
    const userSelectedFilter = {
      data: {
        date_filter: {
          start_date: start_date,
          end_date: end_date,
        },

        region_filter: [],
        state_filter: [],
        lob_filter: [],
        dealer_name_filter: [],
        veh_type: [],
      },
      submitted: 0,
      // fmsNav: 0,
    };
    // inputVal.current = "";
    dispatch(addFilters(userSelectedFilter));
    inputVal.current.value = "";
    setSelDates({ start: null, end: null });
  };

  function handleDateSelect(params) {
    console.log("inside handleDateSelect");
    selectedDated.value = 222;
  }

  // const handleDateSelect = useCallback(
  //   (dates) => {
  //     console.log("inside handleDateSelect");
  //     const offsetIST = 5.5 * 60 * 60 * 1000;
  //     const selectedStartDate = new Date(dates[0].getTime() + offsetIST)
  //       .toISOString()
  //       .split("T")[0];
  //     const selectedEndDate = new Date(dates[1].getTime() + offsetIST)
  //       .toISOString()
  //       .split("T")[0];

  //     // setSelDates({ start: selectedStartDate, end: selectedEndDate });

  //     selectedDated.value = "what";
  //   },
  //   // [setSelDates]
  //   []
  // );

  console.log("first");

  console.log("seledates", selectedDated.value);

  //*----------------------JSX-------------------------/
  return (
    <Card>
      <section className="grid grid-cols-2 gap-2 p-2 bg-white rounded-md md:gap-2 lg:grid-cols-7 md:grid-cols-4">
        <div className={divStyle}>
          <label className={labelStyle}>Select Date</label>
          <MemDtPkr onOk={handleDateSelect} />
        </div>

        <div className={divStyle}>
          <label className={labelStyle}>Region</label>
          <ViMultiSelect
            options={regions}
            onSelectionChange={setSelectedRegion}
            opnsSelected={pRegion}
            keey="region_filter"
            isLoading={rL}
          />
        </div>

        <div className={divStyle}>
          <label className={labelStyle}>Dealer State</label>
          <ViMultiSelect
            options={states}
            onSelectionChange={setSelectedState}
            opnsSelected={pStates}
            keey="state_filter"
            isLoading={sL}
          />
        </div>

        <div className={divStyle}>
          <label className={labelStyle}>Dealer Name</label>
          <ViMultiSelect
            options={dealerNames}
            onSelectionChange={setSelectedDn}
            opnsSelected={pDealerNames}
            keey="dealer_name_filter"
            isLoading={mcL}
          />
        </div>

        <div className={divStyle}>
          <label className={labelStyle}>LOB</label>
          <ViMultiSelect
            options={lob}
            onSelectionChange={setSelectedLOB}
            opnsSelected={pLob}
            keey="lob_filter"
            isLoading={lobL}
          />
        </div>

        <div className={divStyle}>
          <label className={labelStyle}>Vehicle Type</label>
          <ViMultiSelect
            options={["New Vehicle", "Existing Vehicle"]}
            onSelectionChange={setSelectedVehType}
            opnsSelected={[]}
            keey="veh_filter"
            isLoading={false}
          />
        </div>

        <div className="grid grid-cols-3 col-span-2 gap-1 lg:col-span-1 lg:grid-cols-1 md:col-span-2">
          <button
            className="text-white bg-blue-600 rounded-md lg:mx-2"
            type="button"
            onClick={handleSearch}
          >
            Submit
          </button>

          <button
            className="text-white bg-red-600 rounded-md lg:mx-2"
            onClick={handleRefresh}
          >
            Reset
          </button>

          <button
            className="text-white bg-green-600 rounded-md lg:mx-2"
            onClick={handleRefresh}
          >
            Download
          </button>
        </div>
      </section>
    </Card>
  );
}

//*------------------CSS----------------------*//
const divStyle = "flex flex-col justify-center";
const labelStyle =
  "text-center font-bold py-1 text-sm text-white bg-indigo-900";

export default memo(Filters);

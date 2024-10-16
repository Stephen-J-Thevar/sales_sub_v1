import { axInst } from "../../App";
import { updateFil } from "../../store/slices/FilterSlice";

//* ---------------XXXX---------------------/
export const fetchRegion = async (dispatch) => {
  const res = await axInst.post("/regions");
  const regionsArray = res.data.map((region) => region.key);
  dispatch(updateFil({ arr: regionsArray, key: "region_filter" }));
  return regionsArray;
};

//* ---------------XXXX---------------------/
export const fetchStates = async (dispatch, selRegions) => {
  const res = await axInst.post("/dealer_states", {
    region_filter: selRegions || [],
  });

  const statesArray = res.data.map((bucket) => bucket.key);
  dispatch(updateFil({ arr: statesArray, key: "state_filter" }));
  return statesArray;
};

//* ---------------XXXX---------------------/
export const fetDealerName = async (dispatch, pState) => {
  const res = await axInst.post("/dealer_names", {
    state_filter: pState || [],
  });
  const mcArray = res.data.map((bucket) => bucket.key);
  dispatch(updateFil({ arr: mcArray, key: "dealer_name_filter" }));
  return mcArray;
};

//* ---------------XXXX---------------------/
export const fetchLOB = async (pDealerNames) => {
  const res = await axInst.post("/lobs", {
    dealer_name_filter: pDealerNames || [],
  });

  const lobArray = res.data
    .map((bucket) => bucket.key)
    .filter((e) => e !== "Unspecified");

  return lobArray;
};

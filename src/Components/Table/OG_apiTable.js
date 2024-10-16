import { axInst } from "../../App";
import { skeletone } from "./dum";

const [newCntStruct, existCntStruct, newRevStruct, existRevStruct] = [
  1, 2, 3, 4,
].map((e) => structuredClone(skeletone));

async function callApi({ url, body }) {
  try {
    const { data } = await axInst.post(url, body);

    return data;
  } catch (error) {
    console.error("callApi", error);
  }
}

async function getGTDetails(params) {
  try {
    const { data } = await axInst.post("/api/getGTDetails", params);

    return data;
  } catch (error) {
    console.log("getGTDetails", error);
  }
}

function retPercent(value, total) {
  return `${((value / total) * 100).toFixed(2)}%`;
}

function fmt(num) {
  const frmt = new Intl.NumberFormat("en-IN", {
    // style: "currency",
    // currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    // notation: "compact",
    compactDisplay: "long",
  });

  return frmt.format(num);
}

function segregate(arr) {
  try {
    const segObj = arr.reduce(
      (acc, e) => {
        // if (acc.count[e.key.retailed] === undefined) {
        //   acc.count[e.key.retailed] = {};
        //   acc.revenue[e.key.retailed] = {};
        // }

        acc.count[e.key.retailed][e.key.lob] = e.veh.value;
        acc.revenue[e.key.retailed][e.key.lob] = e.revenue.value;

        return acc;
      },
      {
        count: {
          FY24: {
            Buses: 0,
            HCV: 0,
            ILMCV: 0,
            Magic_Winger: 0,
            Pickups: 0,
            "SCV Cargo": 0,
            SCVPass: 0,
            Yodha_Ace_EV: 0,
            total: 0,
            index: 0,
          },
          FY_23_and_before: {
            Buses: 0,
            HCV: 0,
            ILMCV: 0,
            Magic_Winger: 0,
            Pickups: 0,
            "SCV Cargo": 0,
            SCVPass: 0,
            Yodha_Ace_EV: 0,
            total: 0,
            index: 0,
          },
        },
        revenue: {
          FY24: {
            Buses: 0,
            HCV: 0,
            ILMCV: 0,
            Magic_Winger: 0,
            Pickups: 0,
            "SCV Cargo": 0,
            SCVPass: 0,
            Yodha_Ace_EV: 0,
            total: 0,
            index: 0,
          },
          FY_23_and_before: {
            Buses: 0,
            HCV: 0,
            ILMCV: 0,
            Magic_Winger: 0,
            Pickups: 0,
            "SCV Cargo": 0,
            SCVPass: 0,
            Yodha_Ace_EV: 0,
            total: 0,
            index: 0,
          },
        },
      }
    );

    return segObj;
  } catch (error) {
    console.lob("segregate---", error);
    return {};
  }
}

function addTotAndIndex(totArr, segObj, index) {
  try {
    totArr.forEach((e) => {
      segObj.count[e.key.retailed].total = e.veh.value;
      segObj.count[e.key.retailed].index = index;
      segObj.revenue[e.key.retailed].total = e.revenue.value;
      segObj.revenue[e.key.retailed].index = index;
    });
  } catch (error) {
    console.log("addTotAndIndex----", error);
  }
}

function finalStruct(params, grandTot) {
  try {
    Object.entries(params).forEach(([key, value]) => {
      Object.entries(value).forEach(([k, v]) => {
        if (key === "count") {
          Object.entries(v).forEach(([k1, v1]) => {
            if (k === "FY24") {
              newCntStruct[v.index][k1] = v1;

              newCntStruct[v.index + 1][k1] = retPercent(v1, grandTot.veh);
            }
            if (k === "FY_23_and_before") {
              existCntStruct[v.index][k1] = v1;

              existCntStruct[v.index + 1][k1] = retPercent(v1, grandTot.veh);
            }
          });
        }

        if (key === "revenue") {
          Object.entries(v).forEach(([k1, v1]) => {
            if (k === "FY24") {
              newRevStruct[v.index][k1] = fmt(v1);

              newRevStruct[v.index + 1][k1] = retPercent(v1, grandTot.rev);
            }
            if (k === "FY_23_and_before") {
              existRevStruct[0][k1] = fmt(v1);

              existRevStruct[1][k1] = retPercent(v1, grandTot.rev);
            }
          });
        }
      });
    });
  } catch (error) {
    console.log("finalStruct----", error);
  }
}

const urls = [
  { url: "/new_count" },
  { url: "/new_count_lob_wise" },
  { url: "/std_new_veh_count" },
  { url: "/std_cnt_new_lob_wise" },
];

export async function getAll(params) {
  try {
    const [newCount, lobNewCount, std, stdLob] = await Promise.allSettled(
      urls.map((url) => callApi({ ...url, body: params }))
    );

    console.log("std----", std.value);

    console.log("stdLob----", stdLob.value);

    const grandTot = newCount.value.reduce(
      (acc, curr) => {
        acc.veh += curr.veh.value;
        acc.rev += curr.revenue.value;
        return acc;
      },
      { veh: 0, rev: 0 }
    );

    const check = segregate(lobNewCount.value);
    const stdObj = segregate(std.value);
    console.log(stdObj);

    addTotAndIndex(newCount.value, check, 0);

    addTotAndIndex(std.value, stdObj, 2);
    finalStruct(check, grandTot);
    finalStruct(stdObj, grandTot);

    return { newCntStruct, existCntStruct, newRevStruct, existRevStruct };
  } catch (error) {
    console.error("getAll------", error);
    return [];
  }
}

import { axInst } from "../../App";
import { skeletone } from "./dum";

const [newCntStruct, existCntStruct, newRevStruct, existRevStruct] = [
  1, 2, 3, 4,
].map(() => structuredClone(skeletone));

async function callApi(url, body, ten = 0) {
  try {
    const { data } = await axInst.post(url, { ...body, ten });

    return data;
  } catch (error) {
    console.error("callApi", error);
  }
}

function retPercent(value, total) {
  return `${((value / total) * 100).toFixed(2)}%`;
}

export function fmt(num) {
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

const urls = [
  [
    { url: "/grand_total", id: "grand-total" },
    { url: "/gt_lob_wise", id: "grand-total" },
  ],
  [
    { url: "/new_count", index: 0, id: "new-veh" },
    { url: "/new_count_lob_wise", index: 0, id: "new-veh" },
  ],
  [
    { url: "/std_new_veh_count", index: 2, id: "std-prt" },
    { url: "/std_cnt_new_lob_wise", index: 2, id: "std-prt" },
  ],
  [
    { url: "/std_new_veh_count", index: 4, ten: 1, id: "std-chd" },
    { url: "/std_cnt_new_lob_wise", index: 4, ten: 1, id: "std-chd" },
  ],
  [
    { url: "/fp_veh_cnt", id: "fp-prt" },
    { url: "/fp_new_cnt_lob_wise", id: "fp-prt" },
  ],
  [
    { url: "/fp_veh_cnt", ten: 1, id: "fp-chd" },
    { url: "/fp_new_cnt_lob_wise", ten: 1, id: "fp-chd" },
  ],
  [
    { url: "/upgrade_cnt", id: "up-prt" },
    { url: "/upgrade_cnt_lob_wise", id: "up-prt" },
  ],
  [
    { url: "/upgrade_cnt", ten: 1, id: "up-chd" },
    { url: "/upgrade_cnt_lob_wise", ten: 1, id: "up-chd" },
  ],
];

export async function getAll(params) {
  try {
    let grandTot = [];

    for (const arr of urls) {
      const [newCount, lobNewCount] = await Promise.allSettled(
        arr.map((obj) => callApi(obj.url, params, obj?.ten))
      );

      // ! Do not delete this
      // if (arr[0].index === 0) {
      //   let Tot = newCount.value.reduce(
      //     (acc, curr) => {
      //       acc.veh += curr.veh.value;
      //       acc.rev += curr.revenue.value;
      //       return acc;
      //     },
      //     { veh: 0, rev: 0 }
      //   );
      //   grandTot.push(Tot);
      // }

      newCount.value.forEach((e) => {
        let index;

        if (!arr[0].ten) {
          index = newCntStruct.findIndex((e) => e.plan.id === arr[0].id);
        }

        if (arr[0].ten === 1) {
          index = newCntStruct.findIndex(
            (elem) =>
              e.key.planTen === elem.plan.name && elem.plan.id === arr[0].id
          );
        }

        if (e.key?.retailed === "FY24") {
          newCntStruct[index].total = e.veh.value;
          newCntStruct[index + 1].total = retPercent(
            e.veh.value,
            grandTot[0].veh
          );
          newRevStruct[index].total = e.revenue.value;
          newRevStruct[index + 1].total = retPercent(
            e.revenue.value,
            grandTot[0].rev
          );
        }

        if (e.key?.retailed === "FY_23_and_before") {
          existCntStruct[index].total = e.veh.value;
          existCntStruct[index + 1].total = retPercent(
            e.veh.value,
            grandTot[0].veh
          );
          existRevStruct[index].total = e.revenue.value;
          existRevStruct[index + 1].total = retPercent(
            e.revenue.value,
            grandTot[0].rev
          );
        }

        if (arr[0].id === "grand-total") {
          newCntStruct[index].total = e.veh.value;
          newCntStruct[index + 1].total = retPercent(e.veh.value, e.veh.value);
          newRevStruct[index].total = e.revenue.value;
          newRevStruct[index + 1].total = retPercent(
            e.revenue.value,
            e.revenue.value
          );

          grandTot.push({ veh: e.veh.value, rev: e.revenue.value });
        }
      });

      lobNewCount.value.forEach((e) => {
        let index;

        if (!arr[0].ten) {
          index = newCntStruct.findIndex((e) => e.plan.id === arr[0].id);
        }

        if (arr[0].ten === 1) {
          index = newCntStruct.findIndex(
            (elem) =>
              e.key.planTen === elem.plan.name && elem.plan.id === arr[0].id
          );
        }

        if (e.key?.retailed === "FY24") {
          newCntStruct[index][e.key.lob] = e.veh.value;
          newCntStruct[index + 1][e.key.lob] = retPercent(
            e.veh.value,
            grandTot[0].veh
          );
          newRevStruct[index][e.key.lob] = e.revenue.value;
          newRevStruct[index + 1][e.key.lob] = retPercent(
            e.revenue.value,
            grandTot[0].rev
          );
        }

        if (e.key?.retailed === "FY_23_and_before") {
          existCntStruct[index][e.key.lob] = e.veh.value;
          existCntStruct[index + 1][e.key.lob] = retPercent(
            e.veh.value,
            grandTot[0].veh
          );
          existRevStruct[index][e.key.lob] = e.revenue.value;
          existRevStruct[index + 1][e.key.lob] = retPercent(
            e.revenue.value,
            grandTot[0].rev
          );
        }

        if (arr[0].id === "grand-total") {
          newCntStruct[index][e.key.lob] = e.veh.value;
          newCntStruct[index + 1][e.key.lob] = retPercent(
            e.veh.value,
            grandTot[0].veh
          );
          newRevStruct[index][e.key.lob] = e.revenue.value;
          newRevStruct[index + 1][e.key.lob] = retPercent(
            e.revenue.value,
            grandTot[0].rev
          );
        }
      });
    }

    advCalc(newCntStruct, grandTot[0].veh);
    advCalc(existCntStruct, grandTot[0].veh);
    advCalc(newRevStruct, grandTot[0].rev);
    advCalc(existRevStruct, grandTot[0].rev);

    return { newCntStruct, existCntStruct, newRevStruct, existRevStruct };
  } catch (error) {
    console.error("getAll------", error);
    return { newCntStruct, existCntStruct, newRevStruct, existRevStruct };
  }
}

function advCalc(params, grandTot) {
  try {
    const advobj = params.find((e) => e.plan.id === "adv-prt");
    const advIdx = params.findIndex((e) => e.plan.id === "adv-prt");

    const fpObj = params.find((e) => e.plan.id === "fp-prt");
    const upObj = params.find((e) => e.plan.id === "up-prt");

    Object.keys(advobj).forEach((key) => {
      if (key === "plan") return;
      advobj[key] = fpObj[key] + upObj[key];
    });

    Object.keys(advobj).forEach((key) => {
      if (key === "plan") return;
      params[advIdx + 1][key] = retPercent(advobj[key], grandTot);
    });
  } catch (error) {
    console.error("advCalc----", error);
  }
}

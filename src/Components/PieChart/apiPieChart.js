import { axInst } from "../../App";

export async function getPlanWiseData(body) {
  try {
    const { data } = await axInst.post("/plan_wise", body);

    const arr = [];

    data.forEach((e) => {
      if (
        e.key.New_package_sold === "Advance" ||
        e.key.New_package_sold === "Standard" ||
        e.key.New_package_sold === "Upgrade"
      ) {
        arr.push({ name: e.key.New_package_sold, value: e.veh.value });
      }
    });

    return arr;
  } catch (error) {
    console.error("Error in getPlanWiseData", error);
    return [];
  }
}

async function getYearWiseData(url, body) {
  try {
    const { data } = await axInst.post(url, body);

    const arr = [];

    data.forEach((e) => {
      arr.push({ name: e.key.planTen, value: e.veh.value });
    });

    return arr;
  } catch (error) {
    console.error("Error in getYearWiseData", error);
    return [];
  }
}

export async function getRestPieData(body) {
  try {
    const [{ value: std }, { value: adv }, { value: upg }] =
      await Promise.allSettled(
        ["standard_wise", "advance_wise", "upgrade_wise"].map((e) =>
          getYearWiseData(e, body)
        )
      );

    return { std, adv, upg };
  } catch (error) {
    console.error("Error in getRestPieData", error);
    return [];
  }
}

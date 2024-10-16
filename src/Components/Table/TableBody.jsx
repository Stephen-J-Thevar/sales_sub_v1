import Card from "../Card";
import { fmt } from "./apiTable";

const blue400 = "bg-blue-400";
const blue200 = "bg-blue-200";
const slate100 = "bg-slate-100";
const slate300 = "bg-slate-300";
const cell = "border border-black";

function chStandard(event) {
  event.stopPropagation();
  const stdChds = document.querySelectorAll(".std-chd");
  stdChds.forEach((e) => {
    if (e.style.display === "none") {
      e.style.display = "";
    } else {
      e.style.display = "none";
    }
  });
}

function chAdvance(event) {
  event.stopPropagation();
  const advChdn = document.querySelectorAll(".adv-chd");
  advChdn.forEach((e) => {
    if (e.style.display === "none") {
      e.style.display = "";
    } else {
      e.style.display = "none";
    }
  });
}

function retOnClick(params) {
  if (!params) {
    return () => {};
  }

  if (params === "standard") return chStandard;

  if (params === "advance") return chAdvance;
}

function retCss(params) {
  if (params === "blue400") return blue400;

  if (params === "blue200") return blue200;

  if (params === "slate100") return slate100;

  if (params === "slate300") return slate300;
}

function retCell(params) {
  if (params === "cell") {
    return cell;
  }
  return "";
}

function retTd(tdcss, clss, data) {
  return (
    <td className={`${retCell(tdcss)} ${clss}`}>
      {typeof data === "number" ? fmt(data) : data}
    </td>
  );
}
//* ---------------COMP---------------------/
export const TableBody = ({ title, data }) => {
  //* ---------------JSX---------------------/
  return (
    <Card css={"p-2"}>
      <table className="w-full text-center border border-black">
        <thead>
          <tr className="text-lg font-bold bg-slate-200">
            <th colSpan={7} className={cell}>
              <p>{title} </p>
            </th>
          </tr>
          <tr className="text-white bg-indigo-900">
            {[
              "Active Plan",
              "Total",
              "HCV",
              "ILMCV",
              "Buses",
              "Yodha <br/>+ ACE EV",
              "Winger <br/>+ Magic",
            ].map((head) => (
              <th
                key={head}
                className={cell}
                dangerouslySetInnerHTML={{ __html: head }}
              ></th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data?.map((row) => (
            <tr
              key={Math.random()}
              className={`${retCss(row.plan?.css)} ${row.plan?.class}`}
            >
              {row.plan?.name && (
                <td
                  className={`${retCell(row.plan?.tdcss)} ${row.plan?.class}`}
                  rowSpan={row.plan?.rowSpan}
                  onClick={retOnClick(row.plan?.onclick)}
                >
                  {row.plan?.name && <p>{row.plan.name}</p>}
                  {row.plan?.small && <small>{row.plan.small}</small>}
                </td>
              )}
              {retTd(row.plan?.tdcss, row.plan?.class, row.total)}
              {retTd(row.plan?.tdcss, row.plan?.class, row.HCV)}
              {retTd(row.plan?.tdcss, row.plan?.class, row.ILMCV)}
              {retTd(row.plan?.tdcss, row.plan?.class, row.Buses)}
              {retTd(row.plan?.tdcss, row.plan?.class, row.Yodha_Ace_EV)}
              {retTd(row.plan?.tdcss, row.plan?.class, row.Magic_Winger)}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

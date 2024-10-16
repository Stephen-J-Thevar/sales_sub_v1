import React, { useState } from "react";
import Card from "../Card";
import { obj } from "./dum";

export const Headers = (title) => [
  [
    {
      label: (
        <div className="p-2 text-lg font-bold text-center bg-slate-200">
          {title}
        </div>
      ),
      colSpan: 7,
      rowSpan: 1,
    },
  ],
  [
    { label: "Active Plan", colSpan: 1, rowSpan: 1 },
    { label: "Total", colSpan: 1, rowSpan: 1 },
    { label: "HCV", colSpan: 1, rowSpan: 1 },
    { label: "ILMCV", colSpan: 1, rowSpan: 1 },
    { label: "Buses", colSpan: 1, rowSpan: 1 },
    {
      label: (
        <p>
          Yodha +<br /> ACE EV
        </p>
      ),
      colSpan: 1,
      rowSpan: 1,
    },
    {
      label: (
        <p>
          Winger <br />+ Magic
        </p>
      ),
      colSpan: 1,
      rowSpan: 1,
    },
  ],
];

// export const TableBody = ({ title, row1, row2last, rowlast, data }) => {
//   const headers = Headers(title);

//   const plans = [
//     { label: row1, colSpan: 1, rowSpan: 2 },
//     { label: "+ Standard", colSpan: 1, rowSpan: 2 },
//     { label: "+ Advance", colSpan: 1, rowSpan: 2 },
//     {
//       label: row2last,
//       colSpan: 1,
//       rowSpan: 1,
//     },
//     {
//       label: rowlast,
//       colSpan: 1,
//       rowSpan: 1,
//     },
//   ];

// const standardRows = [
//   ["Standard A", 100, 30, 20, 10, 5, 5],
//   ["Standard B", 200, 50, 40, 20, 10, 10],
//   ["Standard C", 180, 48, 28, 18, 9, 9],
// ];

//   return (
//     <Card css={"p-2"}>
//       <table className="w-full text-center">
//         <thead>
//           {headers.map((row, rowIndex) => (
//             <tr
//               key={rowIndex}
//               className={`${rowIndex === 1 ? "text-white bg-indigo-900" : ""}`}
//             >
//               {row.map((cell, cellIndex) => (
//                 <th
//                   className="border border-black"
//                   key={cellIndex}
//                   colSpan={cell.colSpan}
//                   rowSpan={cell.rowSpan}
//                 >
//                   {cell.label}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {data.map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               {rowIndex === 0 && (
//                 <td rowSpan={plans[0].rowSpan} className="border border-black">
//                   {plans[0].label}
//                 </td>
//               )}
//               {rowIndex === 2 && (
//                 <td rowSpan={plans[1].rowSpan} className="border border-black">
//                   {plans[1].label}
//                 </td>
//               )}
//               {rowIndex === 4 && (
//                 <td rowSpan={plans[2].rowSpan} className="border border-black">
//                   {plans[2].label}
//                 </td>
//               )}
//               {rowIndex === 6 && (
//                 <td rowSpan={plans[3].rowSpan} className="border border-black">
//                   {plans[3].label}
//                 </td>
//               )}
//               {rowIndex === 7 && (
//                 <td rowSpan={plans[4].rowSpan} className="border border-black">
//                   {plans[4].label}
//                 </td>
//               )}
//               {row.map((cell, cellIndex) => (
//                 <td className="border border-black" key={cellIndex}>
//                   {cell}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </Card>
//   );
// };

export const TableBody = ({
  title,
  small,
  row1,
  row2last,
  rowlast,
  rowlastdata,
  data,
  setAdvance,
  setStandard,
  advance,
  standard,
}) => {
  const blue400 = "bg-blue-400";
  const blue200 = "bg-blue-200";
  function chStandard() {
    setStandard((pre) => !pre);
  }

  function retOnClick(params) {
    if (!params) {
      return () => {};
    }

    if (params === "standard") {
      return chStandard;
    }
  }
  return (
    <Card css={"p-2"}>
      <table className="w-full text-center">
        <thead>
          <tr className="text-lg font-bold bg-slate-200">
            <th colSpan={7} className={cell}>
              <p>{title} </p>
            </th>
          </tr>
          <tr className="text-white bg-indigo-900">
            <th className={cell}>Active Plan</th>
            <th className={cell}>Total</th>
            <th className={cell}>HCV</th>
            <th className={cell}>ILMCV</th>
            <th className={cell}>Buses</th>
            <th className={cell}>
              Yodha +<br /> ACE EV
            </th>
            <th className={cell}>
              Winger <br />+ Magic
            </th>
          </tr>
        </thead>

        <tbody>
          {obj.map((row) => (
            <tr
              key={Math.random()}
              className={row.plan?.css === "blue400" ? blue400 : blue200}
            >
              {row.plan?.name && (
                <td
                  className={row.plan?.tdcss}
                  rowSpan={row.plan?.rowSpan}
                  onClick={retOnClick(row.plan?.onclick)}
                >
                  {row.plan?.name && <p>{row.plan.name}</p>}
                  {row.plan?.small && <small>{row.plan.small}</small>}
                </td>
              )}
              <td className={row.plan?.tdcss}>{row.total}</td>
              <td className={row.plan?.tdcss}>{row.hcv}</td>
              <td className={row.plan?.tdcss}>{row.ilmcv}</td>
              <td className={row.plan?.tdcss}>{row.buses}</td>
              <td className={row.plan?.tdcss}>{row.yodha}</td>
              <td className={row.plan?.tdcss}>{row.winger}</td>
            </tr>
          ))}
          {/* <tr className="bg-blue-400">
            <td className={cell} rowSpan={2}>
              <p>{row1}</p>
              <small>{small}</small>
            </td>
            <td className={cell}>4</td>
            <td className={cell}>4</td>
            <td className={cell}>4</td>
            <td className={cell}>4</td>
            <td className={cell}>4</td>
            <td className={cell}>4</td>
          </tr>
          <tr className="bg-blue-400">
            <td className={cell}>4</td>
            <td className={cell}>4</td>
            <td className={cell}>4</td>
            <td className={cell}>4</td>
            <td className={cell}>4</td>
            <td className={cell}>4</td>
          </tr> */}
          {/* <tr className="bg-blue-200">
            <td
              onClick={() => setStandard(!standard)}
              className={cell}
              rowSpan={2}
            >
              + Standard
            </td>
            <td className={cell}>4</td>
            <td className={cell}>4</td>
            <td className={cell}>4</td>
            <td className={cell}>4</td>
            <td className={cell}>4</td>
            <td className={cell}>4</td>
          </tr>
          <tr className="bg-blue-200">
            <td className={cell}>4</td>
            <td className={cell}>4</td>
            <td className={cell}>4</td>
            <td className={cell}>4</td>
            <td className={cell}>4</td>
            <td className={cell}>4</td>
          </tr> */}
          {standard && (
            <>
              <tr className="bg-slate-100">
                <td rowSpan={2} className={cell}>
                  1Y
                </td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
              </tr>
              <tr className="bg-slate-100">
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
              </tr>
              <tr className="bg-slate-100">
                <td rowSpan={2} className={cell}>
                  2Y
                </td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
              </tr>
              <tr className="bg-slate-100">
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
              </tr>
              <tr className="bg-slate-100">
                <td rowSpan={2} className={cell}>
                  3Y
                </td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
              </tr>
              <tr className="bg-slate-100">
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
              </tr>
            </>
          )}
          <tr className="bg-blue-200">
            <td
              onClick={() => setAdvance(!advance)}
              className={cell}
              rowSpan={2}
            >
              + Advance
            </td>
            <td className={cell}>4</td>
            <td className={cell}>4</td>
            <td className={cell}>4</td>
            <td className={cell}>4</td>
            <td className={cell}>4</td>
            <td className={cell}>4</td>
          </tr>
          <tr className="bg-blue-200">
            <td className={cell}>4</td>
            <td className={cell}>4</td>
            <td className={cell}>4</td>
            <td className={cell}>4</td>
            <td className={cell}>4</td>
            <td className={cell}>4</td>
          </tr>
          {advance && (
            <>
              <tr className="bg-slate-300">
                <td rowSpan={2} className={cell}>
                  Full-Purchase
                </td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
              </tr>
              <tr className="bg-slate-300">
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
              </tr>
              <tr className="bg-slate-100">
                <td rowSpan={2} className={cell}>
                  1Y
                </td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
              </tr>
              <tr className="bg-slate-100">
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
              </tr>
              <tr className="bg-slate-100">
                <td rowSpan={2} className={cell}>
                  2Y
                </td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
              </tr>
              <tr className="bg-slate-100">
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
              </tr>
              <tr className="bg-slate-100">
                <td rowSpan={2} className={cell}>
                  3Y
                </td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
              </tr>
              <tr className="bg-slate-100">
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
              </tr>

              <tr className="bg-slate-300">
                <td rowSpan={2} className={cell}>
                  Upgrade
                </td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
              </tr>
              <tr className="bg-slate-300">
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
              </tr>
              <tr className="bg-slate-100">
                <td rowSpan={2} className={cell}>
                  1Y
                </td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
              </tr>
              <tr className="bg-slate-100">
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
              </tr>
              <tr className="bg-slate-100">
                <td rowSpan={2} className={cell}>
                  2Y
                </td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
              </tr>
              <tr className="bg-slate-100">
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
              </tr>
              <tr className="bg-slate-100">
                <td rowSpan={2} className={cell}>
                  3Y
                </td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
              </tr>
              <tr className="bg-slate-100">
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
                <td className={cell}>4</td>
              </tr>
            </>
          )}
          <tr className="bg-blue-400">
            <td className={cell}>{row2last}</td>
            <td className={cell}>4</td>
            <td className={cell}>4</td>
            <td className={cell}>4</td>
            <td className={cell}>4</td>
            <td className={cell}>4</td>
            <td className={cell}>4</td>
          </tr>
          <tr className="bg-blue-400">
            <td className={cell}>{rowlast}</td>
            {rowlastdata?.map((e) => (
              <td className={cell}>{e}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </Card>
  );
};

export const CustomTable = ({ title, data }) => {
  const [expandedStates, setExpandedStates] = useState(
    data.reduce((acc, row) => {
      acc[row.name] = false;
      return acc;
    }, {})
  );

  const handleToggle = (rowName) => {
    setExpandedStates((prevStates) => ({
      ...prevStates,
      [rowName]: !prevStates[rowName],
    }));
  };

  const columns = [
    "Active Plan",
    "Total",
    "HCV",
    "ILMCV",
    "Buses",
    "Yodha + ACE EV",
    "Winger + Magic",
  ];

  return (
    <div className="p-2 card">
      <table className="w-full">
        <thead>
          <tr>
            <th colSpan={columns.length} className={cell}>
              {title}
            </th>
          </tr>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={cell}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <tr onClick={() => handleToggle(row.name)}>
                <td
                  className={cell}
                  rowSpan={row.subRows ? row.subRows.length + 1 : 1}
                >
                  {row.name}
                </td>
                {row.values.map((value, valueIndex) => (
                  <td key={valueIndex} className={cell}>
                    {value}
                  </td>
                ))}
              </tr>
              {row.subRows &&
                row.subRows.map((subRow, subRowIndex) => (
                  <tr key={subRowIndex}>
                    {subRow.values.map((value, valueIndex) => (
                      <td key={valueIndex} className={cell}>
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              {expandedStates[row.name] &&
                row.expandedRows.map((expandedRow, expandedRowIndex) => (
                  <tr key={expandedRowIndex}>
                    <td className={cell}>{expandedRow.name}</td>
                    {expandedRow.values.map((value, valueIndex) => (
                      <td key={valueIndex} className={cell}>
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const cell = "border border-black";

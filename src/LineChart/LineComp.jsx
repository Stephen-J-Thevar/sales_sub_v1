import Card from "../Components/Card";
import LineMixBar from "./LineMixBar";

export const Linecard = ({ title, graph }) => {
  return (
    <Card css={"p-2"}>
      <div className="p-2 text-lg font-bold text-center bg-slate-200">
        {title}
      </div>
      <div>{graph}</div>
    </Card>
  );
};

export const LineComp = () => {
  return (
    <div className="grid gap-2 lg:grid-cols-2">
      <Linecard
        title={"Weekly Sales and Revenue"}
        graph={
          <LineMixBar
            xdata={["01-09Aug", "10-17Aug", "18-24Aug", "25-31Aug"]}
            sales={[3290, 1570, 0, 0]}
            revenue={[14578172, 7775220, 0, 0]}
          />
        }
      />
      <Linecard
        title={"Daily Sales"}
        graph={
          <LineMixBar
            xdata={[
              "7Aug",
              "8Aug",
              "9Aug",
              "10Aug",
              "11Aug",
              "12Aug",
              "13Aug",
              "14Aug",
            ]}
            sales={[507, 622, 317, 297, 295, 116, 259, 393, 504]}
            revenue={[
              1936519, 1886650, 1686069, 1443369, 587220, 1566158, 2193287,
              1978079,
            ]}
          />
        }
      />
      <Linecard
        title={"Weekly Cumulative Sales and Revenue"}
        graph={
          <LineMixBar
            xdata={["01-09Aug", "10-17Aug", "18-24Aug", "25-31Aug"]}
            sales={[3290, 4860, 0, 0]}
            revenue={[14578172, 22353392, 0, 0]}
          />
        }
      />
      <Card css={"p-2 grid gap-2"}>
        <table className="w-full text-center">
          <thead>
            <tr className="text-white bg-indigo-900">
              <th className={cell}>Customer Count</th>
              <th className={cell}>MAC</th>
              <th className={cell}>WAC</th>
              <th className={cell}>DAC</th>
              <th className={cell}>Active Customer</th>
              <th className={cell}>Inactive Customer</th>
              <th className={cell}>Total Customer</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr>
              <td className={`${cell} text-nowrap`}># of Customers</td>
              <td className={cell}>11,033</td>
              <td className={cell}>11,033</td>
              <td className={cell}>11,033</td>
              <td className={cell}>11,033</td>
              <td className={cell}>11,033</td>
              <td className={cell}>11,033</td>
            </tr>

            <tr>
              <td className={cell}>% of Customers</td>
              <td className={cell}>11,033</td>
              <td className={cell}>11,033</td>
              <td className={cell}>11,033</td>
              <td className={cell}>11,033</td>
              <td className={cell}>11,033</td>
              <td className={cell}>11,033</td>
            </tr>
          </tbody>
        </table>

        <table className="w-full text-center">
          <thead>
            <tr className="text-white bg-indigo-900">
              <th className={cell}>Avg. Time spent/ Engagement Day/Fleet</th>
              <th className={cell}>
                Selected Month
                <br />
                (In min)
              </th>
              <th className={cell}>
                Last Month
                <br />
                (In min)
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr>
              <td className={cell}>Fleet Size: More than 50</td>
              <td className={cell}>11,033</td>
              <td className={cell}>11,033</td>
            </tr>

            <tr>
              <td className={cell}>Fleet Size: Between 11 to 50</td>
              <td className={cell}>11,033</td>
              <td className={cell}>11,033</td>
            </tr>

            <tr>
              <td className={cell}>Fleet Size: Between 06 to 10</td>
              <td className={cell}>11,033</td>
              <td className={cell}>11,033</td>
            </tr>

            <tr>
              <td className={cell}>Fleet Size: Between 02 to 05</td>
              <td className={cell}>11,033</td>
              <td className={cell}>11,033</td>
            </tr>

            <tr>
              <td className={cell}>Fleet Size: Greater than and Equal to 2</td>
              <td className={cell}>11,033</td>
              <td className={cell}>11,033</td>
            </tr>
          </tbody>
        </table>

        <small>
          <b>Note </b>:- Data of Aug and Data Only Available From 2024-03-01 TO
          2024-08-11 | <b>MAC</b>:Monthly Active Customers | <b>WAC</b>
          :Weekly Active Customers | <b>DAC</b>:Daily Active Customers
        </small>
      </Card>
    </div>
  );
};
const cell = "border border-black p-0.5";

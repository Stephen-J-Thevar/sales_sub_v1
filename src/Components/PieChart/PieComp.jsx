import { useQuery } from "@tanstack/react-query";
import Card from "../Card";
import PieChart from "./PieChart";
import { getPlanWiseData, getRestPieData } from "./apiPieChart";
import { useSelector } from "react-redux";

export const Piecard = ({ title, graph }) => {
  return (
    <Card css={"p-2"}>
      <div className="p-2 text-lg font-bold text-center bg-slate-200">
        {title}
      </div>
      <div>{graph}</div>
    </Card>
  );
};

export const PieComp = () => {
  const { data, submitted } = useSelector((state) => state.filters);

  const { data: planData } = useQuery({
    queryKey: ["planData", submitted],
    queryFn: () => getPlanWiseData(data.filterdata),
    initialData: [],
  });

  const { data: restData } = useQuery({
    queryKey: ["restData", submitted],
    queryFn: () => getRestPieData(data.filterdata),
    initialData: [],
  });

  return (
    <div className="grid items-center gap-2 lg:grid-cols-4">
      <Piecard title={"Plan Wise Sales"} graph={<PieChart data={planData} />} />
      <Piecard
        title={"Standard:Year Wise Sales"}
        graph={<PieChart data={restData.std} />}
      />
      <Piecard
        title={"Advance:Year Wise Sales"}
        graph={<PieChart data={restData.adv} />}
      />
      <Piecard
        title={"Upgrade:Year Wise Sales"}
        graph={<PieChart data={restData.upg} />}
      />
    </div>
  );
};

import Filters from "../Components/Filters/Filters";
import { Header } from "../Components/Header";
import { PieComp } from "../Components/PieChart/PieComp";
import { Table } from "../Components/Table/Table";
import { LineComp } from "../LineChart/LineComp";

export default function First() {
  return (
    <div className="grid h-screen gap-2">
      <Header title={"Subscription Sales Insights"} />
      <div className="grid gap-2 mx-2">
        <Filters />
        <PieComp />
        <Table />
        <LineComp />
      </div>
    </div>
  );
}

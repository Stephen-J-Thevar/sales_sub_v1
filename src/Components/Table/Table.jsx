import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getAll } from "./apiTable";
import { TableBody } from "./TableBody";

//* ---------------COMP---------------------/
export const Table = () => {
  const { data, submitted } = useSelector((state) => state.filters);

  const { data: allData } = useQuery({
    queryKey: ["all", submitted],
    queryFn: () => getAll(data.filterdata),
    initialData: [],
  });

  //* ---------------JSX---------------------/
  return (
    <div className="grid gap-2 lg:grid-cols-2">
      <TableBody
        title={"New Vehicle: LOB wise sales"}
        data={allData.newCntStruct}
      />

      <TableBody
        title={"Existing Vehicle: LOB wise sales"}
        data={allData.existCntStruct}
      />

      <TableBody
        title={"New Vehicle: LOB wise Revenue (INR)"}
        data={allData.newRevStruct}
      />

      <TableBody
        title={"Existing Vehicle: LOB wise sales"}
        data={allData.existRevStruct}
      />
    </div>
  );
};

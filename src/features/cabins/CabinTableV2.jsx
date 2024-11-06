import { getCabins } from "../../services/apiCabins";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useCabins } from "./useCabin";

function CabinTable() {
  const [searchParams] = useSearchParams();
  const { isLoading, cabins } = useCabins();

  // const { isLoading, data: cabins } = useQuery({
  //   queryKey: ["cabin"],
  //   queryFn: getCabins,
  // });

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName={"cabin"} />;

  // const filterValue = searchParams.get("discount") || "all";

  // console.log("filtered value", filterValue);
  console.log("cabindata", cabins);

  // 1) FILTER
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === null);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2) sort by
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  console.log("direction", direction);
  console.log("field", field);
  const modifier = direction === "asc" ? 1 : -1;
  console.log("modifier", modifier);
  const storedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 2fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          // data={cabins}
          // data={filteredCabins}
          data={storedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
        {/* {cabins.map((cabin) => (
            <CabinRow cabin={cabin} key={cabin.id} />
          ))} */}
      </Table>
    </Menus>
  );
}

export default CabinTable;

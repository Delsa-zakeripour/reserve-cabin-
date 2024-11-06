import { useEffect } from "react";
import CobinTable from "../features/cabins/CabinTableV2";
import { getCabins } from "../services/apiCabins";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTableOperation from "../features/cabins/CabinTableOperation";
import AddCabin from "../features/cabins/AddCabin";

function Cabins() {
  // useEffect(function () {
  //   getCabins().then((data) => console.log(data));
  // }, []);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        {/* <p>sort/ filter</p> */}
        <CabinTableOperation />
      </Row>

      <Row>
        <CobinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;

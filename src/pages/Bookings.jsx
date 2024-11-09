import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Bookings() {
  return (
    <>
      <Row type="vertical">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
        <BookingTable />
      </Row>
    </>
  );
}

export default Bookings;

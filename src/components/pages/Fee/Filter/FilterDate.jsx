import { useState } from "react";
import { DateRangePicker } from "rsuite";

export default function FilterDate({ input }) {
  const [selectedDate, setSelectedDate] = useState({
    startDate: "",
    endDate: "",
  });

  let changeStartDate = selectedDate.startDate;
  let changeEndDate = selectedDate.endDate;

  const inputStartDate = new Date(changeStartDate);
  const inputEndDate = new Date(changeEndDate);

  const formattedStartDate = inputStartDate.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const formattedEndDate = inputEndDate.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  input.startDate = formattedStartDate;
  input.endDate = formattedEndDate;

  const handleDateSelect = (value) => {
    setSelectedDate({
      startDate: value[0],
      endDate: value[1],
    });
  };

  const styles = {
    width: "100%",
    display: "block",
    marginBottom: 10,
  };

  const calendarStyles = {
    backgroundColor: "black", // Ganti warna latar belakang sesuai keinginan, contoh warna hitam
  };

  return (
    <>
      <DateRangePicker
        size="md"
        placeholder="Transaction Date"
        style={styles}
        calendarStyle={calendarStyles}
        value={[selectedDate.startDate, selectedDate.endDate]}
        onChange={handleDateSelect}
      />
    </>
  );
}

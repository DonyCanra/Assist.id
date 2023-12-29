import { DateRangePicker } from "rsuite";
import subDays from "date-fns/subDays";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import addDays from "date-fns/addDays";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import addMonths from "date-fns/addMonths";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function FilterDate({ handleFetch }) {
  const [input, setInput] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  let changeStartDate = input.startDate;
  let changeEndDate = input.endDate;

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

  console.log(formattedStartDate); // Output: "2023-12-30"
  console.log(formattedEndDate); // Output: "2023-12-30"

  const predefinedRanges = [
    {
      label: "Today",
      value: [new Date(), new Date()],
      placement: "left",
    },
    {
      label: "Yesterday",
      value: [addDays(new Date(), -1), addDays(new Date(), -1)],
      placement: "left",
    },
    {
      label: "This week",
      value: [startOfWeek(new Date()), endOfWeek(new Date())],
      placement: "left",
    },
    {
      label: "Last 7 days",
      value: [subDays(new Date(), 6), new Date()],
      placement: "left",
    },
    {
      label: "Last 30 days",
      value: [subDays(new Date(), 29), new Date()],
      placement: "left",
    },
    {
      label: "This month",
      value: [startOfMonth(new Date()), new Date()],
      placement: "left",
    },
    {
      label: "Last month",
      value: [startOfMonth(addMonths(new Date(), -1)), endOfMonth(addMonths(new Date(), -1))],
      placement: "left",
    },
    {
      label: "This year",
      value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
      placement: "left",
    },
    {
      label: "Last year",
      value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date(new Date().getFullYear(), 0, 0)],
      placement: "left",
    },
    {
      label: "All time",
      value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()],
      placement: "left",
    },
    {
      label: "Last week",
      closeOverlay: false,
      value: (value) => {
        const [start = new Date()] = value || [];
        return [addDays(startOfWeek(start, { weekStartsOn: 0 }), -7), addDays(endOfWeek(start, { weekStartsOn: 0 }), -7)];
      },
      appearance: "default",
    },
    {
      label: "Next week",
      closeOverlay: false,
      value: (value) => {
        const [start = new Date()] = value || [];
        return [addDays(startOfWeek(start, { weekStartsOn: 0 }), 7), addDays(endOfWeek(start, { weekStartsOn: 0 }), 7)];
      },
      appearance: "default",
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    const inputFilter = {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };
    dispatch(handleFetch(inputFilter));
  }, [dispatch, handleFetch, formattedStartDate, formattedEndDate]);

  return (
    <>
      <DateRangePicker ranges={predefinedRanges} showOneCalendar placeholder="Filter Calendar" style={{ width: 350, background: "#000" }} value={[input.startDate, input.endDate]} onChange={(value) => setInput({ startDate: value[0], endDate: value[1] })} />
    </>
  );
}

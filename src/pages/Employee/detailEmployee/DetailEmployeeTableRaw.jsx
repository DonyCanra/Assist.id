import { formatCurrencyRupiah } from "../../../utils/formatCurrency";

export default function Row({ employee, index }) {
  return (
      <tr className="border-bottom border-top">
        <th scope="row">{index + 1}</th>
        <td>{employee.dateChange}</td>
        <td>{employee.actor}</td>
        <td>{formatCurrencyRupiah(employee.maxAmountBefore)}</td>
        <td>{formatCurrencyRupiah(employee.maxAmountAfter)}</td>
      </tr>
  );
}

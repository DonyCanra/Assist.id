import { formatCurrencyRupiah } from "../../../../utils/formatCurrency";

export default function Raw({ employee, index, handleDeleteFunction }) {
  const onDeleteClick = () => {
    handleDeleteFunction(index);
  };
  return (
      <tr className="border-bottom border-top">
        <td>{index + 1}</td>
        <td>{employee.name}</td>
        <td>{employee.nik}</td>
        <td>{employee.phoneNumber}</td>
        <td>{employee.email}</td>
        <td>{formatCurrencyRupiah(employee.maxAmount)}</td>
        <td>
          <svg style={{ cursor: "pointer" }} onClick={onDeleteClick} xmlns="http://www.w3.org/2000/svg" width="14" height="17" viewBox="0 0 14 17" fill="none">
            <path
              d="M13.5 1.40423H9.749L9.455 0.804419C9.39275 0.676579 9.297 0.569049 9.17848 0.493891C9.05996 0.418732 8.92336 0.378918 8.784 0.378913H5.212C5.07266 0.37832 4.93597 0.418026 4.81764 0.493472C4.6993 0.568917 4.60412 0.677045 4.543 0.805444L4.25 1.40423H0.5C0.367392 1.40423 0.240215 1.45824 0.146447 1.55438C0.0526784 1.65053 0 1.78092 0 1.91689L0 2.9422C0 3.07817 0.0526784 3.20857 0.146447 3.30471C0.240215 3.40085 0.367392 3.45486 0.5 3.45486H13.5C13.6326 3.45486 13.7598 3.40085 13.8536 3.30471C13.9473 3.20857 14 3.07817 14 2.9422V1.91689C14 1.78092 13.9473 1.65053 13.8536 1.55438C13.7598 1.45824 13.6326 1.40423 13.5 1.40423ZM1.662 15.3403C1.68542 15.7311 1.85333 16.0981 2.13149 16.3663C2.40966 16.6346 2.77713 16.7839 3.159 16.784H10.839C11.2211 16.7847 11.589 16.636 11.8678 16.3681C12.1465 16.1002 12.3151 15.7333 12.339 15.3424L13 4.48018H1L1.662 15.3403Z"
              fill="#FF0000"
            />
          </svg>
        </td>
      </tr>
  );
}

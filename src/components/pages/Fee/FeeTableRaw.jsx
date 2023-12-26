import { useNavigate } from "react-router-dom";
import { formatCurrencyRupiah } from "../../../utils/formatCurrency";

export default function Row({ fee, index }) {
  const navigate = useNavigate();

  const handleDetailClick = () => {
    // Pindah ke halaman detail dengan parameter id
    navigate(`/detail-fee?transactionNo=${fee.transactionNo}`);
  };
  return (
    <>
      <tr className="border-bottom border-top">
        <td>{index + 1}</td>
        <td>{fee.transactionDate}</td>
        <td>{fee.transactionNo}</td>
        <td>{fee.employeeName}</td>
        <td>{fee.employeePhoneNumber}</td>
        <td>{fee.employeeEmail}</td>
        <td>{formatCurrencyRupiah(fee.disburseAmount)}</td>
        <td>{formatCurrencyRupiah(fee.clientFee)}</td>
        <td>
          <button
            style={{
              color: fee.status === "SUCCESS" ? "#38CB89" : "#F00",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
              borderRadius: "5px",
              border: fee.status === "SUCCESS" ? "1px solid #38CB89" : "1px solid #F00",
              background: "rgba(56, 203, 137, 0.10)",
              width: "78px",
              height: "22px",
            }}
          >
            {fee.status === "SUCCESS" ? "Success" : "Failed"}
          </button>
        </td>
        <td>
          {/* <Link to="/detail-employee/1"> */}
          {/* <a href="/detail-employee/1"> */}
          <svg onClick={handleDetailClick} xmlns="http://www.w3.org/2000/svg" className="side-menu__icon" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12.5 25C19.4036 25 25 19.4036 25 12.5C25 5.59644 19.4036 0 12.5 0C5.59644 0 0 5.59644 0 12.5C0 19.4036 5.59644 25 12.5 25Z" fill="#0A579B" />
            <path
              d="M12.5874 8.56125C12.2321 8.56679 11.8795 8.62324 11.5403 8.72889C11.6972 9.00466 11.7807 9.31606 11.783 9.63331C11.783 9.87954 11.7345 10.1234 11.6402 10.3508C11.546 10.5783 11.4079 10.785 11.2338 10.9591C11.0597 11.1332 10.853 11.2713 10.6255 11.3656C10.398 11.4598 10.1542 11.5083 9.90798 11.5083C9.59072 11.5061 9.27934 11.4225 9.00356 11.2657C8.78597 12.0201 8.81127 12.8239 9.07587 13.5631C9.34047 14.3024 9.83096 14.9397 10.4779 15.3847C11.1248 15.8297 11.8953 16.0599 12.6803 16.0427C13.4653 16.0255 14.225 15.7617 14.8517 15.2887C15.4785 14.8158 15.9406 14.1576 16.1725 13.4074C16.4044 12.6573 16.3944 11.8531 16.1439 11.109C15.8935 10.3648 15.4152 9.71832 14.7769 9.26106C14.1386 8.80381 13.3726 8.55897 12.5874 8.56125ZM22.1168 11.823C21.2317 10.0495 19.8729 8.55567 18.1909 7.50703C16.5089 6.45839 14.5694 5.89588 12.5874 5.88184C10.6054 5.89702 8.66624 6.46016 6.98442 7.50896C5.3026 8.55776 3.94368 10.0513 3.05798 11.8245C2.98134 11.9761 2.94141 12.1436 2.94141 12.3134C2.94141 12.4833 2.98134 12.6508 3.05798 12.8024C3.94308 14.5759 5.30191 16.0698 6.98389 17.1184C8.66587 18.167 10.6053 18.7296 12.5874 18.7436C14.5694 18.7284 16.5085 18.1653 18.1904 17.1165C19.8722 16.0677 21.2311 14.5741 22.1168 12.801C22.1934 12.6494 22.2334 12.4819 22.2334 12.312C22.2334 12.1421 22.1934 11.9746 22.1168 11.823ZM12.5874 17.1362C10.9481 17.1229 9.34277 16.6679 7.94034 15.819C6.53791 14.9701 5.39028 13.7589 4.61827 12.3127C5.39028 10.8666 6.53791 9.6553 7.94034 8.80644C9.34277 7.95758 10.9481 7.50253 12.5874 7.48919C14.2267 7.50253 15.832 7.95758 17.2344 8.80644C18.6369 9.6553 19.7845 10.8666 20.5565 12.3127C19.7845 13.7589 18.6369 14.9701 17.2344 15.819C15.832 16.6679 14.2267 17.1229 12.5874 17.1362Z"
              fill="white"
            />
          </svg>
          {/* </a> */}
          {/* </Link> */}
        </td>
      </tr>
    </>
  );
}

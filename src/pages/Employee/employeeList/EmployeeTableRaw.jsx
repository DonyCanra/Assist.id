import { useNavigate } from "react-router-dom";
import { formatCurrencyRupiah } from "../../../utils/formatCurrency";

export default function Row({ employee, index }) {
  const navigate = useNavigate();
  const dataLocal = JSON.parse(localStorage.privilege);

  const handleDetailClick = () => {
    // Pindah ke halaman detail dengan parameter id
    navigate(`/detail-employee/${employee.id}`);
  };

  const handleEditClick = () => {
    // Pindah ke halaman edit dengan parameter id
    navigate(`/edit-employee/${employee.id}`);
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
          <button
            style={{
              color: employee.employeeStatus ? "#38CB89" : "rgba(255, 5, 50, 0.80)",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
              borderRadius: "5px",
              border: employee.employeeStatus ? "1px solid #38CB89" : "1px solid #D41136",
              background: employee.employeeStatus ? "rgba(56, 203, 137, 0.10)" : "rgba(212, 17, 54, 0.10)",
              width: "78px",
              height: "22px",
            }}
          >
            {employee.employeeStatus ? "Active" : "InActive"}
          </button>
        </td>

        <td>
          <button
            style={{
              color: employee.registerStatus ? "#FAFF00" : "#F0F",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
              borderRadius: "5px",
              border: employee.registerStatus ? "1px solid #FAFF00" : "1px solid #F0F",
              background: employee.registerStatus ? "rgba(250, 255, 0, 0.10)" : "rgba(250, 255, 0, 0.10)",
              width: "97px",
              height: "22px",
            }}
          >
            {employee.registerStatus ? "Registered" : "Not Registered"}
          </button>
        </td>
        <td>
          <svg style={{ cursor: "pointer", display: dataLocal.employeeDetail ? "" : "none" }} onClick={handleDetailClick} xmlns="http://www.w3.org/2000/svg" className="side-menu__icon" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12.5 25C19.4036 25 25 19.4036 25 12.5C25 5.59644 19.4036 0 12.5 0C5.59644 0 0 5.59644 0 12.5C0 19.4036 5.59644 25 12.5 25Z" fill="#0A579B" />
            <path
              d="M12.5874 8.56125C12.2321 8.56679 11.8795 8.62324 11.5403 8.72889C11.6972 9.00466 11.7807 9.31606 11.783 9.63331C11.783 9.87954 11.7345 10.1234 11.6402 10.3508C11.546 10.5783 11.4079 10.785 11.2338 10.9591C11.0597 11.1332 10.853 11.2713 10.6255 11.3656C10.398 11.4598 10.1542 11.5083 9.90798 11.5083C9.59072 11.5061 9.27934 11.4225 9.00356 11.2657C8.78597 12.0201 8.81127 12.8239 9.07587 13.5631C9.34047 14.3024 9.83096 14.9397 10.4779 15.3847C11.1248 15.8297 11.8953 16.0599 12.6803 16.0427C13.4653 16.0255 14.225 15.7617 14.8517 15.2887C15.4785 14.8158 15.9406 14.1576 16.1725 13.4074C16.4044 12.6573 16.3944 11.8531 16.1439 11.109C15.8935 10.3648 15.4152 9.71832 14.7769 9.26106C14.1386 8.80381 13.3726 8.55897 12.5874 8.56125ZM22.1168 11.823C21.2317 10.0495 19.8729 8.55567 18.1909 7.50703C16.5089 6.45839 14.5694 5.89588 12.5874 5.88184C10.6054 5.89702 8.66624 6.46016 6.98442 7.50896C5.3026 8.55776 3.94368 10.0513 3.05798 11.8245C2.98134 11.9761 2.94141 12.1436 2.94141 12.3134C2.94141 12.4833 2.98134 12.6508 3.05798 12.8024C3.94308 14.5759 5.30191 16.0698 6.98389 17.1184C8.66587 18.167 10.6053 18.7296 12.5874 18.7436C14.5694 18.7284 16.5085 18.1653 18.1904 17.1165C19.8722 16.0677 21.2311 14.5741 22.1168 12.801C22.1934 12.6494 22.2334 12.4819 22.2334 12.312C22.2334 12.1421 22.1934 11.9746 22.1168 11.823ZM12.5874 17.1362C10.9481 17.1229 9.34277 16.6679 7.94034 15.819C6.53791 14.9701 5.39028 13.7589 4.61827 12.3127C5.39028 10.8666 6.53791 9.6553 7.94034 8.80644C9.34277 7.95758 10.9481 7.50253 12.5874 7.48919C14.2267 7.50253 15.832 7.95758 17.2344 8.80644C18.6369 9.6553 19.7845 10.8666 20.5565 12.3127C19.7845 13.7589 18.6369 14.9701 17.2344 15.819C15.832 16.6679 14.2267 17.1229 12.5874 17.1362Z"
              fill="white"
            />
          </svg>
          <svg style={{ cursor: "pointer", display: dataLocal.employeeUpdate ? "" : "none" }} onClick={handleEditClick} xmlns="http://www.w3.org/2000/svg" className="side-menu__icon ms-3" width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M22.3214 25H2.67857C1.96817 25 1.28686 24.7178 0.784535 24.2155C0.282206 23.7131 0 23.0318 0 22.3214L0 2.67857C0 1.96817 0.282206 1.28686 0.784535 0.784533C1.28686 0.282204 1.96817 0 2.67857 0H22.3214C23.0318 0 23.7131 0.282204 24.2155 0.784533C24.7178 1.28686 25 1.96817 25 2.67857V22.3214C25 23.0318 24.7178 23.7131 24.2155 24.2155C23.7131 24.7178 23.0318 25 22.3214 25ZM13.2857 8.14107L5.71429 15.7143L5.35714 18.9C5.3463 19.0007 5.35825 19.1025 5.3921 19.1979C5.42594 19.2933 5.48083 19.3799 5.55268 19.4513C5.62454 19.5226 5.71152 19.5769 5.80719 19.61C5.90286 19.6432 6.00477 19.6544 6.10536 19.6429L9.28571 19.2857L16.8589 11.7125C16.9207 11.6489 16.9552 11.5637 16.9552 11.475C16.9552 11.3863 16.9207 11.3011 16.8589 11.2375L13.7661 8.14643C13.7029 8.08235 13.617 8.04584 13.527 8.04484C13.437 8.04383 13.3503 8.07842 13.2857 8.14107ZM19.2518 7.42679L17.5714 5.74643C17.4475 5.62187 17.3001 5.52303 17.1379 5.45558C16.9756 5.38814 16.8016 5.35342 16.6259 5.35342C16.4502 5.35342 16.2762 5.38814 16.1139 5.45558C15.9516 5.52303 15.8043 5.62187 15.6804 5.74643L14.3911 7.03571C14.3293 7.09935 14.2948 7.18455 14.2948 7.27322C14.2948 7.36189 14.3293 7.44707 14.3911 7.51072L17.4893 10.6071C17.5529 10.6689 17.6381 10.7034 17.7268 10.7034C17.8155 10.7034 17.9006 10.6689 17.9643 10.6071L19.2536 9.31785C19.5023 9.06589 19.6416 8.726 19.6413 8.37195C19.6409 8.01791 19.501 7.67828 19.2518 7.42679Z"
              fill="#FFAE00"
            />
          </svg>
        </td>
      </tr>
  );
}

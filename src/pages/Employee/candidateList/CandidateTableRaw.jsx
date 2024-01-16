import React from "react";
import ModalCandidate from "./CandidateApprovalModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailEmployee } from "../../../store/actions/thunks";
import { formatCurrencyRupiah } from "../../../utils/formatCurrency";

export default function Row({ candidate, index }) {
  const { employee } = useSelector((state) => state.employee);
  const [modalShow, setModalShow] = React.useState(false);

  const dispatch = useDispatch();

  const dataLocal = JSON.parse(localStorage.privilege);

  const handleIconClick = async () => {
    // Panggil fetchDetailEmployee dan tunggu sampai selesai
    await dispatch(fetchDetailEmployee(candidate.id));

    // Setelah fetch selesai, tampilkan modal
    setModalShow(true);
  };

  return (
    <>
      <tr className="border-bottom border-top">
        <td>{index + 1}</td>
        <td>{candidate.name}</td>
        <td>{candidate.nik}</td>
        <td>{candidate.phoneNumber}</td>
        <td>{candidate.email}</td>
        <td>{formatCurrencyRupiah(candidate.maxAmount)}</td>
        <td>
          <button
            style={{
              color: candidate.registerStatus ? "#38CB89" : "#F0F",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
              borderRadius: "5px",
              border: candidate.registerStatus ? "1px solid #38CB89" : "1px solid #F0F",
              background: candidate.registerStatus ? "rgba(154, 255, 210, 0.10)" : "rgba(255, 0, 255, 0.10)",
              width: "97px",
              height: "22px",
            }}
          >
            {candidate.registerStatus ? "Registered" : "Not Registered"}
          </button>
        </td>
        <td>
          {/* <button> */}
          <svg style={{ cursor: "pointer", display: candidate.nik && dataLocal.candidateApprove ? "" : "none" }} onClick={handleIconClick} xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
            {/* <svg onClick={handleIconClick} xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none"> */}
            <path
              d="M22 10.46L19.56 7.68L19.9 4L16.29 3.18L14.4 0L11 1.46L7.6 0L5.71 3.18L2.1 3.99L2.44 7.67L0 10.46L2.44 13.24L2.1 16.93L5.71 17.75L7.6 20.93L11 19.46L14.4 20.92L16.29 17.74L19.9 16.92L19.56 13.24L22 10.46ZM9 15.46L5 11.46L6.41 10.05L9 12.63L15.59 6.04L17 7.46L9 15.46Z"
              fill="#0FB900"
            />
          </svg>
          {/* </button> */}
        </td>
      </tr>
      <ModalCandidate show={modalShow} onHide={() => setModalShow(false)} employee={employee} />
    </>
  );
}

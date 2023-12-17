import { useNavigate } from "react-router-dom";

export default function Row({ user, index }) {
  // console.log(users, "<<<");
  const navigate = useNavigate();
  const handleEditClick = () => {
    // Pindah ke halaman edit dengan parameter id
    navigate(`/edit-user/${user.id}`);
  };

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{user.name}</td>
        <td>{user.phoneNumber}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>
          <button
            style={{
              color: user.status ? "#38CB89" : "#FF7979",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
              borderRadius: "5px",
              border: user.status ? "1px solid #38CB89" : "1px solid #FF7979",
              background: "rgba(56, 203, 137, 0.10)",
              width: "78px",
              height: "22px",
            }}
          >
            {user.status ? "Active" : "InActive"}
          </button>
        </td>
        <td>
          {/* <Link to="/edit-employee"> */}
          {/* <a href=""> */}
          <svg onClick={handleEditClick} xmlns="http://www.w3.org/2000/svg" className="side-menu__icon ms-3" width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M22.3214 25H2.67857C1.96817 25 1.28686 24.7178 0.784535 24.2155C0.282206 23.7131 0 23.0318 0 22.3214L0 2.67857C0 1.96817 0.282206 1.28686 0.784535 0.784533C1.28686 0.282204 1.96817 0 2.67857 0H22.3214C23.0318 0 23.7131 0.282204 24.2155 0.784533C24.7178 1.28686 25 1.96817 25 2.67857V22.3214C25 23.0318 24.7178 23.7131 24.2155 24.2155C23.7131 24.7178 23.0318 25 22.3214 25ZM13.2857 8.14107L5.71429 15.7143L5.35714 18.9C5.3463 19.0007 5.35825 19.1025 5.3921 19.1979C5.42594 19.2933 5.48083 19.3799 5.55268 19.4513C5.62454 19.5226 5.71152 19.5769 5.80719 19.61C5.90286 19.6432 6.00477 19.6544 6.10536 19.6429L9.28571 19.2857L16.8589 11.7125C16.9207 11.6489 16.9552 11.5637 16.9552 11.475C16.9552 11.3863 16.9207 11.3011 16.8589 11.2375L13.7661 8.14643C13.7029 8.08235 13.617 8.04584 13.527 8.04484C13.437 8.04383 13.3503 8.07842 13.2857 8.14107ZM19.2518 7.42679L17.5714 5.74643C17.4475 5.62187 17.3001 5.52303 17.1379 5.45558C16.9756 5.38814 16.8016 5.35342 16.6259 5.35342C16.4502 5.35342 16.2762 5.38814 16.1139 5.45558C15.9516 5.52303 15.8043 5.62187 15.6804 5.74643L14.3911 7.03571C14.3293 7.09935 14.2948 7.18455 14.2948 7.27322C14.2948 7.36189 14.3293 7.44707 14.3911 7.51072L17.4893 10.6071C17.5529 10.6689 17.6381 10.7034 17.7268 10.7034C17.8155 10.7034 17.9006 10.6689 17.9643 10.6071L19.2536 9.31785C19.5023 9.06589 19.6416 8.726 19.6413 8.37195C19.6409 8.01791 19.501 7.67828 19.2518 7.42679Z"
              fill="#FFAE00"
            />
          </svg>
          {/* </a> */}
          {/* </Link> */}
        </td>
      </tr>
    </>
  );
}
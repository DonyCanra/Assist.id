import { useNavigate } from "react-router-dom";
import { deleteEmployee } from "../../store/actions/thunks";
import { useDispatch } from "react-redux";

export default function Row({ index, employee }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleEditClick = () => {
    // Pindah ke halaman edit dengan parameter id
    navigate(`/edit-employee/${employee.id}`);
  };

  const handleDeleteClick = async (event) => {
    event.preventDefault();
    event.persist();

    try {
      await dispatch(deleteEmployee(employee.id));
      navigate("/");
    } catch (error) {
      console.error("Error delete employee:", error);
    }
  };

  return (
    <tr className="border-bottom border-top">
      <td>{index + 1}</td>
      <td>{employee.nama}</td>
      <td>{employee.jalan}</td>
      <td>{employee.kelurahan}</td>
      <td>{employee.kecamatan}</td>
      <td>{employee.kabupaten}</td>
      <td>{employee.provinsi}</td>
      <td>
        <svg onClick={handleEditClick} style={{ marginRight: "10px", cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" height="20px" viewBox="0,0,256,256">
          <g
            fill="#ffcb00"
            fill-rule="nonzero"
            stroke="none"
            stroke-width="1"
            stroke-linecap="butt"
            stroke-linejoin="miter"
            stroke-miterlimit="10"
            stroke-dasharray=""
            stroke-dashoffset="0"
            font-family="none"
            font-weight="none"
            font-size="none"
            style={{ mixBlendMode: "normal" }}
          >
            <g transform="scale(10.66667,10.66667)">
              <path d="M18.41406,2c-0.25587,0 -0.51203,0.09747 -0.70703,0.29297l-1.70703,1.70703l4,4l1.70703,-1.70703c0.391,-0.391 0.391,-1.02406 0,-1.41406l-2.58594,-2.58594c-0.1955,-0.1955 -0.45116,-0.29297 -0.70703,-0.29297zM14.5,5.5l-11.5,11.5v4h4l11.5,-11.5z"></path>
            </g>
          </g>
        </svg>

        <svg onClick={handleDeleteClick} style={{ cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" height="20px" viewBox="0,0,256,256">
          <g
            fill="#ff0000"
            fill-rule="nonzero"
            stroke="none"
            stroke-width="1"
            stroke-linecap="butt"
            stroke-linejoin="miter"
            stroke-miterlimit="10"
            stroke-dasharray=""
            stroke-dashoffset="0"
            font-family="none"
            font-weight="none"
            font-size="none"
            text-anchor="none"
            style={{ mixBlendMode: "normal" }}
          >
            <g transform="scale(10.66667,10.66667)">
              <path d="M10,2l-1,1h-6v2h18v-2h-6l-1,-1zM4.36523,7l1.52734,13.26367c0.132,0.99 0.98442,1.73633 1.98242,1.73633h8.24805c0.998,0 1.85138,-0.74514 1.98438,-1.74414l1.52734,-13.25586z"></path>
            </g>
          </g>
        </svg>
      </td>
    </tr>
  );
}

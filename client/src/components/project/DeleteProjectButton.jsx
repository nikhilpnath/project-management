import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DELETE_PROJECT } from "../../mutations/ProjectMutation";
import { useMutation } from "@apollo/client";

const DeleteProjectButton = ({ projectId }) => {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate("/"),
  });

  const handleDelete = () => {
    let isDelete = confirm("Delete Project? ");

    if (isDelete) return deleteProject();
  };
  return (
    <div className="d-flex mt-5 ms-auto delete-project">
      <button className="btn btn-danger m-2" onClick={handleDelete}>
        <FaTrash className="icon" /> 
        <span>
          Delete Project
          </span>
      </button>
    </div>
  );
};

export default DeleteProjectButton;

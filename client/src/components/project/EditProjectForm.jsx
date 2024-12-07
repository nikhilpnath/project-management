import { IoIosArrowDown } from "react-icons/io";
import { useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_PROJECT } from "../../mutations/ProjectMutation";
import { GET_PROJECT } from "../../queries/projectQueries";

const EditProjectForm = ({ project }) => {
  const collapseRef = useRef();
  const [isCliked, setIsClicked] = useState(false);

  const projectStatus = (status) => {
    switch (status) {
      case "Not Started":
        return "new";
      case "In Progress":
        return "progress";
      case "Completed":
        return "completed";
      default:
        return "new";
    }
  };

  const [updateProject, setUpdateProject] = useState({
    name: project.name,
    description: project.description,
    status: projectStatus(project.status),
  });

  const [projectUpdation] = useMutation(UPDATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
    onCompleted: () => {
      const collapseElement = collapseRef.current;
      const bsCollapse = window.bootstrap.Collapse.getInstance(collapseElement);
      bsCollapse.hide();
      setIsClicked(false);
    },
  });

  const handleInputChange = (event) => {
    const { value, name } = event.target;

    setUpdateProject({ ...updateProject, [name]: value });
  };

  const handleProjectUpdate = (e) => {
    e.preventDefault();

    const { name, description } = updateProject;

    if (!name || !description) return alert("All fields are required");

    //updating the projct
    projectUpdation({
      variables: { id: project.id, edits: updateProject },
    });
  };

  return (
    <div className="mt-4">
      <h3
        data-bs-toggle="collapse"
        data-bs-target="#collapseWidthExample"
        aria-expanded="false"
        aria-controls="collapseWidthExample"
        onClick={() => setIsClicked((prevClick) => !prevClick)}
      >
        Update Project
        <IoIosArrowDown
          className={`${isCliked ? "updateIconOpen" : "updateIconClose"}`}
        />
      </h3>

      <div
        className="collapse mt-3"
        id="collapseWidthExample"
        ref={collapseRef}
      >
        <div className="card card-body mutation">
          <form onSubmit={handleProjectUpdate}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={updateProject.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-control"
                value={updateProject.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                name="status"
                className="form-select"
                value={updateProject.status}
                onChange={handleInputChange}
              >
                <option value="new">Not Started</option>
                <option value="progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <button className="btn btn-secondary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProjectForm;

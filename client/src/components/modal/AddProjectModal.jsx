import { useState, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GoProjectSymlink } from "react-icons/go";
import { GET_CLIENTS } from "../../queries/clientQueries";
import { ADD_PROJECT } from "../../mutations/ProjectMutation";
import { GET_PROJECTS } from "../../queries/projectQueries";
import ModalStructure from "./ModalStructure";

const AddProjectModal = () => {
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    clientId: "",
    status: "new",
  });
  const modalRef = useRef(null);

  const { data } = useQuery(GET_CLIENTS);

  const [addNewProject] = useMutation(ADD_PROJECT, {
    onCompleted: () => {
      const modalInstance = window.bootstrap.Modal.getInstance(
        modalRef.current
      );
      modalInstance.hide();
      setNewProject({ name: "", description: "", clientId: "", status: "new" });
    },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: [...projects, addProject],
        },
      });
    },
  });

  const handleInputChange = (event) => {
    const { value, name } = event.target;

    setNewProject({ ...newProject, [name]: value });
  };

  const handleNewProject = (e) => {
    e.preventDefault();

    const { name, description, clientId } = newProject;

    if (!name || !description || !clientId)
      return alert("All fields are required");

    //adding the projct
    addNewProject({
      variables: { project: newProject },
    });
  };

  return (
    <>
      <ModalStructure
        text="New Project"
        icon={GoProjectSymlink}
        ref={modalRef}
        btnClr="primary"
        modalId="newProjectModal"
      >
        <form onSubmit={handleNewProject}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={newProject.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              value={newProject.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              name="status"
              className="form-select"
              value={newProject.status}
              onChange={handleInputChange}
            >
              <option value="new">Not Started</option>
              <option value="progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Client</label>
            <select
              name="clientId"
              className="form-select"
              value={newProject.clientId}
              onChange={handleInputChange}
            >
              <option value="">Select Client</option>
              {data?.clients?.length > 0 &&
                data.clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </ModalStructure>
    </>
  );
};

export default AddProjectModal;

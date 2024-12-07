import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import {
  Spinner,
  ClientInfo,
  DeleteProjectButton,
  EditProjectForm,
} from "../components";

const ProjectInfo = () => {
  const { id } = useParams();
  const {
    data,
    loading,
    error = {},
  } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  const navigate = useNavigate();

  if (loading) return <Spinner />;
  if (error && error.message) return <p>Something went wrong</p>;

  return (
    <div className="py-3">
      <div className="mx-auto w-75 card p-5 project-card-info">
        <button
          className="btn btn-light btn-sm w-25 d-inline ms-auto go-back-btn"
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        <h1>{data.project.name}</h1>
        <p>{data.project.description}</p>

        <h5 className="mt-3">Project Status</h5>
        <p className="lead">{data.project.status}</p>

        <ClientInfo client={data.project.client} />

        <EditProjectForm project={data.project} />

        <DeleteProjectButton projectId={data.project.id} />
      </div>
    </div>
  );
};

export default ProjectInfo;

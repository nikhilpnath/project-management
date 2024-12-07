
const ProjectCard = ({ project }) => {
  return (
    <div className=" col-md-6">
      <div className="card mb-3 overflow-hidden">
        <div className="card-body project-card">
          <div className="d-flex justify-content-between align-items-center ">
            <h5 className="card-title">{project.name}</h5>

            <a
              className="btn btn-light"
              href={`/project/${project.id}`}
            >
              View
            </a>
          </div>
          <div className="small">
            <p className="mb-0">
              Client: <strong>{project.client.name}</strong>
            </p>
            <p className="mb-0">
              Status: <strong>{project.status}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

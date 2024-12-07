import { GET_PROJECTS } from "../../queries/projectQueries";
import { useQuery } from "@apollo/client";
import { ProjectCard } from "..";

const Projects = () => {
  const { data, error = {} } = useQuery(GET_PROJECTS);

  if (error && error.message) return <p>Coudn&apos;t fetch projects&apos;s</p>;


  return (
    <>
      {data?.projects.length > 0 ? (
        <div className="row mt-3">
          {data.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p>No Projects Available</p>
      )}
    </>
  );
};

export default Projects;

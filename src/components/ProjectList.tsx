import { Project } from "../types/Project";
import SimpleProjectDetails from "./SimpleProjectDetails";

interface projectListProps {
  projects: Project[];
}

const ProjectList = ({ projects }: projectListProps) => {
  //   const isCollaborator = artistCollabProjects.some(
  //     (collabProject) => collabProject?.project?.id === project?.id
  //   );

  return (
    <div className="flex flex-wrap ">
      {projects.map((project) => (
        // <div key={project.id} className="bg-white p-6 rounded-md shadow-md">
        //   <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        //   <p className="text-gray-600 mb-4">{project.description}</p>
        //   <p className="text-sm text-gray-500 mb-2">
        //     Created Date: {project.created_at}
        //   </p>
        //   <p
        //     className={
        //       artistCollabProjects.some(
        //         (collabProject) => collabProject?.project?.id === project?.id
        //       )
        //         ? "text-green-500"
        //         : "text-red-500"
        //     }
        //   >
        //     {artistCollabProjects.some(
        //       (collabProject) => collabProject?.project?.id === project?.id
        //     )
        //       ? "Collaborator"
        //       : "Not a Collaborator"}
        //   </p>
        // </div>

        <SimpleProjectDetails project={project} />
      ))}
    </div>
  );
};

export default ProjectList;

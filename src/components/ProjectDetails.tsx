import { Project } from "../types/Project";
import { CheckCircleIcon, LockIcon, UsersIcon } from "./Icons";

interface ProjectDetailsProps {
  project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const handleCollaborateClick = () => {
    // Handle collaboration button click logic here
  };

  return (
    <div className="grid max-w-3xl w-full gap-4 px-4 py-6 mx-auto md:grid-cols-2 md:gap-8 lg:gap-10">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="text-2xl font-bold">{project.title}</div>
          <div className="flex items-center gap-2 text-sm">
            <div className="rounded-full h-8 w-8 bg-gray-200 dark:bg-gray-800" />
            <div className="text-gray-500 dark:text-gray-400">
              {project.creator.username}
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              {project.created_at}
            </div>
          </div>
        </div>
        <div className="grid gap-2 text-base leading-loose md:text-lg md:gap-4">
          <p>{project.description}</p>
        </div>
        <button
          onClick={handleCollaborateClick}
          className="btn btn-outline btn-secondary text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Collaborate
        </button>
      </div>
      <div className="flex flex-col items-start gap-4 border rounded-lg p-4 md:items-end md:gap-2 lg:gap-4">
        <div className="grid gap-1 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="w-4 h-4" />
            <span className="text-gray-500 dark:text-gray-400">
              {project.active ? "active" : "Project completed"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <UsersIcon className="w-4 h-4" />
            <span className="text-gray-500 dark:text-gray-400">
              Team Access
            </span>
          </div>
          <div className="flex items-center gap-2">
            <LockIcon className="w-4 h-4" />
            <span className="text-gray-500 dark:text-gray-400">Private</span>
          </div>
        </div>
      </div>
    </div>
  );
}

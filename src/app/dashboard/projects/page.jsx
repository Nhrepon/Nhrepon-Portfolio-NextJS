'use client';

import { useState } from 'react';
import { 
  BriefcaseIcon, 
  ClockIcon, 
  CheckCircleIcon,
  ExclamationCircleIcon 
} from "@heroicons/react/24/outline";

const projects = [
  {
    id: 1,
    name: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with payment integration',
    status: 'In Progress',
    progress: 75,
    deadline: '2024-06-15',
    team: ['NHRepon', 'John Doe', 'Jane Smith'],
  },
  {
    id: 2,
    name: 'Portfolio Website',
    description: 'Personal portfolio website with blog functionality',
    status: 'Completed',
    progress: 100,
    deadline: '2024-04-20',
    team: ['NHRepon'],
  },
  {
    id: 3,
    name: 'Task Management App',
    description: 'Collaborative task management application',
    status: 'On Hold',
    progress: 30,
    deadline: '2024-07-01',
    team: ['NHRepon', 'Mike Johnson'],
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'In Progress':
        return <ClockIcon className="h-5 w-5 text-blue-500" />;
      case 'On Hold':
        return <ExclamationCircleIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <BriefcaseIcon className="h-6 w-6 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(project.status)}
                  <span className="text-sm font-medium text-gray-500">{project.status}</span>
                </div>
              </div>

              <p className="mt-2 text-sm text-gray-500">{project.description}</p>

              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Deadline</p>
                  <p className="text-sm font-medium text-gray-900">{project.deadline}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Team</p>
                  <div className="flex -space-x-2">
                    {project.team.map((member, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-600"
                      >
                        {member.charAt(0)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
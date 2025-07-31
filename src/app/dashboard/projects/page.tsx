'use client';

import React, { useState } from 'react';
import AddSkill from "@/components/dashboard/skill/addSkill";
import Modal from "@/components/Modal";
import PickFile from "@/components/dashboard/media/pickFile";


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

  const [project, setProject] = useState({
    name: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with payment integration',
    status: 'In Progress',
    image: '/project-placeholder.svg',
    team: ['NHRepon', 'John Doe', 'Jane Smith'],
  });


  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>

        <Modal text="Add Project" heading="Add New Project">
          <div className={"flex flex-col gap-4 w-full p-4"}>
            <input type="text" name="name" id="name" placeholder="Project Name" className="border-2 border-gray-300 rounded-md p-2"/>
            <input type="text" name="description" id="description" placeholder="Description" className="border-2 border-gray-300 rounded-md p-2"/>
            <div className={"flex flex justify-between items-center gap-2 w-full"}>
              <input type="text" name="image" id="image" placeholder="Image URL"
                     className="border-2 border-gray-300 rounded-md p-2"
                     value={project.image} onChange={(e)=>{setProject({...project, image: e.target.value})}}/>
              <PickFile onFileSelect={(value)=>{setProject({...project, image: value})}} />
            </div>
            <button className="bg-green-500 hover:bg-green-600 w-fit mx-auto text-white cursor-pointer py-2 px-4 rounded">Submit</button>
          </div>
        </Modal>
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
                  <i className={"bi bi-briefcase"}></i>
                  <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  {(project.status)}
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
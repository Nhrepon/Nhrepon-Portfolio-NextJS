"use client";
import React, { useEffect } from 'react';

import Link from "next/link";
import ProjectState from "@/state/projectState";
import { TimestampToDate, truncateText } from "@/utility/Utility";
import Image from "next/image";
import { DeleteAlert } from '@/utility/Utility';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Projects() {
  const router = useRouter();
  const { projectList, fetchProject, deleteProject } = ProjectState();
  const [skip, setSkip] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  useEffect(() => {
    (async () => await fetchProject(skip, limit))()
  }, []);


  const handleDelete = async (id: string) => {
    if (await DeleteAlert()) {
      const result = await deleteProject(id);
      if (result.status === "success") {
        toast.success("Delete item successfully");
      } else {
        toast.error("Delete item failed");
      }
      await fetchProject(skip, limit);
    } else {
      toast.error("Error occurred in deleting project item");
    }
  }

  return (
    <div className="w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <Link href={"/dashboard/projects/new"} className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
          Add New Project
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Description</th>
              <th>Image</th>
              <th>Technologies</th>
              <th>Categories</th>
              <th>Skills</th>
              <th>Live Link</th>
              <th>Project Link</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-400 bg-white text-xs">

            {
              projectList.length > 0 ? projectList.map((project) => (
                <tr key={project._id}>
                  <td>{truncateText(project.title, 20)}</td>
                  <td>{truncateText(project.slug, 20)}</td>
                  <td>{truncateText(project.description, 20)}</td>
                  <td><Image src={project.image} alt={project.title} width={1200} height={1200} className="w-32 aspect-16/9" /></td>
                  <td>{project.technology.map((tech: { name: string }) => tech.name).join(", ")}</td>
                  <td>{project.category.map((cat: { name: string }) => cat.name).join(", ")}</td>
                  <td>{project.skill.map((skill: { title: string }) => skill.title).join(", ")}</td>
                  <td>{project.liveLink}</td>
                  <td>{project.projectLink}</td>
                  <td>{TimestampToDate(project.startDate)}</td>
                  <td>{TimestampToDate(project.endDate)}</td>
                  <td>{project.status}</td>
                  <td>
                    <div className="flex gap-2">
                      <div onClick={() => { router.push(`/dashboard/projects/update?id=${project._id}`) }} className="bg-green-600 hover:bg-green-700 cursor-pointer text-white p-2 rounded"><i className="bi bi-pencil"></i></div>
                      <div onClick={() => handleDelete(project._id)} className="bg-red-600 hover:bg-red-700 cursor-pointer text-white p-2 rounded"><i className="bi bi-trash"></i></div>
                    </div>
                  </td>
                </tr>
              ))
              : <tr><td colSpan={12} className="text-center">No projects found</td></tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  );
} 
"use client";
import React, {useEffect, useState} from 'react'
import ProjectState from '@/state/projectState';
import {generateSlug} from '@/utility/Utility';
import PickFile from '@/components/dashboard/media/pickFile';
import CategoryState from "@/state/categoryState";
import TagState from "@/state/tagState";
import skillState from "@/state/skillState";
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


export default function UpdateProject() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const {updateProject, fetchProjectById} = ProjectState();
    const {categoryList, getCategories} = CategoryState();
    const {tagList, getTags} = TagState();
    const {skillList, fetchSkills} = skillState();
    const router = useRouter();
    console.log("Project ID: "+id);

    const [project, setProject] = useState({
        title: '',
        slug: '',
        description: '',
        image: '',
        technologies: [] as string[],
        categories: [] as string[],
        skills: [] as string[],
        liveLink: '',
        projectLink: '',
        startDate: '',
        endDate: '',
        status: 'In Progress',
    } as {
        title: string;
        slug: string;
        description: string;
        image: string;
        technologies: string[];
        categories: string[];
        skills: string[];
        liveLink: string;
        projectLink: string;
        startDate: string;
        endDate: string;
        status: string;
    });

    useEffect(() => {
        (async () => {
          await getCategories(0, 1000);
            await getTags(0, 1000);
            await fetchSkills(0, 1000);
            const response = await fetchProjectById(id as string);
            if (response.status === "success") {
              console.log("Project: "+JSON.stringify(response.data));
                setProject({
                  ...response.data,
                  startDate: new Date(response.data.startDate).toISOString().split('T')[0],
                  endDate: new Date(response.data.endDate).toISOString().split('T')[0]
                });
            }
        })()
    }, []);

    const handleSubmit = async () => {
        const response = await updateProject(id as string, project);
        if (response.status === "success") {
          toast.success("Update project successfully");
          router.push("/dashboard/projects");
        } else {
          toast.error("Update project failed");
        }
      };

      const formatDateToDisplay = (date: string) => {
        if (!date) return '';
        const [year, month, day] = date.split('-');
        return `${year}-${month}-${day}`;
      };

      console.log("Project: "+JSON.stringify(project));
      console.log("Project Start Date: "+ formatDateToDisplay(project.startDate));
      console.log("Project End Date: "+formatDateToDisplay(project.endDate));

  return (
    <div className="max-w-7xl w-full mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
            </div>
            <div>
                <div className={"flex flex-col gap-4 w-full p-4"}>
                    <input type="text" name="title" id="title" placeholder="Project Title"
                           className="border-2 border-gray-300 rounded-md p-2" value={project.title}
                           onChange={(e) => setProject({...project, title: e.target.value})}/>
                    <div>
                        <input type="text" name="slug" placeholder="Slug"
                               className="w-full p-2 border border-gray-300 rounded" value={project.slug}
                               onChange={(e) => setProject({...project, slug: e.target.value})}/>
                        <div className="flex items-center gap-2 text-xs text-gray-500"><i
                            onClick={() => setProject({...project, slug: generateSlug(project.title)})}
                            className="bi bi-check-square cursor-pointer text-xl"></i>Use title as slug
                        </div>
                    </div>
                    <textarea
                        name="description"
                        id="description"
                        placeholder="Description"
                        className="border-2 border-gray-300 rounded-md p-2"
                        rows={4}
                        value={project.description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setProject({...project, description: e.target.value})}/>
                    <div className={"flex justify-between items-center gap-2 w-full"}>
                        <input type="text" name="image" id="image" placeholder="Image URL"
                               className="border-2 border-gray-300 rounded-md p-2"
                               value={project.image} onChange={(e: any) => {
                            setProject({...project, image: e.target.value})
                        }}/>
                        <PickFile onFileSelect={(value) => {
                            setProject({...project, image: value})
                        }}/>
                    </div>
                    <div className="my-2">
                        <label>Technologies:</label>
                        <div className="flex flex-wrap gap-2">
                            {
                                project.technologies && project.technologies.map((item, i) => {
                                    return (
                                    <div key={i}
                                         className="bg-gray-200 py-1 px-2 rounded flex items-center gap-2">{tagList.find((tag) => tag._id === item)?.name}<i
                                        onClick={() => {
                                            setProject({
                                                ...project,
                                                technologies: project.technologies.filter((item, index) => index !== i)
                                            })
                                        }} className="bi bi-x-circle-fill text-red-600"></i></div>
                                )})
                            }
                            <select name="technologies" id="technologies" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                setProject({...project, technologies: [...project.technologies, e.target.value]})
                            }} className="w-full p-2 border border-gray-300 rounded my-2">
                                <option value="">Select technologies</option>
                                {
                                    tagList.map((tag, i) => {
                                        return (
                                            <option key={i} value={tag._id}>{tag.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="my-2">
                        <label>Categories:</label>
                        <div className="flex flex-wrap gap-2">
                            {
                                project.categories && project.categories.map((item, i) => {
                                    return(
                                    <div key={i}
                                         className="bg-gray-200 py-1 px-2 rounded flex items-center gap-2">{categoryList.find((category) => category._id === item)?.name}<i
                                        onClick={() => {
                                            setProject({
                                                ...project,
                                                categories: project.categories.filter((item, index) => index !== i)
                                            })
                                        }} className="bi bi-x-circle-fill text-red-600"></i></div>
                                )})
                            }
                            <select name="categories" id="categories" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                setProject({...project, categories: [...project.categories, e.target.value]})
                            }} className="w-full p-2 border border-gray-300 rounded my-2">
                                <option value="">Select categories</option>
                                {
                                    categoryList.map((category, i) => {
                                        return (
                                            <option key={i} value={category._id}>{category.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="my-2">
                        <label>Skills:</label>
                        <div className="flex flex-wrap gap-2">
                            {
                                project.skills && project.skills.map((item, i) => (
                                    <div key={i}
                                         className="bg-gray-200 py-1 px-2 rounded flex items-center gap-2">{skillList.find((skill) => skill._id === item)?.title}<i
                                        onClick={() => {
                                            setProject({
                                                ...project,
                                                skills: project.skills.filter((item, index) => index !== i)
                                            })
                                        }} className="bi bi-x-circle-fill text-red-600"></i></div>
                                ))
                            }
                            <select name="categories" id="categories" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                setProject({...project, skills: [...project.skills, e.target.value]})
                            }} className="w-full p-2 border border-gray-300 rounded my-2">
                                <option value="">Select skills</option>
                                {
                                    skillList.map((skill, i) => {
                                        return (
                                            <option key={i} value={skill._id}>{skill.title}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <input type="text" name="liveLink" id="liveLink" placeholder="Live Link"
                           className="border-2 border-gray-300 rounded-md p-2"
                           value={project.liveLink}
                           onChange={(e) => setProject({...project, liveLink: e.target.value})}/>
                    <input type="text" name="projectLink" id="projectLink" placeholder="Project Link"
                           className="border-2 border-gray-300 rounded-md p-2"
                           value={project.projectLink}
                           onChange={(e) => setProject({...project, projectLink: e.target.value})}/>
                    <input type="date" name="startDate" id="startDate" className="border-2 border-gray-300 rounded-md p-2" 
                           value={project.startDate}
                           onChange={(e) => setProject({...project, startDate: e.target.value})}/>
                    <input type="date" name="endDate" id="endDate" className="border-2 border-gray-300 rounded-md p-2" 
                           value={project.endDate}
                           onChange={(e) => setProject({...project, endDate: e.target.value})}/>
                    <select name="status" id="status" className="border-2 border-gray-300 rounded-md p-2"
                            value={project.status}
                            onChange={(e) => setProject({...project, status: e.target.value})}>
                        <option value="">Select Status</option>
                        <option value="Progress">Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Hold">Hold</option>
                        <option value="Cancel">Cancel</option>
                        <option value="Draft">Draft</option>
                    </select>
                    <button
                        onClick={handleSubmit}
                        className="bg-green-600 hover:bg-green-700 w-fit mx-auto text-white cursor-pointer py-2 px-4 rounded">
                        Submit
                    </button>
                </div>
            </div>

        </div>
  )
}

'use client';

import { DeleteAlert } from '@/utility/Utility';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import Modal from "@/components/Modal";
import AddSkill from "@/components/dashboard/skill/addSkill";
import skillState from "@/state/skillState";
import {useRouter} from "next/navigation";


export default function Skills() {
  const {skillList, fetchSkills} = skillState();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if(skillList.length === 0){
        await fetchSkills();
      }
    })()
  }, []);


  // ['Flutter', 'Mobile Development', 'Dart','React','Next.js','Node.js', 'ExpressJs', 'Laravel', 'PHP', 'DotNet','MongoDB','TypeScript']

  const editItem = (id: string) => {
    toast.success("Edit item" + id);
    router.push(`/dashboard/skills/${id}`);

  };
  const deleteItem = async (id: string) => {
    if (await DeleteAlert()) {
      try {
        const response = await fetch(`/api/skills`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });

        if (response.ok) {
          await fetchSkills(); // Refresh the list
          toast.success('Skill deleted successfully');
        } else {
          toast.error('Failed to delete skill');
        }
      } catch (error) {
        console.error('Error deleting skill:', error);
        toast.error('Failed to delete skill');
      }
    }else {
      toast.error("Delete item failed");
    }
  };



  return (
      <div className="max-w-7xl mx-auto">
        <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold py-4'>Skills</h1>
          <Modal text="Add Skill" heading="Add New Skill">
            <AddSkill fetchSkills={fetchSkills}/>
          </Modal>
        </div>

        <div className=''>
          <table className='table-auto w-full'>
            <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {skillList.map((skill) => (
                <tr key={skill._id} className=''>
                  <td>{skill.title}</td>
                  <td>{skill.description}</td>
                  <td>
                    <img className='w-20 aspect-square p-4' src={skill.image} alt={skill.title}/>
                  </td>
                  <td className="">
                    <button type="button"
                            className="bg-green-600 hover:bg-green-700 hover:cursor-pointer text-white p-2 rounded mr-2"
                            onClick={(e) => editItem(skill._id)}>
                      <i className='bi bi-pencil-square'></i>
                    </button>
                    <button type="button"
                            className="bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white p-2 rounded"
                            onClick={(e) => deleteItem(skill._id)}>
                      <i className='bi bi-trash'></i>
                    </button>
                  </td>
                </tr>

            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}
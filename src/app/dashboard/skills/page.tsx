'use client';

import { DeleteAlert, TimestampToDate } from '@/utility/Utility';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Modal from "@/components/Modal";
import AddSkill from "@/components/dashboard/skill/addSkill";
import skillState from "@/state/skillState";
import {useRouter} from "next/navigation";
import Pagination from '@/components/dashboard/Pagination';


export default function Skills() {
  const {skillList, fetchSkills, total, loaded} = skillState();
  const router = useRouter();

  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    (async () => {
      if(skillList.length === 0){
        await fetchSkills(skip, limit);
      }
    })()
  }, []);


  const onPageChange = async (page: number) => {
    const newSkip = (page - 1) * limit;
    setSkip(newSkip);
    await fetchSkills(newSkip, limit);
  };

  // ['Flutter', 'Mobile Development', 'Dart','React','Next.js','Node.js', 'ExpressJs', 'Laravel', 'PHP', 'DotNet','MongoDB','TypeScript']

  const editItem = (id: string) => {
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
          await fetchSkills(skip, limit); // Refresh the list
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
      <div className="w-full mx-auto">
        <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold py-4'>Skills</h1>
          <Modal text="Add New Skill" heading="Add New Skill">
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
              <th>Created At</th>
              <th>Updated At</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {skillList && skillList.length > 0 ? skillList.map((skill) => (
                <tr key={skill._id} className=''>
                  <td>{skill.title}</td>
                  <td>{skill.description}</td>
                  <td>
                    <img className='w-20 aspect-square p-4' src={skill.image} alt={skill.title}/>
                  </td>
                  <td>{TimestampToDate(skill.createdAt)}</td>
                  <td>{TimestampToDate(skill.updatedAt)}</td>
                  <td>
                    <div className="flex gap-2 justify-end">
                      <div onClick={(e) => editItem(skill._id)}
                           className="bg-green-600 hover:bg-green-700 cursor-pointer text-white p-2 rounded">
                        <i className="bi bi-pencil"></i>
                      </div>
                      <div onClick={(e) => deleteItem(skill._id)}
                           className="bg-red-600 hover:bg-red-700 cursor-pointer text-white p-2 rounded">
                        <i className="bi bi-trash"></i>
                      </div>
                    </div>
                  </td>
                </tr>

            )):(<tr><td className={"text-center text-xl"} colSpan={4}>No data found</td></tr>)}
            </tbody>
          </table>
          <div>
            <Pagination total={total} loaded={loaded} limit={limit} onPageChange={onPageChange} />
          </div>  
        </div>
      </div>
  );
}
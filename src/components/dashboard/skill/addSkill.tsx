import React, {useState} from "react";
import toast from "react-hot-toast";
import modelState from "@/state/modelState";

const AddSkill = (props: any) => {
    const { setCloseModal} = modelState();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
    });

    const onChangeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const response = await fetch('/api/skills', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(formData),
        });

        if (response.status === 200) {
            toast.success("Skill added successfully");
            await props.fetchSkills();
            setFormData({
                title: "",
                description: "",
                image: "",
            });
            setCloseModal(true);
        } else {
            toast.error("Failed to add skill");
        }
    };




    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-6 w-full p-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Skill Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={onChangeFormData}
                        required
                        autoComplete="title"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                </div>

                <div>
                    <label htmlFor="description"
                           className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <input
                        type="description"
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={onChangeFormData}
                        required
                        autoComplete="description"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                </div>

                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Image
                    </label>
                    <input
                        type="text"
                        name="image"
                        id="image"
                        value={formData.image}
                        onChange={onChangeFormData}
                        required
                        autoComplete="image"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                </div>

                <div>
                    <button type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddSkill;
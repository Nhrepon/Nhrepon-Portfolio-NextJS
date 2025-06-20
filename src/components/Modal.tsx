import React, {type ReactNode, useState} from "react";
import modelState from "@/state/modelState";


interface ModalProps {
    children?: ReactNode;  // Optional children
    text?: string;         // Text for the button
    heading?: string;      // Modal heading
    onChanged?: () => void;
}
const Modal = ({children, text="Add", heading = "Add/Update Item"}: ModalProps) => {
    const {closesModal, setCloseModal} = modelState();
    const [isModalVisible, setIsModalVisible] = useState(false);


    const openModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);

    if (closesModal) {
        closeModal();
        setCloseModal(false);
    }


    return (
        <div>
            <button className="bg-green-600 hover:bg-green-700 hover:cursor-pointer text-white py-2 px-4 rounded" onClick={openModal}>{text}</button>
            {
                isModalVisible && (


                    <div className="fixed flex justify-center items-center top-0 left-0 w-full h-full" style={{background: "rgba(0, 0, 0, 0.7)", zIndex: 10}}>
                        <div className="bg-white mx-auto shadow-xl relative p-3 w-9/12 max-w-[600px] rounded-lg">
                            <div className="flex justify-between items-center px-2 py-1">
                                <h5 className="text-lg">{heading}</h5>
                                <button type="button" className="p-1 bg-red-500 text-white rounded-md hover:cursor-pointer"
                                        aria-label="Close" onClick={closeModal}><i className="bi bi-x-lg"></i>
                                </button>
                            </div>
                            <hr className="my-4 text-gray-400"/>
                            <div className="overflow-y-auto py-2">
                                {children}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Modal;
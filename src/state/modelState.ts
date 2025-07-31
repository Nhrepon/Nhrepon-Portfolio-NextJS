import {create} from "zustand/react";

interface model {
    closesModal: boolean;
    setCloseModal: (iv: boolean) => void;
    // Add other user properties as needed
}
const modelState = create<model>((set) => ({
    closesModal:false,
    setCloseModal: (iv) => {
        set({closesModal: iv});
    },

}));

export default modelState;
import {create} from "zustand/react";
import axios from "axios";
import Cookies from "js-cookie";


interface User {
    _id: string;
    email: string;
    name?: string;
    // Add other user properties as needed
}

interface UserSt {
    isLogin: boolean;
    user: User | null;
    isLoading: boolean;
    error: string | null;
    getLoginStatus: () => Promise<void>;
    logout: () => Promise<void>;
    setUser: (user: User | null) => void;
}
 const userState = create<UserSt>((set) => ({
    isLogin:false,
    user: null,
    isLoading: false,
    error: null,
    setUser: (user: User | null) => set({ user }),
    getLoginStatus: async () => {
        const res = await axios.get("/api/users/user");
        set({isLogin: res.data.status === "success" && res.data.data !== null});
        console.log("cookies data: " + Cookies.get("token"));
    },
    logout: async () => {
        const res = await axios.post("/api/users/logout");
        set({isLogin: res.data.status === "success"});
        Cookies.remove("token");
    }

}));

 export default userState;
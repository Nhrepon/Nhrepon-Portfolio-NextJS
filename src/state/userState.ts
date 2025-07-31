import {create} from "zustand/react";
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
        const resData = await fetch("/api/users/user");
        const res = await resData.json();
        set({isLogin: res.data.status === "success" && res.data.data !== null});
        //console.log("cookies data: " + Cookies.get("token") + "\nuser data: " + Cookies.get("userData"));
    },
    logout: async () => {
        const res = await fetch("/api/users/logout", {
            method: 'POST',
        });
        const data = await res.json();
        set({isLogin: data.status === "success"});
        Cookies.remove("token", {httpOnly:true, expires: new Date(0)});
        Cookies.remove("userData");
    }

}));

 export default userState;
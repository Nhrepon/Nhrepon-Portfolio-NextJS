import {create} from "zustand/react";
import Cookies from "js-cookie";




interface User {
    _id: string;
    email: string;
    name?: string;
    // Add other user properties as needed
}

interface UserInterface {
    isLogin: boolean;
    user: User | {};
    getLoginStatus: () => Promise<void>;
    logout: () => Promise<void>;

}
 const userState = create<UserInterface>((set) => ({
    isLogin:false,
    user: {},
    getLoginStatus: async () => {
        const resData = await fetch("/api/users/user");
        const res = await resData.json();
        console.log("\n\nUser login status: "+ JSON.stringify(res)+"\n\n");


        if(res.status === "success" && res.data !== null){
        set({isLogin: res.status === "success" && res.data !== null});
        set({user: res.data});
        }
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
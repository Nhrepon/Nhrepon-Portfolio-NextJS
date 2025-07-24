import Swal from "sweetalert2";
import Cookies from "js-cookie";



export function saveComment(comment){
    fs.writeFileSync("./src/db/commentList.js", JSON.stringify(commentList));
}


export function unauthorized(code){
    if(code===401){
        sessionStorage.clear();
        localStorage.clear();
        window.location.href="/login"
    }
}

export function setSessionStorateItem(name, value){
    sessionStorage.setItem(name,value)
}

export function getSessionStorateItem(name){
    return sessionStorage.getItem(name)
}

export  function TimestampToDate(timestamp) {
    let date = new Date(timestamp);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return date.getDate().toString().padStart(2, "0") + " " + monthNames[date.getMonth()] + " " + date.getFullYear();
}

export async  function DeleteAlert() {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        allowOutsideClick: false
    });
    return result.isConfirmed;
}

export async  function DeleteAlertWithData(id, name) {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this! \nDelete? \nid: "+id+" \nname: "+name+" ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        allowOutsideClick: false
    });
    return result.isConfirmed;
}

export async  function SuccessAlert(msg) {
    const result = await Swal.fire({
        text: msg,
        icon: "success",
        confirmButtonColor: "#198754",
        confirmButtonText: "OK",
        allowOutsideClick: false
    });
    return result.isConfirmed;
}

export async  function FailAlert(msg) {
    const result = await Swal.fire({
        text: msg,
        icon: "warning",
        confirmButtonColor: "#fcac3f",
        confirmButtonText: "Try Again",
        allowOutsideClick: false
    });
    return result.isConfirmed;
}

export async  function InfoAlert(msg) {
    const result = await Swal.fire({
        text: msg,
        icon: "info",
        confirmButtonColor: "#198754",
        confirmButtonText: "Go Ahead",
        allowOutsideClick: false
    });
    return result.isConfirmed;
}


// export async function modalHide(id){
//     // Close the modal programmatically
//     const modalElement = document.getElementById(id);
//     const modalInstance = Modal.getInstance(modalElement) || new Modal(modalElement);
//     modalInstance.hide();
// }




export function truncateText (text, maxLength){
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

export async function logout(){
    //(await cookies()).set('token', '')
    //Cookies.remove("token", {httpOnly: true, expires: new Date(0)});
    window.location.href="/login"
}


export function isLogin(){
    //console.log("this is cookie: "+ sessionStorage.getItem('email'));
    //return sessionStorage.getItem('email') != null && Cookies.get("token") != null;

    return !!Cookies.get("token"); // !! to get boolean result
}


export function isAdmin(){
    return true;
}




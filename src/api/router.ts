/**
 * 跳转函数 同一管理
 */

export const RedirectToHome = () => {
    window.location.href = "http://localhost:3000/";
    console.log("123");
}

export const RedirectToLogin = () => {
    window.location.href = "http://localhost:3000/login";
}

export const RedirectToRegister = () => {
    window.location.href = "http://localhost:3000/register";
}

export const RedirectToNewsPublish = () => {
    window.location.href = "http://localhost:3000/newsPublish";
}

export const RedirectToUser = () => {
    window.location.href = "http://localhost:3000/user";
}

export const ChangeRouter = (key: string)=>{
    switch(key){
        case "home":
            RedirectToHome();
            break;
        case "publish":
            RedirectToNewsPublish();
            break;
        case "user":
            RedirectToUser();
            break;
        default:
            RedirectToHome();
    }
}
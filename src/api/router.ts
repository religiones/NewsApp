/**
 * 跳转函数 同一管理
 */

import { notification } from "antd";

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

// 路由跳转
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

// 异常提示框
export const openNotification = (message:string, description:string , icon: any) => {
    notification.open({
        message: message,
        description: description,
        icon: icon,
    });
};
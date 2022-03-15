import { post } from "./http";

/**
 * 添加用户
 * @param userName 
 * @param password 
 * @param phone 
 * @param birthDate 
 */
export const addUser: any = (userName:string, userPassword:string, userPhone:string, userBirth:string) => {
    return post("/api/addUser",{
        userName : userName,
        userPassword : userPassword,
        userPhone : userPhone,
        userBirth : userBirth
    });
}

/**
 * 用户登录
 * @param userName 
 * @param userPassword 
 * @returns 
 */
export const userLogin: any = (userName:string, userPassword:string) => {
    return post("/api/login",{
        userName : userName,
        userPassword : userPassword
    });
}

/**
 * 获取用户信息
 * @param userName 
 * @returns 
 */
export const getUser: any = (userName: string) => {
    return post("api/getUser", {
        userName: userName
    });
}

export const updateUser: any = (userNameBefore:string, user:any) => {
    return post("/api/updateUser",{
        userNameBefore: userNameBefore,
        user: user
    });
}
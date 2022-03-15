import { get, post } from "./http";

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

export const userLogin: any = (userName:string, userPassword:string) => {
    return post("/api/login",{
        userName : userName,
        userPassword : userPassword
    });
}

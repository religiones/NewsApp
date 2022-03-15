import { get, post } from "./http";

/**
 * 添加新闻
 * @param newsTitle 
 * @param newsSource 
 * @param newsContent 
 * @param newsTime 
 * @returns 
 */
export const addNews: any = (newsTitle:string, newsSource:string ,newsContent:string, newsTime:string) => {
    return post("/api/addNews",{
        title: newsTitle,
        description: newsContent,
        source: newsSource,
        ctime: newsTime 
    });
} 

/**
 * 
 * @returns 获取新闻
 */
export const getNews: any = () => {
    return get("/api/getNews");
}
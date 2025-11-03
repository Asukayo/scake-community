import myAxios from "../plugins/myAxios";

/**
 * 获取当前登录用户信息
 */
export const getCurrentUser = async () => {
    const res = await myAxios.get("/user/current");
    if (res.code === 0) {
        return res.data
    }
    return null;
}
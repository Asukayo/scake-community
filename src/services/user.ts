import myAxios from "../plugins/myAxios";
import {useRouter} from "vue-router";

const router = useRouter()
/**
 * 获取当前登录用户信息，如果获取失败则转到登录页
 */
export const getCurrentUser = async () => {
    const res = await myAxios.get("/user/current");
    if (res.code === 0) {
        return res.data
    }else{
        router.push("/user/login")
        return null;
    }
}
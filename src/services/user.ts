
import type {UserType} from "../models/user";

let currentUser: UserType;

/**
 * 设置当前登录用户信息
 */
const setCurrentUser = (user:UserType) => {
    currentUser = user;
}

const getCurrentUser = ():UserType => {
    return currentUser;
}

export {
    setCurrentUser,
    getCurrentUser,
}
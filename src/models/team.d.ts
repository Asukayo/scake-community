import type {UserType} from "./user";

export type TeamType = {
    createTime: Date;
    createUserId: number;
    description: string;
    expireTime: string;
    id: number;
    joinPassword?: string;
    joinUsers?: UserType[];
    maxNum: number;
    teamName: string;
    teamStatus: number;
}
import { TUser } from "./types";

export interface IUser {
    id: number;
    isAdmin: number;
    username: string;
    token: string;
}

export interface IUserContext {
    user: TUser;
    setUser: (user: TUser) => void;
}


export interface IUserResponse {
    user_id: number;
    username: string;
    access_token: string;
    status: number;
}

export interface IToast {
    message: string | number;
    type: number;
}

export interface IToasterContext {
    toasts: IToast[];
    setToasts: (toasts: IToast[]) => void;
    addToast: (message: string, type: number) => void;
}

export interface IArticle {
    id: number;
    title: string;
    content: string;
}

export interface IComment {
    id: number;
    createdAt: string;
    content: string;
}

export interface ICredentials {
    username: string;
    password: string;
}
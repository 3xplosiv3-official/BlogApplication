export enum UserRole {
    Guest = 0,
    Admin = 1,
}

export enum ToastStatus {
    Error = -1,
    Success = 1,
}

export enum ResponseState {
    Loading,
    Error,
    Empty,
    Success
}

export enum InitialCredentials {
    username = "",
    password = "",
}

export enum InitialArticle {
    id = NaN,
    title = "",
    description = "",
    content = ""
}

export interface IUser {
    id: number;
    role: number;
    username: string;
    token: string;
}

export type TUser = IUser | null

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

export interface ICredentials {
    username: string;
    password: string;
}

export interface IToast {
    message: string | number;
    type: ToastStatus;
}

export interface IToasterContext {
    toasts: IToast[];
    setToasts: (toasts: IToast[]) => void;
    addToast: (message: string, type: number) => void;
}

export interface IBaseArticle {
    id: number;
    title: string;
    description: string;
    content: string;
}

export interface IArticle extends IBaseArticle {
    created_at: string;
    updated_at: string;
}

export interface IBaseComment {
    content: string;
}

export interface IComment extends IBaseComment {
    id: number;
    created_at: string;
}
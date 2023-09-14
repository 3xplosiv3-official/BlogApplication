export interface IUser {
    id: number;
    isAdmin: number;
    username: string;
    token: string;
}

export interface IBaseArticle {
    title: string;
    content: string;
}

export interface IArticle extends IBaseArticle {
    id: number;
}

export interface IBaseComment {
    createdAt: string;
    content: string;
}

export interface IComment extends IBaseComment {
    id: number;
}

export interface ICredentials {
    username: string;
    password: string;
}

export interface IToast {
    message: string | number;
    type: number;
}
export interface IUser {
    created_at: string;
    email:string;
    email_verified_at?:string;
    id?:number;
    name:string;
    updated?:string;
}

export interface IMessage{
    msg:string;
    me?:boolean;
    from?:string;
    createdAt?:string;
    user?:string;

}
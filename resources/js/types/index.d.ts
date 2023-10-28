export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    documents:Document[];
    archives:Document[];
    selected_document?:Document;
    expanded_docs?:number[];
};


export interface Document{
    id:number;
    user_id:number;
    document_id?:number;
    title:string;
    is_archived:1|0;
    content?:string;
    cover_image?:string;
    icon?:string;
    is_published:1|0;
    user:User;
    document?:Document;
    documents:Document[];
    updated_at:string;
    created_at:string;
}

export interface Mood{
    id:number;
    user_id:number;
    user:User;
    icon:string;
    description:string;
    start:string;
    end:string;
}


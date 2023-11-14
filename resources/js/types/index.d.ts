export interface User {
    id: number;
    name: string;
    email: string;
    level:1|0;
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
    pss_questions:Question[];
    questionnaire_questions:Question[];
    pss_choices:Choice[];
    questionnaire_choices:Choice[];
    test_taken_this_month?:Boolean;
    sent_feedback_today?:Boolean;
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
    is_done:1|0;
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
    mood_level:number;
}

export interface Feedback {
    id:number;
    user_id:number;
    user:User;
    message:string;
    updated_at:string;
    created_at:string;
}

export interface Video{
    id:number;
    user_id:number;
    name:string;
    path:string;
    created_at:string;
    updated_at:string;
}

export interface Task{
    id:number;
    user_id:number;
    name:string;
    target_date?:string;
    created_at:string;
    updated_at:string;
    task_items:TaskItem[];
}

export interface TaskIndividualItem{
    id:number;
    task_id:number;
    name:string;
    target_date?:string;
    is_completed:0|1;
    created_at:string;
    updated_at:string;
}

export interface Question{
    id:number;
    question:string;
    created_at:string;
    updated_at:string;
}



export interface Choice{
    id:number;
    level:number;
    choice:string;
    created_at:string;
    updated_at:string;
}


export interface Result{
    id:number;
    user_id:number;
    description:string;
    remarks:string;
    created_at:string;
    updated_at:string;
}
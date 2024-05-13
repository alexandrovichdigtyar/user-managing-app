export interface Column {
    field: string;
    label: string;
    width: number;
    sortable?: boolean;
};

export interface ActionColumn {
    label: string,
    onClick: (value: any) => void,
}

export interface UserData {
    name: string;
    userName: string;
    email: string;
    city: string;
    id: string;
    [key: string]: any;
};

export type CreatingUser = Omit<UserData, "id">;

export enum AppRoutes {
    home = "/home",
    edit = "/edit",
    add = "/add"
}
export interface Movie {
    id: any;
    title: string;
    image: string;
    date: any | Date;
    grade: string;
    runtime: number;
    actors: string[];
    director: string;
    status: boolean;
}
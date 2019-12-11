export enum Level {
    Principiante = "Principiante", 
    Intermedio = "Intermedio",
    Avanzado = "Avanzado"
};

export enum Ordering {
     ASC = "ASC",
     DESC = "DESC"
};

export interface Teacher {
    teacherId: number,
    teacherName: string
}

export interface Course {
    courseId?: number,
    title: string,
    level: Level,
    teacherId: number,
    teacherName?: string,
    hours: number,
    active: boolean
};

export const API_URL: string = 'http://localhost:8080/courses';
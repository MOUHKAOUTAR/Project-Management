
export interface Project {
    id?: number;
    title: string;
    description?: string;
    createdAt?: Date;
    user?: any;
    tasks?: Task[];
  }
  
  export interface Task {
    id?: number;
    title: string;
    description?: string;
    completed?: boolean;
    createdAt?: Date;
    dueDate?: Date;
    project?: Project;
  }
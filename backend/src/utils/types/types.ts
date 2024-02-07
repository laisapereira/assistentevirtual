export interface Department {
  id: number;
  name: string;

}

export interface User_Department{
  id: number;
  user_id: number;
  department_id: number;
  department: Department; 
  
}

export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  user_departments: User_Department[];

}
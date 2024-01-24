export interface User {
  id: number;
  email: string;
  name: string;
  password?: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    email: 'user1@example.com',
    name: 'John Doe',
    password: 'hashedpassword1',
  },
  {
    id: 2,
    email: 'user2@example.com',
    name: 'Jane Smith',
    password: 'hashedpassword2',
  },
  {
    id: 3,
    email: 'user3@example.com',
    name: 'Bob Johnson',
    password: 'hashedpassword3',
  },
  {
    id: 4,
    email: 'user4@example.com',
    name: 'Alice Brown',
    password: 'hashedpassword4',
  },
];

export default mockUsers;
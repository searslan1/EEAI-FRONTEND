export interface IUser {
    id: string; // Kullanıcı ID'si
    name: string;
    email: string;
    role: 'admin' | 'company' | 'user';
    profilePicture?: string;
  }
  
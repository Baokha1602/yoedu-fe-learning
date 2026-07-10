export interface Course {
  id: number;
  code: string;
  name: string;
  instructor: string;
  price: number;
  status: 'active' | 'pending' | 'closed';
}

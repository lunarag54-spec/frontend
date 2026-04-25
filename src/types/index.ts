export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: 'NEW' | 'LIKE_NEW' | 'GOOD' | 'FAIR' | 'POOR';
  imageUrl?: string;
  username: string;        // nombre del propietario
  createdAt: string;
}
import axios from 'axios';
import type { Product, ProductResponse } from '../model/ProductDTO';

const apiClient = axios.create({
  baseURL: 'https://ja-product-explorer-backend-3492383069f0.herokuapp.com/product-explorer/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  async getProduct(barcode: string): Promise<Product> {
    const response = await apiClient.get<Product>(`/products/${barcode}`);
    return response.data;
  },

  async getAllProducts(): Promise<ProductResponse> {
    const response = await apiClient.get<ProductResponse>('/products');
    return response.data;
  }

};
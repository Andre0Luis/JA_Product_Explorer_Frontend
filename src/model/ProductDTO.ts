export interface Product {
    id: number;
    nome: string;
    preco: string;
    estoque: number;
    codigoDeBarras: number;
    idCodigoDeBarras: string
    dataAtualizacao: string;
  }
  
  export interface ProductResponse {
    data: Product[];
  }
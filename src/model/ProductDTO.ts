export interface Product {
    id: number;
    nome: string;
    preco: string;
    estoque: number;
    codigoDeBarras: number;
    idCodigoDeBarras: string
    dataAtualizacao: string;
    // Adicione outros campos conforme necessário
  }
  
  export interface ProductResponse {
    data: Product[];
    // Adicione outros campos conforme necessário
  }
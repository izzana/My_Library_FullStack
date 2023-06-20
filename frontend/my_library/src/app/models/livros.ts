export interface Livros {
  id: string;
  titulo: string;
  autor: string;
  ano_publicacao: string;
  editora: string;
  tipo_livro: string;
  impresso: number | null | boolean | string;
  localizacao: string;
  emprestado: number | null;
}

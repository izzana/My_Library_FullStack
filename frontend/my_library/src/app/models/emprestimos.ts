interface Emprestimos {
  id: number | null | string;
  id_livro: string;
  id_usuario: string;
  nome_usuario: string;
  nome_livro: string;
  data_emprestimo: Date | null;
  data_devolucao: Date | null;
}

interface Emprestimo {
    id: number | null | string;
    id_livro: string;
    id_usuario: string;
    nome_usuario: string;
    nome_livro: string;
    data_emprestimo: Date | null;
    data_devolucao: Date | null;
}


export {Emprestimos, Emprestimo}

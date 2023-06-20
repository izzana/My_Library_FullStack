import { Component } from '@angular/core';
import { LivrosService } from 'src/app/services/livros/livros.service'
import { Livros } from 'src/app/models/livros'

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css']
})
export class LivrosComponent {

  livros: Livros[] = [];

  constructor(private livroService: LivrosService){}

  livro: Livros = {
    id: '',
    titulo: '',
    autor: '',
    ano_publicacao: '',
    editora: '',
    tipo_livro: '',
    impresso: '',
    localizacao:'',
    emprestado: 0
  };
  edit: boolean = false;
  showForm: boolean = false;
  showList: boolean = true;
  title: string = '';
  author: string ='';

  ngOnInit() {
    this.getAllBooks();
  }

  private clearForm() {
    this.livro = {
      id: '',
      titulo: '',
      autor: '',
      ano_publicacao: '',
      editora: '',
      tipo_livro: '',
      impresso: '',
      localizacao:'',
      emprestado: null
    }
  }

  showForms() {
    this.showForm = !this.showForm;
    this.edit = false;
    this.showList = !this.showList;
  }

  getAllBooks() {
    this.livroService.getBooks().subscribe(livros => {
      this.livros = livros
    })
  }

  getBookById(id: string) {
    console.log("ID do livro:", id)
    this.livroService._getBookById(id).subscribe(livro => {
      this.livro = livro.book
    })
  }

  getBooksByTitle() {
    const search = this.title
    if(search){
      this.livroService.getBookByName(this.title).subscribe(livros => {
        this.livros = livros
      })
    } else{
      alert("Você não digitou um autor")
      this.getAllBooks()
    }
  }

  getBooksByAutor(){
    const search = this.author
    if(search){
      this.livroService.getBookByAuthor(this.author).subscribe(livros => {
        this.livros = livros
      })
    } else{
        alert("Você não digitou um autor")
        this.getAllBooks()
    }

  }

  saveBook() {
    if(this.edit) {
      this.livroService.updateBook(this.livro).subscribe(() => {
        this.getAllBooks();
        this.edit = false;
        this.clearForm();
      })
    } else {
      this.livroService.addBook(this.livro).subscribe(() => {
        this.getAllBooks()
        this.clearForm();
      })
    }
  }

  updateBook(livro: Livros) {
    this.edit = true;
    this.livro = {...livro};
  }

  deleteBook(id: string) {
    console.log('Excluir livro ID:', id);
    this.livroService.deleteBook(id).subscribe(() => {
      console.log('Livro excluído com sucesso');
      this.getAllBooks();
    }, error => {
      console.log('Erro ao excluir livro:', error);
      alert('Erro ao excluir livro: ' + error.error.message);
    })
  }
}

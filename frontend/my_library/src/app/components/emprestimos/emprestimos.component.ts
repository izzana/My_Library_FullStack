import { Component } from '@angular/core';
import { EmprestimosService } from 'src/app/services/emprestimos/emprestimos.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { LivrosService } from '../../services/livros/livros.service';
import { Emprestimos, Emprestimo } from 'src/app/models/emprestimos';
import { Usuario } from '../../models/usuario';
import { Livros } from '../../models/livros';

@Component({
  selector: 'app-emprestimos',
  templateUrl: './emprestimos.component.html',
  styleUrls: ['./emprestimos.component.css']
})

export class EmprestimosComponent {
  emprestimos: Emprestimos[] = [];
  emprestimosCompletos: Emprestimos[] = [];
  usuarios: Usuario[] = [];
  livros: Livros[] = [];

  showForm: boolean = false;
  emprestimo: Emprestimo = {
    id: null,
    id_livro: '',
    id_usuario: '',
    nome_usuario: '',
    nome_livro: '',
    data_emprestimo: null,
    data_devolucao: null,
  }
  edit: boolean = false;
  showList: boolean = true;
  constructor (
    private emprestimosService: EmprestimosService,
    private usuarioService: UsuarioService,
    private livrosService: LivrosService
  ){
    this.getAllEmprestimos();
    this.getAllBooks();
    this.getAllUsers();
  }

  private clearForm() {
    this.emprestimo = {
      id: '',
      id_livro: '',
      id_usuario: '',
      nome_usuario: '',
      nome_livro: '',
      data_emprestimo: null,
      data_devolucao: null,
    }
  }

  ngOnInit() {
    this.getAllEmprestimos();
    this.getAllBooks();
    this.getAllUsers();
  }

  showForms() {
    this.showForm = !this.showForm;
    this.showList = !this.showList;
    this.edit = false;
    this.getAllBooks();
    this.getAllUsers();
  }

  getAllEmprestimos() {
    this.emprestimosService.getEmprestimos().subscribe(emprestimos => {
      this.emprestimos = emprestimos
      console.log(this.emprestimos)
      // this.getAllBooks();
      // this.getAllUsers();
      this.carregarUsuariosLivros();
    })
  }

  getAllBooks() {
    this.livrosService.getBooks().subscribe(livros => {
      this.livros = livros
      console.log(this.livros)
    })
  }

  getAllUsers() {
    this.usuarioService.getUsers().subscribe(usuarios => {
      this.usuarios = usuarios
      console.log(usuarios)
    })
  }

  giveBackBook(emprestimo: Emprestimo) {
    this.emprestimosService.giveBackBook(emprestimo).subscribe(
      () => {
        this.getAllEmprestimos();
      },
      (error) => {
        alert('Erro ao devolver empréstimo: ' + error.message);
      }
    );
  }

  realizarEmprestimo() {
    if(this.edit) {
      console.log("Devolvido")
    } else {
      this.fazerEmprestimo();
    }
  }

  fazerEmprestimo() {
    const usuario = this.usuarios.find((value: any) => value.id == this.emprestimo.id_usuario)
    const livro = this.livros.find((value: any) => value.id == this.emprestimo.id_livro)
    if(usuario && livro && livro.emprestado == 0) {
      this.emprestimo.nome_usuario = usuario.nome;
      this.emprestimo.nome_livro = livro.titulo;

      this.emprestimosService.addEmprestimos(this.emprestimo).subscribe(() => {
        this.getAllEmprestimos();
        this.clearForm();
      }, (error) => {
        alert(error.message)
      })
    } else {
      alert("O livro já está emprestado")
    }
  }

  isLoan(livroId: string): boolean {
    return this.emprestimos.some((emprestimo) => emprestimo.id_livro === livroId);
  }

  carregarUsuariosLivros() {
    this.emprestimos.forEach((emp) => {
      // console.log(emprestimo)
      const emprestimo1 = Object.assign(emp)
      // console.log(emp)
      console.log(emprestimo1)
      emp.id_usuario = emprestimo1.id_usuario;
      emp.id_livro = emprestimo1.id_livro;
      emp.nome_usuario = '';
      emp.nome_livro = '';
      emp.data_emprestimo = emprestimo1.data_emprestimo;
      emp.data_devolucao = emprestimo1.data_devolucao;
      this.usuarioService._getUserById(emp.id_usuario).subscribe((user) => {
        emp.nome_usuario = user.user.nome;
        console.log(user.user.nome)
        console.log(emp.nome_usuario)
      });

      this.livrosService._getBookById(emp.id_livro).subscribe((livro) => {
        emp.nome_livro = livro.book.titulo;
        // console.log(livro)
      });
    });
  }

  // carregarUsuariosLivros() {
  //   const observables = this.emprestimos.map((emprestimo) => {
  //     const usuarioObservable = this.usuarioService._getUserById(emprestimo.id_usuario).pipe(
  //       catchError((error) => {
  //         console.log(`Erro ao buscar usuário com ID ${emprestimo.id_usuario}: ${error}`);
  //         return of(null);
  //       })
  //     );

  //     const livroObservable = this.livrosService._getBookById(emprestimo.id_livro).pipe(
  //       catchError((error) => {
  //         console.log(`Erro ao buscar livro com ID ${emprestimo.id_livro}: ${error}`);
  //         return of(null);
  //       })
  //     );

  //     return forkJoin([usuarioObservable, livroObservable]).pipe(
  //       switchMap(([usuario, livro]) => {
  //         emprestimo.nome_usuario = usuario?.nome;
  //         emprestimo.nome_livro = livro?.titulo;
  //         return of(emprestimo);
  //       }),
  //       catchError((error) => {
  //         console.log(`Erro ao carregar usuário e livro para o empréstimo: ${error}`);
  //         return of(null);
  //       })
  //     );
  //   });

  //   forkJoin(observables).subscribe((emprestimos) => {
  //     this.emprestimos = emprestimos.filter((emprestimo) => emprestimo !== null) as Emprestimos[];
  //     console.log(this.emprestimos);
  //   });
  // }

  // carregarUsuariosLivros() {
  //   this.emprestimos.forEach((emprestimo) => {
  //     const usuarioObservable = this.usuarioService._getUserById(emprestimo.id_usuario).pipe(
  //       catchError((error) => {
  //         console.log(`Erro ao buscar usuário com ID ${emprestimo.id_usuario}: ${error}`);
  //         return of(null);
  //       })
  //     );

  //     const livroObservable = this.livrosService._getBookById(emprestimo.id_livro).pipe(
  //       catchError((error) => {
  //         console.log(`Erro ao buscar livro com ID ${emprestimo.id_livro}: ${error}`);
  //         return of(null);
  //       })
  //     );

  //     forkJoin([usuarioObservable, livroObservable]).pipe(
  //       mergeMap(([usuario, livro]) => {
  //         emprestimo.nome_usuario = usuario?.nome;
  //         emprestimo.nome_livro = livro?.titulo;
  //         return of(emprestimo);
  //       }),
  //       catchError((error) => {
  //         console.log(`Erro ao carregar usuário e livro para o empréstimo: ${error}`);
  //         return of(null);
  //       })
  //     ).subscribe((emprestimoAtualizado) => {
  //       if (emprestimoAtualizado !== null) {
  //         console.log(`Empréstimo atualizado: ${emprestimoAtualizado}`);
  //       }
  //     });
  //   });
  // }


}

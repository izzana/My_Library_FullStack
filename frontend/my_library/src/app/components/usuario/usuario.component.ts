import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})


export class UsuarioComponent {
  usuarios: Usuario[] = [];

  usuario: Usuario = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    login: '',
    senha: ''
  };
  showForm: boolean = false;
  edit: boolean = false;
  showList: boolean = true;

  constructor(private usuarioService: UsuarioService){
    this.getAllUsers();
  }

  ngOnInit() {
    this.getAllUsers();
  }

  private clearForm() {
    this.usuario = {
      id: '',
      nome: '',
      cpf: '',
      email: '',
      telefone: '',
      login: '',
      senha: ''
    }
  }

  showForms() {
    this.showForm = !this.showForm;
    this.showList = !this.showList;
    this.edit = false;
  }

  getAllUsers() {
    this.usuarioService.getUsers().subscribe(usuarios => {
      this.usuarios = usuarios
      console.log(usuarios)
    })
  }

  getUserById(id: string) {
    console.log("ID do usuário:", id)
    this.usuarioService._getUserById(id).subscribe(usuario => {
      this.usuario = usuario.user
      console.log(this.usuario)
    })
  }

  saveUser() {
    if(this.edit) {
      this.usuarioService.updateUser(this.usuario).subscribe(() => {
        console.log("Atualizado")
        this.getAllUsers();
        this.edit = false;
        this.clearForm();
      })
    } else {
      console.log("save")
      this.usuarioService.addUser(this.usuario).subscribe(() => {
        this.getAllUsers()
        this.clearForm();
      })
    }
  }

  updateUser(usuario: Usuario) {
    this.edit = true;
    this.usuario = {...usuario};
  }

  deleteUser(id: string) {
    console.log('Excluir usuário ID:', id);
    this.usuarioService.deleteUser(id).subscribe(() => {
      console.log('Usuário excluído com sucesso');
      this.getAllUsers();
    }, error => {
      console.log('Erro ao excluir usuário:', error);
      alert('Erro ao excluir Usuário: ' + error.error.message);
    })
  }
}

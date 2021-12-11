import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1';
  private apiKey = 'AIzaSyAlspy_ptK_iTtOgsAvkTJTEYzvwXsWjqI';

  // CREAR USUARIO

  // INGRESAR

  constructor(private _httClient: HttpClient) { }

  nuevoUsuario(usuario: UsuarioModel) {}

  login(usuario: UsuarioModel) {}

  logOut() {}
}

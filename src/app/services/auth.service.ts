import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1';
  private apiKey = 'AIzaSyAlspy_ptK_iTtOgsAvkTJTEYzvwXsWjqI';
  private userToken: any;
  usuario: UsuarioModel = new UsuarioModel();
  recordarUsuario: boolean = false;

  // CREAR USUARIO https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // INGRESAR      https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private _httClient: HttpClient) { }

  signUpNewUser(usuario: UsuarioModel) {

    const body = {
      // email: usuario.email,
      // password: usuario.password,
      // returnSecureToken: true

      // forma resumida mediante el spread operator. Como firebase requiere las mismas propiedades que tiene el usuario dentro del usuarioModel almacenado en la variable usuario, puedo usar el spread operator y ahorrar mucho codigo, solo que firebase solo requiere email,password y returnSecureToken, las propiedades de nombre y apellido si bien se van a mandar igual y van a estar de mas, de todas formas no va a afectar en nada.
      ...usuario,
      returnSecureToken: true
    };
    
    return this._httClient.post(`${this.url}/accounts:signUp?key=${this.apiKey}`,body)
            .pipe(
              map( (res: any ) => {
                console.log('idToken',res['idToken']);
                this.saveToken(res['idToken']);
                return res;
              })
            )
    
  }
  
  logIn(usuario: UsuarioModel) {
    
    const body = {
      ...usuario,
      returnSecureToken: true
    };
    
    return this._httClient.post(`${this.url}/accounts:signInWithPassword?key=${this.apiKey}`,body)
            .pipe(
              map( (res: any ) => {
                this.saveToken(res['idToken']);
                return res;
              })
            )
  }

  private saveToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token',idToken);
  }

  readToken() {
    localStorage.getItem('token') ? this.userToken = localStorage.getItem('token') : this.userToken = '';
  }

  rememberOrNotUser(loginForm: NgForm) {

    if (loginForm.form.value.recordarUsuario) {
      localStorage.setItem('email',loginForm.form.value.email);
      this.recordarUsuario = loginForm.form.value.recordarUsuario;
    } else {
      this.recordarUsuario = loginForm.form.value.recordarUsuario;
      localStorage.removeItem('email');

    }
    

  }

  logOut() {}
}

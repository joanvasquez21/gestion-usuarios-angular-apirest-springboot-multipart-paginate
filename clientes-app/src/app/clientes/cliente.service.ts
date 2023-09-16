import { Injectable } from '@angular/core';
import { formatDate, DatePipe, registerLocaleData } from '@angular/common';
import { Cliente } from './cliente';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class ClienteService {
  private urlEndpoint: string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  //Injectamos el objeto Http via constructor
  constructor(private http: HttpClient, private router: Router) {}

  getClientes(page:number): Observable<any> {
    return this.http.get(this.urlEndpoint + '/page/'+ page).pipe(
      
      tap((response:any) => {
        console.log('ClienteService: tap 1');
        (response.content as Cliente[]).forEach((cliente) => {
          console.log(cliente.nombre);
        });
        
      }),
      map((response:any) => {

        (response.content as Cliente[]).forEach(cliente  => {
         cliente.nombre.toUpperCase();
          return cliente;
        });
        return response;
      }),

      tap( response => {
        console.log('cliente service: tap 2');
        (response.content as Cliente[]).forEach(cliente  => {
          console.log(cliente.nombre);
        } );
      })
      );
  }

  public errores: string[] = [];

  getErrores(): string[] {
    return this.errores;
  }

  create(cliente: Cliente): Observable<any> {
    return this.http
      .post<any>(this.urlEndpoint, cliente, { headers: this.httpHeaders })
      .pipe(
        catchError((e) => {
          if (e.status == 400) {
            this.errores = e.error.errors as string[];

            return throwError(() => e);
          }

          console.log(e.error.mensaje);
          swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(() => e);
        })
      );
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`).pipe(
      catchError((e) => {
        //con router redirigira a /clientes
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(() => e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndpoint}/${cliente.id}`, cliente, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          if (e.status == 400) {
            return throwError(() => e);
          }
          console.log(e.error.mensaje);

          swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(() => e);
        })
      );
  }

  delete(id: number): Observable<Cliente> {
    return this.http
      .delete<Cliente>(`${this.urlEndpoint}/${id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          console.log(e.error.mensaje);

          swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(() => e);
        })
      );
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {

    let formData = new FormData();
    formData.append("archivo",archivo  );
    formData.append("id",id);

    const req = new HttpRequest('POST', `${this.urlEndpoint}/upload`, formData, {
      reportProgress: true
    });
    
    return  this.http.request(req );
  }



}

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  constructor(private http:HttpClient) { 
    
  }

  sendMessage(message:string, socketsID:any){
    const url=`${environment.urlBase}/api/message/send`;
    
    const headers=new HttpHeaders({
      Authorization:`Bearer ${localStorage.getItem('token')}`,
      'X-Socket-ID':socketsID
    });

    const data={
      message
    };

    return this.http.post(url, data, {headers});

  }

  sendDirectMessage(message:string, to:number, id_cliente:number, socketsID:any){
    //let http: HttpClient;
    const url=`${environment.urlBase}/api/message/sendDM`;
    
    const headers=new HttpHeaders({
      Authorization:`Bearer ${localStorage.getItem('token')}`,
      'X-Socket-ID':socketsID
    });

    const data={
      message,
      to,
      id_cliente
    };
    
    return this.http.post(url, data, {headers});

  }

  sendNotificationMessage(message:any, to:number, id_cliente:number, socketsID:any, tipo:string){
    //let http: HttpClient;
    const url=`${environment.urlBase}/api/message/sendDM`;
    
    const headers=new HttpHeaders({
      Authorization:`Bearer ${localStorage.getItem('token')}`,
      'X-Socket-ID':socketsID
    });

    const data={
      message,
      to,
      id_cliente,
      tipo
    };
    
    return this.http.post(url, data, {headers});

  }

  getSocket():Echo{
    return new Echo({
      broadcaster: 'pusher',
      key: environment.pusher_key,
      wsHost: environment.urlHost,
      wsPort: 6001,
      cluster: "mt1",
      authEndpoint:`${environment.urlBase}/api/broadcasting/auth`,
      forceTLS: false,
      auth:{
        headers:{
          Accept:'application/json',
          Authorization:`Bearer ${ localStorage.getItem('token') }`
        }
      },
      //encrypted: true,
      disableStats: true,
      enabledTransports:['ws'],
      //disabledTransports:['sockjs']

    });

  }

  abrirConversacion(id_emisor:any, id_receptor:any){
    return this.http.get<{respuesta: any}>(environment.urlBase+"/conversacion?id_receptor="+id_receptor+"&id_emisor="+id_emisor)
    .pipe(map(response=>response));
  }

  mensajeRecibido(id_emisor:any, id_receptor:any){
    return this.http.get<{respuesta: any}>(environment.urlBase+"/mensaje-recibido?id_receptor="+id_receptor+"&id_emisor="+id_emisor)
    .pipe(map(response=>response));
  }

  mensajesRecibidos(id_receptor:any){
    return this.http.post<{respuesta: any}>(environment.urlBase+"/mensajes-recibidos?id_receptor="+id_receptor,"")
    .pipe(map(response=>response));
  }

}

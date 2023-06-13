import { Component, OnInit, ViewChild } from '@angular/core';
import { IonBackButton, IonContent } from '@ionic/angular';
import Echo from 'laravel-echo';
import { IMessage, IUser } from './chat';
import { ChatService } from 'src/app/services/chat.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EventEmmiterService } from 'src/app/services/event.emmiter.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  
  echo:Echo=new Echo({});
  inputMessage:string="";
  messages:IMessage[]=[];
  userList:IUser[]=[];
  auth=JSON.parse(localStorage.getItem('user')+"");  
  userDM: IUser | undefined;
  currentUser='emisor';
  newMsg='';
  receptor:any;
  id_cliente:any=null;
  titulo="";
  isModalOpen = false;

  @ViewChild(IonContent)
  content!: IonContent;

  constructor(
    private chatService:ChatService,
    private activatedRoute: ActivatedRoute,
    private _eventEmiter: EventEmmiterService
  ) {
    
    console.log("CHAT: ",localStorage.getItem('user'));
    if(localStorage.getItem('user')){
      this.echo=this.chatService.getSocket();
      this.echo.connect();
      
      
    }
    this.cargandoUsuarios();
    
  }

 
  ngOnInit(): void {
  }

  cargandoUsuarios(): void {
    
    if(localStorage.getItem('user')){ 
      console.log("Cargando usuarios...");
      console.log(this.echo.private("channel-chat")
        .listen("ChatEvent",(resp:any)=>{
          console.log(resp);
        }));
      
        this.echo.join("channel-chat")
        .here((users:any)=>{
          this.userList=users;
          console.log("Usuarios",users);
        })
        .joining((user:any)=>{
          this.userList.push(user);
        })
        .leaving((user:any)=>{
          console.log("Usuario -> ");
          this.userList=this.userList.filter((userL)=>{
            return user.id !== userL.id;
          })
        });

        
          this.getDirectMessage();
        }
        console.log("ID SOCKET 1 -chat: "+this.echo.socketId());  
        
  }

    getDirectMessage(){
    
     this.echo.private(`channel-direct.${this.auth.id}`)
      .listen('DirectMessageEvent',((resp:any)=>{

        console.log(resp.response);
        console.log(resp.response.message);

        var nombre_emisor=resp.response.from.name;
        var mensaje_recibido=resp.response.message;

        if(resp.response.from.id!=this.receptor){
          this._eventEmiter.sendMessage([nombre_emisor,mensaje_recibido]);
        }

        var mensaje:IMessage={
          user:'receptor',
          createdAt: new Date().getTime()+"",
          msg:resp.response.message
        };

        this.messages.push(mensaje);

        var chats=JSON.parse(localStorage.getItem("chat")+"");
        
      }));
            setTimeout(()=>{
              this.content.scrollToBottom(200);
            });
  }

  enviarMensaje(){
    const socketID=this.echo.socketId();
    console.log("ID SOCKET 1 -chat: "+this.echo.socketId());  
    console.log("ID SOCKET: "+socketID);
    
    var newMsg=this.newMsg;  
    
      this.chatService.sendDirectMessage(this.newMsg,parseInt(this.receptor+""),this.id_cliente,socketID)
        .subscribe((resp:any)=>{
          console.log(resp);
          if(resp.ok==true){
            
            var mensaje:IMessage={
              user:'emisor',
              createdAt: new Date().getTime()+"",
              msg:newMsg
            };

            
            
            this.messages.push(mensaje);
            this.newMsg="";
            setTimeout(()=>{
              this.content.scrollToBottom(200);
            });
          }
        });

  }

  enviarNotificacion(){
    const socketID=this.echo.socketId();
    
    var newMsg=this.newMsg;  
      this.chatService.sendDirectMessage(this.newMsg,parseInt(this.receptor+""),this.id_cliente,socketID)
        .subscribe((resp:any,)=>{
          console.log(resp);
          if(resp.ok==true){

          }
        });

    this.newMsg="";
  }

  showModal(user:IUser){
    if(user.id===this.auth.id){
      return;
    }
    //this.showM=true;
    this.userDM=user;
    
  }

  seleccionarReceptor(id_usuario:any,nombre:any){
    this.receptor=id_usuario;
    
    for(let i=0;i<this.userList.length;i++){
      if(this.userList[i].id==this.receptor){
        this.titulo=this.userList[i].name;
        console.log(this.titulo);
      }
    }
    this.chatService.abrirConversacion(id_usuario,this.auth.id).subscribe((resultado:any)=>{
      console.log(id_usuario,this.auth.id);  
      console.log(resultado.length);
        //this.messages=resultado;
        var chats=JSON.parse(localStorage.getItem("chats")+"");
          
    });
    
  }

}

import { Component } from '@angular/core';
import { EventEmmiterService } from './services/event.emmiter.service';
import { NavigationStart, Router, Event } from '@angular/router';
//import { EventEmitter } from 'stream';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  mostrar:string="none";
  emisor:string="";
  nuevoMensaje:string="";

  constructor(private _eventEmiter: EventEmmiterService,
    private router:Router) {

      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
            if(!localStorage.getItem("user") && event.url!="/login"){
              this.router.navigateByUrl("/login");
            }
            
      }});
  
        

    this._eventEmiter.dataStr.subscribe((data)=>{
      this.emisor=data[0];
      this.nuevoMensaje=data[1];
      this.mostrar="block";
      window.setTimeout(()=>{
        this.mostrar="none";
      },2000);
    })
  }
}

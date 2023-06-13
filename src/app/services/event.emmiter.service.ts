import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventEmmiterService {

  dataStr = new EventEmitter();

  constructor() { }

  sendMessage(data: any) {
    this.dataStr.emit(data);
  }
}

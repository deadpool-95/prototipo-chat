import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatComponent } from './chat.component';

const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    /*children:[
      {
        path:"id_receptor",
        component:ChatComponent,
      },
      {
        path:":id_receptor",
        component:ChatComponent,
      },
    ]*/
  },
  {
    path: 'id_receptor/:id_receptor',
    component: ChatComponent,
  },
  {
    path:":id_cliente",
    component:ChatComponent,
  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatPageRoutingModule {}
import { Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { ClientListComponent } from './client/client-list/client-list.component';

export const routes: Routes = [
        { path: '', component: ClientListComponent },
        { path: 'client', component: ClientComponent },
        { path:'client/edit/:id',component: ClientComponent}
    ];

import { Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { ClientListComponent } from './client/client-list/client-list.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
        { path: '', component: ClientListComponent },
        { path: 'client', component: ClientComponent },
        { path:'client/edit/:id',component: ClientComponent},
        { path: 'not-found', component: NotFoundComponent },
        { path: '**', redirectTo: 'not-found' }
    ];

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';

import { ArtistComponent } from './component/artist/artist.component';
import { AddComponent } from './component/artist/add/add.component';
import { EditComponent } from './component/artist/edit/edit.component';

const routes: Routes = [
	// { path: '', component: HomeComponent },

	{ path: '', redirectTo: 'home', pathMatch: 'full'},
	{ path: 'home', component: ArtistComponent },
	{ path: 'add', component: AddComponent },
	{ path: 'details/:id', component: EditComponent },

	// otherwise redirect to home
	{ path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

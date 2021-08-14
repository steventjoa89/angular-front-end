import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from './_modal';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home';
import { TestPageComponent } from './test-page';

import { AngMusicPlayerModule } from  'ang-music-player';
import { CommonModule } from  '@angular/common';

import { ArtistComponent } from './component/artist/artist.component';
import { AddComponent } from './component/artist/add/add.component';
import { EditComponent } from './component/artist/edit/edit.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule,
        AppRoutingModule,
        HttpClientModule,
        AngMusicPlayerModule,
        CommonModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        TestPageComponent,
        ArtistComponent,
        AddComponent,
        EditComponent,
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
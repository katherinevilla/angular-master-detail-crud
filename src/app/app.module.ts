import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InMemoryDataBase } from './in-memory-database';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
//@ts-ignore
@NgModule({
  declarations: [
    AppComponent

  ],

  imports: [
BrowserModule,
AppRoutingModule,
HttpClientInMemoryWebApiModule.forRoot(InMemoryDataBase ),
HttpClientModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

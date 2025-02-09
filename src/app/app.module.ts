import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { WallComponent } from './wall/wall.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    WallComponent,
    BrowserAnimationsModule,
    MenuComponent
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraComponent } from './camera/camera.component';
import { ShadowElmComponent } from './shadow-elm/shadow-elm.component';
import { CanvasTestComponent } from './canvas-test/canvas-test.component';

@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    ShadowElmComponent,
    CanvasTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

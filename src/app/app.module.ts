import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, RouteReuseStrategy } from '@angular/router';
import { HttpService } from './http.service';
import { AppComponent } from './app.component';
import { ActivityStreamComponent } from './activity-stream/activity-stream.component';
import { ErrorComponent } from './error/error.component';

const appRoutes: Routes = [
       { path: '', redirectTo: 'activity_stream', pathMatch: 'full' },
       { path: 'activity_stream', component: ActivityStreamComponent },
       { path: 'activity_stream/:id', component: ActivityStreamComponent },
       { path: '**', component: ErrorComponent }
     ];

@NgModule({
  declarations: [
    AppComponent,
    ActivityStreamComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LocalComponent } from './locals/local/local.component';
import { LocalService } from './locals/local.service';
import { ScheduleComponent } from './schedules/schedule/schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FetchDataComponent,
    LocalComponent,
    ScheduleComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: LocalComponent, pathMatch: 'full' },
      { path: 'horaires', component: ScheduleComponent },
    ])
  ],
  providers: [LocalService],
  bootstrap: [AppComponent]
})
export class AppModule { }

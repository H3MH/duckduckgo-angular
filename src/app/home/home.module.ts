import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NbButtonModule, NbCardModule, NbDialogModule } from "@nebular/theme";
import {HttpClientModule} from '@angular/common/http';

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import {
  NbAlertModule,
  NbIconModule,
  NbPopoverModule,
  NbSearchModule
} from "@nebular/theme";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbDialogModule.forRoot(),
    HomeRoutingModule,
    NbPopoverModule,
    NbSearchModule,
    NbIconModule,
    NbAlertModule,
    HttpClientModule
  ]
})
export class HomeModule {}

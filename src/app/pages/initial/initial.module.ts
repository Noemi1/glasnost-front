import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitialRoutingModule } from './initial.routing';
import { InitialComponent } from './initial.component';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderComponent } from 'src/app/parts/header/header.component';
import { NavigationComponent } from 'src/app/parts/navigation/navigation.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PanelModule } from 'primeng/panel';


@NgModule({
  declarations: [
    InitialComponent,
    HeaderComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    InitialRoutingModule,
    NgxMaskModule.forChild(),
    FormsModule,
    FontAwesomeModule,
    SharedModule,
    PanelMenuModule,
    PanelModule,
  ],
  bootstrap: [InitialComponent], 
})
export class InitialModule { }

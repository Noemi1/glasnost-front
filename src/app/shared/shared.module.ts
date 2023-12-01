import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { DragDropModule as Primeng_DragDropModule } from 'primeng/dragdrop';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { DropdownModule } from "primeng/dropdown";
import { PickListModule } from 'primeng/picklist';
import { TableModule } from "primeng/table";
import { StepsModule } from 'primeng/steps';
import { ToastrModule } from "ngx-toastr";
import { NgxMaskModule } from "ngx-mask";
import { ListSharedComponent } from "./list/list.component";
import { InputNumberComponent } from './input-number/input-number.component';
import { PaginatorModule } from "primeng/paginator";
import { ButtonModule } from "primeng/button";
import { RadioButtonModule } from 'primeng/radiobutton';
import { ModalComponent } from "./modal/modal.component";
import { CalendarModule } from "primeng/calendar";
import { EmpresaSelectComponent } from "./empresa-select/empresa-select.component";
@NgModule({
    declarations: [
        ListSharedComponent,
        InputNumberComponent,
        ModalComponent,
        EmpresaSelectComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        FontAwesomeModule,
        RouterModule,
        TableModule,
        NgxMaskModule.forChild(),
        DropdownModule,
        ToastrModule,
        PickListModule,
        StepsModule,
        PaginatorModule,
        ButtonModule,
        RadioButtonModule,
        CalendarModule,
    ],
    exports: [
        ListSharedComponent,
        InputNumberComponent,
        ModalComponent,
        EmpresaSelectComponent,
    ],
})
export class SharedModule {

}

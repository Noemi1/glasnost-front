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

@NgModule({
    declarations: [
        ListSharedComponent,
        InputNumberComponent,
        ModalComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        FontAwesomeModule,
        TableModule,
        NgxMaskModule.forChild(),
        Primeng_DragDropModule,
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
    ],
})
export class SharedModule {

}

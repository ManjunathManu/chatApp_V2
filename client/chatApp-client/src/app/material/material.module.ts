import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, 
  MatCheckboxModule,
  MatToolbarModule,
  MatListModule,} from '@angular/material';
  import {MatDividerModule} from '@angular/material/divider';
@NgModule({
  imports: [
    CommonModule,
  ],
  exports:[
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule
  ],
  declarations: []
})
export class MaterialModule { }

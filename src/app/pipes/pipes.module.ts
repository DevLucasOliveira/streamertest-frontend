import { CommonFilterPipe } from './commonFilter.pipe';
import { NgModule } from "@angular/core";


@NgModule({
  declarations: [
    CommonFilterPipe
  ],
  exports: [
    CommonFilterPipe
  ]
})
export class PipesModule { }
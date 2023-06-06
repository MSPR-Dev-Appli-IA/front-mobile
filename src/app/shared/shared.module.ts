import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidatePasswordDirective } from './validate-password.directive';

@NgModule({
  declarations: [ValidatePasswordDirective],
  imports: [CommonModule],
  exports: [ValidatePasswordDirective]
})
export class SharedModule {}

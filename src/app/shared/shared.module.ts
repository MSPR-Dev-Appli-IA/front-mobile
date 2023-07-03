import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidatePasswordDirective } from './validate-password.directive';
import { UploadImageComponent } from './upload-image/upload-image.component';

@NgModule({
  declarations: [ValidatePasswordDirective, UploadImageComponent],
  imports: [CommonModule],
  exports: [ValidatePasswordDirective, UploadImageComponent]
})
export class SharedModule {}

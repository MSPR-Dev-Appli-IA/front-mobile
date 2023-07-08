import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidatePasswordDirective } from './validate-password.directive';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ValidatePasswordDirective, UploadImageComponent],
  imports: [CommonModule, MatInputModule, MatButtonModule],
  exports: [ValidatePasswordDirective, UploadImageComponent]
})
export class SharedModule {}

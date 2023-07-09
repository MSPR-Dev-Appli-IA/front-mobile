import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidatePasswordDirective } from './validate-password.directive';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LegalMentionsComponent } from './legal-mentions/legal-mentions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    ValidatePasswordDirective,
    UploadImageComponent,
    LegalMentionsComponent,
    PrivacyPolicyComponent
  ],
  imports: [CommonModule, MatInputModule, MatButtonModule, MatCardModule],
  exports: [ValidatePasswordDirective, UploadImageComponent]
})
export class SharedModule {}

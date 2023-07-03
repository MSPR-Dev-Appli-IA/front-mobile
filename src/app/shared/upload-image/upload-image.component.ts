import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPlantsService } from '../../plants/plants.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';

  imageInfos?: Observable<any>;

  constructor(private plantService: UserPlantsService) {}

  ngOnInit(): void {
    //get existing files and assign them to imageInfos
    // this.imageInfos = this.uploadService.getFiles();
  }

  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.preview = '';
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          // console.log(e.target.result);
          this.preview = e.target.result;
        };

        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.plantService
          .determinePlantSpecies(this.preview)
          .subscribe((data: any) => {
            console.log(data);
          });

        //upload file

        // this.uploadService.upload(this.currentFile).subscribe({
        //   next: (event: any) => {
        //     if (event.type === HttpEventType.UploadProgress) {
        //       this.progress = Math.round((100 * event.loaded) / event.total);
        //     } else if (event instanceof HttpResponse) {
        //       this.message = event.body.message;
        //       this.imageInfos = this.uploadService.getFiles();
        //     }
        //   },
        //   error: (err: any) => {
        //     console.log(err);
        //     this.progress = 0;
        //
        //     if (err.error && err.error.message) {
        //       this.message = err.error.message;
        //     } else {
        //       this.message = 'Could not upload the image!';
        //     }
        //
        //     this.currentFile = undefined;
        //   },
        // });
      }

      this.selectedFiles = undefined;
    }
  }
}

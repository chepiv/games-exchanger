import {Component, OnInit} from '@angular/core';
import {Account} from '../model/account';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  account: Account = {} as Account;
  fileToUpload: File;
  selectedFiles: FileList;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedPreview: string;
  fileName: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
  }

  ngOnInit() {
  }

  onSubmit() {

    const formData = new FormData();
    formData.append('account', JSON.stringify(this.account));

    if (this.croppedImage !== '' && this.croppedImage != null) {
      const blob = this.extracted();
      formData.append('file', blob);
    }

    this.http.post('http://localhost:8762/' + 'accounts/register', formData)
      .subscribe((data: any) => console.log(data),
        err => alert('Unable to register'),
        () => {
          this.router.navigate(['/login']);
        });
  }

  private extracted() {
    const contentType = this.croppedImage.split(';')[0];

    const byteCharacters = atob(this.croppedImage.split(',')[1]);

    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    return new File([byteArray], this.account.name + '_' + this.fileName);
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  fileChangeEvent(event): void {
    this.imageChangedEvent = event;
    this.fileName = event.target.files.item(0).name;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.croppedPreview = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
  }
  loadImageFailed() {
    // show message
  }

}

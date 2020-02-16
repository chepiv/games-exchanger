import {Component, OnInit} from '@angular/core';
import {Account} from '../model/account';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  account: Account = {} as Account;
  fileToUpload: File;
  selectedFiles: FileList;

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
    formData.append('file', this.selectedFiles.item(0));


    this.http.post('http://localhost:8080/' + 'accounts/register', formData)
      .subscribe((data: any) => console.log(data),
        err => alert('Unable to register'),
        () => {
          this.router.navigate(['/login']);
        });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

}

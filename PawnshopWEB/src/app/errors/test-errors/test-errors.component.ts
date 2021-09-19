import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.scss'],
})
export class TestErrorsComponent implements OnInit {
  url = 'http://localhost:5000/';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  get404Error() {
    this.http.get(this.url + 'buggy/not-found').subscribe(
      (response) => {
        console.log(response);
      },
      (error) => console.log(error)
    );
  }
  get400Error() {
    this.http.get(this.url + 'buggy/bad-request').subscribe(
      (response) => {
        console.log(response);
      },
      (error) => console.log(error)
    );
  }
  get500Error() {
    this.http.get(this.url + 'buggy/server-error').subscribe(
      (response) => {
        console.log(response);
      },
      (error) => console.log(error)
    );
  }
  get401Error() {
    this.http.get(this.url + 'buggy/auth').subscribe(
      (response) => {
        console.log(response);
      },
      (error) => console.log(error)
    );
  }
  get400ValidationError() {
    this.http.post(this.url + 'account/add-employee', {}).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => console.log(error)
    );
  }
}

import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Emmitters} from '../emmitters/emmitters';
import {Footballer} from '../footballer';
import {FootballerService} from '../footballer.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-mainview',
  templateUrl: './mainview.component.html',
  styleUrls: ['./mainview.component.css']
})
export class MainviewComponent implements OnInit {
  message = '';
  public footballers: Footballer[];
  public editFootballer: Footballer;
  public deleteFootballer: Footballer;

  constructor(private http: HttpClient, private footballerService: FootballerService
  ) { }

  public getFootballers(): void{
    this.footballerService.getFootballers().subscribe(
      (response: Footballer[]) => {
        this.footballers = response;
        console.log(this.footballers.toString());
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
    }
      );
  }

  ngOnInit(): void {
    this.getFootballers();

  //   this.http.get('http://localhost:8081/api/user/me', {withCredentials: true}).subscribe(
  //     (res: any) => {
  //         this.message = `Hi ${res.email}`;
  //         Emmitters.authEmmitter.emit(true);
  //         },
  //       error => {
  //         this.message = 'You are not logged in';
  //         Emmitters.authEmmitter.emit(false);
  //       }
  // );
   }
  public onAddFootballer(addForm: NgForm): void {
    document.getElementById('add-employee-form').click();
    this.footballerService.addFootballer(addForm.value).subscribe(
      (response: Footballer) => {
        console.log(response);
        this.getFootballers();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateFootballer(employee: Footballer): void {
    this.footballerService.updateFootballer(employee).subscribe(
      (response: Footballer) => {
        console.log(response);
        this.getFootballers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteFootballer(employeeId: number): void {
    this.footballerService.deleteFootballer(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getFootballers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchFootballer(key: string): void {
    console.log(key);
    const results: Footballer[] = [];
    for (const employee of this.footballers) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.club.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.footballers = results;
    if (results.length === 0 || !key) {
      this.getFootballers();
    }
  }

  public onOpenModal(employee: Footballer, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editFootballer = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteFootballer = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container.appendChild(button);
    button.click();
  }

}

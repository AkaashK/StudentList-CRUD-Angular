import { Component } from '@angular/core';

import { Student } from './student';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Student List';
  studentValue: Student;
  list: Student[];
  isEditable = false;
  index = 0;
  selectedIdArray: number[];

  ngOnInit() {
    this.list = [];
    this.selectedIdArray = [];
    this.studentValue = {
      id: 0,
      name: '',
      batch: '',
      branch: ''
    };
  }

  addItem = (): void => {
    if (this.studentValue.name !== ''
      && this.studentValue.batch !== ''
      && this.studentValue.branch !== ''
    ) {
      const newItem: Student = {
        id: Date.now(),
        name: this.studentValue.name,
        batch: this.studentValue.batch,
        branch: this.studentValue.branch
      };
      this.list.push(newItem);
    }
    this.studentValue = {
      id: 0,
      name: '',
      batch: '',
      branch: ''
    };
  }

  deleteItem = (id: number): void => {
    this.list = this.list.filter(item => item.id !== id);
  }

  handleEdit = (): void => {
    if(this.isEditable) {
      this.list[this.index] = {
        id: Date.now(),
        name: this.studentValue.name,
        batch: this.studentValue.batch,
        branch: this.studentValue.branch
      };
      this.isEditable = false;
      this.index = 0;
      this.studentValue = {
        id: 0,
        name: '',
        batch: '',
        branch: ''
      };
    }
  }

  getEditableItem = (item: Student): void => {
    this.studentValue = {
      id: item.id,
      name: item.name,
      batch: item.batch,
      branch: item.branch
    }
    this.index = this.list.indexOf(this.list.filter(student => student.id === item.id)[0]);
    this.isEditable = true;
  }

  getSelectedIds = (event, id: number): void => {
    if (event.target.checked) {
      this.selectedIdArray.push(id);
    } else {
      this.selectedIdArray = this.selectedIdArray.filter(eventid => eventid !== id);
    }
  }

  handleMultipleDelete = (): void => {
    if (this.selectedIdArray.length) {
      this.selectedIdArray.map((id: number) => {
        this.list = this.list.filter((student: Student) => student.id !== id);
      });
      this.selectedIdArray = [];
    }
  }
}

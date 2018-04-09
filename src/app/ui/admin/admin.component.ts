import { Component, OnInit } from '@angular/core';
import { AdminToolsService } from '../../core/admin-tools.service';
import {BrowserModule} from '@angular/platform-browser'
import {ReactiveFormsModule, FormsModule, FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  back = {
    options: [
      { name: 'Todo',  selected: true, id: 1 },
      { name: 'Partes',  selected: false, id: 2 },
      { name: 'Usuarios',  selected: false, id: 3 },
      { name: 'Empresas',  selected: false, id: 4 },
    ]
  }
  public form;
  public file:any;

  constructor(private adminService: AdminToolsService,private fb: FormBuilder) {
    this.form = this.fb.group({
      options: this.buildBackup()
    });
   }

  ngOnInit() {

  }

    // Importar backup
  fileChanged(e) {
      this.file = e.target.files[0];
  }

  uploadDocument(file) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.adminService.import(fileReader.result);
    }
    fileReader.readAsText(this.file);
  }

  // --------------
  backup(options: any){
    this.adminService.backup(options);
  }

  get options() {
    return this.form.get('options');
  };

  buildBackup() {
    const arr = this.back.options.map(option => {
      return this.fb.control(option.selected);
    });
    return this.fb.array(arr);
  }

  submit(value) {
    const f = Object.assign({}, value, {
      options: value.options.map((s, i) => {
      return {
        id: this.back.options[i].id,
        selected: s
      }
     })
    })
    this.backup(f);
  }
}

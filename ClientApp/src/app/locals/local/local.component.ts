import { Component, OnInit } from '@angular/core';
import { LocalService } from '../local.service';
import { Local } from '../local.model';
import * as equal from 'deep-equal';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css'],
})
export class LocalComponent implements OnInit {
  form:Local = new Local();
  JSON=JSON;
  errorMessage = null;

  constructor(private localService : LocalService) {}

  ngOnInit() {

  }

  async refresh(){
    await this.localService.fetchLocalsOnServer();
    this.form = new Local(this.localService.findLocalById(this.form.id));
  }

  formField(attr, event){
    this.form[attr] = event.target.value;
    this.errorMessage=null;
  }

  selectionChange(event){
    const original = this.localService.findLocalById(this.form.id);
    if(original && !equal(this.form, original)){
      if(!confirm('Les modifications actuelles seront perdues. Continuer ?')){
        const backup = this.form;
        // this.form need to change to refresh the component
        // This works but should find another way
        this.form = new Local();
        setTimeout(_=>this.form = backup,0); 
        return;
      }
    }
    this.form = new Local(this.localService.findLocalById(+event.target.value));
    this.errorMessage=null;
  }

  async save(){
    try{
      if(this.form.id){
        await this.localService.editLocal(this.form);
      }else{
        this.localService.addLocal(this.form);
      }
    }catch(e){
      this.errorMessage = e.message;
    }
  }

}

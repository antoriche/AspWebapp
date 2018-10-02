import { Injectable, Inject } from '@angular/core';
import { Local } from './local.model';
import { HttpClient } from '@angular/common/http';
import * as equal from 'deep-equal';

@Injectable()
export class LocalService {
  locals:Local[];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.fetchLocalsOnServer();
    // Should find a better way to update the list... websocket ?
    // setInterval(_=>this.fetchLocalsOnServer(),5000);
  }

  fetchLocalsOnServer(){
    return new Promise((resolve, reject)=>{
      this.http.get<Local[]>(this.baseUrl + 'api/local').subscribe(result => {
        this.locals = result;
        resolve(result);
      }, reject);
    }).catch(err=>{
      console.error(err);
      throw err;
    });
  }

  getLocals():Local[]{
    return this.locals;
  }

  async addLocal(local:Local){
    const local_ = new Local(local);
    local_.validate();
    // local_.id = Math.max(...this.locals.map(local=>local.id))+1;
    if(this.findLocalByName(local.name))throw new Error("This local already exist");
    await this.http.post<Local>(this.baseUrl+"api/local", local_)
      .subscribe(_=>this.fetchLocalsOnServer(), console.error);
  }
  async editLocal(local:Local){
    local.validate();
    const current = this.findLocalById(local.id);
    if(!current){
      throw new Error("Cannot edit an unexisting local");
    }
    const samename = this.findLocalByName(local.name);
    if(samename && samename.id != local.id)throw new Error("This local already exist");
    await new Promise((resolve, reject)=>{
        this.http.get<Local>(this.baseUrl+"api/local/"+local.id)
        .subscribe((localOnServer:Local)=>{
          if(!equal(localOnServer, current)){
            // this.locals[this.locals.indexOf(current)] = localOnServer;
            // console.log(localOnServer);
            const ok = confirm("Attention, Des modifications ont déjà été effectuées par un autre utilisateur simultanément.\n"+new Local(localOnServer));
            if(ok)resolve(local);
            else {
              resolve(localOnServer);
            }
          }else {
            resolve(local);
          }
        },_=> resolve(local))
      }
    ).then(local=>{
      this.http.put<Local>(this.baseUrl+"api/local", local)
      .subscribe(_=>this.fetchLocalsOnServer(), console.error);
    });
  }

  deleteLocal(id:number){
    return new Promise((resolve, reject)=> {
      this.http.delete<Local>(this.baseUrl+"api/local/"+id)
      .subscribe(local=>{
        this.fetchLocalsOnServer().then(_=>resolve(local));
      }, console.error);
    })
  }

  findLocalByName(name:string){
    return this.locals.filter(elt=>elt.name === name)[0];
  }
  findLocalById(id:number){
    return this.locals.filter(elt=>elt.id === id)[0];
  }

}

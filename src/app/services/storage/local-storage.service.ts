import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() {
  }
  public getSessionOrLocalData(key:string){
    const sitem = sessionStorage.getItem(key)
    const litem = localStorage.getItem(key)
    return (sitem) ? JSON.parse(sitem): (litem) ? JSON.parse(litem): null;
  }

  public saveSessionData(key:string,value:any){
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  public getSessionData(key: string) {
    const item = sessionStorage.getItem(key)
    return (item) ? JSON.parse(item) : null;
  }

  public removeSessionData(key: string) {
    sessionStorage.removeItem(key);
  }

  public clearSessionData() {
    sessionStorage.clear();
  }


  public saveData(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getData(key: string) {
    const item = localStorage.getItem(key)
    return (item) ? JSON.parse(item) : null;
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }
}

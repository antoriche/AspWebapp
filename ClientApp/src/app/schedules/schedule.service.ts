import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ScheduleService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  

}

// src/app/services/person.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person, VwPerson } from '../../models/Person';

@Injectable({
    providedIn: 'root'
})
export class PersonService {
    private apiUrl = 'https://localhost:7220/api/Person';

    constructor(private http: HttpClient) { }

    getPersons(): Observable<VwPerson[]> {
        return this.http.get<VwPerson[]>(this.apiUrl);
    }

    getPersonById(id: number): Observable<VwPerson> {
        return this.http.get<VwPerson>(`${this.apiUrl}/${id}`);
    }

    addPerson(person: Person): Observable<VwPerson> {
        return this.http.post<VwPerson>(this.apiUrl, person);
    }
}

// src/app/persons/persons.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PersonService } from '../services/persons.service';
import { VwPerson } from '../../models/Person';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { PersonCreateComponent } from '../components/create-person/create-person.component';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule]
})

export class PersonComponent implements OnInit {
  displayedColumns: string[] = ['fullName', 'fullIdentification', 'creationDate', 'email'];
  dataSource = new MatTableDataSource<VwPerson>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private personService: PersonService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadPersons();
  }

  loadPersons(): void {
    this.personService.getPersons().subscribe((persons: VwPerson[]) => {
      this.dataSource.data = persons;
      this.dataSource.paginator = this.paginator;
    });
  }

  openCreatePersonDialog(): void {
    const dialogRef = this.dialog.open(PersonCreateComponent, {
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPersons();
      }
    });
  }
}

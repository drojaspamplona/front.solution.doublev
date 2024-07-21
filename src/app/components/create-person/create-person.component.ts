import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from '../../../models/Person';
import { PersonService } from '../../services/persons.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-person-create',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule
  ]
})
export class PersonCreateComponent {
  personForm: FormGroup;
  tiposIdentificacion = [
    { value: 'Pasaporte', label: 'Pasaporte' },
    { value: 'Cedula', label: 'Cédula' },
    { value: 'Licencia de Conducir', label: 'Licencia de Conducir' }
  ];

  constructor(
    public dialogRef: MatDialogRef<PersonCreateComponent>,
    private fb: FormBuilder,
    private personService: PersonService
  ) {
    this.personForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      identificationNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      identificationType: ['', Validators.required]
    });
  }

  onSave(): void {
    if (this.personForm.valid) {
      const newPerson: Person = {
        ...this.personForm.value,
        idPerson: 0,
        creationDate: '',
        fullIdentification: null,
        fullName: null
      };

      this.personService.addPerson(newPerson).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

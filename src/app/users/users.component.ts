import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../../models/user';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../components/create-user/create-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule]
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['userName'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getUsers().subscribe((users: User[]) => {
      this.dataSource.data = users;
      this.dataSource.paginator = this.paginator;
    });
  }

  openCreatePersonDialog(): void {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }

}

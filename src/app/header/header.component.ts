import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../Auth/auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../Auth/auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub!: Subscription;
  isAuth = false;

  constructor(private dsService: DataStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user
      .subscribe(
        (user: User | null) => {
          this.isAuth = !!user;
        }
      )
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onSaveData() {
    this.dsService.storeRecipes();
  }

  onFetchData() {
    this.dsService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}

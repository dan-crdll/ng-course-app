import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../Auth/auth/auth.service';
import { Subscription, map } from 'rxjs';
import { User } from '../Auth/auth/user.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub!: Subscription;
  isAuth = false;

  constructor(
    private dsService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.userSub = this.store.select('auth')
      .pipe(map(authUser => {return authUser.user}))
      .subscribe(
        (user: User | undefined) => {
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

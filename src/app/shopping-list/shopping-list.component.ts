import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../shared/shopping-list.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromSL from './store/shopping-list.reducer';
import * as SLActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!: Observable<{ingredients: Ingredient[]}>;
  isChangeSub!: Subscription;

  constructor(private shoppingListService: ShoppingListService,
    private store: Store<fromSL.AppState>) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  }

  ngOnDestroy(): void {
    
  }

  onEditItem(index: number) {
    this.store.dispatch(new SLActions.StartEdit(index));
  }

}

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredients.model';
import * as SLActions from '../store/shopping-list.actions'
import * as fromSL from '../store/shopping-list.reducer';
import * as fromApp from '../../store/app.reducer'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  editMode = false;
  editedItem!: Ingredient;
  @ViewChild('f') slForm!: NgForm;

  constructor(private store: Store<fromApp.AppState>) { }

  onAddItem(form: NgForm): void {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (!this.editMode)
      this.store.dispatch(new SLActions.AddIngredient(newIngredient))
    else {
      this.store.dispatch(new SLActions.UpdateIngredient(newIngredient));
      this.editMode = false;
    }
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.store.dispatch(new SLActions.StopEdit());
  }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(state => {
      if (state.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = <Ingredient>state.editedIngredient;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      } else {
        this.editMode = false;
      }
    });
  }

  onDelete() {
    this.store.dispatch(new SLActions.DeleteIngredient())
    this.editMode = false;
    this.slForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new SLActions.StopEdit());
  }
}

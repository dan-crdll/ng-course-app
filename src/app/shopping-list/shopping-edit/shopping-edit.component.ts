import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from 'src/app/shared/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild('amountInput') amountInput!: ElementRef;

  constructor(private slService: ShoppingListService) {}

  onAddItem(): void {
    const newIngredient = new Ingredient(this.nameInput.nativeElement.value, 
      this.amountInput.nativeElement.value);
    this.slService.addIngredient(newIngredient)
  }

  onClear() {
    this.slService.clearIngredient();
  }
}

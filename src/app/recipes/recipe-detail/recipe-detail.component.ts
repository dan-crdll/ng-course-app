import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shared/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  constructor(private slService: ShoppingListService) { }
  @Input() selectedRecipe!: Recipe;

  addToShoppingList() {
    this.slService.addIngredients(this.selectedRecipe.ingredients);
  }
}

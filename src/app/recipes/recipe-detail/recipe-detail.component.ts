import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shared/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe-list/recipe.service';
import { Store } from '@ngrx/store';
import { AddIngredients } from 'src/app/shopping-list/store/shopping-list.actions';
import * as fromSL from 'src/app/shopping-list/store/shopping-list.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe!: Recipe;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private store: Store<fromSL.AppState>) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.selectedRecipe = this.recipeService.getRecipeById(this.id);
        }
      )
  }

  addToShoppingList() {
    this.store.dispatch(new AddIngredients(this.selectedRecipe.ingredients));
  }

  onEditMode() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../', {relativeTo: this.route}])
  }
}

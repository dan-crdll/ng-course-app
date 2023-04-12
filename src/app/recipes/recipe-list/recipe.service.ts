import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "../recipe.model";
import { Ingredient } from "src/app/shared/ingredients.model";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe('Hamburger', 
        'A tasty Hamburger', 
        'https://media-cdn.tripadvisor.com/media/photo-s/18/32/da/50/photo0jpg.jpg',
        [new Ingredient('bun', 2), new Ingredient('burger', 1)], 0),
        new Recipe('Salad', 
        'An healthy salad', 
        'https://images.immediate.co.uk/production/volatile/sites/30/2014/05/Epic-summer-salad-hub-2646e6e.jpg',
        [new Ingredient('lettuce', 5), new Ingredient('tomato', 2)], 1),
      
      ];

    public recipeChanged = new Subject<Recipe[]>();

    public recipeSelected = new Subject<Recipe>();

    getRecipe() {
        return this.recipes.slice();
    }

    getRecipeById(id: number) {
        return this.recipes[id];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }
}
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "./ingredients.model";

@Injectable({providedIn: 'root'})
export class ShoppingListService {
    ingredientChanged = new EventEmitter<Ingredient[]>()

    private ingredients: Ingredient[] = [
        new Ingredient('apples', 5),
        new Ingredient('tomatoes', 10),
      ];

    public getIngredients() {
        return this.ingredients.slice();
    }

    public addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientChanged.emit(this.ingredients.slice())
    }

    public addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientChanged.emit(this.ingredients.slice());
    }

    public clearIngredient() {
        this.ingredients = [];
        this.ingredientChanged.emit(this.ingredients.slice())
    }
}
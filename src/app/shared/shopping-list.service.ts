import { Injectable } from "@angular/core";
import { Ingredient } from "./ingredients.model";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
    ingredientChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>()

    private ingredients: Ingredient[] = [
        new Ingredient('apples', 5),
        new Ingredient('tomatoes', 10),
    ];

    public getIngredients() {
        return this.ingredients.slice();
    }

    public addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.ingredients.slice())
    }

    public addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    public clearIngredient() {
        this.ingredients = [];
        this.ingredientChanged.next(this.ingredients.slice())
    }

    public getIngredient(index: number) {
        return this.ingredients[index];
    }

    public updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientChanged.next(this.ingredients);
    }

    public deleteIngredient(index: number) {
        for(let i = index; i < this.ingredients.length - 1; i++) {
            this.ingredients[i] = this.ingredients[i + 1];
        }
        this.ingredients.pop();

        this.ingredientChanged.next(this.ingredients);
    }
}
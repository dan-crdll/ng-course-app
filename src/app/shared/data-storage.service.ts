import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe-list/recipe.service";
import { map, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DataStorageService {


    constructor(private http: HttpClient, private recService: RecipeService) { }

    storeRecipes() {
        const recipes = this.recService.getRecipe();
        this.http.put('https://ng-complete-guide-b71cc-default-rtdb.firebaseio.com/recipes.json',
            recipes)
            .subscribe(res => console.log(res));
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>('https://ng-complete-guide-b71cc-default-rtdb.firebaseio.com/recipes.json')
            .pipe(map(recipes => {
                return recipes.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                })
            }),
                tap((res) => {
                    this.recService.setRecipes(res);
                }));
    }
}
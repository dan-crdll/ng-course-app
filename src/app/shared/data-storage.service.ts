import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe-list/recipe.service";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../Auth/auth/auth.service";

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(private http: HttpClient,
        private recService: RecipeService,
        private authService: AuthService) { }

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
                }))
    }


}
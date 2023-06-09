import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "../recipes/recipes.component";
import { ShoppingListComponent } from "../shopping-list/shopping-list.component";
import { RecipeDetailComponent } from "../recipes/recipe-detail/recipe-detail.component";
import { RecipeStartComponent } from "../recipes/recipe-start/recipe-start.component";
import { RecipeEditComponent } from "../recipes/recipe-edit/recipe-edit.component";
import { RecipesResolverService } from "../recipes/recipe-list/recipe-resolver.service";
import { AuthComponent } from "../Auth/auth/auth.component";
import { AuthGuard } from "../Auth/auth/auth.guard";

const appRoutes: Routes = [
    { path: "", redirectTo: "/recipes", pathMatch: "full" },
    {
        path: "recipes", component: RecipesComponent, 
        children: [
            { path: "", component: RecipeStartComponent },
            { path: "new", component: RecipeEditComponent },
            {
                path: ":id", component: RecipeDetailComponent,
                resolve: [RecipesResolverService]
            },
            { path: ":id/edit", component: RecipeEditComponent },
        ],
        canActivate: [AuthGuard]
    },
    { path: "shopping-list", component: ShoppingListComponent },
    { path: "auth", component: AuthComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
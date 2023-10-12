import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes-feature/services/recipe.service';
import { Recipe } from '../recipes-feature/recipe.model';
import { map, of, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http
      .put(
        'https://ng-backend-711-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe();
  }

  getRecipes() {
    const user = this.authService.user.getValue();
    if (user?.token) {
      this.recipeService.isFetchingRecipes = true;
      return this.http
        .get<Recipe[]>(
          'https://ng-backend-711-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
        )
        .pipe(
          map((recipes) => {
            return recipes.map((rec) => ({
              ...rec,
              ingredients: rec.ingredients ?? [],
            }));
          }),
          tap({
            next: (recipes) => {
              this.recipeService.setRecipes(recipes);
              this.recipeService.isFetchingRecipes = false;
            },

            error: () => {
              this.recipeService.isFetchingRecipes = false;
            },
          })
        );
    }

    return of([]);
  }
}

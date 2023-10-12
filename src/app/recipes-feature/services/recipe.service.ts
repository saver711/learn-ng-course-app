import { Injectable } from '@angular/core';
import { Recipe } from '../recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor() {}

  recipes: Recipe[] = [];
  isFetchingRecipes = false;

  getSelectedRecipe(recipeId: string) {
    return this.recipes.find((recipe) => recipe.id === recipeId);
  }

  getRecipes() {
    return this.recipes;
  }
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  updateRecipe(recipe: Recipe) {
    this.recipes.forEach((rec) => {
      if (rec.id === recipe.id) {
        rec.name = recipe.name;
        rec.description = recipe.description;
        rec.imgUrl = recipe.imgUrl;
        rec.ingredients = recipe.ingredients;
      }
    });
  }

  deleteRecipe(id: string) {
    const newRecipes = this.recipes.filter((rec) => rec.id !== id);
    this.recipes = newRecipes;
    console.log(`RecipeService ~ deleteRecipe ~ this.recipes:`, this.recipes);
  }
}

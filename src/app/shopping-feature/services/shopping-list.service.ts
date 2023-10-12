import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RecipeService } from 'src/app/recipes-feature/services/recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredients: Ingredient[] = [new Ingredient('2,', 'a', 12)];
  startEditing = new Subject<string>();

  addIngredient(ing: Ingredient) {
    if (!this.checkIngExistence(ing)) this.ingredients.push(ing);
  }

  addIngredients(ings: Ingredient[]) {
    ings.forEach((ing) => {
      if (!this.checkIngExistence(ing)) this.ingredients.push(ing);
    });

    // I can use push like this, but i need to check for each ingredient existence.
    // this.ingredients.push(...ings);
  }

  editIngredient(ingredient: Ingredient) {
    this.ingredients.forEach((ing) => {
      if (ing.id === ingredient.id) {
        ing.name = ingredient.name;
        ing.amount = ingredient.amount;
      }
    });
  }

  deleteIngredient(id: string){
    const newIngs = this.ingredients.filter(ing => ing.id !== id)
    this.ingredients = newIngs
  }

  private checkIngExistence(ing: Ingredient) {
    return this.ingredients.find(
      (ingredient) =>
        ingredient.name === ing.name && ingredient.amount === ing.amount
    );
  }

  getIngredient(id: string) {
    return this.ingredients.find((ing) => ing.id === id);
  }

  constructor(private recipeService: RecipeService) {}
}

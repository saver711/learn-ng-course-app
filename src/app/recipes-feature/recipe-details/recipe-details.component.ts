import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../services/recipe.service';
import { ShoppingListService } from 'src/app/shopping-feature/services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styles: [],
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {
  actionsDropdownIsOpen = false;
  selectedRecipe: Recipe | undefined;
  subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params) => {
      const recipe = this.recipeService.getSelectedRecipe(params['recipeId']);

      this.selectedRecipe = recipe;

    });

    if(!this.selectedRecipe){
      this.router.navigate(['../'], { relativeTo: this.route })
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  toggleActionsDropdown() {
    this.actionsDropdownIsOpen = !this.actionsDropdownIsOpen;
  }

  addIngredientToShoppingList() {
    this.selectedRecipe?.ingredients &&
      this.shoppingListService.addIngredients(this.selectedRecipe?.ingredients);

    this.toggleActionsDropdown();
  }

  deleteRecipe() {
    if (this.selectedRecipe)
      this.recipeService.deleteRecipe(this.selectedRecipe.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}

import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../services/recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as uuid from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styles: [],
})
export class RecipeListComponent implements OnInit {
  buttonText = 'Add Recipe';
  
  get recipes() {
    return this.recipeService.recipes;
  }

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {
    // this.recipes = this.recipeService.recipes;
  }

  onButtonClick() {
    this.router.navigate(['/recipes/new']);
  }
}

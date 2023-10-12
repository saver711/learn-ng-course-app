import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../services/recipe.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styles: [],
})
export class RecipeFormComponent implements OnInit {
  recipeId!: string;
  isInEditMode = false;
  recipe: Recipe | undefined;

  recipeForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.recipeId = params['recipeId'];
      this.isInEditMode = !!this.recipeId;
      this.initializeTheForm();

      this.recipe = this.recipesService.getSelectedRecipe(this.recipeId);

    });
  }

  private initializeTheForm() {
    let name = '';
    let imgUrl = '';
    let description = '';
    let ingredients = new FormArray<
      FormGroup<{
        name: FormControl<string | null>;
        amount: FormControl<number | null>;
      }>
    >([]);

    if (this.isInEditMode) {
      const recipe = this.recipesService.getSelectedRecipe(this.recipeId);
      console.log(`RecipeFormComponent ~ initializeTheForm ~ recipe:`, recipe)
      if (recipe) {
        name = recipe.name;
        imgUrl = recipe.imgUrl;
        description = recipe.description;

        if (!!recipe.ingredients.length) {
          recipe.ingredients.forEach((ing) => {
            return ingredients.push(
              new FormGroup({
                name: new FormControl(ing.name, Validators.required),
                amount: new FormControl(ing.amount, [
                  Validators.required,
                  Validators.min(1),
                ]),
              })
            );
          });
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      imgUrl: new FormControl(imgUrl, Validators.required),
      description: new FormControl(description),
      ingredients,
    });
  }

  get controls() {
    // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    // const form = this.recipeForm;
    // const name = form.value['name'];
    // const description = form.value['description'];
    // const imgUrl = form.value['imgUrl'];
    // const ingredients = form.value['ingredients'];

    if (this.isInEditMode) {
      // const newRecipe = new Recipe(this.recipeId, name, description, imgUrl, ingredients);
      const newRecipe: Recipe = { id: this.recipeId, ...this.recipeForm.value };
      this.recipesService.updateRecipe(newRecipe);
      this.router.navigate(['../'], { relativeTo: this.route });
    } else {
      const id = uuid.v4();
      const newRecipe: Recipe = { id, ...this.recipeForm.value };
      this.recipesService.addRecipe(newRecipe);
      this.router.navigate(['../', id], { relativeTo: this.route });
    }
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.min(1)]),
      })
    );
  }

  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  deleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
    // .clear() removes all controls
  }
}

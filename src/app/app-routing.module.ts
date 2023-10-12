import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RecipeDetailsStartComponent } from './recipe-details-start/recipe-details-start.component';
import { RecipeDetailsComponent } from './recipes-feature/recipe-details/recipe-details.component';
import { RecipeFormComponent } from './recipes-feature/recipe-form/recipe-form.component';
import { RecipesComponent } from './recipes-feature/recipes/recipes.component';
import { RecipesResolverGuard } from './recipes-feature/services/recipes-resolver.service';
import { ShoppingListComponent } from './shopping-feature/shopping-list/shopping-list.component';
import { authGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full',
  },
  {
    path: 'recipes',
    canActivate: [authGuard],
    component: RecipesComponent,
    resolve: { recipes: RecipesResolverGuard },
    children: [
      { path: '', component: RecipeDetailsStartComponent },
      { path: 'new', component: RecipeFormComponent },
      {
        path: ':recipeId',
        component: RecipeDetailsComponent,
        resolve: { recipes: RecipesResolverGuard },
      },
      {
        path: ':recipeId/edit',
        component: RecipeFormComponent,
        resolve: { recipes: RecipesResolverGuard },
      },
    ],
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

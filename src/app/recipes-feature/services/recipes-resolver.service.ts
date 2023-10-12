import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { RecipeService } from './recipe.service';
import { Recipe } from '../recipe.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Injectable({
  providedIn: 'root'
})
class RecipesResolverService {

  constructor(private dataStorageService: DataStorageService, private recipeService:RecipeService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const recipes = this.recipeService.getRecipes()
    if(!recipes.length){
      return this.dataStorageService.getRecipes()
    } else{
      return recipes
    }
  }
}

export const RecipesResolverGuard: ResolveFn<Recipe[]> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot)=> inject(RecipesResolverService).resolve(route, state)
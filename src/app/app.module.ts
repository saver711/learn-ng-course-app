import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { BasicHighlightDirective } from './directives/basic-highlight.directive';
import { BetterHighlightDirective } from './directives/better-highlight.directive';
import { ToggleClassDirective } from './directives/toggle-class.directive';
import { UnlessDirective } from './directives/unless.directive';
import { HeaderComponent } from './header/header.component';
import { RecipeDetailsStartComponent } from './recipe-details-start/recipe-details-start.component';
import { RecipeDetailsComponent } from './recipes-feature/recipe-details/recipe-details.component';
import { RecipeFormComponent } from './recipes-feature/recipe-form/recipe-form.component';
import { RecipeItemComponent } from './recipes-feature/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipes-feature/recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes-feature/recipes/recipes.component';
import { ShoppingEditComponent } from './shopping-feature/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-feature/shopping-list/shopping-list.component';
import { ButtonComponent } from './ui/button/button.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeListComponent,
    RecipesComponent,
    RecipeDetailsComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    ButtonComponent,
    BasicHighlightDirective,
    BetterHighlightDirective,
    UnlessDirective,
    ToggleClassDirective,
    RecipeDetailsStartComponent,
    RecipeFormComponent,
    AuthComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule,HttpClientModule, AppRoutingModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { Component, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { NgForm } from '@angular/forms';
import * as uuid from 'uuid';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styles: [],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  constructor(private shoppingListService: ShoppingListService) {}
  subscription!: Subscription;
  inEditMode = false;
  allowClear = false;
  // editingItemID!: string;
  editingItem: Ingredient | undefined;

  @ViewChild('shoppingForm', { static: false }) shoppingForm!: NgForm;

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startEditing.subscribe(
      (id) => {
        this.inEditMode = true;
        // this.editingItemID = id
        this.editingItem = this.shoppingListService.getIngredient(id);
        this.shoppingForm.setValue({
          name: this.editingItem?.name,
          amount: this.editingItem?.amount,
        });
        this.allowClear = true
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submitHandler(theForm: NgForm) {
    const ingredientName = theForm.value.name;
    const ingredientAmount = theForm.value.amount;
    if (theForm.valid) {
      if (this.inEditMode && this.editingItem) {
        const ing = new Ingredient(
          this.editingItem.id,
          ingredientName,
          ingredientAmount
        );
        this.shoppingListService.editIngredient(ing);
        this.inEditMode = false;
      } else {
        const id = uuid.v4();
        const ing = new Ingredient(id, ingredientName, ingredientAmount);
        this.shoppingListService.addIngredient(ing);
      }
      this.shoppingForm.reset();
    }
  }
  
  clear(){
    this.shoppingForm.reset();
    this.inEditMode = false;
    this.allowClear = false
  }
  
  delete(){
    if(this.editingItem){
      this.shoppingListService.deleteIngredient(this.editingItem.id)
      this.shoppingForm.reset();
      this.inEditMode = false;
      this.allowClear = false
    }
  }
}

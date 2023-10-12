import { Component } from '@angular/core';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: [],
})
export class ShoppingListComponent {
  get ingredients() {
    return this.shoppingListService.ingredients;
  }

  
  constructor(private shoppingListService: ShoppingListService) {}
  onEditItem(id: string){
    this.shoppingListService.startEditing.next(id)
  }
}

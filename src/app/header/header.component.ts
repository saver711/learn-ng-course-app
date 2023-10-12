import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  showDropDown = false;
  showPhoneMenu = false;
  private subscription!: Subscription
  isAuthenticated = false

  constructor(private dataStorageService: DataStorageService, private authService: AuthService){}

  ngOnInit(): void {
    this.subscription = this.authService.user.subscribe({
      next: (user)=>{
        this.isAuthenticated = !!user
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  logout(){
    this.authService.logout()
  }

  menuItems = [
    { route: '/recipes', text: 'Recipes', visible: this.isAuthenticated },
    { route: '/shopping-list', text: 'Shopping list', visible: true },
    { route: '/auth', text: 'Auth', visible: !this.isAuthenticated },
  ];

  toggleDropDown() {
    this.showDropDown = !this.showDropDown;
  }

  togglePhoneMenu() {
    this.showPhoneMenu = !this.showPhoneMenu;
  }

  onSaveData(){
    this.toggleDropDown()
    this.dataStorageService.storeRecipes()
  }
  onFetchData(){
    this.toggleDropDown()
    this.dataStorageService.getRecipes().subscribe()
  }
}

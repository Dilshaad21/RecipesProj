import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';
import PouchDB from 'pouchdb';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {
  private recipes: Recipe[];
  // private db;
  constructor(private recipesService: RecipesService) {}

  ngOnInit() {
    this.recipesService.getAllRecipes().then((res) => {
      this.recipes = res;
    });
  }
}

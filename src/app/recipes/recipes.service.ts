/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import PouchDB from 'pouchdb';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipes: Recipe[] = [];
  private db;
  constructor() {}

  readFile = async () => {
    const contents = await Filesystem.readFile({
      path: 'recipes106911.txt',
      directory: Directory.ExternalStorage,
      encoding: Encoding.ASCII,
    });
    console.log(JSON.parse(contents.data.toString()));
    return JSON.parse(contents.data.toString());
  };

  getAllRecipes = async () => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    console.log('starting');
    await this.readFile().then((res) => {
      // eslint-disable-next-line arrow-body-style
      this.recipes = res.map((obj) => {
        return {
          id: obj.doc.id,
          imageUrl: obj.doc.imageUrl,
          ingredients: obj.doc.ingredients,
          title: obj.doc.title,
        };
      });
    });
    return this.recipes;
  };

  getRecipe(recipeId: string) {
    return { ...this.recipes.find((recipe) => recipe.id === recipeId) };
  }
}

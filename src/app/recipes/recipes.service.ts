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
  private recipes: Recipe[] = [];
  private db;
  // private apiURL = 'http://localhost:5000/recipes';

  constructor(private http: HttpClient) {
    this.db = new PouchDB('recipes');
    // this.db.destroy();
    // this.http.get<Recipe[]>(this.apiURL).subscribe(async (res) => {
    //   await this.db.bulkDocs([...res]);
    // });
  }

  writeToFile = async (res) => {
    await Filesystem.writeFile({
      path: 'docum/recipes44.txt',
      data: JSON.stringify(res),
      directory: Directory.Documents,
      encoding: Encoding.ASCII,
    });
  };

  readJSONFile = async () => {
    const contents = await Filesystem.readFile({
      path: 'docum/recipes44.txt',
      directory: Directory.Documents,
      encoding: Encoding.ASCII,
    });
    return JSON.parse(contents.data.toString());
  };

  getAllRecipes = async () => {
    this.db.post({
      id: 'r34',
      title: 'Any food item title',
      imageUrl: 'Image Url1',
      ingredients: ['Ingredient1', 'Ingredient2'],
    });
    // eslint-disable-next-line @typescript-eslint/naming-convention
    this.db.allDocs({ include_docs: true }, (err, res) => {
      this.writeToFile(res.rows);
    });

    await this.readJSONFile().then((res) => {
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

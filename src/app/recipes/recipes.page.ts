import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';
import PouchDB from 'pouchdb';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {
  recipes: Recipe[];
  private db;
  constructor(private recipesService: RecipesService) {
    this.db = new PouchDB('recipes');
    this.db.destroy();
    this.db.post({
      id: 'r34',
      title: 'Any food item title',
      imageUrl: 'Image Url1',
      ingredients: ['Ingredient1', 'Ingredient2'],
    });
  }

  writeToFile = async (res) => {
    try {
      await Filesystem.writeFile({
        path: 'recipes106911.txt',
        data: JSON.stringify(res),
        directory: Directory.ExternalStorage,
        encoding: Encoding.ASCII,
        recursive: true,
      });
    } catch (err) {
      console.log('Unable to write the file');
    }
  };

  fileWriter = async () => {
    console.log('writer');
    // eslint-disable-next-line @typescript-eslint/naming-convention
    await this.db.allDocs({ include_docs: true }, (err, res) => {
      this.writeToFile(res.rows);
      console.log(res.rows);
    });
  };

  ngOnInit() {
    this.fileWriter();
    // this.setRecipes();
  }
  setRecipes = () => {
    this.recipesService.getAllRecipes().then((res) => {
      this.recipes = res;
    });
  };
}

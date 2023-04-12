import { Component, Input} from '@angular/core';
import { Recipe } from '../../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe!: Recipe;

  constructor(
    private router: Router,
    private route: ActivatedRoute) { }

  onClick() {
    this.router.navigate([this.recipe.id], { relativeTo: this.route })
  }
}

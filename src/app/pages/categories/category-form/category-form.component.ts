import { AfterContentChecked, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';
import { switchMap } from 'rxjs';
import { Toast } from 'ngx-toastr';
import { error } from 'toastr';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {
  //propiedades
  currentAction!: string;
  categoryForm!: FormGroup;
  pageTitle!: string;
  serverErrorMessages: string[] = [];
  subimittingForm: boolean = false;
  categoty: Category = new Category();
  FormBuilder: any;

  //dependencia
  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    formBuilder: FormBuilder
  ) {}

  //metodos
  ngOnInit() {
    this.setcurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  //private Menthods
  private setcurrentAction() {
    if (this.route.snapshot.url[0].path == 'new') this.currentAction = 'new';
    else this.currentAction = 'edit';
  }
  private buildCategoryForm() {
    this.categoryForm = this.FormBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
    });
  }

  private loadCategory() {
    if (this.currentAction == 'edit') {
      this.route.paramMap
        .pipe(
          //@ts-ignore
          switchMap((params) => this.categoryService.getById(+params.get('id')))
        )
        .subscribe(
          (category) => {
            this.categoty = category;
            this.categoryForm.patchValue(category); //binds loaded category data to categoryForm
          },
          (error) => alert('Ocorreu um err no servidor, tente mais tarde')
        );
    }
  }

  private setPageTitle() {
    if (this.currentAction == 'new')
      this.pageTitle = 'Cadastro de Nova Categoria';
    else {
      const categoryName = this.categoty.name || ''
      this.pageTitle = 'Editando Categoria:' + categoryName;
    }
  }
}

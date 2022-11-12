import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { UserService } from 'src/app/services/http/user.service';
import { DialogSevice } from 'src/app/services/loading/dialog';
import { LoadingPanel } from 'src/app/services/loading/loading-panel';
import { MainIngredientService } from '../../../services/http/main-ingredient.service';
import { IMainIngredient } from '../../../models/main-ingredient';
import { IMainIngredientDetailCreate } from '../../../models/main-ingredient-detail-create';
import { FoodService } from '../../../services/http/food.service';
import { IFood } from 'src/app/models/food';
import { MainIngredientDetailService } from 'src/app/services/http/main-ingredient-detail.service';
import { IMainIngredientDetail } from '../../../models/main-ingredient-detail';
import { ThisReceiver } from '@angular/compiler';
import { IFoodCreate } from '../../../models/food-create';
import { MatButton } from '@angular/material/button';
import { IMessage } from '../../../models/message';

@Component({
  selector: 'app-add-food-dialog',
  templateUrl: './add-food-dialog.component.html',
  styleUrls: ['./add-food-dialog.component.scss']
})
export class AddFoodDialogComponent implements OnInit {

  mainIngredientList: IMainIngredient[] = [];
  mainIngredientListChoised: number[] = [];
  isCreate: boolean = true;
  name = new FormControl('', [
    Validators.required,
  ]);
  price = new FormControl('', [
    Validators.required,
  ]);
  file: File | any;
  is_url = new FormControl(true);
  url = new FormControl('');
  file_base64 = new FormControl('');
  imageDraw: string = "";
  allowURL: boolean = true;
  addFoodForm = new FormGroup({
    name: this.name,
    price: this.price,
    is_url: this.is_url,
    file_base64: this.file_base64,
    url: this.url,
  },);
  mainIngredientForm = new FormGroup({});
  private userService: UserService;
  private foodService: FoodService;
  private mainIngredientService: MainIngredientService;
  private mainIngredientDetailService: MainIngredientDetailService;
  private loadingPanel: LoadingPanel;
  private dialogService: DialogSevice;
  constructor(@Inject(MAT_DIALOG_DATA) public foodId: Number, http: HttpClient, dialog: MatDialog, private router: Router) {
    this.userService = new UserService(http);
    this.foodService = new FoodService(http);
    this.mainIngredientDetailService = new MainIngredientDetailService(http);
    this.mainIngredientService = new MainIngredientService(http);
    this.loadingPanel = new LoadingPanel(dialog);
    this.dialogService = new DialogSevice(dialog);
    this.isCreate = this.foodId == 0;
  }
  ngOnInit(): void {
    this.getAllMainIngredient();
    if (!this.isCreate) {
      this.getFoodById(this.foodId);
    }
  }
  getFoodById(foodId: Number) {
    this.foodService.getById(foodId).subscribe((food: IFood | any) => {
      this.addFoodForm.setValue({ name: food.name, price: food.price, is_url: true, file_base64: '', url: food.image_url });
      this.imageDraw = food.image_url;
      this.mainIngredientDetailService.getList(foodId).subscribe((mainIngredientDetailList: IMainIngredientDetail[] | any) => {
        mainIngredientDetailList.forEach((element: IMainIngredientDetail) => {
          let index = this.mainIngredientList.findIndex(o => o.name === element.name);
          if (!this.mainIngredientListChoised.includes(index)) {
            this.mainIngredientListChoised.push(index);
            this.mainIngredientForm.addControl(
              this.mainIngredientList[index].name.replace(" ", "").toLowerCase() + "_id", new FormControl(this.mainIngredientList[index].id, [Validators.required])
            );
            this.mainIngredientForm.addControl(
              this.mainIngredientList[index].name.replace(" ", "").toLowerCase() + "_quantity", new FormControl(element.quantity, [Validators.required])
            )
            this.mainIngredientForm.addControl(
              this.mainIngredientList[index].name.replace(" ", "").toLowerCase() + "_unit", new FormControl(element.unit, [Validators.required])
            );
          }
        });
      })
    })
  }
  onSubmit(exitButton: MatButton) {
    let drawValue = this.mainIngredientForm.value;
    let valueList = Object.values(drawValue);
    let mainIngredientList: IMainIngredientDetailCreate[] = [];
    for (let i = 0; i < valueList.length; i += 3) {
      let mainIngredient: IMainIngredientDetailCreate = {
        food_id: this.foodId,
        main_ingredient_id: <Number>valueList[i],
        quantity: <Number>valueList[i + 1],
        unit: <String>valueList[i + 2],
      }
      mainIngredientList.push(mainIngredient);
    }
    if (this.foodId == 0) {
      let data = this.addFoodForm.value;
      let food: IFoodCreate = {
        name: <string>data.name,
        price: <Number>parseInt(<string>data.price),
        url: <string>data.url,
        file_base64: <string>data.file_base64,
        is_url: data.is_url ? "true" : "false",
      }
      let promise = new Promise((resolveOuter) => {
        this.foodService.createFood(food).subscribe((food: IFood | any) => {
          mainIngredientList.forEach((mainIngredientiitem: IMainIngredientDetailCreate) => {
            mainIngredientiitem.food_id = food.id;
            resolveOuter(
              this.mainIngredientDetailService.addMainIngredientDetail(mainIngredientiitem).subscribe()
            );
          });
        });
      });

      promise.then(() => {
        let message: IMessage = {
          message: "Food is created!",
          type_message: "success_dialog"
        }
        this.dialogService.show(message);
        exitButton._elementRef.nativeElement.click();
      });
    } else {
      let data = this.addFoodForm.value;
      let food: IFoodCreate = {
        name: <string>data.name,
        price: <Number>parseInt(<string>data.price),
        url: <string>data.url,
        file_base64: <string>data.file_base64,
        is_url: data.is_url ? "true" : "false",
      }
      let promise = new Promise((resolveOuter) => {
        this.foodService.updateFood(this.foodId, food).subscribe();
        this.mainIngredientDetailService.deteleAllMainIngredientdDetailOfFood(this.foodId).subscribe((result: any) => {
          mainIngredientList.forEach((mainIngredientiitem: IMainIngredientDetailCreate) => {
            resolveOuter(
              this.mainIngredientDetailService.addMainIngredientDetail(mainIngredientiitem).subscribe()
            );
          });
        });
      });
      promise.then(() => {
        let message: IMessage = {
          message: "Food is updated!",
          type_message: "success_dialog"
        }
        this.dialogService.show(message);
        exitButton._elementRef.nativeElement.click();
      });

    }

  }
  focusInputFile(fileTag: any) {
    fileTag.click();
  }
  showImage(fileTag: any) {
    let fileList: FileList = fileTag.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
      this.file_base64.setValue(this.file.name);
      var reader = new FileReader();
      reader.onload = () => {
        this.imageDraw = reader.result as string;
      }
      reader.readAsDataURL(this.file);
    } else {
      this.file = null;
      this.file_base64.setValue('');
      this.imageDraw = "";
    }
  }
  async allowUseURL() {
    if (this.is_url.value) {
      this.imageDraw = <string>this.url.value;
    } else {
      if (this.file != null) {
        var reader = new FileReader();
        reader.onload = () => {
          this.imageDraw = reader.result as string;
        }
        reader.readAsDataURL(this.file);
      } else {
        this.imageDraw = '';
      }
    }
    this.allowURL = <boolean>this.is_url.value;
  }
  generateImage() {
    this.imageDraw = <string>this.url.value;
  }
  getAllMainIngredient() {
    this.mainIngredientService.getAll().subscribe((mainIngredientList: IMainIngredient[] | any) => {
      this.mainIngredientList = mainIngredientList;
    })
  }
  choiseMainIngredient(value: number) {
    if (!this.mainIngredientListChoised.includes(value)) {
      this.mainIngredientListChoised.push(value);
      this.mainIngredientForm.addControl(
        this.mainIngredientList[value].name.replace(" ", "").toLowerCase() + "_id", new FormControl(this.mainIngredientList[value].id, [Validators.required])
      );
      this.mainIngredientForm.addControl(
        this.mainIngredientList[value].name.replace(" ", "").toLowerCase() + "_quantity", new FormControl('', [Validators.required])
      )
      this.mainIngredientForm.addControl(
        this.mainIngredientList[value].name.replace(" ", "").toLowerCase() + "_unit", new FormControl('', [Validators.required])
      );
    }
  }
  getNameOfMainIngredient(index: number) {
    return this.mainIngredientList[index].name || '';
  }
  removeChoise(value: number) {
    let index = this.mainIngredientListChoised.indexOf(value);
    if (index > -1) {
      this.mainIngredientListChoised.splice(index, 1);
      this.mainIngredientForm.removeControl(this.mainIngredientList[value].name.replace(" ", "").toLowerCase() + "_id");
      this.mainIngredientForm.removeControl(this.mainIngredientList[value].name.replace(" ", "").toLowerCase() + "_quantity");
      this.mainIngredientForm.removeControl(this.mainIngredientList[value].name.replace(" ", "").toLowerCase() + "_unit");
    }
  }
}

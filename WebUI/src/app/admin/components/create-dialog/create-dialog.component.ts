import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogSevice } from 'src/app/services/loading/dialog';
import { LoadingPanel } from 'src/app/services/loading/loading-panel';
import { TableService } from '../../../services/http/table.service';
import { MainIngredientService } from '../../../services/http/main-ingredient.service';
import { TypePartyService } from '../../../services/http/type-of-party.service';
import { IMainIngredient } from '../../../models/main-ingredient';
import { ITable } from '../../../models/table';
import { ITypeParty } from '../../../models/type-party';
import { IMainIngredientCreate } from '../../../models/main-ingredient-create';
import { IMessage } from 'src/app/models/message';
import { ITableCreate } from '../../../models/table-create';
import { ITypePartyCreate } from '../../../models/type-party-create';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {

  name = new FormControl('', [
    Validators.required,
  ]);
  number_of_seat = new FormControl(1, [
    Validators.required,
    Validators.min(1),
  ]);
  createForm = new FormGroup({
    name: this.name,
    number_of_seat: this.number_of_seat,
  },);
  private tableService: TableService;
  private mainIngredientService: MainIngredientService;
  private typePartyService: TypePartyService;
  private loadingPanel: LoadingPanel;
  private dialogService: DialogSevice;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, http: HttpClient, dialog: MatDialog, private router: Router) {
    this.tableService = new TableService(http);
    this.mainIngredientService = new MainIngredientService(http);
    this.typePartyService = new TypePartyService(http);
    this.loadingPanel = new LoadingPanel(dialog);
    this.dialogService = new DialogSevice(dialog);
  }
  ngOnInit(): void {
    if (this.data.id > 0) {
      if (this.data.for == "ingredient") {
        this.getIngredient();
      } else if (this.data.for == "table") {
        this.getTable();
      } else if (this.data.for == "type-party") {
        this.getTypeParty();
      }
    } else {
      if (this.data.for == "table") {
        this.createForm.setValue({ name: '', number_of_seat: 0 });
      }
    }
  }
  getTable() {
    this.tableService.getTableInfo(this.data.id).subscribe((table: ITable) => {
      this.createForm.setValue({ name: <string>table.name, number_of_seat: <number>table.number_of_seat });
    })
  }
  getTypeParty() {
    this.typePartyService.getTypePartyInfo(this.data.id).subscribe((typeParty: ITypeParty) => {
      this.createForm.setValue({ name: <string>typeParty.name, number_of_seat: 1 });
    })
  }
  getIngredient() {
    this.mainIngredientService.getById(this.data.id).subscribe((mainIngredient: IMainIngredient) => {
      this.createForm.setValue({ name: <string>mainIngredient.name, number_of_seat: 1 });
    })
  }
  onSubmit(button: MatButton) {
    this.loadingPanel.show();
    if (this.data.id > 0) {
      if (this.data.for == "ingredient") {
        let mainIngredientData: IMainIngredientCreate = {
          name: <string>this.createForm.value.name
        }
        this.mainIngredientService.updateMainIngredient(this.data.id, mainIngredientData).subscribe((message: IMessage) => {
          this.loadingPanel.hide();
          this.dialogService.show(message);
          button._elementRef.nativeElement.click();
        });
      } else if (this.data.for == "table") {
        let table: ITableCreate = {
          name: <string>this.createForm.value.name,
          number_of_seat: <number>this.createForm.value.number_of_seat,
        }
        this.tableService.updateTable(this.data.id, table).subscribe((message: IMessage) => {
          this.loadingPanel.hide();
          this.dialogService.show(message);
          button._elementRef.nativeElement.click();
        });
      } else if (this.data.for == "type-party") {
        let typeParty: ITypePartyCreate = {
          name: <string>this.createForm.value.name
        }
        this.typePartyService.updateTypeParty(this.data.id, typeParty).subscribe((message: IMessage) => {
          this.loadingPanel.hide();
          this.dialogService.show(message);
          button._elementRef.nativeElement.click();
        });
      }
    } else {
      if (this.data.for == "ingredient") {
        let mainIngredientData: IMainIngredientCreate = {
          name: <string>this.createForm.value.name
        }
        this.mainIngredientService.createMainIngredient(mainIngredientData).subscribe((message: IMessage) => {
          this.loadingPanel.hide();
          this.dialogService.show(message);
          button._elementRef.nativeElement.click();
        });
      } else if (this.data.for == "table") {
        let table: ITableCreate = {
          name: <string>this.createForm.value.name,
          number_of_seat: <number>this.createForm.value.number_of_seat,
        }
        this.tableService.addTable(table).subscribe((message: IMessage) => {
          this.loadingPanel.hide();
          this.dialogService.show(message);
          button._elementRef.nativeElement.click();
        });
      } else if (this.data.for == "type-party") {
        let typeParty: ITypePartyCreate = {
          name: <string>this.createForm.value.name
        }
        this.typePartyService.createTypeParty(typeParty).subscribe((message: IMessage) => {
          this.loadingPanel.hide();
          this.dialogService.show(message);
          button._elementRef.nativeElement.click();
        });
      }
    }
  }

}

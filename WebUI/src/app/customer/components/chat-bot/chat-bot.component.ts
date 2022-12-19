import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IFood } from 'src/app/models/food';
import { IRasaResponse } from 'src/app/models/rasa-response';
import { FoodService } from 'src/app/services/http/food.service';
import { MainIngredientService } from 'src/app/services/http/main-ingredient.service';
import { RasaService } from 'src/app/services/http/rasa.service';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss'],
})
export class ChatBotComponent implements OnInit {
  chatHistory: String[] = [];

  private rasaService: RasaService;
  private foodService: FoodService;
  private mainIngredientService: MainIngredientService;

  constructor(http: HttpClient) {
    this.rasaService = new RasaService(http);
    this.foodService = new FoodService(http);
    this.mainIngredientService = new MainIngredientService(http);
  }

  ngOnInit(): void {
    this.chatHistory.push(
      'Xin chào! Nhà hàng Thảo Linh rất vui được hỗ trợ bạn.'
    );
  }
  chat(input: any) {
    this.chatHistory.push(input.value);
    this.rasaService
      .chat(input.value)
      .subscribe((messageList: IRasaResponse[]) => {
        if (messageList[0].text == '<expensive-food>') {
          this.foodService
            .getTheMostExpensiveFood()
            .subscribe((food: IFood | any) => {
              let message = 'Món ăn đắt nhất là: ' + food.name;
              this.chatHistory.push(message);
            });
        } else if (messageList[0].text == '<cheapest-food>') {
          this.foodService
            .getTheLeastExpensiveFood()
            .subscribe((food: IFood | any) => {
              let message = 'Món ăn rẻ nhất là: ' + food.name;
              this.chatHistory.push(message);
            });
        } else if (messageList[0].text == '<best-food>') {
          this.foodService
            .getTheMostDeliciousFood()
            .subscribe((food: IFood | any) => {
              let message = 'Món ăn ngon nhất là: ' + food.name;
              this.chatHistory.push(message);
            });
        } else if (messageList[0].text == '<worst-food>') {
          this.foodService
            .getTheLeastDeliciousFood()
            .subscribe((food: IFood | any) => {
              let message = 'Món ăn tệ nhất là: ' + food.name;
              this.chatHistory.push(message);
            });
        } else if (messageList[0].text == '<food-list-with-ingredient>') {
          function removeAccents(str: string) {
            var AccentsMap = [
              'aàảãáạăằẳẵắặâầẩẫấậ',
              'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
              'dđ',
              'DĐ',
              'eèẻẽéẹêềểễếệ',
              'EÈẺẼÉẸÊỀỂỄẾỆ',
              'iìỉĩíị',
              'IÌỈĨÍỊ',
              'oòỏõóọôồổỗốộơờởỡớợ',
              'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
              'uùủũúụưừửữứự',
              'UÙỦŨÚỤƯỪỬỮỨỰ',
              'yỳỷỹýỵ',
              'YỲỶỸÝỴ',
            ];
            for (var i = 0; i < AccentsMap.length; i++) {
              var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
              var char = AccentsMap[i][0];
              str = str.replace(re, char);
            }
            return str;
          }
          let searchText = removeAccents(input.value)
            .toLowerCase()
            .replace('cac', '')
            .replace('la', '')
            .replace('nguyen', '')
            .replace('lieu', '')
            .replace('co', '')
            .replace('mon', '')
            .replace('an', '')
            .replace(/ +/g, ' ')
            .trim();
          this.mainIngredientService
            .getIdWithIngredientName(searchText)
            .subscribe((ingredientId: Number | any) => {
              if (ingredientId > 0) {
                this.foodService
                  .getFoodWithMainIngredientId(ingredientId)
                  .subscribe((foodList: IFood[] | any) => {
                    let words = searchText.split(' ');

                    for (let i = 0; i < words.length; i++) {
                      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
                    }
                    let message =
                      'Danh sách món ăn có nguyên liệu là: ' + words;
                    let promise = new Promise((resolve, reject) => {
                      foodList.forEach((food: IFood, index: number) => {
                        message += '\n  - ';
                        message += food.name;
                      });
                      resolve('');
                    });
                    promise.then(() => {
                      this.chatHistory.push(message);
                      console.log(message);
                    });
                  });
              } else {
                let message = 'Không có nguyên liệu này';
                this.chatHistory.push(message);
              }
            });
        } else if (messageList[0].text == '<price-food>') {
          function removeAccents(str: string) {
            var AccentsMap = [
              'aàảãáạăằẳẵắặâầẩẫấậ',
              'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
              'dđ',
              'DĐ',
              'eèẻẽéẹêềểễếệ',
              'EÈẺẼÉẸÊỀỂỄẾỆ',
              'iìỉĩíị',
              'IÌỈĨÍỊ',
              'oòỏõóọôồổỗốộơờởỡớợ',
              'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
              'uùủũúụưừửữứự',
              'UÙỦŨÚỤƯỪỬỮỨỰ',
              'yỳỷỹýỵ',
              'YỲỶỸÝỴ',
            ];
            for (var i = 0; i < AccentsMap.length; i++) {
              var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
              var char = AccentsMap[i][0];
              str = str.replace(re, char);
            }
            return str;
          }
          let searchText = removeAccents(input.value)
            .toLowerCase()
            .replace('gia', '')
            .replace('mon', '')
            .replace('an', '')
            .replace('cua', '')
            .replace('la', '')
            .replace(/ +/g, ' ')
            .trim();
          this.foodService
            .getIdPriceWithFood(searchText)
            .subscribe((food: IFood | Number | any) => {
              if (food != -1) {
                let message =
                  'Giá của món ăn ' +
                  food.name +
                  ' là: ' +
                  this.formatNumber(food.price);
                this.chatHistory.push(message);
              } else {
                let message = 'Không có món ăn này';
                this.chatHistory.push(message);
              }
            });
        } else {
          this.chatHistory.push(messageList[0].text);
        }

        input.value = '';
      });
  }
  formatNumber(number: Number) {
    return new Intl.NumberFormat('vi', {
      style: 'currency',
      currency: 'VND',
    }).format(number as number);
  }
}

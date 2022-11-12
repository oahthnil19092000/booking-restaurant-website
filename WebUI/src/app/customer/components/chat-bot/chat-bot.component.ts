import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IFood } from 'src/app/models/food';
import { IRasaResponse } from 'src/app/models/rasa-response';
import { FoodService } from 'src/app/services/http/food.service';
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
  constructor(http: HttpClient) {
    this.rasaService = new RasaService(http);
    this.foodService = new FoodService(http);
  }

  ngOnInit(): void {
    this.chatHistory.push(
      'Welcome to Hniloaht Restaurant! How can I help you?'
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
              let message = 'Sản phẩm đắt nhất là : ' + food.name;
              this.chatHistory.push(message);
            });
        } else if (messageList[0].text == '<cheapest-food>') {
          this.foodService
            .getTheLeastExpensiveFood()
            .subscribe((food: IFood | any) => {
              let message = 'Sản phẩm rẻ nhất là : ' + food.name;
              this.chatHistory.push(message);
            });
        } else if (messageList[0].text == '<best-food>') {
          this.foodService
            .getTheMostDeliciousFood()
            .subscribe((food: IFood | any) => {
              let message = 'Sản phẩm ngon nhất là : ' + food.name;
              this.chatHistory.push(message);
            });
        } else if (messageList[0].text == '<worst-food>') {
          this.foodService
            .getTheLeastDeliciousFood()
            .subscribe((food: IFood | any) => {
              let message = 'Sản phẩm tệ nhất là : ' + food.name;
              this.chatHistory.push(message);
            });
        } else {
          this.chatHistory.push(messageList[0].text);
        }

        input.value = '';
      });
  }
}

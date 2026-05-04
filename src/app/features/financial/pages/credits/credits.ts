import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.html'
})
export class Credits implements OnInit {

  financialData: any[] = [];

  ngOnInit(): void {
    fetch('http://localhost:5102/financial')
      .then(res => res.json())
      .then(data => {
        this.financialData = data;
      });
  }
}
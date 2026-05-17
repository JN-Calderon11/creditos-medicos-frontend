import { Component, input, output } from '@angular/core';
import { BenefitCard as Benefit } from '../../interfaces/medical.interface';
import { BenefitCard } from '../benefit-card/benefit-card';

@Component({
  selector: 'app-benefit-list',
  imports: [BenefitCard],
  templateUrl: './benefit-list.html'
})
export class BenefitList {
  benefits = input.required<Benefit[]>();
  remove = output<number>();
  edit = output<number>();
}
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { BenefitCard as Benefit } from '../../interfaces/medical.interface';

@Component({
  selector: 'app-benefit-card',
  imports: [],
  templateUrl: './benefit-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BenefitCard {
  benefit = input.required<Benefit>();
  remove = output<void>();
  edit = output<void>();
}
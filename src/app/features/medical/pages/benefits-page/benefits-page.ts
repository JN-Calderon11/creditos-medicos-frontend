import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BenefitsService } from '../../services/benefits.service';
import { BenefitCard as Benefit } from '../../interfaces/medical.interface';
import { BenefitList } from '../../components/benefit-list/benefit-list';
import { AddBenefit } from '../../components/add-benefit/add-benefit';
import { EditBenefit } from '../../components/edit-benefit/edit-benefit';

@Component({
  selector: 'app-benefits-page',
  imports: [BenefitList],            // AddBenefit/EditBenefit NO van acá (los abre el dialog)
  templateUrl: './benefits-page.html',
  styleUrl: './benefits-page.css',
})
export class BenefitsPage {
  private benefitsService = inject(BenefitsService);
  private dialog = inject(MatDialog);

  benefits = this.benefitsService.benefits;

  openAdd() {
    const ref = this.dialog.open(AddBenefit, { width: '500px' });
    ref.afterClosed().subscribe((plan?: Benefit) => {
      if (plan) this.benefitsService.addBenefit(plan);
    });
  }

  openEdit(index: number) {
    const ref = this.dialog.open(EditBenefit, {
      width: '500px',
      data: this.benefits()[index],   // le pasamos el beneficio a editar
    });
    ref.afterClosed().subscribe((plan?: Benefit) => {
      if (plan) this.benefitsService.updateBenefit(index, plan);
    });
  }

  onRemove(index: number) {
    this.benefitsService.removeBenefit(index);
  }
}
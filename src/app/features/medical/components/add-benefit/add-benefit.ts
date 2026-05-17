import { Component, inject, signal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BenefitCard } from '../../interfaces/medical.interface';
import { Include } from '../include/include';

@Component({
  selector: 'app-add-benefit',
  templateUrl: './add-benefit.html',
  imports: [Include]
})
export class AddBenefit {
  private dialogRef = inject(MatDialogRef<AddBenefit>);

  plan = signal<BenefitCard>({ title: '', provider: '', price: 0, coverage: '', includes: [] });

  addPlan() {
    const c = this.plan();
    if (!c.title || !c.provider || !c.price || !c.coverage || c.price <= 0 || c.price > 10000) return;
    this.dialogRef.close(c);          // devuelve el plan a la página
  }

  cancel() {
    this.dialogRef.close();           // cierra sin devolver nada
  }
}
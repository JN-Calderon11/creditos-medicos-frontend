import { Component, inject, signal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BenefitCard } from '../../interfaces/medical.interface';
import { Include } from '../include/include';

@Component({
  selector: 'app-edit-benefit',
  templateUrl: './edit-benefit.html',
  imports: [Include]
})
export class EditBenefit {
  private dialogRef = inject(MatDialogRef<EditBenefit>);
  private data = inject<BenefitCard>(MAT_DIALOG_DATA); 

  plan = signal<BenefitCard>({ ...this.data, includes: [...this.data.includes] });

  savePlan() {
    const c = this.plan();
    if (!c.title || !c.provider || !c.price || !c.coverage || c.price <= 0 || c.price > 10000) return;
    this.dialogRef.close(c);
  }

  cancel() {
    this.dialogRef.close();
  }
}
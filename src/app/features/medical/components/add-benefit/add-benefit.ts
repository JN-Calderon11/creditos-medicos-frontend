import { Component, inject, signal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BenefitCard } from '../../interfaces/medical.interface';
import { Include } from '../include/include';

@Component({
  selector: 'app-add-benefit',
  templateUrl: './add-benefit.html',
  imports: [Include],
  styles: [`
    :host {
      display: block;
      background: #ffffff;
      border-radius: 20px;
      overflow: hidden;
      --p: #0E5B53;
      --mint: #CDE8E4;
      --mintsoft: #E7F3F1;
      --muted: #6B7785;
      --border: #EDEDE0;
    }

    .benefit-modal {
      display: flex;
      flex-direction: column;
      max-height: 85vh;
      width: 100%;
      background: #ffffff;
    }

    .benefit-modal__header {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 22px 26px;
      background: linear-gradient(135deg, var(--mintsoft) 0%, #ffffff 100%);
      border-bottom: 1px solid var(--border);
    }
    .benefit-modal__icon {
      width: 52px;
      height: 52px;
      border-radius: 14px;
      background: var(--p);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      box-shadow: 0 8px 18px rgba(14, 91, 83, 0.25);
    }
    .benefit-modal__title { flex: 1; }
    .benefit-modal__title h3 {
      margin: 0;
      font-size: 1.15rem;
      font-weight: 700;
      color: #0f172a;
    }
    .benefit-modal__title p {
      margin: 2px 0 0;
      font-size: 0.85rem;
      color: var(--muted);
    }
    .benefit-modal__close {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      border: 1px solid var(--border);
      background: #ffffff;
      color: var(--muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.2s;
    }
    .benefit-modal__close:hover {
      background: var(--mintsoft);
      color: var(--p);
      border-color: var(--mint);
    }

    .benefit-modal__body {
      padding: 24px 26px;
      overflow-y: auto;
      background: #ffffff;
    }

    .benefit-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    @media (max-width: 560px) {
      .benefit-grid { grid-template-columns: 1fr; }
    }

    .benefit-field label {
      display: block;
      font-size: 0.82rem;
      font-weight: 600;
      color: #0f172a;
      margin-bottom: 6px;
    }
    .benefit-input {
      display: flex;
      align-items: center;
      height: 46px;
      border: 1px solid var(--border);
      border-radius: 12px;
      background: #fff;
      overflow: hidden;
      transition: 0.2s;
    }
    .benefit-input:focus-within {
      border-color: var(--p);
      box-shadow: 0 0 0 4px rgba(14, 91, 83, 0.12);
    }
    .benefit-input__icon {
      width: 44px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--mintsoft);
      color: var(--p);
      font-size: 14px;
      border-right: 1px solid var(--border);
    }
    .benefit-input input {
      flex: 1;
      height: 100%;
      border: none;
      outline: none;
      padding: 0 14px;
      font-size: 0.92rem;
      color: #334155;
      background: transparent;
    }
    .benefit-input input::placeholder { color: #94a3b8; }

    .benefit-section {
      margin-top: 22px;
      padding-top: 18px;
      border-top: 1px dashed var(--border);
    }
    .benefit-section__title {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--p);
      font-weight: 600;
      font-size: 0.9rem;
      margin-bottom: 12px;
    }

    .benefit-modal__footer {
      display: flex;
      gap: 10px;
      padding: 16px 26px;
      border-top: 1px solid var(--border);
      background: #f8fafc;
    }
    .benefit-btn {
      flex: 1;
      padding: 12px 16px;
      border-radius: 12px;
      border: none;
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: 0.2s;
    }
    .benefit-btn--ghost {
      background: #ffffff;
      color: var(--muted);
      border: 1px solid var(--border);
    }
    .benefit-btn--ghost:hover {
      background: var(--mintsoft);
      color: var(--p);
      border-color: var(--mint);
    }
    .benefit-btn--primary {
      background: var(--p);
      color: #fff;
      box-shadow: 0 8px 18px rgba(14, 91, 83, 0.25);
    }
    .benefit-btn--primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 12px 22px rgba(14, 91, 83, 0.3);
    }
  `]
})
export class AddBenefit {
  private dialogRef = inject(MatDialogRef<AddBenefit>);

  plan = signal<BenefitCard>({ title: '', provider: '', price: 0, coverage: '', includes: [] });

  addPlan() {
    const c = this.plan();
    if (!c.title || !c.provider || !c.price || !c.coverage || c.price <= 0 || c.price > 10000) return;
    this.dialogRef.close(c);
  }

  cancel() {
    this.dialogRef.close();
  }
}

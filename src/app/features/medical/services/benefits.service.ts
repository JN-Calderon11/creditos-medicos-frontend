// benefits.service.ts
import { Injectable, signal } from '@angular/core';
import { BenefitCard } from '../interfaces/medical.interface';

@Injectable({ providedIn: 'root' })
export class BenefitsService {

    private _benefits = signal<BenefitCard[]>([]);
    readonly benefits = this._benefits.asReadonly();

    addBenefit(benefit: BenefitCard) {
        this._benefits.update(list => [...list, benefit]);
    }

    removeBenefit(index: number) {
        this._benefits.update(list => list.filter((_, i) => i !== index));
    }

    updateBenefit(index: number, benefit: BenefitCard) {
        this._benefits.update(list =>
            list.map((b, i) => (i === index ? benefit : b))
        );
    }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-credits',
  imports: [CommonModule, FormsModule],
  templateUrl: './credits.html',
  styleUrl: './credits.css'
})
export class Credits {

  financialData: any[] = [];

  showModal = false;
  editMode = false;
  editingId: number | null = null;

  newCredit = {
    usuario: '',
    categoria: '',
    fecha: '',
    monto: '',
    tipo: '',
    estado: '',
    descripcion: ''
  };

  openModal() {
    this.showModal = true;
    this.editMode = false;
  }

  closeModal() {
    this.showModal = false;

    this.newCredit = {
      usuario: '',
      categoria: '',
      fecha: '',
      monto: '',
      tipo: '',
      estado: '',
      descripcion: ''
    };
  }

  saveCredit() {
    if (this.editMode) {
      this.updateCredit();
      return;
    }

    this.financialData.push({
      id: this.financialData.length + 1,
      ...this.newCredit
    });

    this.closeModal();
  }

  editCredit(item: any) {
    this.editMode = true;
    this.showModal = true;
    this.editingId = item.id;

    this.newCredit = { ...item };
  }

  updateCredit() {
    const index = this.financialData.findIndex(
      x => x.id === this.editingId
    );

    if (index !== -1) {
      this.financialData[index] = {
        id: this.editingId,
        ...this.newCredit
      };
    }

    this.closeModal();
  }

  deleteCredit(id: number) {
    this.financialData =
      this.financialData.filter(x => x.id !== id);
  }
}
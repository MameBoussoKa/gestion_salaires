import PDFDocument from 'pdfkit';
import type { Payment } from '@prisma/client';

export class PDFService {
  // 🔹 Générer un reçu PDF pour un paiement
  async generatePaymentReceipt(payment: Payment & {
    payslip: {
      employee: { nomComplet: string; poste: string };
      payRun: { dateDebut: Date; dateFin: Date; entreprise: { nom: string; devise: string } };
      brut: number;
      deductions: number;
      net: number;
      payments: { montant: number }[];
    };
    createdBy?: { nom: string };
  }): Promise<Buffer> {
    return new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'A4',
        margin: 50
      });

      const buffers: Buffer[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });

      // En-tête
      doc.fontSize(20).text('REÇU DE PAIEMENT', { align: 'center' });
      doc.moveDown();

      // Informations de l'entreprise
      doc.fontSize(12).text(`Entreprise: ${payment.payslip.payRun.entreprise.nom}`, { align: 'left' });
      doc.text(`Période: ${payment.payslip.payRun.dateDebut.toLocaleDateString()} - ${payment.payslip.payRun.dateFin.toLocaleDateString()}`);
      doc.moveDown();

      // Informations de l'employé
      doc.text(`Employé: ${payment.payslip.employee.nomComplet}`);
      doc.text(`Poste: ${payment.payslip.employee.poste}`);
      doc.moveDown();

      // Détails du paiement
      doc.text(`Montant payé: ${payment.montant} ${payment.payslip.payRun.entreprise.devise}`);
      doc.text(`Mode de paiement: ${this.formatPaymentMode(payment.modePaiement)}`);
      if (payment.reference) {
        doc.text(`Référence: ${payment.reference}`);
      }
      doc.text(`Date du paiement: ${payment.date.toLocaleDateString()}`);
      doc.moveDown();

      // Résumé du bulletin
      doc.text('Résumé du bulletin de paie:');
      doc.text(`Salaire brut: ${payment.payslip.brut} ${payment.payslip.payRun.entreprise.devise}`);
      doc.text(`Déductions: ${payment.payslip.deductions} ${payment.payslip.payRun.entreprise.devise}`);
      doc.text(`Salaire net: ${payment.payslip.net} ${payment.payslip.payRun.entreprise.devise}`);

      // Calculer le solde restant
      const totalPaid = payment.payslip.payments?.reduce((sum, p) => sum + p.montant, 0) || 0;
      const remaining = payment.payslip.net - totalPaid;
      doc.text(`Solde restant: ${remaining} ${payment.payslip.payRun.entreprise.devise}`);
      doc.moveDown();

      // Signature
      if (payment.createdBy) {
        doc.text(`Paiement enregistré par: ${payment.createdBy.nom}`);
      }
      doc.text(`Date d'émission: ${new Date().toLocaleDateString()}`);

      doc.end();
    });
  }

  private formatPaymentMode(mode: string): string {
    const modes: { [key: string]: string } = {
      ESPECES: 'Espèces',
      VIREMENT_BANCAIRE: 'Virement bancaire',
      ORANGE_MONEY: 'Orange Money',
      WAVE: 'Wave'
    };
    return modes[mode] || mode;
  }
}
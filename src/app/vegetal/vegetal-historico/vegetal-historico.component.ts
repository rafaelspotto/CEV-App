import { Component, Inject, OnInit } from '@angular/core';
import { SaidaVegetal } from 'src/app/saida/saidaVegetal';
import { VegetalService } from 'src/app/vegetal.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-vegetal-historico',
  templateUrl: './vegetal-historico.component.html',
  styleUrls: ['./vegetal-historico.component.css']
})
export class VegetalHistoricoComponent implements OnInit {

  listaSaidaVegetal: SaidaVegetal[] = [];
  total:number;
  id:number;

  constructor(
    private service: VegetalService,
    private dialogRef: MatDialogRef<VegetalHistoricoComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.id = data.id;
  }

  ngOnInit(): void {
    this.service
            .getHistoricoVegetal(this.id)
            .subscribe(
              response => {
                this.listaSaidaVegetal = response
                this.total = this.calculaTotal();
              }
            )
  }

  calculaTotal() {
    return this.listaSaidaVegetal.reduce((total, item) => Number(item.quantidade) + total,0)
  }

  close() {
    this.dialogRef.close();
}

}

import { AgendamentoService } from './../../service/agendamento.service';
import { Agendamento } from './../../agendamentos/shared/agendamento';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  formAgendamento: FormGroup;
  agendamentos: Agendamento[] = [];
  private unsubscribe$: Subject<any> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private agendamentoService: AgendamentoService,
    private snackBar: MatSnackBar) { }

  estacoesTrabalho = [
    { id: 3, value: 'Est 1'},
    { id: 2, value: 'Est 2'},
    { id: 3, value: 'Est 3'},
  ]

  ngOnInit(): void {
    this.createForm(new Agendamento());
    this.agendamentoService.get()
      .pipe( takeUntil(this.unsubscribe$) )
      .subscribe((agendas) => this.agendamentos = agendas);
  }

  createForm(agendamento: Agendamento) {
    this.formAgendamento = this.formBuilder.group({
      _id: [agendamento._id],
      nome: [agendamento.nome, [Validators.required]],
      escritorio: [agendamento.escritorio],
      data: [agendamento.data],
      estacaoTrabalho: [agendamento.estacaoTrabalho]
    })
  }

  onSubmit() {
    console.log(this.formAgendamento.value);
    this.agendamentoService.add(this.formAgendamento.value)
    .subscribe(
      (agenda) => {
        console.log(agenda);
        this.notify('Adicionado');
      },
      (err) => console.error(err))
    this.formAgendamento.reset(new Agendamento());
  }

  notify(msg: string) {
    this.snackBar.open(msg, "OK", {duration: 3000});
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

}

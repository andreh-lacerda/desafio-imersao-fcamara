import { Agendamento } from './../../agendamentos/shared/agendamento';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  formAgendamento: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  estacoesTrabalho = [
    { id: 3, value: 'Est 1'},
    { id: 2, value: 'Est 2'},
    { id: 3, value: 'Est 3'},
  ]

  ngOnInit(): void {
    this.createForm(new Agendamento());
  }

  createForm(agendamento: Agendamento) {
    this.formAgendamento = this.formBuilder.group({
      id: [agendamento.$id],
      nome: [agendamento.nome, [Validators.required]],
      escritorio: [agendamento.escritorio],
      dataEscritorio: [agendamento.dataEscritorio],
      estacaoTrabalho: [agendamento.estacaoTrabalho]
    })
  }

  onSubmit() {
    console.log(this.formAgendamento.value);
    this.formAgendamento.reset(new Agendamento());
  }

}

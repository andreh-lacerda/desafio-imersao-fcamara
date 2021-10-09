import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Agendamento } from '../agendamentos/shared/agendamento';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  readonly url = 'http://localhost:9000/agendas';

  private agendamentosSubject$ : BehaviorSubject<Agendamento[]> = new BehaviorSubject<Agendamento[]>(null);
  private loaded : boolean = false;

  constructor(private http: HttpClient) { }

  get(): Observable<Agendamento[]> {
    if (!this.loaded) {
      this.http.get<Agendamento[]>(this.url)
        .pipe( tap((agendas) => console.log(agendas)))
        .subscribe(this.agendamentosSubject$);
      this.loaded = true;
    }
    return this.http.get<Agendamento[]>(this.url);
  }

  add(agenda: Agendamento): Observable<Agendamento> {
    return this.http.post<Agendamento>(this.url, agenda)
      .pipe(
        tap((agdto: Agendamento) => this.agendamentosSubject$.getValue().push(agdto)));
  }
}

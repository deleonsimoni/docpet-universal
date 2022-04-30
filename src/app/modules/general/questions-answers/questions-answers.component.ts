import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EspecialidadeService } from '../../application/services/especialidades.service';
import { PerguntasService } from '../../application/services/perguntas.service';
import { UserService } from '../../application/services/user.service';

@Component({
  selector: 'app-questions-answers',
  templateUrl: './questions-answers.component.html',
  styleUrls: ['./questions-answers.component.css']
})
export class QuestionsAnswersComponent implements OnInit {
  vermais: boolean = false;
  maisResposta: boolean = false;
  public showMaisRespostas = 3;
  public showTotalRespostas = 0;
  public especialidades: any[];
  public especialidadeEscolhida: any = [];
  dashboard;
  request: any = {};
  user;
  perguntas;


  constructor(
    private especialidadeSevice: EspecialidadeService,
    private perguntasService: PerguntasService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private userService: UserService,

  ) { }

  ngOnInit(): void {
    this.listarEspecialidades();
    this.listarDashboard();
    this.listarPerguntas();
    this.user = this.userService.getUser()
  }

  getMais(num) {
    // this.vermais = true;
    var formElement = <HTMLFormElement>document.getElementById('mais' + num);
    formElement.style.display = 'block';
    this.maisResposta = false;
  }

  getMinus(idp) {
    var formElement = <HTMLFormElement>document.getElementById('mais' + idp);
    formElement.style.display = 'none';
    //var scrollPos = $("#card" + idp).offset()?.top;
    //$("body,html").animate({ scrollTop: scrollPos }, "slow");

  }
  getMore(respostas) {

  }

  cadastrar() {

    if (!this.request.pergunta) {
      this.toastrService.warning('Preencha corretamente o campo de pergunta', 'Atenção');
      return;
    }

    if (!this.especialidadeEscolhida) {
      this.toastrService.warning('Escolha a especialidade clicando no item', 'Atenção');
      return;
    }

    if (!this.user) {
      if (!this.request.nome) {
        this.toastrService.warning('Preencha corretamente o campo nome', 'Atenção');
        return;
      }

      if (!this.request.email) {
        this.toastrService.warning('Preencha corretamente o campo email', 'Atenção');
        return;
      }

      if (!this.request.wpp) {
        this.toastrService.warning('Preencha corretamente o campo Whatsapp', 'Atenção');
        return;
      }
    } else {
      this.request.user = this.user.id;
    }

    this.request.especialidade = this.especialidadeEscolhida

    this.spinner.show();

    this.perguntasService.create(this.request).subscribe(
      () => {
        this.spinner.hide();
        this.toastrService.success('Pergunta cadastrada com sucesso', 'Sucesso');
        this.request = {};
      },
      (error) => {
        this.spinner.hide();
        this.toastrService.warning('Ocorreu um erro ao processar a pergunta', 'Erro');
        console.log(error);
      }
    );


  }

  listarEspecialidades() {

    this.especialidadeSevice.getAll()
      .subscribe(
        data => {
          this.especialidades = data;
        },
        error => {
          console.log(error);
        });
  }

  listarPerguntas() {

    this.perguntasService.getAll()
      .subscribe(
        data => {
          this.perguntas = data;
        },
        error => {
          console.log(error);
        });
  }

  listarDashboard() {

    this.perguntasService.getDashboard()
      .subscribe(
        data => {
          this.dashboard = data;
          if (this.dashboard.counts && this.dashboard.counts.totalRespostas) {
            this.dashboard.counts.totalRespostas = this.dashboard.counts.totalRespostas.reduce(function (a, b) {
              return a + b['respostasSize'];
            }, 0);
          }
        },
        error => {
          console.log(error);
        });
  }



}

import { VeterinarioService } from './../../application/services/veterinario.service';
import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { INgxSelectOption } from 'ngx-select-ex';
import { ToastrService } from 'ngx-toastr';
import { CEPService } from './../../application/services/cep.service';
import { DashboardService } from './../../application/services/dashboard.service';
import { EspecialidadeService } from './../../application/services/especialidades.service';
import { EstabelecimentoService } from './../../application/services/estabelecimento.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Globals } from '../../../global';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { AdestradorService } from './../../application/services/adestrador.service';
import { EsteticaService } from './../../application/services/estetica.service';



export interface Doctors {
  id: number;
  doctor_name: string;
  speciality: string;
  Education: string;
  location: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('slickModal1') private slickModal1: SlickCarouselComponent;
  @ViewChild('slickModal2') private slickModal2: SlickCarouselComponent;

  docNameFormated: any;
  doctors: any = [];
  public dadosCadastro: any = [];
  pathImage: any;
  role = "";
  inscrever: boolean = true;
  habilitado = true;
  public especialidades: any[] = [];

  public especialidadesTotal: any[] = [];

  public totalListaEspecialidade: any[] = [];
  public showTotalEspecialidade = 6;

  public places: any[] = [];
  public especialidadeEscolhida: any = [];
  public cidadeEscolhida: any = [];
  public starsRate: any = [];
  isload = false;
  totalStar = 0;
  nome = "";
  email = "";
  totalStarFormated = 0;
  isLikedComment = 0;

  totalLike = 100;
  public ngxDisabled = false;
  autocompleteInput: string = '';
  queryWait: boolean = false;

  constructor(
    private especialidadeSevice: EspecialidadeService,
    private cepService: CEPService,
    private dashboardService: DashboardService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private veterinarioService: VeterinarioService,
    private estabelecimentoService: EstabelecimentoService,
    private adestradorService: AdestradorService,
    private esteticaService: EsteticaService) { }

  ngOnInit(): void {
    this.listarEspecialidades();
    this.docNameFormated = this.formatarParamUrl(this.route.snapshot.params['nome']);
    this.pathImage = "https://vetzco-site.s3.sa-east-1.amazonaws.com/";
    this.getDoctorsDetails();
    this.listarEspecialidadesTotal();
    this.dashboardService.markAccess().subscribe(
      (counts: any) => {
        console.log('access');
      },
      (error) => {
        console.log('erro ao chamar markaccess');
      }
    );
    this.places = [
      { "description": "São Paulo", "placeId": "ChIJ0WGkg4FEzpQRrlsz_whLqZs" },
      { "description": "Rio de Janeiro", "placeId": "ChIJW6AIkVXemwARTtIvZ2xC3FA" },
      { "description": "Brasília", "placeId": "ChIJ1wSIEPI6WpMRVlAUyZAjuj4" },
      { "description": "Salvador", "placeId": "ChIJvS5CUCARFgcRndtzlTaEHPc" },
      { "description": "Fortaleza", "placeId": "ChIJP3hMRj9MxwcRyjdrDArGYUY" },
      { "description": "Belo Horizonte", "placeId": "ChIJMyzPysqQpgARlznSOl55NVs" },
      { "description": "Manaus", "placeId": "ChIJt0d2s8gbbJIRzKll959cSCs" },
      { "description": "Curitiba", "placeId": "ChIJ3bPNUVPj3JQRCejLuqVrL20" },
      { "description": "Recife", "placeId": "ChIJi0DllG8ZqwcRpuO9gvcOgOU" },
      { "description": "Goiânia", "placeId": "ChIJZwjYWL32XpMRjmfSIK0rae8" },
      { "description": "Belém", "placeId": "ChIJ4Wx1hK9hpJIRNUyGFQJUDVc" },
      { "description": "Porto Alegre", "placeId": "ChIJHctqVtKcGZURH-mHn6gRMWA" },
      { "description": "São Luís", "placeId": "ChIJIW1_b_CP9gcRR96jWeQCMZg" },
    ];
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  slides = [
    { id: 1, img: "https://dummyimage.com/350x150/423b42/fff" },
    { id: 2, img: "https://dummyimage.com/350x150/2a2b7a/fff" },
    { id: 3, img: "https://dummyimage.com/350x150/1a2b7a/fff" },
    { id: 4, img: "https://dummyimage.com/350x150/7a2b7a/fff" },
    { id: 5, img: "https://dummyimage.com/350x150/9a2b7a/fff" },
    { id: 6, img: "https://dummyimage.com/350x150/5a2b7a/fff" },
    { id: 6, img: "https://dummyimage.com/350x150/4a2b7a/fff" }
  ];

  onMyClick() {
    // && ($("#role option:selected").text())
    if (((<HTMLInputElement>document.getElementById("nome")).value) && ((<HTMLInputElement>document.getElementById("email")).value)) {
      this.inscrever = false;
      this.nome = this.formataUrlCadastro((<HTMLInputElement>document.getElementById("nome")).value);
      this.email = this.formataUrlCadastro((<HTMLInputElement>document.getElementById("email")).value);
      // this.role = this.formataUrlCadastro($("#role option:selected").text());
      //this.role = document.getElementById("role")["value"];
      this.dadosCadastro.push({ nome: this.nome, email: this.email, role: this.role });

      this.router.navigate(['/registro/' + this.nome + '/' + this.email]);

    } else {
      this.toastr.warning('Preencha o nome, e-mail e tipo', 'Atenção!');
    }
  }

  countScore(doctorReviews: any) {
    let ind = 0;
    let id = 0;
    let rates = [0, 0, 0, 0, 0];
    let total = 0;
    for (let item of doctorReviews) {
      id = item._id;
      //calculate rates
      total = item.reviews.length;
      if (item.reviews.length > 0) {
        for (let review of item.reviews) {
          if (review.score) {
            if (review.score == 1) {
              rates[0] += 1;
            } else if (review.score == 2) {
              rates[1] += 1;
            } else if (review.score == 3) {
              rates[2] += 1;
            } else if (review.score == 4) {
              rates[3] += 1;
            } else if (review.score == 5) {
              rates[4] += 1;
            }
            if (total > 0) {
              this.totalStar = (rates[0] * 1 + rates[1] * 2 + rates[2] * 3 + rates[3] * 4 + rates[4] * 5) / total
              this.totalStarFormated = Math.round(this.totalStar);

              if (this.totalStar >= 5) {
                this.totalStar = 5;
                this.totalStarFormated = 5;
              }
            }

          }

        }


      }
      this.starsRate.push(this.totalStarFormated);
      ind += 1;
    }
  }
  pushDoctorsStar(stars: any, ind: any) {
    this.doctors[ind].push({ star: stars });

  }

  getImageDoctor(doctorDetails: any) {
    return doctorDetails?.img ? doctorDetails.img : 'https://image.freepik.com/vetores-gratis/medico-icone-ou-avatar-em-branco_136162-58.jpg'
  }
  inputTyped(text: string) {
    if (text.length) {

      this.listarCompleto(text.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    } else {
      this.listarEspecialidades();
    }
  }

  searchLocale(text: string) {
    if (text.length > 3) {
      this.cepService.getPlace(text)
        .subscribe(
          data => {
            this.places = data;
          },
          error => {
            console.log(error);
          });
    }

  }
  getDoctorsDetails() {
    this.veterinarioService.getListReviews().subscribe(
      (res) => {
        this.doctors = res;

        this.countScore(this.doctors);

        //this.dtTrigger.next();
      },
      //(error) => (this.errorMessage = <any>error)
    );



  }

  normalizeNome(options: INgxSelectOption[]) {
    let tipo = 0;
    if (options) {
      tipo = options[0].data.type;
      options[0].text = options[0].data.nome;

    }
    if (tipo == 2) {
      //Veterinario
      this.veterinarioService.get(options[0].data._id).subscribe(
        data => {
          const urlFomatada = this.formataUrl(data);
          if (!urlFomatada) {
            this.toastr.warning('Não foi possível efetuar a busca', 'Atenção!');
            console.log("Erro ao efetuar a busca. Nome, Especialidade ou Endereço não encontrado");
            return;
          } else {
            //Globals['DOCTOR_URL'] = urlFomatada;
            (Globals as any).DOCTOR_URL = urlFomatada;
            this.router.navigate([`/doctor/${urlFomatada}`]);
          }
        },
        error => {
          console.log(error);
          this.toastr.warning('Não foi possível efetuar a busca', 'Atenção!');
          return;

        });


    } else if (tipo == 3) {
      //clinica
      this.estabelecimentoService.get(options[0].data._id).subscribe(
        data => {
          const urlFomatada = data.nomeFormated.trim().split(' ').join('-').toLowerCase();
          if (!urlFomatada) {
            this.toastr.warning('Não foi possível efetuar a busca', 'Atenção!');
            console.log("Erro ao efetuar a busca por clínica");
            return;
          } else {
            //@Regina
            //Globals['URL_FORMATADA'] = urlFomatada;
            (Globals as any).URL_FORMATADA = urlFomatada;

            this.router.navigate([`/clinic/${urlFomatada}`]);
          }
        },
        error => {
          console.log(error);
          this.toastr.warning('Não foi possível efetuar a busca', 'Atenção!');
          return;

        });
    } else if (tipo == 4) {
      //adestrador
      this.adestradorService.get(options[0].data._id).subscribe(
        data => {
          const urlFomatada = data.nomeFormated.trim().split(' ').join('-').toLowerCase() + '/' + data.endereco.municipio.trim().split(' ').join('-').toLowerCase();
          if (!urlFomatada) {
            this.toastr.warning('Não foi possível efetuar a busca', 'Atenção!');
            console.log("Erro ao efetuar a busca por adestrador");
            return;
          } else {
            //@Regina
            //Globals['URL_FORMATADA'] = urlFomatada;
            (Globals as any).URL_FORMATADA = urlFomatada;

            this.router.navigate([`/trainer/${urlFomatada}`]);
          }
        },
        error => {
          console.log(error);
          this.toastr.warning('Não foi possível efetuar a busca', 'Atenção!');
          return;

        });
    } else if (tipo == 5) {
      //estetica
      this.esteticaService.get(options[0].data._id).subscribe(
        data => {
          const urlFomatada = data.nomeFormated.trim().split(' ').join('-').toLowerCase() + '/' + data.endereco.municipio.trim().split(' ').join('-').toLowerCase();
          if (!urlFomatada) {
            this.toastr.warning('Não foi possível efetuar a busca', 'Atenção!');
            console.log("Erro ao efetuar a busca por clínica");
            return;
          } else {
            //@Regina
            //Globals['URL_FORMATADA'] = urlFomatada;
            (Globals as any).URL_FORMATADA = urlFomatada;

            this.router.navigate([`/aesthetics/${urlFomatada}`]);
          }
        },
        error => {
          console.log(error);
          this.toastr.warning('Não foi possível efetuar a busca', 'Atenção!');
          return;

        });
    }

  }

  formataUrl(data: any) {
    if (data.nomeFormated && data.especialidades && data.endereco) {
      return (data.nomeFormated.trim().split(' ').join('-') + "/" + data.especialidades[0].nomeFormated.trim().split(' ').join('-') + "/" + data.endereco.municipio.trim().split(' ').join('-')).toLowerCase();

    }
    return "";
  }


  consultar(pesquisa: any) {

    if (this.especialidadeEscolhida?.length == 0) {
      this.toastr.warning('Preencha o campo especialidade!', 'Atenção!');
      return;
    }

    if (this.cidadeEscolhida?.length == 0) {
      this.toastr.warning('Preencha o campo cidade!', 'Atenção!');
      return;
    }

    this.isload = true;
    let filtro: any = this.especialidades.filter(e => e._id == pesquisa)[0];
    let places: any = this.places.filter(p => p.placeId == this.cidadeEscolhida)[0];

    setTimeout(() => {
      if (!filtro.type || filtro.type == 1) {
        this.router.navigate([`/list/${this.formataUrlEspec(filtro.nome, places.description)}`]);
        //Globals['DESC_SEARCH_DOCTOR'] = filtro.nome+ "- "+ places.description;
        (Globals as any).DESC_SEARCH_DOCTOR = filtro.nome + "- " + places.description;

      } else if (filtro.type == 2) {
        //Veterinario
        //Globals['DOCTOR_URL'] = filtro.nome;
        (Globals as any).DOCTOR_URL = filtro.nome;

        this.router.navigate([`/doctor/${filtro.nome}`]);

      } else if (filtro.type == 3) {
        //clinica
        this.router.navigate([`/detail/${filtro.nome}`]);
      }
    }, 3000);

  }

  listarCompleto(query: any) {
    this.especialidades = [];

    this.especialidadeSevice.getCompletedFind(query)
      .subscribe(
        data => {
          data.forEach((item: any) => item.nomeFormated = item['nome'] + ' ' + item['nomeFormated'] + ' ' + this.createEdgeNGrams(item['nomeFormated']));
          this.especialidades = data;
        },
        error => {
          console.log(error);
        });
  }


  createEdgeNGrams(str: any) {
    if (str && str.length > 3) {
      const minGram = 3
      const maxGram = str.length

      return str.split(" ").reduce((ngrams: any, token: any) => {
        if (token.length > minGram) {
          for (let i = minGram; i <= maxGram && i <= token.length; ++i) {
            ngrams = [...ngrams, token.substr(0, i)]
          }
        } else {
          ngrams = [...ngrams, token]
        }
        return ngrams
      }, []).join(" ")
    }

    return str
  }

  listarEspecialidades() {

    this.especialidadeSevice.getAll()
      .subscribe(
        data => {
          this.especialidades = data.data;
        },
        error => {
          console.log(error);
        });
  }
  listarEspecialidadesTotal() {

    this.especialidadeSevice.getAll()
      .subscribe(
        data => {
          this.totalListaEspecialidade = data;
          // console.log(data);
          this.especialidadesTotal = data;
          //this.especialidadesTotal = data.slice(0, this.showTotalEspecialidade);
        },
        error => {
          console.log(error);
        });
  }
  formatarParamUrl(str: any) {
    if (str) {
      return str.trim().split(' ').join('-');
    } else {
      return "";
    }

  }
  slideConfig3 = {
    dots: true,
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  next() {
    this.slickModal1.slickNext();
  }

  prev() {
    this.slickModal1.slickPrev();
  }
  showMoreEspecialidade() {

    this.especialidadesTotal = this.totalListaEspecialidade.slice(0, this.especialidadesTotal.length + this.showTotalEspecialidade);
  }

  showLessEspecialidade() {
    //var scrollPos = document.getElementById("top-scroll").offsetTop;
    var scrollPos = (<HTMLInputElement>document.getElementById("top-scroll")).offsetTop;
    //$("body,html").animate({ scrollTop: scrollPos }, "slow");
    this.especialidadesTotal = this.totalListaEspecialidade.slice(0, this.showTotalEspecialidade);
  }

  slideConfigure = {
    dots: false,
    autoplay: false,
    infinite: true,
    variableWidth: true,
  };
  nextslide() {
    this.slickModal2.slickNext();
  }

  prevslide() {
    this.slickModal2.slickPrev();
  }
  getURLImgEspc(nome: any) {
    return 'assets/img/shapes/' + nome + '.png';
  }



  formataUrlEspec(especialidade: any, municipio: any) {
    if (especialidade && municipio) {
      return (especialidade.normalize('NFD').replace(/[\u0300-\u036f]/g, "").trim().split(' ').join('-') + "/" + municipio.normalize('NFD').replace(/[\u0300-\u036f]/g, "").trim().split(' ').join('-')).toLowerCase();
    }

    return "";
  }
  formataEspec(especialidade: any) {
    if (especialidade) {
      return especialidade.normalize('NFD').replace(/[\u0300-\u036f]/g, "").trim().split(' ').join('_');
    }

    return "";
  }
  formataUrldados(nome: any, especialidade: any, municipio: any) {
    if (nome && especialidade && municipio) {
      return (nome.trim().split(' ').join('-') + "/" + especialidade.normalize('NFD').replace(/[\u0300-\u036f]/g, "").trim().split(' ').join('-') + "/" + municipio.trim().split(' ').join('-')).toLowerCase();
    }

    return "";
  }
  formataUrlCadastro(dado: any) {
    if (dado) {
      return dado.normalize('NFD').replace(/[\u0300-\u036f]/g, "").trim().split(' ').join('-').toLowerCase();
    }

    return "";
  }
  verPerfil(nome: any, especialidade: any, municipio: any) {

    if (nome && especialidade && municipio) {
      var url = (nome.trim().split(' ').join('-') + "/" + especialidade.normalize('NFD').replace(/[\u0300-\u036f]/g, "").trim().split(' ').join('-') + "/" + municipio.trim().split(' ').join('-')).toLowerCase();

      this.router.navigate(['/doctor/' + url]);
    }


  }

}

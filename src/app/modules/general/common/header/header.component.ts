import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
  Inject,
} from '@angular/core';
import {
  Event,
  NavigationStart,
  Router,
  ActivatedRoute,
  NavigationEnd,
} from '@angular/router';
import { DOCUMENT } from '@angular/common';

//import { CommonServiceService } from './../../common-service.service';
//import * as $ from 'jquery';
import { UserService } from 'src/app/modules/application/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  auth: boolean = false;
  comrytmenu: boolean = false;
  isPatient: boolean = false;
  comlogo: boolean = true;
  whitelogo: boolean = false;
  page: any;
  splitVal : any;
  headerTop: boolean = false;
  menuTopLogin: boolean = false;
  isLogin: boolean = false;
  user: any;
  base: any;
  url1;
  pathImage: any;
  constructor(
    @Inject(DOCUMENT) private document : any,
    private cdr: ChangeDetectorRef,
    public router: Router,
    private activeRoute: ActivatedRoute,
    //public commonService: CommonServiceService,
    public userService: UserService

  ) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        var res = event.url.split('/');
        this.base = res[1];
        this.page = res[2];
        console.log(this.base);
        if (this.base == "login"){
          this.isLogin = false;
        }else{
          this.isLogin = true;
        }

        if (event.url.indexOf('/admin') !== -1){
          this.menuTopLogin = false;
          this.comrytmenu = false;
          this.auth = true;
        }else{
          if (event.url.indexOf('/home') !== -1){
            this.headerTop = true;
          }
          this.user ? this.menuTopLogin = true : this.menuTopLogin = false;
          this.user ? this.comrytmenu = true : this.comrytmenu = false;
          this.auth = false;
        }

        console.log(event.url);

      }
    });
    this.url1 = this.router.url;
    /*this.commonService.message.subscribe((res: any) => {
      if (res === 'patientLogin') {
        this.auth = true;
        // this.isPatient = true;
      }
      if (res === 'doctorLogin') {
        this.auth = true;
        // this.isPatient = false;
      }

      if (res === 'logout') {
        this.auth = false;
        this.isPatient = false;
      }
    });*/
  }

  ngOnInit(): void {
    this.pathImage = "https://vetzco-site.s3.sa-east-1.amazonaws.com/";
    this.user = this.userService.getUser();
    console.log(this.user);
    if (localStorage.getItem('auth') === 'true') {
      this.auth = true;
      this.isPatient =
        localStorage.getItem('patient') === 'true' ? true : false;
    }
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        //$('html').removeClass('menu-opened');
       // $('.sidebar-overlay').removeClass('opened');
       // $('.main-wrapper').removeClass('slide-nav');
      }
    });

      /*  $(window).scroll(function(){
        var scroll = $(window).scrollTop();
          if (scroll > 95) {
          $(".header-trans").css("background" , "#FFFFFF");
          }

          else{
            $(".header-trans").css("background" , "transparent");
          }
          if (scroll > 95) {
            $(".header-trans.custom").css("background" , "#2b6ccb");
            }

            else{
              $(".header-trans.custom").css("background" , "transparent");
            }
        })
        */
  }

  sair(){
    this.userService.logout();
    window.location.href = '/home';
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
    this.loadDynmicallyScript('assets/js/script.js');
  }
  loadDynmicallyScript(js: any) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.head.appendChild(script);
    script.onload = () => this.doSomethingWhenScriptIsLoaded();
  }
  doSomethingWhenScriptIsLoaded() {}
  change(name: any) {
    this.page = name;
    //this.commonService.nextmessage('main');
  }

  mapGrid() {
    this.router.navigate(['/map-grid']);
  }

  mapList() {
    this.router.navigate(['/map-list']);
  }

  addStyle(val: any) {
    /*
    if (val === 'home') {
      if (document.getElementById('home').style.display == 'block') {
        document.getElementById('home').style.display = 'none';
      } else {
        document.getElementById('home').style.display = 'block';
      }
    }
    if (val === 'doctor') {
      if (document.getElementById('doctor').style.display == 'block') {
        document.getElementById('doctor').style.display = 'none';
      } else {
        document.getElementById('doctor').style.display = 'block';
      }
    }
    if (val === 'patient') {
      if (document.getElementById('patient').style.display == 'block') {
        document.getElementById('patient').style.display = 'none';
      } else {
        document.getElementById('patient').style.display = 'block';
      }
    }
    if (val === 'pharmacy') {
      if (document.getElementById('pharmacy').style.display == 'block') {
        document.getElementById('pharmacy').style.display = 'none';
      } else {
        document.getElementById('pharmacy').style.display = 'block';
      }
    }
    if (val === 'pages') {
      if (document.getElementById('pages').style.display == 'block') {
        document.getElementById('pages').style.display = 'none';
      } else {
        document.getElementById('pages').style.display = 'block';
      }
    }
    if (val === 'blog') {
      if (document.getElementById('blog').style.display == 'block') {
        document.getElementById('blog').style.display = 'none';
      } else {
        document.getElementById('blog').style.display = 'block';
      }
    }
    if (val === 'admin') {
      if (document.getElementById('admin').style.display == 'block') {
        document.getElementById('admin').style.display = 'none';
      } else {
        document.getElementById('admin').style.display = 'block';
      }
    }
    */
  }

  doctor(name: any) {
    this.page = name;
    this.router.navigate(['/doctor/dashboard']);
  }

  logout() {
    localStorage.clear();
    this.auth = false;
    this.isPatient = false;
    this.router.navigate(['/login']);
  }
  
  clickLogout() {
    localStorage.clear();
    this.userService.logout();
    window.location.href = '/home';
  }

  home() {
    //this.commonService.nextmessage('main');
    this.router.navigateByUrl('/').then(() => {
      this.router.navigate(['/']);
    });
  }

  navigate(name: any) {
    this.page = name;
    if (name === 'Admin') {
      this.router.navigate(['/admin']);
     // this.commonService.nextmessage('admin');
    } else if (name === 'Pharmacy Admin') {
      this.router.navigate(['/pharmacy-admin']);
      //this.commonService.nextmessage('pharmacy-admin');
    }
  }
}

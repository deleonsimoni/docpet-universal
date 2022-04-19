import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/modules/application/services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  user: any;
  pathImage : any = "https://vetzco-site.s3.sa-east-1.amazonaws.com/";
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.pathImage = "https://vetzco-site.s3.sa-east-1.amazonaws.com/";
    this.user = this.userService.getUser();
  }

}

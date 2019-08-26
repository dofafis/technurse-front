import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario = {};

  constructor(
    private homeService: HomeService,
    private router: Router
  ) { 
	if(!localStorage.getItem('token')){
		this.router.navigate(['login']);
	}
    }

  ngOnInit() {
    var token = localStorage.getItem('token');
    this.homeService.getUsuario(token).subscribe(
      (response) => {
        console.log(response);
	this.usuario = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}

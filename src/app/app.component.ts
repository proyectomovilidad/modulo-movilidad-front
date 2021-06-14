import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})


export class AppComponent implements OnInit {
  title = 'modulo-movilidad-angular';


  ngOnInit() {
  	environment.TOKEN = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'));

  	if(user) {
      environment.user = user;
    }

  	console.log('token: ', environment.TOKEN)
  	console.log('Usuario: ', environment.user)
  }
}



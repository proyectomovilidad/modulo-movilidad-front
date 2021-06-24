import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {CustomDialogComponent} from '../custom-dialog/custom-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-datos-institucion',
  templateUrl: './datos-institucion.component.html',
  styleUrls: ['./datos-institucion.component.css']
})
export class DatosInstitucionComponent implements OnInit {

  public instituciones: any;

  constructor( private router: Router,
               private route: ActivatedRoute,
               private dialog: MatDialog,) { }

  ngOnInit(): void {
    const user = environment.user;

    if(!this.route.snapshot.data['roles'].includes(user.rol)){
      this.router.navigateByUrl(environment.unauthorizedPage);
      this.dialog.open(CustomDialogComponent, { data: { code: 403}});
    }
  }

}

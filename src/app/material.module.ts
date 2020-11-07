import { NgModule } from '@angular/core';

import {MatExpansionModule} from '@angular/material/expansion';
import { MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';

import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';

import { MatSnackBarModule } from '@angular/material/snack-bar';





@NgModule ({

    imports: [
        MatExpansionModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatRadioModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatDialogModule,
        MatNativeDateModule,
        MatSelectModule,
        MatSnackBarModule

    ],

    exports: [
        MatExpansionModule,
        MatDatepickerModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatRadioModule,
        MatFormFieldModule,
        MatDialogModule

    ]
})


export class MaterialModule {}
import { Component, OnInit } from '@angular/core';
import { UserDetails } from '../../../../core/model/user-details/user-details.model';
import { AuthService } from '../../../../core/service/auth/auth.service';
import { FileService } from '../../../../core/service/file/file.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SweetAlertService } from '../../../../miscelaneo/service/sweet-alert/sweet-alert.service';
import SweetAlertResult from 'sweetalert2';
import Swal from 'sweetalert2';
import { ProfilePicture } from '../../../../core/abstract/profile-picture/profile-picture.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss']
})
export class ProfilePictureComponent implements OnInit {

  private userDetails: UserDetails = this._authService.userDetails!;
  public url: string = '';
  public loading: boolean = true;
  public form: FormGroup = new FormGroup({});

  public constructor(
    private _authService: AuthService,
    private _fileService: FileService,
    private _sweetAlertService: SweetAlertService
  ) { }

  public ngOnInit(): void {
    this.initializeForm();
    this.get();
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      file: new FormControl('', [Validators .required])
    });
  }

  private loadingSetter(value: boolean): void {
    this.loading = value;
  }

  private get(): void {
    this._fileService.download(this.userDetails).subscribe(
      (url: string): void => {
        this.url = url;
      },
      (): void => {
        return;
      },
      (): void => {
        return;
      }
    );
  }

  public save(event: any): void {

    this.loadingSetter(true);

    ProfilePicture.get().setImage('');

    const file: File = event['target']['files'][0];
    const userDetails: UserDetails = this._authService.userDetails!;

    this._sweetAlertService.dialog(
      'Are you sure?',
      'You wont be able to revert this!',
      'warning'
      )
      .then((result: any): void => {
        if(result.isConfirmed)
        this._fileService.upload(file, userDetails).subscribe(
          (): void => {
            this._sweetAlertService.centerAlert('Successfuly', 'File updated!', 'success');
            ProfilePicture.get().setImage(this._authService.imageUrl);
            return;
          }, 
          (): void => { 
            return;
          },
          (): void => {
            this.loadingSetter(false);
            location.reload();
          }
        );
        else if(result.dismiss === Swal.DismissReason.cancel)
          this._sweetAlertService.centerAlert('Cancelled', 'You have cancelled!', 'error');
      });
      
  }

}

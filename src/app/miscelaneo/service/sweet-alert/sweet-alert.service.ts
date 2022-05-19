import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  private swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  public constructor() { }

  public dialog(title: string, html: string, icon: SweetAlertIcon): Promise<SweetAlertResult<void>> {
    return this.swalWithBootstrapButtons.fire({
      title: title,
      text: html,
      icon: icon,
      showCancelButton: true,
      confirmButtonText: 'Yes, do it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    });
  }
  
  public centerAlert(title: string, html: string, icon: SweetAlertIcon): void {
    this.swalWithBootstrapButtons.fire(title, html, icon);
  }

}

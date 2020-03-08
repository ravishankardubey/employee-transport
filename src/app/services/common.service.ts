import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  openSnackbar(msg, type, time) {
    /**
     * Types:
     * 1. success
     * 2. error
     */
    const mType = type === 'success' ? 'success' : 'danger';
    const div = document.createElement('div');
    div.setAttribute('id', 'snackbar');
    div.setAttribute('role', 'alert');
    div.innerHTML = `
    <div class="snackar-content">
    <b style="text-transform: capitalize">${type}</b><br>
    <p>${msg}</p>
    </div>
    `;
    document.body.appendChild(div);
    const cssText = `
        visibility: visible !important;
        -webkit-animation: snackbar-fadein 0.5s, snackbar-fadeout 0.5s ${time - 0.5}s;
        animation: snackbar-fadein 0.5s, snackbar-fadeout 0.5s ${time - 0.5}s;
    `;
    div.className = `alert alert-${mType} ${type}`;
    div.style.cssText = cssText;
    setTimeout(() => {
      document.body.removeChild(div);
    }, time * 1000);
  }

}

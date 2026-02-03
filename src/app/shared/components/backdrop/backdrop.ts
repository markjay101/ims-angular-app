import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-backdrop',
  imports: [],
  templateUrl: './backdrop.html',
  styleUrl: './backdrop.css',
})
export class Backdrop {
  showBackdrop = input<boolean>(false);

  closeBackdrop = output<boolean>();

  handleClose() {
    this.showBackdrop.apply(false);
    this.closeBackdrop.emit(false);
  }
}

import {Component} from 'angular2/core';
import Modal from './modal';

@Component({
  selector: 'ngc-app',
  template: `
<div class="p3">
  <p class="p4">
    <button class="btn btn-primary block col-6 mx-auto"
      (click)="showModal()">
      Show Modal
    </button>
  </p>
  <p class="center">
    Last Action Fired: <code class="bold">{{ firedAction }}</code><br/>
    Modal Visible: <code class="bold">{{ modalVisible }}</code>
  </p>
  <ngc-modal [(isVisible)]="modalVisible"
    title="Bacon with Header and Footer">
    <p class="m0">Bacon ipsum dolor sit amet chuck prosciutto landjaeger ham hock filet mignon shoulder hamburger pig venison. Ham bacon corned beef, sausage kielbasa flank tongue pig drumstick capicola swine short loin ham hock kevin. Bacon t-bone hamburger turkey capicola rump short loin.</p>
    <button class="btn caps"
      (click)="action('Share')">
      Share
    </button>
    <button class="btn caps"
      (click)="action('Explore')">
      Explore
    </button>
  </ngc-modal>
</div>`,
  directives: [Modal]
})
export default class App {
  modalVisible: boolean = false;
  firedAction: string;

  showModal() {
    this.modalVisible = true;
  }

  action(type) {
    this.modalVisible = false;
    this.firedAction = type;
  }
}
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { StorageControllerService } from '../../services/storage-controller.service'

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.page.html',
  styleUrls: ['./info-modal.page.scss'],
})
export class InfoModalPage implements OnInit {
  // Variables
  modalTitle: string;
  data: any;
  // Constructor
  constructor(private modalController: ModalController, private navParams: NavParams, public alertController: AlertController, private storage: StorageControllerService) { }
  // On init function
  ngOnInit() {
    console.table(this.navParams);
    this.data = this.navParams.data.modalData;
    this.modalTitle = this.navParams.data.paramTitle;
  }
  // Close modal function
  async closeModal() {
    const onClosedData: string = "Closed!";
    await this.modalController.dismiss(onClosedData);
  }
  // Alert function
  async presentAlertConfirm(title) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Please confirm action',
      message: 'Removal is permanent are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'Yes',
          handler: () => {
            this.storage.removeOneItem(title);
            this.storage.removeFromStorage(title);
            this.closeModal();
          }
        }
      ]
    });
    await alert.present();
  }
}

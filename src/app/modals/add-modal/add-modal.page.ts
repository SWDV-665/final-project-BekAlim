import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.page.html',
  styleUrls: ['./add-modal.page.scss'],
})
export class AddModalPage implements OnInit {

  modalTitle: string;
  modelId: number;
  title: string;
  country: string;
  city: string;
  startDate: Date;
  endDate: Date;
  notes: Text;

  constructor(private modalController: ModalController, private navParams: NavParams, public alertController: AlertController) { }

  ngOnInit() {}

  async addTrip() {
    let tripObject = [this.title, {
        country: this.country,
        city: this.city,
        startDate: this.startDate,
        endDate: this.endDate,
        notes: this.notes
    }];
    if(this.title == null || this.country == null || this.city == null || this.startDate == null || this.endDate == null){
      this.raiseAlert();
    }else{
      await this.modalController.dismiss(tripObject);
    }
  }
  async closeModal(){
    await this.modalController.dismiss();
  }
  async raiseAlert() {
    const alert = await this.alertController.create({
      header: 'Fields Warning',
      message: `All fields must be filled out, please try again.`,
      buttons: ['OK']
    });
    await alert.present();
  }

}

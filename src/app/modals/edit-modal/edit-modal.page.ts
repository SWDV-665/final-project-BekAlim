import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { StorageControllerService } from '../../services/storage-controller.service'

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.page.html',
  styleUrls: ['./edit-modal.page.scss'],
})
export class EditModalPage implements OnInit {

  modalTitle: string;
  modelId: number;
  title: string;
  country: string;
  city: string;
  startDate: Date;
  endDate: Date;
  notes: Text;
  data: any;

  constructor(private modalController: ModalController, private navParams: NavParams, private storage: StorageControllerService) { }

  ngOnInit() {
    console.table(this.navParams);
    this.data = this.navParams.data.modalData;
    this.modalTitle = this.navParams.data.paramTitle;
    this.title = this.modalTitle
    this.country = this.data.country;
    this.city = this.data.city;
    this.startDate = this.data.startDate;
    this.endDate = this.data.endDate;
    this.notes = this.data.notes;
  }

  async editTrip() {
    this.storage.removeOneItem(this.modalTitle);
    this.storage.removeFromStorage(this.modalTitle);
    let tripObject = [this.title, {
        country: this.country,
        city: this.city,
        startDate: this.startDate,
        endDate: this.endDate,
        notes: this.notes
    }];
    await this.modalController.dismiss(tripObject);
  }

  async closeModal() {
    const closedNoData: string = "Canceled!";
    await this.modalController.dismiss(closedNoData);
  }

}

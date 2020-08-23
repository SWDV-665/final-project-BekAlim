import { Component } from '@angular/core';
import { StorageControllerService } from '../services/storage-controller.service'
import { InfoModalPage } from '../modals/info-modal/info-modal.page'
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  // Variables
  allTripsData: any;
  todaysDate = Date.now();
  // Constructor
  constructor(private storage: StorageControllerService, public modalController: ModalController) {}
  // On init
  ngOnInit(){
    this.loadTripsList();
  }
  // Load Trips function
  async loadTripsList(){
    this.storage.getAllTripsData();
    this.allTripsData = this.storage.allTripsData;
    this.todaysDate;
  }
  // Get more info modal
  async infoModal(tripkey) {
    const modal = await this.modalController.create({
      component: InfoModalPage,
      componentProps: {
        "modalData": this.allTripsData[tripkey],
        "paramTitle": tripkey
      }
    });
    return await modal.present();
  }
  // Pull to refresh function
  doRefresh(event) {
    setTimeout(() => {
      this.loadTripsList();
      event.target.complete();
    }, 2000);
  }
}

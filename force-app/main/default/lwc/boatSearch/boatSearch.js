/**
 * @description       : 
 * @author            : Renzo Manuel Gomez Cesare
 * @group             : 
 * @last modified on  : 11-01-2022
 * @last modified by  : Renzo Manuel Gomez Cesare
**/
import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getBoats from '@salesforce/apex/BoatDataService.getBoats';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const CONST_ERROR = 'Error';
const ERROR_VARIANT = 'error';

export default class BoatSearch extends NavigationMixin(LightningElement) {
    isLoading = false;
    boatType = '';
    boatsData = [];
    handleLoading(){
        this.isLoading =  false;
    }

    handleDoneLoading(){
        this.isLoading = true;
    }
    renderedCallback(){
        this.handleLoading();
    }
    @wire(getBoats, { boatTypeId: '$boatType' })
    wiredData({ error, data }) {
      if (data) {
        this.boatsData = data;
        this.handleDoneLoading();
      } else if (error) {
         console.error('Error:', error);
      }
    }

    searchBoats(e){
        console.log(e.detail);
        this.boatType = e.detail;
    }
    createNewBoat(){
        console.log('selecciono crear bote');
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Boat__c',
                actionName: 'new'
            }
        });
    }
    refreshApex(){
        this.handleLoading();
         getBoats()
            .then(result => {
                this.boatsData = result;
                this.handleDoneLoading();
            })
            .catch(error => {
                console.log(error);
                this.handleDoneLoading();
                this.dispatchEvent(new ShowToastEvent({
                    title: CONST_ERROR,
                    message: error?.body?.message,
                    variant: ERROR_VARIANT
                }));
            });
        this.handleDoneLoading();
    }
}
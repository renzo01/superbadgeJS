import updateBoatList from '@salesforce/apex/BoatDataService.updateBoatList';
import { api, LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class BoatSearchResults extends LightningElement {
    SUCCESS_VARIANT = 'success';
    SUCCESS_TITLE = 'Success';
    MESSAGE_SHIP_IT = 'Ship It';
    ERROR_VARIANT = 'error';
    CONST_ERROR = 'Error';

    @api boatsData;
    columnsList = [
        {label:'Name', fieldName:'Name', editable:true},
        {label:'Length',fieldName:'Length__c', editable:true},
        {label:'Price', fieldName:'Price__c', editable:true},
        {label:'Description', fieldName:'Description__c', editable:true}
    ];
    renderedCallback(){
        console.log('OUTPUT : ',this.boatsData);
    }
    boatSelect(e){
        console.log('Boat Selected Id :'+e.detail.boatId);
    }
    handleSave(e){
        updateBoatList({data:e?.detail?.draftValues})
            .then(() => {
                this.dispatchEvent(new CustomEvent('refresh',{}));
                this.dispatchEvent(new ShowToastEvent({
                    title: this.SUCCESS_TITLE,
                    message: this.MESSAGE_SHIP_IT,
                    variant: this.SUCCESS_VARIANT
                }));
            })
            .catch(error => {
                console.log(error);
                this.dispatchEvent(new ShowToastEvent({
                    title: this.CONST_ERROR,
                    message: error?.body?.message,
                    variant: this.ERROR_VARIANT
                }));
            });
    }
}
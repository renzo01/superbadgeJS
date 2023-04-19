/**
 * @description       : 
 * @author            : Renzo Manuel Gomez Cesare
 * @group             : 
 * @last modified on  : 11-11-2022
 * @last modified by  : Renzo Manuel Gomez Cesare
**/
import { api, LightningElement } from 'lwc';

const TILE_WRAPPER_SELECTED_CLASS = 'tile-wrapper selected';
const TILE_WRAPPER_UNSELECTED_CLASS = 'tile-wrapper';
export default class BoatTile extends LightningElement {
    @api
    boat;

    @api
    selectedBoatId;
    
    get backgroundStyle() {
        return `
            background-image:url(${this.boat.Picture__c})
        `
    }

    get formattedCurrency(){
        return new Intl.NumberFormat('en-EN',{style:'currency',currency:'USD'}).format(this.boat.Price__c);
    }

    get tileClass() {
        if(this.selectedBoatId === this.boat.Id){
            return TILE_WRAPPER_SELECTED_CLASS;
        }
        return TILE_WRAPPER_UNSELECTED_CLASS;
    }

    selectBoat() {
        this.dispatchEvent(new CustomEvent('boatselect', { detail: { boatId: this.boat.Id } }));
    }

    boatSelected(){
        console.log('inside of boat Selection');
        //get the main element from the DOM
        let cardClass = this.template.querySelector('[data-id="card"]');
        if(cardClass.classList.contains('selected')){
            cardClass.classList.remove('selected');    
            return;
        }
        cardClass.classList.add('selected');
    }
}
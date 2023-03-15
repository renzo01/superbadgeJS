/**
 * @description       : Show a list of boat types to filter the gallery
 * @author            : Renzo Manuel Gomez Cesare
 * @group             : 
 * @last modified on  : 11-03-2022
 * @last modified by  : Renzo Manuel Gomez Cesare
**/
import { LightningElement, wire } from 'lwc';

import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes';

export default class BoatSearchForm extends LightningElement {
    selectedBoatTypeId = '';

    error = undefined;

    searchOptions;
    /**
     * @description: Get all the types of boats
     */
    @wire(getBoatTypes)
    boatTypes({error,data}){
        if(data){
            this.searchOptions = data.map(type => {
                return {label:type.Name, value:type.Id};
            });
            this.searchOptions.unshift({label:'All Types', value:''});
        }else if(error){
            this.searchOptions = undefined;
            this.error = error;
        }
    }
    /**
     * @description: sent to parent the boat type selected
     * @param {Object} event 
     */
     handleSearchOptionChange(event){
        this.selectedBoatTypeId = event.detail.value;
        this.dispatchEvent(new CustomEvent('search',{detail:{boatTypeId: this.selectedBoatTypeId}}));
    }
}
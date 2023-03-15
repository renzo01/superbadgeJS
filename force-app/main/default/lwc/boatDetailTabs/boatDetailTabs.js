import { api, LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { APPLICATION_SCOPE, MessageContext, subscribe, unsubscribe } from 'lightning/messageService';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
//fields where to get filtered data
import BOAT_ID_FIELD from '@salesforce/schema/Boat__c.Id';
import BOAT_NAME_FIELD from '@salesforce/schema/Boat__c.Name';
//list of custom labels
import labelDetails from '@salesforce/label/c.Details';
import labelReviews from '@salesforce/label/c.Reviews';
import labelAddReview from '@salesforce/label/c.Add_Review';
import labelFullDetails from '@salesforce/label/c.Full_Details';
import labelPleaseSelectABoat from '@salesforce/label/c.Please_select_a_boat';
import BOATMC from '@salesforce/messageChannel/BoatMessageChannel__c';

const BOAT_FIELDS = [BOAT_ID_FIELD, BOAT_NAME_FIELD];

export default class BoatDetailTabs extends NavigationMixin(LightningElement) {
    subscription = null;
    @api
    boatId

    @wire(MessageContext) messageContext;
    @wire(getRecord, { recordId: '$boatId', fields: BOAT_FIELDS })
    wireRecord;

    label = {
        labelDetails,
        labelReviews,
        labelAddReview,
        labelFullDetails,
        labelPleaseSelectABoat
    };

    get detailsTabIconName() {
        return this.wireRecord.data ? 'utility:anchor' : null;
    }

    get boatName() {
        return getFieldValue(this.wireRecord.data, BOAT_NAME_FIELD);
    }

    subscribeMC() {
        this.subscription = subscribe(
            this.messageContext,
            BOATMC,
            (message) => {
                // eslint-disable-next-line @lwc/lwc/no-api-reassignments
                this.boatId = message.recordId
            },
            { scope: APPLICATION_SCOPE }
        )
    }

    connectedCallback() {
        if (this.subscription || this.boatId) {
            return;
        }
        this.subscribeMC();
    }

    navigateToRecordViewPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.boatId,
                objectApiName: 'Boat__c',
                actionName: 'view'
            }
        })
    }
    handleReviewCreated() {
        this.template.querySelector('lightning-tabset').activeTabValue = 'reviews';
        this.template.querySelector('c-boat-reviews').refresh();
    }

    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
}
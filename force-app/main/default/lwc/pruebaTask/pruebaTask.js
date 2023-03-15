import { LightningElement } from 'lwc';
import TASK_WHO_FIELD from '@salesforce/schema/Task.WhoId';
import TASK_WHAT_FIELD from '@salesforce/schema/Task.WhatId';

export default class PruebaTask extends LightningElement {
    fields = [TASK_WHAT_FIELD,TASK_WHO_FIELD];
}
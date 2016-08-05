/**
 * Created by tithomas on 7/29/16
 */

import { Component, OnInit } from '@angular/core';
import { ContainerListService } from '../../services/containerList/containerList.service';

@Component({
    moduleId: module.id,
    providers: [ContainerListService],
//    templateUrl: './app/components/dashlet1/dashlet1.component.tpl.html',
    template: `
    <h2>Container List</h2>
    <hr>
    <div *ngFor="let container of containerList">{{container.Names[0]}}</div>`
})
export class Dashlet1Component implements OnInit {

    public containerList;

    constructor(private containerListService: ContainerListService) { }

    ngOnInit() {
        this.buildContainerList();
//        this.testContainerList();
    }

    private buildContainerList(): void {
        console.log('dashlet1 buildContainerList() called');
        this.containerList = [];
        this.containerListService.getContainerList()

            /*
            An observable subscription requires three function arguments:
              1 - Next case = if HTTP call is successful
              2 - Error case
              3 - Complete case = when call completes
            */

            .subscribe(
                data => this.containerList = data,
                error => console.log(error),
                () => console.log('buildContainerList() complete')
            )
    }

    private testContainerList(): void {
        console.log('dashlet1 testContainerList() called');
        this.containerList = [];
        this.containerListService.fakeContainerList()
            .then(list => this.containerList = list);
    }
}
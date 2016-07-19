import { Component, OnInit, Input } from '@angular/core';
import { Time } from '../../model/time.model.ts';

@Component({
    selector: 'lista-de-times',
    templateUrl: 'build/components/lista-de-times/lista-de-times.component.html',
})
export class ListaDeTimesComponent implements OnInit {

    @Input()
    public listaDeTimes:Time[]

    constructor() { }

    ngOnInit() { }

    getRGBTeamColor(time:Time) {
		return "rgb(" + time.cor.red + "," + time.cor.green + "," + time.cor.blue + ")"
	}

	getFontBasedOnTeamColor(time:Time) {
		let a:number = 1 - ( 0.299 * time.cor.red + 0.587 * time.cor.green + 0.114 * time.cor.blue)/255
		let d = undefined
		d = a < 0.5 ? 48 : 255
		return "rgb(" + d + "," + d + "," + d + ")"
	}

}
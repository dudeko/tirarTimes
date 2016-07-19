import { Time } from './time.model.ts';


export class ItemHistorico {
	public dia:Date
	public times:Time[]

	constructor(times:Time[]) {
		this.dia = new Date()
		this.times = times
	}
}
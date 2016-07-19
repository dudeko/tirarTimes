import { TeamColor } from './team-color.model.ts';


export class Time {
	public nome:String
	public cor:TeamColor
	public jogadores:String[]

	constructor(nome:String, cor:TeamColor, jogadores:String[]) {
		this.nome = nome
		this.cor = cor
		this.jogadores = jogadores
	}
}
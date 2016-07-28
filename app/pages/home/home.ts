import {Component} from '@angular/core';
import {NavController, Alert, Loading} from 'ionic-angular';
import {JogadorService} from '../../services/jogador.service';
import {ListaDeTimesComponent} from '../../components/lista-de-times/lista-de-times.component';
import {Time} from '../../model/time.model.ts';
import {TeamColor} from '../../model/team-color.model.ts';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [JogadorService],
  directives: [ListaDeTimesComponent]
})
export class HomePage {

	jogadores:String[] = undefined
	textoarea:String
	quantidadeTimes:number = 2
	showTeams:boolean = false
	listaDeTimes:Time[]

	constructor(private navController: NavController,
				private jogadorService: JogadorService) {
  	}

	getTeamQuantityOptions(quantity:number) {
		let array:number[] = []
		for (let i = 2; i <= quantity; i ++) {
			array.push(i)
		}
		return array
	}
  
  	transformarTextoEmLista(texto: String) {
		let self = this
		texto = texto ? texto.trim() : ""
		if (texto.length !== 0) {
			this.listaDeTimes = []
			this.jogadores = this.jogadorService.gerarListaAPartirDeTexto(texto)
			if (this.jogadores.length > 1) {
				this.listaDeTimes = self.jogadorService.shuffle(self.jogadores, self.quantidadeTimes)
				let loading = Loading.create({
					content: "Sorteando..."
				})
				this.navController.present(loading)
				setTimeout(function() {
					loading.dismiss()
					self.setColorsForTeams()
					self.setRandomColorForTeams()
					self.showTeams = true
				}, 1000)
			} else {
				let alert = Alert.create({
					title: '',
					subTitle: 'Coloque ao menos dois nomes para que os times possam ser gerados.',
					buttons: ['OK']
				})
				this.navController.present(alert)
				this.jogadores = undefined
			}
		} else {
			let alert = Alert.create({
				title: '',
				subTitle: 'Insira um texto com um nome por linha para que os times possam ser gerados.',
				buttons: ['OK']
			})
			this.navController.present(alert)
		}
	}

	apagarLista() {
		this.jogadores = undefined
		this.showTeams = false
	}

	getColor(i:number) {
		let caractere = String.fromCharCode(i + 65)
		return "#" + 5 + "" + caractere + "" + caractere
	}

	setColorsForTeams() {
		this.listaDeTimes[0].cor = new TeamColor(0, 133, 202)
		if (this.listaDeTimes[1]) this.listaDeTimes[1].cor = new TeamColor(239, 51, 64)
		if (this.listaDeTimes[2]) this.listaDeTimes[2].cor = new TeamColor(254, 221, 0)
		if (this.listaDeTimes[3]) this.listaDeTimes[3].cor = new TeamColor(0, 171, 132)
	}

	setRandomColorForTeams() {
		for (let i = 0; i < this.listaDeTimes.length; i ++) {
			if (this.listaDeTimes[i].cor === undefined) {
				let red:number = Math.floor(Math.random() * 256)
				let green:number = Math.floor(Math.random() * 256)
				let blue:number = Math.floor(Math.random() * 256)

				let color = 100
				
				red = Math.floor((red + color) / 2)
				green = Math.floor((green + color) / 2)
				blue = Math.floor((blue + color) / 2)
				this.listaDeTimes[i].cor = new TeamColor(red, green, blue)
			}
		}
	}

	salvarTimesDeHoje() {
		this.jogadorService.salvar(this.listaDeTimes)
	}


}
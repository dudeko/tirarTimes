import { Injectable } from '@angular/core';
import { Time } from '../model/time.model.ts';
import { ItemHistorico } from '../model/item-historico.model.ts';

@Injectable()
export class JogadorService {

    constructor() { }

    gerarListaAPartirDeTexto(texto:String) {
        let jogadores : String[]

        texto = texto.replace(/(^|\n)[^A-zÀ-ú]+/g, "\n")
		if (texto.indexOf("\n") == 0) {
			texto = texto.replace(/^\n/, "")
		} 
		jogadores = texto.split("\n")
		for (let i = 0; i < jogadores.length; i++) {
			jogadores[i] = jogadores[i].trim()
		}
        return jogadores 
    }

    shuffle(listaJogadores:String[],quantidadeTimes:number) {
        var j, x, i
        for (i = listaJogadores.length; i; i--) {
            j = Math.floor(Math.random() * i)
            x = listaJogadores[i - 1]
            listaJogadores[i - 1] = listaJogadores[j]
            listaJogadores[j] = x
        }
        let listaDeTimes:Time[] = [], tamanhoTime:number, limiteFinal:number
        for (let i = 0; i < quantidadeTimes; i ++) {
            tamanhoTime = Math.floor(listaJogadores.length/quantidadeTimes)
            limiteFinal = tamanhoTime * (i + 1)
            let time = new Time("Time " + (i + 1), undefined, listaJogadores.slice(tamanhoTime * i, limiteFinal))
            listaDeTimes.push(time)
        }
        if (limiteFinal < listaJogadores.length) {
            let timeIndex = 0
            for (let i = limiteFinal; i < listaJogadores.length; i ++) {
                listaDeTimes[timeIndex].jogadores.push(listaJogadores[i])
                timeIndex ++
            }
        }
        return listaDeTimes
    }

    salvar(times:Time[]) {
        let itemHistorico:ItemHistorico = new ItemHistorico(times)
        let historico:ItemHistorico[] = JSON.parse(localStorage.getItem("historico"))
        if (historico == undefined) {
            historico = []
        }
        historico.push(itemHistorico)
        localStorage.setItem("historico", JSON.stringify(historico))
    }

}
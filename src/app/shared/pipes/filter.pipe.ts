import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro',
})

@Injectable()
export class FilterPipe implements PipeTransform {

  transform(lista: any[], campo: string, valor : string) : any[] {

    if (!lista) {
      return [];
    }
    if (!campo || !valor) {
      return lista;
    }

    var filtro = lista.filter((item) =>{
       return item[campo].toLowerCase().includes(valor.toLowerCase());
      // item[campo].toLowerCase().indexOf(valor.toLowerCase()) !== -1;
    });

    return filtro;
  }

}

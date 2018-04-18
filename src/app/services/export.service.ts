import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as html2canvas from 'html2canvas';
import { PartesService } from './partes.service';
import { UserService } from './user.service';
import { CompanyService } from './company.service';
import { Report } from '../models/report';

@Injectable()
export class ExportService {


  constructor(private partesService:PartesService,
              private userService:UserService,
              private companyService: CompanyService) { 
                  pdfMake.vfs = pdfFonts.pdfMake.vfs;
                  pdfMake.fonts = {
                    Avenir: {
                            roman: 'avenir-roman.ttf',
                            light: 'avenir-light.ttf',
                            normal: 'avenir-light.ttf',
                            bold: 'avenir-light.ttf'
                      }
                 }
  }



  public convertProfilePhoto(url : string, outputFormat : string) : Observable<string> {
    return new Observable((subscriber) => {
        let img : HTMLImageElement = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
            let canvas : HTMLCanvasElement = document.createElement('canvas') as HTMLCanvasElement;
            var ctx = canvas.getContext('2d');
            var dataURL;
            var width = 50;
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0);
            while (canvas.width * 0.5 > width) {      // Resize de la imagen
               canvas.width *= 0.5;
               canvas.height *= 0.5;
               ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
            }
            canvas.width = width;
            canvas.height = canvas.width * img.height / img.width;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            dataURL = canvas.toDataURL(outputFormat);                
            subscriber.next(dataURL);
            canvas = null;
        };
        img.src = url;
    });
}


public exportHoras(){
  
}





  public createPDF(docDefinition : any,filename : string) {

  html2canvas(document.querySelector("div.modal-body")).then(function(canvas) {
    var data = canvas.toDataURL();
    let pdf = {
      content: [
        {
           table: {
            widths: ['*','auto'],
               body: [
                 [
                   { 
                  stack:[
                      {
                          image: 'data:image/png;base64,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', // Logo de neosistec
                          alignment: 'left',
                          width: 200,
                      }
                  ]
                  },
                  { 
                      text: 'Nuevos Sistemas Teconologicos S.L. \n Calle Central 10, 4a planta \n 30.100 - MURCIA \n T. 968 27 74 15  \n info@neosistec.com', 
                      alignment: 'right', 
                      fontSize: 12,
                      bold:true, 
  
                  }
              ]
          ]
      },
      layout: 'headerLineOnly'
      },
      {canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595-2*40, y2: 5, lineWidth: 2 }]},
      {stack:[
        {
          image:data,
          width:500
        }
      ]},
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
          }
      },
      defaultStyle: {
      font: 'Avenir'
      }
  }
    pdfMake.createPdf(pdf).open();
});

  }


  exportarParte(uid: string){
    this.partesService.getParte$(uid).subscribe((data: Report[]) =>{
      
    })
   }


  

  }
  
 
import { Component, OnInit, Input } from '@angular/core';
import { of, fromEvent } from 'rxjs';
// import { Product} from '../interface/product';

@Component({
  selector: 'app-zoom-image',
  templateUrl: './zoom-image.component.html',
  styleUrls: ['./zoom-image.component.css']
})
export class ZoomImageComponent implements OnInit {
  @Input() imageArr: Array<string>;
  private zoomValue: number;
  private heightFrame: number = 100;// unit: px0
  currentIndex: number = 0;
  imageEle: HTMLElement;
  constructor() {
  }
  // imageArr

  ngOnInit() {

  }
  ngDoCheck(): void {
    this.imageEle.style.backgroundImage = `url('${this.imageArr?this.imageArr[this.currentIndex]:''}')`;
  }

  ngOnChanges(): void {
    // console.log('changed!');
    of(document.querySelector(".img-zoom-result")).subscribe((value: HTMLElement) => {
      this.imageEle = value;
      this.zoomValue = this.imageEle.clientHeight / this.heightFrame;
      // console.log(this.zoomValue);
      // this.imageEle.setAttribute("style", `background-image:url("${this.product.urlImage}");`);
      this.imageEle.style.backgroundImage = `url('${this.imageArr?this.imageArr[this.currentIndex]:''}')`;
      
      fromEvent(this.imageEle, "mousemove").subscribe((x: MouseEvent) => {
        this.imageEle.style.backgroundSize = this.zoomValue * 100 + "%";
        this.imageEle.style.backgroundPosition = this.convertPosition(x.offsetX, x.offsetY);
      });
      fromEvent(this.imageEle, 'mouseout').subscribe(() => {
        this.imageEle.style.backgroundPosition = "0";
        this.imageEle.style.backgroundSize = "100%";
      });

    });
  }
  convertPosition(x: number, y: number) {
    // vì chiều dài chiều rộng bằng nhau nên sử dụng 1 cạnh để tính luôn
    let xNew;
    let yNew;
    const maxHeight = this.imageEle.offsetHeight - this.heightFrame / 2;
    if (x - this.heightFrame / 2 > 0) {
      if (x > maxHeight) {
        xNew = this.imageEle.clientHeight - this.heightFrame;
      } else {
        xNew = x - this.heightFrame / 2;
      }
    } else {
      xNew = 0;
    }
    if (y - this.heightFrame / 2 > 0) {
      if (y > maxHeight) {
        yNew = this.imageEle.clientHeight - this.heightFrame;
      } else {
        yNew = y - this.heightFrame / 2;
      }
    } else {
      yNew = 0;
    }
    // let x_new = (x-this.heightFrame/2)>=0?(x-this.heightFrame/2)*this.zoomValue:0;
    // let y_new =  (y-this.heightFrame/2)>=0?(y-this.heightFrame/2)*this.zoomValue:0;
    return `-${xNew * this.zoomValue}px -${yNew * this.zoomValue}px`;
  }

  chooseImage(index: number) {
    this.currentIndex = index;
    // console.log(this.currentIndex);
    // this.imageEle.style.backgroundImage = `url('${this.imageArr[this.currentIndex]}')`;

  }


}

import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('canvas') myCanvas!: ElementRef;
  @ViewChild('image') myImg!: ElementRef;
  @ViewChild('video') myVideo!: ElementRef;
  ngAfterViewInit(): void {
    // this.#processImage();
    this.#processVideo();
  }

  #processImage() {
    const img: HTMLImageElement = this.myImg.nativeElement;
    img.onload = () => {
      const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
      const context = canvas.getContext('2d');
      if (context) {
        // context.drawImage(img, 0, 0);
        // context.drawImage(img, 0, 0, 300, 150);
        context.drawImage(img, 680, 150, 300, 480, 0, 0, 300, 150);
      }
    };
  }
  #processVideo() {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: true,
      })
      .then((stream) => {
        const video: HTMLVideoElement = this.myVideo.nativeElement;
        video.srcObject = stream;
        const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
        const context = canvas.getContext('2d');
        requestAnimationFrame(() => this.#animate(context!, video));
      });
  }

  #animate(context: CanvasRenderingContext2D, video: HTMLVideoElement) {
    // context.drawImage(video, 0, 0);
    // context.drawImage(video, 0, 0, 300, 150);
    context.drawImage(video, 150, 0, 450, 480, 0, 0, 300, 150);
    requestAnimationFrame(() => this.#animate(context!, video));
  }
}

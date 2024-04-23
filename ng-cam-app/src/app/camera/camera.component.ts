import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent {
  // @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  // @ViewChild('canvas') canvas!: ElementRef;

  // capturedImage: string | null = null;

  // async capture(){
  //   const video = this.videoPlayer.nativeElement;
  //   const canvas = this.canvas.nativeElement;
  //   const ctx = canvas.getContext('2d');

  //   const stream = await navigator.mediaDevices.getUserMedia({video: true});

  //   video.srcObject = stream;
  //   await video.play();

  //   canvas.width = video.videoWidth;
  //   canvas.height = video.videoHeight;

  //   ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  //   this.capturedImage = canvas.toDataURL('image/png');

  //   stream.getTracks().forEach(track => track.stop());
  // }

  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('resizeHandle') resizeHandle!: ElementRef<HTMLDivElement>;
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;

  capturedImage: string | null = null;
  resizing = false;
  initialWidth = 0;
  initialHeight = 0;
  video!: HTMLVideoElement;

  async capture() {
    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');
    this.video = document.createElement('video');

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    this.video.srcObject = stream;
    await this.video.play();

    canvas.width = this.video.videoWidth;
    canvas.height = this.video.videoHeight;

    if (ctx) {
      ctx.drawImage(this.video, 0, 0, canvas.width, canvas.height);
    }

    this.video.onpause = () => this.stopStream(stream);
    this.video.onended = () => this.stopStream(stream);
  }

  startResize(event: MouseEvent) {
    event.preventDefault();
    this.resizing = true;
    this.initialWidth = this.canvas.nativeElement.width;
    this.initialHeight = this.canvas.nativeElement.height;
    document.addEventListener('mousemove', this.resizeImage);
    document.addEventListener('mouseup', this.stopResize);
  }

  resizeImage = (event: MouseEvent) => {
    if (this.resizing) {
      const rect = this.container.nativeElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const canvas = this.canvas.nativeElement;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        canvas.width = Math.max(x, 50); // Minimum width
        canvas.height = Math.max(y, 50); // Minimum height
        ctx.drawImage(this.video, 0, 0, canvas.width, canvas.height);
      }
    }
  };

  stopResize = () => {
    this.resizing = false;
    document.removeEventListener('mousemove', this.resizeImage);
    document.removeEventListener('mouseup', this.stopResize);
  };

  stopStream(stream: MediaStream) {
    stream.getTracks().forEach(track => track.stop());
  }
}

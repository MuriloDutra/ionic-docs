import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { Source } from 'webpack-sources';

@Injectable({
  providedIn: 'root'
})

export class PhotoService {

  public photos: Photo[] = [];
  
  constructor(private camera: Camera, private storage: Storage) { }

  takePicture(){
    const options: CameraOptions = {
      quality: 100,
      allowEdit: true,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }//DONE LATER

    this.camera.getPicture(options).then((imageData) => {
      this.photos.unshift({
        data: 'data: image/jpeg;base64,' + imageData
      });

      this.storage.set('photos', this.photos);
    },(err) => {
      //Handle error
      console.log("Camera issue: " + err);
    });
  }

  loadSaved(){
    this.storage.get('photos').then((photos) => {
      this.photos = photos || [];
    });
  }
}

class Photo{
  data: any;
}
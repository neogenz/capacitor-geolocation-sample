import { Component } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, CommonModule],
})
export class Tab1Page {
  position$ = new Subject<Position | null>();

  constructor() {
    Geolocation.watchPosition(
      {},
      (position, err) => {
        if (err) {
          console.error('err', err);
          this.position$.next(null);
          return;
        }
        console.debug('position', position);
        this.position$.next(position);
      },
    );
  }
}

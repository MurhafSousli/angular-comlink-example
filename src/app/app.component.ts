import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as Comlink from 'comlink';
import { from, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title: any = of('untitled');

  test;

  ngOnInit() {
    const worker = new Worker('./app.worker', { type: 'module' });
    this.test = Comlink.wrap(worker);
  }

  async run() {
    this.title = from(this.test());
  }
}

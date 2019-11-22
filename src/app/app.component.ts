import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as Comlink from 'comlink';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  textStream = new BehaviorSubject('Text');
  textInput = 'Hello World';
  webWorkerFunc;

  ngOnInit() {
    const worker = new Worker('./app.worker', { type: 'module' });
    this.webWorkerFunc = Comlink.wrap(worker);
  }

  async run() {
    const text = await this.webWorkerFunc(this.textInput);
    this.textStream.next(text);
  }
}

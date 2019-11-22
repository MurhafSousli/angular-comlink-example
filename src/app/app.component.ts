import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { releaseProxy, Remote, wrap } from 'comlink';

declare type TestWorker = (text: string) => string;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {

  textStream = new BehaviorSubject('Text');
  textInput = 'Hello World';

  // Web worker proxy
  proxy: Remote<TestWorker>;

  ngOnInit() {
    // Load the worker
    const worker = new Worker('./app.worker', { type: 'module' });
    // Wrap the worker in a proxy
    this.proxy = wrap<TestWorker>(worker);
  }

  ngOnDestroy() {
    // Detach the proxy and the exposed object from the message channel,
    // allowing both ends to be garbage collected.
    this.proxy[releaseProxy]();
  }

  async run() {
    // Use the web worker proxy
    const text = await this.proxy(this.textInput);
    this.textStream.next(text);
  }
}


import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

@Component({
  selector: 'reddit',
  template: `
    <div>Hello World!</div>
  `
}) 

class RedditApp   {

    constructor() { }
}

bootstrap(RedditApp);
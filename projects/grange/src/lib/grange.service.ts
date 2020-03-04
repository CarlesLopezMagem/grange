import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Traverser } from 'angular-traversal';
import { GrangeCore } from 'grange-core';
import { GrangeState } from './state';
import { PastanagaService } from 'pastanaga-angular';

@Injectable()
export class Grange {

    constructor(
        public traverser: Traverser,
        public core: GrangeCore,
        public store: Store<GrangeState>,
        public ui: PastanagaService,
    ) {
    }

    public initialize() {
        this.traverser.init();
        this.store.dispatch({ type: '[Traversing] Watch'});
    }
}

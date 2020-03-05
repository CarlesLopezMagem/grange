import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoadingInterceptor } from 'grange-core';
import { Resolver, Marker, Normalizer } from 'angular-traversal';
import { RESTAPIResolver, TypeMarker, FullPathNormalizer } from './traversal';
import { StateTraverserModule } from 'ngx-state-traverser';
import { GrangeStateModule } from './state/module';
import { Grange } from './grange.service';

@NgModule({
    declarations: [
    ],
    imports: [
        HttpClientModule,
        StateTraverserModule,
        GrangeStateModule,
    ],
    exports: [
    ]
})
export class GrangeModule {
}

@NgModule()
export class GrangeRootModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: GrangeModule,
            providers: [
                Grange,
                { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
                { provide: Resolver, useClass: RESTAPIResolver },
                { provide: Marker, useClass: TypeMarker },
                { provide: Normalizer, useClass: FullPathNormalizer },
            ],
        };
    }
}

import { Injectable } from '@angular/core';
import { Marker, Normalizer, Resolver } from 'angular-traversal';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { APIService, ResourceService, Error, ConfigurationService} from 'grange-core';

@Injectable()
export class InterfaceMarker extends Marker {
    mark(context: any): string[] {
        return context.interfaces;
    }
}

@Injectable()
export class TypeMarker extends Marker {
    mark(context: any): string[] {
        const markers = [context['@type']];
        if (context.is_folderish) {
            markers.push('folderish');
        }
        return markers;
    }
}

@Injectable()
export class RESTAPIResolver extends Resolver {
    constructor(private api: APIService, private resource: ResourceService) {
        super();
    }

    resolve(path: string, view: string, queryString: string): Observable<any> {
        return this.resource.get(path).pipe(catchError((err: Error) => {
            if (!!err.response && err.response.status === 401) {
                this.resource.traversingUnauthorized.emit(path);
                return of({path, isForbidden: true});
            } else {
                throw err;
            }
        }));
    }
}


@Injectable()
export class FullPathNormalizer extends Normalizer {
    constructor(private config: ConfigurationService) {
        super();
    }

    normalize(path: string): string {
        if (path) {
            let base: string = this.config.get('NORMALIZE_URL');
            base = base.replace('http://', '').replace('https://', '');
            path = path.replace('http://', '').replace('https://', '');
            if (base.startsWith('/') && path.startsWith('http')) {
                path = '/' + path.split('/').slice(3).join('/');
            }
            if (path === base) {
                path = '/';
            } else if (path.startsWith(base)) {
                path = path.substring(base.length);
            }
        }
        return path;
    }
}

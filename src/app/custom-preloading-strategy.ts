import { Route, PreloadingStrategy } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export class CustomPreloadingStrategy implements PreloadingStrategy {
    preload(route: Route, load: () => Observable<any>): Observable<any>{
        if (route.data && route.data['noreload']){
            console.log('CustomPreloadingStrategy not load module');    
            return of(null);
        }else{
            //of(null).pipe(
            //    delay(5000)
            //).subscribe(()=>{
                    console.log('CustomPreloadingStrategy load module');        
                    return load();
            //    }
            //);
        }        
    }
}
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  AsyncSubject,
  ConnectableObservable,
  fromEvent,
  Observable,
  Observer,
  race,
  Subscription,
  throwError,
} from 'rxjs';

import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

import {
  buffer,
  bufferCount,
  bufferTime,
  bufferToggle,
  bufferWhen,
  catchError,
  combineAll,
  concatMap,
  delay,
  finalize,
  map,
  mapTo,
  mergeMap,
  multicast,
  refCount,
  retryWhen,
  scan,
  startWith,
  tap,
  timeout,
} from 'rxjs/operators';
import { empty } from 'rxjs';
import { from, range } from 'rxjs';
import { of, interval, timer } from 'rxjs';
import { filter, last, first, single, ignoreElements } from 'rxjs/operators';
import {
  switchMap,
  debounce,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';
import { throttle, throttleTime } from 'rxjs/operators';
import { audit, auditTime } from 'rxjs/operators';
import { skip, skipLast, skipUntil, skipWhile } from 'rxjs/operators';
import { take, takeLast, takeUntil, takeWhile } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { concat } from 'rxjs/operators';

// Все RxJS операторы подразделяются на категории. Так, различают операторы:

// Создания (of, from, fromEvent, interval);
// Преобразования (map, scan, buffer);
// Фильтрации (filter, take, skip, distinct);
// Объединения (join, merge, zip);
// Обработки ошибок (catchError, retry, onErrorResumeNext);
// Условия (contains, skipUntil, skipWhile, takeUntil, takeWhile);
// Математические (min, max, count, average);
// Утилиты (tap, delay);
// Для Connectable Observable (share, shareReplay, publish).
//  publish()         — is a shortcut for multicast(() => new Subject())
//  publishBehavior() — is a shortcut for multicast(new BehaviorSubject())
//  publishReplay(x)  — is a shortcut for multicast(() => new ReplaySubject(x))
//  publishLast()     — is a shortcut for multicast(new AsyncSubject())
//  share()           — is a shortcut for multicast(() => new Subject()) + refCount()
//  shareReplay(bufferSize)- это оператор многоадресной рассылки, использующий расширение ReplaySubject()

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss'],
})
export class RxjsComponent implements OnInit, OnDestroy {
  mouseinfo: string = 'default';

  subscriptions: Subscription[] = [];

  constructor() {}

  ngOnInit(): void {
    //this.FactoryCreate();
    //this.OtherCreate();

    // this.MethodSubject();
    // this.MethodBehaviorSubject();
    // this.MethodReplaySubject();
    //this.CreatePipeOperator();

    //this.MethodCombine();

    this.MethodCombine();

    this.subscriptions.push(
      // Кнопки
      fromEvent(document.querySelector('#btn'), 'click').subscribe(() =>
        console.log('Button clicked')
      ),
      fromEvent(document.querySelector('#rxjs'), 'click').subscribe(() =>
        console.log('Button rxjs clicked')
      ),
      fromEvent(document.querySelector('#interval'), 'click').subscribe(() =>
        console.log('Button interval clicked')
      ),
      // Текстовое поле
      fromEvent(document.querySelector('#input'), 'input').subscribe(() =>
        console.log(
          'Text change  ' + `${(event.target as HTMLInputElement).value}`
        )
      ),
      fromEvent(document.querySelector('#input'), 'input')
        .pipe(
          debounceTime(500),
          switchMap(async (event: KeyboardEvent) => {
            const response = await fetch(
              `https://api.github.com/search/repositories?q=${
                (event.target as HTMLInputElement).value
              }`
            );
            return await response.json();
          })
        )
        .subscribe((response) =>
          console.log('github search  ' + response.total_count)
        ),
      // События мыши
      fromEvent(document, 'mousemove').subscribe((e: MouseEvent) => {
        let info = 'mousemove change  ' + e.screenX + '  ' + e.screenY;
        this.mouseinfo = info;
        console.log(info);
      }),
      fromEvent(document.querySelector('#canvas'), 'mousemove')
        .pipe(
          map((e: MouseEvent) => ({
            x: e.offsetX,
            y: e.offsetY,
          }))
        )
        .subscribe((event) => {
          console.log(event);
          var canvas = document.querySelector('#canvas') as HTMLCanvasElement;
          canvas.getContext('2d').fillRect(event.x, event.y, 2, 2);
        }),
      fromEvent(document.querySelector('#btnErase'), 'click').subscribe(() => {
        console.log('Button Erase clicked');
        var canvas = document.querySelector('#canvas') as HTMLCanvasElement;
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((item: Subscription) => {
      console.log('unsubscribe all');
      item.unsubscribe();
    });
  }

  FactoryCreate(): void {
    // Фабрика создания Оbservable
    // const o = Observable.create(observer => {
    //   observer.next('Hello1!');
    //   observer.next('Hello2!');
    //   observer.next('Hello3!');
    //   setInterval(_ => { observer.next('Hello500!'); }, 500);
    //   setInterval(_ => { observer.error('Exception!'); }, 3000);
    //   setInterval(_ => { observer.complete(); }, 3100);
    // });

    const o = new Observable((observer) => {
      observer.next('Hello1!');
      observer.next('Hello2!');
      observer.next('Hello3!');
      setInterval((_) => {
        observer.next('Hello500!');
      }, 500);
      setInterval((_) => {
        observer.error('Exception!');
      }, 3000);
      setInterval((_) => {
        observer.complete();
      }, 3100);
    });

    o.subscribe({
      next: (value: string) => console.log('Next:', value),
      complete: () => console.log('Complete!!!'),
      error: (error: any) => console.log('Error:', error),
    });
  }

  OtherCreate(): void {
    // Другие способы создания Observable
    const o = of(5, 10, 15, 20, 25, 30);
    //const o = from([5, 10,15,20,25,30,35]);
    //const o = from(Promise.resolve(5));
    //const o = fromEvent(document.body, 'mousemove');
    //const o = timer(500,500); // пауза 500 мс и выдача данных каждые 500 мс
    //const o = interval(500);  // выдача данных каждые 500 мс
    //const o = range(0,100);   // выдача конечного диапазона чисел
    //const o = empty();        // передет уведомление
    //const o = throwError('My error');

    o.subscribe({
      next: (value: any) => console.log('Next:', value),
      complete: () => console.log('Complete!!!'),
      error: (error: any) => console.log('Error:', error),
    });
  }

  MethodSubject(): void {
    var stream = new Subject();
    stream.next('subject 0');
    stream.next('subject 1');
    stream.next('subject 2');
    stream.subscribe((value) => console.log(value));
    stream.next('subject 4');
    stream.next('subject 5');
    stream.next('subject 6');
  }

  MethodBehaviorSubject(): void {
    var stream = new BehaviorSubject('behavior subject 0');
    stream.next('behavior subject 1');
    stream.next('behavior subject 2');
    stream.next('behavior subject 3');
    stream.subscribe((value) => console.log(value));
    stream.next('behavior subject 4');
    stream.next('behavior subject 5');
    stream.next('behavior subject 6');
  }

  MethodReplaySubject(): void {
    var stream = new ReplaySubject(1);
    stream.next('replay subject 1');
    stream.next('replay subject 2');
    stream.next('replay subject 3');
    stream.subscribe((value) => console.log(value));
    stream.next('replay subject 4');
    stream.next('replay subject 5');
    stream.next('replay subject 6');
  }

  MethodAsyncSubject(): void {
    var stream = new AsyncSubject();
    stream.subscribe((value) => console.log('AsyncSubject', value));
    stream.next(7);
    stream.next(8);
    stream.next(9);
    setTimeout(() => stream.unsubscribe(), 3000);
  }

  MethodMulticast(): void {
    const subject = new Subject();
    const stream = from([2, 4, 6]).pipe(multicast(subject));
    stream.subscribe((value) => console.log('1st', value));
    stream.subscribe((value) => console.log('2st', value));
    stream.subscribe((value) => console.log('3st', value));
    (stream as ConnectableObservable<any>).connect();
  }

  CreatePipeOperator(): void {
    const takeNth1 = (n: number) => <T>(source: Observable<T>) =>
      source.pipe(filter((value, index) => index === n - 1));

    const takeNth = (n: number) => <T>(source: Observable<T>) =>
      new Observable<T>((observer) => {
        let current = 1;

        return source.subscribe(
          (vl) => {
            if (current++ === n) {
              observer.next(vl);
              observer.complete();
            }
          },
          (err) => observer.error(err),
          () => observer.complete()
        );
      });
    from(['Jack', 'Jane', 'Jim', 'Jason'])
      .pipe(takeNth(3))
      .subscribe({
        next: (value: string) => console.log('Next:', value),
        complete: () => console.log('Complete!!!'),
        error: (error: any) => console.log('Error:', error),
      });
  }

  MethodMulticastRefCount(): void {
    const stream = interval(500).pipe(multicast(new Subject()), refCount());
    let subscription1: Subscription,
      subscription2: Subscription,
      subscription3: Subscription;
    subscription1 = stream.subscribe((value) => console.log('1st', value));
    setTimeout(() => {
      subscription2 = stream.subscribe((value) => console.log('2st', value));
    }, 1000);
    setTimeout(() => {
      subscription3 = stream.subscribe((value) => console.log('3st', value));
    }, 2000);

    setTimeout(() => subscription1.unsubscribe(), 2000);
    setTimeout(() => subscription2.unsubscribe(), 3000);
    setTimeout(() => subscription3.unsubscribe(), 4000);
  }

  MethodFilter(): void {
    // Методы фильтрации

    // Операторы серии Audit
    // ожидает завершение функции и инициирует выдачу последнего значения
    //const o = interval(250).pipe(audit((value) => interval(1000))); // Результат:  4, 9, 14, 19, 24...
    //const o = timer(0,200).pipe(auditTime(1000));

    // Операторы серии Throttle
    // инициирует выдачу последнего полученного значения и ожидает завершение функции
    //const o = interval(250).pipe(throttle((value) => interval(1000))); // Результат:  0, 5, 10, 15, 20...
    //const o = timer(0,200).pipe(throttleTime(1000));

    // Операторы серии Buffer
    // сохраняет все принятые значения и инициализирет выдачу после выполнения функции
    //const o = interval(250).pipe(buffer(interval(1000)));
    //const o = interval(1000).pipe(bufferCount(5)); // [0, 1, 2, 3, 4], [5, 6, 7, 8, 9],
    //const o = interval(1000).pipe(bufferTime(5000));
    // параметр запуска и останова функции
    // const o = interval(500).pipe(
    //   bufferToggle(timer(0, 2000).pipe(take(3)), (value) =>
    //     of(value).pipe(delay(2000))
    //   )
    // );
    const o = interval(500).pipe(
      take(8),
      bufferWhen(() => interval(2100).pipe(take(2)))
    );

    //const o = range(0,100).pipe(filter(number=> number>50));
    //const o = range(0,100).pipe(first(number=> number>50));
    //const o = range(0,100).pipe(last(number=> number>50));
    //const o = range(0,100).pipe(single(number=> number>50));
    //const o = range(0,100).pipe(ignoreElements());
    //const o = range(0,100).pipe(debounce(number=> timer(1000 * number)));
    //const o = range(0,100).pipe(debounceTime(1000));
    //const o = from([0,1,0,0,1,1,100]).pipe(distinctUntilChanged());

    //const o = timer(0, 200).pipe(debounceTime(200));

    o.subscribe({
      next: (value: any) => console.log('Next:', value),
      complete: () => console.log('Complete!!!'),
      error: (error: any) => console.log('Error:', error),
    });
  }

  MethodCombine(): void {
    // Методы кобинирования
    // const o = interval(500).pipe(
    //   map((value) => interval(250).pipe(take(3))),
    //   take(3),
    //   combineAll()
    // );

    // const source$ = interval(1000).pipe(take(2));
    // const example$ = source$.pipe(
    //   map((val) =>
    //     interval(1000).pipe(
    //       map((i) => `Result (${val}): ${i}`),
    //       take(3)
    //     )
    //   )
    // );
    // const o = example$.pipe(combineAll());

    //const o = combineLatest(of(1, 2, 3), of(4, 5, 6), of(7, 8, 9));

    // const o = [1, 5, 10].map(
    //   n => of(n).pipe(
    //     delay(n * 1000),   // emit 0 and then emit n after n seconds
    //     startWith(0),
    //   )
    // );

    // const o = interval(500).pipe(
    //   tap(value=>console.log(value)),
    //   take(10));

    // const o = interval(500).pipe(
    //   tap(value=>console.log(value)),
    //   take(10),
    //   takeLast(3)
    // );

    // const o = interval(500).pipe(
    //   tap((value) => console.log(value)),
    //   takeWhile((value) => value < 10),
    //   takeLast(3)
    // );

    //const timerOne = timer(1000, 4000).pipe(take(3));
    //const timerTwo = timer(2000, 4000).pipe(take(3));
    //const timerThree = timer(3000, 4000).pipe(take(3));
    //const o = combineLatest(timerOne, timerTwo,timerThree);
    //const o = zip(timerOne, timerTwo,timerThree);
    //const o = forkJoin(timerOne, timerTwo,timerThree);

    const timerOne = timer(10, 1000).pipe(take(3), mapTo('first'));
    const timerTwo = timer(0, 100).pipe(take(3), mapTo('second'));
    //const o = timerOne.pipe(concat(timerTwo));
    //const o = timerOne.pipe(merge(timerTwo));
    //const o = timerOne.pipe(startWith(5));
    //const o = timerOne.pipe(withLatestFrom(timerTwo));
    //const o = timerOne.pipe(pairwise());
    const o = race(timerOne, timerTwo);

    o.subscribe({
      next: (value: any) => console.log('Next:', value),
      complete: () => console.log('Complete!!!'),
      error: (error: any) => console.log('Error:', error),
    });
  }

  MethodTransform(): void {
    // Методы трансформации
    //const o = of ({
    //  name:'Viktor',
    //  age:34
    //}).pipe(pluck('name'));

    //const o = of ( 1,2,3,4,5).pipe(reduce((acc, current)=> acc+ current,0)); // работает только по окончанию выполнения стрима
    //const o = of ( 1,2,3,4,5).pipe(scan((acc, current)=> acc+ current,0));   // работает по ходу выполнения стрима

    //const o = range (0,100).pipe(map(number=>number*100));
    //const o = range (0,100).pipe(mapTo('Hi'));
    const clicks = fromEvent(document, 'click');
    // flatMap == mergeMap
    //const o = clicks.pipe(flatMap(_=>interval(1000)));
    //const o = clicks.pipe(switchMap(_=>interval(1000))); // передача управления другому потоку
    //const o = clicks.pipe(exhaustMap(_=>interval(1000)));
    const o = clicks.pipe(concatMap((_) => interval(1000)));

    o.subscribe({
      next: (value: any) => console.log('Next:', value),
      complete: () => console.log('Complete!!!'),
      error: (error: any) => console.log('Error:', error),
    });
  }

  MethodErrors(): void {
    // Обработка ошибок
    const o = interval(1000).pipe(
      mergeMap((val) => {
        if (val > 3) {
          return throwError('Error less 3');
        }
        return of(val);
      }),
      catchError((error) => {
        console.log(error);
        return of(false);
      }),
      retryWhen((errorObservable) => errorObservable.pipe(delay(3000)))
    );

    o.subscribe({
      next: (value: any) => console.log('Next:', value),
      complete: () => console.log('Complete!!!'),
      error: (error: any) => console.log('Error:', error),
    });
  }

  MethodOther(): void {
    // Различные утилиты
    // const o = range(0, 100).pipe(tap(n=>{console.log(`push ${n}`)})); // добавление сайд-эффертов, вызывается на каждой итерации
    // const o = range(0, 100).pipe(delay(3000), tap(n=>{console.log(`push ${n}`)}));
    // const o = interval(500).pipe(delay(3000), tap(n=>{console.log(`push ${n}`)}));
    // const o = range(0, 100).pipe(delay(5000),tap(n=>{console.log(`push ${n}`)}), timeout(3000));
    const o = range(0, 100).pipe(
      delay(5000),
      tap((n) => {
        console.log(`push ${n}`);
      }),
      timeout(3000),
      finalize(() => console.log('Finish!!!'))
    );

    //o.toPromise()

    o.subscribe({
      next: (value: any) => console.log('Next:', value),
      complete: () => console.log('Complete!!!'),
      error: (error: any) => console.log('Error:', error),
    });
  }
}

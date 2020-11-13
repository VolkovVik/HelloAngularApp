import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, EmbeddedViewRef, Injector, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { DinamicComponent } from '../dinamic/dinamic.component';


// Класс ViewRef отражает представления, которые отображаются непосредственно в шаблоне внутри контейнера.
// В Angular различают два вида представлений типа ViewRef:
//  Embedded Views - относятся к элементу <ng-template />;
//  Host Views - относятся к компоненту и инициализируются в момент динамического создания компонентов.
// Embedded и Host Views размещаются в контейнере ViewContainerRef.
// Оба типа представлений являются подтипами ViewRef. После создания такие представления могут быть вставлены в элемент типа ViewContainerRef или, проще говоря, контейнер.

// ViewContainerRef предусмотрен ряд методов:
// insert(viewRef: ViewRef, index?: number) - вставляет представление viewRef на позицию index (если index не указан, то вставка осуществляется в конец);
// clear() - удаляет все представления из контейнера;
// get(index: number) - возвращает представление типа ViewRef по заданному индексу;
// indexOf(viewRef: ViewRef) - возвращает индекс переданного представления;
// detach(index?: number) - удаляет представление по конкретному индексу, если индекс не передан - удаляет последнее представление;
// move(viewRef: ViewRef, currentIndex: number) - меняет индекс представления viewRef на currentIndex.

// ComponentRef
// Ссылка типа ComponentRef возвращается при динамическом создании компонента с использованием сервиса ComponentFactoryResolver.

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, AfterViewInit {

  @ViewChild('title', { read: ElementRef }) title: ElementRef;
  @ViewChild('tpl') _tpl: TemplateRef<any>;

  @ViewChild('views', { read: ViewContainerRef }) views: ViewContainerRef;
  @ViewChild('tpl1') tpl1: TemplateRef<any>;

  items: any = {
    $implicit:['Item 1'], 
    local:['Item 1', 'Item 2', 'Item 3']};
  myContext = {$implicit: 'World', localSk: 'Svet'};

  constructor(
    private host: ElementRef,
    private componentFactory: ComponentFactoryResolver,
    private injector: Injector,
    private changeDetection: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    console.log('ElementRef', this.title.nativeElement, this.title.nativeElement.textContent);
    console.log('ElementRef', this.host.nativeElement, this.host.nativeElement.textContent);
    console.log('TemplateRef', this._tpl.elementRef);

    let embeddedView = this._tpl.createEmbeddedView({ fromContext: 'TemplateRef Demo' })
    console.log('EmbeddedView', embeddedView);
    console.log('TemplateRef', this._tpl.elementRef);

    console.log('ViewContainerRef', this.views);
    console.log('TemplateRef', this.tpl1);
    
    // embedded view
    this.views.clear();
    const view = this.tpl1.createEmbeddedView({
      contextTitle: 'Template title',
      contextAutor: 'Template autor'
    });
    this.views.insert(view);

    // host view
    const factory = this.componentFactory.resolveComponentFactory(DinamicComponent);
    const componentRef = factory.create(this.injector);
    this.views.insert(componentRef.hostView, 0);
    
    this.changeDetection.detectChanges();

    console.log('ViewContainerRef', this.views);
    console.log('TemplateRef', this.tpl1);
  }

  ngOnInit(): void {}
}

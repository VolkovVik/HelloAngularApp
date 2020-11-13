import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { CustomPreloadingStrategy } from './custom-preloading-strategy';
import { ReversePipe } from './pipes/reverse/reverse.pipe';

import { LogClickDirective } from './directives/log-click/log-click.directive';
import { TestingComponent } from './components/testing/testing.component';
import { BasicComponent } from './components/basic/basic.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { ChildComponent } from './components/child/child.component';
import { LifecycleComponent } from './components/lifecycle/lifecycle.component';
import { TemplateValueComponent } from './components/template-value/template-value.component';
import { BoldDirective } from './directives/bold/bold.directive';
import { DelayDirective } from './directives/delay/delay.directive';
import { WhileDirective } from './directives/while/while.directive';
import { ColorDirective } from './directives/color/color.directive';
import { DirectiveComponent } from './components/directive/directive.component';
import { DinamicComponent } from './components/dinamic/dinamic.component';
import { UsersService } from './services/users/users.service';
import { LogService } from './services/log/log.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-inteceptor/http-interceptor.service';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UsersComponent } from './components/users/users.component';
import { ModuleComponent } from './components/module/module.component';
import { HttpService } from './services/http/http.service';
import { HttpmoduleComponent } from './components/httpmodule/httpmodule.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { ViewComponent } from './components/view/view.component';
import { AnimationComponent } from './components/animation/animation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


// declarations: классы представлений (view classes), которые принадлежат модулю. 
// Angular имеет три типа классов представлений: компоненты (components), директивы (directives), каналы (pipes)
// exports: набор классов представлений, которые должны использоваться в шаблонах компонентов из других модулей
// imports: другие модули, классы которых необходимы для шаблонов компонентов из текущего модуля
// providers: классы, создающие сервисы, используемые модулем
// bootstrap: корневой компонент, который вызывается по умолчанию при загрузке приложения

// DI
// 1. Provider    описание зависимостей
// 2. Injector    создание сущностей
// 3. Dependancy  зависимость

// DI Provider
// const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');
// DI Injection
// import { ReflectiveInjector, Injector } from '@angular/core';
// const injector: Injector = ReflectiveInjector.resolveAndCreate([{ provide: UserService, useClass: UserService }]);
// const userService = injector.get(UserService);

@NgModule({
  declarations: [
    AppComponent,
    ReversePipe,
    LogClickDirective,
    TestingComponent,
    BasicComponent,
    HeaderComponent,
    ChildComponent,
    LifecycleComponent,
    TemplateValueComponent,
    BoldDirective, 
    DelayDirective, 
    WhileDirective, 
    ColorDirective,
    DirectiveComponent,
    DinamicComponent,
    UsersComponent, 
    UserCardComponent, ModuleComponent, HttpmoduleComponent, ViewComponent, AnimationComponent
  ],
  exports:[],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [CustomPreloadingStrategy,
    UsersService, 
    LogService,
    HttpService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
    // Зависимости представлены в виде {token, receipt}
    // Внедрение зависимости класса
    // { provide: UserService, useClass: UserService } => сокращенная форма записи UserService,
    // Внедрение зависимости поля
    // { provide: API_BASE_URL, useValue: 'api.mysite.com' },
    // Внедрение зависимости фабрики
    // { provide: UserService, useFactory: function() { return new UserService(); }, deps: ['HttpClient'] },
    // Внедрение зависимости уже определенного ранее провайдера
    // возможно использовать для ограничения зоны действия
    // { provide: API_BASE_URL, useExisting: UserService }],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

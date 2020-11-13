import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AnimationComponent } from './components/animation/animation.component';
import { BasicComponent } from './components/basic/basic.component';
import { DirectiveComponent } from './components/directive/directive.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpmoduleComponent } from './components/httpmodule/httpmodule.component';
import { ModuleComponent } from './components/module/module.component';
import { UsersComponent } from './components/users/users.component';
import { ViewComponent } from './components/view/view.component';
import { CustomPreloadingStrategy } from './custom-preloading-strategy';

const routes: Routes = [
  { path: 'basic', component: BasicComponent },
  { path: 'component', component: HeaderComponent },
  { path: 'directive', component: DirectiveComponent },
  { path: 'services', component: UsersComponent },
  { path: 'module', component: ModuleComponent },
  { path: 'rect', component: HttpmoduleComponent }, 
  { path: 'view', component: ViewComponent },  
  { path: 'animation', component: AnimationComponent },  
  { path: 'admin', data: { noreload: true }, loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
  { path: 'rforms', data: { noreload: false }, loadChildren: () => import('./modules/rforms/rforms.module').then(m => m.RformsModule) },
  { path: 'rxjs', data: { noreload: false }, loadChildren: () => import('./modules/rxjs/rxjs.module').then(m => m.RxjsModule) },
  { path: 'github', data: { noreload: false }, loadChildren: () => import('./modules/github/github.module').then(m => m.GithubModule) },
  { path: 'pages', data: { noreload: false }, loadChildren: () => import('./modules/pages/pages.module').then(m => m.PagesModule) },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '/'}  
];

@NgModule({
  //imports: [RouterModule.forRoot(routes)],
  //imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadingStrategy })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

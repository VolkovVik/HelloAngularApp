# AngularFirstApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Command Angular and TypeScript

Set-ExecutionPolicy RemoteSigned

```sh
npm install typescript
npm install -g @angular/cli
npm install -g npm
```

```sh
ng --version
node --version
tsc -v
```

```sh
tsc name.ts - create name.js
node name.js - run name.js with node
```

```sh
npm run ng - angular не установлен глобально
ng new NameProject --routing - create project
ng g module NewMoudle - create modul
ng generate module customers --route customers --module app.module
```

```sh
ng g component test-module/new-component - create component (.ts, .html, .css)
ng g service test-module/new-component - create service
ng g directive test-module/new-component - create directive
ng g guard test-module/new-component - create directive
ng g component modules\orders\component\dinamic --module=modules\orders\orders.module
```

```sh
npm uninstall -g angular-cli
npm cache verify
npm install -g @angular/cli@latest
```

```sh
ng update @angular/core
ng update rxjs
```

Используйте npm outdated для обнаружения устаревших зависимостей
Используйте npm update для выполнения безопасных обновлений зависимостей
Используйте npm install <packagename>@latestдля обновления до последней основной версии пакета
Используйте npx npm-check-updates -u и npm install для обновления всех зависимостей до последних основных версий

```sh
rm -rf node_modules
npm uninstall --save-dev @angular-cli
npm install --save-dev @angular/cli@latest
npm install
```

```sh
$ npm install -g npm-check-updates
$ ncu -u
$ npm install
```

```sh
$ npx npm-check-updates -u
$ npm install
```

https://github.com/dotnet/aspnetcore/issues/17277

```sh
dotnet new angular -n HelloWorld
cd HelloWorld\ClientApp
npm install
npm outdated
npx npm-check-updates -u
npm install
ng serve --open
dotnet run
```

## Command GIT

```sh
git --version
```

```sh
git config --list
git config --global user.name
git config --global user.email
```

```sh
git init
git status
git status --untracked-files=all
```

```sh
git add <name file> add stage
git add . add stage all files
git add ".cs" add stage cs files
git rm --cached <name file> delete stage
git rm -r --cached . delete stage all files
```

```sh
git restore <name file> отменить изменения
git commit -m <message> add stage files to commit
git commit -a -m <message> add all files to commit
```

```sh
git branch show all branches
git branch -v show last commit in all branches
```

```sh
git remote show all remove branches
git remote -v
```

```sh
git branch <name branch> add branch
git branch -D <name branch> delete branch
git checkout <name branch> switch branches
git checkout -b <name branch> add and switch branch
git merge <name branch> подтянуть изменения из <name branch>
```

```sh
git remote add origin <url>
git push -u origin <name branch>
git clone <url>
```

```sh
git ferch
git pull
```

```sh
git log
git log --pretty=format:"%h - %an, %ar :%s"
git log --since=2.weeks
git log -p -2
```

команда прерывания Q

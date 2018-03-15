# Sharinglife

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## 样式参考：http://www.zuidaima.com/share/3704554819898368.htm

## http://172.4.88.129:8031/swagger-ui.html

## git 命令
git clone /git pull / git status/git add . /git commit -m"xxx" //git push

## 使用scss
1.新建项目: ng new my-project --style=sass
2.现有项目: ng set defaults.styleExt scss   并将.css后缀改为 .scss

## cmd 生成组件
ng generate component my-comp - 生成一个新组件，同时生成其测试规格和相应的HTML/SCSS文件
ng generate service my-service - 生成一个新服务
ng generate route my-route - 生成一个新路由
ng generate class my-class - 生成一个简易的模型类
ng generate pipe my-pipe - 生成一个新管道
ng generate directive my-directive - 生成一个新指令
ng generate enum my-enum - 生成一个枚举

## 引入第三方 bootstrap
1.npm install bootstrap --save  2.npm install @types/bootstrap --save-dev 注意：使用cnpm安装 真实的路径是：../node_modules/_bootstrap@3.3.7@bootstrap/dist/css/bootstrap.css
angular-cli.json文件:
"styles": [ "../node_modules/bootstrap/dist/css/bootstrap.css"],
"scripts": [ "../node_modules/bootstrap/dist/js/bootstrap.min.js"],

## 引入第三方 bootstrap3 插件js  参考 https://valor-software.com/ngx-bootstrap/#/
1.npm i ngx-bootstrap --save
2.app.module.ts
    import { TooltipModule } from 'ngx-bootstrap/tooltip';
    @NgModule({
      imports: [
        ...
        TooltipModule.forRoot(), //bootstrap3 单独用 单独引用
        ...
      ],
      declarations: []
    })

## 引入第三方 bootstrap4 插件js
1.npm i @ng-bootstrap/ng-bootstrap --save
2.app.module.ts
    import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
    @NgModule({
      imports: [
        NgbModule.forRoot(), // bootstrap4 一次引用就行
      ],
      declarations: []
    })

### 蒲公英 https://pgy.oray.com/console/network/view?networkid=218810   客户端登陆：20039680:001/chupeng1991	
### 后端swagger:  http://172.4.88.129:8031/swagger-ui.html
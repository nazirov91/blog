---
templateKey: blog-post
title: Angular 8 Crash course
date: '2020-02-24T15:47:02-05:00'
description: >-
  Angular has been around for a long time. And the fact that it is backed by
  Google, has been one of the main reasons why large number of businesses and
  developers opt in to use it to build their front end applications. There is no
  reason to talk about the features and advantages of this tool, because most
  likely you have already made your decision. So let's get to the details.
tags:
  - Angular
  - Angular 8
  - Angular 9
  - Google
  - UI
  - UX
  - Front-end
  - HTML
  - CSS
  - JavaScript
---
![\[HEADER IMAGE\]](https://drive.google.com/uc?export=view&id=1GixrKOW78Hl5zsQhYJQ0UQR0RS4ScNXW)

#### Outline
1. Architecture Overview
2. Modules
3. Components
4. Directives
5. Services and Dependency injection
6. Routing

There are a bunch of tutorials out there on Angular that covers too little or too much of the framework. In this article, we will try to discuss just the right amount of it so that our readers with low attention span do not lose patience and skip to the next blog on google. But we will address enough concepts to help them feel like they genuinely learned something practical and useful at the end. 

Angular has been around for a long time. And the fact that it is backed by Google has been one of the main reasons why a large number of businesses and developers opt-in to use it to build their front end applications. There is no reason to talk about the features and advantages of this tool because most likely you have already made your decision. So let's get to the details.

## Architecture

**Angular** is a front end framework made out of a collection of modules. In angular language, those modules are called as **NgModules** (why not call them just modules, right?). An angular app must have at least one module, also called the root module.

![\[Modules\]](https://drive.google.com/uc?export=view&id=1NLMkGs3SALecufNECMW8nzEsR44BLGOj)

NgModules provide compilation context for **Components**. Compilation context is just a fancy way of saying *grouping related files for to the Typescript to compile.* Components work alongside with templates and define views in angular app. **Templates** are HTML files, and Components are just TypeScript classes. Components must be decorated with TypeScript decorator (@) so that the angular app knows those are components an not just regular typescript classes.

Also, there should be a way for the components and templates to exchange information. Well, that way is called **binding**. Angular also has a bidirectional binding, which means the communication can go both ways. 

![\[Module zoom in\]](https://drive.google.com/uc?export=view&id=1jdVDwrCkduJOhxVJMqlOlnaYVTuljFGO)

In order to avoid clutter and redundancy, angular provides a way to injects **Services** into the components. Services are typically functions that can be shared across components. For example, http call wrapper can be created as a service and injected into any component we want and that component can use the service to execute http calls.

Templates use special html tags called **Directives**. Directives construct or re-construct the DOM structure by manipulating the DOM elements.

```html
<h2>Products</h2>  
<div *ngFor="let cat of cats">  
	<h3> {{ cat.name }} </h3>  
</div>
```

In the example given above, the **ngFor** is one of the angular directives for looping through a list and displaying each item's details. Notice the asterisk sign at the beginning. All of the angular directives are identified by placing the asterisk sign in front.

x![enter image description here](https://drive.google.com/uc?export=view&id=1YCOzGOPOh3NR-HWj1pVMS_aBdlaBOsS7)

Before we move on to the next topic, let's create an angular application to refer to.

Steps:
1. Make sure you have the latest version of NodeJS
2. Install angular CLI `$ npm install -g @angular/cli`
3. Navigate to the folder you want to create the project in and run `ng new MyCoolAngularApp`

You should end up with something like this:

![\[App structure\]](https://drive.google.com/uc?export=view&id=1aWSd5L882-IXpDkrrbB9IW5P0DiCq2Sh)

## NgModules
**NgModules** are primarily busy with importing functionalities of other NgModules and also exporting functionalities of their own.

Let's decrypt the default `app.module.ts` file we got when we created our angular project.

```ts
// imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

The key element in this file is the @NgModule decorator with its metadata. The rest of the items in the file are pretty much self-explanatory.

1. **declarations** - declares wich components and directives belong to that module. Initially, we have only one component *AppComponent*. So it needs to be declared in the module for the angular compiler to recognize it.
2. **imports** - imports other modules into the module. There are no other modules defined in this case, that is why it is empty
3. **providers** - provides *services* for the components in this specific module to use
4. **bootstrap** - defines the entry point for the application. Typically we include all components under one roof - AppComponent. That's is why it is listed there

## Components

Components are the critical building blocks in angular projects. A component defines a class that contains some application data and logic. Then it is associated with an HTML template to define a view to be displayed in a target environment.

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-crash-course';
}
```

If you look at the `@Component` metadata of the class above, you see an object with three key-value pairs attached. Let's clarify their purpose:

1. `selector` - this is how we refer to the component from the DOM
2. `templateUrl` - link to the HTML template associated with this component
3. `styleUrls` - link to the css files needed for this specific component

## Directives
A directive is just a Typescript class with **@Directive** decorator. As we already know, angular templates are dynamic. When angular renders the templates, it transforms the DOM elements according to the instructions given by the directives.

There are two different types of directives
1. **Structural directives** 
2. **Attribute directives** 

Examples of structural directives
- ngFor
- ngIf
- ngSwitchCase
- ...

Attribute directives
- ngClass
- ngStyle
- ngModel

## Services and dependency injection
Services are helper classes that allow to create lean and clean components. The best way to craete a new service is by using the angular cli.
* `$ ng generate service fetcher`

Once we run the command, the cli will generate us a couple of files
- `fetcher.service.ts`
- `fetcher.service.spec.ts`

*fetcher.service.spec.ts* file is for testing purposes, which we are not going to cover in this article. The other file is actually the service file with a class and **@Injectable** decorator.

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetcherService {
  constructor() { }
  
  getData(){
	  return "Some data";
  }
}
```

`providedIn: 'root'` line indicates that the service is available on the application root level and can be used by any module.

Before using the service in a component, we have to include it in the `providers` section of the module we want to use the service in.

```ts
// imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  
  // Add FetchService to the providers 
  providers: [FetchService],
  
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Now we can declare this service in the constructor of the component and call the methods given in the service:

```ts
import { Component } from '@angular/core';
import { FetcherService } from './fetcher.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private fetcherService: FetcherService){}
  title = this.fetcherService.getData();
}

```

## Router module
**Router** module is an NgModule in angular with designated directives and services that provide navigation between views. There are 3 main steps to implement a navigation:

1. Configure the routes
2. Add router outlet
3. Add links

Before configuring the routes, let's add a new component called *About*.
`$ ng generate component about`

Then we add a new file named `app-routing.module.ts` and paste the following code:

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {path: "", component: AppComponent},
  {path: "about", component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

First, in the second line of the file we are importing the router module of angular/core.
`import { Routes, RouterModule } from '@angular/router';`

Second we define the actual routes and components to render when those routes are visited:
```ts
const routes: Routes = [
  {path: "about", component: AboutComponent}
];
```

Then we have to send the routes to the RouterModule's `forRoot` method and import it in the NgModule:
```ts
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
```
Finally we have to include the `router-outlet` directive in the app component's template.

```ts
//app.component.html
<h1>
	Welcome to {{ title }}!
</h1>
<router-outlet></router-outlet>
```

When we navigate from the main page to `/about`, angular will render the About component for us.

![\[About works pic\]](https://drive.google.com/uc?export=view&id=1S1QLF20oKY9W3jLhlNtV0ip6lWd-SJn1)


Cheers!

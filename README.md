# MyAnimeCatalog
This was my project for defense exam of completed **Front-End HTML/Angular Course**. Its mainly meant to showcase what I have learned using the angular framework and HTML/CSS design layouts. It also communicates to a self made backend built on **Django Rest Framework**. The backend is committed to a seperate [branch](https://github.com/grigor-stoyanov/MyAnimeCatalog/tree/backend).


## Table of contents
* [General info](#general-info)
* [Features](#features)
* [Structure](#structure)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [Setup](#setup)
* [Status](#status)
* [Other](#other)

## General Info
The app is basically a [MyAnimeList](https://myanimelist.net/) clone with an attempt at a more **updated** and **modern** design style. It functions as a review/forum **SPA** for shows and featers a custom user service and themes(dark/light) **preserved** trough the session/life of the application.There are different views for authenticated/unaothenticated users which are **segregated** in lazy loaded modules and also **resolve** data during navigation and **guard** for unaothorized access. Template and Reactive Forms with both front-end and server side **validation** which is dynamically displayed. Each view features custom components **Carousel**(Endless Horizontal Scroll which fetches paginated Data), **Editable** Text Area (Using CKEditor to style text in html format), **Fully Customizable** Profile (username with unique together 4 number code), **Reactive** loading of user posts and comments and some others still in implementation. The authentication for the requests uses **Token Authenticatoin** which is saved troughout the session of the user and shared between the view states trough **Observables and RxJS**.

## Features
* All CRUD Operations
* Lazy Loaded Rotues and Navigation with resolvers
* Token Authentication with interceptors
* Asynchronous Data Persistance trough RxJS and Observables
* Interactive Components with pipes, directives and EventListeners
* Custom TypeScript Interfaces for database model
* HTML/CSS design layout with flex and css variables
* Asynchronous request services to RESTful API with error handling

## Structure
The App Module acts as a body of the document and provides base structure of the document.    
The core is comprised of static components that rarely change or usually part of the body.  
Main Module contains the primary Router Outlet for the view model.  
Shared Module Includes Components and directives shared between all other Modules.  
Auth Module is responsible for all authentication and user realted views.    
Main is comprised of SubModules with components relating to their respective views.  
Each SubModule has its own base RootRoute and ChildrenRoutes.  

.
├── src
│   ├── app
│   │   ├── auth
│   │   │   ├── login
│   │   │   ├── profile
│   │   │   └── register
│   │   ├── core
│   │   │   ├── error404
│   │   │   ├── footer
│   │   │   └── header
│   │   ├── interfaces
│   │   ├── main
│   │   │   ├── home
│   │   │   │   ├── carousel
│   │   │   │   ├── carousel-item
│   │   │   │   ├── home
│   │   │   │   └── search
│   │   │   ├── main
│   │   │   └── review
│   │   │       ├── anime-details
│   │   │       ├── new-review
│   │   │       ├── post-comments
│   │   │       ├── review
│   │   │       └── review-posts
│   │   ├── services
│   │   │   ├── design
│   │   │   ├── fetch
│   │   │   └── storage
│   │   └── shared
│   │       ├── loader
│   │       ├── spinner
│   │       ├── star-rating
│   │       ├── toggle
│   │       └── validators
│   ├── assets
│   └── environments
└── temp


## Technologies
* [Angular 14](https://v14.angular.io/docs)
* [DRF 3](https://www.django-rest-framework.org/)  
* [RxJS](https://rxjs.dev/guide/overview)
* [TypeScript](https://www.typescriptlang.org/docs/)
* [CKEditor5](https://ckeditor.com/docs/ckeditor5/latest/index.html)


## Screenshots


## Setup

Clone repo(```git clone https://github.com/grigor-stoyanov/tasktell```)

### Prerequesites
DRF backend service and [Python](https://www.python.org/downloads/)
Clone Backend Branch(```git clone https://github.com/grigor-stoyanov/MyAnimeCatalog.git backend```)
Install python dependencies from new folder(```pip install -r requirements.txt```)
> **Note** This will install them globally if you want to install it locally create a virtual environment see [backend branch](https://github.com/grigor-stoyanov/MyAnimeCatalog/tree/backend).
Start REST server(```python -m manage runserver```)

[Angular CLI](https://github.com/angular/angular-cli) version 14.2.8
You can install this with project's dependencies
[NodeJS](https://nodejs.org/en/) version minimum of 14.15


### Installation
1. Install Dependencies(```npm install --save-dev```)  
2. From here if you have [Angular CLI](https://github.com/angular/angular-cli) globally you cans tart with(```ng serve```) or just (```npm start```)


## Status
Project is still in development currently working on some key features:
- [ ] Search bar with dynamic suggestions and filtering
- [ ] Review Posts CRUD Operations and point sorting system
- [ ] Updated View of User Profiles with Follow and Recent Posts Options
- [ ] Responsive Design


## Other
| ![image](https://user-images.githubusercontent.com/76039296/217279449-93faa114-667a-4183-96cb-60d5393da610.png) |
|-|
[Linkedin](https://www.linkedin.com/feed/)
[Certificate](https://softuni.bg/certificates/details/152839/edf0c74f)
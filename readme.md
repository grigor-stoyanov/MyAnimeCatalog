# MyAnimeCatalog(Backend)

This is the backend section of the project built mainly on DRF
uses corsheaders library to cross origin server errors during request.

## Overview
Backend provides RESTful api service with django rest framework
returning serialized data in correct json structure according to request.

Features a custom backend and authentication allowing non unique usernames
and auto generated user tags which together with username provide a unique 
identifier.  

Also uses DRF built-in Authentication Token functionality and features custom permissions. 

Comes with default mysql database file configuration with pre-applied migrations.  


## Setup


### Prerequesites
[Python3](https://www.python.org/downloads/)  
Set up a virtual environment  
* venv(```python -m venv .venv```)  

Linux(```source .venv/bin/activate```)  
Windows(```.venv/Scripts activate```)  

Comes with Default Database sqlite configuration  

### Installation
1. Install Dependencies(```pip install -r requirements.txt```)  
You can skip this step if you are using the default configuration  
2. Clone database schema(```python -m manage migrate```)  
3. Run application(```python -m manage runserver```)


## Status
Adding new features to improve as well as extending in accordance with the main branch.
- [ ] Register models to Django Admin.
- [ ] Add documentation for endpoints via Swagger
- [ ] Add filter view based on queryparams for search request.
- [ ] Add rating system to calculate average across model.
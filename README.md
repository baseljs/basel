<p align="center">  <img src="./images/basel.fw.png" height="180px"></p>
<p align="center"> Framework for Bootstrap, AngularJS, SQLite, Electron</p>
## [Documentation](http://baseljs.github.io/#/)

## Usage
Install
```shell
npm install -g basel
```

Create App
```shell
basel-init myApp
```

Install dependencies
```shell
cd myApp && npm install
```

Run
```shell
npm start
```

## Database
To create a new table in the database of your BASEL app. 
```shell
basel-database --table USERS --columns "id:INTEGER, name:TEXT" --pk id
```
And manipulate the database.

### Options
```shel
    -h, --help                        output usage information
    -p, --password <password>         Data base encripted passowrd
    -a, --algorithm <algorithm>       Data base encripted algorithm
    -s, --sql <sql>                   Sql to run
    -t, --table <table>               Create database table
    -c, --columns <columns>           Database table columns. Ex: "id:INTEGER, name:TEXT"
    -p, --pk <primary>                Database table primary key
    -r, --references <references>     Refences. Ex: "id":"table.id_table"
    -i, --incremental <incremental>   incremental columns. Ex: id or "id, number, ..."
```

#### Example:
```shell
basel-database --table USERS --columns "id:INTEGER, name:CHAR(100), email:TEXT, profile:INTEGER" --pk id --incremental id --references "profile:profiles.id"
```
Mean:
```sql
CREATE table USERS(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name CHAR (100),
  email TEXT,
  profile INTEGER REFERENCES profiles(id)
);
```

## CRUD - Creating
To create CRUD from database tables.
```shell
basel-crud users --table USERS
```
### Options
```shell
    -h, --help                       output usage information
    -t, --table <table>              Database Table
    -n, --columns <columns>          For new tables. Table columns. Ex: "id:INTEGER, name:TEXT"
    -p, --pk <primary>               Primary key of new table
    -f, --references <references>    Refences of new table. Ex: "profile:profiles.id"
    -i, --incremental <incremental>  incremental columns. Ex: id or "id, number, ..."
    -b, --database <database>        Database
    -c, --controller <controller>    Controller name
    -v, --view <view>                View name (.html)
    -r, --route <route>              Route (Ex.: persons)
    -m, --menu <menu>                Show in main menu (1 - Yes, 0 - No) Default 1
    -d, --delete <id>                To delete CRUD by ID
    -l, --list                       To list CRUDS
```

#### Examples
```shell
basel-crud users --table USERS -c userController -v user -r users
```
Create a CRUD on Controller and view based in table USERS.

### Create CRUD and Table
you can create the CRUD and at the same time the table. Inform the table columns using the short <strong>-n</strong> or <strong>--columns</strong> "id:INTEGER, name:TEXT, ... ".
```shell
basel-crud users --table USERS -n "id:INTEGER, name:TEXT" 
```

## Help

### Init
```shell
basel-init --help
```

### Database
```shell
basel-database --help
```
### CRUD
```shell
basel-crud --help
```

# basel
Framework for Bootstrap, AngularJS, SQLite, Electron

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
basel-database --table USER --columns '{"id":"INTEGER", "name":"CHAR(100)", "email":"TEXT"}' --pk id
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
basel-database --table USER --columns "id:INTEGER, name:CHAR(100), email:TEXT, profile:INTEGER" --pk id --incremental id --references "profile:profiles.id"
```
Mean:
```sql
CREATE table USER(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name CHAR (100),
  email TEXT,
  profile INTEGER REFERENCES profiles(id)
);
```

## CRUD - Creating
To create CRUD from database tables.
```shell
basel-crud users --table USER
```
### Options
```shell
    -h, --help                      output usage information
    -t, --table <table>             Database Table
    -d, --database <database>       Database
    -c, --controller <controller>   Controller name
    -v, --view <view>               View name (.html)
    -r, --route <route>             Route (Ex.: persons)
    -m, --menu <menu>               Show in main menu (1 - Yes, 0 - No) - Default: 1
```

#### Examples
```shell
basel-crud users --table USER -c userController -v user -r users
```
Create a CRUD on Controller and view based in table USER.


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

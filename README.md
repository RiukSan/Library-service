Library-service
=======
Library service, that provides user functionality to find, order and return books from libraries.

Installation
------
Open terminal in project directory and call "npm install".

Usage
------
Application uses file system as datastore. Data can be provided in text or csv formats.

Default path to datastore is in directory called "Library", path to datastore can be changed in package.json in configuration with "lib_folder" key.

If you need to create library with text format - use prefix for library name "TEXT_", otherwise if you need library with csv format - use prefix "CSV_".
Each directory in datastore represents one library. There are files with .csv or .txt formats according to library type, each file represents one book in library.
Here are file examples for books:

  <b>csv</b>: index, author, name, yyyy.mm.dd, clientname
  
  <b>text</b>: Index=index<br>
        Author=author<br>
        Name=name<br>
        Issued=yyyy.mm.dd<br>
        IssuedTo=clientname<br>

Application listens port 8080 by default, it can be changed in package.json file with "port" key.

Launching
------
Open terminal in project directory and call "npm start". After launching of the application go to http://localhost:"port"/.

Possible results
------
There are different possible answers while using functionality.
  <ul><b>Find</b>:
    <li>FOUND - book is found and is free to order.</li>
    <li>FOUNDMISSING - book is found, but it is already oredered by another client.</li>
    <li>NOTFOUND - book isn't found.</li>
  </ul>
  <ul><b>Order</b>:
    <li>OK - book is successfully oreder by client.</li>
    <li>RESERVED - book is already ordered by another client.</li>
    <li>NOTFOUND - book isn't found.</li>
  </ul>
  <ul><b>Return</b>:
    <li>OK - book is successfully returned.</li>
    <li>ALREADYRETURNED - book was returned before clients action.</li>
    <li>NOTFOUND - book isn't found.</li>
  </ul>

Requirements
------
Node js v.8.9.4

npm v.5.6.0

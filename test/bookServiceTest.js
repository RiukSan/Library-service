var assert = require('assert');
var mongoose = require('mongoose');
var bookService = require('../service/mongo/BookService');
var userService = require('../service/mongo/UserService');
var tempId;

describe("Book service tests", function () {
  before(function () {
    mongoose.connect('mongodb://localhost/Library_service', function (err) {
      if (err) throw err;
    })
    userService.createUser("name", "surname", 99, "sex").then((id) => {
      tempId = id.toString();
    });
  });

  it("Create book", function () {
    return new Promise(function (resolve, reject) {
      bookService.createBook("title", "author").then(() => {
        bookService.find("title", "author").then((value) => {
          try {
            assert.equal("title", value.FOUND[0].title);
            resolve();
          } catch (err) {
            reject();
          } finally {
            value.FOUND[0].remove();
          }
        })
      })
    })
  })

  it("Order book", function () {
    return new Promise(function (resolve, reject) {
      bookService.createBook("title", "author").then((value) => {
        bookService.order(value._id, tempId).then((result) => {
          try {
            assert.equal(tempId.toString(), result.OK[0].issuedTo.toString());
            resolve();
          } catch (err) {
            reject();
          } finally {
            result.OK[0].remove();
          }
        })
      })
    })
  })

  it("Return book", function () {
    return new Promise(function (resolve, reject) {
      bookService.createBook("title", "author").then((value) => {
        bookService.order(value._id, tempId).then((result) => {
          bookService.returnBook(value).then((result) => {
            try {
              assert.equal(undefined, result.OK[0].issuedTo.toString());
              resolve();
            } catch (err) {
              reject();
            } finally {
              result.OK[0].remove();
            }
          })
        });
      })
    })
  })

  after(function () {
    userService.findById(tempId).then((value) => {
      value[0].remove();
    });
  });

});
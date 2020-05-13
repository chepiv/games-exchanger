(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/add-offer/add-offer.component.css":
/*!***************************************************!*\
  !*** ./src/app/add-offer/add-offer.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkZC1vZmZlci9hZGQtb2ZmZXIuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/add-offer/add-offer.component.html":
/*!****************************************************!*\
  !*** ./src/app/add-offer/add-offer.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div style=\"margin: 5%\">\n  <form (ngSubmit)=\"f.form.valid && onSubmit()\" #f=\"ngForm\">\n    <div class=\"form-group\">\n      <label for=\"exampleFormControlInput1\">Offer title</label>\n      <input required type=\"text\" #title=\"ngModel\" class=\"form-control\" name=\"title\" [(ngModel)]=\"offer.title\" id=\"exampleFormControlInput1\" placeholder=\"Title\">\n      <span class=\"invalid-feedback d-block\">\n        <div *ngIf=\"f.submitted && !title.valid\"  >Title is required</div>\n      </span>\n    </div>\n\n    <div class=\"form-group\">\n      <label>Select games</label>\n    </div>\n\n\n    <ng-multiselect-dropdown name=\"games\"\n      [placeholder]=\"'Choose games'\"\n      [data]=\"games\"\n      [(ngModel)]=\"selectedItems\"\n      [settings]=\"dropdownSettings\"\n      (onSelect)=\"onItemSelect($event)\"\n      (onDeSelect)=\"onItemDeSelect($event)\"\n    >\n    </ng-multiselect-dropdown>\n\n    <div class=\"form-group\">\n      <label for=\"exampleFormControlTextarea1\">Description</label>\n      <textarea required class=\"form-control\" #description=\"ngModel\"  [(ngModel)]=\"offer.description\" name=\"description\" id=\"exampleFormControlTextarea1\" rows=\"3\"></textarea>\n      <div class=\"invalid-feedback d-block\" *ngIf=\"f.submitted && !description.valid\">Description is required</div>\n    </div>\n\n\n<button type=\"submit\" class=\"btn btn-primary\">Add offer</button>\n</form>\n</div>\n"

/***/ }),

/***/ "./src/app/add-offer/add-offer.component.ts":
/*!**************************************************!*\
  !*** ./src/app/add-offer/add-offer.component.ts ***!
  \**************************************************/
/*! exports provided: AddOfferComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddOfferComponent", function() { return AddOfferComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");






var AddOfferComponent = /** @class */ (function () {
    function AddOfferComponent(route, router, http, toastr) {
        this.route = route;
        this.router = router;
        this.http = http;
        this.toastr = toastr;
        this.offer = {};
        this.gameImage = '/assets/default-game.png';
        this.selectedItems = [];
        this.dropdownSettings = {};
        this.token = sessionStorage.getItem('token');
    }
    AddOfferComponent.prototype.ngOnInit = function () {
        if (this.token == null) {
            this.router.navigate(['']);
        }
        else {
            this.getAllUsersGames();
            // this.dropdownList = this.games;
            this.dropdownSettings = {
                singleSelection: false,
                idField: 'name',
                textField: 'name',
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                itemsShowLimit: 3,
                enableCheckAll: false,
                allowSearchFilter: true
            };
        }
    };
    AddOfferComponent.prototype.onItemSelect = function (item) {
        console.log(item);
        this.selectedItems.push(item);
    };
    AddOfferComponent.prototype.onItemDeSelect = function (item) {
        console.log(item);
        this.selectedItems = this.selectedItems.filter(function (value) { return value.name !== item.name; });
    };
    AddOfferComponent.prototype.onSelectAll = function (items) {
        console.log(items);
    };
    AddOfferComponent.prototype.onSubmit = function () {
        var _this = this;
        // this.offer.games = this.games.map(value => value.id);
        this.offer.games = this.games.filter(function (game) { return _this.selectedItems.includes(game.name); });
        if (this.offer.games === null || this.offer.games.length === 0) {
            this.toastr.error('Choose at list one game', 'Error');
            return;
        }
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].host + ':8762/offers';
        var reqHeader = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            Authorization: 'Bearer' + this.token
        });
        this.http.post(url, this.offer, { headers: reqHeader })
            .subscribe(function (data) { return console.log(data); }, function (error) { return _this.toastr.error('Unable to create offer, maybe its already in order', 'Error'); }, function () {
            _this.toastr.success('Success', 'Success');
            _this.router.navigate(['/offers']);
        });
    };
    AddOfferComponent.prototype.getAllUsersGames = function () {
        var _this = this;
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].host + ':8762/library/libraryForExchange';
        var reqHeader = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            Authorization: 'Bearer' + this.token
        });
        this.http.get(url, { headers: reqHeader })
            .subscribe(function (data) {
            console.log(data);
            _this.games = data;
        }, function (error) { return console.log(error); }, function () { return console.log('aaaa'); });
    };
    AddOfferComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-add-offer',
            template: __webpack_require__(/*! ./add-offer.component.html */ "./src/app/add-offer/add-offer.component.html"),
            styles: [__webpack_require__(/*! ./add-offer.component.css */ "./src/app/add-offer/add-offer.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"]])
    ], AddOfferComponent);
    return AddOfferComponent;
}());



/***/ }),

/***/ "./src/app/all-games/all-games.component.css":
/*!***************************************************!*\
  !*** ./src/app/all-games/all-games.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FsbC1nYW1lcy9hbGwtZ2FtZXMuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/all-games/all-games.component.html":
/*!****************************************************!*\
  !*** ./src/app/all-games/all-games.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container py-5\">\n  <div class=\"row\">\n    <div class=\"col-lg-8 mx-auto\" style=\"margin: 5%\">\n      <div class=\"form-inline\">\n        <input class=\"form-control mr-sm-2\" type=\"search\" placeholder=\"Search\" aria-label=\"Search\" [(ngModel)]=\"term\">\n        <button class=\"btn btn-outline-success my-2 my-sm-0\" type=\"submit\">Search</button>\n      </div>\n      <!-- List group-->\n      <ul class=\"list-group shadow\" *ngFor=\"let game of games | filter:term\">\n\n        <!-- list group item-->\n        <li class=\"list-group-item\">\n          <!-- Custom content-->\n          <div class=\"media align-items-lg-center flex-column flex-lg-row p-3\">\n            <img src=\"{{game.coverUrl}}\" style=\"min-width: 10rem; max-width: 10rem\"\n                 alt=\"Generic placeholder image\" width=\"200\" class=\"mx-lg-3 order-2 order-lg-1\">\n            <div class=\"media-body order-2 order-lg-1\">\n              <a href=\"/game-details/{{game.id}}\" style=\"color: inherit\"><h5 class=\"mt-0 font-weight-bold mb-2\">{{game.name}}</h5></a>\n              <p class=\"font-italic text-muted mb-0 small\">{{game.longDescription}}</p>\n              <div class=\"d-flex align-items-center justify-content-between mt-1\">\n                <h6 class=\"font-weight-bold my-2\">Rating: {{game.ranking}}</h6>\n              </div>\n            </div>\n\n          </div>\n          <!-- End -->\n        </li>\n        <!-- End -->\n      </ul>\n      <!-- End -->\n    </div>\n  </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/all-games/all-games.component.ts":
/*!**************************************************!*\
  !*** ./src/app/all-games/all-games.component.ts ***!
  \**************************************************/
/*! exports provided: AllGamesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AllGamesComponent", function() { return AllGamesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");






var AllGamesComponent = /** @class */ (function () {
    function AllGamesComponent(route, router, http, toastr) {
        this.route = route;
        this.router = router;
        this.http = http;
        this.toastr = toastr;
        this.gameImage = '/assets/default-game.png';
        this.token = sessionStorage.getItem('token');
    }
    AllGamesComponent.prototype.ngOnInit = function () {
        if (this.token == null) {
            this.router.navigate(['']);
        }
        else {
            this.getAllUsersGames();
        }
    };
    AllGamesComponent.prototype.getAllUsersGames = function () {
        var _this = this;
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].host + ':8762/games';
        var reqHeader = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
            Authorization: 'Bearer' + this.token
        });
        this.http.get(url, { headers: reqHeader })
            .subscribe(function (data) {
            console.log(data);
            _this.games = data;
        });
    };
    AllGamesComponent.prototype.addGameToLibrary = function (gameId) {
        var _this = this;
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].host + ':8762/library/' + gameId;
        var reqHeader = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
            Authorization: 'Bearer' + this.token,
            'Content-type': 'application/json'
        });
        this.http.post(url, null, { headers: reqHeader })
            .subscribe(function (data) { return console.log(data); }, function (error) {
            console.log(error);
            _this.toastr.error('Unable to add game', 'Error');
        }, function () {
            console.log('success');
            _this.toastr.success('Game was added successfully', 'Success');
        });
    };
    AllGamesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-all-games',
            template: __webpack_require__(/*! ./all-games.component.html */ "./src/app/all-games/all-games.component.html"),
            styles: [__webpack_require__(/*! ./all-games.component.css */ "./src/app/all-games/all-games.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"]])
    ], AllGamesComponent);
    return AllGamesComponent;
}());



/***/ }),

/***/ "./src/app/all-offers/all-offers.component.css":
/*!*****************************************************!*\
  !*** ./src/app/all-offers/all-offers.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FsbC1vZmZlcnMvYWxsLW9mZmVycy5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/all-offers/all-offers.component.html":
/*!******************************************************!*\
  !*** ./src/app/all-offers/all-offers.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container py-5\">\n  <div class=\"row\">\n    <div class=\"col-lg-8 mx-auto\" style=\"margin: 5%\">\n      <div class=\"form-inline\">\n        <input class=\"form-control mr-sm-2\" type=\"search\" placeholder=\"Search\" aria-label=\"Search\" [(ngModel)]=\"term\">\n        <button class=\"btn btn-outline-success my-2 my-sm-0\" type=\"submit\">Search</button>\n      </div>\n      <!-- List group-->\n      <ul class=\"list-group shadow\" *ngFor=\"let offer of offers | filter:term\">\n\n        <!-- list group item-->\n        <li class=\"list-group-item\">\n          <!-- Custom content-->\n          <div class=\"media align-items-lg-center flex-column flex-lg-row p-3\">\n            <img src=\"{{offer.imageUrl}}\" style=\"min-width: 10rem; max-width: 10rem\"\n                 alt=\"Generic placeholder image\" width=\"200\" class=\"mx-lg-3 order-2 order-lg-1\">\n            <div class=\"media-body order-2 order-lg-1\">\n             <a href=\"/offer-details/{{offer.id}}\" style=\"color: inherit\"><h5 class=\"mt-0 font-weight-bold mb-2\">{{offer.title}}</h5></a>\n              <p class=\"font-italic text-muted mb-0 small\">{{offer.description}}</p>\n              <div class=\"d-flex align-items-center justify-content-between mt-1\">\n                <h6 class=\"font-weight-bold my-2\">{{offer.games | pluck}}</h6>\n              </div>\n              <div class=\"d-flex align-items-center justify-content-between mt-1\">\n                <h6 class=\"font-weight-bold my-2\">Author: {{offer.accountName}}</h6>\n              </div>\n            </div>\n\n          </div>\n          <!-- End -->\n        </li>\n        <!-- End -->\n      </ul>\n      <!-- End -->\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/all-offers/all-offers.component.ts":
/*!****************************************************!*\
  !*** ./src/app/all-offers/all-offers.component.ts ***!
  \****************************************************/
/*! exports provided: AllOffersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AllOffersComponent", function() { return AllOffersComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");






var AllOffersComponent = /** @class */ (function () {
    function AllOffersComponent(route, router, http, toastr) {
        this.route = route;
        this.router = router;
        this.http = http;
        this.toastr = toastr;
        this.token = sessionStorage.getItem('token');
    }
    AllOffersComponent.prototype.ngOnInit = function () {
        if (this.token == null) {
            this.router.navigate(['']);
        }
        else {
            this.getAllOffers();
            this.offers.forEach(function (value) { return value.games.map(function (value1) { return value1.name; }); });
            console.log(this.offers.forEach(function (offer) { return offer.games; }));
        }
    };
    AllOffersComponent.prototype.getAllOffers = function () {
        var _this = this;
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].host + ':8762/offers';
        var reqHeader = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
            Authorization: 'Bearer' + this.token
        });
        this.http.get(url, { headers: reqHeader })
            .subscribe(function (data) {
            console.log(data);
            _this.offers = data;
        }, function (error) { return console.log(error); }, function () { return console.log('Success'); });
    };
    AllOffersComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-all-offers',
            template: __webpack_require__(/*! ./all-offers.component.html */ "./src/app/all-offers/all-offers.component.html"),
            styles: [__webpack_require__(/*! ./all-offers.component.css */ "./src/app/all-offers/all-offers.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"]])
    ], AllOffersComponent);
    return AllOffersComponent;
}());



/***/ }),

/***/ "./src/app/all-offers/namePipe.ts":
/*!****************************************!*\
  !*** ./src/app/all-offers/namePipe.ts ***!
  \****************************************/
/*! exports provided: NamePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NamePipe", function() { return NamePipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var NamePipe = /** @class */ (function () {
    function NamePipe() {
    }
    NamePipe.prototype.transform = function (input) {
        return input.map(function (value) { return ' ' + value.name; });
    };
    NamePipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({ name: 'pluck' })
    ], NamePipe);
    return NamePipe;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _user_details_user_details_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user-details/user-details.component */ "./src/app/user-details/user-details.component.ts");
/* harmony import */ var _registration_registration_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./registration/registration.component */ "./src/app/registration/registration.component.ts");
/* harmony import */ var _game_details_game_details_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./game-details/game-details.component */ "./src/app/game-details/game-details.component.ts");
/* harmony import */ var _games_library_games_library_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./games-library/games-library.component */ "./src/app/games-library/games-library.component.ts");
/* harmony import */ var _all_games_all_games_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./all-games/all-games.component */ "./src/app/all-games/all-games.component.ts");
/* harmony import */ var _add_offer_add_offer_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./add-offer/add-offer.component */ "./src/app/add-offer/add-offer.component.ts");
/* harmony import */ var _all_offers_all_offers_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./all-offers/all-offers.component */ "./src/app/all-offers/all-offers.component.ts");
/* harmony import */ var _offer_details_offer_details_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./offer-details/offer-details.component */ "./src/app/offer-details/offer-details.component.ts");
/* harmony import */ var _exchange_offer_exchange_offer_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./exchange-offer/exchange-offer.component */ "./src/app/exchange-offer/exchange-offer.component.ts");
/* harmony import */ var _received_offer_received_offer_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./received-offer/received-offer.component */ "./src/app/received-offer/received-offer.component.ts");
/* harmony import */ var _received_offers_received_offers_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./received-offers/received-offers.component */ "./src/app/received-offers/received-offers.component.ts");
/* harmony import */ var _sent_offers_sent_offers_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./sent-offers/sent-offers.component */ "./src/app/sent-offers/sent-offers.component.ts");
















var routes = [
    { path: 'login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"] },
    { path: 'user-details', component: _user_details_user_details_component__WEBPACK_IMPORTED_MODULE_4__["UserDetailsComponent"] },
    { path: 'registration', component: _registration_registration_component__WEBPACK_IMPORTED_MODULE_5__["RegistrationComponent"] },
    { path: 'game-details/:id', component: _game_details_game_details_component__WEBPACK_IMPORTED_MODULE_6__["GameDetailsComponent"] },
    { path: 'library', component: _games_library_games_library_component__WEBPACK_IMPORTED_MODULE_7__["GamesLibraryComponent"] },
    { path: 'games', component: _all_games_all_games_component__WEBPACK_IMPORTED_MODULE_8__["AllGamesComponent"] },
    { path: 'add-offer', component: _add_offer_add_offer_component__WEBPACK_IMPORTED_MODULE_9__["AddOfferComponent"] },
    { path: 'offers', component: _all_offers_all_offers_component__WEBPACK_IMPORTED_MODULE_10__["AllOffersComponent"] },
    { path: 'offer-details/:id', component: _offer_details_offer_details_component__WEBPACK_IMPORTED_MODULE_11__["OfferDetailsComponent"] },
    { path: 'exchange-offer/:id', component: _exchange_offer_exchange_offer_component__WEBPACK_IMPORTED_MODULE_12__["ExchangeOfferComponent"] },
    { path: 'received-offer/:id', component: _received_offer_received_offer_component__WEBPACK_IMPORTED_MODULE_13__["ReceivedOfferComponent"] },
    { path: 'received-offers', component: _received_offers_received_offers_component__WEBPACK_IMPORTED_MODULE_14__["ReceivedOffersComponent"] },
    { path: 'sent-offers', component: _sent_offers_sent_offers_component__WEBPACK_IMPORTED_MODULE_15__["SentOffersComponent"] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-lg navbar-light bg-light fixed-top\">\n  <a class=\"navbar-brand\" href=\"#\">Games-Xchanger</a>\n  <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\"\n          aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n    <span class=\"navbar-toggler-icon\"></span>\n  </button>\n\n  <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\n    <ul class=\"navbar-nav mr-auto\">\n      <li class=\"nav-item active\">\n        <a class=\"nav-link\" href=\"/\">Home <span class=\"sr-only\">(current)</span></a>\n      </li>\n      <li class=\"nav-item active\">\n        <a class=\"nav-link\" href=\"/login\">Login</a>\n      </li>\n      <li class=\"nav-item active\">\n        <a class=\"nav-link\" href=\"/user-details\">User details</a>\n      </li>\n      <li class=\"nav-item active\">\n        <a class=\"nav-link\" href=\"/registration\">Registration</a>\n      </li>\n      <li class=\"nav-item active\">\n        <a class=\"nav-link\" href=\"/games\">All games</a>\n      </li>\n      <li class=\"nav-item active\">\n        <a class=\"nav-link\" href=\"/add-offer\">Add new offer</a>\n      </li>\n      <li class=\"nav-item active\">\n        <a class=\"nav-link\" href=\"/offers\">All offers</a>\n      </li>\n      <li class=\"nav-item active\">\n        <a class=\"nav-link\" href=\"/received-offers\">Received offers</a>\n      </li>\n      <li class=\"nav-item active\">\n        <a class=\"nav-link\" href=\"/sent-offers\">Sent offers</a>\n      </li>\n      <li class=\"nav-item active\">\n        <a class=\"nav-link\" href=\"/login\" (click)=\"logout()\">Logout</a>\n      </li>\n    </ul>\n  </div>\n</nav>\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");





var AppComponent = /** @class */ (function () {
    function AppComponent(route, router, http, toastr) {
        this.route = route;
        this.router = router;
        this.http = http;
        this.toastr = toastr;
        this.title = 'games-xchanger';
        this.token = sessionStorage.getItem('token');
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.logout = function () {
        sessionStorage.clear();
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _user_details_user_details_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./user-details/user-details.component */ "./src/app/user-details/user-details.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _registration_registration_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./registration/registration.component */ "./src/app/registration/registration.component.ts");
/* harmony import */ var ngx_image_cropper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-image-cropper */ "./node_modules/ngx-image-cropper/fesm5/ngx-image-cropper.js");
/* harmony import */ var _game_details_game_details_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./game-details/game-details.component */ "./src/app/game-details/game-details.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ng-multiselect-dropdown */ "./node_modules/ng-multiselect-dropdown/fesm5/ng-multiselect-dropdown.js");
/* harmony import */ var _games_library_games_library_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./games-library/games-library.component */ "./src/app/games-library/games-library.component.ts");
/* harmony import */ var _all_games_all_games_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./all-games/all-games.component */ "./src/app/all-games/all-games.component.ts");
/* harmony import */ var _add_offer_add_offer_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./add-offer/add-offer.component */ "./src/app/add-offer/add-offer.component.ts");
/* harmony import */ var _all_offers_all_offers_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./all-offers/all-offers.component */ "./src/app/all-offers/all-offers.component.ts");
/* harmony import */ var _all_offers_namePipe__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./all-offers/namePipe */ "./src/app/all-offers/namePipe.ts");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.es5.js");
/* harmony import */ var _offer_details_offer_details_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./offer-details/offer-details.component */ "./src/app/offer-details/offer-details.component.ts");
/* harmony import */ var angular2_image_gallery__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! angular2-image-gallery */ "./node_modules/angular2-image-gallery/fesm5/angular2-image-gallery.js");
/* harmony import */ var _exchange_offer_exchange_offer_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./exchange-offer/exchange-offer.component */ "./src/app/exchange-offer/exchange-offer.component.ts");
/* harmony import */ var _received_offer_received_offer_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./received-offer/received-offer.component */ "./src/app/received-offer/received-offer.component.ts");
/* harmony import */ var _received_offers_received_offers_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./received-offers/received-offers.component */ "./src/app/received-offers/received-offers.component.ts");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");
/* harmony import */ var _sent_offers_sent_offers_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./sent-offers/sent-offers.component */ "./src/app/sent-offers/sent-offers.component.ts");




























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _login_login_component__WEBPACK_IMPORTED_MODULE_5__["LoginComponent"],
                _user_details_user_details_component__WEBPACK_IMPORTED_MODULE_7__["UserDetailsComponent"],
                _registration_registration_component__WEBPACK_IMPORTED_MODULE_9__["RegistrationComponent"],
                _game_details_game_details_component__WEBPACK_IMPORTED_MODULE_11__["GameDetailsComponent"],
                _games_library_games_library_component__WEBPACK_IMPORTED_MODULE_15__["GamesLibraryComponent"],
                _all_games_all_games_component__WEBPACK_IMPORTED_MODULE_16__["AllGamesComponent"],
                _add_offer_add_offer_component__WEBPACK_IMPORTED_MODULE_17__["AddOfferComponent"],
                _all_offers_all_offers_component__WEBPACK_IMPORTED_MODULE_18__["AllOffersComponent"],
                _all_offers_namePipe__WEBPACK_IMPORTED_MODULE_19__["NamePipe"],
                _offer_details_offer_details_component__WEBPACK_IMPORTED_MODULE_21__["OfferDetailsComponent"],
                _exchange_offer_exchange_offer_component__WEBPACK_IMPORTED_MODULE_23__["ExchangeOfferComponent"],
                _received_offer_received_offer_component__WEBPACK_IMPORTED_MODULE_24__["ReceivedOfferComponent"],
                _received_offers_received_offers_component__WEBPACK_IMPORTED_MODULE_25__["ReceivedOffersComponent"],
                _sent_offers_sent_offers_component__WEBPACK_IMPORTED_MODULE_27__["SentOffersComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
                ngx_image_cropper__WEBPACK_IMPORTED_MODULE_10__["ImageCropperModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_12__["BrowserAnimationsModule"],
                ngx_toastr__WEBPACK_IMPORTED_MODULE_13__["ToastrModule"].forRoot(),
                ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_14__["NgMultiSelectDropDownModule"].forRoot(),
                ng2_search_filter__WEBPACK_IMPORTED_MODULE_20__["Ng2SearchPipeModule"],
                angular2_image_gallery__WEBPACK_IMPORTED_MODULE_22__["Angular2ImageGalleryModule"],
                _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_26__["FontAwesomeModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/exchange-offer/exchange-offer.component.css":
/*!*************************************************************!*\
  !*** ./src/app/exchange-offer/exchange-offer.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2V4Y2hhbmdlLW9mZmVyL2V4Y2hhbmdlLW9mZmVyLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/exchange-offer/exchange-offer.component.html":
/*!**************************************************************!*\
  !*** ./src/app/exchange-offer/exchange-offer.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"my-auto align m-5\" >\n\n<div class=\"container py-2 mt-5\" >\n  <h3 class=\"mt-0 font-weight-bold mb-2 text-center\">Games In {{offer.accountName}}'s Offer</h3>\n  <div class=\"row mt-3\" style=\"max-height: 20rem; min-height: 20rem; overflow-y: scroll\">\n    <div class=\"col-lg-8 mx-auto\">\n      <!-- List group-->\n      <ul class=\"list-group shadow\" *ngFor=\"let game of offer.games\">\n\n        <!-- list group item-->\n        <li class=\"list-group-item\">\n          <!-- Custom content-->\n          <div class=\"media align-items-lg-center flex-column flex-lg-row p-3\">\n            <img src=\"{{game.coverUrl}}\" style=\"min-width: 10rem; max-width: 10rem\"\n                 alt=\"Generic placeholder image\" width=\"200\" class=\"mx-lg-3 order-2 order-lg-1\">\n            <div class=\"media-body order-2 order-lg-1\">\n              <a href=\"/game-details/{{game.id}}\" style=\"color: inherit\"><h5 class=\"mt-0 font-weight-bold mb-2\">{{game.name}}</h5></a>\n              <p class=\"font-italic text-muted mb-0 small\">{{game.longDescription}}</p>\n              <div class=\"d-flex align-items-center justify-content-between mt-1\">\n                <h6 class=\"font-weight-bold my-2\">Rating: {{game.ranking}}</h6>\n              </div>\n            </div>\n\n          </div>\n          <!-- End -->\n        </li>\n        <!-- End -->\n      </ul>\n      <!-- End -->\n    </div>\n  </div>\n</div>\n\n<div class=\"container  text-center mt-1 mb-1 p-0\"><i class=\"fa fa-exchange align-content-center fa-5x\" aria-hidden=\"true\"></i></div>\n\n  <div class=\"container py-2\" >\n    <h3 class=\"mt-0 font-weight-bold mb-2 text-center\">Your Games</h3>\n    <div class=\"row mt-3\" style=\"max-height: 20rem; min-height: 20rem; overflow-y: scroll\">\n      <div class=\"col-lg-8 mx-auto\" style=\"margin: 5%\">\n        <!-- List group-->\n        <ul class=\"list-group shadow\" *ngFor=\"let game of userGames; let i = index;\">\n\n          <!-- list group item-->\n          <li class=\"list-group-item\">\n            <!-- Custom content-->\n            <div class=\"media align-items-lg-center flex-column flex-lg-row p-3\">\n              <img src=\"{{game.coverUrl}}\" style=\"min-width: 10rem; max-width: 10rem\"\n                   alt=\"Generic placeholder image\" width=\"200\" class=\"mx-lg-3 order-2 order-lg-1\">\n              <div class=\"media-body order-2 order-lg-1\">\n                <a href=\"/game-details/{{game.id}}\" style=\"color: inherit\"><h5 class=\"mt-0 font-weight-bold mb-2\">{{game.name}}</h5></a>\n                <p class=\"font-italic text-muted mb-0 small\">{{game.longDescription}}</p>\n                <div class=\"d-flex align-items-center justify-content-between mt-1\">\n                  <h6 class=\"font-weight-bold my-2\">Rating: {{game.ranking}}</h6>\n                </div>\n                  <input type=\"checkbox\" [(ngModel)]=\"userGames[i].checked\">\n              </div>\n\n            </div>\n            <!-- End -->\n          </li>\n          <!-- End -->\n        </ul>\n        <!-- End -->\n      </div>\n    </div>\n  </div>\n    <div class=\"form-group container py-2\">\n      <label for=\"exampleFormControlTextarea1\">Commentary</label>\n      <textarea class=\"form-control\" [(ngModel)]=\"exchangeOffer.commentary\" name=\"description\" id=\"exampleFormControlTextarea1\" rows=\"3\"></textarea>\n    </div>\n  <div class=\"container  text-center mt-1 mb-1 p-0\"><button type=\"button\" class=\"btn btn-success\" (click)=\"sendExchangeOffer()\">Exchange</button></div>\n  </div>\n"

/***/ }),

/***/ "./src/app/exchange-offer/exchange-offer.component.ts":
/*!************************************************************!*\
  !*** ./src/app/exchange-offer/exchange-offer.component.ts ***!
  \************************************************************/
/*! exports provided: ExchangeOfferComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExchangeOfferComponent", function() { return ExchangeOfferComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");






var ExchangeOfferComponent = /** @class */ (function () {
    function ExchangeOfferComponent(route, router, http, toastr) {
        this.route = route;
        this.router = router;
        this.http = http;
        this.toastr = toastr;
        this.exchangeOffer = {};
        this.token = sessionStorage.getItem('token');
    }
    ExchangeOfferComponent.prototype.ngOnInit = function () {
        if (this.token == null) {
            this.router.navigate(['']);
        }
        else {
            this.id = this.route.snapshot.paramMap.get('id');
            this.getAllUsersGames();
            this.getOfferById();
        }
    };
    ExchangeOfferComponent.prototype.getAllUsersGames = function () {
        var _this = this;
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].host + ':8762/library/libraryForExchange';
        var reqHeader = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
            Authorization: 'Bearer' + this.token
        });
        this.http.get(url, { headers: reqHeader })
            .subscribe(function (data) {
            console.log(data);
            _this.userGames = data;
        });
    };
    ExchangeOfferComponent.prototype.sendExchangeOffer = function () {
        var _this = this;
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].host + ':8762/offers/exchangeOffer';
        var reqHeader = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
            Authorization: 'Bearer' + this.token
        });
        this.exchangeOffer.sourceOffer = this.offer;
        this.exchangeOffer.offeredGames = this.userGames.filter(function (game) { return game.checked === true; });
        this.http.post(url, this.exchangeOffer, { headers: reqHeader })
            .subscribe(function (data) { return console.log(data); }, function (error) { return _this.toastr.error('Unable to create exchange offer', 'Error'); }, function () {
            _this.toastr.success('Success', 'Success');
            _this.router.navigate(['/user-details']);
        });
    };
    ExchangeOfferComponent.prototype.getOfferById = function () {
        var _this = this;
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].host + ':8762/offers/' + this.id;
        var reqHeader = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
            Authorization: 'Bearer' + this.token
        });
        this.http.get(url, { headers: reqHeader })
            .subscribe(function (data) {
            console.log(data);
            _this.offer = data;
        });
    };
    ExchangeOfferComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-exchange-offer',
            template: __webpack_require__(/*! ./exchange-offer.component.html */ "./src/app/exchange-offer/exchange-offer.component.html"),
            styles: [__webpack_require__(/*! ./exchange-offer.component.css */ "./src/app/exchange-offer/exchange-offer.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"]])
    ], ExchangeOfferComponent);
    return ExchangeOfferComponent;
}());



/***/ }),

/***/ "./src/app/game-details/game-details.component.css":
/*!*********************************************************!*\
  !*** ./src/app/game-details/game-details.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2dhbWUtZGV0YWlscy9nYW1lLWRldGFpbHMuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/game-details/game-details.component.html":
/*!**********************************************************!*\
  !*** ./src/app/game-details/game-details.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" style=\"margin: 5%\">\n  <div class=\"card\">\n    <div class=\"row\">\n      <aside class=\"col-sm-5 border-right\">\n        <article class=\"gallery-wrap\">\n          <div class=\"img-big-wrap\">\n            <div><img src=\"{{game.coverUrl}}\"></div>\n          </div> <!-- slider-product.// -->\n        </article> <!-- gallery-wrap .end// -->\n      </aside>\n      <aside class=\"col-sm-7\">\n        <article class=\"card-body p-5\">\n          <h3 class=\"title mb-3\">{{game.name}}</h3>\n\n          <dl class=\"item-property\">\n            <dt>Description</dt>\n            <dd><p>{{game.longDescription}}</p></dd>\n          </dl>\n\n          <dl class=\"param param-feature\">\n            <dt>Platform</dt>\n            <dd>{{game.platform.name}}</dd>\n          </dl>  <!-- item-property-hor .// -->\n\n          <dl class=\"param param-feature\">\n            <dt>Ranking</dt>\n            <dd>{{game.ranking}}</dd>\n          </dl>  <!-- item-property-hor .// -->\n\n          <hr>\n          <a class=\"btn btn-lg btn-primary text-uppercase\" (click)=\"addGameToLibrary()\"> Add to library </a>\n        </article> <!-- card-body.// -->\n      </aside> <!-- col.// -->\n    </div> <!-- row.// -->\n  </div> <!-- card.// -->\n\n\n</div>\n<!--container.//-->\n"

/***/ }),

/***/ "./src/app/game-details/game-details.component.ts":
/*!********************************************************!*\
  !*** ./src/app/game-details/game-details.component.ts ***!
  \********************************************************/
/*! exports provided: GameDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameDetailsComponent", function() { return GameDetailsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");






var GameDetailsComponent = /** @class */ (function () {
    function GameDetailsComponent(route, router, http, toastr) {
        this.route = route;
        this.router = router;
        this.http = http;
        this.toastr = toastr;
        this.game = {};
        this.token = sessionStorage.getItem('token');
    }
    GameDetailsComponent.prototype.ngOnInit = function () {
        if (this.token == null) {
            this.router.navigate(['']);
        }
        else {
            this.id = this.route.snapshot.paramMap.get('id');
            this.getGameById();
        }
    };
    GameDetailsComponent.prototype.getGameById = function () {
        var _this = this;
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].host + ':8762/games/' + this.id;
        var reqHeader = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            Authorization: 'Bearer' + this.token
        });
        this.http.get(url, { headers: reqHeader })
            .subscribe(function (data) {
            console.log(data);
            _this.game = data;
        });
    };
    GameDetailsComponent.prototype.addGameToLibrary = function () {
        var _this = this;
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].host + ':8762/library/' + this.id;
        var reqHeader = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            Authorization: 'Bearer' + this.token,
            'Content-type': 'application/json'
        });
        this.http.post(url, null, { headers: reqHeader })
            .subscribe(function (data) { return console.log(data); }, function (error) {
            console.log(error);
            _this.toastr.error('Unable to add game', 'Error');
        }, function () {
            console.log('success');
            _this.toastr.success('Game was added successfully', 'Success');
        });
    };
    GameDetailsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-game-details',
            template: __webpack_require__(/*! ./game-details.component.html */ "./src/app/game-details/game-details.component.html"),
            styles: [__webpack_require__(/*! ./game-details.component.css */ "./src/app/game-details/game-details.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"]])
    ], GameDetailsComponent);
    return GameDetailsComponent;
}());



/***/ }),

/***/ "./src/app/games-library/games-library.component.css":
/*!***********************************************************!*\
  !*** ./src/app/games-library/games-library.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2dhbWVzLWxpYnJhcnkvZ2FtZXMtbGlicmFyeS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/games-library/games-library.component.html":
/*!************************************************************!*\
  !*** ./src/app/games-library/games-library.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--<div id=\"user-details\" style=\"margin: 5%\">-->\n<!--  <div class=\"card-deck\" style=\"max-height: 30%; max-width: 20%\">-->\n<!--    <div class=\"card h-100\" *ngFor=\"let game of games\">-->\n<!--      <img class=\"card-img-top\" src=\"{{game.imageUrl}}\" alt=\"Card image cap\" (error)=\"this.game.imageUrl = gameImage\">-->\n<!--      <div class=\"card-body\">-->\n<!--        <a href=\"{{'game-details/'+game.id}}\">-->\n<!--          <h5 class=\"card-title\">{{game.name}}</h5>-->\n<!--        </a>-->\n<!--        <p class=\"card-text\">{{game.shortDescription}}</p>-->\n<!--        <p class=\"card-text\"><small class=\"text-muted\">{{game.platform}}</small></p>-->\n<!--      </div>-->\n<!--      <button type=\"button\" (click)=\"removeGameFromLibrary(game.id)\" class=\"btn btn-danger\">Delete</button>-->\n<!--    </div>-->\n<!--  </div>-->\n<!--</div>-->\n\n<div id=\"user-details\" style=\"margin: 5%\">\n<!--<div class=\"container-fluid mt-4\">-->\n  <div class=\"row justify-content-center\">\n    <div class=\"row mb-3\" >\n      <div class=\"card\" style=\"width: 18rem;margin: 1%\" *ngFor=\"let game of games\">\n        <img class=\"card-img-top\" src=\"{{game.imageUrl}}\" alt=\"Card image cap\" (error)=\"this.game.imageUrl = gameImage\">\n        <div class=\"card-body\">\n          <a href=\"{{'game-details/'+game.id}}\">\n            <h5 class=\"card-title\">{{game.name}}</h5>\n          </a>\n          <p class=\"card-text\">{{game.shortDescription}}</p>\n          <p class=\"card-text\"><small class=\"text-muted\">{{game.platform}}</small></p>\n        </div>\n        <button type=\"button\" (click)=\"removeGameFromLibrary(game.id)\" class=\"btn btn-danger\">Delete</button>\n      </div>\n    </div>\n  </div>\n<!--</div>-->\n</div>\n"

/***/ }),

/***/ "./src/app/games-library/games-library.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/games-library/games-library.component.ts ***!
  \**********************************************************/
/*! exports provided: GamesLibraryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GamesLibraryComponent", function() { return GamesLibraryComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");






var GamesLibraryComponent = /** @class */ (function () {
    function GamesLibraryComponent(route, router, http, toastr) {
        this.route = route;
        this.router = router;
        this.http = http;
        this.toastr = toastr;
        this.gameImage = '/assets/default-game.png';
        this.token = sessionStorage.getItem('token');
    }
    GamesLibraryComponent.prototype.ngOnInit = function () {
        if (this.token == null) {
            this.router.navigate(['']);
        }
        else {
            this.getAllUsersGames();
        }
    };
    GamesLibraryComponent.prototype.getAllUsersGames = function () {
        var _this = this;
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].host + ':8762/library';
        var reqHeader = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
            Authorization: 'Bearer' + this.token
        });
        this.http.get(url, { headers: reqHeader })
            .subscribe(function (data) {
            console.log(data);
            _this.games = data;
        });
    };
    GamesLibraryComponent.prototype.removeGameFromLibrary = function (gameId) {
        var _this = this;
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].host + ':8762/library/' + gameId;
        var reqHeader = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
            Authorization: 'Bearer' + this.token,
            'Content-type': 'application/json'
        });
        this.http.delete(url, { headers: reqHeader })
            .subscribe(function (data) { return console.log(data); }, function (error) {
            console.log(error);
            _this.toastr.error('Unable to delete game', 'Error');
        }, function () {
            console.log('success');
            _this.toastr.success('Game was deleted successfully', 'Success');
            window.location.reload();
        });
    };
    GamesLibraryComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-games-library',
            template: __webpack_require__(/*! ./games-library.component.html */ "./src/app/games-library/games-library.component.html"),
            styles: [__webpack_require__(/*! ./games-library.component.css */ "./src/app/games-library/games-library.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"]])
    ], GamesLibraryComponent);
    return GamesLibraryComponent;
}());



/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"login-form\" style=\"margin-top: 5%\">\n  <form name=\"form\" (ngSubmit)=\"f.form.valid && sendLoginRequest()\" #f=\"ngForm\" novalidate>\n    <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !login.valid }\">\n      <label for=\"username\">Username</label>\n      <input autofocus id=\"username\" class=\"form-control\" type=\"text\" name=\"username\" [(ngModel)]=\"model.login\"\n             #login=\"ngModel\" required/>\n      <div *ngIf=\"f.submitted && !login.valid\">Username is required</div>\n    </div>\n    <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !password.valid }\">\n      <label for=\"password\">Password</label>\n      <input id=\"password\" class=\"form-control\" type=\"password\" name=\"password\" [(ngModel)]=\"model.password\"\n             #password=\"ngModel\" required/>\n      <div *ngIf=\"f.submitted && !password.valid\">Password is required</div>\n    </div>\n    <button type=\"submit\" class=\"btn btn-primary\">Login</button>\n  </form>\n</div>\n\n\n"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");





var LoginComponent = /** @class */ (function () {
    function LoginComponent(route, router, http) {
        this.route = route;
        this.router = router;
        this.http = http;
        this.model = {};
        this.token = {};
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.sendLoginRequest = function () {
        var _this = this;
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].host + ':8762/oauth/token';
        var headers = {
            Authorization: 'Basic ' + btoa('eagleeye' + ':' + 'thisissecret'),
            'Content-type': 'application/x-www-form-urlencoded'
        };
        var body = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpParams"]() // fix cors policy
            .set('username', this.model.login)
            .set('password', this.model.password)
            .set('grant_type', 'webclient')
            .set('grant_type', 'password');
        this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].host + ':8762/' + 'oauth/token', body, { headers: headers })
            .subscribe(function (data) { return _this.token = data; }, function (err) { return alert('Invalid Credentials'); }, function () {
            console.log(_this.token);
            sessionStorage.setItem('token', _this.token.access_token);
            sessionStorage.setItem('authorized', 'true');
            sessionStorage.setItem('currentUser', _this.model.login);
            _this.router.navigate(['/user-details']);
        });
    };
    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/offer-details/offer-details.component.css":
/*!***********************************************************!*\
  !*** ./src/app/offer-details/offer-details.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL29mZmVyLWRldGFpbHMvb2ZmZXItZGV0YWlscy5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/offer-details/offer-details.component.html":
/*!************************************************************!*\
  !*** ./src/app/offer-details/offer-details.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" style=\"margin: 5%\">\n  <div class=\"card\">\n    <div class=\"row\">\n      <aside class=\"col-sm-5 border-right\">\n        <article class=\"gallery-wrap\">\n          <div class=\"img-big-wrap\">\n            <div><img src=\"{{offerImageUrl}}\"></div>\n          </div> <!-- slider-product.// -->\n        </article> <!-- gallery-wrap .end// -->\n      </aside>\n      <aside class=\"col-sm-7\">\n        <article class=\"card-body p-5\">\n          <h3 class=\"title mb-3\">{{offer.title}}</h3>\n\n          <dl class=\"item-property\">\n            <dt>Description</dt>\n            <dd><p>{{offer.description}}</p></dd>\n          </dl>\n          <dl class=\"item-property\">\n            <dt>Author</dt>\n            <dd><p>{{offer.accountName}}</p></dd>\n          </dl>\n\n          <dl class=\"param param-feature\">\n            <dt>Games</dt>\n            <div class=\"container-fluid\" >\n              <div class=\"row flex-nowrap\" style=\"overflow-x: scroll\">\n                <div class=\"card h-100\"  *ngFor=\"let game of offer.games\">\n                  <div class=\"card-img-top\" style=\"width: 9vw;height: 10vw;object-fit: cover; text-align: center\"><img style=\"max-height: 100%;max-width: 100%\" src=\"{{game.coverUrl}}\" alt=\"Card image cap\"></div>\n                  <div class=\"card-body\">\n                    <a href=\"/game-details/{{game.id}}\"><h5 class=\"card-title\">{{game.name}}</h5></a>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </dl>\n\n          <hr>\n          <button *ngIf=\"offer.accountName != currentUser\" type=\"button\" (click)=\"navigateToExchangeOffer(offer.id)\" class=\"btn btn-primary\">Exchange</button>\n          <button *ngIf=\"offer.accountName === currentUser\" type=\"button\" (click)=\"deleteOffer()\" class=\"btn btn-danger\">Delete</button>\n        </article> <!-- card-body.// -->\n      </aside> <!-- col.// -->\n    </div> <!-- row.// -->\n  </div> <!-- card.// -->\n\n\n</div>\n<!--container.//-->\n"

/***/ }),

/***/ "./src/app/offer-details/offer-details.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/offer-details/offer-details.component.ts ***!
  \**********************************************************/
/*! exports provided: OfferDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OfferDetailsComponent", function() { return OfferDetailsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");






var OfferDetailsComponent = /** @class */ (function () {
    function OfferDetailsComponent(route, router, http, toastr) {
        this.route = route;
        this.router = router;
        this.http = http;
        this.toastr = toastr;
        this.offerImageUrl = '../../assets/default-game.png';
        this.token = sessionStorage.getItem('token');
    }
    OfferDetailsComponent.prototype.ngOnInit = function () {
        if (this.token == null) {
            this.router.navigate(['']);
        }
        else {
            this.id = this.route.snapshot.paramMap.get('id');
            this.currentUser = sessionStorage.getItem('currentUser');
            this.getOfferById();
        }
    };
    OfferDetailsComponent.prototype.getImageForOffer = function (offer) {
        var _this = this;
        var gamesCovers = offer.games.map(function (game) { return game.coverUrl; });
        var find = gamesCovers.find(function (value) { return _this.isNotNull(value); });
        if (find != null) {
            this.offerImageUrl = find;
        }
    };
    OfferDetailsComponent.prototype.isNotNull = function (item) {
        return item != null;
    };
    OfferDetailsComponent.prototype.navigateToExchangeOffer = function (offerId) {
        this.router.navigate(['/exchange-offer/' + offerId]);
    };
    OfferDetailsComponent.prototype.deleteOffer = function () {
        var _this = this;
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].host + ':8762/offers/' + this.id;
        var reqHeader = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
            Authorization: 'Bearer' + this.token
        });
        this.http.delete(url, { headers: reqHeader })
            .subscribe(function (data) { return console.log(data); }, function (error) { return _this.toastr.error('Unable to delete offer', 'Error'); }, function () {
            _this.toastr.success('Deleted offer', 'Success');
            _this.router.navigate(['/offers']);
        });
    };
    OfferDetailsComponent.prototype.getOfferById = function () {
        var _this = this;
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].host + ':8762/offers/' + this.id;
        var reqHeader = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
            Authorization: 'Bearer' + this.token
        });
        this.http.get(url, { headers: reqHeader })
            .subscribe(function (data) {
            console.log(data);
            _this.offer = data;
            _this.getImageForOffer(data);
        });
    };
    OfferDetailsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-offer-details',
            template: __webpack_require__(/*! ./offer-details.component.html */ "./src/app/offer-details/offer-details.component.html"),
            styles: [__webpack_require__(/*! ./offer-details.component.css */ "./src/app/offer-details/offer-details.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"]])
    ], OfferDetailsComponent);
    return OfferDetailsComponent;
}());



/***/ }),

/***/ "./src/app/received-offer/received-offer.component.css":
/*!*************************************************************!*\
  !*** ./src/app/received-offer/received-offer.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container{max-width:1170px; margin:auto;}\nimg{ max-width:100%;}\n.inbox_people {\n  background: #f8f8f8 none repeat scroll 0 0;\n  float: left;\n  overflow: hidden;\n  width: 100%; border-right:1px solid #c4c4c4;\n}\n.inbox_msg {\n  border: 1px solid #c4c4c4;\n  clear: both;\n  overflow: hidden;\n}\n.top_spac{ margin: 20px 0 0;}\n.recent_heading {float: left; width:40%;}\n.srch_bar {\n  display: inline-block;\n  text-align: right;\n  width: 60%;\n}\n.headind_srch{ padding:10px 29px 10px 20px; overflow:hidden; border-bottom:1px solid #c4c4c4;}\n.recent_heading h4 {\n  color: #05728f;\n  font-size: 21px;\n  margin: auto;\n}\n.srch_bar input{ border:1px solid #cdcdcd; border-width:0 0 1px 0; width:80%; padding:2px 0 4px 6px; background:none;}\n.srch_bar .input-group-addon button {\n  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;\n  border: medium none;\n  padding: 0;\n  color: #707070;\n  font-size: 18px;\n}\n.srch_bar .input-group-addon { margin: 0 0 0 -27px;}\n.chat_ib h5{ font-size:15px; color:#464646; margin:0 0 8px 0;}\n.chat_ib h5 span{ font-size:13px; float:right;}\n.chat_ib p{ font-size:14px; color:#989898; margin:auto}\n.chat_img {\n  float: left;\n  width: 11%;\n}\n.chat_ib {\n  float: left;\n  padding: 0 0 0 15px;\n  width: 88%;\n}\n.chat_people{ overflow:hidden; clear:both;}\n.chat_list {\n  border-bottom: 1px solid #c4c4c4;\n  margin: 0;\n  padding: 18px 16px 10px;\n}\n.inbox_chat { height: 550px; overflow-y: scroll;}\n.active_chat{ background:#ebebeb;}\n.incoming_msg_img {\n  display: inline-block;\n  width: 6%;\n}\n.received_msg {\n  display: inline-block;\n  padding: 0 0 0 10px;\n  vertical-align: top;\n  width: 92%;\n}\n.received_withd_msg p {\n  background: #ebebeb none repeat scroll 0 0;\n  border-radius: 3px;\n  color: #646464;\n  font-size: 14px;\n  margin: 0;\n  padding: 5px 10px 5px 12px;\n  width: 100%;\n}\n.time_date {\n  color: #747474;\n  display: block;\n  font-size: 12px;\n  margin: 8px 0 0;\n}\n.received_withd_msg { width: 57%;}\n.mesgs {\n  float: left;\n  padding: 30px 15px 0 25px;\n  width: 100%;\n}\n.sent_msg p {\n  background: #05728f none repeat scroll 0 0;\n  border-radius: 3px;\n  font-size: 14px;\n  margin: 0; color:#fff;\n  padding: 5px 10px 5px 12px;\n  width:100%;\n}\n.outgoing_msg{ overflow:hidden; margin:26px 0 26px;}\n.sent_msg {\n  float: right;\n  width: 46%;\n}\n.input_msg_write input {\n  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;\n  border: medium none;\n  color: #4c4c4c;\n  font-size: 15px;\n  min-height: 48px;\n  width: 100%;\n}\n.type_msg {border-top: 1px solid #c4c4c4;position: relative;}\n.msg_send_btn {\n  background: #05728f none repeat scroll 0 0;\n  border: medium none;\n  border-radius: 50%;\n  color: #fff;\n  cursor: pointer;\n  font-size: 17px;\n  height: 33px;\n  position: absolute;\n  right: 0;\n  top: 11px;\n  width: 33px;\n}\n.messaging { padding: 0 0 50px 0;}\n.msg_history {\n  height: 516px;\n  overflow-y: auto;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcmVjZWl2ZWQtb2ZmZXIvcmVjZWl2ZWQtb2ZmZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxXQUFXLGdCQUFnQixFQUFFLFdBQVcsQ0FBQztBQUN6QyxLQUFLLGNBQWMsQ0FBQztBQUNwQjtFQUNFLDBDQUEwQztFQUMxQyxXQUFXO0VBQ1gsZ0JBQWdCO0VBQ2hCLFdBQVcsRUFBRSw4QkFBOEI7QUFDN0M7QUFDQTtFQUNFLHlCQUF5QjtFQUN6QixXQUFXO0VBQ1gsZ0JBQWdCO0FBQ2xCO0FBQ0EsV0FBVyxnQkFBZ0IsQ0FBQztBQUc1QixpQkFBaUIsV0FBVyxFQUFFLFNBQVMsQ0FBQztBQUN4QztFQUNFLHFCQUFxQjtFQUNyQixpQkFBaUI7RUFDakIsVUFBVTtBQUNaO0FBQ0EsZUFBZSwyQkFBMkIsRUFBRSxlQUFlLEVBQUUsK0JBQStCLENBQUM7QUFFN0Y7RUFDRSxjQUFjO0VBQ2QsZUFBZTtFQUNmLFlBQVk7QUFDZDtBQUNBLGlCQUFpQix3QkFBd0IsRUFBRSxzQkFBc0IsRUFBRSxTQUFTLEVBQUUscUJBQXFCLEVBQUUsZUFBZSxDQUFDO0FBQ3JIO0VBQ0UsbURBQW1EO0VBQ25ELG1CQUFtQjtFQUNuQixVQUFVO0VBQ1YsY0FBYztFQUNkLGVBQWU7QUFDakI7QUFDQSwrQkFBK0IsbUJBQW1CLENBQUM7QUFFbkQsYUFBYSxjQUFjLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixDQUFDO0FBQzdELGtCQUFrQixjQUFjLEVBQUUsV0FBVyxDQUFDO0FBQzlDLFlBQVksY0FBYyxFQUFFLGFBQWEsRUFBRSxXQUFXO0FBQ3REO0VBQ0UsV0FBVztFQUNYLFVBQVU7QUFDWjtBQUNBO0VBQ0UsV0FBVztFQUNYLG1CQUFtQjtFQUNuQixVQUFVO0FBQ1o7QUFFQSxjQUFjLGVBQWUsRUFBRSxVQUFVLENBQUM7QUFDMUM7RUFDRSxnQ0FBZ0M7RUFDaEMsU0FBUztFQUNULHVCQUF1QjtBQUN6QjtBQUNBLGNBQWMsYUFBYSxFQUFFLGtCQUFrQixDQUFDO0FBRWhELGNBQWMsa0JBQWtCLENBQUM7QUFFakM7RUFDRSxxQkFBcUI7RUFDckIsU0FBUztBQUNYO0FBQ0E7RUFDRSxxQkFBcUI7RUFDckIsbUJBQW1CO0VBQ25CLG1CQUFtQjtFQUNuQixVQUFVO0FBQ1o7QUFDQTtFQUNFLDBDQUEwQztFQUMxQyxrQkFBa0I7RUFDbEIsY0FBYztFQUNkLGVBQWU7RUFDZixTQUFTO0VBQ1QsMEJBQTBCO0VBQzFCLFdBQVc7QUFDYjtBQUNBO0VBQ0UsY0FBYztFQUNkLGNBQWM7RUFDZCxlQUFlO0VBQ2YsZUFBZTtBQUNqQjtBQUNBLHNCQUFzQixVQUFVLENBQUM7QUFDakM7RUFDRSxXQUFXO0VBQ1gseUJBQXlCO0VBQ3pCLFdBQVc7QUFDYjtBQUVBO0VBQ0UsMENBQTBDO0VBQzFDLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsU0FBUyxFQUFFLFVBQVU7RUFDckIsMEJBQTBCO0VBQzFCLFVBQVU7QUFDWjtBQUNBLGVBQWUsZUFBZSxFQUFFLGtCQUFrQixDQUFDO0FBQ25EO0VBQ0UsWUFBWTtFQUNaLFVBQVU7QUFDWjtBQUNBO0VBQ0UsbURBQW1EO0VBQ25ELG1CQUFtQjtFQUNuQixjQUFjO0VBQ2QsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixXQUFXO0FBQ2I7QUFFQSxXQUFXLDZCQUE2QixDQUFDLGtCQUFrQixDQUFDO0FBQzVEO0VBQ0UsMENBQTBDO0VBQzFDLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsV0FBVztFQUNYLGVBQWU7RUFDZixlQUFlO0VBQ2YsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixRQUFRO0VBQ1IsU0FBUztFQUNULFdBQVc7QUFDYjtBQUNBLGFBQWEsbUJBQW1CLENBQUM7QUFDakM7RUFDRSxhQUFhO0VBQ2IsZ0JBQWdCO0FBQ2xCIiwiZmlsZSI6InNyYy9hcHAvcmVjZWl2ZWQtb2ZmZXIvcmVjZWl2ZWQtb2ZmZXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb250YWluZXJ7bWF4LXdpZHRoOjExNzBweDsgbWFyZ2luOmF1dG87fVxuaW1neyBtYXgtd2lkdGg6MTAwJTt9XG4uaW5ib3hfcGVvcGxlIHtcbiAgYmFja2dyb3VuZDogI2Y4ZjhmOCBub25lIHJlcGVhdCBzY3JvbGwgMCAwO1xuICBmbG9hdDogbGVmdDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgd2lkdGg6IDEwMCU7IGJvcmRlci1yaWdodDoxcHggc29saWQgI2M0YzRjNDtcbn1cbi5pbmJveF9tc2cge1xuICBib3JkZXI6IDFweCBzb2xpZCAjYzRjNGM0O1xuICBjbGVhcjogYm90aDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cbi50b3Bfc3BhY3sgbWFyZ2luOiAyMHB4IDAgMDt9XG5cblxuLnJlY2VudF9oZWFkaW5nIHtmbG9hdDogbGVmdDsgd2lkdGg6NDAlO31cbi5zcmNoX2JhciB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gIHdpZHRoOiA2MCU7XG59XG4uaGVhZGluZF9zcmNoeyBwYWRkaW5nOjEwcHggMjlweCAxMHB4IDIwcHg7IG92ZXJmbG93OmhpZGRlbjsgYm9yZGVyLWJvdHRvbToxcHggc29saWQgI2M0YzRjNDt9XG5cbi5yZWNlbnRfaGVhZGluZyBoNCB7XG4gIGNvbG9yOiAjMDU3MjhmO1xuICBmb250LXNpemU6IDIxcHg7XG4gIG1hcmdpbjogYXV0bztcbn1cbi5zcmNoX2JhciBpbnB1dHsgYm9yZGVyOjFweCBzb2xpZCAjY2RjZGNkOyBib3JkZXItd2lkdGg6MCAwIDFweCAwOyB3aWR0aDo4MCU7IHBhZGRpbmc6MnB4IDAgNHB4IDZweDsgYmFja2dyb3VuZDpub25lO31cbi5zcmNoX2JhciAuaW5wdXQtZ3JvdXAtYWRkb24gYnV0dG9uIHtcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwKSBub25lIHJlcGVhdCBzY3JvbGwgMCAwO1xuICBib3JkZXI6IG1lZGl1bSBub25lO1xuICBwYWRkaW5nOiAwO1xuICBjb2xvcjogIzcwNzA3MDtcbiAgZm9udC1zaXplOiAxOHB4O1xufVxuLnNyY2hfYmFyIC5pbnB1dC1ncm91cC1hZGRvbiB7IG1hcmdpbjogMCAwIDAgLTI3cHg7fVxuXG4uY2hhdF9pYiBoNXsgZm9udC1zaXplOjE1cHg7IGNvbG9yOiM0NjQ2NDY7IG1hcmdpbjowIDAgOHB4IDA7fVxuLmNoYXRfaWIgaDUgc3BhbnsgZm9udC1zaXplOjEzcHg7IGZsb2F0OnJpZ2h0O31cbi5jaGF0X2liIHB7IGZvbnQtc2l6ZToxNHB4OyBjb2xvcjojOTg5ODk4OyBtYXJnaW46YXV0b31cbi5jaGF0X2ltZyB7XG4gIGZsb2F0OiBsZWZ0O1xuICB3aWR0aDogMTElO1xufVxuLmNoYXRfaWIge1xuICBmbG9hdDogbGVmdDtcbiAgcGFkZGluZzogMCAwIDAgMTVweDtcbiAgd2lkdGg6IDg4JTtcbn1cblxuLmNoYXRfcGVvcGxleyBvdmVyZmxvdzpoaWRkZW47IGNsZWFyOmJvdGg7fVxuLmNoYXRfbGlzdCB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjYzRjNGM0O1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDE4cHggMTZweCAxMHB4O1xufVxuLmluYm94X2NoYXQgeyBoZWlnaHQ6IDU1MHB4OyBvdmVyZmxvdy15OiBzY3JvbGw7fVxuXG4uYWN0aXZlX2NoYXR7IGJhY2tncm91bmQ6I2ViZWJlYjt9XG5cbi5pbmNvbWluZ19tc2dfaW1nIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aWR0aDogNiU7XG59XG4ucmVjZWl2ZWRfbXNnIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBwYWRkaW5nOiAwIDAgMCAxMHB4O1xuICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICB3aWR0aDogOTIlO1xufVxuLnJlY2VpdmVkX3dpdGhkX21zZyBwIHtcbiAgYmFja2dyb3VuZDogI2ViZWJlYiBub25lIHJlcGVhdCBzY3JvbGwgMCAwO1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG4gIGNvbG9yOiAjNjQ2NDY0O1xuICBmb250LXNpemU6IDE0cHg7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogNXB4IDEwcHggNXB4IDEycHg7XG4gIHdpZHRoOiAxMDAlO1xufVxuLnRpbWVfZGF0ZSB7XG4gIGNvbG9yOiAjNzQ3NDc0O1xuICBkaXNwbGF5OiBibG9jaztcbiAgZm9udC1zaXplOiAxMnB4O1xuICBtYXJnaW46IDhweCAwIDA7XG59XG4ucmVjZWl2ZWRfd2l0aGRfbXNnIHsgd2lkdGg6IDU3JTt9XG4ubWVzZ3Mge1xuICBmbG9hdDogbGVmdDtcbiAgcGFkZGluZzogMzBweCAxNXB4IDAgMjVweDtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5zZW50X21zZyBwIHtcbiAgYmFja2dyb3VuZDogIzA1NzI4ZiBub25lIHJlcGVhdCBzY3JvbGwgMCAwO1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbWFyZ2luOiAwOyBjb2xvcjojZmZmO1xuICBwYWRkaW5nOiA1cHggMTBweCA1cHggMTJweDtcbiAgd2lkdGg6MTAwJTtcbn1cbi5vdXRnb2luZ19tc2d7IG92ZXJmbG93OmhpZGRlbjsgbWFyZ2luOjI2cHggMCAyNnB4O31cbi5zZW50X21zZyB7XG4gIGZsb2F0OiByaWdodDtcbiAgd2lkdGg6IDQ2JTtcbn1cbi5pbnB1dF9tc2dfd3JpdGUgaW5wdXQge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDApIG5vbmUgcmVwZWF0IHNjcm9sbCAwIDA7XG4gIGJvcmRlcjogbWVkaXVtIG5vbmU7XG4gIGNvbG9yOiAjNGM0YzRjO1xuICBmb250LXNpemU6IDE1cHg7XG4gIG1pbi1oZWlnaHQ6IDQ4cHg7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4udHlwZV9tc2cge2JvcmRlci10b3A6IDFweCBzb2xpZCAjYzRjNGM0O3Bvc2l0aW9uOiByZWxhdGl2ZTt9XG4ubXNnX3NlbmRfYnRuIHtcbiAgYmFja2dyb3VuZDogIzA1NzI4ZiBub25lIHJlcGVhdCBzY3JvbGwgMCAwO1xuICBib3JkZXI6IG1lZGl1bSBub25lO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGNvbG9yOiAjZmZmO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtc2l6ZTogMTdweDtcbiAgaGVpZ2h0OiAzM3B4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAwO1xuICB0b3A6IDExcHg7XG4gIHdpZHRoOiAzM3B4O1xufVxuLm1lc3NhZ2luZyB7IHBhZGRpbmc6IDAgMCA1MHB4IDA7fVxuLm1zZ19oaXN0b3J5IHtcbiAgaGVpZ2h0OiA1MTZweDtcbiAgb3ZlcmZsb3cteTogYXV0bztcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/received-offer/received-offer.component.html":
/*!**************************************************************!*\
  !*** ./src/app/received-offer/received-offer.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" style=\"margin: 5% auto;\">\n  <div class=\"card\">\n    <div class=\"row\">\n      <aside class=\"col-sm-7 mt-3\">\n        <article class=\"card-body p-5\">\n          <dl class=\"param param-feature\">\n            <dt>{{userFromSourceOffer.login}}'s games from offer</dt>\n            <div class=\"container-fluid\" >\n              <div class=\"row flex-nowrap\" style=\"overflow-x: scroll\">\n                <div class=\"card h-100\"  *ngFor=\"let game of offer.sourceOffer.games\">\n                  <div class=\"card-img-top\" style=\"width: 9vw;height: 10vw;object-fit: cover; text-align: center\"><img style=\"max-height: 100%;max-width: 100%\" src=\"{{game.coverUrl}}\" alt=\"Card image cap\"></div>\n                  <div class=\"card-body\">\n                    <a href=\"/game-details/{{game.id}}\"><h5 class=\"card-title\">{{game.name}}</h5></a>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </dl>\n          <dl class=\"param param-feature\">\n            <dt>{{userWhoOffer.login}}'s offers games for exchange</dt>\n            <div class=\"container-fluid\" >\n              <div class=\"row flex-nowrap\" style=\"overflow-x: scroll\">\n                <div class=\"card h-100\"  *ngFor=\"let game of offer.offeredGames\">\n                  <div class=\"card-img-top\" style=\"width: 9vw;height: 10vw;object-fit: cover; text-align: center\"><img style=\"max-height: 100%;max-width: 100%\" src=\"{{game.coverUrl}}\" alt=\"Card image cap\"></div>\n                  <div class=\"card-body\">\n                    <a href=\"/game-details/{{game.id}}\"><h5 class=\"card-title\">{{game.name}}</h5></a>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </dl>\n\n          <button *ngIf=\"currentUser === offer.sourceOffer.accountName\" (click)=\"acceptOffer()\"  class=\"btn btn-success\">Accept</button>\n          <button *ngIf=\"currentUser === offer.sourceOffer.accountName\" (click)=\"declineOffer()\" class=\"btn btn-danger\">Decline</button>\n        </article> <!-- card-body.// -->\n      </aside> <!-- col.// -->\n      <aside class=\"col-sm-5 border-left\">\n        <article class=\"card-body\">\n          <dl class=\"item-property badge-warning\">\n            <dt>Note</dt>\n            <dd><p>Please accept offer after both sides received games, after this your games will be exchanged between accounts.</p></dd>\n          </dl>\n          <dl class=\"item-property\">\n            <dt>Comment</dt>\n            <dd><p>{{offer.commentary}}</p></dd>\n          </dl>\n          <dl class=\"item-property\">\n            <dt>User</dt>\n            <dd><p>{{offer.accountName}}</p></dd>\n          </dl>\n          <dl class=\"item-property\">\n            <dt>User's email</dt>\n            <dd><p>{{userWhoOffer.email}}</p></dd>\n          </dl>\n        </article>\n\n\n\n\n\n\n\n          <div class=\"messaging\">\n            <div class=\"inbox_msg\">\n              <div class=\"inbox_people\">\n                <div class=\"headind_srch\">\n                  <div class=\"recent_heading\">\n                    <h4>Chat</h4>\n                  </div>\n                </div>\n              <div class=\"mesgs\">\n                <div class=\"msg_history\" #scrollMe [scrollTop]=\"scrollMe.scrollHeight\">\n                  <div  *ngFor=\"let message of historyMessages\">\n                    <div [ngClass]=\"(message.accountId === offer.accountId)?'incoming_msg':'outgoing_msg'\" >\n                      <div [ngClass]=\"(message.accountId === offer.accountId)?'received_msg':'sent_msg'\">\n                        <div class=\"received_withd_msg\" [ngClass]=\"(message.accountId === offer.accountId)?'received_withd_msg':''\">\n                          <p>{{message.messageText}}</p>\n                          <span class=\"time_date\">{{message.date}} | {{message.accountName}}</span></div>\n                      </div>\n                    </div>\n                  </div>\n\n<!--                  <div class=\"outgoing_msg\">-->\n<!--                    <div class=\"sent_msg\">-->\n<!--                      <p>Test which is a new approach to have all-->\n<!--                        solutions</p>-->\n<!--                      <span class=\"time_date\"> 11:01 AM    |    June 9</span> </div>-->\n<!--                  </div>-->\n                </div>\n                <div class=\"type_msg\">\n                  <div class=\"input_msg_write\">\n                    <input id=\"textToSend\" type=\"text\" [value]=\"textToSend\" #textToSendFromTemp class=\"write_msg\" placeholder=\"Type a message\" />\n                    <button class=\"msg_send_btn\" (click)=\"sendMessage(textToSendFromTemp.value)\" type=\"button\"><i class=\"fa fa-paper-plane-o\" aria-hidden=\"true\"></i></button>\n                  </div>\n                </div>\n              </div>\n            </div>\n            </div>\n\n\n          </div>\n      </aside>\n    </div> <!-- row.// -->\n  </div> <!-- card.// -->\n\n\n</div>\n<!--container.//-->\n"

/***/ }),

/***/ "./src/app/received-offer/received-offer.component.ts":
/*!************************************************************!*\
  !*** ./src/app/received-offer/received-offer.component.ts ***!
  \************************************************************/
/*! exports provided: ReceivedOfferComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReceivedOfferComponent", function() { return ReceivedOfferComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");







var ReceivedOfferComponent = /** @class */ (function () {
    function ReceivedOfferComponent(route, router, http, toastr) {
        this.route = route;
        this.router = router;
        this.http = http;
        this.toastr = toastr;
        this.messageToSend = {};
        this.offerImageUrl = '../../assets/default-game.png';
        this.token = sessionStorage.getItem('token');
    }
    ReceivedOfferComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.token == null) {
            this.router.navigate(['']);
        }
        else {
            this.id = this.route.snapshot.paramMap.get('id');
            this.currentUser = sessionStorage.getItem('currentUser');
            this.getOfferById();
            this.getMessageHistory();
            Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["interval"])(5000)
                .subscribe(function (val) {
                _this.getMessageHistory();
            });
        }
    };
    ReceivedOfferComponent.prototype.getOfferById = function () {
        var _this = this;
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].host + ':8762/offers/exchangeOffer/' + this.id;
        var reqHeader = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            Authorization: 'Bearer' + this.token
        });
        this.http.get(url, { headers: reqHeader })
            .subscribe(function (data) {
            console.log(data);
            _this.offer = data;
        }, function (error) { return (console.log(error)); }, function () {
            _this.getUserByLogin(_this.offer.accountId);
            _this.getUserFromSourceOffer(_this.offer.sourceOffer.accountId);
        });
    };
    ReceivedOfferComponent.prototype.getUserByLogin = function (login) {
        var _this = this;
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].host + ':8762/accounts/byId/' + login;
        var reqHeader = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            Authorization: 'Bearer' + this.token
        });
        this.http.get(url, { headers: reqHeader })
            .subscribe(function (data) {
            console.log(data);
            _this.userWhoOffer = data;
        });
    };
    ReceivedOfferComponent.prototype.getUserFromSourceOffer = function (login) {
        var _this = this;
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].host + ':8762/accounts/byId/' + login;
        var reqHeader = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            Authorization: 'Bearer' + this.token
        });
        this.http.get(url, { headers: reqHeader })
            .subscribe(function (data) {
            console.log(data);
            _this.userFromSourceOffer = data;
        });
    };
    ReceivedOfferComponent.prototype.acceptOffer = function () {
        var _this = this;
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].host + ':8762/offers/acceptOffer/' + this.id;
        var reqHeader = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            Authorization: 'Bearer' + this.token
        });
        this.http.post(url, null, { headers: reqHeader })
            .subscribe(function (data) {
        }, function (error) { return _this.toastr.error('Unable to accept offer', 'Error'); }, function () {
            _this.toastr.success('Offer accepted', 'Success');
            _this.router.navigate(['/user-details']);
        });
    };
    ReceivedOfferComponent.prototype.declineOffer = function () {
        var _this = this;
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].host + ':8762/offers/declineOffer/' + this.id;
        var reqHeader = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            Authorization: 'Bearer' + this.token
        });
        this.http.post(url, null, { headers: reqHeader })
            .subscribe(function (data) {
        }, function (error) { return _this.toastr.error('Unable to decline offer', 'Error'); }, function () {
            _this.toastr.success('Offer declined', 'Success');
            _this.router.navigate(['/user-details']);
        });
    };
    ReceivedOfferComponent.prototype.sendMessage = function (text) {
        var _this = this;
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].host + ':8762/message';
        var reqHeader = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            Authorization: 'Bearer' + this.token
        });
        this.messageToSend.exchangeOfferId = Number(this.id);
        this.messageToSend.messageText = text;
        this.http.post(url, this.messageToSend, { headers: reqHeader })
            .subscribe(function (data) {
            _this.getMessageHistory();
        }, function (error) { return _this.toastr.error('Unable to send message', 'Error'); }, function () {
            _this.toastr.success('Message sent', 'Success');
        });
    };
    ReceivedOfferComponent.prototype.getMessageHistory = function () {
        var _this = this;
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].host + ':8762/message/history/' + this.id;
        var reqHeader = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            Authorization: 'Bearer' + this.token
        });
        this.http.get(url, { headers: reqHeader })
            .subscribe(function (data) {
            _this.historyMessages = data;
        });
    };
    ReceivedOfferComponent.prototype.handleOnChange = function ($event) {
        // @ts-ignore
        this.textToSend = $event.data;
    };
    ReceivedOfferComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-received-offer',
            template: __webpack_require__(/*! ./received-offer.component.html */ "./src/app/received-offer/received-offer.component.html"),
            styles: [__webpack_require__(/*! ./received-offer.component.css */ "./src/app/received-offer/received-offer.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"]])
    ], ReceivedOfferComponent);
    return ReceivedOfferComponent;
}());



/***/ }),

/***/ "./src/app/received-offers/received-offers.component.css":
/*!***************************************************************!*\
  !*** ./src/app/received-offers/received-offers.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3JlY2VpdmVkLW9mZmVycy9yZWNlaXZlZC1vZmZlcnMuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/received-offers/received-offers.component.html":
/*!****************************************************************!*\
  !*** ./src/app/received-offers/received-offers.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container py-5\">\n  <div class=\"row\">\n    <div class=\"col-lg-8 mx-auto\" style=\"margin: 5%\">\n      <!-- List group-->\n      <ul class=\"list-group shadow\" *ngFor=\"let receivedOffer of receivedOffers\">\n\n        <!-- list group item-->\n        <li class=\"list-group-item\">\n          <!-- Custom content-->\n          <div class=\"media align-items-lg-center flex-column flex-lg-row p-3\">\n            <div class=\"media-body order-2 order-lg-1\">\n              <div class=\"d-flex align-items-center justify-content-between mt-1\">\n                <h6 class=\"font-weight-bold my-2\">Exchange offer for your  offer: {{receivedOffer.sourceOffer.title}} from {{receivedOffer.accountName}}</h6>\n                <button class=\"btn btn-primary\" (click)=\"navigateToOffer(receivedOffer.id)\">Show offer</button>\n              </div>\n            </div>\n\n          </div>\n          <!-- End -->\n        </li>\n        <!-- End -->\n      </ul>\n      <!-- End -->\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/received-offers/received-offers.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/received-offers/received-offers.component.ts ***!
  \**************************************************************/
/*! exports provided: ReceivedOffersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReceivedOffersComponent", function() { return ReceivedOffersComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");






var ReceivedOffersComponent = /** @class */ (function () {
    function ReceivedOffersComponent(route, router, http, toastr) {
        this.route = route;
        this.router = router;
        this.http = http;
        this.toastr = toastr;
        this.token = sessionStorage.getItem('token');
    }
    ReceivedOffersComponent.prototype.ngOnInit = function () {
        if (this.token == null) {
            this.router.navigate(['']);
        }
        else {
            this.getAllReceivedOffers();
        }
    };
    ReceivedOffersComponent.prototype.getAllReceivedOffers = function () {
        var _this = this;
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].host + ':8762/offers/receivedOffers';
        var reqHeader = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
            Authorization: 'Bearer' + this.token
        });
        this.http.get(url, { headers: reqHeader })
            .subscribe(function (data) {
            console.log(data);
            _this.receivedOffers = data;
        });
    };
    ReceivedOffersComponent.prototype.navigateToOffer = function (id) {
        this.router.navigate(['/received-offer/' + id]);
    };
    ReceivedOffersComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-received-offers',
            template: __webpack_require__(/*! ./received-offers.component.html */ "./src/app/received-offers/received-offers.component.html"),
            styles: [__webpack_require__(/*! ./received-offers.component.css */ "./src/app/received-offers/received-offers.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"]])
    ], ReceivedOffersComponent);
    return ReceivedOffersComponent;
}());



/***/ }),

/***/ "./src/app/registration/registration.component.css":
/*!*********************************************************!*\
  !*** ./src/app/registration/registration.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3JlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/registration/registration.component.html":
/*!**********************************************************!*\
  !*** ./src/app/registration/registration.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"registration\" style=\"margin: 5%\">\n  <form name=\"form\" (ngSubmit)=\"f.form.valid && onSubmit()\" #f=\"ngForm\" novalidate>\n    <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !login.valid }\">\n      <label for=\"username\">Username</label>\n      <input id=\"username\" class=\"form-control\" type=\"text\" name=\"username\" [(ngModel)]=\"account.login\"\n             #login=\"ngModel\" required/>\n      <div *ngIf=\"f.submitted && !login.valid\">Username is required</div>\n    </div>\n    <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !password.valid }\">\n      <label for=\"password\">Password</label>\n      <input id=\"password\" class=\"form-control\" type=\"password\" name=\"password\" [(ngModel)]=\"account.password\"\n             #password=\"ngModel\" required/>\n      <div *ngIf=\"f.submitted && !password.valid\">Password is required</div>\n    </div>\n    <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !email.valid }\">\n      <label for=\"email\">Email</label>\n      <input id=\"email\" class=\"form-control\" type=\"email\" name=\"email\" [(ngModel)]=\"account.email\"\n             #email=\"ngModel\" required/>\n      <div *ngIf=\"f.submitted && !email.valid\">Email is required</div>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"name\">Name</label>\n      <input id=\"name\" class=\"form-control\" type=\"text\" name=\"name\" [(ngModel)]=\"account.name\"/>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"surname\">Surname</label>\n      <input id=\"surname\" class=\"form-control\" type=\"text\" name=\"surname\" [(ngModel)]=\"account.surname\"/>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"file\">Profile image</label>\n      <input type=\"file\" class=\"form-control-file\" id=\"file\" name=\"file\" (change)=\"fileChangeEvent($event)\">\n\n      <div class=\"form-inline justify-content-between\" style=\"width: 40%; height: 20%\">\n        <image-cropper style=\"height: 30%; width: 30%\"\n                       [imageChangedEvent]=\"imageChangedEvent\"\n                       [roundCropper]=\"true\"\n                       [aspectRatio]=\"1 / 1\"\n                       [containWithinAspectRatio]=\"true\"\n                       alignImage=\"center\"\n                       format=\"png\"\n                       (imageCropped)=\"imageCropped($event)\"\n                       (imageLoaded)=\"imageLoaded()\"\n                       (cropperReady)=\"cropperReady()\"\n                       (loadImageFailed)=\"loadImageFailed()\"\n        ></image-cropper>\n\n        <img style=\"width: 20%; height: 20%; border-radius: 50%\" *ngIf=\"croppedPreview!=null && croppedImage!='undefined'\" [src]=\"croppedPreview\" alt=\"image\"/></div>\n    </div>\n    <button type=\"submit\" class=\"btn btn-primary\">Register</button>\n  </form>\n</div>\n"

/***/ }),

/***/ "./src/app/registration/registration.component.ts":
/*!********************************************************!*\
  !*** ./src/app/registration/registration.component.ts ***!
  \********************************************************/
/*! exports provided: RegistrationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistrationComponent", function() { return RegistrationComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");






var RegistrationComponent = /** @class */ (function () {
    function RegistrationComponent(route, router, http, toastr) {
        this.route = route;
        this.router = router;
        this.http = http;
        this.toastr = toastr;
        this.account = {};
        this.imageChangedEvent = '';
        this.croppedImage = '';
    }
    RegistrationComponent.prototype.ngOnInit = function () {
    };
    RegistrationComponent.prototype.onSubmit = function () {
        var _this = this;
        var formData = new FormData();
        formData.append('account', JSON.stringify(this.account));
        if (this.croppedImage !== '' && this.croppedImage != null) {
            var blob = this.extracted();
            formData.append('file', blob);
        }
        this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].host + ':8762/' + 'accounts/register', formData)
            .subscribe(function (data) { return console.log(data); }, function (err) { return _this.toastr.error('Unable to register', 'Unable to register'); }, function () {
            _this.router.navigate(['/login']);
        });
    };
    RegistrationComponent.prototype.extracted = function () {
        var contentType = this.croppedImage.split(';')[0];
        var byteCharacters = atob(this.croppedImage.split(',')[1]);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        return new File([byteArray], this.account.name + '_' + this.fileName);
    };
    RegistrationComponent.prototype.selectFile = function (event) {
        this.selectedFiles = event.target.files;
    };
    RegistrationComponent.prototype.fileChangeEvent = function (event) {
        this.imageChangedEvent = event;
        this.fileName = event.target.files.item(0).name;
    };
    RegistrationComponent.prototype.imageCropped = function (event) {
        this.croppedImage = event.base64;
        this.croppedPreview = event.base64;
    };
    RegistrationComponent.prototype.imageLoaded = function () {
        // show cropper
    };
    RegistrationComponent.prototype.cropperReady = function () {
    };
    RegistrationComponent.prototype.loadImageFailed = function () {
        // show message
    };
    RegistrationComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-registration',
            template: __webpack_require__(/*! ./registration.component.html */ "./src/app/registration/registration.component.html"),
            styles: [__webpack_require__(/*! ./registration.component.css */ "./src/app/registration/registration.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"]])
    ], RegistrationComponent);
    return RegistrationComponent;
}());



/***/ }),

/***/ "./src/app/sent-offers/sent-offers.component.css":
/*!*******************************************************!*\
  !*** ./src/app/sent-offers/sent-offers.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NlbnQtb2ZmZXJzL3NlbnQtb2ZmZXJzLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/sent-offers/sent-offers.component.html":
/*!********************************************************!*\
  !*** ./src/app/sent-offers/sent-offers.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container py-5\">\n  <div class=\"row\">\n    <div class=\"col-lg-8 mx-auto\" style=\"margin: 5%\">\n      <!-- List group-->\n      <ul class=\"list-group shadow\" *ngFor=\"let sentOffer of sentOffers\">\n\n        <!-- list group item-->\n        <li class=\"list-group-item\">\n          <!-- Custom content-->\n          <div class=\"media align-items-lg-center flex-column flex-lg-row p-3\">\n            <div class=\"media-body order-2 order-lg-1\">\n              <div class=\"d-flex align-items-center justify-content-between mt-1\">\n                <h6 class=\"font-weight-bold my-2\">You have sent exchange offer for this offer: <a href=\"/offer-details/{{sentOffer.sourceOffer.id}}\">{{sentOffer.sourceOffer.title}}</a></h6>\n                <button class=\"btn btn-primary\" (click)=\"navigateToOffer(sentOffer.id)\">Show offer</button>\n              </div>\n            </div>\n\n          </div>\n          <!-- End -->\n        </li>\n        <!-- End -->\n      </ul>\n      <!-- End -->\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/sent-offers/sent-offers.component.ts":
/*!******************************************************!*\
  !*** ./src/app/sent-offers/sent-offers.component.ts ***!
  \******************************************************/
/*! exports provided: SentOffersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SentOffersComponent", function() { return SentOffersComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");






var SentOffersComponent = /** @class */ (function () {
    function SentOffersComponent(route, router, http, toastr) {
        this.route = route;
        this.router = router;
        this.http = http;
        this.toastr = toastr;
        this.token = sessionStorage.getItem('token');
    }
    SentOffersComponent.prototype.ngOnInit = function () {
        if (this.token == null) {
            this.router.navigate(['']);
        }
        else {
            this.getAllSentffers();
        }
    };
    SentOffersComponent.prototype.getAllSentffers = function () {
        var _this = this;
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].host + ':8762/offers/sentOffers';
        var reqHeader = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
            Authorization: 'Bearer' + this.token
        });
        this.http.get(url, { headers: reqHeader })
            .subscribe(function (data) {
            console.log(data);
            _this.sentOffers = data;
        });
    };
    SentOffersComponent.prototype.navigateToOffer = function (id) {
        this.router.navigate(['/received-offer/' + id]);
    };
    SentOffersComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-sent-offers',
            template: __webpack_require__(/*! ./sent-offers.component.html */ "./src/app/sent-offers/sent-offers.component.html"),
            styles: [__webpack_require__(/*! ./sent-offers.component.css */ "./src/app/sent-offers/sent-offers.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"]])
    ], SentOffersComponent);
    return SentOffersComponent;
}());



/***/ }),

/***/ "./src/app/user-details/user-details.component.css":
/*!*********************************************************!*\
  !*** ./src/app/user-details/user-details.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3VzZXItZGV0YWlscy91c2VyLWRldGFpbHMuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/user-details/user-details.component.html":
/*!**********************************************************!*\
  !*** ./src/app/user-details/user-details.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"user-details\" style=\"margin: 5%;\">\n\n  <div class=\"card\" style=\"width: 18rem;  display: inline-block; float: left; margin-right: 5%\">\n    <img class=\"card-img-top\" src=\"{{profileImage}}\" alt=\"Card image cap\">\n    <div class=\"card-body\">\n      <h5 class=\"card-title\">{{account.name}} {{account.surname}}</h5>\n      <p class=\"card-text\">{{account.email}}</p>\n    </div>\n    <ul class=\"list-group list-group-flush\">\n      <h5 class=\"card-title\">Login</h5>\n      <li class=\"list-group-item\">{{account.login}}</li>\n      <h5 class=\"card-title\">Email</h5>\n      <li class=\"list-group-item\">{{account.email}}</li>\n    </ul>\n<!--    <div class=\"card-body\">-->\n<!--      <a href=\"#\" class=\"card-link\">Card link</a>-->\n<!--      <a href=\"#\" class=\"card-link\">Another link</a>-->\n<!--    </div>-->\n  </div>\n\n  <div class=\"list-group\" style=\" display: inline-block; float: left; margin-left: 5%\">\n    <dl class=\"param param-feature\">\n      <dt>My Games</dt>\n      <div class=\"container-fluid\" >\n        <div class=\"row flex-nowrap\" style=\"overflow-x: scroll\">\n          <div class=\"card h-100\"  *ngFor=\"let game of games\">\n            <div class=\"card-img-top\" style=\"width: 13vw;height: 10vw;object-fit: cover; text-align: center\"><img style=\"max-height: 100%;max-width: 100%\" src=\"{{game.coverUrl}}\" alt=\"Card image cap\"></div>\n            <div class=\"card-body\">\n              <a href=\"/game-details/{{game.id}}\"><h5 class=\"card-title\">{{game.name}}</h5></a>\n              <button class=\"btn btn-danger\" (click)=\"removeGameFromLibrary(game.id)\">Delete</button>\n            </div>\n          </div>\n        </div>\n      </div>\n    </dl>\n    <!-- item-property-hor .// -->\n    <dl class=\"param param-feature\">\n      <dt>My Offers</dt>\n      <div class=\"container-fluid\" >\n        <div class=\"row flex-nowrap\" style=\"overflow-x: scroll\">\n          <div class=\"card h-100\"  *ngFor=\"let offer of offers\">\n            <div class=\"card-img-top\" style=\"width: 13vw;height: 10vw;object-fit: cover; text-align: center\"><img style=\"max-height: 100%;max-width: 100%\" src=\"{{offer.imageUrl}}\" alt=\"Card image cap\"></div>\n            <div class=\"card-body\">\n              <a href=\"/offer-details/{{offer.id}}\"><h5 class=\"card-title\">{{offer.title}}</h5></a>\n            </div>\n          </div>\n        </div>\n      </div>\n    </dl>\n    <!-- item-property-hor .// -->\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/user-details/user-details.component.ts":
/*!********************************************************!*\
  !*** ./src/app/user-details/user-details.component.ts ***!
  \********************************************************/
/*! exports provided: UserDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserDetailsComponent", function() { return UserDetailsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");






var UserDetailsComponent = /** @class */ (function () {
    function UserDetailsComponent(route, router, http, toastr) {
        this.route = route;
        this.router = router;
        this.http = http;
        this.toastr = toastr;
        this.account = {};
        this.url = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].host + ':8762/downloadFile/' + this.account.imageUrl;
        this.token = sessionStorage.getItem('token');
    }
    UserDetailsComponent.prototype.ngOnInit = function () {
        if (this.token == null) {
            this.router.navigate(['']);
        }
        else {
            this.getUserByLogin();
            this.getAllUsersGames();
            this.getAllUsersOffers();
        }
    };
    UserDetailsComponent.prototype.getUserByLogin = function () {
        var _this = this;
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].host + ':8762/accounts/user-details';
        var reqHeader = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
            Authorization: 'Bearer' + this.token
        });
        this.http.get(url, { headers: reqHeader })
            .subscribe(function (data) {
            console.log(data);
            _this.account = data;
            if (_this.account.imageUrl != null && _this.account.imageUrl !== 'undefined') {
                _this.getImage();
            }
            else {
                _this.profileImage = '/assets/default-profile.png';
            }
        });
    };
    UserDetailsComponent.prototype.getImage = function () {
        var _this = this;
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].host + ':8762/downloadFile/' + this.account.imageUrl;
        this.http.get(url, { responseType: 'blob' })
            .subscribe(function (data) {
            _this.createImageFromBlob(data);
            _this.profileImage = data;
            console.log(data);
        }, (function (data) {
            console.log(data);
            _this.profileImage = '/assets/default-profile.png';
        }));
    };
    UserDetailsComponent.prototype.createImageFromBlob = function (image) {
        var _this = this;
        var reader = new FileReader();
        reader.addEventListener('load', function () {
            _this.profileImage = reader.result;
        }, false);
        if (image) {
            reader.readAsDataURL(image);
        }
    };
    UserDetailsComponent.prototype.getAllUsersGames = function () {
        var _this = this;
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].host + ':8762/library';
        var reqHeader = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
            Authorization: 'Bearer' + this.token
        });
        this.http.get(url, { headers: reqHeader })
            .subscribe(function (data) {
            console.log(data);
            _this.games = data;
        });
    };
    UserDetailsComponent.prototype.getAllUsersOffers = function () {
        var _this = this;
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].host + ':8762/offers/user-offers';
        var reqHeader = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
            Authorization: 'Bearer' + this.token
        });
        this.http.get(url, { headers: reqHeader })
            .subscribe(function (data) {
            console.log(data);
            _this.offers = data;
        });
    };
    UserDetailsComponent.prototype.removeGameFromLibrary = function (gameId) {
        var _this = this;
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].host + ':8762/library/' + gameId;
        var reqHeader = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]({
            Authorization: 'Bearer' + this.token,
            'Content-type': 'application/json'
        });
        this.http.delete(url, { headers: reqHeader })
            .subscribe(function (data) { return console.log(data); }, function (error) {
            console.log(error);
            _this.toastr.error('Unable to delete game', 'Error');
        }, function () {
            console.log('success');
            _this.toastr.success('Game was deleted successfully', 'Success');
            window.location.reload();
        });
    };
    UserDetailsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-user-details',
            template: __webpack_require__(/*! ./user-details.component.html */ "./src/app/user-details/user-details.component.html"),
            styles: [__webpack_require__(/*! ./user-details.component.css */ "./src/app/user-details/user-details.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"]])
    ], UserDetailsComponent);
    return UserDetailsComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    host: 'http://156.17.130.98'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/chepiv/personal/projects/games-exchanger/ui-service/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map
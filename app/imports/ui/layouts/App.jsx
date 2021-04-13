"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var PropTypes = require("prop-types");
var meteor_1 = require("meteor/meteor");
require("semantic-ui-css/semantic.css");
var alanning_roles_1 = require("meteor/alanning:roles");
var react_router_dom_1 = require("react-router-dom");
var NavBar_1 = require("../components/NavBar");
var Footer_1 = require("../components/Footer");
var Landing_1 = require("../pages/Landing");
var ListStuff_1 = require("../pages/ListStuff");
var ListStuffAdmin_1 = require("../pages/ListStuffAdmin");
var AddStuff_1 = require("../pages/AddStuff");
var EditStuff_1 = require("../pages/EditStuff");
var NotFound_1 = require("../pages/NotFound");
var Signin_1 = require("../pages/Signin");
var Signup_1 = require("../pages/Signup");
var Signout_1 = require("../pages/Signout");
/** Top-level layout component for this application. Called in imports/startup/client/startup.tsx. */
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return (<react_router_dom_1.HashRouter>
          <div>
            <NavBar_1.default />
            <react_router_dom_1.Switch>
              <react_router_dom_1.Route exact path="/" component={Landing_1.default}/>
              <react_router_dom_1.Route path="/signin" component={Signin_1.default}/>
              <react_router_dom_1.Route path="/signup" component={Signup_1.default}/>
              <ProtectedRoute path="/list" component={ListStuff_1.default}/>
              <ProtectedRoute path="/add" component={AddStuff_1.default}/>
              <ProtectedRoute path="/edit/:_id" component={EditStuff_1.default}/>
              <AdminProtectedRoute path="/admin" component={ListStuffAdmin_1.default}/>
              <ProtectedRoute path="/signout" component={Signout_1.default}/>
              <react_router_dom_1.Route component={NotFound_1.default}/>
            </react_router_dom_1.Switch>
            <Footer_1.default />
          </div>
        </react_router_dom_1.HashRouter>);
    };
    return App;
}(React.Component));
/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
var ProtectedRoute = function (_a) {
    var Component = _a.component, rest = __rest(_a, ["component"]);
    return (<react_router_dom_1.Route {...rest} render={function (props) {
        var isLogged = meteor_1.Meteor.userId() !== null;
        return isLogged ?
            (<Component {...props}/>) :
            (<react_router_dom_1.Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>);
    }}/>);
};
/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
var AdminProtectedRoute = function (_a) {
    var Component = _a.component, rest = __rest(_a, ["component"]);
    return (<react_router_dom_1.Route {...rest} render={function (props) {
        var isLogged = meteor_1.Meteor.userId() !== null;
        var isAdmin = alanning_roles_1.Roles.userIsInRole(meteor_1.Meteor.userId(), 'admin');
        return (isLogged && isAdmin) ?
            (<Component {...props}/>) :
            (<react_router_dom_1.Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>);
    }}/>);
};
/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
    component: PropTypes.func.isRequired,
    location: PropTypes.object,
};
/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
    component: PropTypes.func.isRequired,
    location: PropTypes.object,
};
exports.default = App;

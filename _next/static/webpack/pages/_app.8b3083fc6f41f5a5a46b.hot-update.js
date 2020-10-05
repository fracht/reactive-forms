webpackHotUpdate_N_E("pages/_app",{

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _mdx_js_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mdx-js/react */ "./node_modules/@mdx-js/react/dist/esm.js");
/* harmony import */ var src_components_DrawerNav__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/components/DrawerNav */ "./src/components/DrawerNav.tsx");
/* harmony import */ var src_components_markdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/components/markdown */ "./src/components/markdown/index.ts");
/* harmony import */ var _indexes_pages_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../indexes/pages.json */ "./indexes/pages.json");
var _indexes_pages_json__WEBPACK_IMPORTED_MODULE_6___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../indexes/pages.json */ "./indexes/pages.json", 1);
/* harmony import */ var _src_components_Header__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../src/components/Header */ "./src/components/Header.tsx");
/* harmony import */ var _src_components_Nav__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../src/components/Nav */ "./src/components/Nav.tsx");
/* harmony import */ var _src_constants_theme__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../src/constants/theme */ "./src/constants/theme.ts");
/* harmony import */ var _css_globals_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../css/globals.css */ "./css/globals.css");
/* harmony import */ var _css_globals_css__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_css_globals_css__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _App_module_scss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./App.module.scss */ "./pages/App.module.scss");
/* harmony import */ var _App_module_scss__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_App_module_scss__WEBPACK_IMPORTED_MODULE_11__);


var _this = undefined,
    _jsxFileName = "/mnt/d/Projects/React/morfix/docs/pages/_app.tsx",
    _s = $RefreshSig$();

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;












var MyApp = function MyApp(_ref) {
  _s();

  var Component = _ref.Component,
      pageProps = _ref.pageProps;
  var handleOpenRef = react__WEBPACK_IMPORTED_MODULE_1___default.a.useRef(function () {
    /* default value is empty */
    alert(0);
  });
  return __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["MuiThemeProvider"], {
    theme: _src_constants_theme__WEBPACK_IMPORTED_MODULE_9__["theme"],
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 9
    }
  }, __jsx(_mdx_js_react__WEBPACK_IMPORTED_MODULE_3__["MDXProvider"], {
    components: src_components_markdown__WEBPACK_IMPORTED_MODULE_5__["materialComponents"],
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 13
    }
  }, __jsx(_src_components_Header__WEBPACK_IMPORTED_MODULE_7__["default"], {
    openDrawer: handleOpenRef.current,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 17
    }
  }), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Container"], {
    maxWidth: "lg",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 17
    }
  }, __jsx("div", {
    className: _App_module_scss__WEBPACK_IMPORTED_MODULE_11___default.a['app-content'],
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 21
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Hidden"], {
    xsDown: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 25
    }
  }, __jsx(_src_components_Nav__WEBPACK_IMPORTED_MODULE_8__["Nav"], {
    pageMetas: _indexes_pages_json__WEBPACK_IMPORTED_MODULE_6__.children,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 29
    }
  })), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Hidden"], {
    smUp: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 25
    }
  }, __jsx(src_components_DrawerNav__WEBPACK_IMPORTED_MODULE_4__["DrawerNav"], {
    handleOpenRef: handleOpenRef,
    pageMetas: _indexes_pages_json__WEBPACK_IMPORTED_MODULE_6__.children,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 29
    }
  })), __jsx(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, pageProps, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 25
    }
  }))))));
};

_s(MyApp, "BVi+BF3rI5bqae7WZK+PCk1zlZ0=");

_c = MyApp;
/* harmony default export */ __webpack_exports__["default"] = (MyApp);

var _c;

$RefreshReg$(_c, "MyApp");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvX2FwcC50c3giXSwibmFtZXMiOlsiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJoYW5kbGVPcGVuUmVmIiwiUmVhY3QiLCJ1c2VSZWYiLCJhbGVydCIsInRoZW1lIiwibWF0ZXJpYWxDb21wb25lbnRzIiwiY3VycmVudCIsInN0eWxlcyIsImluZGV4ZXMiLCJjaGlsZHJlbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7O0FBRUEsSUFBTUEsS0FBeUIsR0FBRyxTQUE1QkEsS0FBNEIsT0FBOEI7QUFBQTs7QUFBQSxNQUEzQkMsU0FBMkIsUUFBM0JBLFNBQTJCO0FBQUEsTUFBaEJDLFNBQWdCLFFBQWhCQSxTQUFnQjtBQUM1RCxNQUFNQyxhQUFhLEdBQUdDLDRDQUFLLENBQUNDLE1BQU4sQ0FBYSxZQUFNO0FBQ3JDO0FBQ0FDLFNBQUssQ0FBQyxDQUFELENBQUw7QUFDSCxHQUhxQixDQUF0QjtBQUtBLFNBQ0ksTUFBQyxrRUFBRDtBQUFrQixTQUFLLEVBQUVDLDBEQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0ksTUFBQyx5REFBRDtBQUFhLGNBQVUsRUFBRUMsMEVBQXpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDSSxNQUFDLDhEQUFEO0FBQVEsY0FBVSxFQUFFTCxhQUFhLENBQUNNLE9BQWxDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFESixFQUVJLE1BQUMsMkRBQUQ7QUFBVyxZQUFRLEVBQUMsSUFBcEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNJO0FBQUssYUFBUyxFQUFFQyx3REFBTSxDQUFDLGFBQUQsQ0FBdEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNJLE1BQUMsd0RBQUQ7QUFBUSxVQUFNLE1BQWQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNJLE1BQUMsdURBQUQ7QUFBSyxhQUFTLEVBQUVDLGdEQUFPLENBQUNDLFFBQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFESixDQURKLEVBSUksTUFBQyx3REFBRDtBQUFRLFFBQUksTUFBWjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0ksTUFBQyxrRUFBRDtBQUFXLGlCQUFhLEVBQUVULGFBQTFCO0FBQXlDLGFBQVMsRUFBRVEsZ0RBQU8sQ0FBQ0MsUUFBNUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQURKLENBSkosRUFPSSxNQUFDLFNBQUQseUZBQWVWLFNBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQVBKLENBREosQ0FGSixDQURKLENBREo7QUFrQkgsQ0F4QkQ7O0dBQU1GLEs7O0tBQUFBLEs7QUEwQlNBLG9FQUFmIiwiZmlsZSI6InN0YXRpYy93ZWJwYWNrL3BhZ2VzL19hcHAuOGIzMDgzZmM2ZjQxZjVhNWE0NmIuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IENvbnRhaW5lciwgSGlkZGVuLCBNdWlUaGVtZVByb3ZpZGVyIH0gZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUnO1xyXG5pbXBvcnQgeyBNRFhQcm92aWRlciB9IGZyb20gJ0BtZHgtanMvcmVhY3QnO1xyXG5pbXBvcnQgeyBBcHBQcm9wcyB9IGZyb20gJ25leHQvZGlzdC9uZXh0LXNlcnZlci9saWIvcm91dGVyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQgeyBEcmF3ZXJOYXYgfSBmcm9tICdzcmMvY29tcG9uZW50cy9EcmF3ZXJOYXYnO1xyXG5pbXBvcnQgeyBtYXRlcmlhbENvbXBvbmVudHMgfSBmcm9tICdzcmMvY29tcG9uZW50cy9tYXJrZG93bic7XHJcbmltcG9ydCBpbmRleGVzIGZyb20gJy4uL2luZGV4ZXMvcGFnZXMuanNvbic7XHJcbmltcG9ydCBIZWFkZXIgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvSGVhZGVyJztcclxuaW1wb3J0IHsgTmF2IH0gZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvTmF2JztcclxuaW1wb3J0IHsgdGhlbWUgfSBmcm9tICcuLi9zcmMvY29uc3RhbnRzL3RoZW1lJztcclxuXHJcbmltcG9ydCAnLi4vY3NzL2dsb2JhbHMuY3NzJztcclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL0FwcC5tb2R1bGUuc2Nzcyc7XHJcblxyXG5jb25zdCBNeUFwcDogUmVhY3QuRkM8QXBwUHJvcHM+ID0gKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkgPT4ge1xyXG4gICAgY29uc3QgaGFuZGxlT3BlblJlZiA9IFJlYWN0LnVzZVJlZigoKSA9PiB7XHJcbiAgICAgICAgLyogZGVmYXVsdCB2YWx1ZSBpcyBlbXB0eSAqL1xyXG4gICAgICAgIGFsZXJ0KDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8TXVpVGhlbWVQcm92aWRlciB0aGVtZT17dGhlbWV9PlxyXG4gICAgICAgICAgICA8TURYUHJvdmlkZXIgY29tcG9uZW50cz17bWF0ZXJpYWxDb21wb25lbnRzfT5cclxuICAgICAgICAgICAgICAgIDxIZWFkZXIgb3BlbkRyYXdlcj17aGFuZGxlT3BlblJlZi5jdXJyZW50fSAvPlxyXG4gICAgICAgICAgICAgICAgPENvbnRhaW5lciBtYXhXaWR0aD1cImxnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlc1snYXBwLWNvbnRlbnQnXX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxIaWRkZW4geHNEb3duPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE5hdiBwYWdlTWV0YXM9e2luZGV4ZXMuY2hpbGRyZW59IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvSGlkZGVuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8SGlkZGVuIHNtVXA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RHJhd2VyTmF2IGhhbmRsZU9wZW5SZWY9e2hhbmRsZU9wZW5SZWZ9IHBhZ2VNZXRhcz17aW5kZXhlcy5jaGlsZHJlbn0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9IaWRkZW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvQ29udGFpbmVyPlxyXG4gICAgICAgICAgICA8L01EWFByb3ZpZGVyPlxyXG4gICAgICAgIDwvTXVpVGhlbWVQcm92aWRlcj5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNeUFwcDtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==
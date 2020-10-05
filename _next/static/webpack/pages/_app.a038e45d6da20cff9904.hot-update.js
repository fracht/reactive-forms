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
  });
  return __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["MuiThemeProvider"], {
    theme: _src_constants_theme__WEBPACK_IMPORTED_MODULE_9__["theme"],
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 9
    }
  }, __jsx(_mdx_js_react__WEBPACK_IMPORTED_MODULE_3__["MDXProvider"], {
    components: src_components_markdown__WEBPACK_IMPORTED_MODULE_5__["materialComponents"],
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 13
    }
  }, __jsx(_src_components_Header__WEBPACK_IMPORTED_MODULE_7__["default"], {
    openDrawer: handleOpenRef.current,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 17
    }
  }), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Container"], {
    maxWidth: "lg",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 17
    }
  }, __jsx("div", {
    className: _App_module_scss__WEBPACK_IMPORTED_MODULE_11___default.a['app-content'],
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 21
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Hidden"], {
    xsDown: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 25
    }
  }, __jsx(_src_components_Nav__WEBPACK_IMPORTED_MODULE_8__["Nav"], {
    pageMetas: _indexes_pages_json__WEBPACK_IMPORTED_MODULE_6__.children,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 29
    }
  })), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Hidden"], {
    smUp: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 25
    }
  }, __jsx(src_components_DrawerNav__WEBPACK_IMPORTED_MODULE_4__["DrawerNav"], {
    handleOpenRef: handleOpenRef,
    pageMetas: _indexes_pages_json__WEBPACK_IMPORTED_MODULE_6__.children,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 29
    }
  })), __jsx(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, pageProps, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvX2FwcC50c3giXSwibmFtZXMiOlsiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJoYW5kbGVPcGVuUmVmIiwiUmVhY3QiLCJ1c2VSZWYiLCJ0aGVtZSIsIm1hdGVyaWFsQ29tcG9uZW50cyIsImN1cnJlbnQiLCJzdHlsZXMiLCJpbmRleGVzIiwiY2hpbGRyZW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOztBQUVBLElBQU1BLEtBQXlCLEdBQUcsU0FBNUJBLEtBQTRCLE9BQThCO0FBQUE7O0FBQUEsTUFBM0JDLFNBQTJCLFFBQTNCQSxTQUEyQjtBQUFBLE1BQWhCQyxTQUFnQixRQUFoQkEsU0FBZ0I7QUFDNUQsTUFBTUMsYUFBYSxHQUFHQyw0Q0FBSyxDQUFDQyxNQUFOLENBQWEsWUFBTTtBQUNyQztBQUNILEdBRnFCLENBQXRCO0FBSUEsU0FDSSxNQUFDLGtFQUFEO0FBQWtCLFNBQUssRUFBRUMsMERBQXpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDSSxNQUFDLHlEQUFEO0FBQWEsY0FBVSxFQUFFQywwRUFBekI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNJLE1BQUMsOERBQUQ7QUFBUSxjQUFVLEVBQUVKLGFBQWEsQ0FBQ0ssT0FBbEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQURKLEVBRUksTUFBQywyREFBRDtBQUFXLFlBQVEsRUFBQyxJQUFwQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0k7QUFBSyxhQUFTLEVBQUVDLHdEQUFNLENBQUMsYUFBRCxDQUF0QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0ksTUFBQyx3REFBRDtBQUFRLFVBQU0sTUFBZDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0ksTUFBQyx1REFBRDtBQUFLLGFBQVMsRUFBRUMsZ0RBQU8sQ0FBQ0MsUUFBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQURKLENBREosRUFJSSxNQUFDLHdEQUFEO0FBQVEsUUFBSSxNQUFaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDSSxNQUFDLGtFQUFEO0FBQVcsaUJBQWEsRUFBRVIsYUFBMUI7QUFBeUMsYUFBUyxFQUFFTyxnREFBTyxDQUFDQyxRQUE1RDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBREosQ0FKSixFQU9JLE1BQUMsU0FBRCx5RkFBZVQsU0FBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBUEosQ0FESixDQUZKLENBREosQ0FESjtBQWtCSCxDQXZCRDs7R0FBTUYsSzs7S0FBQUEsSztBQXlCU0Esb0VBQWYiLCJmaWxlIjoic3RhdGljL3dlYnBhY2svcGFnZXMvX2FwcC5hMDM4ZTQ1ZDZkYTIwY2ZmOTkwNC5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQ29udGFpbmVyLCBIaWRkZW4sIE11aVRoZW1lUHJvdmlkZXIgfSBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZSc7XHJcbmltcG9ydCB7IE1EWFByb3ZpZGVyIH0gZnJvbSAnQG1keC1qcy9yZWFjdCc7XHJcbmltcG9ydCB7IEFwcFByb3BzIH0gZnJvbSAnbmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi9yb3V0ZXIvcm91dGVyJztcclxuXHJcbmltcG9ydCB7IERyYXdlck5hdiB9IGZyb20gJ3NyYy9jb21wb25lbnRzL0RyYXdlck5hdic7XHJcbmltcG9ydCB7IG1hdGVyaWFsQ29tcG9uZW50cyB9IGZyb20gJ3NyYy9jb21wb25lbnRzL21hcmtkb3duJztcclxuaW1wb3J0IGluZGV4ZXMgZnJvbSAnLi4vaW5kZXhlcy9wYWdlcy5qc29uJztcclxuaW1wb3J0IEhlYWRlciBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9IZWFkZXInO1xyXG5pbXBvcnQgeyBOYXYgfSBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9OYXYnO1xyXG5pbXBvcnQgeyB0aGVtZSB9IGZyb20gJy4uL3NyYy9jb25zdGFudHMvdGhlbWUnO1xyXG5cclxuaW1wb3J0ICcuLi9jc3MvZ2xvYmFscy5jc3MnO1xyXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vQXBwLm1vZHVsZS5zY3NzJztcclxuXHJcbmNvbnN0IE15QXBwOiBSZWFjdC5GQzxBcHBQcm9wcz4gPSAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSA9PiB7XHJcbiAgICBjb25zdCBoYW5kbGVPcGVuUmVmID0gUmVhY3QudXNlUmVmKCgpID0+IHtcclxuICAgICAgICAvKiBkZWZhdWx0IHZhbHVlIGlzIGVtcHR5ICovXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxNdWlUaGVtZVByb3ZpZGVyIHRoZW1lPXt0aGVtZX0+XHJcbiAgICAgICAgICAgIDxNRFhQcm92aWRlciBjb21wb25lbnRzPXttYXRlcmlhbENvbXBvbmVudHN9PlxyXG4gICAgICAgICAgICAgICAgPEhlYWRlciBvcGVuRHJhd2VyPXtoYW5kbGVPcGVuUmVmLmN1cnJlbnR9IC8+XHJcbiAgICAgICAgICAgICAgICA8Q29udGFpbmVyIG1heFdpZHRoPVwibGdcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzWydhcHAtY29udGVudCddfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEhpZGRlbiB4c0Rvd24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TmF2IHBhZ2VNZXRhcz17aW5kZXhlcy5jaGlsZHJlbn0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9IaWRkZW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxIaWRkZW4gc21VcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEcmF3ZXJOYXYgaGFuZGxlT3BlblJlZj17aGFuZGxlT3BlblJlZn0gcGFnZU1ldGFzPXtpbmRleGVzLmNoaWxkcmVufSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0hpZGRlbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9Db250YWluZXI+XHJcbiAgICAgICAgICAgIDwvTURYUHJvdmlkZXI+XHJcbiAgICAgICAgPC9NdWlUaGVtZVByb3ZpZGVyPlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE15QXBwO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9
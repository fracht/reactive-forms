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
    openDrawer: function openDrawer() {
      return handleOpenRef.current();
    },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvX2FwcC50c3giXSwibmFtZXMiOlsiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJoYW5kbGVPcGVuUmVmIiwiUmVhY3QiLCJ1c2VSZWYiLCJhbGVydCIsInRoZW1lIiwibWF0ZXJpYWxDb21wb25lbnRzIiwiY3VycmVudCIsInN0eWxlcyIsImluZGV4ZXMiLCJjaGlsZHJlbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7O0FBRUEsSUFBTUEsS0FBeUIsR0FBRyxTQUE1QkEsS0FBNEIsT0FBOEI7QUFBQTs7QUFBQSxNQUEzQkMsU0FBMkIsUUFBM0JBLFNBQTJCO0FBQUEsTUFBaEJDLFNBQWdCLFFBQWhCQSxTQUFnQjtBQUM1RCxNQUFNQyxhQUFhLEdBQUdDLDRDQUFLLENBQUNDLE1BQU4sQ0FBYSxZQUFNO0FBQ3JDO0FBQ0FDLFNBQUssQ0FBQyxDQUFELENBQUw7QUFDSCxHQUhxQixDQUF0QjtBQUtBLFNBQ0ksTUFBQyxrRUFBRDtBQUFrQixTQUFLLEVBQUVDLDBEQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0ksTUFBQyx5REFBRDtBQUFhLGNBQVUsRUFBRUMsMEVBQXpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDSSxNQUFDLDhEQUFEO0FBQVEsY0FBVSxFQUFFO0FBQUEsYUFBTUwsYUFBYSxDQUFDTSxPQUFkLEVBQU47QUFBQSxLQUFwQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBREosRUFFSSxNQUFDLDJEQUFEO0FBQVcsWUFBUSxFQUFDLElBQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDSTtBQUFLLGFBQVMsRUFBRUMsd0RBQU0sQ0FBQyxhQUFELENBQXRCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDSSxNQUFDLHdEQUFEO0FBQVEsVUFBTSxNQUFkO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDSSxNQUFDLHVEQUFEO0FBQUssYUFBUyxFQUFFQyxnREFBTyxDQUFDQyxRQUF4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBREosQ0FESixFQUlJLE1BQUMsd0RBQUQ7QUFBUSxRQUFJLE1BQVo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNJLE1BQUMsa0VBQUQ7QUFBVyxpQkFBYSxFQUFFVCxhQUExQjtBQUF5QyxhQUFTLEVBQUVRLGdEQUFPLENBQUNDLFFBQTVEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFESixDQUpKLEVBT0ksTUFBQyxTQUFELHlGQUFlVixTQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FQSixDQURKLENBRkosQ0FESixDQURKO0FBa0JILENBeEJEOztHQUFNRixLOztLQUFBQSxLO0FBMEJTQSxvRUFBZiIsImZpbGUiOiJzdGF0aWMvd2VicGFjay9wYWdlcy9fYXBwLmYzMTA0ZWUxYTJjNGFiM2Y1ZjVlLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBDb250YWluZXIsIEhpZGRlbiwgTXVpVGhlbWVQcm92aWRlciB9IGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlJztcclxuaW1wb3J0IHsgTURYUHJvdmlkZXIgfSBmcm9tICdAbWR4LWpzL3JlYWN0JztcclxuaW1wb3J0IHsgQXBwUHJvcHMgfSBmcm9tICduZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci9yb3V0ZXInO1xyXG5cclxuaW1wb3J0IHsgRHJhd2VyTmF2IH0gZnJvbSAnc3JjL2NvbXBvbmVudHMvRHJhd2VyTmF2JztcclxuaW1wb3J0IHsgbWF0ZXJpYWxDb21wb25lbnRzIH0gZnJvbSAnc3JjL2NvbXBvbmVudHMvbWFya2Rvd24nO1xyXG5pbXBvcnQgaW5kZXhlcyBmcm9tICcuLi9pbmRleGVzL3BhZ2VzLmpzb24nO1xyXG5pbXBvcnQgSGVhZGVyIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL0hlYWRlcic7XHJcbmltcG9ydCB7IE5hdiB9IGZyb20gJy4uL3NyYy9jb21wb25lbnRzL05hdic7XHJcbmltcG9ydCB7IHRoZW1lIH0gZnJvbSAnLi4vc3JjL2NvbnN0YW50cy90aGVtZSc7XHJcblxyXG5pbXBvcnQgJy4uL2Nzcy9nbG9iYWxzLmNzcyc7XHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9BcHAubW9kdWxlLnNjc3MnO1xyXG5cclxuY29uc3QgTXlBcHA6IFJlYWN0LkZDPEFwcFByb3BzPiA9ICh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pID0+IHtcclxuICAgIGNvbnN0IGhhbmRsZU9wZW5SZWYgPSBSZWFjdC51c2VSZWYoKCkgPT4ge1xyXG4gICAgICAgIC8qIGRlZmF1bHQgdmFsdWUgaXMgZW1wdHkgKi9cclxuICAgICAgICBhbGVydCgwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPE11aVRoZW1lUHJvdmlkZXIgdGhlbWU9e3RoZW1lfT5cclxuICAgICAgICAgICAgPE1EWFByb3ZpZGVyIGNvbXBvbmVudHM9e21hdGVyaWFsQ29tcG9uZW50c30+XHJcbiAgICAgICAgICAgICAgICA8SGVhZGVyIG9wZW5EcmF3ZXI9eygpID0+IGhhbmRsZU9wZW5SZWYuY3VycmVudCgpfSAvPlxyXG4gICAgICAgICAgICAgICAgPENvbnRhaW5lciBtYXhXaWR0aD1cImxnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlc1snYXBwLWNvbnRlbnQnXX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxIaWRkZW4geHNEb3duPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE5hdiBwYWdlTWV0YXM9e2luZGV4ZXMuY2hpbGRyZW59IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvSGlkZGVuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8SGlkZGVuIHNtVXA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RHJhd2VyTmF2IGhhbmRsZU9wZW5SZWY9e2hhbmRsZU9wZW5SZWZ9IHBhZ2VNZXRhcz17aW5kZXhlcy5jaGlsZHJlbn0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9IaWRkZW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvQ29udGFpbmVyPlxyXG4gICAgICAgICAgICA8L01EWFByb3ZpZGVyPlxyXG4gICAgICAgIDwvTXVpVGhlbWVQcm92aWRlcj5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNeUFwcDtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==
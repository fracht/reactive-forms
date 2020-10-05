webpackHotUpdate_N_E("pages/_app",{

/***/ "./src/components/DrawerNav.tsx":
/*!**************************************!*\
  !*** ./src/components/DrawerNav.tsx ***!
  \**************************************/
/*! exports provided: DrawerNav */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawerNav", function() { return DrawerNav; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _Nav__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Nav */ "./src/components/Nav.tsx");




var _this = undefined,
    _jsxFileName = "/mnt/d/Projects/React/morfix/docs/src/components/DrawerNav.tsx",
    _s = $RefreshSig$();

var __jsx = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement;



var DrawerNav = function DrawerNav(_ref) {
  _s();

  var handleOpenRef = _ref.handleOpenRef,
      oth = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__["default"])(_ref, ["handleOpenRef"]);

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_3___default.a.useState(false),
      _React$useState2 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_React$useState, 2),
      open = _React$useState2[0],
      setOpen = _React$useState2[1];

  handleOpenRef.current = react__WEBPACK_IMPORTED_MODULE_3___default.a.useCallback(function () {
    return setOpen(true);
  }, [setOpen]);
  return __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Drawer"], {
    anchor: "left",
    open: open,
    onClose: function onClose() {
      return setOpen(false);
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 9
    }
  }, __jsx(_Nav__WEBPACK_IMPORTED_MODULE_5__["Nav"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, oth, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 13
    }
  })));
};

_s(DrawerNav, "P07CLNDEMXCPjcHIgvAUdoJQuRQ=");

_c = DrawerNav;

var _c;

$RefreshReg$(_c, "DrawerNav");

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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvRHJhd2VyTmF2LnRzeCJdLCJuYW1lcyI6WyJEcmF3ZXJOYXYiLCJoYW5kbGVPcGVuUmVmIiwib3RoIiwiUmVhY3QiLCJ1c2VTdGF0ZSIsIm9wZW4iLCJzZXRPcGVuIiwiY3VycmVudCIsInVzZUNhbGxiYWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUVBO0FBTU8sSUFBTUEsU0FBbUMsR0FBRyxTQUF0Q0EsU0FBc0MsT0FBK0I7QUFBQTs7QUFBQSxNQUE1QkMsYUFBNEIsUUFBNUJBLGFBQTRCO0FBQUEsTUFBVkMsR0FBVTs7QUFBQSx3QkFDdERDLDRDQUFLLENBQUNDLFFBQU4sQ0FBZSxLQUFmLENBRHNEO0FBQUE7QUFBQSxNQUN2RUMsSUFEdUU7QUFBQSxNQUNqRUMsT0FEaUU7O0FBRzlFTCxlQUFhLENBQUNNLE9BQWQsR0FBd0JKLDRDQUFLLENBQUNLLFdBQU4sQ0FBa0I7QUFBQSxXQUFNRixPQUFPLENBQUMsSUFBRCxDQUFiO0FBQUEsR0FBbEIsRUFBdUMsQ0FBQ0EsT0FBRCxDQUF2QyxDQUF4QjtBQUVBLFNBQ0ksTUFBQyx3REFBRDtBQUFRLFVBQU0sRUFBQyxNQUFmO0FBQXNCLFFBQUksRUFBRUQsSUFBNUI7QUFBa0MsV0FBTyxFQUFFO0FBQUEsYUFBTUMsT0FBTyxDQUFDLEtBQUQsQ0FBYjtBQUFBLEtBQTNDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDSSxNQUFDLHdDQUFELHlGQUFTSixHQUFUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FESixDQURKO0FBS0gsQ0FWTTs7R0FBTUYsUzs7S0FBQUEsUyIsImZpbGUiOiJzdGF0aWMvd2VicGFjay9wYWdlcy9fYXBwLmJiMzI2MTQwNmY1NGFkN2UxMDYzLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBEcmF3ZXIgfSBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBOYXYsIE5hdlByb3BzIH0gZnJvbSAnLi9OYXYnO1xyXG5cclxuaW50ZXJmYWNlIERyYXdlck5hdlByb3BzIGV4dGVuZHMgTmF2UHJvcHMge1xyXG4gICAgaGFuZGxlT3BlblJlZjogUmVhY3QuTXV0YWJsZVJlZk9iamVjdDwoKSA9PiB2b2lkPjtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IERyYXdlck5hdjogUmVhY3QuRkM8RHJhd2VyTmF2UHJvcHM+ID0gKHsgaGFuZGxlT3BlblJlZiwgLi4ub3RoIH0pID0+IHtcclxuICAgIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcclxuXHJcbiAgICBoYW5kbGVPcGVuUmVmLmN1cnJlbnQgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiBzZXRPcGVuKHRydWUpLCBbc2V0T3Blbl0pO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPERyYXdlciBhbmNob3I9XCJsZWZ0XCIgb3Blbj17b3Blbn0gb25DbG9zZT17KCkgPT4gc2V0T3BlbihmYWxzZSl9PlxyXG4gICAgICAgICAgICA8TmF2IHsuLi5vdGh9IC8+XHJcbiAgICAgICAgPC9EcmF3ZXI+XHJcbiAgICApO1xyXG59O1xyXG4iXSwic291cmNlUm9vdCI6IiJ9
webpackHotUpdate_N_E("pages/documentation-details",{

/***/ "./src/components/layouts/LayoutDocs.tsx":
/*!***********************************************!*\
  !*** ./src/components/layouts/LayoutDocs.tsx ***!
  \***********************************************/
/*! exports provided: LayoutDocs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutDocs", function() { return LayoutDocs; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ "./node_modules/next/dist/next-server/lib/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var src_components_Toc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/components/Toc */ "./src/components/Toc.tsx");
/* harmony import */ var _DocsFooter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../DocsFooter */ "./src/components/DocsFooter.tsx");
/* harmony import */ var _LayoutDocs_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./LayoutDocs.module.scss */ "./src/components/layouts/LayoutDocs.module.scss");
/* harmony import */ var _LayoutDocs_module_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_LayoutDocs_module_scss__WEBPACK_IMPORTED_MODULE_6__);
var _this = undefined,
    _jsxFileName = "/mnt/d/Projects/React/morfix/docs/src/components/layouts/LayoutDocs.tsx",
    _s = $RefreshSig$();

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;







var LayoutDocs = function LayoutDocs(_ref) {
  _s();

  var children = _ref.children,
      meta = _ref.meta;

  var _useRouter = Object(next_router__WEBPACK_IMPORTED_MODULE_3__["useRouter"])(),
      pathname = _useRouter.pathname;

  var viewPage = react__WEBPACK_IMPORTED_MODULE_0___default.a.useCallback(function () {
    window.open("https://github.com/ArtiomTr/morfix/tree/master/docs/pages".concat(pathname, ".md"), '_blank');
  }, [pathname]);
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 9
    }
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_2___default.a, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 13
    }
  }, __jsx("title", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 17
    }
  }, meta.title, " | Morfix"), __jsx("meta", {
    name: "description",
    content: meta.description,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 17
    }
  })), __jsx("div", {
    className: _LayoutDocs_module_scss__WEBPACK_IMPORTED_MODULE_6___default.a['docs'],
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: _LayoutDocs_module_scss__WEBPACK_IMPORTED_MODULE_6___default.a['docs-content'],
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 17
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Tooltip"], {
    title: "View this page on GitHub",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 21
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["IconButton"], {
    onClick: viewPage,
    className: _LayoutDocs_module_scss__WEBPACK_IMPORTED_MODULE_6___default.a['edit-button'],
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 25
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 29
    }
  }, "visibility"))), children, __jsx(_DocsFooter__WEBPACK_IMPORTED_MODULE_5__["DocsFooter"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 21
    }
  })), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Hidden"], {
    smDown: true,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 17
    }
  }, __jsx("div", {
    className: _LayoutDocs_module_scss__WEBPACK_IMPORTED_MODULE_6___default.a['docs-toc'],
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 21
    }
  }, __jsx(src_components_Toc__WEBPACK_IMPORTED_MODULE_4__["Toc"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 25
    }
  })))));
};

_s(LayoutDocs, "LzFMdQ2tJzqgu+yxzyNb1SxHbjw=", false, function () {
  return [next_router__WEBPACK_IMPORTED_MODULE_3__["useRouter"]];
});

_c = LayoutDocs;

var _c;

$RefreshReg$(_c, "LayoutDocs");

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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvbGF5b3V0cy9MYXlvdXREb2NzLnRzeCJdLCJuYW1lcyI6WyJMYXlvdXREb2NzIiwiY2hpbGRyZW4iLCJtZXRhIiwidXNlUm91dGVyIiwicGF0aG5hbWUiLCJ2aWV3UGFnZSIsIlJlYWN0IiwidXNlQ2FsbGJhY2siLCJ3aW5kb3ciLCJvcGVuIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsInN0eWxlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBRU8sSUFBTUEsVUFBaUMsR0FBRyxTQUFwQ0EsVUFBb0MsT0FBd0I7QUFBQTs7QUFBQSxNQUFyQkMsUUFBcUIsUUFBckJBLFFBQXFCO0FBQUEsTUFBWEMsSUFBVyxRQUFYQSxJQUFXOztBQUFBLG1CQUNoREMsNkRBQVMsRUFEdUM7QUFBQSxNQUM3REMsUUFENkQsY0FDN0RBLFFBRDZEOztBQUdyRSxNQUFNQyxRQUFRLEdBQUdDLDRDQUFLLENBQUNDLFdBQU4sQ0FBa0IsWUFBTTtBQUNyQ0MsVUFBTSxDQUFDQyxJQUFQLG9FQUF3RUwsUUFBeEUsVUFBdUYsUUFBdkY7QUFDSCxHQUZnQixFQUVkLENBQUNBLFFBQUQsQ0FGYyxDQUFqQjtBQUlBLFNBQ0ksTUFBQyw0Q0FBRCxDQUFPLFFBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNJLE1BQUMsZ0RBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBUUYsSUFBSSxDQUFDUSxLQUFiLGNBREosRUFFSTtBQUFNLFFBQUksRUFBQyxhQUFYO0FBQXlCLFdBQU8sRUFBRVIsSUFBSSxDQUFDUyxXQUF2QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBRkosQ0FESixFQUtJO0FBQUssYUFBUyxFQUFFQyw4REFBTSxDQUFDLE1BQUQsQ0FBdEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNJO0FBQUssYUFBUyxFQUFFQSw4REFBTSxDQUFDLGNBQUQsQ0FBdEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNJLE1BQUMseURBQUQ7QUFBUyxTQUFLLEVBQUMsMEJBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNJLE1BQUMsNERBQUQ7QUFBWSxXQUFPLEVBQUVQLFFBQXJCO0FBQStCLGFBQVMsRUFBRU8sOERBQU0sQ0FBQyxhQUFELENBQWhEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDSSxNQUFDLHNEQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBREosQ0FESixDQURKLEVBTUtYLFFBTkwsRUFPSSxNQUFDLHNEQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFQSixDQURKLEVBVUksTUFBQyx3REFBRDtBQUFRLFVBQU0sTUFBZDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0k7QUFBSyxhQUFTLEVBQUVXLDhEQUFNLENBQUMsVUFBRCxDQUF0QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0ksTUFBQyxzREFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBREosQ0FESixDQVZKLENBTEosQ0FESjtBQXdCSCxDQS9CTTs7R0FBTVosVTtVQUNZRyxxRDs7O0tBRFpILFUiLCJmaWxlIjoic3RhdGljL3dlYnBhY2svcGFnZXMvZG9jdW1lbnRhdGlvbi1kZXRhaWxzLjUyNDVlMzY4NjdlYTZhNzAxNWNmLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBIaWRkZW4sIEljb24sIEljb25CdXR0b24sIFRvb2x0aXAgfSBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZSc7XHJcbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCc7XHJcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJztcclxuXHJcbmltcG9ydCB7IFRvYyB9IGZyb20gJ3NyYy9jb21wb25lbnRzL1RvYyc7XHJcbmltcG9ydCB7IExheW91dFByb3BzIH0gZnJvbSAnLi9MYXlvdXRQcm9wcyc7XHJcbmltcG9ydCB7IERvY3NGb290ZXIgfSBmcm9tICcuLi9Eb2NzRm9vdGVyJztcclxuXHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9MYXlvdXREb2NzLm1vZHVsZS5zY3NzJztcclxuXHJcbmV4cG9ydCBjb25zdCBMYXlvdXREb2NzOiBSZWFjdC5GQzxMYXlvdXRQcm9wcz4gPSAoeyBjaGlsZHJlbiwgbWV0YSB9KSA9PiB7XHJcbiAgICBjb25zdCB7IHBhdGhuYW1lIH0gPSB1c2VSb3V0ZXIoKTtcclxuXHJcbiAgICBjb25zdCB2aWV3UGFnZSA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgICAgICB3aW5kb3cub3BlbihgaHR0cHM6Ly9naXRodWIuY29tL0FydGlvbVRyL21vcmZpeC90cmVlL21hc3Rlci9kb2NzL3BhZ2VzJHtwYXRobmFtZX0ubWRgLCAnX2JsYW5rJyk7XHJcbiAgICB9LCBbcGF0aG5hbWVdKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxSZWFjdC5GcmFnbWVudD5cclxuICAgICAgICAgICAgPEhlYWQ+XHJcbiAgICAgICAgICAgICAgICA8dGl0bGU+e21ldGEudGl0bGV9IHwgTW9yZml4PC90aXRsZT5cclxuICAgICAgICAgICAgICAgIDxtZXRhIG5hbWU9XCJkZXNjcmlwdGlvblwiIGNvbnRlbnQ9e21ldGEuZGVzY3JpcHRpb24gYXMgc3RyaW5nfSAvPlxyXG4gICAgICAgICAgICA8L0hlYWQ+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXNbJ2RvY3MnXX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzWydkb2NzLWNvbnRlbnQnXX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPFRvb2x0aXAgdGl0bGU9XCJWaWV3IHRoaXMgcGFnZSBvbiBHaXRIdWJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEljb25CdXR0b24gb25DbGljaz17dmlld1BhZ2V9IGNsYXNzTmFtZT17c3R5bGVzWydlZGl0LWJ1dHRvbiddfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJY29uPnZpc2liaWxpdHk8L0ljb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvSWNvbkJ1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L1Rvb2x0aXA+XHJcbiAgICAgICAgICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgICAgICAgICAgICAgIDxEb2NzRm9vdGVyIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxIaWRkZW4gc21Eb3duPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXNbJ2RvY3MtdG9jJ119PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8VG9jIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L0hpZGRlbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cclxuICAgICk7XHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=
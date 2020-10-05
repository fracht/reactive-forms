webpackHotUpdate_N_E("pages/_app",{

/***/ "./src/constants/theme.ts":
/*!********************************!*\
  !*** ./src/constants/theme.ts ***!
  \********************************/
/*! exports provided: theme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "theme", function() { return theme; });
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_core_styles_createPalette__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles/createPalette */ "./node_modules/@material-ui/core/styles/createPalette.js");
/* harmony import */ var _material_ui_core_styles_createPalette__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_createPalette__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_styles_transitions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles/transitions */ "./node_modules/@material-ui/core/styles/transitions.js");
/* harmony import */ var _material_ui_core_styles_transitions__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles_transitions__WEBPACK_IMPORTED_MODULE_2__);



var palette = _material_ui_core_styles_createPalette__WEBPACK_IMPORTED_MODULE_1___default()({
  primary: {
    main: '#98C9A3',
    light: '#EDEEC9',
    dark: '#77BFA3'
  }
});
var theme = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["createMuiTheme"])({
  palette: palette,
  typography: {
    fontFamily: "'Epilogue', sans-serif",
    h1: {
      fontSize: '2.9rem',
      fontWeight: 'bold'
    },
    h2: {
      fontSize: '2.4rem',
      fontWeight: 'bold'
    },
    h3: {
      fontSize: '2.2rem',
      fontWeight: 'bold'
    },
    h4: {
      fontSize: '1.9rem',
      fontWeight: 'bold'
    },
    h5: {
      fontSize: '1.7rem',
      fontWeight: 'bold'
    },
    h6: {
      fontSize: '1.5rem',
      fontWeight: 'bold'
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 800,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  },
  overrides: {
    MuiLink: {
      root: {
        cursor: 'pointer',
        color: palette.primary.dark,
        fontWeight: 'bold',
        transition: _material_ui_core_styles_transitions__WEBPACK_IMPORTED_MODULE_2___default.a.create(['color'], {
          duration: 200
        }),
        '&:hover': {
          color: Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["darken"])(palette.primary.main, 0.2)
        }
      }
    },
    MuiButton: {
      root: {
        transition: _material_ui_core_styles_transitions__WEBPACK_IMPORTED_MODULE_2___default.a.create(['color', 'background-color', 'box-shadow', 'border'], {
          duration: 250
        })
      },
      text: {
        borderRadius: '0 50px 50px 0',
        borderLeft: '2px solid',
        textTransform: 'initial',
        padding: '4px 32px',
        fontSize: '1rem',
        margin: '5px 0'
      },
      textPrimary: {
        backgroundColor: Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["fade"])(palette.primary.light, 0.2),
        color: palette.primary.contrastText,
        '&:hover': {
          color: palette.primary.dark,
          backgroundColor: Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["fade"])(palette.primary.light, 0.4)
        },
        '&:active,&.active': {
          color: palette.primary.dark,
          backgroundColor: Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["fade"])(palette.primary.light, 0.6)
        }
      }
    }
  }
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbnN0YW50cy90aGVtZS50cyJdLCJuYW1lcyI6WyJwYWxldHRlIiwiY3JlYXRlUGFsZXR0ZSIsInByaW1hcnkiLCJtYWluIiwibGlnaHQiLCJkYXJrIiwidGhlbWUiLCJjcmVhdGVNdWlUaGVtZSIsInR5cG9ncmFwaHkiLCJmb250RmFtaWx5IiwiaDEiLCJmb250U2l6ZSIsImZvbnRXZWlnaHQiLCJoMiIsImgzIiwiaDQiLCJoNSIsImg2IiwiYnJlYWtwb2ludHMiLCJ2YWx1ZXMiLCJ4cyIsInNtIiwibWQiLCJsZyIsInhsIiwib3ZlcnJpZGVzIiwiTXVpTGluayIsInJvb3QiLCJjdXJzb3IiLCJjb2xvciIsInRyYW5zaXRpb24iLCJ0cmFuc2l0aW9ucyIsImNyZWF0ZSIsImR1cmF0aW9uIiwiZGFya2VuIiwiTXVpQnV0dG9uIiwidGV4dCIsImJvcmRlclJhZGl1cyIsImJvcmRlckxlZnQiLCJ0ZXh0VHJhbnNmb3JtIiwicGFkZGluZyIsIm1hcmdpbiIsInRleHRQcmltYXJ5IiwiYmFja2dyb3VuZENvbG9yIiwiZmFkZSIsImNvbnRyYXN0VGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRUEsSUFBTUEsT0FBTyxHQUFHQyw2RUFBYSxDQUFDO0FBQzFCQyxTQUFPLEVBQUU7QUFDTEMsUUFBSSxFQUFFLFNBREQ7QUFFTEMsU0FBSyxFQUFFLFNBRkY7QUFHTEMsUUFBSSxFQUFFO0FBSEQ7QUFEaUIsQ0FBRCxDQUE3QjtBQVFPLElBQU1DLEtBQUssR0FBR0Msd0VBQWMsQ0FBQztBQUNoQ1AsU0FBTyxFQUFQQSxPQURnQztBQUVoQ1EsWUFBVSxFQUFFO0FBQ1JDLGNBQVUsRUFBRSx3QkFESjtBQUVSQyxNQUFFLEVBQUU7QUFDQUMsY0FBUSxFQUFFLFFBRFY7QUFFQUMsZ0JBQVUsRUFBRTtBQUZaLEtBRkk7QUFNUkMsTUFBRSxFQUFFO0FBQ0FGLGNBQVEsRUFBRSxRQURWO0FBRUFDLGdCQUFVLEVBQUU7QUFGWixLQU5JO0FBVVJFLE1BQUUsRUFBRTtBQUNBSCxjQUFRLEVBQUUsUUFEVjtBQUVBQyxnQkFBVSxFQUFFO0FBRlosS0FWSTtBQWNSRyxNQUFFLEVBQUU7QUFDQUosY0FBUSxFQUFFLFFBRFY7QUFFQUMsZ0JBQVUsRUFBRTtBQUZaLEtBZEk7QUFrQlJJLE1BQUUsRUFBRTtBQUNBTCxjQUFRLEVBQUUsUUFEVjtBQUVBQyxnQkFBVSxFQUFFO0FBRlosS0FsQkk7QUFzQlJLLE1BQUUsRUFBRTtBQUNBTixjQUFRLEVBQUUsUUFEVjtBQUVBQyxnQkFBVSxFQUFFO0FBRlo7QUF0QkksR0FGb0I7QUE2QmhDTSxhQUFXLEVBQUU7QUFDVEMsVUFBTSxFQUFFO0FBQ0pDLFFBQUUsRUFBRSxDQURBO0FBRUpDLFFBQUUsRUFBRSxHQUZBO0FBR0pDLFFBQUUsRUFBRSxHQUhBO0FBSUpDLFFBQUUsRUFBRSxJQUpBO0FBS0pDLFFBQUUsRUFBRTtBQUxBO0FBREMsR0E3Qm1CO0FBc0NoQ0MsV0FBUyxFQUFFO0FBQ1BDLFdBQU8sRUFBRTtBQUNMQyxVQUFJLEVBQUU7QUFDRkMsY0FBTSxFQUFFLFNBRE47QUFFRkMsYUFBSyxFQUFFN0IsT0FBTyxDQUFDRSxPQUFSLENBQWdCRyxJQUZyQjtBQUdGTyxrQkFBVSxFQUFFLE1BSFY7QUFJRmtCLGtCQUFVLEVBQUVDLDJFQUFXLENBQUNDLE1BQVosQ0FBbUIsQ0FBQyxPQUFELENBQW5CLEVBQThCO0FBQUVDLGtCQUFRLEVBQUU7QUFBWixTQUE5QixDQUpWO0FBS0YsbUJBQVc7QUFDUEosZUFBSyxFQUFFSyxnRUFBTSxDQUFDbEMsT0FBTyxDQUFDRSxPQUFSLENBQWdCQyxJQUFqQixFQUF1QixHQUF2QjtBQUROO0FBTFQ7QUFERCxLQURGO0FBWVBnQyxhQUFTLEVBQUU7QUFDUFIsVUFBSSxFQUFFO0FBQ0ZHLGtCQUFVLEVBQUVDLDJFQUFXLENBQUNDLE1BQVosQ0FBbUIsQ0FBQyxPQUFELEVBQVUsa0JBQVYsRUFBOEIsWUFBOUIsRUFBNEMsUUFBNUMsQ0FBbkIsRUFBMEU7QUFBRUMsa0JBQVEsRUFBRTtBQUFaLFNBQTFFO0FBRFYsT0FEQztBQUlQRyxVQUFJLEVBQUU7QUFDRkMsb0JBQVksRUFBRSxlQURaO0FBRUZDLGtCQUFVLEVBQUUsV0FGVjtBQUdGQyxxQkFBYSxFQUFFLFNBSGI7QUFJRkMsZUFBTyxFQUFFLFVBSlA7QUFLRjdCLGdCQUFRLEVBQUUsTUFMUjtBQU1GOEIsY0FBTSxFQUFFO0FBTk4sT0FKQztBQVlQQyxpQkFBVyxFQUFFO0FBQ1RDLHVCQUFlLEVBQUVDLDhEQUFJLENBQUM1QyxPQUFPLENBQUNFLE9BQVIsQ0FBZ0JFLEtBQWpCLEVBQXdCLEdBQXhCLENBRFo7QUFFVHlCLGFBQUssRUFBRTdCLE9BQU8sQ0FBQ0UsT0FBUixDQUFnQjJDLFlBRmQ7QUFHVCxtQkFBVztBQUNQaEIsZUFBSyxFQUFFN0IsT0FBTyxDQUFDRSxPQUFSLENBQWdCRyxJQURoQjtBQUVQc0MseUJBQWUsRUFBRUMsOERBQUksQ0FBQzVDLE9BQU8sQ0FBQ0UsT0FBUixDQUFnQkUsS0FBakIsRUFBd0IsR0FBeEI7QUFGZCxTQUhGO0FBT1QsNkJBQXFCO0FBQ2pCeUIsZUFBSyxFQUFFN0IsT0FBTyxDQUFDRSxPQUFSLENBQWdCRyxJQUROO0FBRWpCc0MseUJBQWUsRUFBRUMsOERBQUksQ0FBQzVDLE9BQU8sQ0FBQ0UsT0FBUixDQUFnQkUsS0FBakIsRUFBd0IsR0FBeEI7QUFGSjtBQVBaO0FBWk47QUFaSjtBQXRDcUIsQ0FBRCxDQUE1QiIsImZpbGUiOiJzdGF0aWMvd2VicGFjay9wYWdlcy9fYXBwLjkwZjRlMWIyYWQ3NDA0YzZiMDg3LmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVNdWlUaGVtZSwgZGFya2VuLCBmYWRlIH0gZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUnO1xyXG5pbXBvcnQgY3JlYXRlUGFsZXR0ZSBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9zdHlsZXMvY3JlYXRlUGFsZXR0ZSc7XHJcbmltcG9ydCB0cmFuc2l0aW9ucyBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9zdHlsZXMvdHJhbnNpdGlvbnMnO1xyXG5cclxuY29uc3QgcGFsZXR0ZSA9IGNyZWF0ZVBhbGV0dGUoe1xyXG4gICAgcHJpbWFyeToge1xyXG4gICAgICAgIG1haW46ICcjOThDOUEzJyxcclxuICAgICAgICBsaWdodDogJyNFREVFQzknLFxyXG4gICAgICAgIGRhcms6ICcjNzdCRkEzJ1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCB0aGVtZSA9IGNyZWF0ZU11aVRoZW1lKHtcclxuICAgIHBhbGV0dGUsXHJcbiAgICB0eXBvZ3JhcGh5OiB7XHJcbiAgICAgICAgZm9udEZhbWlseTogXCInRXBpbG9ndWUnLCBzYW5zLXNlcmlmXCIsXHJcbiAgICAgICAgaDE6IHtcclxuICAgICAgICAgICAgZm9udFNpemU6ICcyLjlyZW0nLFxyXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIGgyOiB7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMi40cmVtJyxcclxuICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoMzoge1xyXG4gICAgICAgICAgICBmb250U2l6ZTogJzIuMnJlbScsXHJcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaDQ6IHtcclxuICAgICAgICAgICAgZm9udFNpemU6ICcxLjlyZW0nLFxyXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIGg1OiB7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMS43cmVtJyxcclxuICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoNjoge1xyXG4gICAgICAgICAgICBmb250U2l6ZTogJzEuNXJlbScsXHJcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgIHZhbHVlczoge1xyXG4gICAgICAgICAgICB4czogMCxcclxuICAgICAgICAgICAgc206IDgwMCxcclxuICAgICAgICAgICAgbWQ6IDk2MCxcclxuICAgICAgICAgICAgbGc6IDEyODAsXHJcbiAgICAgICAgICAgIHhsOiAxOTIwXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG92ZXJyaWRlczoge1xyXG4gICAgICAgIE11aUxpbms6IHtcclxuICAgICAgICAgICAgcm9vdDoge1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogcGFsZXR0ZS5wcmltYXJ5LmRhcmssXHJcbiAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiB0cmFuc2l0aW9ucy5jcmVhdGUoWydjb2xvciddLCB7IGR1cmF0aW9uOiAyMDAgfSksXHJcbiAgICAgICAgICAgICAgICAnJjpob3Zlcic6IHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogZGFya2VuKHBhbGV0dGUucHJpbWFyeS5tYWluLCAwLjIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIE11aUJ1dHRvbjoge1xyXG4gICAgICAgICAgICByb290OiB7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiB0cmFuc2l0aW9ucy5jcmVhdGUoWydjb2xvcicsICdiYWNrZ3JvdW5kLWNvbG9yJywgJ2JveC1zaGFkb3cnLCAnYm9yZGVyJ10sIHsgZHVyYXRpb246IDI1MCB9KVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcwIDUwcHggNTBweCAwJyxcclxuICAgICAgICAgICAgICAgIGJvcmRlckxlZnQ6ICcycHggc29saWQnLFxyXG4gICAgICAgICAgICAgICAgdGV4dFRyYW5zZm9ybTogJ2luaXRpYWwnLFxyXG4gICAgICAgICAgICAgICAgcGFkZGluZzogJzRweCAzMnB4JyxcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMXJlbScsXHJcbiAgICAgICAgICAgICAgICBtYXJnaW46ICc1cHggMCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGV4dFByaW1hcnk6IHtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogZmFkZShwYWxldHRlLnByaW1hcnkubGlnaHQsIDAuMiksXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogcGFsZXR0ZS5wcmltYXJ5LmNvbnRyYXN0VGV4dCxcclxuICAgICAgICAgICAgICAgICcmOmhvdmVyJzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBwYWxldHRlLnByaW1hcnkuZGFyayxcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGZhZGUocGFsZXR0ZS5wcmltYXJ5LmxpZ2h0LCAwLjQpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgJyY6YWN0aXZlLCYuYWN0aXZlJzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBwYWxldHRlLnByaW1hcnkuZGFyayxcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGZhZGUocGFsZXR0ZS5wcmltYXJ5LmxpZ2h0LCAwLjYpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9
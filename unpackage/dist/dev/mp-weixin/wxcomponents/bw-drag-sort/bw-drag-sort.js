(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["wxcomponents/bw-drag-sort/bw-drag-sort"],{

/***/ 520:
/*!************************************************************************!*\
  !*** E:/desktop/new_mobile/wxcomponents/bw-drag-sort/bw-drag-sort.vue ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bw_drag_sort_vue_vue_type_template_id_689f9c45_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bw-drag-sort.vue?vue&type=template&id=689f9c45&scoped=true& */ 521);
/* harmony import */ var _bw_drag_sort_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bw-drag-sort.vue?vue&type=script&lang=js& */ 523);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _bw_drag_sort_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _bw_drag_sort_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _bw_drag_sort_vue_vue_type_style_index_0_id_689f9c45_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bw-drag-sort.vue?vue&type=style&index=0&id=689f9c45&scoped=true&lang=css& */ 525);
/* harmony import */ var _D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 10);

var renderjs





/* normalize component */

var component = Object(_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _bw_drag_sort_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _bw_drag_sort_vue_vue_type_template_id_689f9c45_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _bw_drag_sort_vue_vue_type_template_id_689f9c45_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "689f9c45",
  null,
  false,
  _bw_drag_sort_vue_vue_type_template_id_689f9c45_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "wxcomponents/bw-drag-sort/bw-drag-sort.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 521:
/*!*******************************************************************************************************************!*\
  !*** E:/desktop/new_mobile/wxcomponents/bw-drag-sort/bw-drag-sort.vue?vue&type=template&id=689f9c45&scoped=true& ***!
  \*******************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bw_drag_sort_vue_vue_type_template_id_689f9c45_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./bw-drag-sort.vue?vue&type=template&id=689f9c45&scoped=true& */ 522);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bw_drag_sort_vue_vue_type_template_id_689f9c45_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bw_drag_sort_vue_vue_type_template_id_689f9c45_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bw_drag_sort_vue_vue_type_template_id_689f9c45_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bw_drag_sort_vue_vue_type_template_id_689f9c45_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 522:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/desktop/new_mobile/wxcomponents/bw-drag-sort/bw-drag-sort.vue?vue&type=template&id=689f9c45&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var l0 = _vm.__map(_vm.currentList, function(item, index) {
    var $orig = _vm.__get_orig(item)

    var g0 = item.data.nickname.substring(0, 1)
    return {
      $orig: $orig,
      g0: g0
    }
  })

  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l0: l0
      }
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 523:
/*!*************************************************************************************************!*\
  !*** E:/desktop/new_mobile/wxcomponents/bw-drag-sort/bw-drag-sort.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bw_drag_sort_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./bw-drag-sort.vue?vue&type=script&lang=js& */ 524);
/* harmony import */ var _D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bw_drag_sort_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bw_drag_sort_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bw_drag_sort_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bw_drag_sort_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bw_drag_sort_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 524:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/desktop/new_mobile/wxcomponents/bw-drag-sort/bw-drag-sort.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;












































var _request = _interopRequireDefault(__webpack_require__(/*! ../../static/js/request.js */ 18));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default2 = { name: 'drag-sort', mixins: [], components: {}, data: function data() {return { id: '', atcIndex: -1, endIndex: -1, itemHeight: 0, itemWidth: 0, movableHeight: 0, movableWidth: 0, tempPosition: [], itemH_W: 1, // item  高宽比
      active: -1, // 当前激活的item
      currentList: [], xBreakPoints: [], yBreakPoints: [], moveEndxpoint: 0, moveEndypoint: 0, moveStartX: 0, moveStartY: 0, animationBoolean: false };}, props: { autoHeight: { // 设置ture  和  rowNum  求最大最
      type: Boolean, default: true }, rowNum: { type: Number, // 行数
      default: 2 }, colNum: { type: Number, // 列数  目前h4 4列有bug
      default: 1 }, list: { type: Array, default: function _default() {return [1, 2, 3, 4, 5, 6, 7, 8, 9];} }, isDel: { type: Boolean, default: true } },

  watch: {
    list: function list(val) {
      this.uplocationsize();
    } },

  computed: {
    initArray: function initArray() {
      var colIndex = 0;
      var doubleArray = [];
      for (var i = 0; i < this.list.length; i++) {
        if (i % this.colNum == 0 && i !== 0) {
          colIndex++;
        }
        doubleArray.push({
          colIndex: i - colIndex * this.colNum,
          rowIndex: colIndex });

      }
      return doubleArray;
    } },

  mounted: function mounted() {var _this = this;
    this.xBreakPoints = [];
    this.yBreakPoints = [];
    var wrap = uni.createSelectorQuery().in(this).select('#drag');
    wrap.boundingClientRect(function (data) {
      _this.itemWidth = data.width / _this.colNum;
      // console.log(data)
      // this.itemHeight = this.itemWidth * this.itemH_W;
      _this.itemHeight = 60;
      for (var i = 0; i < _this.colNum; i++) {
        _this.xBreakPoints.push(_this.itemWidth * (i + 1));
      }
      for (var i = 0; i < _this.rowNum + 1; i++) {
        _this.yBreakPoints.push(_this.itemHeight * (i + 1));
      }
      _this.movableWidth = data.width;
      var numberRowNum = Math.max(Math.ceil(_this.list.length / _this.colNum), _this.rowNum);
      if (_this.autoHeight) {
        _this.movableHeight = _this.itemHeight * Math.max(Math.ceil(_this.list.length / _this.colNum), 1);


      } else {

        _this.movableHeight = _this.itemHeight * numberRowNum;
      }
      _this.uplocationsize();
    }).exec();

  },
  methods: {
    changeStatus: function changeStatus(item) {
      if (this.id == item) {
        this.id = '';
      } else {
        this.id = item;
      }
    },
    call: function call(phone) {
      uni.makePhoneCall({
        phoneNumber: phone //仅为示例
      });
    },
    openMap: function openMap(item) {

      if (item.latitude == '' && item.longitude == '') {
        _request.default.Toast('该用户不存在定位信息');
      } else {
        uni.openLocation({
          latitude: item.latitude,
          longitude: item.longitude,
          name: item.attr.address });

      }
    },
    uplocationsize: function uplocationsize() {
      var tempArr = [];
      var colIndex = 0;
      var len = this.list.length;
      var resultPosition = this.initArray;
      for (var i = 0; i < len; i++) {
        if (i % this.colNum == 0 && i !== 0) {
          colIndex++;
        }
        tempArr.push({
          data: this.list[i],
          index: i,
          y: this.itemHeight * resultPosition[i].rowIndex,
          x: this.itemWidth * resultPosition[i].colIndex });

      }
      var numberRowNum = Math.max(Math.ceil(this.list.length / this.colNum), this.rowNum);
      if (this.autoHeight) {
        this.movableHeight = this.itemHeight * Math.max(Math.ceil(this.list.length / this.colNum), 1);
      } else {
        this.movableHeight = this.itemHeight * numberRowNum;
      }

      this.$emit('change', this.list);
      //console.log(this.list)
      this.currentList = tempArr;
    },
    returnIndex: function returnIndex(item, arr) {
      for (var i = 0; i < arr.length; i++) {
        if (i == 0 && arr[0] >= item) {
          return 0;
        } else if (item <= arr[i] && item > arr[i - 1]) {
          return i;
        }
      }
    },
    touchstart: function touchstart(e, index) {
      this.active = index;
      this.moveStartX = 0;
      this.moveStartY = 0;
    },

    touchmove: function touchmove(e) {
      this.animationBoolean = false;
      var resultPosition = this.initArray;
      if (this.moveStartX == 0) {
        this.moveStartX = e.mp.touches[0].pageX;
      } else {
        var x = this.itemWidth * resultPosition[this.active].colIndex;
        !!this.currentList[this.active] && this.$set(this.currentList[this.active], 'x', x + e.mp.touches[0].pageX - this.moveStartX);
        this.moveEndxpoint = this.currentList[this.active].x + this.itemWidth / 2;
      }
      if (this.moveStartY == 0) {
        this.moveStartY = e.mp.touches[0].pageY;
      } else {
        var y = this.itemHeight * resultPosition[this.active].rowIndex;
        !!this.currentList[this.active] && this.$set(this.currentList[this.active], 'y', y + e.mp.touches[0].pageY - this.moveStartY);
        this.moveEndypoint = this.currentList[this.active].y + this.itemHeight / 2;
      }

    },
    changePosition: function changePosition(preIndex, nextIndex) {
      this.animationBoolean = true;
      var that = this;
      //console.log('preIndex=='+preIndex,'nextIndex=='+nextIndex)
      var resultPosition = this.initArray;
      var sumLen = this.currentList.length - 1;
      var tempCurrentList = this.currentList;
      if (preIndex <= sumLen && nextIndex <= sumLen) {
        if (preIndex == nextIndex) {







          this.$set(this.currentList[preIndex], 'x', this.itemWidth * resultPosition[preIndex].colIndex);
          this.$set(this.currentList[preIndex], 'y', this.itemHeight * resultPosition[preIndex].rowIndex);

        }
        if (preIndex !== nextIndex) {


          //  console.log('初始',{
          // 	 'xoinit':this.currentList[preIndex].x,
          // 	 'yoinit':this.currentList[preIndex].y,
          // 	 'x2oinit':this.currentList[nextIndex].x,
          // 	 'y2oinit':this.currentList[nextIndex].y
          // })
          // this.$set(this.currentList[nextIndex],'x',this.itemWidth * resultPosition[preIndex].colIndex);
          // this.$set(this.currentList[nextIndex],'y',this.itemHeight * resultPosition[preIndex].rowIndex);
          // this.$set(this.currentList[nextIndex],'index',preIndex);		 				
          // 
          // this.$set(this.currentList[preIndex],'x',this.itemWidth * resultPosition[nextIndex].colIndex);
          // this.$set(this.currentList[preIndex],'y',this.itemHeight * resultPosition[nextIndex].rowIndex);
          // this.$set(this.currentList[preIndex],'index',nextIndex);

          var arr = [preIndex, nextIndex].sort(function (a, b) {return a - b;});
          // this.currentList.splice(arr[0], 0, this.currentList.splice(arr[1], 1)[0]);
          // this.currentList.splice(arr[1], 0, this.currentList.splice(arr[0] + 1, 1)[0]);
          this.list.splice(arr[0], 0, this.list.splice(arr[1], 1)[0]);
          this.list.splice(arr[1], 0, this.list.splice(arr[0] + 1, 1)[0]);
          this.uplocationsize();
          // console.log('设置后',{
          //  	 'xoo':this.currentList[preIndex].x,
          //  	 'yoo':this.currentList[preIndex].y,
          //  	 'x2oo':this.currentList[nextIndex].x,
          //  	 'y2oo':this.currentList[nextIndex].y
          //  })
          //  console.log('理论设置值',{
          // 		 'xset':this.itemWidth * resultPosition[preIndex].colIndex,
          // 		 'yset':this.itemHeight * resultPosition[preIndex].rowIndex,
          // 		 'x2set':this.itemWidth * resultPosition[nextIndex].colIndex,
          // 		 'y2set':this.itemHeight * resultPosition[nextIndex].rowIndex
          //  })
        }
      } else {








        that.$set(that.currentList[preIndex], 'x', that.itemWidth * resultPosition[preIndex].colIndex);
        that.$set(that.currentList[preIndex], 'y', that.itemHeight * resultPosition[preIndex].rowIndex);
        that.$set(that.currentList[preIndex], 'index', preIndex);


      }
      //console.log(this.list)
      this.clearStatus();
    },
    touchend: function touchend(e) {
      if (this.moveEndypoint != 0 || this.moveEndxpoint != 0) {
        var endRowNum = this.returnIndex(this.moveEndypoint, this.yBreakPoints);
        var endColNum = this.returnIndex(this.moveEndxpoint, this.xBreakPoints);
        var resultPosition = this.initArray;

        this.endIndex = endColNum + this.colNum * endRowNum;
        if (!(this.active == -1 || this.endIndex == -1)) {
          this.changePosition(this.active, this.endIndex);
        } else {
          this.clearStatus();
        }
      } else {
        this.clearStatus();
      }
    },
    clearStatus: function clearStatus() {
      this.active = -1;
      this.endIndex = -1;
      this.moveEndxpoint = 0;
      this.moveEndypoint = 0;
    } } };exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 525:
/*!*********************************************************************************************************************************!*\
  !*** E:/desktop/new_mobile/wxcomponents/bw-drag-sort/bw-drag-sort.vue?vue&type=style&index=0&id=689f9c45&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bw_drag_sort_vue_vue_type_style_index_0_id_689f9c45_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./bw-drag-sort.vue?vue&type=style&index=0&id=689f9c45&scoped=true&lang=css& */ 526);
/* harmony import */ var _D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bw_drag_sort_vue_vue_type_style_index_0_id_689f9c45_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bw_drag_sort_vue_vue_type_style_index_0_id_689f9c45_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bw_drag_sort_vue_vue_type_style_index_0_id_689f9c45_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bw_drag_sort_vue_vue_type_style_index_0_id_689f9c45_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_QMDownload_SoftMgr_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_bw_drag_sort_vue_vue_type_style_index_0_id_689f9c45_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 526:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/desktop/new_mobile/wxcomponents/bw-drag-sort/bw-drag-sort.vue?vue&type=style&index=0&id=689f9c45&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/wxcomponents/bw-drag-sort/bw-drag-sort.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'wxcomponents/bw-drag-sort/bw-drag-sort-create-component',
    {
        'wxcomponents/bw-drag-sort/bw-drag-sort-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(520))
        })
    },
    [['wxcomponents/bw-drag-sort/bw-drag-sort-create-component']]
]);

import {
  __commonJS
} from "./chunk-FAW2VN4A.js";

// node_modules/.pnpm/nim-web-sdk-ng@0.15.0/node_modules/nim-web-sdk-ng/dist/NIM_UNIAPP_SDK.js
var require_NIM_UNIAPP_SDK = __commonJS({
  "node_modules/.pnpm/nim-web-sdk-ng@0.15.0/node_modules/nim-web-sdk-ng/dist/NIM_UNIAPP_SDK.js"(exports, module) {
    !function(e, t) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).NIM = t();
    }(exports, function() {
      "use strict";
      var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
      function createCommonjsModule(e2) {
        var t2 = { exports: {} };
        return e2(t2, t2.exports), t2.exports;
      }
      var t = createCommonjsModule(function(e2) {
        var t2 = Object.prototype.hasOwnProperty, r2 = "~";
        function Events() {
        }
        function EE(e3, t3, r3) {
          this.fn = e3, this.context = t3, this.once = r3 || false;
        }
        function addListener(e3, t3, s2, i2, n2) {
          if ("function" != typeof s2)
            throw new TypeError("The listener must be a function");
          var o2 = new EE(s2, i2 || e3, n2), a2 = r2 ? r2 + t3 : t3;
          return e3._events[a2] ? e3._events[a2].fn ? e3._events[a2] = [e3._events[a2], o2] : e3._events[a2].push(o2) : (e3._events[a2] = o2, e3._eventsCount++), e3;
        }
        function clearEvent(e3, t3) {
          0 == --e3._eventsCount ? e3._events = new Events() : delete e3._events[t3];
        }
        function EventEmitter() {
          this._events = new Events(), this._eventsCount = 0;
        }
        Object.create && (Events.prototype = /* @__PURE__ */ Object.create(null), new Events().__proto__ || (r2 = false)), EventEmitter.prototype.eventNames = function eventNames() {
          var e3, s2, i2 = [];
          if (0 === this._eventsCount)
            return i2;
          for (s2 in e3 = this._events)
            t2.call(e3, s2) && i2.push(r2 ? s2.slice(1) : s2);
          return Object.getOwnPropertySymbols ? i2.concat(Object.getOwnPropertySymbols(e3)) : i2;
        }, EventEmitter.prototype.listeners = function listeners(e3) {
          var t3 = r2 ? r2 + e3 : e3, s2 = this._events[t3];
          if (!s2)
            return [];
          if (s2.fn)
            return [s2.fn];
          for (var i2 = 0, n2 = s2.length, o2 = new Array(n2); i2 < n2; i2++)
            o2[i2] = s2[i2].fn;
          return o2;
        }, EventEmitter.prototype.listenerCount = function listenerCount(e3) {
          var t3 = r2 ? r2 + e3 : e3, s2 = this._events[t3];
          return s2 ? s2.fn ? 1 : s2.length : 0;
        }, EventEmitter.prototype.emit = function emit(e3, t3, s2, i2, n2, o2) {
          var a2 = r2 ? r2 + e3 : e3;
          if (!this._events[a2])
            return false;
          var c2, d2, m2 = this._events[a2], l2 = arguments.length;
          if (m2.fn) {
            switch (m2.once && this.removeListener(e3, m2.fn, void 0, true), l2) {
              case 1:
                return m2.fn.call(m2.context), true;
              case 2:
                return m2.fn.call(m2.context, t3), true;
              case 3:
                return m2.fn.call(m2.context, t3, s2), true;
              case 4:
                return m2.fn.call(m2.context, t3, s2, i2), true;
              case 5:
                return m2.fn.call(m2.context, t3, s2, i2, n2), true;
              case 6:
                return m2.fn.call(m2.context, t3, s2, i2, n2, o2), true;
            }
            for (d2 = 1, c2 = new Array(l2 - 1); d2 < l2; d2++)
              c2[d2 - 1] = arguments[d2];
            m2.fn.apply(m2.context, c2);
          } else {
            var p2, u2 = m2.length;
            for (d2 = 0; d2 < u2; d2++)
              switch (m2[d2].once && this.removeListener(e3, m2[d2].fn, void 0, true), l2) {
                case 1:
                  m2[d2].fn.call(m2[d2].context);
                  break;
                case 2:
                  m2[d2].fn.call(m2[d2].context, t3);
                  break;
                case 3:
                  m2[d2].fn.call(m2[d2].context, t3, s2);
                  break;
                case 4:
                  m2[d2].fn.call(m2[d2].context, t3, s2, i2);
                  break;
                default:
                  if (!c2)
                    for (p2 = 1, c2 = new Array(l2 - 1); p2 < l2; p2++)
                      c2[p2 - 1] = arguments[p2];
                  m2[d2].fn.apply(m2[d2].context, c2);
              }
          }
          return true;
        }, EventEmitter.prototype.on = function on(e3, t3, r3) {
          return addListener(this, e3, t3, r3, false);
        }, EventEmitter.prototype.once = function once(e3, t3, r3) {
          return addListener(this, e3, t3, r3, true);
        }, EventEmitter.prototype.removeListener = function removeListener(e3, t3, s2, i2) {
          var n2 = r2 ? r2 + e3 : e3;
          if (!this._events[n2])
            return this;
          if (!t3)
            return clearEvent(this, n2), this;
          var o2 = this._events[n2];
          if (o2.fn)
            o2.fn !== t3 || i2 && !o2.once || s2 && o2.context !== s2 || clearEvent(this, n2);
          else {
            for (var a2 = 0, c2 = [], d2 = o2.length; a2 < d2; a2++)
              (o2[a2].fn !== t3 || i2 && !o2[a2].once || s2 && o2[a2].context !== s2) && c2.push(o2[a2]);
            c2.length ? this._events[n2] = 1 === c2.length ? c2[0] : c2 : clearEvent(this, n2);
          }
          return this;
        }, EventEmitter.prototype.removeAllListeners = function removeAllListeners(e3) {
          var t3;
          return e3 ? (t3 = r2 ? r2 + e3 : e3, this._events[t3] && clearEvent(this, t3)) : (this._events = new Events(), this._eventsCount = 0), this;
        }, EventEmitter.prototype.off = EventEmitter.prototype.removeListener, EventEmitter.prototype.addListener = EventEmitter.prototype.on, EventEmitter.prefixed = r2, EventEmitter.EventEmitter = EventEmitter, e2.exports = EventEmitter;
      }), r = createCommonjsModule(function(e2, t2) {
        e2.exports = function() {
          function _classCallCheck(e4, t4) {
            if (!(e4 instanceof t4))
              throw new TypeError("Cannot call a class as a function");
          }
          function _defineProperties(e4, t4) {
            for (var r3 = 0; r3 < t4.length; r3++) {
              var s2 = t4[r3];
              s2.enumerable = s2.enumerable || false, s2.configurable = true, "value" in s2 && (s2.writable = true), Object.defineProperty(e4, s2.key, s2);
            }
          }
          function _createClass(e4, t4, r3) {
            return t4 && _defineProperties(e4.prototype, t4), r3 && _defineProperties(e4, r3), Object.defineProperty(e4, "prototype", { writable: false }), e4;
          }
          var e3 = { isDataReportEnable: true, maxSize: 100, msgListMaxSize: 1e3, cacheMaxSize: 1e3, maxDelay: 3e5, maxInterval: 3e4, minInterval: 1e4, timeout: 5e3, autoStart: true }, t3 = function emptyFn() {
          }, r2 = function() {
            function Reporter(t4) {
              _classCallCheck(this, Reporter), this.isUploadEnable = false, this.initConfigLoaded = false, this.loading = false, this.isDestroyed = false, this.reportConfig = e3, this.traceMsgCache = {}, this.highPriorityMsgList = [], this.msgList = [], this.lowPriorityMsgList = [], this.cacheMsgList = [], this.lastReportTime = Date.now(), this.timer = null, this.setConfig(t4), this.reportConfig.isDataReportEnable && this.reportConfig.autoStart && this.initUploadConfig();
            }
            return _createClass(Reporter, [{ key: "setConfig", value: function setConfig(e4) {
              this.reportConfig = Object.assign({}, this.reportConfig, e4), this.reportConfig.common.sdk_type || (this.reportConfig.common.sdk_type = "im");
            } }, { key: "reportImmediately", value: function reportImmediately(e4, t4) {
              var r3 = this;
              this.reportConfig.isDataReportEnable && this.reportConfig.request(e4, Object.assign({ dataType: "json", method: "POST", timeout: this.reportConfig.timeout }, t4)).catch(function(e5) {
                var t5, s2;
                null === (s2 = null === (t5 = r3.reportConfig) || void 0 === t5 ? void 0 : t5.logger) || void 0 === s2 || s2.warn("Reporter immediately upload failed", e5);
              });
            } }, { key: "report", value: function report(e4, t4) {
              var r3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
              if (r3.priority || (r3.priority = this.getEventPriority(e4, t4)), this.reportConfig.isDataReportEnable && e4) {
                var s2 = Date.now();
                "HIGH" === r3.priority ? this.highPriorityMsgList.push({ module: e4, msg: t4, createTime: s2 }) : "NORMAL" === r3.priority ? this.msgList.push({ module: e4, msg: t4, createTime: s2 }) : "LOW" === r3.priority && this.lowPriorityMsgList.push({ module: e4, msg: t4, createTime: s2 }), this.highPriorityMsgList.length > this.reportConfig.msgListMaxSize && this.highPriorityMsgList.shift(), this.msgList.length > this.reportConfig.msgListMaxSize && this.msgList.shift(), this.lowPriorityMsgList.length > this.reportConfig.msgListMaxSize && this.lowPriorityMsgList.shift(), this.doReport();
              }
            } }, { key: "reportTraceStart", value: function reportTraceStart(e4, t4) {
              if (this.reportConfig.isDataReportEnable && e4 && !this.traceMsgCache[e4]) {
                var r3 = Object.assign(Object.assign({ start_time: Date.now() }, t4), { extension: [] });
                this.traceMsgCache[e4] = r3;
              }
            } }, { key: "reportTraceUpdate", value: function reportTraceUpdate(e4) {
            } }, { key: "reportTraceUpdateV2", value: function reportTraceUpdateV2(e4, t4, r3) {
              var s2, i2 = this;
              if (this.reportConfig.isDataReportEnable && this.traceMsgCache[e4]) {
                var n2 = this.traceMsgCache[e4].extension.length, o2 = new Date().getTime();
                t4.duration = 0 === n2 ? o2 - this.traceMsgCache[e4].start_time : o2 - this.traceMsgCache[e4].extension[n2 - 1].end_time, this.traceMsgCache[e4].extension.push(Object.assign({ end_time: o2 }, t4)), (null == r3 ? void 0 : r3.asyncParams) && ((s2 = this.traceMsgCache[e4]).asyncPromiseArray || (s2.asyncPromiseArray = []), this.traceMsgCache[e4].asyncPromiseArray.push(r3.asyncParams.then(function(t5) {
                  var r4 = i2.traceMsgCache[e4].extension.length - 1;
                  Object.assign(i2.traceMsgCache[e4].extension[r4], t5);
                })));
              }
            } }, { key: "reportTraceEnd", value: function reportTraceEnd(e4) {
              var t4 = this, r3 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
              if (this.reportConfig.isDataReportEnable && this.traceMsgCache[e4])
                if ("nos" !== e4 || false === r3)
                  if ("boolean" == typeof r3 ? this.traceMsgCache[e4].succeed = !!r3 : this.traceMsgCache[e4].state = r3, this.traceMsgCache[e4].duration = Date.now() - this.traceMsgCache[e4].start_time, this.traceMsgCache[e4].extension.forEach(function(e5) {
                    delete e5.end_time;
                  }), this.traceMsgCache[e4].asyncPromiseArray) {
                    var s2 = this.traceMsgCache[e4];
                    Promise.all(this.traceMsgCache[e4].asyncPromiseArray).finally(function() {
                      s2 === t4.traceMsgCache[e4] && (delete t4.traceMsgCache[e4].asyncPromiseArray, t4.report(e4, t4.traceMsgCache[e4], { priority: t4.getEventPriority(e4, t4.traceMsgCache[e4]) }), t4.traceMsgCache[e4] = null);
                    });
                  } else
                    this.report(e4, this.traceMsgCache[e4], { priority: this.getEventPriority(e4, this.traceMsgCache[e4]) }), this.traceMsgCache[e4] = null;
                else
                  this.traceMsgCache[e4] = null;
            } }, { key: "getEventPriority", value: function getEventPriority(e4, t4) {
              if ("exceptions" === e4) {
                if (0 === t4.action)
                  return "HIGH";
                if (2 === t4.action)
                  return "HIGH";
                if (1 === t4.action && 0 !== t4.exception_service)
                  return "HIGH";
              } else {
                if ("msgReceive" === e4)
                  return "LOW";
                if ("nim_api_trace" === e4)
                  return "LOW";
              }
              return "NORMAL";
            } }, { key: "reportTraceCancel", value: function reportTraceCancel(e4) {
              this.reportConfig.isDataReportEnable && (this.traceMsgCache[e4] = null);
            } }, { key: "pause", value: function pause() {
              this.reportConfig.isDataReportEnable && (this.isUploadEnable = false);
            } }, { key: "restore", value: function restore() {
              this.reportConfig.isDataReportEnable && (this.isUploadEnable = true, this.initConfigLoaded || this.initUploadConfig());
            } }, { key: "destroy", value: function destroy() {
              var e4 = this;
              this.reportConfig.isDataReportEnable && (Object.keys(this.traceMsgCache).forEach(function(t4) {
                e4.reportTraceEnd(t4, 1);
              }), null !== this.timer && clearTimeout(this.timer), this.setConfig = t3, this.report = t3, this.reportTraceStart = t3, this.reportTraceUpdate = t3, this.reportTraceEnd = t3, this.pause = t3, this.restore = t3, this.destroy = t3, this.cacheMsgList = [], this.traceMsgCache = {}, this.lowPriorityMsgList = [], this.msgList = [], this.highPriorityMsgList = [], this.reportConfig = {}, this.isDestroyed = true);
            } }, { key: "initUploadConfig", value: function initUploadConfig() {
              var e4, t4, r3 = this;
              if (!this.loading) {
                this.loading = true;
                var s2 = this.reportConfig.common || {};
                try {
                  this.reportConfig.request(this.reportConfig.reportConfigUrl, { method: "GET", dataType: "json", params: { deviceId: s2.dev_id, sdkVer: s2.sdk_ver, platform: s2.platform, appkey: s2.app_key }, timeout: this.reportConfig.timeout }).then(function(e5) {
                    var t5, s3;
                    if (!r3.isDestroyed) {
                      if (200 === e5.status && e5.data && 200 === e5.data.code) {
                        var i2 = e5.data.data || {};
                        r3.reportConfig.maxSize = i2.maxSize > 1e3 ? 1e3 : i2.maxSize, r3.reportConfig.maxInterval = i2.maxInterval > 1e4 ? 1e4 : i2.maxInterval, r3.reportConfig.maxInterval = i2.maxInterval < 10 ? 10 : i2.maxInterval, r3.reportConfig.minInterval = i2.minInterval < 2 ? 2 : i2.minInterval, r3.reportConfig.maxDelay = i2.maxDelay || 300, r3.reportConfig.maxInterval = 1e3 * r3.reportConfig.maxInterval, r3.reportConfig.minInterval = 1e3 * r3.reportConfig.minInterval, r3.reportConfig.maxDelay = 1e3 * r3.reportConfig.maxDelay, r3.isUploadEnable = true, r3.initConfigLoaded = true, r3.loading = false, r3.reportHeartBeat();
                      }
                      null === (s3 = null === (t5 = r3.reportConfig) || void 0 === t5 ? void 0 : t5.logger) || void 0 === s3 || s3.log("Get reporter upload config success");
                    }
                  }).catch(function(e5) {
                    var t5, s3;
                    r3.loading = false, null === (s3 = null === (t5 = r3.reportConfig) || void 0 === t5 ? void 0 : t5.logger) || void 0 === s3 || s3.error("Get reporter upload config failed", e5);
                  });
                } catch (r4) {
                  this.loading = false, null === (t4 = null === (e4 = this.reportConfig) || void 0 === e4 ? void 0 : e4.logger) || void 0 === t4 || t4.error("Exec reporter request failed", r4);
                }
              }
            } }, { key: "reportHeartBeat", value: function reportHeartBeat() {
              var e4 = this;
              this.isDestroyed || (this.timer = setTimeout(function() {
                e4.reportHeartBeat();
              }, this.reportConfig.minInterval), this.doReport());
            } }, { key: "doReport", value: function doReport() {
              if (!this.isDestroyed) {
                var e4 = this.highPriorityMsgList.length + this.msgList.length + this.lowPriorityMsgList.length + this.cacheMsgList.length > 2 * this.reportConfig.maxSize ? this.reportConfig.minInterval : this.reportConfig.maxInterval;
                Date.now() - this.lastReportTime >= e4 && this.upload();
              }
            } }, { key: "getUploadMsg", value: function getUploadMsg() {
              var e4 = this, t4 = {}, r3 = Date.now();
              this.highPriorityMsgList = this.highPriorityMsgList.filter(function(t5) {
                return r3 - t5.createTime < e4.reportConfig.maxDelay;
              }), this.msgList = this.msgList.filter(function(t5) {
                return r3 - t5.createTime < e4.reportConfig.maxDelay;
              }), this.lowPriorityMsgList = this.lowPriorityMsgList.filter(function(t5) {
                return r3 - t5.createTime < e4.reportConfig.maxDelay;
              }), this.cacheMsgList = this.cacheMsgList.filter(function(t5) {
                return r3 - t5.createTime < e4.reportConfig.maxDelay;
              });
              var s2 = this.highPriorityMsgList.slice(0, this.reportConfig.maxSize);
              if (this.highPriorityMsgList = this.highPriorityMsgList.slice(s2.length), s2.length < this.reportConfig.maxSize) {
                var i2 = this.reportConfig.maxSize - s2.length;
                s2 = s2.concat(this.msgList.slice(0, i2)), this.msgList = this.msgList.slice(i2);
              }
              if (s2.length < this.reportConfig.maxSize) {
                var n2 = this.reportConfig.maxSize - s2.length;
                s2 = s2.concat(this.lowPriorityMsgList.slice(0, n2)), this.lowPriorityMsgList = this.lowPriorityMsgList.slice(n2);
              }
              if (s2.length < this.reportConfig.maxSize) {
                var o2 = this.reportConfig.maxSize - s2.length;
                s2 = s2.concat(this.cacheMsgList.slice(0, o2)), this.cacheMsgList = this.cacheMsgList.slice(o2);
              }
              return s2.forEach(function(e5) {
                t4[e5.module] ? t4[e5.module].push(e5.msg) : t4[e5.module] = [e5.msg];
              }), { uploadMsgArr: s2, uploadMsg: t4 };
            } }, { key: "upload", value: function upload() {
              var e4, t4, r3 = this;
              if (this.isUploadEnable && !(this.lastReportTime && Date.now() - this.lastReportTime < this.reportConfig.minInterval)) {
                var s2 = this.getUploadMsg(), i2 = s2.uploadMsgArr, n2 = s2.uploadMsg;
                if (i2.length) {
                  this.lastReportTime = Date.now();
                  try {
                    this.reportConfig.request(this.reportConfig.reportUrl, { dataType: "json", method: "POST", data: { common: this.reportConfig.common, event: n2 }, headers: { sdktype: "im" }, timeout: this.reportConfig.timeout }).catch(function(e5) {
                      var t5, s3;
                      r3.cacheMsgList = r3.cacheMsgList.concat(i2).slice(0, r3.reportConfig.cacheMaxSize), null === (s3 = null === (t5 = r3.reportConfig) || void 0 === t5 ? void 0 : t5.logger) || void 0 === s3 || s3.warn("Reporter upload failed", e5);
                    });
                  } catch (r4) {
                    null === (t4 = null === (e4 = this.reportConfig) || void 0 === e4 ? void 0 : e4.logger) || void 0 === t4 || t4.warn("Exec reporter request failed", r4);
                  }
                  clearTimeout(this.timer), this.reportHeartBeat();
                }
              }
            } }]), Reporter;
          }();
          return r2;
        }();
      });
      function __rest(e2, t2) {
        var r2 = {};
        for (var s2 in e2)
          Object.prototype.hasOwnProperty.call(e2, s2) && t2.indexOf(s2) < 0 && (r2[s2] = e2[s2]);
        if (null != e2 && "function" == typeof Object.getOwnPropertySymbols) {
          var i2 = 0;
          for (s2 = Object.getOwnPropertySymbols(e2); i2 < s2.length; i2++)
            t2.indexOf(s2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(e2, s2[i2]) && (r2[s2[i2]] = e2[s2[i2]]);
        }
        return r2;
      }
      function __awaiter(e2, t2, r2, s2) {
        return new (r2 || (r2 = Promise))(function(i2, n2) {
          function fulfilled(e3) {
            try {
              step(s2.next(e3));
            } catch (e4) {
              n2(e4);
            }
          }
          function rejected(e3) {
            try {
              step(s2.throw(e3));
            } catch (e4) {
              n2(e4);
            }
          }
          function step(e3) {
            e3.done ? i2(e3.value) : function adopt(e4) {
              return e4 instanceof r2 ? e4 : new r2(function(t3) {
                t3(e4);
              });
            }(e3.value).then(fulfilled, rejected);
          }
          step((s2 = s2.apply(e2, t2 || [])).next());
        });
      }
      var s = Array.isArray, i = "object" == typeof e && e && e.Object === Object && e, n = "object" == typeof self && self && self.Object === Object && self, o = i || n || Function("return this")(), a = o.Symbol, c = Object.prototype, d = c.hasOwnProperty, m = c.toString, l = a ? a.toStringTag : void 0;
      var p = function getRawTag(e2) {
        var t2 = d.call(e2, l), r2 = e2[l];
        try {
          e2[l] = void 0;
          var s2 = true;
        } catch (e3) {
        }
        var i2 = m.call(e2);
        return s2 && (t2 ? e2[l] = r2 : delete e2[l]), i2;
      }, u = Object.prototype.toString;
      var g = function objectToString(e2) {
        return u.call(e2);
      }, y = a ? a.toStringTag : void 0;
      var h = function baseGetTag(e2) {
        return null == e2 ? void 0 === e2 ? "[object Undefined]" : "[object Null]" : y && y in Object(e2) ? p(e2) : g(e2);
      };
      var f = function isObjectLike(e2) {
        return null != e2 && "object" == typeof e2;
      };
      var v = function isSymbol(e2) {
        return "symbol" == typeof e2 || f(e2) && "[object Symbol]" == h(e2);
      }, S = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, T = /^\w*$/;
      var M = function isKey(e2, t2) {
        if (s(e2))
          return false;
        var r2 = typeof e2;
        return !("number" != r2 && "symbol" != r2 && "boolean" != r2 && null != e2 && !v(e2)) || (T.test(e2) || !S.test(e2) || null != t2 && e2 in Object(t2));
      };
      var b = function isObject(e2) {
        var t2 = typeof e2;
        return null != e2 && ("object" == t2 || "function" == t2);
      };
      var k, C = function isFunction(e2) {
        if (!b(e2))
          return false;
        var t2 = h(e2);
        return "[object Function]" == t2 || "[object GeneratorFunction]" == t2 || "[object AsyncFunction]" == t2 || "[object Proxy]" == t2;
      }, I = o["__core-js_shared__"], w = (k = /[^.]+$/.exec(I && I.keys && I.keys.IE_PROTO || "")) ? "Symbol(src)_1." + k : "";
      var _ = function isMasked(e2) {
        return !!w && w in e2;
      }, E = Function.prototype.toString;
      var P = function toSource(e2) {
        if (null != e2) {
          try {
            return E.call(e2);
          } catch (e3) {
          }
          try {
            return e2 + "";
          } catch (e3) {
          }
        }
        return "";
      }, A = /^\[object .+?Constructor\]$/, x = Function.prototype, j = Object.prototype, O = x.toString, R = j.hasOwnProperty, N = RegExp("^" + O.call(R).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
      var L = function baseIsNative(e2) {
        return !(!b(e2) || _(e2)) && (C(e2) ? N : A).test(P(e2));
      };
      var U = function getValue(e2, t2) {
        return null == e2 ? void 0 : e2[t2];
      };
      var q = function getNative(e2, t2) {
        var r2 = U(e2, t2);
        return L(r2) ? r2 : void 0;
      }, D = q(Object, "create");
      var B = function hashClear() {
        this.__data__ = D ? D(null) : {}, this.size = 0;
      };
      var H = function hashDelete(e2) {
        var t2 = this.has(e2) && delete this.__data__[e2];
        return this.size -= t2 ? 1 : 0, t2;
      }, $ = Object.prototype.hasOwnProperty;
      var z = function hashGet(e2) {
        var t2 = this.__data__;
        if (D) {
          var r2 = t2[e2];
          return "__lodash_hash_undefined__" === r2 ? void 0 : r2;
        }
        return $.call(t2, e2) ? t2[e2] : void 0;
      }, V = Object.prototype.hasOwnProperty;
      var G = function hashHas(e2) {
        var t2 = this.__data__;
        return D ? void 0 !== t2[e2] : V.call(t2, e2);
      };
      var K = function hashSet(e2, t2) {
        var r2 = this.__data__;
        return this.size += this.has(e2) ? 0 : 1, r2[e2] = D && void 0 === t2 ? "__lodash_hash_undefined__" : t2, this;
      };
      function Hash(e2) {
        var t2 = -1, r2 = null == e2 ? 0 : e2.length;
        for (this.clear(); ++t2 < r2; ) {
          var s2 = e2[t2];
          this.set(s2[0], s2[1]);
        }
      }
      Hash.prototype.clear = B, Hash.prototype.delete = H, Hash.prototype.get = z, Hash.prototype.has = G, Hash.prototype.set = K;
      var W = Hash;
      var J = function listCacheClear() {
        this.__data__ = [], this.size = 0;
      };
      var Y = function eq(e2, t2) {
        return e2 === t2 || e2 != e2 && t2 != t2;
      };
      var Q = function assocIndexOf(e2, t2) {
        for (var r2 = e2.length; r2--; )
          if (Y(e2[r2][0], t2))
            return r2;
        return -1;
      }, X = Array.prototype.splice;
      var Z = function listCacheDelete(e2) {
        var t2 = this.__data__, r2 = Q(t2, e2);
        return !(r2 < 0) && (r2 == t2.length - 1 ? t2.pop() : X.call(t2, r2, 1), --this.size, true);
      };
      var ee = function listCacheGet(e2) {
        var t2 = this.__data__, r2 = Q(t2, e2);
        return r2 < 0 ? void 0 : t2[r2][1];
      };
      var te = function listCacheHas(e2) {
        return Q(this.__data__, e2) > -1;
      };
      var re = function listCacheSet(e2, t2) {
        var r2 = this.__data__, s2 = Q(r2, e2);
        return s2 < 0 ? (++this.size, r2.push([e2, t2])) : r2[s2][1] = t2, this;
      };
      function ListCache(e2) {
        var t2 = -1, r2 = null == e2 ? 0 : e2.length;
        for (this.clear(); ++t2 < r2; ) {
          var s2 = e2[t2];
          this.set(s2[0], s2[1]);
        }
      }
      ListCache.prototype.clear = J, ListCache.prototype.delete = Z, ListCache.prototype.get = ee, ListCache.prototype.has = te, ListCache.prototype.set = re;
      var se = ListCache, ie = q(o, "Map");
      var ne = function mapCacheClear() {
        this.size = 0, this.__data__ = { hash: new W(), map: new (ie || se)(), string: new W() };
      };
      var oe = function isKeyable(e2) {
        var t2 = typeof e2;
        return "string" == t2 || "number" == t2 || "symbol" == t2 || "boolean" == t2 ? "__proto__" !== e2 : null === e2;
      };
      var ae = function getMapData(e2, t2) {
        var r2 = e2.__data__;
        return oe(t2) ? r2["string" == typeof t2 ? "string" : "hash"] : r2.map;
      };
      var ce = function mapCacheDelete(e2) {
        var t2 = ae(this, e2).delete(e2);
        return this.size -= t2 ? 1 : 0, t2;
      };
      var de = function mapCacheGet(e2) {
        return ae(this, e2).get(e2);
      };
      var me = function mapCacheHas(e2) {
        return ae(this, e2).has(e2);
      };
      var le = function mapCacheSet(e2, t2) {
        var r2 = ae(this, e2), s2 = r2.size;
        return r2.set(e2, t2), this.size += r2.size == s2 ? 0 : 1, this;
      };
      function MapCache(e2) {
        var t2 = -1, r2 = null == e2 ? 0 : e2.length;
        for (this.clear(); ++t2 < r2; ) {
          var s2 = e2[t2];
          this.set(s2[0], s2[1]);
        }
      }
      MapCache.prototype.clear = ne, MapCache.prototype.delete = ce, MapCache.prototype.get = de, MapCache.prototype.has = me, MapCache.prototype.set = le;
      var pe = MapCache;
      function memoize(e2, t2) {
        if ("function" != typeof e2 || null != t2 && "function" != typeof t2)
          throw new TypeError("Expected a function");
        var memoized = function() {
          var r2 = arguments, s2 = t2 ? t2.apply(this, r2) : r2[0], i2 = memoized.cache;
          if (i2.has(s2))
            return i2.get(s2);
          var n2 = e2.apply(this, r2);
          return memoized.cache = i2.set(s2, n2) || i2, n2;
        };
        return memoized.cache = new (memoize.Cache || pe)(), memoized;
      }
      memoize.Cache = pe;
      var ue = memoize;
      var ge = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, ye = /\\(\\)?/g, he = function memoizeCapped(e2) {
        var t2 = ue(e2, function(e3) {
          return 500 === r2.size && r2.clear(), e3;
        }), r2 = t2.cache;
        return t2;
      }(function(e2) {
        var t2 = [];
        return 46 === e2.charCodeAt(0) && t2.push(""), e2.replace(ge, function(e3, r2, s2, i2) {
          t2.push(s2 ? i2.replace(ye, "$1") : r2 || e3);
        }), t2;
      });
      var fe = function arrayMap(e2, t2) {
        for (var r2 = -1, s2 = null == e2 ? 0 : e2.length, i2 = Array(s2); ++r2 < s2; )
          i2[r2] = t2(e2[r2], r2, e2);
        return i2;
      }, ve = a ? a.prototype : void 0, Se = ve ? ve.toString : void 0;
      var Te = function baseToString(e2) {
        if ("string" == typeof e2)
          return e2;
        if (s(e2))
          return fe(e2, baseToString) + "";
        if (v(e2))
          return Se ? Se.call(e2) : "";
        var t2 = e2 + "";
        return "0" == t2 && 1 / e2 == -Infinity ? "-0" : t2;
      };
      var Me = function toString(e2) {
        return null == e2 ? "" : Te(e2);
      };
      var be = function castPath(e2, t2) {
        return s(e2) ? e2 : M(e2, t2) ? [e2] : he(Me(e2));
      };
      var ke = function toKey(e2) {
        if ("string" == typeof e2 || v(e2))
          return e2;
        var t2 = e2 + "";
        return "0" == t2 && 1 / e2 == -Infinity ? "-0" : t2;
      };
      var Ce = function baseGet(e2, t2) {
        for (var r2 = 0, s2 = (t2 = be(t2, e2)).length; null != e2 && r2 < s2; )
          e2 = e2[ke(t2[r2++])];
        return r2 && r2 == s2 ? e2 : void 0;
      };
      var Ie = function get(e2, t2, r2) {
        var s2 = null == e2 ? void 0 : Ce(e2, t2);
        return void 0 === s2 ? r2 : s2;
      };
      class Service {
        constructor(e2, t2) {
          this.name = e2, this.core = t2, this.name = e2, this.logger = t2.logger, this.core = t2;
        }
        process(e2) {
          const t2 = this[e2.cmd + "Handler"];
          return "function" == typeof t2 ? t2.call(this, e2) : e2.error && !e2.error.ignore ? Promise.reject(e2.error) : Promise.resolve(e2);
        }
      }
      var we = function isUndefined(e2) {
        return void 0 === e2;
      };
      class CustomError extends Error {
        constructor(e2, t2 = {}, r2 = 400) {
          super(e2), this.data = t2, this.code = r2, this.name = "customError";
        }
      }
      class ValidateError extends CustomError {
        constructor(e2, t2 = {}, r2) {
          super(e2, t2, 414), this.code = 414, this.name = "validateError", this.rules = r2;
        }
      }
      const _e = { 200: null, 406: null, 808: null, 810: null, 201: "The client version is incorrect. You need to upgrade the SDK", 302: "The user name or password is incorrect. Please check whether the appkey and token are valid and whether the account and token match", 403: "Illegal operation or no permission", 404: "Target object does not exist", 405: "Parameter length too long", 408: "Client request timed out", 414: "Request parameter error", 415: "Service unavailable", 416: "Frequency control", 417: "Repeat operation", 422: "Account disabled", 500: "Server internal error", 503: "Server busy", 508: "Expiration date", 509: "Invalid", 7101: "Be pulled black", 700: "Partial failure of batch operation", 801: "The number of people in the team has reached the upper limit", 802: "No permission", 803: "The team does not exist or has not changed", 804: "The user is not in the team", 805: "Team type mismatch", 806: "The number of teams created has reached the limit", 807: "Team member not valid", 809: "Already in the team", 811: "The number of accounts in the forced push list exceeds the limit", 812: "The team is muted", 813: "Due to the limited number of team, some pull people successfully", 814: "Disable team message read service", 815: "Maximum number of team administrators", 816: "Batch operation partial failure", 997: "The packet has expired", 998: "Deserialize packet error", 999: "Serialize packet error", 9102: "Channel failure", 9103: "This call has been answered / rejected at another end", 10201: "Signaling: target NIM client is offline", 10202: "Signaling: push is unreachable", 10404: "Signaling: channel not exists", 10405: "Signaling: channel already exists", 10406: "Signaling: member of channel not exists", 10407: "Signaling: member of channel already exists", 10408: "Signaling: the invitation request does not exist or has expired", 10409: "Signaling: the invitation request has been rejected", 10410: "Signaling: the invitation request has been accepted", 10414: "Signaling: request parameter error", 10417: "Signaling: uid conflict", 10419: "Signaling: the number of members of channel exceed the limit", 10420: "Signaling: member is already in the channel on other client", 10700: "Signaling: phased success", 13002: "Abnormal chatroom status", 13003: "In the blacklist", 13004: "In the mute list", 13006: "All members are muted, and only the administrator can speak" };
      class CmdError extends CustomError {
        constructor(e2, t2, r2 = "", s2 = new Date().getTime(), i2 = {}) {
          super(r2 = r2 || _e[e2], i2, e2), this.name = "cmdError", this.cmd = t2, this.timetag = s2;
        }
      }
      class FormatError extends CustomError {
        constructor(e2, t2, r2) {
          super(e2, {}, 412), this.code = 412, this.name = "formatError", this.key = t2, this.reason = r2;
        }
      }
      class UploadError extends CustomError {
        constructor(e2, t2, r2, s2, i2) {
          super(e2, { file: i2 }, 400), this.name = "uploadError", this.rawError = t2, this.curProvider = r2 || 1, this.mixStorePolicy = s2;
        }
      }
      let Ee = {}, Pe = {};
      function parseCmd(e2, t2) {
        var r2;
        let s2;
        try {
          s2 = JSON.parse(e2);
        } catch (r3) {
          throw t2.error("Parse command error: ", e2), r3;
        }
        let i2 = s2.sid + "_" + s2.cid, n2 = s2.r;
        if (["4_1", "4_2", "4_10", "4_11"].includes(i2)) {
          const e3 = s2.r[1].headerPacket;
          i2 = `${e3.sid}_${e3.cid}`, n2 = s2.r[1].body;
        }
        const o2 = Pe[i2], a2 = Ee[o2], c2 = function genCmdError(e3, t3) {
          const r3 = _e[e3];
          return null === r3 ? null : new CmdError(e3, t3, r3, new Date().getTime());
        }(s2.code, o2), d2 = { cmd: o2, raw: s2, error: c2, service: null == a2 ? void 0 : a2.service, content: {} };
        if (d2.error) {
          if (d2.error.cmd = o2, d2.error.callFunc = "parseCmd", !(null === (r2 = null == a2 ? void 0 : a2.ignoreErrCodes) || void 0 === r2 ? void 0 : r2.includes(s2.code)))
            return d2;
          t2.warn("parseCmd:: ignore error ", d2.error), d2.error.ignore = true;
        }
        return o2 && a2 ? (a2.response && a2.response.forEach((e3, t3) => {
          const r3 = n2[t3], s3 = e3.type, i3 = e3.name, o3 = e3.reflectMapper;
          if (!we(r3))
            switch (s3) {
              case "Property":
                d2.content[i3] = o3 ? deserialize(r3, o3) : r3;
                break;
              case "PropertyArray":
                d2.content[i3] = r3.map((e4) => o3 ? deserialize(e4, o3) : e4);
                break;
              case "long":
              case "Long":
              case "byte":
              case "Byte":
              case "Number":
                d2.content[i3] = +r3;
                break;
              default:
                d2.content[i3] = r3;
            }
        }), d2) : (d2.notFound = true, d2);
      }
      function serialize(e2, t2) {
        const r2 = {};
        for (const s2 in e2)
          void 0 !== t2[s2] && (r2[t2[s2]] = e2[s2]);
        return r2;
      }
      function deserialize(e2, t2) {
        const r2 = {};
        for (const s2 in e2)
          void 0 !== t2[s2] && (r2[t2[s2]] = e2[s2]);
        return r2;
      }
      function registerParser(e2) {
        Ee = Object.assign(Ee, e2.cmdConfig), Pe = Object.assign(Pe, e2.cmdMap);
      }
      function invertSerializeMap(e2) {
        return Object.keys(e2).reduce((t2, r2) => {
          const s2 = e2[r2];
          return t2[r2] = Object.keys(s2).reduce((e3, t3) => (e3[s2[t3]] = t3, e3), {}), t2;
        }, {});
      }
      const Ae = { "1_2": "heartbeat", "2_3": "login", "2_5": "kicked", "2_6": "logout", "2_7": "multiPortLogin", "2_8": "kick" }, xe = { login: { clientType: 3, os: 4, sdkVersion: 6, appLogin: 8, protocolVersion: 9, pushTokenName: 10, pushToken: 11, deviceId: 13, appkey: 18, account: 19, browser: 24, session: 26, deviceInfo: 32, isReactNative: 112, token: 1e3, customTag: 38, customClientType: 39, sdkHumanVersion: 40, sdkType: 41, userAgent: 42, authType: 115, loginExt: 116 }, loginRes: { lastLoginDeviceId: 17, customTag: 38, connectionId: 102, ip: 103, port: 104, country: 106, hasXMPush: 111 }, loginPort: { type: 3, os: 4, mac: 5, deviceId: 13, account: 19, deviceInfo: 32, customTag: 38, connectionId: 102, ip: 103, time: 109 }, aosPushInfo: { pushType: 110, hasTokenPreviously: 111 } }, je = invertSerializeMap(xe), Oe = { login: { sid: 2, cid: 3, service: "auth", params: [{ type: "Property", name: "login", reflectMapper: xe.login }], response: [{ type: "Property", name: "loginRes", reflectMapper: je.loginRes }, { type: "PropertyArray", name: "loginPorts", reflectMapper: je.loginPort }, { type: "Property", name: "aosPushInfo", reflectMapper: je.aosPushInfo }] }, logout: { sid: 2, cid: 6, service: "auth" }, heartbeat: { sid: 1, cid: 2, service: "auth" }, kicked: { sid: 2, cid: 5, service: "auth", response: [{ type: "Number", name: "clientType" }, { type: "Number", name: "reason" }, { type: "String", name: "ext" }, { type: "Number", name: "customClientType" }] }, multiPortLogin: { sid: 2, cid: 7, service: "auth", response: [{ type: "Number", name: "state" }, { type: "PropertyArray", name: "loginPorts", reflectMapper: je.loginPort }] }, kick: { sid: 2, cid: 8, service: "auth", params: [{ type: "StrArray", name: "deviceIds" }], response: [{ type: "StrArray", name: "deviceIds" }] } };
      var Re, Fe, Ne, Le, Ue;
      !function(e2) {
        e2[e2.text = 0] = "text", e2[e2.image = 1] = "image", e2[e2.audio = 2] = "audio", e2[e2.video = 3] = "video", e2[e2.geo = 4] = "geo", e2[e2.notification = 5] = "notification", e2[e2.file = 6] = "file", e2[e2.tip = 10] = "tip", e2[e2.robot = 11] = "robot", e2[e2.g2 = 12] = "g2", e2[e2.custom = 100] = "custom";
      }(Re || (Re = {})), function(e2) {
        e2[e2.p2p = 0] = "p2p", e2[e2.team = 1] = "team", e2[e2.superTeam = 5] = "superTeam";
      }(Fe || (Fe = {})), function(e2) {
        e2[e2.Android = 1] = "Android", e2[e2.iOS = 2] = "iOS", e2[e2.PC = 4] = "PC", e2[e2.WindowsPhone = 8] = "WindowsPhone", e2[e2.Web = 16] = "Web", e2[e2.Server = 32] = "Server", e2[e2.Mac = 64] = "Mac";
      }(Ne || (Ne = {})), function(e2) {
        e2[e2.unread = 1] = "unread", e2[e2.read = 2] = "read", e2[e2.deleted = 3] = "deleted", e2[e2.sending = 4] = "sending", e2[e2.sendFailed = 5] = "sendFailed", e2[e2.sent = 6] = "sent", e2[e2.receipt = 7] = "receipt", e2[e2.refused = 10] = "refused";
      }(Le || (Le = {})), function(e2) {
        e2[e2.default = 0] = "default", e2[e2.leave = 1] = "leave", e2[e2.roam = 2] = "roam";
      }(Ue || (Ue = {}));
      var qe = function overArg(e2, t2) {
        return function(r2) {
          return e2(t2(r2));
        };
      }, De = qe(Object.getPrototypeOf, Object), Be = Function.prototype, He = Object.prototype, $e = Be.toString, ze = He.hasOwnProperty, Ve = $e.call(Object);
      var Ge = function isPlainObject(e2) {
        if (!f(e2) || "[object Object]" != h(e2))
          return false;
        var t2 = De(e2);
        if (null === t2)
          return true;
        var r2 = ze.call(t2, "constructor") && t2.constructor;
        return "function" == typeof r2 && r2 instanceof r2 && $e.call(r2) == Ve;
      };
      function format(e2, t2) {
        if (!Ge(t2))
          return {};
        const r2 = JSON.parse(JSON.stringify(t2)), s2 = doFormat(e2, r2);
        return JSON.parse(JSON.stringify(Object.assign(Object.assign({}, r2), s2)));
      }
      function doFormat(e2, t2) {
        if (!Ge(t2))
          return {};
        const r2 = {};
        return Object.keys(e2).forEach((s2) => {
          const i2 = e2[s2].type;
          if ("string" != typeof i2) {
            const i3 = doFormat(e2[s2], t2);
            return void (Object.keys(i3).length > 0 && (r2[s2] = i3));
          }
          const n2 = e2[s2], o2 = n2.rawKey || s2, a2 = Ke[i2](t2, o2, n2);
          void 0 !== a2 && (t2[o2] = void 0, r2[s2] = a2);
        }), r2;
      }
      const Ke = { number: function(e2, t2) {
        if (void 0 !== e2[t2])
          return +e2[t2];
      }, string: function(e2, t2) {
        if (void 0 !== e2[t2])
          return e2[t2];
      }, boolean: function(e2, t2) {
        return +e2[t2] > 0 || 0 != +e2[t2] && void 0;
      }, enum: function(e2, t2, r2) {
        return r2.values[e2[t2]];
      }, object: function(e2, t2) {
        if (void 0 !== e2[t2])
          try {
            return JSON.parse(e2[t2]);
          } catch (e3) {
            return {};
          }
      } };
      function formatReverse(e2, t2) {
        if (!Ge(t2))
          return {};
        const r2 = JSON.parse(JSON.stringify(t2)), s2 = doFormatReverse(e2, r2);
        return JSON.parse(JSON.stringify(Object.assign(Object.assign({}, r2), s2)));
      }
      function doFormatReverse(e2, t2) {
        if (!Ge(t2))
          return Object.keys(e2).reduce((t3, r3) => (t3[e2[r3].rawKey || r3] = void 0, t3), {});
        const r2 = {};
        return Object.keys(e2).forEach((s2) => {
          const i2 = e2[s2].type;
          if ("string" != typeof i2) {
            const i3 = doFormatReverse(e2[s2], t2[s2]);
            return Object.assign(r2, i3), void (t2[s2] = void 0);
          }
          const n2 = e2[s2], o2 = n2.rawKey || s2, a2 = We[i2](t2, s2, n2);
          t2[o2] = void 0, r2[o2] = a2;
        }), r2;
      }
      const We = { number: function(e2, t2) {
        return e2[t2];
      }, string: function(e2, t2) {
        return e2[t2];
      }, boolean: function(e2, t2) {
        return true === e2[t2] ? 1 : false === e2[t2] ? 0 : void 0;
      }, enum: function(e2, t2, r2) {
        return r2.values[e2[t2]];
      }, object: function(e2, t2) {
        if (void 0 !== e2[t2])
          try {
            return JSON.stringify(e2[t2]);
          } catch (e3) {
            return "";
          }
      } }, Je = We;
      var Ye = function constant(e2) {
        return function() {
          return e2;
        };
      };
      var Qe = function createBaseFor(e2) {
        return function(t2, r2, s2) {
          for (var i2 = -1, n2 = Object(t2), o2 = s2(t2), a2 = o2.length; a2--; ) {
            var c2 = o2[e2 ? a2 : ++i2];
            if (false === r2(n2[c2], c2, n2))
              break;
          }
          return t2;
        };
      }();
      var Xe = function baseTimes(e2, t2) {
        for (var r2 = -1, s2 = Array(e2); ++r2 < e2; )
          s2[r2] = t2(r2);
        return s2;
      };
      var Ze = function baseIsArguments(e2) {
        return f(e2) && "[object Arguments]" == h(e2);
      }, et = Object.prototype, rt = et.hasOwnProperty, st = et.propertyIsEnumerable, it = Ze(function() {
        return arguments;
      }()) ? Ze : function(e2) {
        return f(e2) && rt.call(e2, "callee") && !st.call(e2, "callee");
      }, nt = it;
      var ot = function stubFalse() {
        return false;
      }, at = createCommonjsModule(function(e2, t2) {
        var r2 = t2 && !t2.nodeType && t2, s2 = r2 && e2 && !e2.nodeType && e2, i2 = s2 && s2.exports === r2 ? o.Buffer : void 0, n2 = (i2 ? i2.isBuffer : void 0) || ot;
        e2.exports = n2;
      }), ct = /^(?:0|[1-9]\d*)$/;
      var dt = function isIndex(e2, t2) {
        var r2 = typeof e2;
        return !!(t2 = null == t2 ? 9007199254740991 : t2) && ("number" == r2 || "symbol" != r2 && ct.test(e2)) && e2 > -1 && e2 % 1 == 0 && e2 < t2;
      };
      var mt = function isLength(e2) {
        return "number" == typeof e2 && e2 > -1 && e2 % 1 == 0 && e2 <= 9007199254740991;
      }, lt = {};
      lt["[object Float32Array]"] = lt["[object Float64Array]"] = lt["[object Int8Array]"] = lt["[object Int16Array]"] = lt["[object Int32Array]"] = lt["[object Uint8Array]"] = lt["[object Uint8ClampedArray]"] = lt["[object Uint16Array]"] = lt["[object Uint32Array]"] = true, lt["[object Arguments]"] = lt["[object Array]"] = lt["[object ArrayBuffer]"] = lt["[object Boolean]"] = lt["[object DataView]"] = lt["[object Date]"] = lt["[object Error]"] = lt["[object Function]"] = lt["[object Map]"] = lt["[object Number]"] = lt["[object Object]"] = lt["[object RegExp]"] = lt["[object Set]"] = lt["[object String]"] = lt["[object WeakMap]"] = false;
      var pt = function baseIsTypedArray(e2) {
        return f(e2) && mt(e2.length) && !!lt[h(e2)];
      };
      var ut = function baseUnary(e2) {
        return function(t2) {
          return e2(t2);
        };
      }, gt = createCommonjsModule(function(e2, t2) {
        var r2 = t2 && !t2.nodeType && t2, s2 = r2 && e2 && !e2.nodeType && e2, n2 = s2 && s2.exports === r2 && i.process, o2 = function() {
          try {
            var e3 = s2 && s2.require && s2.require("util").types;
            return e3 || n2 && n2.binding && n2.binding("util");
          } catch (e4) {
          }
        }();
        e2.exports = o2;
      }), yt = gt && gt.isTypedArray, ht = yt ? ut(yt) : pt, ft = Object.prototype.hasOwnProperty;
      var vt = function arrayLikeKeys(e2, t2) {
        var r2 = s(e2), i2 = !r2 && nt(e2), n2 = !r2 && !i2 && at(e2), o2 = !r2 && !i2 && !n2 && ht(e2), a2 = r2 || i2 || n2 || o2, c2 = a2 ? Xe(e2.length, String) : [], d2 = c2.length;
        for (var m2 in e2)
          !t2 && !ft.call(e2, m2) || a2 && ("length" == m2 || n2 && ("offset" == m2 || "parent" == m2) || o2 && ("buffer" == m2 || "byteLength" == m2 || "byteOffset" == m2) || dt(m2, d2)) || c2.push(m2);
        return c2;
      }, St = Object.prototype;
      var Tt = function isPrototype(e2) {
        var t2 = e2 && e2.constructor;
        return e2 === ("function" == typeof t2 && t2.prototype || St);
      }, Mt = qe(Object.keys, Object), bt = Object.prototype.hasOwnProperty;
      var kt = function baseKeys(e2) {
        if (!Tt(e2))
          return Mt(e2);
        var t2 = [];
        for (var r2 in Object(e2))
          bt.call(e2, r2) && "constructor" != r2 && t2.push(r2);
        return t2;
      };
      var Ct = function isArrayLike(e2) {
        return null != e2 && mt(e2.length) && !C(e2);
      };
      var It = function keys(e2) {
        return Ct(e2) ? vt(e2) : kt(e2);
      };
      var wt = function baseForOwn(e2, t2) {
        return e2 && Qe(e2, t2, It);
      };
      var _t = function baseInverter(e2, t2, r2, s2) {
        return wt(e2, function(e3, i2, n2) {
          t2(s2, r2(e3), i2, n2);
        }), s2;
      };
      var Et = function createInverter(e2, t2) {
        return function(r2, s2) {
          return _t(r2, e2, t2(s2), {});
        };
      };
      var Pt = function identity(e2) {
        return e2;
      }, At = Object.prototype.toString, xt = Et(function(e2, t2, r2) {
        null != t2 && "function" != typeof t2.toString && (t2 = At.call(t2)), e2[t2] = r2;
      }, Ye(Pt));
      const jt = xt({ Android: 1, iOS: 2, PC: 4, WindowsPhone: 8, Web: 16, Server: 32, Mac: 64 }), Ot = { p2p: 0, team: 1, superTeam: 5 };
      var Rt;
      function formatMultiPortLoginInfo(e2, t2) {
        return e2 && e2.length > 0 ? e2.map((e3) => Object.assign(Object.assign({}, e3), { account: e3.account, connectionId: e3.connectionId, deviceId: e3.deviceId, ip: e3.ip, mac: e3.mac, os: e3.os, type: jt[e3.type] || e3.type, time: parseInt(e3.time), online: 3 !== t2 })) : [];
      }
      xt(Ot), function(e2) {
        e2[e2.text = 0] = "text", e2[e2.image = 1] = "image", e2[e2.audio = 2] = "audio", e2[e2.video = 3] = "video", e2[e2.geo = 4] = "geo", e2[e2.notification = 5] = "notification", e2[e2.file = 6] = "file", e2[e2.tip = 10] = "tip", e2[e2.robot = 11] = "robot", e2[e2.g2 = 12] = "g2", e2[e2.custom = 100] = "custom";
      }(Rt || (Rt = {}));
      const Ft = { 1: { reason: "samePlatformKick", message: "The same account is not allowed to multiple login at the same time" }, 2: { reason: "serverKick", message: "Kicked out by IM server" }, 3: { reason: "otherPlatformKick", message: "Kicked out by other client of your account" }, 4: { reason: "silentlyKick", message: "Quietly kicked" } };
      var Nt = function stackClear() {
        this.__data__ = new se(), this.size = 0;
      };
      var Lt = function stackDelete(e2) {
        var t2 = this.__data__, r2 = t2.delete(e2);
        return this.size = t2.size, r2;
      };
      var Ut = function stackGet(e2) {
        return this.__data__.get(e2);
      };
      var qt = function stackHas(e2) {
        return this.__data__.has(e2);
      };
      var Dt = function stackSet(e2, t2) {
        var r2 = this.__data__;
        if (r2 instanceof se) {
          var s2 = r2.__data__;
          if (!ie || s2.length < 199)
            return s2.push([e2, t2]), this.size = ++r2.size, this;
          r2 = this.__data__ = new pe(s2);
        }
        return r2.set(e2, t2), this.size = r2.size, this;
      };
      function Stack(e2) {
        var t2 = this.__data__ = new se(e2);
        this.size = t2.size;
      }
      Stack.prototype.clear = Nt, Stack.prototype.delete = Lt, Stack.prototype.get = Ut, Stack.prototype.has = qt, Stack.prototype.set = Dt;
      var Bt = Stack, Ht = function() {
        try {
          var e2 = q(Object, "defineProperty");
          return e2({}, "", {}), e2;
        } catch (e3) {
        }
      }();
      var $t = function baseAssignValue(e2, t2, r2) {
        "__proto__" == t2 && Ht ? Ht(e2, t2, { configurable: true, enumerable: true, value: r2, writable: true }) : e2[t2] = r2;
      };
      var zt = function assignMergeValue(e2, t2, r2) {
        (void 0 !== r2 && !Y(e2[t2], r2) || void 0 === r2 && !(t2 in e2)) && $t(e2, t2, r2);
      }, Vt = createCommonjsModule(function(e2, t2) {
        var r2 = t2 && !t2.nodeType && t2, s2 = r2 && e2 && !e2.nodeType && e2, i2 = s2 && s2.exports === r2 ? o.Buffer : void 0, n2 = i2 ? i2.allocUnsafe : void 0;
        e2.exports = function cloneBuffer(e3, t3) {
          if (t3)
            return e3.slice();
          var r3 = e3.length, s3 = n2 ? n2(r3) : new e3.constructor(r3);
          return e3.copy(s3), s3;
        };
      }), Gt = o.Uint8Array;
      var Kt = function cloneArrayBuffer(e2) {
        var t2 = new e2.constructor(e2.byteLength);
        return new Gt(t2).set(new Gt(e2)), t2;
      };
      var Wt = function cloneTypedArray(e2, t2) {
        var r2 = t2 ? Kt(e2.buffer) : e2.buffer;
        return new e2.constructor(r2, e2.byteOffset, e2.length);
      };
      var Jt = function copyArray(e2, t2) {
        var r2 = -1, s2 = e2.length;
        for (t2 || (t2 = Array(s2)); ++r2 < s2; )
          t2[r2] = e2[r2];
        return t2;
      }, Yt = Object.create, Qt = function() {
        function object() {
        }
        return function(e2) {
          if (!b(e2))
            return {};
          if (Yt)
            return Yt(e2);
          object.prototype = e2;
          var t2 = new object();
          return object.prototype = void 0, t2;
        };
      }();
      var Xt = function initCloneObject(e2) {
        return "function" != typeof e2.constructor || Tt(e2) ? {} : Qt(De(e2));
      };
      var Zt = function isArrayLikeObject(e2) {
        return f(e2) && Ct(e2);
      };
      var er = function safeGet(e2, t2) {
        if (("constructor" !== t2 || "function" != typeof e2[t2]) && "__proto__" != t2)
          return e2[t2];
      }, tr = Object.prototype.hasOwnProperty;
      var rr = function assignValue(e2, t2, r2) {
        var s2 = e2[t2];
        tr.call(e2, t2) && Y(s2, r2) && (void 0 !== r2 || t2 in e2) || $t(e2, t2, r2);
      };
      var sr = function copyObject(e2, t2, r2, s2) {
        var i2 = !r2;
        r2 || (r2 = {});
        for (var n2 = -1, o2 = t2.length; ++n2 < o2; ) {
          var a2 = t2[n2], c2 = s2 ? s2(r2[a2], e2[a2], a2, r2, e2) : void 0;
          void 0 === c2 && (c2 = e2[a2]), i2 ? $t(r2, a2, c2) : rr(r2, a2, c2);
        }
        return r2;
      };
      var ir = function nativeKeysIn(e2) {
        var t2 = [];
        if (null != e2)
          for (var r2 in Object(e2))
            t2.push(r2);
        return t2;
      }, nr = Object.prototype.hasOwnProperty;
      var or = function baseKeysIn(e2) {
        if (!b(e2))
          return ir(e2);
        var t2 = Tt(e2), r2 = [];
        for (var s2 in e2)
          ("constructor" != s2 || !t2 && nr.call(e2, s2)) && r2.push(s2);
        return r2;
      };
      var ar = function keysIn(e2) {
        return Ct(e2) ? vt(e2, true) : or(e2);
      };
      var cr = function toPlainObject(e2) {
        return sr(e2, ar(e2));
      };
      var dr = function baseMergeDeep(e2, t2, r2, i2, n2, o2, a2) {
        var c2 = er(e2, r2), d2 = er(t2, r2), m2 = a2.get(d2);
        if (m2)
          zt(e2, r2, m2);
        else {
          var l2 = o2 ? o2(c2, d2, r2 + "", e2, t2, a2) : void 0, p2 = void 0 === l2;
          if (p2) {
            var u2 = s(d2), g2 = !u2 && at(d2), y2 = !u2 && !g2 && ht(d2);
            l2 = d2, u2 || g2 || y2 ? s(c2) ? l2 = c2 : Zt(c2) ? l2 = Jt(c2) : g2 ? (p2 = false, l2 = Vt(d2, true)) : y2 ? (p2 = false, l2 = Wt(d2, true)) : l2 = [] : Ge(d2) || nt(d2) ? (l2 = c2, nt(c2) ? l2 = cr(c2) : b(c2) && !C(c2) || (l2 = Xt(d2))) : p2 = false;
          }
          p2 && (a2.set(d2, l2), n2(l2, d2, i2, o2, a2), a2.delete(d2)), zt(e2, r2, l2);
        }
      };
      var mr = function baseMerge(e2, t2, r2, s2, i2) {
        e2 !== t2 && Qe(t2, function(n2, o2) {
          if (i2 || (i2 = new Bt()), b(n2))
            dr(e2, t2, o2, r2, baseMerge, s2, i2);
          else {
            var a2 = s2 ? s2(er(e2, o2), n2, o2 + "", e2, t2, i2) : void 0;
            void 0 === a2 && (a2 = n2), zt(e2, o2, a2);
          }
        }, ar);
      };
      var lr = function apply(e2, t2, r2) {
        switch (r2.length) {
          case 0:
            return e2.call(t2);
          case 1:
            return e2.call(t2, r2[0]);
          case 2:
            return e2.call(t2, r2[0], r2[1]);
          case 3:
            return e2.call(t2, r2[0], r2[1], r2[2]);
        }
        return e2.apply(t2, r2);
      }, pr = Math.max;
      var ur = function overRest(e2, t2, r2) {
        return t2 = pr(void 0 === t2 ? e2.length - 1 : t2, 0), function() {
          for (var s2 = arguments, i2 = -1, n2 = pr(s2.length - t2, 0), o2 = Array(n2); ++i2 < n2; )
            o2[i2] = s2[t2 + i2];
          i2 = -1;
          for (var a2 = Array(t2 + 1); ++i2 < t2; )
            a2[i2] = s2[i2];
          return a2[t2] = r2(o2), lr(e2, this, a2);
        };
      }, gr = Ht ? function(e2, t2) {
        return Ht(e2, "toString", { configurable: true, enumerable: false, value: Ye(t2), writable: true });
      } : Pt, yr = Date.now;
      var hr = function shortOut(e2) {
        var t2 = 0, r2 = 0;
        return function() {
          var s2 = yr(), i2 = 16 - (s2 - r2);
          if (r2 = s2, i2 > 0) {
            if (++t2 >= 800)
              return arguments[0];
          } else
            t2 = 0;
          return e2.apply(void 0, arguments);
        };
      }, fr = hr(gr);
      var vr = function baseRest(e2, t2) {
        return fr(ur(e2, t2, Pt), e2 + "");
      };
      var Sr = function isIterateeCall(e2, t2, r2) {
        if (!b(r2))
          return false;
        var s2 = typeof t2;
        return !!("number" == s2 ? Ct(r2) && dt(t2, r2.length) : "string" == s2 && t2 in r2) && Y(r2[t2], e2);
      };
      var Tr, Mr = function createAssigner(e2) {
        return vr(function(t2, r2) {
          var s2 = -1, i2 = r2.length, n2 = i2 > 1 ? r2[i2 - 1] : void 0, o2 = i2 > 2 ? r2[2] : void 0;
          for (n2 = e2.length > 3 && "function" == typeof n2 ? (i2--, n2) : void 0, o2 && Sr(r2[0], r2[1], o2) && (n2 = i2 < 3 ? void 0 : n2, i2 = 1), t2 = Object(t2); ++s2 < i2; ) {
            var a2 = r2[s2];
            a2 && e2(t2, a2, s2, n2);
          }
          return t2;
        });
      }, br = Mr(function(e2, t2, r2) {
        mr(e2, t2, r2);
      });
      !function(e2) {
        e2[e2.kStatNetTypeUnkonw = 0] = "kStatNetTypeUnkonw", e2[e2.kStatNetTypeEthernet = 1] = "kStatNetTypeEthernet", e2[e2.kStatNetTypeWifi = 2] = "kStatNetTypeWifi", e2[e2.kStatNetType2G = 3] = "kStatNetType2G", e2[e2.kStatNetType3G = 4] = "kStatNetType3G", e2[e2.kStatNetType4G = 5] = "kStatNetType4G", e2[e2.kStatNetType5G = 6] = "kStatNetType5G";
      }(Tr || (Tr = {}));
      const kr = { wifi: Tr.kStatNetTypeWifi, "2g": Tr.kStatNetType2G, "3g": Tr.kStatNetType3G, "4g": Tr.kStatNetType4G, "5g": Tr.kStatNetType5G, ethernet: Tr.kStatNetTypeEthernet, unknown: Tr.kStatNetTypeUnkonw, none: Tr.kStatNetTypeUnkonw, notreachable: Tr.kStatNetTypeUnkonw, wwan: Tr.kStatNetTypeUnkonw };
      const Cr = { setLogger: function(e2) {
        throw new Error("Function not implemented.");
      }, platform: "", WebSocket: class AdapterSocket {
        constructor(e2, t2) {
          throw this.CONNECTING = 0, this.OPEN = 1, this.CLOSING = 2, this.CLOSED = 3, new Error("Method not implemented.");
        }
        close(e2, t2) {
          throw new Error("Method not implemented.");
        }
        send(e2) {
          throw new Error("Method not implemented.");
        }
        onclose(e2) {
          throw new Error("Method not implemented.");
        }
        onerror(e2) {
          throw new Error("Method not implemented.");
        }
        onmessage(e2) {
          throw new Error("Method not implemented.");
        }
        onopen(e2) {
          throw new Error("Method not implemented.");
        }
      }, localStorage: {}, request: function(e2, t2) {
        throw new Error("Function not implemented.");
      }, uploadFile: function(e2) {
        throw new Error("Function not implemented.");
      }, getSystemInfo: function() {
        throw new Error("Function not implemented.");
      }, net: { __getEnv: () => null, __onNetworkStatusChangeFn: null, getNetworkStatus() {
        const e2 = this.__getEnv();
        return new Promise((t2, r2) => {
          e2.getNetworkType({ success: function(e3) {
            let r3 = false;
            r3 = "boolean" == typeof e3.networkAvailable ? e3.networkAvailable : "none" !== e3.networkType.toLowerCase(), t2({ net_type: kr[e3.networkType.toLowerCase()], net_connect: r3 });
          }, fail: function() {
            r2(new Error("getNetworkType failed"));
          } });
        });
      }, onNetworkStatusChange(e2) {
        const t2 = this.__getEnv();
        this.offNetworkStatusChange(), t2.onNetworkStatusChange && (this.__onNetworkStatusChangeFn = function(t3) {
          const r2 = t3.networkType.toLowerCase();
          e2({ isConnected: t3.isConnected || "none" !== r2, networkType: kr[r2] });
        }, t2.onNetworkStatusChange(this.__onNetworkStatusChangeFn));
      }, offNetworkStatusChange() {
        const e2 = this.__getEnv();
        e2.offNetworkStatusChange && (this.__onNetworkStatusChangeFn && e2.offNetworkStatusChange(this.__onNetworkStatusChangeFn), this.__onNetworkStatusChangeFn = null);
      } } };
      var Ir = Backoff;
      function Backoff(e2) {
        e2 = e2 || {}, this.ms = e2.min || 100, this.max = e2.max || 1e4, this.factor = e2.factor || 2, this.jitter = e2.jitter > 0 && e2.jitter <= 1 ? e2.jitter : 0, this.attempts = 0;
      }
      Backoff.prototype.duration = function() {
        var e2 = this.ms * Math.pow(this.factor, this.attempts++);
        if (this.jitter) {
          var t2 = Math.random(), r2 = Math.floor(t2 * this.jitter * e2);
          e2 = 0 == (1 & Math.floor(10 * t2)) ? e2 - r2 : e2 + r2;
        }
        return 0 | Math.min(e2, this.max);
      }, Backoff.prototype.reset = function() {
        this.attempts = 0;
      }, Backoff.prototype.setMin = function(e2) {
        this.ms = e2;
      }, Backoff.prototype.setMax = function(e2) {
        this.max = e2;
      }, Backoff.prototype.setJitter = function(e2) {
        this.jitter = e2;
      };
      var wr = function setCacheAdd(e2) {
        return this.__data__.set(e2, "__lodash_hash_undefined__"), this;
      };
      var _r = function setCacheHas(e2) {
        return this.__data__.has(e2);
      };
      function SetCache(e2) {
        var t2 = -1, r2 = null == e2 ? 0 : e2.length;
        for (this.__data__ = new pe(); ++t2 < r2; )
          this.add(e2[t2]);
      }
      SetCache.prototype.add = SetCache.prototype.push = wr, SetCache.prototype.has = _r;
      var Er = SetCache;
      var Pr = function baseFindIndex(e2, t2, r2, s2) {
        for (var i2 = e2.length, n2 = r2 + (s2 ? 1 : -1); s2 ? n2-- : ++n2 < i2; )
          if (t2(e2[n2], n2, e2))
            return n2;
        return -1;
      };
      var Ar = function baseIsNaN(e2) {
        return e2 != e2;
      };
      var xr = function strictIndexOf(e2, t2, r2) {
        for (var s2 = r2 - 1, i2 = e2.length; ++s2 < i2; )
          if (e2[s2] === t2)
            return s2;
        return -1;
      };
      var jr = function baseIndexOf(e2, t2, r2) {
        return t2 == t2 ? xr(e2, t2, r2) : Pr(e2, Ar, r2);
      };
      var Or = function arrayIncludes(e2, t2) {
        return !!(null == e2 ? 0 : e2.length) && jr(e2, t2, 0) > -1;
      };
      var Rr = function arrayIncludesWith(e2, t2, r2) {
        for (var s2 = -1, i2 = null == e2 ? 0 : e2.length; ++s2 < i2; )
          if (r2(t2, e2[s2]))
            return true;
        return false;
      };
      var Fr = function cacheHas(e2, t2) {
        return e2.has(t2);
      }, Nr = q(o, "Set");
      var Lr = function noop() {
      };
      var Ur = function setToArray(e2) {
        var t2 = -1, r2 = Array(e2.size);
        return e2.forEach(function(e3) {
          r2[++t2] = e3;
        }), r2;
      }, qr = Nr && 1 / Ur(new Nr([, -0]))[1] == 1 / 0 ? function(e2) {
        return new Nr(e2);
      } : Lr;
      var Dr = function baseUniq(e2, t2, r2) {
        var s2 = -1, i2 = Or, n2 = e2.length, o2 = true, a2 = [], c2 = a2;
        if (r2)
          o2 = false, i2 = Rr;
        else if (n2 >= 200) {
          var d2 = t2 ? null : qr(e2);
          if (d2)
            return Ur(d2);
          o2 = false, i2 = Fr, c2 = new Er();
        } else
          c2 = t2 ? [] : a2;
        e:
          for (; ++s2 < n2; ) {
            var m2 = e2[s2], l2 = t2 ? t2(m2) : m2;
            if (m2 = r2 || 0 !== m2 ? m2 : 0, o2 && l2 == l2) {
              for (var p2 = c2.length; p2--; )
                if (c2[p2] === l2)
                  continue e;
              t2 && c2.push(l2), a2.push(m2);
            } else
              i2(c2, l2, r2) || (c2 !== a2 && c2.push(l2), a2.push(m2));
          }
        return a2;
      };
      var Br = function uniq(e2) {
        return e2 && e2.length ? Dr(e2) : [];
      };
      const Hr = ["disconnect", "connect", "heartbeat", "message", "json", "event", "ack", "error", "noop"], $r = ["transport not supported", "client not handshaken", "unauthorized"], zr = ["reconnect"];
      class BaseWebsocket extends t {
        constructor(e2, t2) {
          super(), this.url = t2, this.websocket = null, this.socketConnectTimer = 0, this.core = e2, this.url = t2, this.status = "disconnected", this.logger = e2.logger, this.connect();
        }
        connect() {
          "connecting" !== this.status && "connected" !== this.status ? (this.status = "connecting", this.core.adapters.request("https://" + this.url + "/socket.io/1/?t=" + Date.now(), { method: "GET", dataType: "text", timeout: this.core.options.xhrConnectTimeout || 8e3 }, { exception_service: 6 }).then((e2) => {
            const [t2, r2] = e2.data.split(":");
            return this.sessionId = t2, this.closeTimeout = 1e3 * r2, this._createWebsocket("wss://" + this.url + "/socket.io/1/websocket/" + t2);
          }).catch((e2) => {
            e2 = e2 || {}, this.logger.error("imsocket::handshake fail. message: ", e2 && e2.message, " err code: ", e2 && e2.code), e2.code = 408 === e2.code ? 408 : 415, this.status = "disconnected", this.emit("handshakeFailed", e2);
          })) : this.logger.warn("imsocket::socket is connecting or connected", this.status);
        }
        close() {
          if (this.websocket) {
            this.logger.log("imsocket:: close websocket");
            try {
              this.websocket.send(this.encodePacket({ type: "disconnect" }));
            } catch (e2) {
              this.logger.warn("attempt to send encodePacket error", e2);
            }
            try {
              this.websocket.close();
            } catch (e2) {
              this.logger.warn("attempt to close websocket error", e2);
            }
            this.clean();
          }
        }
        clean() {
          this.status = "disconnected", this.websocket && (this.socketUrl = void 0, this.websocket.onmessage = null, this.websocket.onopen = null, this.websocket.onerror = null, this.websocket.onclose = null, this.websocket = null, this.emit("disconnect"));
        }
        onConnect() {
          this.status = "connected", this.resetCloseTimer(), this.emit("connect"), clearTimeout(this.socketConnectTimer);
        }
        _createWebsocket(e2) {
          this.socketConnectTimer = setTimeout(() => {
            this.logger.error("core:: socket connect timeout. url: ", this.socketUrl), this.emit("handshakeFailed", new CustomError("BaseWebsocket::_createWebSocket socket connect timeout. url: " + this.socketUrl, {}, 408));
          }, this.core.options.socketConnectTimeout || 8e3), this.socketUrl = e2, this.websocket = new Cr.WebSocket(e2), this.websocket.onmessage = this.onMessage.bind(this), this.websocket.onclose = () => {
            this.logger.log("imsocket:: websocket onclose done"), this.clean();
          }, this.websocket.onerror = (e3) => {
            this.logger.error("imsocket:: onerror", e3), "logined" === this.core.status && this.core.clientSocket.ping();
          };
        }
        onMessage(e2) {
          var t2;
          this.resetCloseTimer();
          const r2 = this.decodePacket(e2.data);
          if (r2)
            switch (r2.type) {
              case "connect":
                this.onConnect();
                break;
              case "disconnect":
                this.close();
                break;
              case "message":
              case "json":
                this.emit("message", r2.data);
                break;
              case "event":
                r2.name && this.emit(r2.name, r2.args);
                break;
              case "error":
                "unauthorized" === r2.reason ? this.emit("connect_failed", r2.reason) : this.emit("error", r2.reason), this.logger.error("core:: socket onmessage type error. url: ", this.socketUrl), clearTimeout(this.socketConnectTimer), this.emit("handshakeFailed", new CustomError("BaseWebsocket::onMessage socket error. url: " + this.socketUrl, {}, 415));
                break;
              case "heartbeat":
                null === (t2 = this.websocket) || void 0 === t2 || t2.send(this.encodePacket({ type: "heartbeat" }));
                break;
              default:
                this.logger.warn("imsocket::no handler type", r2.type);
            }
        }
        encodePacket(e2) {
          const { type: t2, id: r2 = "", endpoint: s2 = "", ack: i2 } = e2;
          let n2, o2, a2 = null;
          if (!t2)
            return "";
          switch (t2) {
            case "error":
              n2 = e2.reason ? $r.indexOf(e2.reason) : "", o2 = e2.advice ? zr.indexOf(e2.advice) : "", "" === n2 && "" === o2 || (a2 = n2 + ("" !== o2 ? "+" + o2 : ""));
              break;
            case "message":
              "" !== e2.data && (a2 = e2.data);
              break;
            case "event":
              n2 = { name: e2.name }, n2 = e2.args && e2.args.length ? { name: e2.name, args: e2.args } : { name: e2.name }, a2 = JSON.stringify(n2);
              break;
            case "json":
              a2 = JSON.stringify(e2.data);
              break;
            case "connect":
              e2.qs && (a2 = e2.qs);
              break;
            case "ack":
              a2 = e2.ackId + (e2.args && e2.args.length ? "+" + JSON.stringify(e2.args) : "");
          }
          const c2 = [Hr.indexOf(t2), r2 + ("data" === i2 ? "+" : ""), s2];
          return null != a2 && c2.push(a2), c2.join(":");
        }
        decodePacket(e2) {
          if (!e2)
            return;
          if ("�" == e2.charAt(0))
            return void this.logger.error("imsocket::unrecognize dataStr", e2.slice(0, 20));
          const t2 = e2.match(/([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/);
          if (!t2)
            return;
          const [, r2, s2, i2, n2, o2] = t2, a2 = { type: Hr[+r2], endpoint: n2 };
          let c2;
          switch (s2 && (a2.id = s2, a2.ack = !i2 || "data"), a2.type) {
            case "error":
              c2 = o2.split("+"), a2.reason = $r[+c2[0]] || "";
              break;
            case "message":
              a2.data = o2 || "";
              break;
            case "connect":
              a2.qs = o2 || "";
              break;
            case "event":
              try {
                const e3 = JSON.parse(o2);
                a2.name = e3.name, a2.args = e3.args;
              } catch (e3) {
                this.logger.error("imsocket::parseData::type::event error", e3);
              }
              a2.args = a2.args || [];
              break;
            case "json":
              try {
                a2.data = JSON.parse(o2);
              } catch (e3) {
                this.logger.error("imsocket::parseData::type::json error", e3);
              }
              break;
            case "ack":
              if (c2 = o2.match(/^([0-9]+)(\+)?(.*)/), c2 && (a2.ackId = c2[1], a2.args = [], c2[3]))
                try {
                  a2.args = c2[3] ? JSON.parse(c2[3]) : [];
                } catch (e3) {
                  this.logger.error("imsocket::parseData::type::ack error", e3);
                }
          }
          return a2;
        }
        send(e2) {
          var t2;
          const r2 = { data: e2, type: "message", endpoint: "" };
          null === (t2 = this.websocket) || void 0 === t2 || t2.send(this.encodePacket(r2));
        }
        resetCloseTimer() {
          this.closeTimeout && (clearTimeout(this.closeTimer), this.closeTimer = setTimeout(() => {
            this.close();
          }, this.closeTimeout));
        }
      }
      var Vr = function baseIsRegExp(e2) {
        return f(e2) && "[object RegExp]" == h(e2);
      }, Gr = gt && gt.isRegExp, Kr = Gr ? ut(Gr) : Vr;
      var Wr = function baseDifference(e2, t2, r2, s2) {
        var i2 = -1, n2 = Or, o2 = true, a2 = e2.length, c2 = [], d2 = t2.length;
        if (!a2)
          return c2;
        r2 && (t2 = fe(t2, ut(r2))), s2 ? (n2 = Rr, o2 = false) : t2.length >= 200 && (n2 = Fr, o2 = false, t2 = new Er(t2));
        e:
          for (; ++i2 < a2; ) {
            var m2 = e2[i2], l2 = null == r2 ? m2 : r2(m2);
            if (m2 = s2 || 0 !== m2 ? m2 : 0, o2 && l2 == l2) {
              for (var p2 = d2; p2--; )
                if (t2[p2] === l2)
                  continue e;
              c2.push(m2);
            } else
              n2(t2, l2, s2) || c2.push(m2);
          }
        return c2;
      }, Jr = vr(function(e2, t2) {
        return Zt(e2) ? Wr(e2, t2) : [];
      });
      function replacer(e2, t2) {
        return t2 instanceof RegExp ? "__REGEXP " + t2.toString() : t2;
      }
      function validate(e2, t2 = {}, r2) {
        const s2 = {};
        return Object.keys(e2).forEach((i2) => {
          const n2 = e2[i2].type, o2 = r2 ? `In ${r2}, ` : "";
          if (void 0 === t2[i2]) {
            if (false === e2[i2].required)
              return void (s2[i2] = t2[i2]);
            throw new ValidateError(`${o2}param "${i2}" is required`, { key: i2 }, "required");
          }
          const a2 = Yr[n2];
          if (a2 && !a2(t2, i2, e2[i2]))
            throw new ValidateError(`${o2}param "${i2}" expects ${JSON.stringify(e2[i2], replacer)}`, { key: i2, value: t2[i2] }, JSON.stringify(e2[i2]));
          s2[i2] = t2[i2];
        }), s2;
      }
      const Yr = { string: function(e2, t2, r2) {
        const { allowEmpty: s2, max: i2, min: n2, regExp: o2 } = r2, a2 = e2[t2];
        return "string" == typeof a2 && ((false !== s2 || "" !== a2) && (!("number" == typeof i2 && a2.length > i2) && (!("number" == typeof n2 && a2.length < n2) && !(Kr(o2) && !o2.test(a2)))));
      }, number: function(e2, t2, r2) {
        const { min: s2, max: i2 } = r2, n2 = e2[t2];
        return "number" == typeof n2 && (!("number" == typeof s2 && n2 < s2) && !("number" == typeof i2 && n2 > i2));
      }, boolean: function(e2, t2) {
        return "boolean" == typeof e2[t2];
      }, enum: function(e2, t2, r2) {
        const { values: s2 } = r2, i2 = e2[t2];
        return !s2 || s2.indexOf(i2) > -1;
      }, array: function(e2, t2, r2) {
        const { itemType: s2, rules: i2, min: n2, max: o2, values: a2 } = r2, c2 = e2[t2];
        return !!Array.isArray(c2) && (!("number" == typeof o2 && c2.length > o2) && (!("number" == typeof n2 && c2.length < n2) && (!(s2 && "enum" !== s2 && !c2.every((e3) => typeof e3 === s2)) && (("enum" !== s2 || !a2 || !Jr(c2, ...a2).length) && (i2 && c2.forEach((e3, r3) => validate(i2, e3, `${t2}[${r3}]`)), true)))));
      }, object: function(e2, t2, r2) {
        const { rules: s2 } = r2, i2 = e2[t2];
        return s2 && validate(s2, i2, t2), true;
      } }, Qr = "weblink.netease.im:443";
      var Xr;
      !function(e2) {
        e2[e2.ACTIVE = 1] = "ACTIVE", e2[e2.KICKED = 2] = "KICKED", e2[e2.OFFLINE = 3] = "OFFLINE";
      }(Xr || (Xr = {}));
      class ClientSocket {
        constructor(e2) {
          this.linkUrls = [], this.isAutoReconnect = false, this.packetTimeout = 3e4, this.packetSer = 1, this.retryCount = 0, this.reconnectTimer = 0, this.backoff = new Ir({ max: 8e3, min: 1600, jitter: 0.01 }), this.sendingCmdMap = /* @__PURE__ */ new Map(), this.pingTimer = 0, this.hasNetworkListener = false, this.core = e2, this.logger = e2.logger, this.reporter = e2.reporter, this.timerManager = e2.timerManager;
        }
        connect(e2 = {}, t2) {
          return __awaiter(this, void 0, void 0, function* () {
            if (validate({ linkUrls: { type: "array", itemType: "string", required: false } }, e2), !/^(unconnected|waitReconnect)$/.test(this.core.status)) {
              const e3 = `Core socket status is ${this.core.status}, and would not connect`;
              return this.logger.warn(e3), Promise.reject(e3);
            }
            this.core.status = "connecting", e2.linkUrls && e2.linkUrls.length > 0 && (this.linkUrls = e2.linkUrls.concat(this.linkUrls), this.linkUrls = Br(this.linkUrls)), 0 === this.linkUrls.length && this.linkUrls.push(Qr);
            for (let e3 = 0; e3 < this.linkUrls.length; e3++) {
              const r2 = this.linkUrls[e3], s2 = new Date().getTime();
              try {
                return yield this.doConnect(r2), this.core.status = "connected", this.logger.log(`core:: connect success with url: ${r2}`), r2;
              } catch (e4) {
                const i2 = e4;
                t2 && t2(i2, r2), this.reporter.reportTraceStart("exceptions", { user_id: this.core.options.account, start_time: s2, action: 0, exception_service: 6 }), this.reporter.reportTraceUpdateV2("exceptions", { code: "number" == typeof i2.code ? i2.code : 0, description: i2.message || `${i2.code}`, operation_type: 0, target: r2 }, { asyncParams: Cr.net.getNetworkStatus() }), this.reporter.reportTraceEnd("exceptions", 1), this.logger.warn(`core:: connect failed with url: ${r2}`, e4);
              }
            }
            throw 0 === this.retryCount ? this.doDisconnect(Xr.ACTIVE, "SocketHandshakeFailed") : this.doDisconnect(Xr.OFFLINE, "ReconnectHadRetryAllLinks"), new Error("core: socket xhr or socket connect failed");
          });
        }
        doConnect(e2) {
          let t2 = false;
          return new Promise((r2, s2) => {
            this.socket = new BaseWebsocket(this.core, e2), this.socket.on("connect", () => {
              this.logger.log("socket on connect", e2), t2 = true, r2();
            }), this.socket.on("message", this.onMessage.bind(this)), this.socket.on("disconnect", (e3) => {
              this.logger.log("core:: socket on disconnect", e3), t2 = true, this.doDisconnect(Xr.OFFLINE, "SocketOnDisconnect");
            }), this.socket.on("handshakeFailed", (e3) => {
              t2 ? this.ping() : (this.logger.error("core:: handshake failed. ", e3 && e3.message), this.cleanSocket()), t2 = true, s2(e3);
            });
          });
        }
        cleanSocket() {
          this.socket && ("function" == typeof this.socket.removeAllListeners && this.socket.removeAllListeners(), "function" == typeof this.socket.close && this.socket.close(), this.socket = void 0);
        }
        beforeConnect() {
          this.reconnectTimer && clearTimeout(this.reconnectTimer);
        }
        resetConnectStatus() {
          clearTimeout(this.reconnectTimer), this.backoff.reset(), this.retryCount = 0, this.initOnlineListener();
        }
        doDisconnect(e2, t2) {
          if (this.logger.log(`doDisconnect: type ${e2}, description ${t2}`), "unconnected" === this.core.status)
            return void this.logger.warn("doDisconnect: already unconnected");
          const r2 = { 1: "close", 2: "kicked", 3: "broken" }[e2] || "";
          this.markAllCmdInvaild(new CustomError("Packet timeout due to instance disconnect", { disconnect_reason: r2 }, 415)), this.timerManager.destroy(), clearTimeout(this.pingTimer), this.cleanSocket();
          const s2 = !this.core.options.needReconnect || this.retryCount >= this.core.options.reconnectionAttempts;
          if (e2 === Xr.ACTIVE || s2)
            this.logger.log("doDisconnect: emit disconnect, type " + e2, s2), this.core.status = "unconnected", this.reconnectTimer && clearTimeout(this.reconnectTimer), this.core.eventBus.emit("disconnect"), this.core.emit("disconnect"), this.destroyOnlineListener();
          else if (e2 === Xr.KICKED) {
            this.logger.log("doDisconnect: kicked"), this.core.status = "unconnected", this.reconnectTimer && clearTimeout(this.reconnectTimer);
            const e3 = "string" == typeof t2 ? { reason: "unknow", message: t2 } : t2;
            this.core.eventBus.emit("kicked", e3), this.core.emit("kicked", e3), this.destroyOnlineListener();
          } else
            e2 === Xr.OFFLINE && this.core.auth.isManualLoginAttempt ? (this.logger.log("doDisconnect: offline in manual login phase. no reconnect"), this.core.status = "unconnected", this.reconnectTimer && clearTimeout(this.reconnectTimer), this.destroyOnlineListener()) : e2 === Xr.OFFLINE ? (this.logger.log("doDisconnect: start to reconnect"), this.attempToReconnect()) : this.logger.log("doDisconnect: nothing to do");
        }
        attempToReconnect() {
          if ("waitReconnect" === this.core.status)
            return void this.logger.warn("doDisconnect: already is waiting reconnect");
          0 === this.retryCount && (this.core.eventBus.emit("disconnect"), this.core.emit("disconnect"));
          const e2 = this.backoff.duration();
          this.retryCount++, this.logger.log(`willReconnect ${this.retryCount} ${e2}`), this.core.eventBus.emit("willReconnect", { retryCount: this.retryCount, duration: e2 }), this.core.emit("willReconnect", { retryCount: this.retryCount, duration: e2 }), this.core.status = "waitReconnect", this.reconnectTimer && clearTimeout(this.reconnectTimer), this.reconnectTimer = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            if ("waitReconnect" !== this.core.status)
              return void this.logger.warn(`doDisconnect: reconnectTimer status is ${this.core.status}, would not go on reconnecting`);
            false === (yield Cr.net.getNetworkStatus()).net_connect ? (this.logger.log("doDisconnect: skip this reconnection attempt because network is offline"), this.core.status = "connecting", this.retryCount >= this.core.options.reconnectionAttempts ? this.doDisconnect(Xr.OFFLINE, "MaxReconnectionAttemptExceed") : this.attempToReconnect()) : this.core.auth.login({ isAutoReconnect: true }).catch(() => {
              this.logger.error(`core::attempToReconnect failed ${this.retryCount}`);
            });
          }), e2);
        }
        sendCmd(e2, t2, r2) {
          if ("logined" !== this.core.status && "login" !== e2 && "chatroomLogin" !== e2 && "qchatLogin" !== e2)
            return this.logger.warn(`instance status is ${this.core.status}, so can not sendCmd ${e2}`), Promise.reject({ cmd: e2, error: { code: "No_connected", message: "Connection not established", timetag: new Date().getTime() } });
          if (!this.socket || !this.socket.send)
            return Promise.reject("No_socket");
          const s2 = "heartbeat" !== e2, i2 = s2 ? this.packetSer++ : 0, n2 = function createCmd(e3, t3, r3, s3) {
            const i3 = Ee[e3];
            if (!i3)
              return r3.error("createCmd:: can not find cmd config: ", e3), null;
            const n3 = { SER: t3, SID: i3.sid, CID: i3.cid, Q: [] };
            return i3.params && s3 && i3.params.forEach(function(e4) {
              let t4 = s3[e4.name];
              if (we(t4))
                return;
              let r4 = e4.type;
              const { reflectMapper: i4 } = e4;
              switch (e4.type) {
                case "PropertyArray":
                  r4 = "ArrayMable", t4 = t4.map((e5) => ({ t: "Property", v: i4 ? serialize(e5, i4) : e5 }));
                  break;
                case "Property":
                  t4 = i4 ? serialize(t4, i4) : t4;
                  break;
                case "Bool":
                case "bool":
                  t4 = t4 ? "true" : "false";
              }
              n3.Q.push({ t: r4, v: t4 });
            }), { packet: n3, hasPacketResponse: "boolean" != typeof i3.hasPacketResponse || i3.hasPacketResponse, hasPacketTimer: "boolean" != typeof i3.hasPacketTimer || i3.hasPacketTimer };
          }(e2, i2, this.logger, t2);
          if (!n2) {
            const t3 = `SendCmd ${i2} ${e2} error`;
            return this.logger.error(t3), Promise.reject(t3);
          }
          const { packet: o2, hasPacketResponse: a2, hasPacketTimer: c2 } = n2, d2 = JSON.stringify(o2);
          s2 && ("debug" === this.core.options.debugLevel ? this.logger.debug("core::sendCmd", e2, `ser:${i2}`, d2) : this.logger.log("core::sendCmd", e2, `ser:${i2}`));
          const m2 = new Date().getTime();
          return new Promise((s3, n3) => {
            a2 && this.sendingCmdMap.set(i2, { cmd: e2, params: t2, callback: [s3, n3], timer: c2 ? setTimeout(() => {
              const t3 = new CmdError(408, e2, "Packet Timeout", new Date().getTime(), { message: `ser ${i2} cmd ${e2} timeout` });
              t3.callFunc = "sendCmd", this.markCmdInvalid(i2, t3, e2);
            }, r2 && r2.timeout ? r2.timeout : this.core.config.timeout) : null });
            try {
              this.socket.send(d2), a2 || s3(o2);
            } catch (t3) {
              const r3 = new CmdError(415, e2, t3 && t3.message || "Unable to send packet", new Date().getTime(), { message: "send json error", rawError: t3 });
              r3.callFunc = "sendCmd", this.markCmdInvalid(i2, r3, e2), n3(t3);
            }
          }).catch((e3) => {
            var t3;
            if (![408, 415].includes(e3.code))
              return Promise.reject(e3);
            this.reporter.reportTraceStart("exceptions", { user_id: this.core.options.account, trace_id: null === (t3 = this.socket) || void 0 === t3 ? void 0 : t3.sessionId, start_time: m2, action: 2, exception_service: 6 });
            const r3 = Ie(e3, "data.disconnect_reason") || "";
            let s3 = 408 === e3.code ? "Send failed due to timeout" : "Send failed. Reason unknown";
            return s3 = 415 === e3.code ? JSON.stringify({ disconnect_reason: r3 }) : s3, this.reporter.reportTraceUpdateV2("exceptions", { code: e3.code || 415, description: s3, operation_type: 1, target: `${o2.SID}-${o2.CID}`, context: `${o2.SER}` }, { asyncParams: Cr.net.getNetworkStatus() }), this.reporter.reportTraceEnd("exceptions", 1), Promise.reject(e3);
          });
        }
        onMessage(e2) {
          const t2 = parseCmd(e2, this.logger);
          if (!t2)
            return;
          const r2 = t2.raw.ser;
          t2.error && this.logger.error("core:onMessage packet error", `${t2.raw.sid}_${t2.raw.cid}, ser:${r2},`, t2.error), t2.notFound ? this.logger.warn("core::onMessage packet not found", `${t2.raw.sid}_${t2.raw.cid}, ser:${r2}`) : ("heartbeat" !== t2.cmd && ("debug" === this.core.options.debugLevel ? this.logger.debug(`imsocket::recvCmd ser:${r2}`, t2.cmd, t2.content) : this.logger.log(`imsocket::recvCmd ser:${r2}`, t2.cmd)), t2.__receiveTime = Date.now(), this.packetHandler(t2));
        }
        packetHandler(e2) {
          var t2, r2;
          if (!e2)
            return;
          const s2 = e2.raw.ser, i2 = this.sendingCmdMap.get(s2);
          if (i2 && i2.cmd === e2.cmd) {
            const { callback: r3, timer: n2, params: o2 } = i2;
            if (clearTimeout(n2), e2.params = o2, this.sendingCmdMap.delete(s2), "heartbeat" === e2.cmd)
              return void r3[0]();
            const a2 = null === (t2 = this.core[e2.service]) || void 0 === t2 ? void 0 : t2.process(e2);
            a2 && "function" == typeof a2.then ? a2.then((e3) => {
              r3[0](e3);
            }).catch((e3) => {
              r3[1](e3);
            }) : (this.logger.log("imsocket:: handlerFn without promise", e2.service, e2.cmd), r3[0]());
          } else
            null === (r2 = this.core[e2.service]) || void 0 === r2 || r2.process(e2);
        }
        markCmdInvalid(e2, t2, r2) {
          const s2 = this.sendingCmdMap.get(e2);
          if (!s2)
            return;
          const { callback: i2, timer: n2 } = s2;
          n2 && clearTimeout(n2), this.sendingCmdMap.delete(e2), this.logger.warn(`packet ${e2}, ${r2} is invalid:`, t2), i2[1](t2);
        }
        markAllCmdInvaild(e2) {
          this.logger.log("markAllCmdInvaild", e2), this.sendingCmdMap.forEach((t2) => {
            const { callback: r2, timer: s2, cmd: i2 } = t2;
            this.logger.debug(`markAllCmdInvaild:: cmd "${i2}"`), s2 && clearTimeout(s2), r2[1](e2);
          }), this.sendingCmdMap.clear();
        }
        ping() {
          return __awaiter(this, void 0, void 0, function* () {
            clearTimeout(this.pingTimer);
            try {
              yield this.sendCmd("heartbeat");
            } catch (e2) {
              if (yield this.testHeartBeat5Timeout())
                return void this.doDisconnect(Xr.OFFLINE, "PingError");
            }
            this.pingTimer = setTimeout(() => {
              this.ping();
            }, 3e4);
          });
        }
        testHeartBeat5Timeout() {
          return __awaiter(this, void 0, void 0, function* () {
            clearTimeout(this.pingTimer);
            for (let e2 = 0; e2 < 5; e2++)
              try {
                return yield this.sendCmd("heartbeat", {}, { timeout: 3e3 }), false;
              } catch (t2) {
                this.logger.debug(`core:: test heartbeat ${e2} Timeout`);
              }
            return true;
          });
        }
        initOnlineListener() {
          this.hasNetworkListener || (this.logger.log("core::onlineListener:init"), this.hasNetworkListener = true, Cr.net.onNetworkStatusChange((e2) => {
            this.logger.log("core::onlineListener:network change", e2), e2.isConnected && "logined" === this.core.status ? this.ping() : e2.isConnected && "waitReconnect" === this.core.status ? (this.reconnectTimer && clearTimeout(this.reconnectTimer), this.core.auth.login({ isAutoReconnect: true }).catch(() => {
              this.logger.error(`core::attempToReconnect failed ${this.retryCount}`);
            })) : e2.isConnected || this.doDisconnect(Xr.OFFLINE, "OfflineListener");
          }));
        }
        destroyOnlineListener() {
          this.logger.log("core::onlineListener:destroy"), Cr.net.offNetworkStatusChange(), this.hasNetworkListener = false;
        }
        disconnect() {
          switch (this.core.status) {
            case "connected":
            case "logined":
            case "connecting":
            case "waitReconnect":
              return this.doDisconnect(Xr.ACTIVE, "UserActiveDisconnect"), Promise.resolve();
            case "unconnected":
            case "destroyed":
              return Promise.resolve();
          }
        }
      }
      class V1AuthLbsService {
        constructor(e2) {
          this.socketLinkUrls = [], this.core = e2, this.options = this.core.options, this.logger = this.core.logger;
        }
        getLbsInfos() {
          var e2;
          return __awaiter(this, void 0, void 0, function* () {
            if (this.socketLinkUrls.length > 0) {
              const e3 = this.socketLinkUrls;
              return this.core.logger.log("auth::getLbsInfos:use cache link", e3), Promise.resolve(e3);
            }
            const t2 = this.options.lbsUrls[0], r2 = t2.indexOf("?") > -1 ? "&" : "?", s2 = t2 + r2 + "k=" + this.options.appkey + "&id=" + this.options.account + "&sv=180&pv=1&networkType=0";
            try {
              this.logger.log("getLbsInfos ", s2);
              const t3 = yield this.core.adapters.request(s2, { method: "GET", dataType: "json", timeout: 1e4 }, { exception_service: 1 });
              if (200 !== t3.status || !t3.data)
                throw this.logger.error("getLbsInfos::error status", t3.status, t3), new Error(`getLbsInfos failed, status ${t3.status}`);
              this.core.reporter.reportTraceUpdateV2("login", { operation_type: "HTTP", target: s2, code: 200, succeed: true }, { asyncParams: Cr.net.getNetworkStatus() });
              const r3 = t3.data;
              let i2 = [this.options.linkUrl];
              Ie(r3, "common.link") && (i2 = Ie(r3, "common.link").concat(i2)), Ie(r3, 'common["link.default"]') && (i2 = i2.concat(Ie(r3, 'common["link.default"]'))), this.socketLinkUrls = Br(i2), t3.data["nos-chunk"] && (null === (e2 = this.core.cloudStorage) || void 0 === e2 || e2.setOptions({ chunkUploadHost: t3.data["nos-chunk"] })), this.logger.log("getLbsInfos success, socket link:", this.socketLinkUrls.slice(0), "chunkUploadHost: ", t3.data["nos-chunk"]);
            } catch (e3) {
              const t3 = e3;
              this.logger.error("getLbsInfos::error", t3), this.socketLinkUrls = [this.options.linkUrl], this.core.reporter.reportTraceUpdateV2("login", { operation_type: "HTTP", target: s2, description: t3.message, code: t3.code || 0, succeed: false }, { asyncParams: Cr.net.getNetworkStatus() });
            }
            return this.socketLinkUrls;
          });
        }
      }
      const Zr = { BROWSER: 0, RN: 2, UNIAPP: 3, WECHAT: 6 };
      class V1AuthAuthenticatorService {
        constructor(e2) {
          this.core = e2;
        }
        verifyAuthentication(e2 = false) {
          var t2, r2;
          return __awaiter(this, void 0, void 0, function* () {
            const s2 = this.core.options, i2 = Cr.getSystemInfo(), n2 = Object.assign(Object.assign({}, s2), { appLogin: e2 ? 0 : 1, appkey: s2.appkey, account: s2.account, token: s2.token, deviceId: this.core.auth.deviceId, clientType: 16, protocolVersion: 1, sdkVersion: 91200, sdkHumanVersion: "0.15.0", os: i2.os, browser: i2.browser, session: null === (t2 = this.core.clientSocket.socket) || void 0 === t2 ? void 0 : t2.sessionId, sdkType: Zr[Cr.platform] || 0, userAgent: "Native/0.15.0" }), o2 = i2.os.toLowerCase();
            "UNIAPP" !== Cr.platform || "ios" !== o2 && "android" !== o2 || (n2.isReactNative = 1, n2.clientType = "ios" === o2 ? 2 : 1, i2.pushDeviceInfo && i2.pushDeviceInfo.MANUFACTURER && (n2.deviceInfo = JSON.stringify(i2.pushDeviceInfo))), this.core.logger.log("auth::do login ", s2.account, null === (r2 = this.core.clientSocket.socket) || void 0 === r2 ? void 0 : r2.sessionId);
            const a2 = yield this.core.clientSocket.sendCmd("login", { login: n2 });
            if (a2.error)
              throw a2.error;
            const { loginRes: c2, loginPorts: d2, aosPushInfo: m2 } = a2.content;
            let l2 = formatMultiPortLoginInfo(d2, 2);
            return l2 = l2.filter((e3) => e3.connectionId !== c2.connectionId), l2.length > 0 && this.core.emit("multiPortLogin", l2), Object.assign(Object.assign({}, c2), { aosPushInfo: m2 });
          });
        }
      }
      class AuthService extends Service {
        constructor(e2) {
          super("auth", e2), this.account = "", this.token = "", this.deviceId = "", this.isManualLoginAttempt = false, registerParser({ cmdMap: Ae, cmdConfig: Oe }), this.lbsService = new V1AuthLbsService(e2), this.authenticatorService = new V1AuthAuthenticatorService(e2);
        }
        login(e2 = {}) {
          return __awaiter(this, void 0, void 0, function* () {
            e2.isAutoReconnect || (this.isManualLoginAttempt = true), yield this._connect(e2), this.core.abtest.abtRequest();
            try {
              yield this.doLogin(e2.isAutoReconnect), this.isManualLoginAttempt = false;
            } catch (e3) {
              throw this.isManualLoginAttempt = false, e3;
            }
          });
        }
        _connect(e2 = {}) {
          return __awaiter(this, void 0, void 0, function* () {
            if (!/^(unconnected|waitReconnect)$/.test(this.core.status)) {
              const e3 = `NIM status is ${this.core.status}, and would not connect`;
              return this.logger.warn(e3), Promise.reject(e3);
            }
            this.core.clientSocket.beforeConnect(), this.core.reporter.reportTraceCancel("login"), this.core.reporter.reportTraceStart("login", { user_id: this.core.options.account, action: e2.isAutoReconnect ? "auto_login" : "manual_login" }), this.core.reporter.reportTraceUpdateV2("login", { code: 0, description: JSON.stringify(Object.assign(Object.assign({}, this.core.options), { account: "***", token: "***" })), operation_type: "conf_init", succeed: true, duration: 0, target: "" });
            const t2 = yield this.lbsService.getLbsInfos();
            try {
              const r2 = yield this.core.clientSocket.connect({ linkUrls: t2, isAutoReconnect: e2.isAutoReconnect }, (e3, t3) => {
                this.core.reporter.reportTraceUpdateV2("login", { operation_type: "TCP", target: t3, code: e3.code || 408, description: `ws_handshake_failed:${e3.message}`, succeed: false }, { asyncParams: Cr.net.getNetworkStatus() });
              });
              r2 && this.core.reporter.reportTraceUpdateV2("login", { operation_type: "TCP", target: r2, code: 200, succeed: true }, { asyncParams: Cr.net.getNetworkStatus() });
            } catch (e3) {
              throw this.core.reporter.reportTraceEnd("login", false), e3;
            }
          });
        }
        doLogin(e2 = false) {
          return __awaiter(this, void 0, void 0, function* () {
            let t2;
            try {
              t2 = yield this.authenticatorService.verifyAuthentication(e2), this.core.reporter.reportTraceUpdateV2("login", { operation_type: "protocol", target: "2-3", code: 200, succeed: true }, { asyncParams: Cr.net.getNetworkStatus() }), this.core.reporter.reportTraceEnd("login", true), this.core.status = "logined";
            } catch (e3) {
              const t3 = e3, r2 = Ie(t3, "data.disconnect_reason") || "", s2 = 415 === t3.code ? JSON.stringify({ disconnect_reason: r2 }) : t3.message;
              if (this.core.logger.warn("nim login:: login failed", e3), this.core.reporter.reportTraceUpdateV2("login", { operation_type: "protocol", target: "2-3", code: t3.code || 0, succeed: false, description: s2 }, { asyncParams: Cr.net.getNetworkStatus() }), this.core.reporter.reportTraceEnd("login", false), this.core.clientSocket.doDisconnect(Xr.OFFLINE, this.isManualLoginAttempt ? "FailedToInitializeLogin" : "ReconnectLoginFailed"), this.isManualLoginAttempt)
                throw e3;
              return;
            }
            try {
              yield this.core.cloudStorage.init();
            } catch (e3) {
              this.core.logger.error("NIM:login cloudStorage init failed ", e3);
            }
            this.core.eventBus.emit("logined", t2), this.core.emit("logined", t2), this.core.logger.log("login done"), this.core.clientSocket.resetConnectStatus(), this.core.sync && this.core.sync.doSync && (yield this.core.sync.doSync()), this.core.clientSocket.ping();
          });
        }
        kick(e2) {
          var t2;
          return __awaiter(this, void 0, void 0, function* () {
            const r2 = yield this.core.clientSocket.sendCmd("kick", e2);
            return null === (t2 = r2.content) || void 0 === t2 ? void 0 : t2.deviceIds;
          });
        }
        multiPortLoginHandler(e2) {
          if (e2.error)
            return void this.logger.error("multiPortLoginHandler:: error, ", e2.error);
          const { loginPorts: t2, state: r2 } = e2.content, s2 = formatMultiPortLoginInfo(t2, r2);
          s2.length > 0 && this.core.emit("multiPortLogin", s2);
        }
        kickedHandler(e2) {
          if (e2.error)
            return void this.logger.error("kickedHandler:: error, ", e2.error);
          const t2 = function formatBeKickedTag(e3) {
            const t3 = format({ clientType: { type: "enum", values: Ne }, customClientType: { type: "number" } }, e3);
            let r2 = Ft[t3.reason];
            return r2 = r2 || { reason: "unknow", message: "Unknown reason" }, Object.assign(t3, r2);
          }(e2.content);
          this.logger.warn("kicked::", t2), this.core.clientSocket.doDisconnect(Xr.KICKED, t2);
        }
      }
      const es = { "5_1": "sync" }, ts = { sync: { sid: 5, cid: 1, service: "sync", hasPacketTimer: false, params: [{ type: "Property", name: "sync", reflectMapper: { myInfo: 1, offlineMsgs: 2, teams: 3, roamingMsgs: 7, relations: 9, friends: 11, friendUsers: 13, msgReceipts: 14, myTeamMembers: 15, donnop: 16, recallMsg: 17, sessionAck: 18, broadcastMsgs: 20, avSignal: 21, superTeams: 22, mySuperTeamMembers: 23, superTeamRoamingMsgs: 24, deleteSuperTeamMsg: 25, superTeamSessionAck: 26, deleteSelfMsgs: 27, stickTopSessions: 28, sessionHistoryMsgsDelete: 29 } }], response: [{ type: "Number", name: "timetag" }] } };
      Mr(function(e2, t2, r2, s2) {
        sr(t2, It(t2), e2, s2);
      });
      const rs = function() {
        const _s4 = function() {
          return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
        };
        return function() {
          return _s4() + _s4() + _s4() + _s4() + _s4() + _s4() + _s4() + _s4();
        };
      }();
      function getEnumKeys(e2) {
        return Object.keys(e2).filter((e3) => !(+e3 >= 0));
      }
      function getEnumKeyByEnumValue(e2, t2) {
        const r2 = Object.keys(e2).filter((r3) => e2[r3] == t2);
        return r2.length > 0 ? r2[0] : void 0;
      }
      function getAccountFromSessionId(e2, t2 = "-") {
        if (!e2)
          throw new CustomError("No sessionId", {}, 400);
        const r2 = e2.indexOf(t2);
        if (-1 === r2)
          throw new CustomError("Can not find conjunctions", {}, 400);
        const s2 = e2.slice(0, r2);
        return { accid: e2.slice(r2 + 1), scene: "super_team" === s2 ? "superTeam" : s2 };
      }
      function emptyFuncWithPromise() {
        return Promise.resolve();
      }
      class SyncService extends Service {
        constructor(e2, t2 = {}) {
          super("sync", e2), this.options = t2, this.syncDoneFlag = false, this.options = Object.assign({ myInfo: !!e2.user.name, offlineMsgs: !!e2.msg.name, teams: !!e2.team.name, myTeamMembers: !!e2.team.name, roamingMsgs: !!e2.msg.name, relations: !!e2.user.name, friends: !!e2.friend.name, friendUsers: !!e2.user.name, msgReceipts: !!e2.msg.name, recallMsg: !!e2.msg.name, sessionAck: !!e2.session.name, superTeamSessionAck: !!e2.session.name, superTeams: !!e2.superTeam.name, mySuperTeamMembers: !!e2.superTeam.name, superTeamRoamingMsgs: !!e2.superTeam.name, deleteSuperTeamMsg: !!e2.superTeam.name, deleteSelfMsgs: !!e2.msg.name, sessionHistoryMsgsDelete: !!e2.msgLog.name, avSignal: !!e2.signaling.name }, t2), this.timetags = {}, this.pArray = [], this.initEventListeners(), registerParser({ cmdMap: es, cmdConfig: ts });
        }
        setOptions(e2 = {}) {
          this.options = Object.assign(this.options, e2);
        }
        getSyncDoneFlag() {
          return this.syncDoneFlag;
        }
        doSync() {
          return __awaiter(this, void 0, void 0, function* () {
            const e2 = this.genSyncParams();
            this.logger.log("doSync: ", e2), yield this.core.sendCmd("sync", { sync: e2 });
          });
        }
        initEventListeners() {
          this.core.eventBus.on("sync/updateTimetag", (e2) => {
            Object.keys(e2).forEach((t2) => {
              e2[t2] > (this.timetags[t2] || 0) && (this.timetags[t2] = e2[t2]);
            });
          }), this.core.eventBus.on("logined", () => {
            this.syncDoneFlag = false;
          });
        }
        genSyncParams() {
          return Object.keys(this.options).filter((e2) => {
            const t2 = e2;
            return this.options[t2];
          }).reduce((e2, t2) => {
            const r2 = t2;
            return e2[r2] = this.timetags[r2] || 0, e2;
          }, {});
        }
        handleImmediate(e2) {
          var t2;
          this.core.session && this.core.session.onSyncDone && this.core.session.onSyncDone(), this.logger.log("sync: emit syncdone", null === (t2 = e2.content) || void 0 === t2 ? void 0 : t2.timetag), this.syncDoneFlag = true, this.core.emit("syncdone");
        }
        syncHandler(e2) {
          "ALI" === function getMiniappEnv() {
            return "undefined" != typeof tt && tt.getSystemInfo ? "TT" : "undefined" != typeof swan && swan.getSystemInfo ? "BAIDU" : "undefined" != typeof my && my.getSystemInfo ? "ALI" : "undefined" != typeof wx && wx.getSystemInfo ? "WX" : "unknow environment";
          }() ? (this.logger.log("sync: emit ALIAPP sycnHandler, handle later"), setTimeout(() => {
            this.handleImmediate(e2);
          }, 100)) : this.handleImmediate(e2);
        }
      }
      class TimerManager {
        constructor() {
          this.timerList = [], this.id = 0, this.timer = null, this.timeout = 0;
        }
        addTimer(e2, t2 = 0, r2 = 1) {
          const s2 = new Date().getTime(), i2 = this.id;
          return this.timerList.push({ id: i2, loop: r2, count: 0, timeout: s2 + t2, interval: t2, callback: e2 }), this.id++, this.checkTimer(s2), i2;
        }
        checkTimer(e2 = new Date().getTime()) {
          if (this.removeFinished(), 0 === this.timerList.length && null != this.timer)
            return;
          let t2 = 0;
          for (const e3 of this.timerList)
            (0 === t2 || t2 > e3.timeout) && (t2 = e3.timeout);
          0 !== this.timerList.length && (null === this.timer || t2 < this.timeout || this.timeout < e2) && (this.timer = setTimeout(this.nowTime.bind(this), t2 - e2), this.timeout = t2);
        }
        nowTime() {
          const e2 = new Date().getTime();
          for (const t2 of this.timerList)
            e2 >= t2.timeout && (t2.callback(), t2.count++, t2.timeout = e2 + t2.interval);
          this.clerTime(), this.checkTimer(e2);
        }
        clerTime() {
          null !== this.timer && (clearTimeout(this.timer), this.timer = null);
        }
        deleteTimer(e2) {
          for (let t2 = this.timerList.length - 1; t2 >= 0; t2--) {
            this.timerList[t2].id === e2 && this.timerList.splice(t2, 1);
          }
        }
        removeFinished() {
          for (let e2 = this.timerList.length - 1; e2 >= 0; e2--) {
            const t2 = this.timerList[e2];
            t2.loop >= 0 && t2.count >= t2.loop && this.timerList.splice(e2, 1);
          }
        }
        destroy() {
          this.clerTime(), this.timerList = [], this.id = 0, this.timer = null;
        }
      }
      const ss = ["error", "warn", "log", "debug"], emptyFunc = function() {
      }, is = ["off", "error", "warn", "log", "debug"];
      class Logger {
        constructor(e2, t2) {
          this.name = t2, this.strategies = { debug: console.log, log: console.log, warn: console.warn, error: console.error }, this.debug = emptyFunc, this.log = emptyFunc, this.warn = emptyFunc, this.error = emptyFunc, this.name = t2, Logger.instancesName.push(t2), is.includes(e2) || (e2 = "off"), this.setLogFunc(e2);
        }
        setLogFunc(e2) {
          const t2 = ss.findIndex((t3) => t3 === e2);
          ss.forEach((e3, r2) => {
            r2 <= t2 && (this[e3] = function() {
              const t3 = Array.prototype.slice.call(arguments), r3 = this.formatArgs(t3, e3);
              this.strategies[e3](r3);
            });
          });
        }
        formatArgs(e2, t2) {
          const r2 = new Date(), s2 = `${r2.getMonth() + 1}-${r2.getDate()} ${r2.getHours()}:${r2.getMinutes()}:${r2.getSeconds()}:${r2.getMilliseconds()}`;
          return `[NIM ${t2} ${this.name} ${s2}] ` + e2.map((e3) => e3 instanceof CustomError ? `${e3.name}, ${e3.code}, ${e3.message}` : e3 instanceof Error ? e3 && e3.message ? e3.message : e3 : "object" == typeof e3 ? JSON.stringify(e3) : e3).join(" ");
        }
        destroy() {
          this.debug = emptyFunc, this.log = emptyFunc, this.warn = emptyFunc, this.error = emptyFunc;
        }
      }
      Logger.instancesName = [];
      class CoreAdapters {
        constructor(e2) {
          this.core = e2;
        }
        request(e2, t2, r2) {
          const s2 = new Date().getTime(), i2 = (null == r2 ? void 0 : r2.exception_service) || 0;
          return Cr.request(e2, t2).catch((r3) => {
            var n2, o2;
            const a2 = r3;
            throw this.core.reporter.reportTraceStart("exceptions", { user_id: this.core.options.account, trace_id: null === (o2 = null === (n2 = this.core.clientSocket) || void 0 === n2 ? void 0 : n2.socket) || void 0 === o2 ? void 0 : o2.sessionId, start_time: s2, action: 1, exception_service: i2 }), this.core.reporter.reportTraceUpdateV2("exceptions", { code: "number" == typeof a2.code ? a2.code : 0, description: a2.message || `${a2.code}`, operation_type: 0, target: e2, context: t2 ? JSON.stringify(t2) : "" }, { asyncParams: Cr.net.getNetworkStatus() }), this.core.reporter.reportTraceEnd("exceptions", 1), r3;
          });
        }
        uploadFile(e2) {
          const t2 = new Date().getTime();
          return Cr.uploadFile(e2).catch((r2) => {
            var s2, i2;
            const n2 = r2;
            this.core.reporter.reportTraceStart("exceptions", { user_id: this.core.options.account, trace_id: null === (i2 = null === (s2 = this.core.clientSocket) || void 0 === s2 ? void 0 : s2.socket) || void 0 === i2 ? void 0 : i2.sessionId, start_time: t2, action: 1, exception_service: 3 });
            const o2 = "BROWSER" === Cr.platform ? e2.chunkUploadHost : e2.commonUploadHost ? `${e2.commonUploadHost}/${e2.nosToken && e2.nosToken.bucket}` : "https://nos.netease.com/nim";
            throw this.core.reporter.reportTraceUpdateV2("exceptions", { code: "number" == typeof n2.code ? n2.code : 0, description: n2.message || `${n2.code}`, operation_type: 1, target: o2 }, { asyncParams: Cr.net.getNetworkStatus() }), this.core.reporter.reportTraceEnd("exceptions", 1), r2;
          });
        }
      }
      class ABTest {
        constructor(e2, t2) {
          this.abtInfo = {}, this.core = e2, this.config = t2;
        }
        abtRequest() {
          var e2, t2;
          return __awaiter(this, void 0, void 0, function* () {
            if (!this.core.options.isAbtestEnable)
              return;
            if (this.abtInfo.experiments)
              return;
            if (!this.config.abtestUrl)
              return;
            let r2;
            try {
              r2 = yield this.core.adapters.request(this.config.abtestUrl, { method: "POST", dataType: "json", headers: { sdktype: "ABTest" }, data: { clientInfo: { projectKey: this.config.abtestProjectKey, appKey: this.core.options.appkey, osType: "Web", sdkVersion: "0.15.0", deviceId: this.core.config.deviceId }, useLocalCache: true } }, { exception_service: 7 });
            } catch (e3) {
              this.core.logger.warn("ABTest request failed");
            }
            this.abtInfo = (null === (t2 = null === (e2 = null == r2 ? void 0 : r2.data) || void 0 === e2 ? void 0 : e2.data) || void 0 === t2 ? void 0 : t2.abtInfo) || {};
          });
        }
      }
      const ns = {}, os = { debugLevel: "off", needReconnect: true, reconnectionAttempts: Number.MAX_SAFE_INTEGER, lbsUrls: ["https://lbs.netease.im/lbs/webconf.jsp"], linkUrl: Qr, abtestUrl: "https://abt-online.netease.im/v1/api/abt/client/getExperimentInfo", isAbtestEnable: true };
      class NIM extends t {
        constructor(e2, s2 = {}) {
          var i2, n2, o2;
          super(), this.instanceName = "NIM", this.status = "unconnected", this.account = "", this.eventBus = new t(), this.options = {}, this.offlinePush = {}, this.sync = {}, this.msg = {}, this.msgLog = {}, this.session = {}, this.cloudSession = {}, this.misc = {}, this.user = {}, this.friend = {}, this.systemMessage = {}, this.team = {}, this.event = {}, this.msgExtend = {}, this.cloudStorage = {}, this.passThrough = {}, this.superTeam = {}, this.plugin = {}, this.signaling = {}, this.logger = new Logger(e2.debugLevel, e2.account), this.setInitOptions(e2), this.otherOptions = Object.assign(Object.assign({}, s2), { cloudStorageConfig: Object.assign({ storageKeyPrefix: "NIM" }, s2.cloudStorageConfig) }), this.timerManager = new TimerManager(), this.adapters = new CoreAdapters(this), this.abtest = new ABTest(this, { isAbtestEnable: this.options.isAbtestEnable, abtestUrl: this.options.abtestUrl, abtestProjectKey: "imElite_sdk_abtest_web" });
          let a2 = Cr.localStorage.getItem("__NIM_DEVC_ID__");
          this.options.isFixedDeviceId ? (a2 = Cr.localStorage.getItem("__NIM_DEVC_ID__") || rs(), Cr.localStorage.setItem("__NIM_DEVC_ID__", a2)) : a2 = rs(), this.config = { timeout: 8e3, deviceId: a2 };
          const c2 = Cr.getSystemInfo();
          let d2 = null === (i2 = null == s2 ? void 0 : s2.reportConfig) || void 0 === i2 ? void 0 : i2.isDataReportEnable;
          "boolean" != typeof d2 && (d2 = true), this.reporter = new r({ reportConfigUrl: (null === (n2 = null == s2 ? void 0 : s2.reportConfig) || void 0 === n2 ? void 0 : n2.reportConfigUrl) || "https://statistic.live.126.net/dispatcher/req", reportUrl: (null === (o2 = null == s2 ? void 0 : s2.reportConfig) || void 0 === o2 ? void 0 : o2.reportUrl) || "https://statistic.live.126.net/statics/report/common/form", isDataReportEnable: d2, common: { app_key: e2.appkey, dev_id: a2, platform: "Web", sdk_ver: "0.15.0", env: "online", os_name: c2.os, os_ver: c2.osVer, model: c2.hostEnvVer, manufactor: c2.hostEnv, host_env: c2.hostEnv, host_info: c2.hostInfo, host_env_ver: c2.hostEnvVer }, request: Cr.request, logger: this.logger, autoStart: true }), Cr.setLogger(this.logger), this.auth = new AuthService(this), this.clientSocket = new ClientSocket(this), Object.keys(ns).filter((e3) => "sync" !== e3).forEach((e3) => {
            const t2 = ns[e3];
            this[e3] = new t2(this);
          }), ns.sync && (this.sync = new SyncService(this, this.otherOptions.syncOptions)), Object.keys(this.otherOptions).forEach((e3) => {
            const t2 = e3.indexOf("Config");
            if ("serverConfig" === e3)
              this.cloudStorage.setOptions(this.otherOptions.serverConfig);
            else if (t2 > -1) {
              const r2 = e3.slice(0, t2);
              this[r2] && this[r2].setOptions && this[r2].setOptions(this.otherOptions[e3]);
            }
          }), NIM.instance = this, this.logger.log("NIM init, version ", "0.15.0", " sdk version ", 91200, " appkey ", e2.appkey);
        }
        static getInstance(e2, t2) {
          if (!NIM.instance) {
            if (e2)
              return new NIM(e2, t2);
            throw new Error("Instance not exist, please input options");
          }
          if (e2) {
            if (NIM.instance.options.account === e2.account && NIM.instance.options.appkey === e2.appkey)
              return NIM.instance.setOptions(e2), NIM.instance;
            throw new Error("Unexpected login");
          }
          return NIM.instance;
        }
        setInitOptions(e2) {
          validate({ account: { type: "string" }, appkey: { type: "string" }, token: { type: "string" }, needReconnect: { type: "boolean", required: false }, reconnectionAttempts: { type: "number", required: false }, customClientType: { type: "number", min: 1, required: false }, authType: { type: "number", min: 0, max: 2, required: false }, lbsUrls: { type: "array", itemType: "string", min: 1, required: false }, linkUrl: { type: "string", allowEmpty: false, required: false } }, e2), this.logger.log("NIM::setInitOptions options is", e2), this.account = e2.account, this.options = Object.assign(Object.assign({}, os), e2);
        }
        connect(e2 = {}) {
          return this.auth.login(e2);
        }
        setOptions(e2) {
          if ("object" == typeof e2 && null !== e2 && (Object.prototype.hasOwnProperty.call(e2, "account") && e2.account !== this.options.account || Object.prototype.hasOwnProperty.call(e2, "appkey") && e2.appkey !== this.options.appkey))
            throw new Error("NIM::setOptions account and appkey is not allowed to reset");
          validate({ token: { type: "string", required: false }, needReconnect: { type: "boolean", required: false }, reconnectionAttempts: { type: "number", required: false }, customClientType: { type: "number", min: 1, required: false }, authType: { type: "number", min: 0, max: 2, required: false }, lbsUrls: { type: "array", itemType: "string", min: 1, required: false }, linkUrl: { type: "string", allowEmpty: false, required: false } }, e2), this.logger.log("NIM::setOptions options is", e2), this.options = Object.assign(Object.assign({}, this.options), e2);
        }
        disconnect() {
          switch (this.status) {
            case "logined":
              return this.sendCmd("logout", void 0, { timeout: 1e3 }).then(() => {
                this.clientSocket.doDisconnect(Xr.ACTIVE, "UserActiveDisconnect");
              }).catch((e2) => {
                this.logger.error("Instance::disconnect sendCmd:logout error", e2), this.clientSocket.doDisconnect(Xr.ACTIVE, "UserActiveDisconnect");
              });
            case "connected":
            case "connecting":
            case "waitReconnect":
              return this.clientSocket.doDisconnect(Xr.ACTIVE, "UserActiveDisconnect"), Promise.resolve();
            case "unconnected":
            case "destroyed":
              return Promise.resolve();
          }
        }
        destroy() {
          return NIM.instance = null, this.disconnect().then(() => {
            var e2, t2, r2;
            this.status = "destroyed", this.removeAllListeners(), this.eventBus.removeAllListeners(), this.logger.destroy(), this.reporter.destroy(), this.timerManager.destroy(), null === (e2 = this.session) || void 0 === e2 || e2.destroy(), null === (t2 = this.team) || void 0 === t2 || t2.destroy(), null === (r2 = this.superTeam) || void 0 === r2 || r2.destroy(), this.connect = emptyFuncWithPromise, this.disconnect = emptyFuncWithPromise, this.destroy = emptyFuncWithPromise;
          });
        }
        kick(e2) {
          return this.auth.kick(e2);
        }
        sendCmd(e2, t2, r2) {
          return this.clientSocket.sendCmd(e2, t2, r2);
        }
        emit(e2, ...t2) {
          try {
            const r2 = Date.now(), s2 = super.emit(e2, ...t2), i2 = Date.now() - r2;
            return i2 >= 10 && this.logger.warn(`Core::emit event: ${e2} process takes: ${i2}ms`), s2;
          } catch (t3) {
            return this.logger.error(`Core::emit event: ${e2}. Error: ${t3}`), setTimeout(() => {
              throw this.logger.error(`Core::emit throw error in setTimeout. event: ${e2}. Error: ${t3}`), t3;
            }, 0), false;
          }
        }
        static registerService(e2, t2) {
          ns[t2] = e2;
        }
      }
      NIM.instance = null, NIM.setAdapters = function setAdapters(e2) {
        br(Cr, e2);
      };
      let as = console;
      const cs = { clear() {
        try {
          uni.clearStorageSync();
        } catch (e2) {
          as.error("uni-app::ws: clearStorage ", e2);
        }
      }, getItem: (e2) => uni.getStorageSync(e2), setItem: (e2, t2) => uni.setStorageSync(e2, t2), removeItem: (e2) => uni.removeStorageSync(e2) };
      const ds = { setLogger(e2) {
        as = e2;
      }, platform: "UNIAPP", localStorage: cs, request: function request(e2, t2) {
        return new Promise((r2, s2) => {
          uni.request(Object.assign(Object.assign({ method: "GET", url: e2 }, t2), { success: function(e3) {
            e3 = { data: e3.data, status: e3.statusCode, errMsg: e3.errMsg, header: e3.header }, r2(e3);
          }, fail: function(e3) {
            s2(e3);
          } }));
        });
      }, WebSocket: class WebSocket {
        constructor(e2, t2 = "") {
          if (this.CONNECTING = 0, this.OPEN = 1, this.CLOSING = 2, this.CLOSED = 3, this.onclose = function() {
            as.log("Adapter uniapp: sockets on close ");
          }, this.onerror = function(e3) {
            as.error("Adapter uniapp: sockets error ", e3);
          }, this.onmessage = function(e3) {
          }, this.onopen = function(e3) {
          }, !e2)
            throw new Error("Failed to construct 'socket': url required");
          this.url = e2.replace(/:443(\/|$)/, "$1"), this.protocol = t2, this.readyState = this.CONNECTING;
          const r2 = this.protocol ? { protocols: this.protocol } : {};
          this.socketTask = uni.connectSocket(Object.assign(Object.assign({ url: this.url }, r2), { multiple: true, fail: (e3) => {
            this.errorHandler(e3);
          } })), this.socketTask.onOpen((e3) => {
            as.log("Adapter uniapp:: onOpen. event: ", e3), this.readyState = this.OPEN, this.onmessage && this.onmessage({ type: "open", header: e3 });
          }), this.socketTask.onError((e3) => {
            as.log("Adapter uniapp:: onError. event: ", e3), this.errorHandler(e3);
          }), this.socketTask.onClose((e3) => {
            this.readyState = this.CLOSED, "function" == typeof this.onclose && (this.onclose && this.onclose(), as.log("Adapter uniapp:: onClose. event: ", e3)), this.socketTask = null;
          }), this.socketTask.onMessage((e3) => {
            let t3;
            t3 = "string" == typeof e3.data ? e3.data : e3.data.data, this.onmessage && this.onmessage({ data: t3 });
          });
        }
        close() {
          as.log("Adapter uniapp:: close uni socket actively"), this.socketTask.close({ code: 1e3, reason: "user force close websocket", complete: () => {
            this.socketTask = null;
          } });
        }
        send(e2) {
          if (this.readyState !== this.OPEN)
            throw new Error(`Adapter uniapp:: socket sendMsg when readyState=${this.readyState}`);
          if (!("string" == typeof e2 || e2 instanceof ArrayBuffer))
            throw new TypeError("Adapter uniapp:: socket sendMsg only String/ArrayBuffer supported");
          this.socketTask.send({ data: e2 });
        }
        errorHandler(e2) {
          as.error("Adapter uniapp:: errorHandler. event: ", e2), this.readyState = this.CLOSED, this.onerror && this.onerror({ type: "error", message: e2 && e2.errMsg }), e2.errMsg && "[object Array]" === Object.prototype.toString.call(e2.errMsg) && (e2.errMsg.indexOf("断裂管道") > 0 || e2.errMsg.indexOf("broken pipe") > 0) && this.onclose && this.onclose();
        }
      }, uploadFile: function uploadFile(e2) {
        return __awaiter(this, void 0, void 0, function* () {
          return yield new Promise((t2, r2) => {
            const s2 = uni.uploadFile({ url: e2.commonUploadHost ? `${e2.commonUploadHost}/${e2.nosToken.bucket}` : "https://nos.netease.com/nim", formData: { Object: decodeURIComponent(e2.nosToken.objectName), "x-nos-token": e2.nosToken.token, "x-nos-entity-type": "json" }, name: "file", fileType: e2.type, filePath: e2.filePath, success(s3) {
              if (200 == s3.statusCode)
                try {
                  const r3 = JSON.parse(s3.data);
                  r3.name = e2.filePath, r3.ext = r3.name.lastIndexOf(".") > -1 ? r3.name.slice(r3.name.lastIndexOf(".") + 1).toLowerCase() : "", t2(r3);
                } catch (e3) {
                  r2(new Error(`Upload Error parse result error: ${s3.data}`));
                }
              else
                r2(new Error(`Upload error ${s3.statusCode}: ${s3.errMsg}`));
            }, fail(e3) {
              "uploadFile:fail abort" === Ie(e3, "errMsg") && (e3.errCode = 10499), r2(e3);
            } });
            try {
              e2.onUploadStart && e2.onUploadStart(s2);
            } catch (e3) {
              as.error("Adapter uploadFile: options.onUploadStart error", e3 && e3.message), s2.abort(), r2(e3);
            }
            e2.onUploadProgress && s2.onProgressUpdate(function(t3) {
              e2.onUploadProgress && e2.onUploadProgress({ total: t3.totalBytesExpectedToSend, loaded: t3.totalBytesSent, percentage: t3.progress, percentageText: t3.progress + "%" });
            });
          });
        });
      }, getSystemInfo: function getSystemInfo() {
        const e2 = uni.getSystemInfoSync() || {};
        return { os: e2.osName || "UNIAPP_UNKNOW", osVer: e2.osVersion, browser: e2.browserName || "", browserVer: e2.browserVersion || "", hostEnv: "UNIAPP", hostEnvVer: e2.uniRuntimeVersion, hostInfo: e2.uniPlatform, pushDeviceInfo: { PRODUCT: e2.model, DEVICE: e2.model, MANUFACTURER: e2.brand } };
      }, net: { __getEnv: () => uni } }, ms = xt({ none: 0, normal: 1, all: 3 }), ls = { normal: 0, advanced: 1 }, ps = xt(ls), us = xt({ normal: 0, owner: 1, manager: 2 }), gs = { noVerify: 0, needVerify: 1, rejectAll: 2 }, ys = xt(gs), hs = { needVerify: 0, noVerify: 1 }, fs = xt(hs), vs = { manager: 0, all: 1 }, Ss = xt(vs), Ts = { manager: 0, all: 1 }, Ms = xt(Ts), bs = { manager: 0, all: 1 }, ks = xt(bs);
      function formatTeam(e2) {
        const t2 = { type: ps, muteType: ms, joinMode: ys, beInviteMode: fs, inviteMode: Ss, updateTeamMode: Ms, updateExtMode: ks }, r2 = __rest(e2, ["bits"]);
        return ["teamId"].forEach((e3) => {
          r2[e3] && (r2[e3] = r2[e3].toString());
        }), ["level", "memberNum", "memberUpdateTime", "createTime", "updateTime"].forEach((e3) => {
          void 0 !== r2[e3] && (r2[e3] = parseInt(r2[e3]));
        }), ["valid", "validToCurrentUser", "mute"].forEach((e3) => {
          void 0 !== r2[e3] && (r2[e3] = 1 === parseInt(r2[e3]));
        }), Object.keys(t2).forEach((e3) => {
          void 0 !== r2[e3] && (r2[e3] = t2[e3][r2[e3]] || r2[e3]);
        }), r2;
      }
      function formatTeams(e2) {
        return e2 && e2.length > 0 ? e2.map((e3) => formatTeam(e3)) : [];
      }
      function generateTeam(e2) {
        const t2 = Object.assign({}, e2), r2 = { type: ls, joinMode: gs, beInviteMode: hs, inviteMode: vs, updateTeamMode: Ts, updateExtMode: bs };
        return ["avatar", "name", "intro", "announcement", "ext"].forEach((e3) => {
          void 0 !== t2[e3] && (t2[e3] = t2[e3].toString());
        }), Object.keys(r2).forEach((e3) => {
          void 0 !== t2[e3] && (t2[e3] = r2[e3][t2[e3]]);
        }), t2;
      }
      function generatorTeamMemberForCmd(e2) {
        const t2 = {};
        return void 0 !== e2.bitConfigMask && (t2.bits = parseInt(e2.bitConfigMask)), ["teamId", "ext", "account", "nickInTeam"].forEach((r2) => {
          e2[r2] && (t2[r2] = e2[r2].toString());
        }), Object.prototype.hasOwnProperty.call(e2, "nickInTeam") && (t2.nickInTeam = e2.nickInTeam), t2;
      }
      function formatTeamMember(e2) {
        const t2 = { type: us }, { bits: r2 } = e2, s2 = __rest(e2, ["bits"]);
        return void 0 !== r2 && (s2.muteTeam = 1 === parseInt(r2), s2.bitConfigMask = r2), s2.id = `${s2.teamId}-${s2.account}`, ["teamId"].forEach((e3) => {
          s2[e3] && (s2[e3] = s2[e3].toString());
        }), ["joinTime", "updateTime", "bitConfigMask"].forEach((e3) => {
          void 0 !== s2[e3] && (s2[e3] = parseInt(s2[e3]));
        }), ["active", "valid", "mute"].forEach((e3) => {
          void 0 !== s2[e3] && (s2[e3] = 1 === parseInt(s2[e3]));
        }), Object.keys(t2).forEach((e3) => {
          void 0 !== s2[e3] && (s2[e3] = t2[e3][s2[e3]] || s2[e3]);
        }), s2;
      }
      function formatTeamMembers(e2) {
        return e2 && e2.length > 0 ? e2.map((e3) => formatTeamMember(e3)) : [];
      }
      function generatorMemberByTeam(e2, t2, r2 = "normal") {
        return { id: `${e2.teamId}-${t2}`, teamId: e2.teamId, account: t2, type: r2, nickInTeam: "", muteTeam: false, mute: false, joinTime: e2.memberUpdateTime, updateTime: e2.memberUpdateTime, active: true, valid: true };
      }
      function generatorMembersByTeam(e2, t2, r2 = "normal") {
        return t2 && t2.length > 0 ? t2.map((t3) => generatorMemberByTeam(e2, t3, r2)) : [];
      }
      var Cs;
      function formatUser(e2) {
        const t2 = Object.assign({}, e2);
        return t2.createTime && (t2.createTime = +t2.createTime), t2.updateTime && (t2.updateTime = +t2.updateTime), t2.gender && (t2.gender = Cs[+t2.gender]), t2;
      }
      !function(e2) {
        e2[e2.unknown = 0] = "unknown", e2[e2.male = 1] = "male", e2[e2.female = 2] = "female";
      }(Cs || (Cs = {}));
      const Is = { "8_1": "createTeam", "8_5": "addTeamMembers", "8_6": "removeTeamMembers", "8_7": "updateTeamInfo", "8_8": "leaveTeam", "8_9": "getTeamInfo", "8_10": "getTeams", "8_11": "getTeamMembers", "8_12": "dismissTeam", "8_13": "applyTeam", "8_14": "passTeamApply", "8_15": "rejectTeamApply", "8_16": "addTeamManagers", "8_17": "removeTeamManagers", "8_18": "transferTeam", "8_19": "updateMyMemberInfo", "8_20": "updateNickInTeam", "8_21": "acceptTeamInvite", "8_22": "rejectTeamInvite", "8_25": "muteTeamMember", "8_27": "getMutedTeamMembers", "8_28": "sendTeamMsgReceipt", "8_29": "getTeamMsgReads", "8_30": "getTeamMsgReadAccounts", "8_31": "notifyTeamMsgReceipts", "8_32": "muteTeam", "8_33": "getTeamMemberInvitorAccid", "8_34": "getTeamsById", "8_101": "syncCreateTeam", "8_109": "syncTeams", "8_119": "syncUpdateTeamMember", "8_126": "syncMyTeamMembers" }, ws = { team: { teamId: 1, name: 3, type: 4, owner: 5, level: 6, selfCustom: 7, valid: 8, memberNum: 9, memberUpdateTime: 10, createTime: 11, updateTime: 12, validToCurrentUser: 13, intro: 14, announcement: 15, joinMode: 16, bits: 17, ext: 18, serverExt: 19, avatar: 20, beInviteMode: 21, inviteMode: 22, updateTeamMode: 23, updateExtMode: 24, mute: 100, muteType: 101 }, teamMsgReceiptTag: { teamId: 0, idServer: 1, read: 100, unread: 101, idClient: 102, account: 103 }, teamMember: { teamId: 1, account: 3, type: 4, nickInTeam: 5, bits: 7, active: 8, valid: 9, joinTime: 10, updateTime: 11, ext: 12, mute: 13, invitorAccid: 14 } }, _s = invertSerializeMap(ws), Es = { getTeamInfo: { sid: 8, cid: 9, service: "team", params: [{ type: "Long", name: "teamId" }], response: [{ type: "Property", name: "team", reflectMapper: _s.team }] }, getTeams: { sid: 8, cid: 10, service: "team", params: [{ type: "long", name: "timetag" }], response: [{ type: "PropertyArray", name: "teams", reflectMapper: _s.team }, { type: "Number", name: "timetag" }], ignoreErrCodes: [803] }, createTeam: { sid: 8, cid: 1, service: "team", params: [{ type: "Property", name: "team", reflectMapper: ws.team }, { type: "StrArray", name: "accounts" }, { type: "String", name: "ps" }], response: [{ type: "Property", name: "team", reflectMapper: _s.team }, { type: "StrArray", name: "abortedAccidList" }] }, sendTeamMsgReceipt: { sid: 8, cid: 28, service: "team", params: [{ type: "PropertyArray", name: "teamMsgReceipts", reflectMapper: ws.teamMsgReceiptTag }], response: [{ type: "PropertyArray", name: "teamMsgReceipts", reflectMapper: _s.teamMsgReceiptTag }] }, getTeamMsgReads: { sid: 8, cid: 29, service: "team", params: [{ type: "PropertyArray", name: "teamMsgReceipts", reflectMapper: ws.teamMsgReceiptTag }], response: [{ type: "PropertyArray", name: "teamMsgReceipts", reflectMapper: _s.teamMsgReceiptTag }] }, getTeamMsgReadAccounts: { sid: 8, cid: 30, service: "team", params: [{ type: "Property", name: "teamMsgReceiptTag", reflectMapper: ws.teamMsgReceiptTag }], response: [{ type: "Property", name: "teamMsgReceipt", reflectMapper: _s.teamMsgReceiptTag }, { type: "StrArray", name: "readAccounts" }, { type: "StrArray", name: "unreadAccounts" }] }, notifyTeamMsgReceipts: { sid: 8, cid: 31, service: "team", response: [{ type: "PropertyArray", name: "teamMsgReceipts", reflectMapper: _s.teamMsgReceiptTag }] }, dismissTeam: { sid: 8, cid: 12, service: "team", params: [{ type: "Long", name: "teamId" }] }, leaveTeam: { sid: 8, cid: 8, service: "team", params: [{ type: "Long", name: "teamId" }] }, transferTeam: { sid: 8, cid: 18, service: "team", params: [{ type: "Long", name: "teamId" }, { type: "String", name: "account" }, { type: "bool", name: "leave" }] }, updateTeamInfo: { sid: 8, cid: 7, service: "team", params: [{ type: "Property", name: "team", reflectMapper: ws.team }], response: [{ type: "Number", name: "id" }, { type: "Number", name: "time" }] }, getTeamsById: { sid: 8, cid: 34, service: "team", params: [{ type: "LongArray", name: "teamIds" }], response: [{ type: "PropertyArray", name: "teams", reflectMapper: _s.team }, { type: "StrArray", name: "tids" }], ignoreErrCodes: [816] }, getTeamMembers: { sid: 8, cid: 11, service: "team", params: [{ type: "Long", name: "teamId" }, { type: "Long", name: "timetag" }], response: [{ type: "String", name: "teamId" }, { type: "PropertyArray", name: "teamMembers", reflectMapper: _s.teamMember }, { type: "Number", name: "timetag" }] }, getMutedTeamMembers: { sid: 8, cid: 27, service: "team", params: [{ type: "Long", name: "teamId" }], response: [{ type: "String", name: "teamId" }, { type: "PropertyArray", name: "teamMembers", reflectMapper: _s.teamMember }] }, addTeamMembers: { sid: 8, cid: 5, service: "team", params: [{ type: "Long", name: "teamId" }, { type: "StrArray", name: "accounts" }, { type: "String", name: "ps" }, { type: "String", name: "attach" }], response: [{ type: "Long", name: "time" }, { type: "StrArray", name: "abortedAccidList" }] }, removeTeamMembers: { sid: 8, cid: 6, service: "team", params: [{ type: "Long", name: "teamId" }, { type: "StrArray", name: "accounts" }] }, applyTeam: { sid: 8, cid: 13, service: "team", params: [{ type: "Long", name: "teamId" }, { type: "String", name: "ps" }], response: [{ type: "Property", name: "team", reflectMapper: _s.team }] }, addTeamManagers: { sid: 8, cid: 16, service: "team", params: [{ type: "Long", name: "teamId" }, { type: "StrArray", name: "accounts" }] }, removeTeamManagers: { sid: 8, cid: 17, service: "team", params: [{ type: "Long", name: "teamId" }, { type: "StrArray", name: "accounts" }] }, updateMyMemberInfo: { sid: 8, cid: 19, service: "team", params: [{ type: "Property", name: "teamMember", reflectMapper: ws.teamMember }] }, updateNickInTeam: { sid: 8, cid: 20, service: "team", params: [{ type: "Property", name: "teamMember", reflectMapper: ws.teamMember }] }, muteTeamMember: { sid: 8, cid: 25, service: "team", params: [{ type: "Long", name: "teamId" }, { type: "String", name: "account" }, { type: "Int", name: "mute" }] }, getTeamMemberInvitorAccid: { sid: 8, cid: 33, service: "team", params: [{ type: "Long", name: "teamId" }, { type: "StrArray", name: "accounts" }], response: [{ type: "Object", name: "accountsMap" }] }, muteTeam: { sid: 8, cid: 32, service: "team", params: [{ type: "Long", name: "teamId" }, { type: "Int", name: "mute" }] }, passTeamApply: { sid: 8, cid: 14, service: "team", params: [{ type: "Long", name: "teamId" }, { type: "String", name: "from" }] }, rejectTeamApply: { sid: 8, cid: 15, service: "team", params: [{ type: "Long", name: "teamId" }, { type: "String", name: "from" }, { type: "String", name: "ps" }] }, acceptTeamInvite: { sid: 8, cid: 21, service: "team", params: [{ type: "Long", name: "teamId" }, { type: "String", name: "from" }] }, rejectTeamInvite: { sid: 8, cid: 22, service: "team", params: [{ type: "Long", name: "teamId" }, { type: "String", name: "from" }, { type: "String", name: "ps" }] }, syncTeams: { sid: 8, cid: 109, service: "team", response: [{ type: "Number", name: "timetag" }, { type: "PropertyArray", name: "teams", reflectMapper: _s.team }] }, syncCreateTeam: { sid: 8, cid: 101, service: "team", response: [{ type: "Property", name: "team", reflectMapper: _s.team }] }, syncUpdateTeamMember: { sid: 8, cid: 119, service: "team", response: [{ type: "Property", name: "teamMember", reflectMapper: _s.teamMember }] }, syncMyTeamMembers: { sid: 8, cid: 126, ext: "sync", service: "team", response: [{ type: "PropertyArray", name: "teamMembers", entity: "teamMember", reflectMapper: _s.teamMember }, { type: "Number", name: "timetag" }] } }, Ps = { "3_7": "getUsersNameCardFromServer", "3_10": "updateMyNameCard", "3_109": "syncMyNameCard", "3_110": "onUpdateMyNameCard", "3_3": "setBlack", "3_103": "onUpdateBlackList", "3_5": "setMute", "3_105": "onUpdateMuteList", "3_8": "syncRelations" }, As = { user: { account: 1, nick: 3, avatar: 4, signature: 5, gender: 6, email: 7, birth: 8, tel: 9, ext: 10, createTime: 12, updateTime: 13 }, relationMember: { account: 0, isMuted: 1, isBlack: 2, createTime: 3, updateTime: 4 } }, xs = invertSerializeMap(As), js = { syncMyNameCard: { sid: 3, cid: 109, service: "user", response: [{ type: "Property", name: "user", reflectMapper: xs.user }, { type: "Number", name: "timetag" }] }, setBlack: { service: "user", sid: 3, cid: 3, params: [{ type: "String", name: "account" }, { type: "bool", name: "isAdd" }] }, onUpdateBlackList: { service: "user", sid: 3, cid: 103, response: [{ type: "String", name: "account" }, { type: "Boolean", name: "isAdd" }] }, setMute: { service: "user", sid: 3, cid: 5, params: [{ type: "String", name: "account" }, { type: "bool", name: "isAdd" }] }, onUpdateMuteList: { service: "user", sid: 3, cid: 105, response: [{ type: "String", name: "account" }, { type: "Boolean", name: "isAdd" }] }, syncRelations: { service: "user", sid: 3, cid: 8, params: [{ type: "long", name: "timetag" }], response: [{ type: "PropertyArray", name: "list", reflectMapper: xs.relationMember }, { type: "Number", name: "timetag" }] }, getUsersNameCardFromServer: { service: "user", sid: 3, cid: 7, params: [{ type: "StrArray", name: "accounts" }], response: [{ type: "PropertyArray", name: "users", reflectMapper: xs.user }] }, updateMyNameCard: { service: "user", sid: 3, cid: 10, params: [{ type: "Property", name: "user", reflectMapper: As.user }], response: [{ type: "Number", name: "timetag" }] }, onUpdateMyNameCard: { service: "user", sid: 3, cid: 110, response: [{ type: "Property", name: "user", reflectMapper: xs.user }] } }, Os = { needPush: { type: "boolean", required: false }, needPushBadge: { type: "boolean", required: false }, needPushNick: { type: "boolean", required: false }, pushContent: { type: "string", required: false }, pushPayload: { type: "string", required: false }, needForcePush: { type: "boolean", required: false }, forcePushIDsList: { type: "string", allowEmpty: false, required: false }, forcePushContent: { type: "string", allowEmpty: false, required: false } }, Rs = { function: { type: "string", required: false }, topic: { type: "string", required: false }, customContent: { type: "string", required: false }, account: { type: "string", required: false } }, Fs = { subType: { type: "string" }, setting: { resendFlag: { type: "boolean" }, envConfig: { type: "string" }, needSaveHistory: { type: "boolean" }, needRoaming: { type: "boolean" }, needOffline: { type: "boolean" }, needSelfSync: { type: "boolean" }, needRouted: { type: "boolean" }, needUpdateSession: { type: "boolean" }, isMuted: { type: "boolean" } }, antiSpamInfo: { needAntiSpam: { type: "boolean" }, antiSpamContent: { type: "string" }, antiSpamBIZID: { type: "string" }, clientAntispamHitting: { type: "boolean" }, antiSpamUsingYidun: { type: "boolean" }, yidunCallbackURL: { type: "string" }, yidunAntiCheating: { type: "string" }, yidunAntiSpamExtension: { type: "string" }, yidunAntiSpamResult: { type: "string" } }, pushInfo: Os, robotInfo: Rs, teamSpecializationInfo: { needACK: { type: "boolean" }, isACKSent: { type: "boolean" }, ackSnapshot: { type: "number" } }, threadMessageInfo: { replyMsgFromAccount: { type: "string" }, replyMsgToAccount: { type: "string" }, replyMsgTime: { type: "number" }, replyMsgIdServer: { type: "string" }, replyMsgIdClient: { type: "string" }, threadMsgFromAccount: { type: "string" }, threadMsgToAccount: { type: "string" }, threadMsgTime: { type: "number" }, threadMsgIdServer: { type: "string" }, threadMsgIdClient: { type: "string" } } }, Ns = { 0: "addTeamMembers", 1: "removeTeamMembers", 2: "leaveTeam", 3: "updateTeam", 4: "dismissTeam", 5: "passTeamApply", 6: "transferTeam", 7: "addTeamManagers", 8: "removeTeamManagers", 9: "acceptTeamInvite", 10: "updateTeamMemberMute", 101: "netcallMiss", 102: "netcallBill", 103: "netcallReject", 401: "addSuperTeamMembers", 402: "removeSuperTeamMembers", 403: "leaveSuperTeam", 404: "updateSuperTeam", 405: "dismissSuperTeam", 406: "transferSuperTeam", 407: "addSuperTeamManagers", 408: "removeSuperTeamManagers", 409: "updateSuperTeamMembersMute", 410: "passSuperTeamApply", 411: "acceptSuperTeamInvite" };
      function getSessionId(e2, t2) {
        return `${Fe[e2.scene]}-${e2.to === t2 ? e2.from : e2.to}`;
      }
      function msgFlow(e2, t2) {
        return e2.from === t2 ? e2.to === t2 ? "in" : "out" : "in";
      }
      function formatMsg(e2, t2) {
        const { account: r2, featureValue: s2, statusValue: i2, sessionAck: n2, msgReceiptTime: o2 } = t2, a2 = Fe[e2.scene], c2 = e2.to === r2 ? e2.from : e2.to, d2 = Ue.default;
        let m2 = Le.unread;
        parseInt(e2.isInBlackList) > 0 ? (m2 = Le.refused, delete e2.isInBlackList) : m2 = e2.from === r2 ? o2 && o2 >= +e2.time ? Le.receipt : Le.sent : n2 && n2 >= +e2.time ? Le.read : Le.unread;
        const l2 = Object.assign(Object.assign({}, format(Fs, e2)), { scene: a2, type: Re[e2.type], fromClientType: Ne[e2.fromClientType], flow: msgFlow(e2, r2), target: c2, to: e2.to, from: e2.from, time: e2.time ? +e2.time : void 0, userUpdateTime: e2.userUpdateTime ? +e2.userUpdateTime : void 0, idClient: e2.idClient, sessionId: `${a2}-${c2}`, status: Le[i2 || m2], feature: Ue[s2 || d2] });
        if ("string" == typeof l2.attach)
          try {
            l2.attach = JSON.parse(l2.attach);
          } catch (e3) {
          }
        return "notification" === l2.type && (l2.attach = l2.attach ? function formatNotificationAttach(e3) {
          const t3 = {};
          if (t3.type = Ns[e3.id] || e3.id, !e3.data)
            return t3;
          const r3 = { ids: "accounts", id: "account", attach: "custom", channel: "channelId", calltype: "netcallType", mute: "mute", duration: "duration", time: "time", from: "from", ext: "ext" }, s3 = e3.data;
          return Object.keys(r3).forEach((e4) => {
            void 0 !== s3[e4] && (t3[r3[e4]] = s3[e4]);
          }), s3.tinfo && (t3.team = formatTeam(deserialize(s3.tinfo, _s.team))), s3.uinfos && (t3.users = s3.uinfos.map((e4) => formatUser(deserialize(e4, xs.user)))), void 0 !== s3.mute && (t3.mute = 1 === parseInt(s3.mute)), t3;
        }(l2.attach) : {}), l2;
      }
      function formatMsgs(e2, t2) {
        return e2 && e2.length > 0 ? removeDupMsgsByIdClient(e2.map((e3) => formatMsg(e3, t2))) : [];
      }
      function removeDupMsgsByIdClient(e2) {
        const t2 = {};
        for (const r2 of e2) {
          const e3 = t2[r2.idClient];
          e3 && e3.time > r2.time || (t2[r2.idClient] = r2);
        }
        return Object.keys(t2).map((e3) => t2[e3]);
      }
      function processPushInfoInMsg(e2, t2 = true) {
        const r2 = Object.assign({}, e2);
        if (r2.pushInfo && t2) {
          for (const e3 in r2.pushInfo)
            "boolean" == typeof r2.pushInfo[e3] ? r2[e3] = r2.pushInfo[e3] ? 1 : 0 : r2[e3] = r2.pushInfo[e3];
          delete r2.pushInfo;
        }
        return r2.scene === Fe.team && r2.needForcePush && (r2.forcePushContent = r2.forcePushContent || r2.pushContent, r2.forcePushIDsList = r2.forcePushIDsList ? r2.forcePushIDsList : "#%@all@%#"), r2;
      }
      function formatDeletedMsgs(e2, t2) {
        return e2.map((e3) => {
          let r2;
          return r2 = t2 || (Number.isNaN(parseInt(e3.scene)) ? e3.scene : 1 === parseInt(e3.scene) ? "p2p" : "team"), { deletedTime: parseInt(e3.time), from: e3.from, idClient: e3.deletedIdClient || e3.idClient, idServer: e3.deletedIdServer || e3.idServer, scene: r2, time: parseInt(e3.deletedMsgCreateTime), to: e3.to, ext: "string" == typeof e3.ext ? e3.ext : null };
        });
      }
      var Ls = Array.prototype.reverse;
      var Us = function reverse(e2) {
        return null == e2 ? e2 : Ls.call(e2);
      };
      class ModuleService$2 {
        constructor(e2) {
          this.core = e2;
        }
        processBroadcastMsg(e2) {
          const t2 = e2.map((e3) => Object.assign(Object.assign({}, e3), { time: parseInt(e3.time) }));
          return this.core.sendCmd("batchMarkRead", { sid: 7, cid: 17, ids: t2.map((e3) => e3.id) }), t2;
        }
      }
      const qs = { needPush: { type: "boolean", required: false }, needPushBadge: { type: "boolean", required: false }, needPushNick: { type: "boolean", required: false }, pushContent: { type: "string", allowEmpty: false, required: false }, pushPayload: { type: "string", allowEmpty: false, required: false } }, Ds = { pushContent: 8, pushPayload: 9, needPush: 107, needPushBadge: 109, needPushNick: 110 }, Bs = { "4_4": "syncOfflineMsgs", "4_9": "syncRoamingMsgs", "4_17": "syncRoamingMsgs", "4_21": "syncDeleteSelfMsgs", "7_1": "sendMsg", "8_23": "getHistoryTeamMsgs", "21_14": "getHistorySuperTeamMsgs", "8_2": "sendTeamMsg", "21_2": "sendSuperTeamMsg", "7_11": "sendMsgReceipt", "7_13": "recallMsg", "7_24": "deleteSelfMsgs", "21_17": "recallSuperTeamMsg", "7_2": "onMsg", "8_3": "onMsg", "21_3": "onMsg", "7_101": "onMsg", "8_102": "onMsg", "21_102": "onMsg", "8_4": "nimOnTeamMsgs", "4_16": "syncBroadcastMsg", "7_17": "onBroadcastMsg", "7_123": "onDeleteSelfMsg", "7_124": "onDeleteSelfMsgs" }, Hs = Object.assign(Object.assign({ scene: 0, to: 1, from: 2, fromClientType: 4, fromDeviceId: 5, fromNick: 6, time: 7, type: 8, body: 9, attach: 10, idClient: 11, idServer: 12, resendFlag: 13, userUpdateTime: 14, ext: 15, needAntiSpam: 21, antiSpamContent: 22, antiSpamBIZID: 23, clientAntispamHitting: 24, antiSpamUsingYidun: 25, needACK: 26, yidunCallbackURL: 27, needUpdateSession: 28, replyMsgFromAccount: 29, replyMsgToAccount: 30, replyMsgTime: 31, replyMsgIdServer: 32, replyMsgIdClient: 33, threadMsgFromAccount: 34, threadMsgToAccount: 35, threadMsgTime: 36, threadMsgIdServer: 37, threadMsgIdClient: 38, isDeleted: 39, callbackExt: 40, subType: 41, yidunAntiCheating: 42, envConfig: 43, yidunAntiSpamExtension: 44, yidunAntiSpamResult: 45, needSaveHistory: 100, needRoaming: 101, needSelfSync: 102, isMuted: 104, needRouted: 105, isInBlackList: 106, needOffline: 108, isReplyMsg: 111, ackSnapshot: 112 }, { pushContent: 17, pushPayload: 16, forcePushIDsList: 18, forcePushContent: 19, needForcePush: 20, needPush: 107, needPushBadge: 109, needPushNick: 110 }), { function: 47, topic: 48, customContent: 49, account: 50 }), $s = { msg: Hs, recallMsgTag: Object.assign({ time: 0, type: 1, to: 2, from: 3, ps: 4, attach: 5, deletedIdClient: 10, deletedIdServer: 11, opeAccount: 16, env: 21 }, Ds), deleteSelfMsgTag: { scene: 1, from: 2, to: 3, idServer: 4, idClient: 5, deletedMsgCreateTime: 6, time: 7, ext: 8 }, msgReceiptTag: { to: 1, from: 2, time: 7, idClient: 11 }, broadcastMsg: { id: 1, fromAccid: 2, time: 4, body: 5 } }, zs = invertSerializeMap($s), Vs = { sendMsg: { sid: 7, cid: 1, service: "msg", params: [{ type: "Property", name: "msg", reflectMapper: $s.msg }], response: [{ type: "Property", name: "msg", reflectMapper: zs.msg }], ignoreErrCodes: [7101] }, sendTeamMsg: { sid: 8, cid: 2, service: "msg", params: [{ type: "Property", name: "msg", reflectMapper: $s.msg }], response: [{ type: "Property", name: "msg", reflectMapper: zs.msg }] }, sendSuperTeamMsg: { sid: 21, cid: 2, service: "msg", params: [{ type: "Property", name: "msg", reflectMapper: $s.msg }], response: [{ type: "Property", name: "msg", reflectMapper: zs.msg }] }, onMsg: { sid: 7, cid: 2, service: "msg", response: [{ type: "Property", name: "msg", reflectMapper: zs.msg }] }, nimOnTeamMsgs: { sid: 8, cid: 4, service: "msg", response: [{ type: "PropertyArray", name: "datas", reflectMapper: zs.msg }] }, getHistoryTeamMsgs: { sid: 8, cid: 23, service: "msg", params: [{ type: "Long", name: "to" }, { type: "Long", name: "beginTime" }, { type: "Long", name: "endTime" }, { type: "Long", name: "lastMsgId" }, { type: "int", name: "limit" }, { type: "bool", name: "reverse" }, { type: "LongArray", name: "msgTypes" }], response: [{ type: "PropertyArray", name: "msgs", reflectMapper: zs.msg }] }, getHistorySuperTeamMsgs: { sid: 21, cid: 14, params: [{ type: "Long", name: "to" }, { type: "Long", name: "beginTime" }, { type: "Long", name: "endTime" }, { type: "Long", name: "lastMsgId" }, { type: "int", name: "limit" }, { type: "bool", name: "reverse" }, { type: "LongArray", name: "msgTypes" }], response: [{ type: "PropertyArray", name: "msgs", reflectMapper: zs.msg }], service: "msg" }, recallMsg: { sid: 7, cid: 13, service: "msg", params: [{ type: "Property", name: "recallMsgTag", reflectMapper: $s.recallMsgTag }] }, deleteSelfMsgs: { sid: 7, cid: 24, service: "msg", params: [{ type: "PropertyArray", name: "deletedMsgs", reflectMapper: $s.deleteSelfMsgTag }], response: [{ type: "Long", name: "timetag" }] }, recallSuperTeamMsg: { sid: 21, cid: 17, service: "msg", params: [{ type: "Property", name: "recallMsgTag", reflectMapper: $s.recallMsgTag }] }, sendMsgReceipt: { sid: 7, cid: 11, service: "msg", params: [{ type: "Property", name: "msgReceiptTag", reflectMapper: $s.msgReceiptTag }], response: [{ type: "Property", name: "msgReceiptTag", reflectMapper: zs.msgReceiptTag }] }, batchMarkRead: { sid: 4, cid: 5, service: "msg", hasPacketResponse: false, params: [{ type: "byte", name: "sid" }, { type: "byte", name: "cid" }, { type: "LongArray", name: "ids" }] }, syncMsgReceipts: { sid: 4, cid: 12, service: "msg", response: [{ type: "PropertyArray", name: "msgReceipts", reflectMapper: zs.msgReceiptTag }, { type: "Number", name: "timetag" }] }, syncOfflineMsgs: { sid: 4, cid: 4, service: "msg", response: [{ type: "PropertyArray", name: "msgs", reflectMapper: zs.msg }] }, syncRoamingMsgs: { sid: 4, cid: 9, service: "msg", response: [{ type: "PropertyArray", name: "msgs", reflectMapper: zs.msg }] }, syncBroadcastMsg: { sid: 4, cid: 16, service: "msg", response: [{ type: "PropertyArray", name: "msgs", reflectMapper: zs.broadcastMsg }] }, onBroadcastMsg: { sid: 7, cid: 17, service: "msg", response: [{ type: "Property", name: "msg", reflectMapper: zs.broadcastMsg }] }, onDeleteSelfMsg: { sid: 7, cid: 123, service: "msg", response: [{ type: "Property", name: "deletedMsg", reflectMapper: zs.deleteSelfMsgTag }] }, onDeleteSelfMsgs: { sid: 7, cid: 124, service: "msg", response: [{ type: "PropertyArray", name: "deletedMsgs", reflectMapper: zs.deleteSelfMsgTag }] }, syncDeleteSelfMsgs: { sid: 4, cid: 21, service: "msg", response: [{ type: "PropertyArray", name: "deletedMsgs", reflectMapper: zs.deleteSelfMsgTag }] } };
      const Gs = { "6_26": "getNosCdnHost" }, Ks = { getNosCdnHost: { sid: 6, cid: 26, service: "misc", response: [{ type: "Property", name: "nosConfigTag", reflectMapper: invertSerializeMap({ nosConfigTag: { bucket: 1, cdnDomain: 2, expire: 3, objectNamePrefix: 4 } }).nosConfigTag }] } };
      var Ws = function baseSet(e2, t2, r2, s2) {
        if (!b(e2))
          return e2;
        for (var i2 = -1, n2 = (t2 = be(t2, e2)).length, o2 = n2 - 1, a2 = e2; null != a2 && ++i2 < n2; ) {
          var c2 = ke(t2[i2]), d2 = r2;
          if ("__proto__" === c2 || "constructor" === c2 || "prototype" === c2)
            return e2;
          if (i2 != o2) {
            var m2 = a2[c2];
            void 0 === (d2 = s2 ? s2(m2, c2, a2) : void 0) && (d2 = b(m2) ? m2 : dt(t2[i2 + 1]) ? [] : {});
          }
          rr(a2, c2, d2), a2 = a2[c2];
        }
        return e2;
      };
      var Js = function basePickBy(e2, t2, r2) {
        for (var s2 = -1, i2 = t2.length, n2 = {}; ++s2 < i2; ) {
          var o2 = t2[s2], a2 = Ce(e2, o2);
          r2(a2, o2) && Ws(n2, be(o2, e2), a2);
        }
        return n2;
      };
      var Ys = function baseHasIn(e2, t2) {
        return null != e2 && t2 in Object(e2);
      };
      var Qs = function hasPath(e2, t2, r2) {
        for (var i2 = -1, n2 = (t2 = be(t2, e2)).length, o2 = false; ++i2 < n2; ) {
          var a2 = ke(t2[i2]);
          if (!(o2 = null != e2 && r2(e2, a2)))
            break;
          e2 = e2[a2];
        }
        return o2 || ++i2 != n2 ? o2 : !!(n2 = null == e2 ? 0 : e2.length) && mt(n2) && dt(a2, n2) && (s(e2) || nt(e2));
      };
      var Xs = function hasIn(e2, t2) {
        return null != e2 && Qs(e2, t2, Ys);
      };
      var Zs = function basePick(e2, t2) {
        return Js(e2, t2, function(t3, r2) {
          return Xs(e2, r2);
        });
      };
      var ei = function arrayPush(e2, t2) {
        for (var r2 = -1, s2 = t2.length, i2 = e2.length; ++r2 < s2; )
          e2[i2 + r2] = t2[r2];
        return e2;
      }, ti = a ? a.isConcatSpreadable : void 0;
      var ri = function isFlattenable(e2) {
        return s(e2) || nt(e2) || !!(ti && e2 && e2[ti]);
      };
      var si = function baseFlatten(e2, t2, r2, s2, i2) {
        var n2 = -1, o2 = e2.length;
        for (r2 || (r2 = ri), i2 || (i2 = []); ++n2 < o2; ) {
          var a2 = e2[n2];
          t2 > 0 && r2(a2) ? t2 > 1 ? baseFlatten(a2, t2 - 1, r2, s2, i2) : ei(i2, a2) : s2 || (i2[i2.length] = a2);
        }
        return i2;
      };
      var ii = function flatten(e2) {
        return (null == e2 ? 0 : e2.length) ? si(e2, 1) : [];
      };
      var ni = function flatRest(e2) {
        return fr(ur(e2, void 0, ii), e2 + "");
      }(function(e2, t2) {
        return null == e2 ? {} : Zs(e2, t2);
      });
      var oi = function arraySome(e2, t2) {
        for (var r2 = -1, s2 = null == e2 ? 0 : e2.length; ++r2 < s2; )
          if (t2(e2[r2], r2, e2))
            return true;
        return false;
      };
      var ai = function equalArrays(e2, t2, r2, s2, i2, n2) {
        var o2 = 1 & r2, a2 = e2.length, c2 = t2.length;
        if (a2 != c2 && !(o2 && c2 > a2))
          return false;
        var d2 = n2.get(e2), m2 = n2.get(t2);
        if (d2 && m2)
          return d2 == t2 && m2 == e2;
        var l2 = -1, p2 = true, u2 = 2 & r2 ? new Er() : void 0;
        for (n2.set(e2, t2), n2.set(t2, e2); ++l2 < a2; ) {
          var g2 = e2[l2], y2 = t2[l2];
          if (s2)
            var h2 = o2 ? s2(y2, g2, l2, t2, e2, n2) : s2(g2, y2, l2, e2, t2, n2);
          if (void 0 !== h2) {
            if (h2)
              continue;
            p2 = false;
            break;
          }
          if (u2) {
            if (!oi(t2, function(e3, t3) {
              if (!Fr(u2, t3) && (g2 === e3 || i2(g2, e3, r2, s2, n2)))
                return u2.push(t3);
            })) {
              p2 = false;
              break;
            }
          } else if (g2 !== y2 && !i2(g2, y2, r2, s2, n2)) {
            p2 = false;
            break;
          }
        }
        return n2.delete(e2), n2.delete(t2), p2;
      };
      var ci = function mapToArray(e2) {
        var t2 = -1, r2 = Array(e2.size);
        return e2.forEach(function(e3, s2) {
          r2[++t2] = [s2, e3];
        }), r2;
      }, di = a ? a.prototype : void 0, mi = di ? di.valueOf : void 0;
      var li = function equalByTag(e2, t2, r2, s2, i2, n2, o2) {
        switch (r2) {
          case "[object DataView]":
            if (e2.byteLength != t2.byteLength || e2.byteOffset != t2.byteOffset)
              return false;
            e2 = e2.buffer, t2 = t2.buffer;
          case "[object ArrayBuffer]":
            return !(e2.byteLength != t2.byteLength || !n2(new Gt(e2), new Gt(t2)));
          case "[object Boolean]":
          case "[object Date]":
          case "[object Number]":
            return Y(+e2, +t2);
          case "[object Error]":
            return e2.name == t2.name && e2.message == t2.message;
          case "[object RegExp]":
          case "[object String]":
            return e2 == t2 + "";
          case "[object Map]":
            var a2 = ci;
          case "[object Set]":
            var c2 = 1 & s2;
            if (a2 || (a2 = Ur), e2.size != t2.size && !c2)
              return false;
            var d2 = o2.get(e2);
            if (d2)
              return d2 == t2;
            s2 |= 2, o2.set(e2, t2);
            var m2 = ai(a2(e2), a2(t2), s2, i2, n2, o2);
            return o2.delete(e2), m2;
          case "[object Symbol]":
            if (mi)
              return mi.call(e2) == mi.call(t2);
        }
        return false;
      };
      var pi = function baseGetAllKeys(e2, t2, r2) {
        var i2 = t2(e2);
        return s(e2) ? i2 : ei(i2, r2(e2));
      };
      var ui = function arrayFilter(e2, t2) {
        for (var r2 = -1, s2 = null == e2 ? 0 : e2.length, i2 = 0, n2 = []; ++r2 < s2; ) {
          var o2 = e2[r2];
          t2(o2, r2, e2) && (n2[i2++] = o2);
        }
        return n2;
      };
      var gi = function stubArray() {
        return [];
      }, yi = Object.prototype.propertyIsEnumerable, hi = Object.getOwnPropertySymbols, fi = hi ? function(e2) {
        return null == e2 ? [] : (e2 = Object(e2), ui(hi(e2), function(t2) {
          return yi.call(e2, t2);
        }));
      } : gi;
      var vi = function getAllKeys(e2) {
        return pi(e2, It, fi);
      }, Si = Object.prototype.hasOwnProperty;
      var Ti = function equalObjects(e2, t2, r2, s2, i2, n2) {
        var o2 = 1 & r2, a2 = vi(e2), c2 = a2.length;
        if (c2 != vi(t2).length && !o2)
          return false;
        for (var d2 = c2; d2--; ) {
          var m2 = a2[d2];
          if (!(o2 ? m2 in t2 : Si.call(t2, m2)))
            return false;
        }
        var l2 = n2.get(e2), p2 = n2.get(t2);
        if (l2 && p2)
          return l2 == t2 && p2 == e2;
        var u2 = true;
        n2.set(e2, t2), n2.set(t2, e2);
        for (var g2 = o2; ++d2 < c2; ) {
          var y2 = e2[m2 = a2[d2]], h2 = t2[m2];
          if (s2)
            var f2 = o2 ? s2(h2, y2, m2, t2, e2, n2) : s2(y2, h2, m2, e2, t2, n2);
          if (!(void 0 === f2 ? y2 === h2 || i2(y2, h2, r2, s2, n2) : f2)) {
            u2 = false;
            break;
          }
          g2 || (g2 = "constructor" == m2);
        }
        if (u2 && !g2) {
          var v2 = e2.constructor, S2 = t2.constructor;
          v2 == S2 || !("constructor" in e2) || !("constructor" in t2) || "function" == typeof v2 && v2 instanceof v2 && "function" == typeof S2 && S2 instanceof S2 || (u2 = false);
        }
        return n2.delete(e2), n2.delete(t2), u2;
      }, Mi = q(o, "DataView"), bi = q(o, "Promise"), ki = q(o, "WeakMap"), Ci = "[object Map]", Ii = "[object Promise]", wi = "[object Set]", _i = "[object WeakMap]", Ei = "[object DataView]", Pi = P(Mi), Ai = P(ie), xi = P(bi), ji = P(Nr), Oi = P(ki), Ri = h;
      (Mi && Ri(new Mi(new ArrayBuffer(1))) != Ei || ie && Ri(new ie()) != Ci || bi && Ri(bi.resolve()) != Ii || Nr && Ri(new Nr()) != wi || ki && Ri(new ki()) != _i) && (Ri = function(e2) {
        var t2 = h(e2), r2 = "[object Object]" == t2 ? e2.constructor : void 0, s2 = r2 ? P(r2) : "";
        if (s2)
          switch (s2) {
            case Pi:
              return Ei;
            case Ai:
              return Ci;
            case xi:
              return Ii;
            case ji:
              return wi;
            case Oi:
              return _i;
          }
        return t2;
      });
      var Fi = Ri, Ni = "[object Arguments]", Li = "[object Array]", Ui = "[object Object]", qi = Object.prototype.hasOwnProperty;
      var Di = function baseIsEqualDeep(e2, t2, r2, i2, n2, o2) {
        var a2 = s(e2), c2 = s(t2), d2 = a2 ? Li : Fi(e2), m2 = c2 ? Li : Fi(t2), l2 = (d2 = d2 == Ni ? Ui : d2) == Ui, p2 = (m2 = m2 == Ni ? Ui : m2) == Ui, u2 = d2 == m2;
        if (u2 && at(e2)) {
          if (!at(t2))
            return false;
          a2 = true, l2 = false;
        }
        if (u2 && !l2)
          return o2 || (o2 = new Bt()), a2 || ht(e2) ? ai(e2, t2, r2, i2, n2, o2) : li(e2, t2, d2, r2, i2, n2, o2);
        if (!(1 & r2)) {
          var g2 = l2 && qi.call(e2, "__wrapped__"), y2 = p2 && qi.call(t2, "__wrapped__");
          if (g2 || y2) {
            var h2 = g2 ? e2.value() : e2, f2 = y2 ? t2.value() : t2;
            return o2 || (o2 = new Bt()), n2(h2, f2, r2, i2, o2);
          }
        }
        return !!u2 && (o2 || (o2 = new Bt()), Ti(e2, t2, r2, i2, n2, o2));
      };
      var Bi = function baseIsEqual(e2, t2, r2, s2, i2) {
        return e2 === t2 || (null == e2 || null == t2 || !f(e2) && !f(t2) ? e2 != e2 && t2 != t2 : Di(e2, t2, r2, s2, baseIsEqual, i2));
      };
      var Hi = function baseIsMatch(e2, t2, r2, s2) {
        var i2 = r2.length, n2 = i2, o2 = !s2;
        if (null == e2)
          return !n2;
        for (e2 = Object(e2); i2--; ) {
          var a2 = r2[i2];
          if (o2 && a2[2] ? a2[1] !== e2[a2[0]] : !(a2[0] in e2))
            return false;
        }
        for (; ++i2 < n2; ) {
          var c2 = (a2 = r2[i2])[0], d2 = e2[c2], m2 = a2[1];
          if (o2 && a2[2]) {
            if (void 0 === d2 && !(c2 in e2))
              return false;
          } else {
            var l2 = new Bt();
            if (s2)
              var p2 = s2(d2, m2, c2, e2, t2, l2);
            if (!(void 0 === p2 ? Bi(m2, d2, 3, s2, l2) : p2))
              return false;
          }
        }
        return true;
      };
      var $i = function isStrictComparable(e2) {
        return e2 == e2 && !b(e2);
      };
      var zi = function getMatchData(e2) {
        for (var t2 = It(e2), r2 = t2.length; r2--; ) {
          var s2 = t2[r2], i2 = e2[s2];
          t2[r2] = [s2, i2, $i(i2)];
        }
        return t2;
      };
      var Vi = function matchesStrictComparable(e2, t2) {
        return function(r2) {
          return null != r2 && (r2[e2] === t2 && (void 0 !== t2 || e2 in Object(r2)));
        };
      };
      var Gi = function baseMatches(e2) {
        var t2 = zi(e2);
        return 1 == t2.length && t2[0][2] ? Vi(t2[0][0], t2[0][1]) : function(r2) {
          return r2 === e2 || Hi(r2, e2, t2);
        };
      };
      var Ki = function baseMatchesProperty(e2, t2) {
        return M(e2) && $i(t2) ? Vi(ke(e2), t2) : function(r2) {
          var s2 = Ie(r2, e2);
          return void 0 === s2 && s2 === t2 ? Xs(r2, e2) : Bi(t2, s2, 3);
        };
      };
      var Wi = function baseProperty(e2) {
        return function(t2) {
          return null == t2 ? void 0 : t2[e2];
        };
      };
      var Ji = function basePropertyDeep(e2) {
        return function(t2) {
          return Ce(t2, e2);
        };
      };
      var Yi = function property(e2) {
        return M(e2) ? Wi(ke(e2)) : Ji(e2);
      };
      var Qi = function baseIteratee(e2) {
        return "function" == typeof e2 ? e2 : null == e2 ? Pt : "object" == typeof e2 ? s(e2) ? Ki(e2[0], e2[1]) : Gi(e2) : Yi(e2);
      }, Xi = /\s/;
      var Zi = function trimmedEndIndex(e2) {
        for (var t2 = e2.length; t2-- && Xi.test(e2.charAt(t2)); )
          ;
        return t2;
      }, en = /^\s+/;
      var tn = function baseTrim(e2) {
        return e2 ? e2.slice(0, Zi(e2) + 1).replace(en, "") : e2;
      }, rn = /^[-+]0x[0-9a-f]+$/i, sn = /^0b[01]+$/i, nn = /^0o[0-7]+$/i, an = parseInt;
      var cn = function toNumber(e2) {
        if ("number" == typeof e2)
          return e2;
        if (v(e2))
          return NaN;
        if (b(e2)) {
          var t2 = "function" == typeof e2.valueOf ? e2.valueOf() : e2;
          e2 = b(t2) ? t2 + "" : t2;
        }
        if ("string" != typeof e2)
          return 0 === e2 ? e2 : +e2;
        e2 = tn(e2);
        var r2 = sn.test(e2);
        return r2 || nn.test(e2) ? an(e2.slice(2), r2 ? 2 : 8) : rn.test(e2) ? NaN : +e2;
      }, dn = 1 / 0;
      var mn = function toFinite(e2) {
        return e2 ? (e2 = cn(e2)) === dn || e2 === -1 / 0 ? 17976931348623157e292 * (e2 < 0 ? -1 : 1) : e2 == e2 ? e2 : 0 : 0 === e2 ? e2 : 0;
      };
      var ln = function toInteger(e2) {
        var t2 = mn(e2), r2 = t2 % 1;
        return t2 == t2 ? r2 ? t2 - r2 : t2 : 0;
      }, pn = Math.max;
      var un = function findIndex(e2, t2, r2) {
        var s2 = null == e2 ? 0 : e2.length;
        if (!s2)
          return -1;
        var i2 = null == r2 ? 0 : ln(r2);
        return i2 < 0 && (i2 = pn(s2 + i2, 0)), Pr(e2, Qi(t2), i2);
      };
      const gn = { "4_12": "syncMsgReceipts", "4_14": "syncSessionAck", "4_20": "syncSuperTeamSessionAck", "4_22": "nimSyncSessionsWithMoreRoaming", "4_25": "syncSessionReliableInfo", "7_12": "multiSyncMsgReceipt", "7_16": "markSessionAck", "7_25": "markMultSessionsAck", "7_116": "syncMarkSessionAck", "21_25": "markSuperTeamSessionAck", "21_32": "markMultSuperTeamSessionsAck", "21_125": "syncMarkSuperTeamSessionAck", "4_23": "nimSyncStickTopSessions", "23_12": "nimAddStickTopSession", "23_13": "nimDeleteStickTopSession", "23_14": "nimUpdateStickTopSession", "23_112": "nimMultiSyncAddStickTopSession", "23_113": "nimMultiSyncDeleteStickTopSession", "23_114": "nimMultiSyncUpdateStickTopSession" }, yn = { msgReceiptTag: { to: 1, from: 2, time: 7, idClient: 11 }, stickTopSessionTag: { id: 1, ext: 2, createTime: 3, updateTime: 4 }, sessionAckTag: { scene: 1, to: 2, timetag: 3 }, sessionReliableSyncTag: { scene: 1, sessionId: 2, syncStatus: 3, syncEndMsgId: 4, syncEndMsgidClient: 5, syncEndMsgTime: 6, syncStartMsgid: 7, syncStartMsgidClient: 8, syncStartMsgTime: 9, nextMsgid: 10, nextMsgidClient: 11, nextMsgTime: 12, roamMsgSync: 13, offlineMsgSync: 14, netCallOfflineMsgSync: 15 } }, hn = invertSerializeMap(yn), fn = { syncMsgReceipts: { sid: 4, cid: 12, service: "session", response: [{ type: "PropertyArray", name: "msgReceipts", reflectMapper: hn.msgReceiptTag }, { type: "Number", name: "timetag" }] }, syncSessionAck: { sid: 4, cid: 14, service: "session", response: [{ type: "StrLongMap", name: "p2p" }, { type: "LongLongMap", name: "team" }, { type: "Number", name: "timetag" }] }, syncSuperTeamSessionAck: { sid: 4, cid: 20, service: "session", response: [{ type: "LongLongMap", name: "superTeam" }, { type: "Number", name: "timetag" }] }, multiSyncMsgReceipt: { sid: 7, cid: 12, service: "session", response: [{ type: "Property", name: "msgReceiptTag", reflectMapper: hn.msgReceiptTag }] }, markSessionAck: { sid: 7, cid: 16, service: "session", params: [{ type: "byte", name: "scene" }, { type: "String", name: "to" }, { type: "long", name: "timetag" }] }, syncMarkSessionAck: { sid: 7, cid: 116, service: "session", response: [{ type: "byte", name: "scene" }, { type: "String", name: "to" }, { type: "long", name: "timetag" }] }, syncMarkSuperTeamSessionAck: { sid: 21, cid: 125, service: "session", response: [{ type: "String", name: "to" }, { type: "long", name: "timetag" }] }, markMultSessionsAck: { sid: 7, cid: 25, service: "session", ignoreErrCodes: [700], params: [{ type: "PropertyArray", name: "datas", reflectMapper: yn.sessionAckTag }] }, markSuperTeamSessionAck: { sid: 21, cid: 25, service: "session", params: [{ type: "long", name: "to" }, { type: "long", name: "timetag" }] }, nimAddStickTopSession: { sid: 23, cid: 12, service: "session", params: [{ type: "Property", name: "tag", reflectMapper: yn.stickTopSessionTag }], response: [{ type: "Property", name: "data", reflectMapper: hn.stickTopSessionTag }] }, nimDeleteStickTopSession: { sid: 23, cid: 13, service: "session", params: [{ type: "Property", name: "tag", reflectMapper: yn.stickTopSessionTag }], response: [{ type: "Number", name: "timetag" }] }, nimUpdateStickTopSession: { sid: 23, cid: 14, service: "session", params: [{ type: "Property", name: "tag", reflectMapper: yn.stickTopSessionTag }], response: [{ type: "Property", name: "data", reflectMapper: hn.stickTopSessionTag }] }, nimMultiSyncAddStickTopSession: { sid: 23, cid: 112, service: "session", response: [{ type: "Property", name: "data", reflectMapper: hn.stickTopSessionTag }] }, nimMultiSyncDeleteStickTopSession: { sid: 23, cid: 113, service: "session", response: [{ type: "Number", name: "timetag" }, { type: "Property", name: "data", reflectMapper: hn.stickTopSessionTag }] }, nimMultiSyncUpdateStickTopSession: { sid: 23, cid: 114, service: "session", response: [{ type: "Property", name: "data", reflectMapper: hn.stickTopSessionTag }] }, nimSyncStickTopSessions: { sid: 4, cid: 23, service: "session", response: [{ type: "Number", name: "timetag" }, { type: "Boolean", name: "isThereAnyChange" }, { type: "PropertyArray", name: "datas", reflectMapper: hn.stickTopSessionTag }] }, markMultSuperTeamSessionsAck: { sid: 21, cid: 32, service: "session", ignoreErrCodes: [700], params: [{ type: "PropertyArray", name: "datas", reflectMapper: yn.sessionAckTag }] }, nimSyncSessionsWithMoreRoaming: { sid: 21, cid: 22, service: "session", response: [{ type: "PropertyArray", name: "datas", reflectMapper: { 0: "scene", 1: "to", 2: "from", 7: "time", 12: "idServer" } }] }, syncSessionReliableInfo: { sid: 4, cid: 25, service: "session", response: [{ type: "Property", name: "context", reflectMapper: { 1: "timetag", 2: "type" } }, { type: "PropertyArray", name: "datas", reflectMapper: hn.sessionReliableSyncTag }] } }, vn = { id: { type: "string" }, ext: { type: "string" }, createTime: { type: "number" }, updateTime: { type: "number" } };
      function formatStickTop(e2, t2, r2 = true) {
        const s2 = format(vn, e2);
        s2.isStickOnTop = r2, s2.id = t2.id;
        const i2 = Object.assign(Object.assign({}, t2), { stickTopInfo: t2.stickTopInfo ? Object.assign({}, t2.stickTopInfo, s2) : s2 });
        return void 0 === i2.lastMsg && (i2.lastMsg = null), i2;
      }
      const Sn = { scene: { type: "enum", values: Fe }, time: { type: "number" } };
      class StickTopService {
        constructor(e2) {
          this.core = e2;
        }
        getSession(e2) {
          return this.core.session.getSessionWithUncomplete({ id: e2 }) || this.core.session.createSession(e2);
        }
        addStickTopSession(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ id: { type: "string", allowEmpty: false }, ext: { type: "string", required: false } }, e2);
            const { scene: t2, accid: r2 } = getAccountFromSessionId(e2.id), s2 = yield this.core.sendCmd("nimAddStickTopSession", { tag: { id: `${"superTeam" === t2 ? "super_team" : t2}|${r2}`, ext: e2.ext } }), i2 = this.getSession(e2.id);
            return formatStickTop(s2.content.data, i2);
          });
        }
        deleteStickTopSession(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ id: { type: "string", allowEmpty: false } }, e2);
            const { scene: t2, accid: r2 } = getAccountFromSessionId(e2.id), s2 = yield this.core.sendCmd("nimDeleteStickTopSession", { tag: { id: `${"superTeam" === t2 ? "super_team" : t2}|${r2}` } }), i2 = this.getSession(e2.id);
            return formatStickTop({ updateTime: s2.content.timetag }, i2, false);
          });
        }
        updateStickTopSession(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ id: { type: "string", allowEmpty: false }, ext: { type: "string", required: false } }, e2);
            const { scene: t2, accid: r2 } = getAccountFromSessionId(e2.id), s2 = yield this.core.sendCmd("nimUpdateStickTopSession", { tag: { id: `${"superTeam" === t2 ? "super_team" : t2}|${r2}`, ext: e2.ext } }), i2 = this.getSession(e2.id);
            return formatStickTop(s2.content.data, i2);
          });
        }
        stickTopSessionHandler(e2, t2 = true) {
          const { scene: r2, accid: s2 } = getAccountFromSessionId(e2.id, "|"), i2 = `${r2}-${s2}`;
          return formatStickTop(e2, this.getSession(i2), t2);
        }
      }
      class UnreadModuleService {
        constructor(e2) {
          this.core = e2, this.logger = e2.logger;
        }
        canSessionResetUnreadCount(e2) {
          const t2 = e2.id;
          if (void 0 === e2.lastMsg)
            throw new Error(`Session::canSessionResetUnreadCount: session ${t2} is not completly, lastMsg undefined`);
          return null !== e2.lastMsg || e2.unread > 0 ? !(e2.ack && e2.lastMsg && e2.ack >= e2.lastMsg.time) || (this.logger.log(`Session::canSessionResetUnreadCount: session ${t2} reset failed, ack time is greater than last message time`), false) : (this.logger.log(`Session::canSessionResetUnreadCount: session ${t2} doesn't need to be updated, lastMsg null and unread 0`), false);
        }
        filterSessionForResetUnreadCount(e2) {
          const t2 = { cmd: "markMultSuperTeamSessionsAck", params: [] }, r2 = { cmd: "markMultSessionsAck", params: [] };
          return e2.forEach((e3) => {
            var s2;
            let i2 = false;
            try {
              if (i2 = this.canSessionResetUnreadCount(e3), !i2)
                return;
              const { accid: n2, scene: o2 } = getAccountFromSessionId(e3.id), a2 = { to: n2, sessionId: e3.id, timetag: (null === (s2 = null == e3 ? void 0 : e3.lastMsg) || void 0 === s2 ? void 0 : s2.time) || e3.updateTime || 0 }, c2 = function generateSceneForCmd(e4) {
                return formatReverse({ scene: { type: "enum", values: Fe } }, e4);
              }({ scene: o2 });
              "superTeam" === o2 ? t2.params.push(a2) : r2.params.push(Object.assign(Object.assign({}, a2), c2));
            } catch (e4) {
              this.logger.warn(e4);
            }
          }), { superTeam: t2, p2pOrTeam: r2 };
        }
      }
      var Tn = function baseSlice(e2, t2, r2) {
        var s2 = -1, i2 = e2.length;
        t2 < 0 && (t2 = -t2 > i2 ? 0 : i2 + t2), (r2 = r2 > i2 ? i2 : r2) < 0 && (r2 += i2), i2 = t2 > r2 ? 0 : r2 - t2 >>> 0, t2 >>>= 0;
        for (var n2 = Array(i2); ++s2 < i2; )
          n2[s2] = e2[s2 + t2];
        return n2;
      }, Mn = Math.ceil, bn = Math.max;
      var kn = function chunk(e2, t2, r2) {
        t2 = (r2 ? Sr(e2, t2, r2) : void 0 === t2) ? 1 : bn(ln(t2), 0);
        var s2 = null == e2 ? 0 : e2.length;
        if (!s2 || t2 < 1)
          return [];
        for (var i2 = 0, n2 = 0, o2 = Array(Mn(s2 / t2)); i2 < s2; )
          o2[n2++] = Tn(e2, i2, i2 += t2);
        return o2;
      };
      class ModuleService$1 {
        constructor(e2) {
          this.core = e2;
        }
        notifyAddTeamMembers(e2, t2) {
          this.core.emit("addTeamMembers", { team: e2, accounts: t2, members: generatorMembersByTeam(e2, t2) });
        }
        notifyUpdateTeamManagers(e2, t2, r2, s2) {
          this.core.emit("updateTeamManagers", { team: { teamId: e2, memberUpdateTime: s2 }, accounts: t2, isManager: r2, members: t2.map((t3) => ({ id: `${e2}-${t3}`, account: t3, type: "manager", updateTime: s2 })) });
        }
        notifyRemoveTeamMembers(e2, t2) {
          this.core.emit("removeTeamMembers", { team: e2, accounts: t2 });
        }
        notifyTransferTeam(e2, t2, r2) {
          this.core.emit("transferTeam", { team: e2, from: { id: `${e2.teamId}-${t2}`, type: "normal", account: t2, updateTime: e2.memberUpdateTime }, to: { id: `${e2.teamId}-${r2}`, type: "owner", account: r2, updateTime: e2.memberUpdateTime } });
        }
        notifyUpdateTeamMembersMute(e2, t2, r2) {
          this.core.emit("updateTeamMembersMute", { team: e2, accounts: t2, members: t2.map(function(t3) {
            return { id: `${e2.teamId}-${t3}`, account: t3, teamId: e2.teamId, mute: r2, updateTime: e2.memberUpdateTime };
          }), mute: r2 });
        }
      }
      var Cn = function arrayEach(e2, t2) {
        for (var r2 = -1, s2 = null == e2 ? 0 : e2.length; ++r2 < s2 && false !== t2(e2[r2], r2, e2); )
          ;
        return e2;
      };
      var In = function baseAssign(e2, t2) {
        return e2 && sr(t2, It(t2), e2);
      };
      var wn = function baseAssignIn(e2, t2) {
        return e2 && sr(t2, ar(t2), e2);
      };
      var _n = function copySymbols(e2, t2) {
        return sr(e2, fi(e2), t2);
      }, En = Object.getOwnPropertySymbols ? function(e2) {
        for (var t2 = []; e2; )
          ei(t2, fi(e2)), e2 = De(e2);
        return t2;
      } : gi;
      var Pn = function copySymbolsIn(e2, t2) {
        return sr(e2, En(e2), t2);
      };
      var An = function getAllKeysIn(e2) {
        return pi(e2, ar, En);
      }, xn = Object.prototype.hasOwnProperty;
      var jn = function initCloneArray(e2) {
        var t2 = e2.length, r2 = new e2.constructor(t2);
        return t2 && "string" == typeof e2[0] && xn.call(e2, "index") && (r2.index = e2.index, r2.input = e2.input), r2;
      };
      var On = function cloneDataView(e2, t2) {
        var r2 = t2 ? Kt(e2.buffer) : e2.buffer;
        return new e2.constructor(r2, e2.byteOffset, e2.byteLength);
      }, Rn = /\w*$/;
      var Fn = function cloneRegExp(e2) {
        var t2 = new e2.constructor(e2.source, Rn.exec(e2));
        return t2.lastIndex = e2.lastIndex, t2;
      }, Nn = a ? a.prototype : void 0, Ln = Nn ? Nn.valueOf : void 0;
      var Un = function cloneSymbol(e2) {
        return Ln ? Object(Ln.call(e2)) : {};
      };
      var qn = function initCloneByTag(e2, t2, r2) {
        var s2 = e2.constructor;
        switch (t2) {
          case "[object ArrayBuffer]":
            return Kt(e2);
          case "[object Boolean]":
          case "[object Date]":
            return new s2(+e2);
          case "[object DataView]":
            return On(e2, r2);
          case "[object Float32Array]":
          case "[object Float64Array]":
          case "[object Int8Array]":
          case "[object Int16Array]":
          case "[object Int32Array]":
          case "[object Uint8Array]":
          case "[object Uint8ClampedArray]":
          case "[object Uint16Array]":
          case "[object Uint32Array]":
            return Wt(e2, r2);
          case "[object Map]":
          case "[object Set]":
            return new s2();
          case "[object Number]":
          case "[object String]":
            return new s2(e2);
          case "[object RegExp]":
            return Fn(e2);
          case "[object Symbol]":
            return Un(e2);
        }
      };
      var Dn = function baseIsMap(e2) {
        return f(e2) && "[object Map]" == Fi(e2);
      }, Bn = gt && gt.isMap, Hn = Bn ? ut(Bn) : Dn;
      var $n = function baseIsSet(e2) {
        return f(e2) && "[object Set]" == Fi(e2);
      }, zn = gt && gt.isSet, Vn = zn ? ut(zn) : $n, Gn = "[object Arguments]", Kn = "[object Function]", Wn = "[object Object]", Jn = {};
      Jn[Gn] = Jn["[object Array]"] = Jn["[object ArrayBuffer]"] = Jn["[object DataView]"] = Jn["[object Boolean]"] = Jn["[object Date]"] = Jn["[object Float32Array]"] = Jn["[object Float64Array]"] = Jn["[object Int8Array]"] = Jn["[object Int16Array]"] = Jn["[object Int32Array]"] = Jn["[object Map]"] = Jn["[object Number]"] = Jn[Wn] = Jn["[object RegExp]"] = Jn["[object Set]"] = Jn["[object String]"] = Jn["[object Symbol]"] = Jn["[object Uint8Array]"] = Jn["[object Uint8ClampedArray]"] = Jn["[object Uint16Array]"] = Jn["[object Uint32Array]"] = true, Jn["[object Error]"] = Jn[Kn] = Jn["[object WeakMap]"] = false;
      var Yn = function baseClone(e2, t2, r2, i2, n2, o2) {
        var a2, c2 = 1 & t2, d2 = 2 & t2, m2 = 4 & t2;
        if (r2 && (a2 = n2 ? r2(e2, i2, n2, o2) : r2(e2)), void 0 !== a2)
          return a2;
        if (!b(e2))
          return e2;
        var l2 = s(e2);
        if (l2) {
          if (a2 = jn(e2), !c2)
            return Jt(e2, a2);
        } else {
          var p2 = Fi(e2), u2 = p2 == Kn || "[object GeneratorFunction]" == p2;
          if (at(e2))
            return Vt(e2, c2);
          if (p2 == Wn || p2 == Gn || u2 && !n2) {
            if (a2 = d2 || u2 ? {} : Xt(e2), !c2)
              return d2 ? Pn(e2, wn(a2, e2)) : _n(e2, In(a2, e2));
          } else {
            if (!Jn[p2])
              return n2 ? e2 : {};
            a2 = qn(e2, p2, c2);
          }
        }
        o2 || (o2 = new Bt());
        var g2 = o2.get(e2);
        if (g2)
          return g2;
        o2.set(e2, a2), Vn(e2) ? e2.forEach(function(s2) {
          a2.add(baseClone(s2, t2, r2, s2, e2, o2));
        }) : Hn(e2) && e2.forEach(function(s2, i3) {
          a2.set(i3, baseClone(s2, t2, r2, i3, e2, o2));
        });
        var y2 = l2 ? void 0 : (m2 ? d2 ? An : vi : d2 ? ar : It)(e2);
        return Cn(y2 || e2, function(s2, i3) {
          y2 && (s2 = e2[i3 = s2]), rr(a2, i3, baseClone(s2, t2, r2, i3, e2, o2));
        }), a2;
      };
      var Qn, Xn, Zn = function cloneDeep(e2) {
        return Yn(e2, 5);
      };
      !function(e2) {
        e2[e2.none = 0] = "none", e2[e2.pass = 1] = "pass", e2[e2.decline = 2] = "decline", e2[e2.read = 3] = "read", e2[e2.deleted = 4] = "deleted", e2[e2.invalid = 5] = "invalid";
      }(Qn || (Qn = {})), function(e2) {
        e2[e2.default = 0] = "default", e2[e2.leave = 1] = "leave", e2[e2.roam = 2] = "roam";
      }(Xn || (Xn = {}));
      const eo = { applyTeam: 0, rejectTeamApply: 1, teamInvite: 2, rejectTeamInvite: 3, friendRequest: 5, deleteFriend: 6, recallMsgP2p: 7, recallMsgTeam: 8, recallMsgSuperTeam: 12, deleteMsgP2pOneWay: 13, deleteMsgTeamOneWay: 14, applySuperTeam: 15, rejectSuperTeamApply: 16, superTeamInvite: 17, rejectSuperTeamInvite: 18, customP2p: 100, customTeam: 101, customSuperTeam: 103 }, to = { 1: "addFriend", 2: "applyFriend", 3: "passFriendApply", 4: "rejectFriendApply" };
      const ro = { setting: { needSaveOffline: { type: "boolean" }, isRoutable: { type: "boolean" }, envConfig: { type: "string" } }, antiSpamInfo: { needAntiSpam: { type: "boolean" }, antiSpamContent: { type: "boolean" } }, pushInfo: qs, recallMessageInfo: { idClient: { type: "string", rawKey: "deletedIdClient" }, idServer: { type: "string", rawKey: "deletedIdServer" }, createTime: { type: "number", rawKey: "deletedMsgCreateTime" }, fromNick: { type: "string", rawKey: "deletedMsgFromNick" }, opeAccount: { type: "string" } } };
      function formatSystemMessage(e2, t2, r2) {
        const s2 = +e2.type, i2 = getEnumKeyByEnumValue(eo, s2);
        r2 = r2 || Xn.default;
        const n2 = Object.assign(Object.assign({}, format(ro, e2)), { type: i2, time: +e2.time, to: e2.to, from: e2.from, idServer: e2.idServer, state: Qn[Qn.none], feature: Xn[r2] });
        if ("string" == typeof n2.attach)
          try {
            n2.attach = JSON.parse(n2.attach);
          } catch (e3) {
            t2.error(`formatSystemMessage: ${n2.idServer} parse attach error`, e3 && e3.message);
          }
        return 5 === s2 && n2.attach ? (n2.attach.type = to[+n2.attach.vt], "passFriendApply" === n2.attach.type ? n2.state = Qn[Qn.pass] : "rejectFriendApply" === n2.attach.type && (n2.state = Qn[Qn.decline])) : s2 <= 3 && n2.attach && (n2.attach = function formatTeamAttach(e3) {
          const { attach: t3, tinfo: r3 } = e3, s3 = __rest(e3, ["attach", "tinfo"]);
          return s3.ext = t3, void 0 !== r3 && (s3.team = formatTeam(deserialize(e3.tinfo, _s.team))), s3;
        }(n2.attach)), n2;
      }
      function generatorSysMsgForCmd(e2) {
        const t2 = Object.assign({}, e2);
        return Object.assign(Object.assign({}, formatReverse(ro, t2)), { type: eo[t2.type], to: t2.to, attach: t2.attach });
      }
      const so = { "4_6": "syncOfflineSysMsgs", "4_18": "syncOfflineSysMsgs", "4_19": "syncRecallMsgOfflineAndRoaming", "4_101": "syncOfflineSysMsgs", "7_3": "onSysMsg", "7_7": "sendCustomSysMsg", "7_14": "onRecallMsg", "21_18": "onRecallMsg", "21_117": "onRecallMsg", "7_15": "syncRecallMsgOfflineAndRoaming", "21_19": "onSysMsg", "21_16": "sendSuperTeamCustomSysMsg", "101_3": "onSysMsg", "101_7": "sendFilterCustomSysMsg" }, io = { sysMsg: Object.assign({ time: 0, type: 1, to: 2, from: 3, content: 4, attach: 5, idServer: 6, needSaveOffline: 7, deletedIdClient: 10, deletedIdServer: 11, needcAntiSpam: 12, antiSpamContent: 13, deletedMsgCreateTime: 14, deletedMsgFromNick: 15, opeAccount: 16, envConfig: 21, callbackExt: 22, isRoutable: 105 }, Ds) }, no = invertSerializeMap(io), oo = { onSysMsg: { service: "systemMessage", sid: 7, cid: 3, response: [{ type: "Property", name: "sysMsg", reflectMapper: no.sysMsg }] }, sendCustomSysMsg: { service: "systemMessage", sid: 7, cid: 7, params: [{ type: "Property", name: "sysMsg", reflectMapper: io.sysMsg }] }, sendSuperTeamCustomSysMsg: { service: "systemMessage", sid: 21, cid: 16, params: [{ type: "Property", name: "sysMsg", reflectMapper: io.sysMsg }] }, sendFilterCustomSysMsg: { service: "systemMessage", sid: 101, cid: 7, params: [{ type: "Property", name: "sysMsg", reflectMapper: io.sysMsg }] }, batchMarkRead: { service: "systemMessage", sid: 4, cid: 5, hasPacketResponse: false, params: [{ type: "byte", name: "sid" }, { type: "byte", name: "cid" }, { type: "LongArray", name: "ids" }] }, onRecallMsg: { sid: 7, cid: 14, service: "systemMessage", response: [{ type: "Property", name: "sysMsg", reflectMapper: no.sysMsg }] }, syncRecallMsgOfflineAndRoaming: { sid: 7, cid: 15, service: "systemMessage", response: [{ type: "PropertyArray", name: "sysMsgs", reflectMapper: no.sysMsg }, { type: "Number", name: "timetag" }, { type: "Number", name: "type" }] }, syncOfflineSysMsgs: { sid: 4, cid: 9, service: "systemMessage", response: [{ type: "PropertyArray", name: "sysMsgs", reflectMapper: no.sysMsg }] } };
      function reverseFriend(e2) {
        const t2 = Object.assign({}, e2);
        return ["bitsExtension", "createTime", "updateTime", "passRelationShip", "relationShip", "source"].forEach((e3) => {
          void 0 !== t2[e3] && (t2[e3] = parseInt(t2[e3]));
        }), void 0 !== t2.relationShip && (t2.valid = 1 === t2.relationShip), t2;
      }
      const ao = { 1: "addFriend", 2: "applyFriend", 3: "passFriendApply", 4: "rejectFriendApply" };
      const co = { "12_4": "getFriends", "12_1": "friendReuqest", "12_2": "deleteFriend", "12_3": "updateFriend", "12_5": "syncFriends", "12_6": "syncFriendUsers", "12_101": "syncFriendRequest", "12_102": "syncDeleteFriend", "12_103": "syncUpdateFriend" }, mo = { updateFriendTag: { account: 4, alias: 8, ext: 10 }, delFriendParams: { delAlias: 1 }, friendTag: { account: 4, relationShip: 5, passRelationShip: 6, source: 7, alias: 8, bitsExtension: 9, ext: 10, createTime: 11, updateTime: 12, serverex: 13 }, userTag: { account: 1, nick: 3, avatar: 4, sign: 5, gender: 6, email: 7, birth: 8, tel: 9, ext: 10, createTime: 12, updateTime: 13 } }, lo = invertSerializeMap(mo), po = { getFriends: { sid: 12, cid: 4, service: "friend", params: [{ type: "Long", name: "timetag" }], response: [{ type: "PropertyArray", name: "friends", reflectMapper: lo.friendTag }, { type: "Number", name: "timetag" }] }, friendReuqest: { sid: 12, cid: 1, service: "friend", params: [{ type: "String", name: "account" }, { type: "Byte", name: "type" }, { type: "String", name: "ps" }] }, deleteFriend: { sid: 12, cid: 2, service: "friend", params: [{ type: "String", name: "account" }, { type: "Property", name: "delFriendParams", reflectMapper: mo.delFriendParams }] }, updateFriend: { sid: 12, cid: 3, service: "friend", params: [{ type: "Property", name: "updateFriendTag", reflectMapper: mo.updateFriendTag }] }, syncFriends: { sid: 12, cid: 5, service: "friend", response: [{ type: "PropertyArray", name: "friends", entity: "friendTag", reflectMapper: lo.friendTag }, { type: "Number", name: "timetag" }] }, syncFriendUsers: { sid: 12, cid: 6, service: "friend", response: [{ type: "PropertyArray", name: "users", entity: "userTag", reflectMapper: lo.userTag }, { type: "Number", name: "timetag" }] }, syncFriendRequest: { sid: 12, cid: 101, service: "friend", params: [{ type: "String", name: "account" }, { type: "Number", name: "type" }, { type: "String", name: "ps" }], response: [{ type: "String", name: "account" }, { type: "Number", name: "type" }, { type: "String", name: "ps" }] }, syncDeleteFriend: { sid: 12, cid: 102, service: "friend", response: [{ type: "String", name: "account" }] }, syncUpdateFriend: { sid: 12, cid: 103, service: "friend", response: [{ type: "Property", name: "friend", reflectMapper: lo.friendTag }] } };
      const uo = { 1: "Android", 2: "iOS", 4: "PC", 8: "WindowsPhone", 16: "Web", 32: "Server", 64: "Mac" };
      function formatSubscribes(e2) {
        return e2 && e2.length > 0 ? e2.map((e3) => function formatSubscribe(e4) {
          const t2 = Object.assign({}, e4);
          return ["subscribeTime", "time"].forEach((e5) => {
            t2[e5] && (t2[e5] = parseInt(t2[e5]));
          }), t2;
        }(e3)) : [];
      }
      function formatEvent(e2) {
        if (!e2)
          return e2;
        const { serverExt: t2 } = e2, r2 = __rest(e2, ["serverExt"]);
        if (["time", "type", "value"].forEach((e3) => {
          r2[e3] && (r2[e3] = parseInt(r2[e3]));
        }), r2.clientType && (r2.clientType = uo[r2.clientType] || ""), t2)
          try {
            r2.ext = JSON.parse(t2), "string" == typeof r2.ext[0] && (r2.ext = r2.ext[0]);
          } catch (e3) {
          }
        return r2;
      }
      const go = { "14_1": "publishEvent", "14_2": "pushEvent", "14_3": "subscribeEvent", "14_4": "unSubscribeEventsByAccounts", "14_5": "unSubscribeEventsByType", "14_6": "querySubscribeEventsByAccounts", "14_7": "querySubscribeEventsByType", "14_9": "pushEvents" }, yo = { msgEvent: { type: 1, value: 2, idClient: 3, ext: 4, validTime: 5, broadcastType: 6, sync: 7, validTimeType: 8, durable: 9, time: 10, idServer: 11, clientType: 12, serverConfig: 13, serverExt: 14, appid: 101, account: 103, enableMultiClient: 104, consid: 106 }, msgEventSubscribe: { type: 1, subscribeTime: 2, sync: 3, to: 102, from: 104, time: 105 } }, ho = invertSerializeMap(yo), fo = { publishEvent: { sid: 14, cid: 1, service: "event", params: [{ type: "Property", name: "msgEvent", reflectMapper: yo.msgEvent }], response: [{ type: "Property", name: "msgEvent", reflectMapper: ho.msgEvent }] }, pushEvent: { sid: 14, cid: 2, service: "event", response: [{ type: "Property", name: "msgEvent", reflectMapper: ho.msgEvent }] }, subscribeEvent: { sid: 14, cid: 3, service: "event", params: [{ type: "Property", name: "msgEventSubscribe", reflectMapper: yo.msgEventSubscribe }, { type: "StrArray", name: "accounts" }], response: [{ type: "StrArray", name: "accounts" }] }, unSubscribeEventsByAccounts: { sid: 14, cid: 4, service: "event", params: [{ type: "Property", name: "msgEventSubscribe", reflectMapper: yo.msgEventSubscribe }, { type: "StrArray", name: "accounts" }], response: [{ type: "StrArray", name: "accounts" }] }, unSubscribeEventsByType: { sid: 14, cid: 5, service: "event", params: [{ type: "Property", name: "msgEventSubscribe", reflectMapper: yo.msgEventSubscribe }] }, querySubscribeEventsByAccounts: { sid: 14, cid: 6, service: "event", params: [{ type: "Property", name: "msgEventSubscribe", reflectMapper: yo.msgEventSubscribe }, { type: "StrArray", name: "accounts" }], response: [{ type: "PropertyArray", name: "msgEventSubscribes", reflectMapper: ho.msgEventSubscribe }] }, querySubscribeEventsByType: { sid: 14, cid: 7, service: "event", params: [{ type: "Property", name: "msgEventSubscribe", reflectMapper: yo.msgEventSubscribe }], response: [{ type: "PropertyArray", name: "msgEventSubscribes", reflectMapper: ho.msgEventSubscribe }] }, pushEvents: { sid: 14, cid: 9, service: "event", response: [{ type: "PropertyArray", name: "msgEvents", reflectMapper: ho.msgEvent }] } };
      const vo = { "23_1": "getThreadMsgs", "23_2": "getMsgsByIdServer" }, So = { msg: Hs, threadMsgReq: { beginTime: 1, endTime: 2, lastMsgId: 3, limit: 4, reverse: 5 }, threadMsgsMeta: { total: 1, lastMsgTime: 2 } }, To = invertSerializeMap(So), Mo = { getThreadMsgs: { sid: 23, cid: 1, service: "msgExtend", params: [{ type: "Property", name: "msg", reflectMapper: So.msg }, { type: "Property", name: "threadMsgReq", reflectMapper: So.threadMsgReq }], response: [{ type: "Property", name: "threadMsg", reflectMapper: To.msg }, { type: "Property", name: "threadMsgsMeta", reflectMapper: To.threadMsgsMeta }, { type: "PropertyArray", name: "msgs", reflectMapper: To.msg }] }, getMsgsByIdServer: { sid: 23, cid: 2, service: "msgExtend", params: [{ type: "PropertyArray", name: "reqMsgs", reflectMapper: So.msg }], response: [{ type: "PropertyArray", name: "msgs", reflectMapper: To.msg }] } };
      var bo;
      !function(e2) {
        e2[e2.ASC = 1] = "ASC", e2[e2.DESC = 2] = "DESC";
      }(bo || (bo = {}));
      const ko = { "7_6": "getHistoryMsgs", "7_9": "deleteRoamingMsgs", "4_24": "syncClearServerHistoryMsgs", "7_18": "clearHistoryMsgsFromServer", "7_118": "multiSyncClearServerHistoryMsgs", "7_26": "nimFtsCloudMsgLogsAggWithSession", "7_27": "nimFtsCloudMsgLogs" }, Co = { msg: Hs, clearHistoryMsgsFromServerReqTag: { type: 0, otherAccid: 1, isDeleteRoam: 2, toTid: 3, isSyncSelf: 4, ext: 7 }, clearMsgsParamsWithSync: { type: 0, otherAccid: 1, isDeleteRoam: 2, toTid: 3, isSyncSelf: 4, fromAccid: 5, time: 6, ext: 7 }, ftsReqTag: { keyword: 1, fromTime: 2, toTime: 3, sessionLimit: 4, msglogsLimit: 5, orderRule: 6, p2pSessionList: 7, teamSessionList: 8, senderList: 9, msgTypeList: 10, msgSubTypeList: 11 } }, Io = invertSerializeMap(Co), wo = { deleteRoamingMsgs: { sid: 7, cid: 9, service: "msgLog", params: [{ type: "StrArray", name: "ids" }] }, getHistoryMsgs: { sid: 7, cid: 6, params: [{ type: "String", name: "to" }, { type: "Long", name: "beginTime" }, { type: "Long", name: "endTime" }, { type: "Long", name: "lastMsgId" }, { type: "int", name: "limit" }, { type: "bool", name: "reverse" }, { type: "LongArray", name: "msgTypes" }], response: [{ type: "PropertyArray", name: "msgs", reflectMapper: Io.msg }], service: "msgLog" }, clearHistoryMsgsFromServer: { sid: 7, cid: 18, params: [{ type: "Property", name: "clearHistoryMsgsFromServerReqTag", reflectMapper: Co.clearHistoryMsgsFromServerReqTag }], response: [{ type: "Long", name: "timetag" }], service: "msgLog" }, multiSyncClearServerHistoryMsgs: { sid: 7, cid: 118, response: [{ type: "Property", name: "data", reflectMapper: Io.clearMsgsParamsWithSync }], service: "msgLog" }, syncClearServerHistoryMsgs: { sid: 4, cid: 24, service: "msgLog", response: [{ type: "PropertyArray", name: "datas", reflectMapper: Io.clearMsgsParamsWithSync }] }, nimFtsCloudMsgLogsAggWithSession: { sid: 7, cid: 26, service: "msgLog", params: [{ type: "Property", name: "tag", reflectMapper: Co.ftsReqTag }], response: [{ type: "PropertyArray", name: "datas", reflectMapper: Io.msg }] }, nimFtsCloudMsgLogs: { sid: 7, cid: 27, service: "msgLog", params: [{ type: "Property", name: "tag", reflectMapper: Co.ftsReqTag }], response: [{ type: "PropertyArray", name: "datas", reflectMapper: Io.msg }] } };
      var _o;
      !function(e2) {
        e2[e2.p2p = 1] = "p2p", e2[e2.team = 2] = "team";
      }(_o || (_o = {}));
      const Eo = { type: { type: "enum", values: _o }, isDeleteRoam: { type: "boolean" }, isSyncSelf: { type: "boolean" }, time: { type: "number" } };
      function formatClearResult(e2) {
        const t2 = format(Eo, e2);
        return { sessionId: "p2p" === t2.type ? `p2p-${t2.otherAccid}` : `team-${t2.toTid}`, time: t2.time };
      }
      const Po = { orderRule: { type: "enum", values: bo } };
      const Ao = { "22_1": "requestProxy", "22_2": "onRequestProxy" }, xo = { requestProxyTag: { zone: 1, path: 2, method: 3, header: 4, body: 5 }, requestProxyMsgTag: { from: 1, body: 2, time: 3 } }, jo = invertSerializeMap(xo), Oo = { requestProxy: { sid: 22, cid: 1, service: "passThrough", params: [{ type: "Property", name: "requestProxyTag", reflectMapper: xo.requestProxyTag }], response: [{ type: "Property", name: "requestProxyTag", reflectMapper: jo.requestProxyTag }] }, onRequestProxy: { sid: 22, cid: 2, service: "passThrough", response: [{ type: "Property", name: "proxyMsg", reflectMapper: jo.requestProxyMsgTag }] } };
      var Ro = function pickBy(e2, t2) {
        if (null == e2)
          return {};
        var r2 = fe(An(e2), function(e3) {
          return [e3];
        });
        return t2 = Qi(t2), Js(e2, r2, function(e3, r3) {
          return t2(e3, r3[0]);
        });
      };
      const Fo = { "6_2": "getNosToken", "6_22": "getOriginUrl", "6_26": "getNosCdnHost", "6_27": "getGrayscaleConfig", "6_28": "getMixStorePolicy", "6_29": "getMixStoreToken", "6_30": "getFileAuthToken" }, No = { nosToken: { objectName: 1, token: 2, bucket: 3, expireTime: 4, expireSec: 7, tag: 8, shortUrl: 9 }, mixStoreTokenReqTag: { provider: 0, tokenCount: 1, fileExpireSec: 2, tag: 3, returnBody: 4 }, nosConfigTag: { bucket: 1, cdnDomain: 2, expire: 3, objectNamePrefix: 4 }, grayConfigTag: { config: 0, ttl: 1 }, mixStorePolicyTag: { providers: 0, ttl: 1, mixEnable: 2, nosPolicy: 3, s3Policy: 4 }, mixStoreTokenResTag: { provider: 0, accessKeyId: 1, secretAccessKey: 2, sessionToken: 3, token: 4, expireTime: 5, bucket: 6, objectName: 7, fileExpireSec: 8, tag: 9, shortUrl: 10, region: 11 }, nosSafeUrlTag: { safeUrl: 0, originUrl: 1 }, mixStoreAuthTokenReqTag: { type: 1, urls: 2 }, mixStoreAuthTokenResTag: { type: 1, tokens: 2, token: 3, ttl: 4 } }, Lo = invertSerializeMap(No), Uo = { getNosToken: { sid: 6, cid: 2, service: "cloudStorage", response: [{ type: "Property", name: "nosToken", reflectMapper: Lo.nosToken }], params: [{ type: "String", name: "responseBody" }, { type: "Property", name: "nosToken", entity: "nosToken", reflectMapper: No.nosToken }] }, getOriginUrl: { sid: 6, cid: 22, service: "cloudStorage", response: [{ type: "Property", name: "nosSafeUrlTag", reflectMapper: Lo.nosSafeUrlTag }], params: [{ type: "Property", name: "nosSafeUrlTag", reflectMapper: No.nosSafeUrlTag }] }, getNosCdnHost: { sid: 6, cid: 26, service: "misc", response: [{ type: "Property", name: "nosConfigTag", reflectMapper: Lo.nosConfigTag }] }, getGrayscaleConfig: { sid: 6, cid: 27, service: "cloudStorage", response: [{ type: "Property", name: "grayConfigTag", reflectMapper: Lo.grayConfigTag }], params: [{ type: "Property", name: "config" }] }, getMixStorePolicy: { sid: 6, cid: 28, service: "cloudStorage", params: [{ type: "LongArray", name: "supportType" }], response: [{ type: "Property", name: "mixStorePolicyTag", reflectMapper: Lo.mixStorePolicyTag }] }, getMixStoreToken: { sid: 6, cid: 29, service: "cloudStorage", params: [{ type: "Property", name: "mixStoreTokenReqTag", reflectMapper: No.mixStoreTokenReqTag }], response: [{ type: "Property", name: "mixStoreTokenResTag", reflectMapper: Lo.mixStoreTokenResTag }] }, getFileAuthToken: { sid: 6, cid: 30, service: "cloudStorage", params: [{ type: "Property", name: "mixStoreAuthTokenReqTag", reflectMapper: No.mixStoreAuthTokenReqTag }], response: [{ type: "Property", name: "mixStoreAuthTokenResTag", reflectMapper: Lo.mixStoreAuthTokenResTag }] } }, qo = { file: { md5: "$(Etag)", size: "$(ObjectSize)" }, image: { md5: "$(Etag)", size: "$(ObjectSize)", w: "$(ImageInfo.Width)", h: "$(ImageInfo.Height)", orientation: "$(ImageInfo.Orientation)" }, audio: { md5: "$(Etag)", size: "$(ObjectSize)", dur: "$(AVinfo.Audio.Duration)" }, video: { md5: "$(Etag)", size: "$(ObjectSize)", dur: "$(AVinfo.Video.Duration)", w: "$(AVinfo.Video.Width)", h: "$(AVinfo.Video.Height)" } }, Do = { accessKeyId: "", secretAccessKey: "", sessionToken: "", region: "", maxRetries: 0, bucket: "", objectName: "", token: "", shortUrl: "" };
      var Bo, Ho;
      !function(e2) {
        e2[e2.nos = 1] = "nos", e2[e2.s3 = 2] = "s3";
      }(Bo || (Bo = {})), function(e2) {
        e2[e2.dontNeed = -1] = "dontNeed", e2[e2.time = 2] = "time", e2[e2.urls = 3] = "urls";
      }(Ho || (Ho = {}));
      const $o = { chunkUploadHost: "https://wanproxy-web.127.net", commonUploadHost: "https://nos.netease.com", chunkMaxSize: 4194304e4, commonMaxSize: 104857600, uploadReplaceFormat: "https://{host}/{object}", cdn: { defaultCdnDomain: "nim.nosdn.127.net", cdnDomain: "", bucket: "", objectNamePrefix: "" }, downloadUrl: "https://{bucket}-nosdn.netease.im/{object}", downloadHostList: ["nos.netease.com"], nosCdnEnable: true, isNeedToGetUploadPolicyFromServer: true };
      function getUploadResponseFormat(e2 = "file") {
        const t2 = qo[e2] || {};
        return JSON.stringify(t2).replace(/"/gi, '\\"');
      }
      const zo = xt({ none: 0, normal: 1, all: 3 }), Vo = xt({ normal: 0, advanced: 1 }), Go = xt({ normal: 0, owner: 1, manager: 2 }), Ko = { noVerify: 0, needVerify: 1, rejectAll: 2 }, Wo = xt(Ko), Jo = { needVerify: 0, noVerify: 1 }, Yo = xt(Jo), Qo = { manager: 0, all: 1 }, Xo = xt(Qo), Zo = { manager: 0, all: 1 }, ea = xt(Zo), ta = { manager: 0, all: 1 }, ra = xt(ta);
      function formatSuperTeam(e2) {
        const t2 = { type: Vo, muteType: zo, joinMode: Wo, beInviteMode: Yo, inviteMode: Xo, updateTeamMode: ea, updateExtMode: ra }, r2 = __rest(e2, ["bits"]);
        return ["teamId"].forEach((e3) => {
          r2[e3] && (r2[e3] = r2[e3].toString());
        }), ["level", "memberNum", "memberUpdateTime", "createTime", "updateTime"].forEach((e3) => {
          void 0 !== r2[e3] && (r2[e3] = parseInt(r2[e3]));
        }), ["valid", "validToCurrentUser", "mute"].forEach((e3) => {
          void 0 !== r2[e3] && (r2[e3] = 1 === parseInt(r2[e3]));
        }), Object.keys(t2).forEach((e3) => {
          void 0 !== r2[e3] && (r2[e3] = t2[e3][r2[e3]] || r2[e3]);
        }), r2;
      }
      function formatSuperTeams(e2) {
        return e2 && e2.length > 0 ? e2.map((e3) => formatSuperTeam(e3)) : [];
      }
      function generatorSuperTeamMemberForCmd(e2) {
        const t2 = {};
        return void 0 !== e2.bitConfigMask && (t2.bits = parseInt(e2.bitConfigMask)), ["teamId", "ext", "account", "nickInTeam"].forEach((r2) => {
          e2[r2] && (t2[r2] = e2[r2].toString());
        }), Object.prototype.hasOwnProperty.call(e2, "nickInTeam") && (t2.nickInTeam = e2.nickInTeam), t2;
      }
      function formatSuperTeamMember(e2) {
        const t2 = { type: Go }, { bits: r2 } = e2, s2 = __rest(e2, ["bits"]);
        return void 0 !== r2 && (s2.muteTeam = 1 === parseInt(r2), s2.bitConfigMask = r2), s2.id = `${s2.teamId}-${s2.account}`, ["teamId"].forEach((e3) => {
          s2[e3] && (s2[e3] = s2[e3].toString());
        }), ["joinTime", "updateTime", "bitConfigMask"].forEach((e3) => {
          void 0 !== s2[e3] && (s2[e3] = parseInt(s2[e3]));
        }), ["active", "valid", "mute"].forEach((e3) => {
          void 0 !== s2[e3] && (s2[e3] = 1 === parseInt(s2[e3]));
        }), Object.keys(t2).forEach((e3) => {
          void 0 !== s2[e3] && (s2[e3] = t2[e3][s2[e3]] || s2[e3]);
        }), s2;
      }
      function formatSuperTeamMembers(e2) {
        return e2 && e2.length > 0 ? e2.map((e3) => formatSuperTeamMember(e3)) : [];
      }
      function generatorMemberBySuperTeam(e2, t2, r2 = "normal") {
        return { id: `${e2.teamId}-${t2}`, teamId: e2.teamId, account: t2, type: r2, nickInTeam: "", muteTeam: false, mute: false, joinTime: e2.memberUpdateTime, updateTime: e2.memberUpdateTime, active: true, valid: true };
      }
      function generatorMembersBySuperTeam(e2, t2, r2 = "normal") {
        return t2 && t2.length > 0 ? t2.map((t3) => generatorMemberBySuperTeam(e2, t3, r2)) : [];
      }
      class ModuleService {
        constructor(e2) {
          this.core = e2;
        }
        notifyAddSuperTeamMembers(e2, t2) {
          this.core.emit("addSuperTeamMembers", { team: e2, accounts: t2, members: generatorMembersBySuperTeam(e2, t2) });
        }
        notifyUpdateSuperTeamManagers(e2, t2, r2, s2) {
          this.core.emit("updateSuperTeamManagers", { team: { teamId: e2, memberUpdateTime: s2 }, accounts: t2, isManager: r2, members: t2.map((t3) => ({ id: `${e2}-${t3}`, type: "manager", account: t3, updateTime: s2 })) });
        }
        notifyRemoveSuperTeamMembers(e2, t2) {
          this.core.emit("removeSuperTeamMembers", { team: e2, accounts: t2 });
        }
        notifyTransferSuperTeam(e2, t2, r2) {
          this.core.emit("transferSuperTeam", { team: e2, from: { id: `${e2.teamId}-${t2}`, account: t2, type: "normal", updateTime: e2.memberUpdateTime }, to: { id: `${e2.teamId}-${r2}`, account: r2, type: "owner", updateTime: e2.memberUpdateTime } });
        }
        notifyUpdateSuperTeamMembersMute(e2, t2, r2) {
          this.core.emit("updateSuperTeamMembersMute", { team: e2, accounts: t2, members: t2.map(function(t3) {
            return { id: `${e2.teamId}-${t3}`, account: t3, teamId: e2.teamId, mute: r2, updateTime: e2.memberUpdateTime };
          }), mute: r2 });
        }
      }
      const sa = { "21_5": "addSuperTeamMembers", "21_6": "removeSuperTeamMembers", "21_7": "leaveSuperTeam", "21_8": "updateSuperTeamInfo", "21_9": "getSuperTeamInfo", "21_12": "getSuperTeams", "21_15": "getSuperTeamMembers", "21_10": "updateMySuperTeamMemberInfo", "21_20": "applySuperTeam", "21_21": "passSuperTeamApply", "21_22": "rejectSuperTeamApply", "21_23": "acceptSuperTeamInvite", "21_24": "rejectSuperTeamInvite", "21_26": "addSuperTeamManagers", "21_27": "removeSuperTeamManagers", "21_28": "muteSuperTeam", "21_29": "muteSuperTeamMembers", "21_30": "updateSuperTeamMemberNick", "21_31": "transferSuperTeam", "21_33": "getSuperTeamMembersByAccounts", "21_34": "queryMuteSuperTeamMembers", "21_101": "syncCreateSuperTeam", "21_109": "syncSuperTeams", "21_110": "syncUpdateSuperTeamMember", "21_111": "syncMySuperTeamMembers" }, ia = { superTeam: { teamId: 1, name: 3, type: 4, owner: 5, level: 6, selfCustom: 7, valid: 8, memberNum: 9, memberUpdateTime: 10, createTime: 11, updateTime: 12, validToCurrentUser: 13, intro: 14, announcement: 15, joinMode: 16, bits: 17, ext: 18, serverExt: 19, avatar: 20, beInviteMode: 21, inviteMode: 22, updateTeamMode: 23, updateExtMode: 24, mute: 100, muteType: 101 }, superTeamMember: { teamId: 1, account: 3, type: 4, nickInTeam: 5, bits: 7, active: 8, valid: 9, updateTime: 11, ext: 12, mute: 13, invitorAccid: 14, joinTime: 15 } }, na = invertSerializeMap(ia), oa = { getSuperTeamInfo: { sid: 21, cid: 9, service: "superTeam", params: [{ type: "Long", name: "teamId" }], response: [{ type: "Property", name: "superTeam", reflectMapper: na.superTeam }] }, getSuperTeams: { sid: 21, cid: 12, service: "superTeam", params: [{ type: "long", name: "timetag" }], response: [{ type: "PropertyArray", name: "superTeams", reflectMapper: na.superTeam }, { type: "Number", name: "timetag" }] }, updateSuperTeamInfo: { sid: 21, cid: 8, service: "superTeam", params: [{ type: "Property", name: "superTeam", reflectMapper: ia.superTeam }], response: [{ type: "Number", name: "time" }] }, addSuperTeamMembers: { sid: 21, cid: 5, service: "superTeam", params: [{ type: "Long", name: "teamId" }, { type: "StrArray", name: "accounts" }, { type: "String", name: "ps" }], response: [{ type: "StrArray", name: "abortedAccidList" }, { type: "Long", name: "time" }] }, removeSuperTeamMembers: { sid: 21, cid: 6, service: "superTeam", params: [{ type: "Long", name: "teamId" }, { type: "StrArray", name: "accounts" }] }, addSuperTeamManagers: { sid: 21, cid: 26, service: "superTeam", params: [{ type: "Long", name: "teamId" }, { type: "StrArray", name: "accounts" }] }, removeSuperTeamManagers: { sid: 21, cid: 27, service: "superTeam", params: [{ type: "Long", name: "teamId" }, { type: "StrArray", name: "accounts" }] }, applySuperTeam: { sid: 21, cid: 20, service: "superTeam", params: [{ type: "Long", name: "teamId" }, { type: "String", name: "ps" }], response: [{ type: "Property", name: "superTeam", reflectMapper: na.superTeam }] }, transferSuperTeam: { sid: 21, cid: 31, service: "superTeam", params: [{ type: "Long", name: "teamId" }, { type: "String", name: "account" }, { type: "bool", name: "leave" }] }, muteSuperTeam: { sid: 21, cid: 28, service: "superTeam", params: [{ type: "Long", name: "teamId" }, { type: "Int", name: "mute" }] }, muteSuperTeamMembers: { sid: 21, cid: 29, service: "superTeam", params: [{ type: "Long", name: "teamId" }, { type: "StrArray", name: "accounts" }, { type: "Int", name: "mute" }] }, updateSuperTeamMemberNick: { sid: 21, cid: 30, service: "superTeam", params: [{ type: "Property", name: "teamMember", reflectMapper: ia.superTeamMember }] }, updateMySuperTeamMemberInfo: { sid: 21, cid: 10, service: "superTeam", params: [{ type: "Property", name: "teamMember", reflectMapper: ia.superTeamMember }] }, getSuperTeamMembersByAccounts: { sid: 21, cid: 33, service: "superTeam", params: [{ type: "StrArray", name: "memberIds" }], response: [{ type: "PropertyArray", name: "superTeamMembers", reflectMapper: na.superTeamMember }] }, getSuperTeamMembers: { sid: 21, cid: 15, service: "superTeam", params: [{ type: "Long", name: "teamId" }, { type: "Long", name: "joinTime" }, { type: "Int", name: "limit" }, { type: "Bool", name: "reverse" }], response: [{ type: "PropertyArray", name: "superTeamMembers", reflectMapper: na.superTeamMember }] }, queryMuteSuperTeamMembers: { sid: 21, cid: 34, service: "superTeam", params: [{ type: "Long", name: "teamId" }, { type: "Long", name: "joinTime" }, { type: "Int", name: "limit" }, { type: "Bool", name: "reverse" }], response: [{ type: "PropertyArray", name: "superTeamMembers", reflectMapper: na.superTeamMember }] }, leaveSuperTeam: { sid: 21, cid: 7, service: "superTeam", params: [{ type: "Long", name: "teamId" }] }, passSuperTeamApply: { sid: 21, cid: 21, service: "superTeam", params: [{ type: "Long", name: "teamId" }, { type: "String", name: "from" }] }, rejectSuperTeamApply: { sid: 21, cid: 22, service: "superTeam", params: [{ type: "Long", name: "teamId" }, { type: "String", name: "from" }, { type: "String", name: "ps" }] }, acceptSuperTeamInvite: { sid: 21, cid: 23, service: "superTeam", params: [{ type: "Long", name: "teamId" }, { type: "String", name: "from" }] }, rejectSuperTeamInvite: { sid: 21, cid: 24, service: "superTeam", params: [{ type: "Long", name: "teamId" }, { type: "String", name: "from" }, { type: "String", name: "ps" }] }, syncSuperTeams: { sid: 21, cid: 109, service: "superTeam", response: [{ type: "PropertyArray", name: "teams", reflectMapper: na.superTeam }, { type: "Bool", name: "isAll" }, { type: "Long", name: "timetag" }] }, syncCreateSuperTeam: { sid: 21, cid: 101, service: "superTeam", response: [{ type: "Property", name: "superTeam", reflectMapper: na.superTeam }] }, syncUpdateSuperTeamMember: { sid: 21, cid: 110, service: "superTeam", response: [{ type: "Property", name: "teamMember", reflectMapper: na.superTeamMember }] }, syncMySuperTeamMembers: { sid: 21, cid: 111, ext: "sync", service: "superTeam", response: [{ type: "PropertyArray", name: "teamMembers", reflectMapper: na.superTeamMember }, { type: "Number", name: "timetag" }] } };
      const aa = { "13_1": "getChatroomAddress", "24_1": "getQChatAddress" }, ca = { getChatroomAddress: { sid: 13, cid: 1, service: "plugin", params: [{ type: "Long", name: "chatroomId" }, { type: "Boolean", name: "isWeixinApp" }, { type: "Number", name: "ipType" }], response: [{ type: "StrArray", name: "address" }] }, getQChatAddress: { sid: 24, cid: 1, service: "plugin", params: [{ type: "Property", name: "getQChatAddressTag", reflectMapper: { ipType: 1 } }], response: [{ type: "StrArray", name: "address" }] } };
      var da = da || function(e2) {
        var t2;
        "undefined" != typeof window && window.crypto && (t2 = window.crypto), "undefined" != typeof self && self.crypto && (t2 = self.crypto), "undefined" != typeof globalThis && globalThis.crypto && (t2 = globalThis.crypto), !t2 && "undefined" != typeof window && window.msCrypto && (t2 = window.msCrypto), !t2 && "undefined" != typeof global && global.crypto && (t2 = global.crypto);
        var cryptoSecureRandomInt = function() {
          if (t2) {
            if ("function" == typeof t2.getRandomValues)
              try {
                return t2.getRandomValues(new Uint32Array(1))[0];
              } catch (e3) {
              }
            if ("function" == typeof t2.randomBytes)
              try {
                return t2.randomBytes(4).readInt32LE();
              } catch (e3) {
              }
          }
          throw new Error("Native crypto module could not be used to get secure random number.");
        }, r2 = Object.create || function() {
          function F() {
          }
          return function(e3) {
            var t3;
            return F.prototype = e3, t3 = new F(), F.prototype = null, t3;
          };
        }(), s2 = {}, i2 = s2.lib = {}, n2 = i2.Base = { extend: function(e3) {
          var t3 = r2(this);
          return e3 && t3.mixIn(e3), t3.hasOwnProperty("init") && this.init !== t3.init || (t3.init = function() {
            t3.$super.init.apply(this, arguments);
          }), t3.init.prototype = t3, t3.$super = this, t3;
        }, create: function() {
          var e3 = this.extend();
          return e3.init.apply(e3, arguments), e3;
        }, init: function() {
        }, mixIn: function(e3) {
          for (var t3 in e3)
            e3.hasOwnProperty(t3) && (this[t3] = e3[t3]);
          e3.hasOwnProperty("toString") && (this.toString = e3.toString);
        }, clone: function() {
          return this.init.prototype.extend(this);
        } }, o2 = i2.WordArray = n2.extend({ init: function(e3, t3) {
          e3 = this.words = e3 || [], this.sigBytes = null != t3 ? t3 : 4 * e3.length;
        }, toString: function(e3) {
          return (e3 || c2).stringify(this);
        }, concat: function(e3) {
          var t3 = this.words, r3 = e3.words, s3 = this.sigBytes, i3 = e3.sigBytes;
          if (this.clamp(), s3 % 4)
            for (var n3 = 0; n3 < i3; n3++) {
              var o3 = r3[n3 >>> 2] >>> 24 - n3 % 4 * 8 & 255;
              t3[s3 + n3 >>> 2] |= o3 << 24 - (s3 + n3) % 4 * 8;
            }
          else
            for (var a3 = 0; a3 < i3; a3 += 4)
              t3[s3 + a3 >>> 2] = r3[a3 >>> 2];
          return this.sigBytes += i3, this;
        }, clamp: function() {
          var t3 = this.words, r3 = this.sigBytes;
          t3[r3 >>> 2] &= 4294967295 << 32 - r3 % 4 * 8, t3.length = e2.ceil(r3 / 4);
        }, clone: function() {
          var e3 = n2.clone.call(this);
          return e3.words = this.words.slice(0), e3;
        }, random: function(e3) {
          for (var t3 = [], r3 = 0; r3 < e3; r3 += 4)
            t3.push(cryptoSecureRandomInt());
          return new o2.init(t3, e3);
        } }), a2 = s2.enc = {}, c2 = a2.Hex = { stringify: function(e3) {
          for (var t3 = e3.words, r3 = e3.sigBytes, s3 = [], i3 = 0; i3 < r3; i3++) {
            var n3 = t3[i3 >>> 2] >>> 24 - i3 % 4 * 8 & 255;
            s3.push((n3 >>> 4).toString(16)), s3.push((15 & n3).toString(16));
          }
          return s3.join("");
        }, parse: function(e3) {
          for (var t3 = e3.length, r3 = [], s3 = 0; s3 < t3; s3 += 2)
            r3[s3 >>> 3] |= parseInt(e3.substr(s3, 2), 16) << 24 - s3 % 8 * 4;
          return new o2.init(r3, t3 / 2);
        } }, d2 = a2.Latin1 = { stringify: function(e3) {
          for (var t3 = e3.words, r3 = e3.sigBytes, s3 = [], i3 = 0; i3 < r3; i3++) {
            var n3 = t3[i3 >>> 2] >>> 24 - i3 % 4 * 8 & 255;
            s3.push(String.fromCharCode(n3));
          }
          return s3.join("");
        }, parse: function(e3) {
          for (var t3 = e3.length, r3 = [], s3 = 0; s3 < t3; s3++)
            r3[s3 >>> 2] |= (255 & e3.charCodeAt(s3)) << 24 - s3 % 4 * 8;
          return new o2.init(r3, t3);
        } }, m2 = a2.Utf8 = { stringify: function(e3) {
          try {
            return decodeURIComponent(escape(d2.stringify(e3)));
          } catch (e4) {
            throw new Error("Malformed UTF-8 data");
          }
        }, parse: function(e3) {
          return d2.parse(unescape(encodeURIComponent(e3)));
        } }, l2 = i2.BufferedBlockAlgorithm = n2.extend({ reset: function() {
          this._data = new o2.init(), this._nDataBytes = 0;
        }, _append: function(e3) {
          "string" == typeof e3 && (e3 = m2.parse(e3)), this._data.concat(e3), this._nDataBytes += e3.sigBytes;
        }, _process: function(t3) {
          var r3, s3 = this._data, i3 = s3.words, n3 = s3.sigBytes, a3 = this.blockSize, c3 = n3 / (4 * a3), d3 = (c3 = t3 ? e2.ceil(c3) : e2.max((0 | c3) - this._minBufferSize, 0)) * a3, m3 = e2.min(4 * d3, n3);
          if (d3) {
            for (var l3 = 0; l3 < d3; l3 += a3)
              this._doProcessBlock(i3, l3);
            r3 = i3.splice(0, d3), s3.sigBytes -= m3;
          }
          return new o2.init(r3, m3);
        }, clone: function() {
          var e3 = n2.clone.call(this);
          return e3._data = this._data.clone(), e3;
        }, _minBufferSize: 0 });
        i2.Hasher = l2.extend({ cfg: n2.extend(), init: function(e3) {
          this.cfg = this.cfg.extend(e3), this.reset();
        }, reset: function() {
          l2.reset.call(this), this._doReset();
        }, update: function(e3) {
          return this._append(e3), this._process(), this;
        }, finalize: function(e3) {
          return e3 && this._append(e3), this._doFinalize();
        }, blockSize: 16, _createHelper: function(e3) {
          return function(t3, r3) {
            return new e3.init(r3).finalize(t3);
          };
        }, _createHmacHelper: function(e3) {
          return function(t3, r3) {
            return new p2.HMAC.init(e3, r3).finalize(t3);
          };
        } });
        var p2 = s2.algo = {};
        return s2;
      }(Math), ma = da.enc.Utf8, la = da, pa = la.lib, ua = pa.WordArray, ga = pa.Hasher, ya = la.algo, ha = [], fa = ya.SHA1 = ga.extend({ _doReset: function() {
        this._hash = new ua.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
      }, _doProcessBlock: function(e2, t2) {
        for (var r2 = this._hash.words, s2 = r2[0], i2 = r2[1], n2 = r2[2], o2 = r2[3], a2 = r2[4], c2 = 0; c2 < 80; c2++) {
          if (c2 < 16)
            ha[c2] = 0 | e2[t2 + c2];
          else {
            var d2 = ha[c2 - 3] ^ ha[c2 - 8] ^ ha[c2 - 14] ^ ha[c2 - 16];
            ha[c2] = d2 << 1 | d2 >>> 31;
          }
          var m2 = (s2 << 5 | s2 >>> 27) + a2 + ha[c2];
          m2 += c2 < 20 ? 1518500249 + (i2 & n2 | ~i2 & o2) : c2 < 40 ? 1859775393 + (i2 ^ n2 ^ o2) : c2 < 60 ? (i2 & n2 | i2 & o2 | n2 & o2) - 1894007588 : (i2 ^ n2 ^ o2) - 899497514, a2 = o2, o2 = n2, n2 = i2 << 30 | i2 >>> 2, i2 = s2, s2 = m2;
        }
        r2[0] = r2[0] + s2 | 0, r2[1] = r2[1] + i2 | 0, r2[2] = r2[2] + n2 | 0, r2[3] = r2[3] + o2 | 0, r2[4] = r2[4] + a2 | 0;
      }, _doFinalize: function() {
        var e2 = this._data, t2 = e2.words, r2 = 8 * this._nDataBytes, s2 = 8 * e2.sigBytes;
        return t2[s2 >>> 5] |= 128 << 24 - s2 % 32, t2[14 + (s2 + 64 >>> 9 << 4)] = Math.floor(r2 / 4294967296), t2[15 + (s2 + 64 >>> 9 << 4)] = r2, e2.sigBytes = 4 * t2.length, this._process(), this._hash;
      }, clone: function() {
        var e2 = ga.clone.call(this);
        return e2._hash = this._hash.clone(), e2;
      } });
      la.SHA1 = ga._createHelper(fa), la.HmacSHA1 = ga._createHmacHelper(fa), da.SHA1, function(e2) {
        var t2 = e2, r2 = t2.lib.Base, s2 = t2.enc.Utf8;
        t2.algo.HMAC = r2.extend({ init: function(e3, t3) {
          e3 = this._hasher = new e3.init(), "string" == typeof t3 && (t3 = s2.parse(t3));
          var r3 = e3.blockSize, i2 = 4 * r3;
          t3.sigBytes > i2 && (t3 = e3.finalize(t3)), t3.clamp();
          for (var n2 = this._oKey = t3.clone(), o2 = this._iKey = t3.clone(), a2 = n2.words, c2 = o2.words, d2 = 0; d2 < r3; d2++)
            a2[d2] ^= 1549556828, c2[d2] ^= 909522486;
          n2.sigBytes = o2.sigBytes = i2, this.reset();
        }, reset: function() {
          var e3 = this._hasher;
          e3.reset(), e3.update(this._iKey);
        }, update: function(e3) {
          return this._hasher.update(e3), this;
        }, finalize: function(e3) {
          var t3 = this._hasher, r3 = t3.finalize(e3);
          return t3.reset(), t3.finalize(this._oKey.clone().concat(r3));
        } });
      }(da);
      var va = da, Sa = va.lib, Ta = Sa.Base, Ma = Sa.WordArray, ba = va.algo, ka = ba.MD5, Ca = ba.EvpKDF = Ta.extend({ cfg: Ta.extend({ keySize: 4, hasher: ka, iterations: 1 }), init: function(e2) {
        this.cfg = this.cfg.extend(e2);
      }, compute: function(e2, t2) {
        for (var r2, s2 = this.cfg, i2 = s2.hasher.create(), n2 = Ma.create(), o2 = n2.words, a2 = s2.keySize, c2 = s2.iterations; o2.length < a2; ) {
          r2 && i2.update(r2), r2 = i2.update(e2).finalize(t2), i2.reset();
          for (var d2 = 1; d2 < c2; d2++)
            r2 = i2.finalize(r2), i2.reset();
          n2.concat(r2);
        }
        return n2.sigBytes = 4 * a2, n2;
      } });
      va.EvpKDF = function(e2, t2, r2) {
        return Ca.create(r2).compute(e2, t2);
      }, da.EvpKDF;
      var Ia = da, wa = Ia.lib.WordArray;
      Ia.enc.Base64 = { stringify: function(e2) {
        var t2 = e2.words, r2 = e2.sigBytes, s2 = this._map;
        e2.clamp();
        for (var i2 = [], n2 = 0; n2 < r2; n2 += 3)
          for (var o2 = (t2[n2 >>> 2] >>> 24 - n2 % 4 * 8 & 255) << 16 | (t2[n2 + 1 >>> 2] >>> 24 - (n2 + 1) % 4 * 8 & 255) << 8 | t2[n2 + 2 >>> 2] >>> 24 - (n2 + 2) % 4 * 8 & 255, a2 = 0; a2 < 4 && n2 + 0.75 * a2 < r2; a2++)
            i2.push(s2.charAt(o2 >>> 6 * (3 - a2) & 63));
        var c2 = s2.charAt(64);
        if (c2)
          for (; i2.length % 4; )
            i2.push(c2);
        return i2.join("");
      }, parse: function(e2) {
        var t2 = e2.length, r2 = this._map, s2 = this._reverseMap;
        if (!s2) {
          s2 = this._reverseMap = [];
          for (var i2 = 0; i2 < r2.length; i2++)
            s2[r2.charCodeAt(i2)] = i2;
        }
        var n2 = r2.charAt(64);
        if (n2) {
          var o2 = e2.indexOf(n2);
          -1 !== o2 && (t2 = o2);
        }
        return function parseLoop(e3, t3, r3) {
          for (var s3 = [], i3 = 0, n3 = 0; n3 < t3; n3++)
            if (n3 % 4) {
              var o3 = r3[e3.charCodeAt(n3 - 1)] << n3 % 4 * 2 | r3[e3.charCodeAt(n3)] >>> 6 - n3 % 4 * 2;
              s3[i3 >>> 2] |= o3 << 24 - i3 % 4 * 8, i3++;
            }
          return wa.create(s3, i3);
        }(e2, t2, s2);
      }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" }, da.enc.Base64;
      var _a = da, Ea = _a.lib, Pa = Ea.WordArray, Aa = Ea.Hasher, xa = _a.algo, ja = [];
      !function() {
        for (var e2 = 0; e2 < 64; e2++)
          ja[e2] = 4294967296 * Math.abs(Math.sin(e2 + 1)) | 0;
      }();
      var Oa = xa.MD5 = Aa.extend({ _doReset: function() {
        this._hash = new Pa.init([1732584193, 4023233417, 2562383102, 271733878]);
      }, _doProcessBlock: function(e2, t2) {
        for (var r2 = 0; r2 < 16; r2++) {
          var s2 = t2 + r2, i2 = e2[s2];
          e2[s2] = 16711935 & (i2 << 8 | i2 >>> 24) | 4278255360 & (i2 << 24 | i2 >>> 8);
        }
        var n2 = this._hash.words, o2 = e2[t2 + 0], a2 = e2[t2 + 1], c2 = e2[t2 + 2], d2 = e2[t2 + 3], m2 = e2[t2 + 4], l2 = e2[t2 + 5], p2 = e2[t2 + 6], u2 = e2[t2 + 7], g2 = e2[t2 + 8], y2 = e2[t2 + 9], h2 = e2[t2 + 10], f2 = e2[t2 + 11], v2 = e2[t2 + 12], S2 = e2[t2 + 13], T2 = e2[t2 + 14], M2 = e2[t2 + 15], b2 = n2[0], k2 = n2[1], C2 = n2[2], I2 = n2[3];
        b2 = FF(b2, k2, C2, I2, o2, 7, ja[0]), I2 = FF(I2, b2, k2, C2, a2, 12, ja[1]), C2 = FF(C2, I2, b2, k2, c2, 17, ja[2]), k2 = FF(k2, C2, I2, b2, d2, 22, ja[3]), b2 = FF(b2, k2, C2, I2, m2, 7, ja[4]), I2 = FF(I2, b2, k2, C2, l2, 12, ja[5]), C2 = FF(C2, I2, b2, k2, p2, 17, ja[6]), k2 = FF(k2, C2, I2, b2, u2, 22, ja[7]), b2 = FF(b2, k2, C2, I2, g2, 7, ja[8]), I2 = FF(I2, b2, k2, C2, y2, 12, ja[9]), C2 = FF(C2, I2, b2, k2, h2, 17, ja[10]), k2 = FF(k2, C2, I2, b2, f2, 22, ja[11]), b2 = FF(b2, k2, C2, I2, v2, 7, ja[12]), I2 = FF(I2, b2, k2, C2, S2, 12, ja[13]), C2 = FF(C2, I2, b2, k2, T2, 17, ja[14]), b2 = GG(b2, k2 = FF(k2, C2, I2, b2, M2, 22, ja[15]), C2, I2, a2, 5, ja[16]), I2 = GG(I2, b2, k2, C2, p2, 9, ja[17]), C2 = GG(C2, I2, b2, k2, f2, 14, ja[18]), k2 = GG(k2, C2, I2, b2, o2, 20, ja[19]), b2 = GG(b2, k2, C2, I2, l2, 5, ja[20]), I2 = GG(I2, b2, k2, C2, h2, 9, ja[21]), C2 = GG(C2, I2, b2, k2, M2, 14, ja[22]), k2 = GG(k2, C2, I2, b2, m2, 20, ja[23]), b2 = GG(b2, k2, C2, I2, y2, 5, ja[24]), I2 = GG(I2, b2, k2, C2, T2, 9, ja[25]), C2 = GG(C2, I2, b2, k2, d2, 14, ja[26]), k2 = GG(k2, C2, I2, b2, g2, 20, ja[27]), b2 = GG(b2, k2, C2, I2, S2, 5, ja[28]), I2 = GG(I2, b2, k2, C2, c2, 9, ja[29]), C2 = GG(C2, I2, b2, k2, u2, 14, ja[30]), b2 = HH(b2, k2 = GG(k2, C2, I2, b2, v2, 20, ja[31]), C2, I2, l2, 4, ja[32]), I2 = HH(I2, b2, k2, C2, g2, 11, ja[33]), C2 = HH(C2, I2, b2, k2, f2, 16, ja[34]), k2 = HH(k2, C2, I2, b2, T2, 23, ja[35]), b2 = HH(b2, k2, C2, I2, a2, 4, ja[36]), I2 = HH(I2, b2, k2, C2, m2, 11, ja[37]), C2 = HH(C2, I2, b2, k2, u2, 16, ja[38]), k2 = HH(k2, C2, I2, b2, h2, 23, ja[39]), b2 = HH(b2, k2, C2, I2, S2, 4, ja[40]), I2 = HH(I2, b2, k2, C2, o2, 11, ja[41]), C2 = HH(C2, I2, b2, k2, d2, 16, ja[42]), k2 = HH(k2, C2, I2, b2, p2, 23, ja[43]), b2 = HH(b2, k2, C2, I2, y2, 4, ja[44]), I2 = HH(I2, b2, k2, C2, v2, 11, ja[45]), C2 = HH(C2, I2, b2, k2, M2, 16, ja[46]), b2 = II(b2, k2 = HH(k2, C2, I2, b2, c2, 23, ja[47]), C2, I2, o2, 6, ja[48]), I2 = II(I2, b2, k2, C2, u2, 10, ja[49]), C2 = II(C2, I2, b2, k2, T2, 15, ja[50]), k2 = II(k2, C2, I2, b2, l2, 21, ja[51]), b2 = II(b2, k2, C2, I2, v2, 6, ja[52]), I2 = II(I2, b2, k2, C2, d2, 10, ja[53]), C2 = II(C2, I2, b2, k2, h2, 15, ja[54]), k2 = II(k2, C2, I2, b2, a2, 21, ja[55]), b2 = II(b2, k2, C2, I2, g2, 6, ja[56]), I2 = II(I2, b2, k2, C2, M2, 10, ja[57]), C2 = II(C2, I2, b2, k2, p2, 15, ja[58]), k2 = II(k2, C2, I2, b2, S2, 21, ja[59]), b2 = II(b2, k2, C2, I2, m2, 6, ja[60]), I2 = II(I2, b2, k2, C2, f2, 10, ja[61]), C2 = II(C2, I2, b2, k2, c2, 15, ja[62]), k2 = II(k2, C2, I2, b2, y2, 21, ja[63]), n2[0] = n2[0] + b2 | 0, n2[1] = n2[1] + k2 | 0, n2[2] = n2[2] + C2 | 0, n2[3] = n2[3] + I2 | 0;
      }, _doFinalize: function() {
        var e2 = this._data, t2 = e2.words, r2 = 8 * this._nDataBytes, s2 = 8 * e2.sigBytes;
        t2[s2 >>> 5] |= 128 << 24 - s2 % 32;
        var i2 = Math.floor(r2 / 4294967296), n2 = r2;
        t2[15 + (s2 + 64 >>> 9 << 4)] = 16711935 & (i2 << 8 | i2 >>> 24) | 4278255360 & (i2 << 24 | i2 >>> 8), t2[14 + (s2 + 64 >>> 9 << 4)] = 16711935 & (n2 << 8 | n2 >>> 24) | 4278255360 & (n2 << 24 | n2 >>> 8), e2.sigBytes = 4 * (t2.length + 1), this._process();
        for (var o2 = this._hash, a2 = o2.words, c2 = 0; c2 < 4; c2++) {
          var d2 = a2[c2];
          a2[c2] = 16711935 & (d2 << 8 | d2 >>> 24) | 4278255360 & (d2 << 24 | d2 >>> 8);
        }
        return o2;
      }, clone: function() {
        var e2 = Aa.clone.call(this);
        return e2._hash = this._hash.clone(), e2;
      } });
      function FF(e2, t2, r2, s2, i2, n2, o2) {
        var a2 = e2 + (t2 & r2 | ~t2 & s2) + i2 + o2;
        return (a2 << n2 | a2 >>> 32 - n2) + t2;
      }
      function GG(e2, t2, r2, s2, i2, n2, o2) {
        var a2 = e2 + (t2 & s2 | r2 & ~s2) + i2 + o2;
        return (a2 << n2 | a2 >>> 32 - n2) + t2;
      }
      function HH(e2, t2, r2, s2, i2, n2, o2) {
        var a2 = e2 + (t2 ^ r2 ^ s2) + i2 + o2;
        return (a2 << n2 | a2 >>> 32 - n2) + t2;
      }
      function II(e2, t2, r2, s2, i2, n2, o2) {
        var a2 = e2 + (r2 ^ (t2 | ~s2)) + i2 + o2;
        return (a2 << n2 | a2 >>> 32 - n2) + t2;
      }
      _a.MD5 = Aa._createHelper(Oa), _a.HmacMD5 = Aa._createHmacHelper(Oa), da.MD5, function(e2) {
        e2.lib.Cipher || function() {
          var t2 = e2, r2 = t2.lib, s2 = r2.Base, i2 = r2.WordArray, n2 = r2.BufferedBlockAlgorithm, o2 = t2.enc;
          o2.Utf8;
          var a2 = o2.Base64, c2 = t2.algo.EvpKDF, d2 = r2.Cipher = n2.extend({ cfg: s2.extend(), createEncryptor: function(e3, t3) {
            return this.create(this._ENC_XFORM_MODE, e3, t3);
          }, createDecryptor: function(e3, t3) {
            return this.create(this._DEC_XFORM_MODE, e3, t3);
          }, init: function(e3, t3, r3) {
            this.cfg = this.cfg.extend(r3), this._xformMode = e3, this._key = t3, this.reset();
          }, reset: function() {
            n2.reset.call(this), this._doReset();
          }, process: function(e3) {
            return this._append(e3), this._process();
          }, finalize: function(e3) {
            return e3 && this._append(e3), this._doFinalize();
          }, keySize: 4, ivSize: 4, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: function() {
            function selectCipherStrategy(e3) {
              return "string" == typeof e3 ? v2 : h2;
            }
            return function(e3) {
              return { encrypt: function(t3, r3, s3) {
                return selectCipherStrategy(r3).encrypt(e3, t3, r3, s3);
              }, decrypt: function(t3, r3, s3) {
                return selectCipherStrategy(r3).decrypt(e3, t3, r3, s3);
              } };
            };
          }() });
          r2.StreamCipher = d2.extend({ _doFinalize: function() {
            return this._process(true);
          }, blockSize: 1 });
          var m2 = t2.mode = {}, l2 = r2.BlockCipherMode = s2.extend({ createEncryptor: function(e3, t3) {
            return this.Encryptor.create(e3, t3);
          }, createDecryptor: function(e3, t3) {
            return this.Decryptor.create(e3, t3);
          }, init: function(e3, t3) {
            this._cipher = e3, this._iv = t3;
          } }), p2 = m2.CBC = function() {
            var e3 = l2.extend();
            function xorBlock(e4, t3, r3) {
              var s3, i3 = this._iv;
              i3 ? (s3 = i3, this._iv = void 0) : s3 = this._prevBlock;
              for (var n3 = 0; n3 < r3; n3++)
                e4[t3 + n3] ^= s3[n3];
            }
            return e3.Encryptor = e3.extend({ processBlock: function(e4, t3) {
              var r3 = this._cipher, s3 = r3.blockSize;
              xorBlock.call(this, e4, t3, s3), r3.encryptBlock(e4, t3), this._prevBlock = e4.slice(t3, t3 + s3);
            } }), e3.Decryptor = e3.extend({ processBlock: function(e4, t3) {
              var r3 = this._cipher, s3 = r3.blockSize, i3 = e4.slice(t3, t3 + s3);
              r3.decryptBlock(e4, t3), xorBlock.call(this, e4, t3, s3), this._prevBlock = i3;
            } }), e3;
          }(), u2 = (t2.pad = {}).Pkcs7 = { pad: function(e3, t3) {
            for (var r3 = 4 * t3, s3 = r3 - e3.sigBytes % r3, n3 = s3 << 24 | s3 << 16 | s3 << 8 | s3, o3 = [], a3 = 0; a3 < s3; a3 += 4)
              o3.push(n3);
            var c3 = i2.create(o3, s3);
            e3.concat(c3);
          }, unpad: function(e3) {
            var t3 = 255 & e3.words[e3.sigBytes - 1 >>> 2];
            e3.sigBytes -= t3;
          } };
          r2.BlockCipher = d2.extend({ cfg: d2.cfg.extend({ mode: p2, padding: u2 }), reset: function() {
            var e3;
            d2.reset.call(this);
            var t3 = this.cfg, r3 = t3.iv, s3 = t3.mode;
            this._xformMode == this._ENC_XFORM_MODE ? e3 = s3.createEncryptor : (e3 = s3.createDecryptor, this._minBufferSize = 1), this._mode && this._mode.__creator == e3 ? this._mode.init(this, r3 && r3.words) : (this._mode = e3.call(s3, this, r3 && r3.words), this._mode.__creator = e3);
          }, _doProcessBlock: function(e3, t3) {
            this._mode.processBlock(e3, t3);
          }, _doFinalize: function() {
            var e3, t3 = this.cfg.padding;
            return this._xformMode == this._ENC_XFORM_MODE ? (t3.pad(this._data, this.blockSize), e3 = this._process(true)) : (e3 = this._process(true), t3.unpad(e3)), e3;
          }, blockSize: 4 });
          var g2 = r2.CipherParams = s2.extend({ init: function(e3) {
            this.mixIn(e3);
          }, toString: function(e3) {
            return (e3 || this.formatter).stringify(this);
          } }), y2 = (t2.format = {}).OpenSSL = { stringify: function(e3) {
            var t3 = e3.ciphertext, r3 = e3.salt;
            return (r3 ? i2.create([1398893684, 1701076831]).concat(r3).concat(t3) : t3).toString(a2);
          }, parse: function(e3) {
            var t3, r3 = a2.parse(e3), s3 = r3.words;
            return 1398893684 == s3[0] && 1701076831 == s3[1] && (t3 = i2.create(s3.slice(2, 4)), s3.splice(0, 4), r3.sigBytes -= 16), g2.create({ ciphertext: r3, salt: t3 });
          } }, h2 = r2.SerializableCipher = s2.extend({ cfg: s2.extend({ format: y2 }), encrypt: function(e3, t3, r3, s3) {
            s3 = this.cfg.extend(s3);
            var i3 = e3.createEncryptor(r3, s3), n3 = i3.finalize(t3), o3 = i3.cfg;
            return g2.create({ ciphertext: n3, key: r3, iv: o3.iv, algorithm: e3, mode: o3.mode, padding: o3.padding, blockSize: e3.blockSize, formatter: s3.format });
          }, decrypt: function(e3, t3, r3, s3) {
            return s3 = this.cfg.extend(s3), t3 = this._parse(t3, s3.format), e3.createDecryptor(r3, s3).finalize(t3.ciphertext);
          }, _parse: function(e3, t3) {
            return "string" == typeof e3 ? t3.parse(e3, this) : e3;
          } }), f2 = (t2.kdf = {}).OpenSSL = { execute: function(e3, t3, r3, s3) {
            s3 || (s3 = i2.random(8));
            var n3 = c2.create({ keySize: t3 + r3 }).compute(e3, s3), o3 = i2.create(n3.words.slice(t3), 4 * r3);
            return n3.sigBytes = 4 * t3, g2.create({ key: n3, iv: o3, salt: s3 });
          } }, v2 = r2.PasswordBasedCipher = h2.extend({ cfg: h2.cfg.extend({ kdf: f2 }), encrypt: function(e3, t3, r3, s3) {
            var i3 = (s3 = this.cfg.extend(s3)).kdf.execute(r3, e3.keySize, e3.ivSize);
            s3.iv = i3.iv;
            var n3 = h2.encrypt.call(this, e3, t3, i3.key, s3);
            return n3.mixIn(i3), n3;
          }, decrypt: function(e3, t3, r3, s3) {
            s3 = this.cfg.extend(s3), t3 = this._parse(t3, s3.format);
            var i3 = s3.kdf.execute(r3, e3.keySize, e3.ivSize, t3.salt);
            return s3.iv = i3.iv, h2.decrypt.call(this, e3, t3, i3.key, s3);
          } });
        }();
      }(da);
      const Ra = da, Fa = Ra.lib.StreamCipher, Na = Ra.algo, La = Na.RC4 = Fa.extend({ _doReset: function() {
        const e2 = this._key, t2 = e2.words, r2 = e2.sigBytes, s2 = this._S = [];
        for (var i2 = 0; i2 < 256; i2++)
          s2[i2] = i2;
        i2 = 0;
        for (var n2 = 0; i2 < 256; i2++) {
          const e3 = i2 % r2, o2 = t2[e3 >>> 2] >>> 24 - e3 % 4 * 8 & 255;
          n2 = (n2 + s2[i2] + o2) % 256;
          const a2 = s2[i2];
          s2[i2] = s2[n2], s2[n2] = a2;
        }
        this._i = this._j = 0;
      }, _doProcessBlock: function(e2, t2) {
        e2[t2] ^= generateKeystreamWord.call(this);
      }, keySize: 8, ivSize: 0 });
      function generateKeystreamWord() {
        const e2 = this._S;
        let t2 = this._i, r2 = this._j, s2 = 0;
        for (let i2 = 0; i2 < 4; i2++) {
          t2 = (t2 + 1) % 256, r2 = (r2 + e2[t2]) % 256;
          const n2 = e2[t2];
          e2[t2] = e2[r2], e2[r2] = n2, s2 |= e2[(e2[t2] + e2[r2]) % 256] << 24 - 8 * i2;
        }
        return this._i = t2, this._j = r2, s2;
      }
      Ra.RC4 = Fa._createHelper(La);
      const Ua = Na.RC4Drop = La.extend({ cfg: La.cfg.extend({ drop: 192 }), _doReset: function() {
        La._doReset.call(this);
        for (let e2 = this.cfg.drop; e2 > 0; e2--)
          generateKeystreamWord.call(this);
      } });
      Ra.RC4Drop = Fa._createHelper(Ua);
      var qa = da.RC4;
      const Da = { "3_1": "updatePushToken", "3_2": "updateAppBackground" }, Ba = { updatePushToken: { sid: 3, cid: 1, service: "user", params: [{ type: "String", name: "tokenName" }, { type: "String", name: "token" }, { type: "Int", name: "pushkit" }] }, updateAppBackground: { sid: 3, cid: 2, service: "user", params: [{ type: "Boolean", name: "isBackground" }, { type: "Int", name: "badge" }] } };
      const Ha = { "7_19": "nimQueryCloudSessionList", "7_20": "nimQueryCloudSession", "7_21": "nimUpdateCloudSession", "7_22": "nimDeleteCloudSessionList", "7_121": "nimMultiSyncUpdateCloudSession" }, $a = { sessionReqTag: { minTimestamp: 1, maxTimestamp: 2, includedLastMsg: 3, limit: 4, hasMore: 5 }, sessionTag: { sessionId: 1, updateTime: 2, ext: 3, lastMsg: 4, lastMsgType: 5 } }, za = invertSerializeMap($a), Va = { nimQueryCloudSessionList: { sid: 7, cid: 19, service: "cloudSession", params: [{ type: "Property", name: "tag", reflectMapper: $a.sessionReqTag }], response: [{ type: "Property", name: "tag", reflectMapper: za.sessionReqTag }, { type: "PropertyArray", name: "sessions", reflectMapper: za.sessionTag }] }, nimQueryCloudSession: { sid: 7, cid: 20, service: "cloudSession", params: [{ type: "Property", name: "tag", reflectMapper: $a.sessionTag }], response: [{ type: "Property", name: "session", reflectMapper: za.sessionTag }] }, nimUpdateCloudSession: { sid: 7, cid: 21, service: "cloudSession", params: [{ type: "Property", name: "tag", reflectMapper: $a.sessionTag }] }, nimDeleteCloudSessionList: { sid: 7, cid: 22, service: "cloudSession", params: [{ type: "PropertyArray", name: "tags", reflectMapper: $a.sessionTag }] }, nimMultiSyncUpdateCloudSession: { sid: 7, cid: 121, service: "cloudSession", response: [{ type: "Property", name: "session", reflectMapper: za.sessionTag }] } }, Ga = { sessionId: { type: "string" }, updateTime: { type: "number" }, ext: { type: "string" }, lastMsg: { type: "object" }, lastMsgType: { type: "number" } };
      function formatCloudSession(e2, t2, r2) {
        const s2 = format(Ga, e2), { accid: i2, scene: n2 } = getAccountFromSessionId(s2.sessionId, "|");
        if (s2.sessionId = `${n2}-${i2}`, s2.lastMsg) {
          const e3 = 1 === s2.lastMsgType;
          s2.lastMsgInfo = e3 ? { isLastMsgRecalled: e3, revokedMsg: formatSystemMessage(deserialize(s2.lastMsg, no.sysMsg), r2) } : { isLastMsgRecalled: e3, lastMsg: formatMsg(deserialize(s2.lastMsg, zs.msg), { account: t2 }) };
        }
        return delete s2.lastMsg, delete s2.lastMsgType, s2;
      }
      var Ka, Wa, Ja;
      !function(e2) {
        e2[e2.audio = 1] = "audio", e2[e2.video = 2] = "video", e2[e2.custom = 3] = "custom";
      }(Ka || (Ka = {})), function(e2) {
        e2[e2.kClose = 1] = "kClose", e2[e2.kJoin = 2] = "kJoin", e2[e2.kInvite = 3] = "kInvite", e2[e2.kCancelInvite = 4] = "kCancelInvite", e2[e2.kReject = 5] = "kReject", e2[e2.kAccept = 6] = "kAccept", e2[e2.kLeave = 7] = "kLeave", e2[e2.kCustom = 8] = "kCustom";
      }(Wa || (Wa = {})), function(e2) {
        e2[e2.kDefault = 0] = "kDefault", e2[e2.kLeave = 1] = "kLeave", e2[e2.kSelfSync = 3] = "kSelfSync";
      }(Ja || (Ja = {}));
      const Ya = { needPush: { type: "boolean", required: false }, pushTitle: { type: "string", required: false }, pushContent: { type: "string", required: false }, pushPayload: { type: "string", required: false }, needPushBadge: { type: "boolean", required: false } }, Qa = { "15_1": "signalingCreate", "15_2": "signalingDelay", "15_3": "signalingClose", "15_4": "signalingJoin", "15_5": "signalingLeave", "15_6": "signalingInvite", "15_7": "signalingCancelInvite", "15_8": "signalingReject", "15_9": "signalingAccept", "15_10": "signalingSendCustomCommand", "15_11": "signalingRecvNotification", "15_12": "signalingMultiSyncNotification", "15_13": "signalingSyncNotification", "15_14": "singalingSyncChannels", "15_15": "signalingQueryInfo", "15_16": "signalingCallEx", "15_17": "signalingJoinAndAccept" }, Xa = { avSignalTag: Object.assign({ type: 1, name: 2, channelId: 3, createTime: 4, expireTime: 5, creatorAccid: 6, ext: 7, invalid: 8, fromAccid: 10, toAccid: 11, requestId: 12, members: 18, attach: 19, attachExt: 20, needOffline: 21, msgId: 22, uid: 23, time: 24, nertcChannelName: 25, nertcTokenTtl: 26, nertcToken: 27, nertcJoinRoomQueryParamMap: 28, nertcJoinRoomResponse: 29, callStatus: 30 }, { needPush: 13, pushTitle: 14, pushContent: 15, pushPayload: 16, needPushBadge: 17 }) }, Za = invertSerializeMap(Xa), ec = { signalingCreate: { sid: 15, cid: 1, service: "signaling", params: [{ type: "Property", name: "tag", reflectMapper: Xa.avSignalTag }], response: [{ type: "Property", name: "data", reflectMapper: Za.avSignalTag }] }, signalingDelay: { sid: 15, cid: 2, service: "signaling", params: [{ type: "Property", name: "tag", reflectMapper: Xa.avSignalTag }], response: [{ type: "Property", name: "data", reflectMapper: Za.avSignalTag }] }, signalingClose: { sid: 15, cid: 3, service: "signaling", params: [{ type: "Property", name: "tag", reflectMapper: Xa.avSignalTag }], response: [{ type: "Property", name: "data", reflectMapper: Za.avSignalTag }] }, signalingJoin: { sid: 15, cid: 4, service: "signaling", params: [{ type: "Property", name: "tag", reflectMapper: Xa.avSignalTag }], response: [{ type: "Property", name: "data", reflectMapper: Za.avSignalTag }] }, signalingLeave: { sid: 15, cid: 5, service: "signaling", params: [{ type: "Property", name: "tag", reflectMapper: Xa.avSignalTag }] }, signalingInvite: { sid: 15, cid: 6, service: "signaling", params: [{ type: "Property", name: "tag", reflectMapper: Xa.avSignalTag }] }, signalingCancelInvite: { sid: 15, cid: 7, service: "signaling", params: [{ type: "Property", name: "tag", reflectMapper: Xa.avSignalTag }] }, signalingReject: { sid: 15, cid: 8, service: "signaling", params: [{ type: "Property", name: "tag", reflectMapper: Xa.avSignalTag }] }, signalingAccept: { sid: 15, cid: 9, service: "signaling", params: [{ type: "Property", name: "tag", reflectMapper: Xa.avSignalTag }] }, signalingSendCustomCommand: { sid: 15, cid: 10, service: "signaling", params: [{ type: "Property", name: "tag", reflectMapper: Xa.avSignalTag }] }, signalingRecvNotification: { sid: 15, cid: 11, service: "signaling", response: [{ type: "Property", name: "data", reflectMapper: Za.avSignalTag }] }, signalingMultiSyncNotification: { sid: 15, cid: 12, service: "signaling", response: [{ type: "Property", name: "data", reflectMapper: Za.avSignalTag }] }, signalingSyncNotification: { sid: 15, cid: 13, service: "signaling", response: [{ type: "PropertyArray", name: "datas", reflectMapper: Za.avSignalTag }] }, singalingSyncChannels: { sid: 15, cid: 14, service: "signaling", response: [{ type: "PropertyArray", name: "datas", reflectMapper: Za.avSignalTag }] }, signalingQueryInfo: { sid: 15, cid: 15, service: "signaling", params: [{ type: "Property", name: "tag", reflectMapper: Xa.avSignalTag }], response: [{ type: "Property", name: "data", reflectMapper: Za.avSignalTag }] }, signalingCallEx: { sid: 15, cid: 16, service: "signaling", params: [{ type: "Property", name: "tag", reflectMapper: Xa.avSignalTag }], response: [{ type: "Property", name: "data", reflectMapper: Za.avSignalTag }] }, signalingJoinAndAccept: { sid: 15, cid: 17, service: "signaling", params: [{ type: "Property", name: "tag", reflectMapper: Xa.avSignalTag }], response: [{ type: "Property", name: "data", reflectMapper: Za.avSignalTag }] }, signalingBatchMarkRead: { sid: 4, cid: 5, hasPacketResponse: false, service: "signaling", params: [{ type: "byte", name: "sid" }, { type: "byte", name: "cid" }, { type: "LongArray", name: "ids" }] } }, tc = { type: { type: "number" }, createTime: { type: "number" }, expireTime: { type: "number" }, invalid: { type: "boolean" }, pushInfo: Ya, pluginSetting: { nertcInfo: { nertcChannelName: { type: "string" }, nertcTokenTtl: { type: "number" }, nertcToken: { type: "string" }, nertcJoinRoomQueryParamMap: { type: "string" }, callStatus: { type: "number" } } }, attach: { type: "object" }, members: { type: "object" }, needOffline: { type: "boolean" }, uid: { type: "number" }, time: { type: "number" } };
      function formatSignaling(e2) {
        const t2 = format(tc, e2);
        let r2 = [];
        return t2.members && t2.members.length > 0 && (r2 = t2.members.map((e3) => function formatSignalingChannelMember(e4) {
          return format(tc, deserialize(e4, { 1: "accid", 2: "uid", 3: "createTime", 4: "expireTime" }));
        }(e3)), delete t2.members), r2.length > 0 ? { channelInfo: t2, memberList: r2 } : { channelInfo: t2 };
      }
      function generateSignalingForCmd(e2) {
        return formatReverse(tc, e2);
      }
      class SignalingService extends t.EventEmitter {
        constructor(e2) {
          super(), this.timer = 0, this.pollingInterval = 12e4, this.name = "signaling", this.logger = e2.logger, this.core = e2, this.channels = {}, registerParser({ cmdMap: Qa, cmdConfig: ec });
        }
        callEx(e2) {
          var t2;
          return __awaiter(this, void 0, void 0, function* () {
            validate({ type: { type: "number" }, toAccid: { type: "string", allowEmpty: false }, requestId: { type: "string", allowEmpty: false }, needOffline: { type: "boolean", required: false }, pushInfo: { type: "object", required: false, rules: Ya }, pluginSetting: { type: "object", required: false, rules: { nertcInfo: { type: "object", required: false } } } }, e2);
            const r2 = yield this.core.sendCmd("signalingCallEx", { tag: generateSignalingForCmd(e2) }), s2 = formatSignaling((null === (t2 = r2.content) || void 0 === t2 ? void 0 : t2.data) || {});
            return this.channels[s2.channelInfo.channelId] = Zn(s2.channelInfo), this.timer || (this.timer = this.core.timerManager.addTimer(this.aotoDelay.bind(this), this.pollingInterval, -1)), s2;
          });
        }
        joinAndAccept(e2) {
          var t2;
          return __awaiter(this, void 0, void 0, function* () {
            validate({ channelId: { type: "string", allowEmpty: false }, fromAccid: { type: "string", allowEmpty: false }, requestId: { type: "string", required: false }, needOffline: { type: "boolean", required: false }, uid: { type: "number", required: false }, pluginSetting: { type: "object", required: false, rules: { nertcInfo: { type: "object", required: false } } } }, e2);
            const { fromAccid: r2 } = e2, s2 = __rest(e2, ["fromAccid"]);
            s2.toAccid = r2;
            const i2 = yield this.core.sendCmd("signalingJoinAndAccept", { tag: generateSignalingForCmd(s2) }), n2 = formatSignaling((null === (t2 = i2.content) || void 0 === t2 ? void 0 : t2.data) || {});
            return this.channels[n2.channelInfo.channelId] = Zn(n2.channelInfo), this.timer || (this.timer = this.core.timerManager.addTimer(this.aotoDelay.bind(this), this.pollingInterval, -1)), n2;
          });
        }
        create(e2) {
          var t2;
          return __awaiter(this, void 0, void 0, function* () {
            validate({ type: { type: "number" }, ext: { type: "string", required: false } }, e2);
            const r2 = yield this.core.sendCmd("signalingCreate", { tag: generateSignalingForCmd(e2) });
            return formatSignaling((null === (t2 = r2.content) || void 0 === t2 ? void 0 : t2.data) || {});
          });
        }
        close(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ channelId: { type: "string", allowEmpty: false }, attachExt: { type: "string", required: false }, needOffline: { type: "boolean", required: false } }, e2), yield this.core.sendCmd("signalingClose", { tag: generateSignalingForCmd(e2) });
          });
        }
        queryInfo(e2) {
          var t2;
          return __awaiter(this, void 0, void 0, function* () {
            validate({ name: { type: "string", allowEmpty: false } }, e2);
            const r2 = yield this.core.sendCmd("signalingQueryInfo", { tag: e2 });
            return formatSignaling((null === (t2 = r2.content) || void 0 === t2 ? void 0 : t2.data) || {});
          });
        }
        join(e2) {
          var t2;
          return __awaiter(this, void 0, void 0, function* () {
            validate({ channelId: { type: "string", allowEmpty: false }, attachExt: { type: "string", required: false }, uid: { type: "number", min: 0, required: false }, needOffline: { type: "boolean", required: false } }, e2);
            const r2 = yield this.core.sendCmd("signalingJoin", { tag: generateSignalingForCmd(e2) }), s2 = formatSignaling((null === (t2 = r2.content) || void 0 === t2 ? void 0 : t2.data) || {});
            return this.channels[s2.channelInfo.channelId] = Zn(s2.channelInfo), this.timer || (this.timer = this.core.timerManager.addTimer(this.aotoDelay.bind(this), this.pollingInterval, -1)), s2;
          });
        }
        aotoDelay() {
          return __awaiter(this, void 0, void 0, function* () {
            const e2 = Object.keys(this.channels);
            if (0 !== e2.length) {
              this.logger.log("signling:autoDelay", e2);
              for (let t2 = 0; t2 < e2.length; t2++) {
                const r2 = e2[t2];
                try {
                  const e3 = formatSignaling((yield this.core.sendCmd("signalingDelay", { tag: { channelId: r2 } })).content.data);
                  this.channels[r2] = e3.channelInfo;
                } catch (e3) {
                  this.logger.warn(`signling:autoDelay ${r2} failed`, e3), delete this.channels[r2];
                }
              }
            } else
              this.timer && this.core.timerManager.deleteTimer(this.timer);
          });
        }
        leave(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ channelId: { type: "string", allowEmpty: false }, attachExt: { type: "string", required: false }, needOffline: { type: "boolean", required: false } }, e2), yield this.core.sendCmd("signalingLeave", { tag: generateSignalingForCmd(e2) }), delete this.channels[e2.channelId];
          });
        }
        invite(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ channelId: { type: "string", allowEmpty: false }, toAccid: { type: "string", allowEmpty: false }, requestId: { type: "string", allowEmpty: false }, attachExt: { type: "string", required: false }, needOffline: { type: "boolean", required: false }, pushInfo: { type: "object", required: false, rules: Ya } }, e2), yield this.core.sendCmd("signalingInvite", { tag: generateSignalingForCmd(e2) });
          });
        }
        cancelInvite(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ channelId: { type: "string", allowEmpty: false }, toAccid: { type: "string", allowEmpty: false }, requestId: { type: "string", allowEmpty: false }, attachExt: { type: "string", required: false }, needOffline: { type: "boolean", required: false } }, e2), yield this.core.sendCmd("signalingCancelInvite", { tag: generateSignalingForCmd(e2) });
          });
        }
        reject(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ channelId: { type: "string", allowEmpty: false }, fromAccid: { type: "string", allowEmpty: false }, requestId: { type: "string", allowEmpty: false }, attachExt: { type: "string", required: false }, needOffline: { type: "boolean", required: false } }, e2);
            const { fromAccid: t2 } = e2, r2 = __rest(e2, ["fromAccid"]);
            r2.toAccid = t2, yield this.core.sendCmd("signalingReject", { tag: generateSignalingForCmd(r2) });
          });
        }
        accept(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ channelId: { type: "string", allowEmpty: false }, fromAccid: { type: "string", allowEmpty: false }, requestId: { type: "string", allowEmpty: false }, attachExt: { type: "string", required: false }, needOffline: { type: "boolean", required: false }, autoJoin: { type: "boolean", required: false }, uid: { type: "number", min: 0, required: false }, joinAttachExt: { type: "string", required: false } }, e2);
            const { autoJoin: t2, joinAttachExt: r2, fromAccid: s2 } = e2, i2 = __rest(e2, ["autoJoin", "joinAttachExt", "fromAccid"]);
            if (i2.toAccid = s2, yield this.core.sendCmd("signalingAccept", { tag: generateSignalingForCmd(i2) }), this.logger.log(`Signaling:accept, accept success, autoJoin ${e2.autoJoin}`), t2) {
              const t3 = { channelId: e2.channelId, needOffline: e2.needOffline, attachExt: r2, uid: e2.uid };
              yield this.join(t3);
            }
          });
        }
        sendCustomCommand(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ channelId: { type: "string", allowEmpty: false }, fromAccid: { type: "string", allowEmpty: false, required: false }, attachExt: { type: "string", required: false } }, e2), yield this.core.sendCmd("signalingSendCustomCommand", { tag: generateSignalingForCmd(e2) });
          });
        }
        signalingRecvNotificationHandler(e2) {
          const t2 = "number" == typeof Ie(e2, "raw.r[0]") ? `${e2.raw.r[0]}` : void 0;
          e2.content.data.msgId = t2, this.doNotify(e2.content.data), t2 && parseInt(t2) && this.core.sendCmd("signalingBatchMarkRead", { sid: 15, cid: 11, ids: [t2] });
        }
        signalingMultiSyncNotificationHandler(e2) {
          this.doNotify(e2.content.data, Ja.kSelfSync);
        }
        doNotify(e2, t2 = Ja.kDefault) {
          const { metaData: r2, rawData: s2 } = function formatSignalingNotification(e3, t3 = Ja.kDefault) {
            const r3 = format(tc, e3), { attach: s3, attachExt: i3, time: n3, msgId: o3, fromAccid: a3, toAccid: c3, members: d3, requestId: m2, pushInfo: l2 } = r3, p2 = __rest(r3, ["attach", "attachExt", "time", "msgId", "fromAccid", "toAccid", "members", "requestId", "pushInfo"]), u2 = s3.type;
            return delete r3.attach, { metaData: { eventType: u2, channelInfo: p2, feature: t3, ext: i3 || "", time: n3, msgId: o3 }, rawData: r3 };
          }(e2, t2), { fromAccid: i2, toAccid: n2, members: o2, requestId: a2, pushInfo: c2, msgId: d2 } = s2;
          switch (r2.eventType) {
            case Wa.kClose:
              this.emit("signalingClose", { fromAccid: i2, metaData: r2 });
              break;
            case Wa.kJoin:
              this.emit("signalingJoin", { member: o2, metaData: r2 });
              break;
            case Wa.kInvite:
              this.emit("signalingInvite", { fromAccid: i2, toAccid: n2, requestId: a2, pushInfo: c2, metaData: r2 });
              break;
            case Wa.kCancelInvite:
              this.emit("signalingCancelInvite", { fromAccid: i2, toAccid: n2, requestId: a2, metaData: r2 });
              break;
            case Wa.kReject:
              this.emit("signalingReject", { toAccid: n2, requestId: a2, metaData: r2 });
              break;
            case Wa.kAccept:
              this.emit("signalingAccept", { toAccid: n2, requestId: a2, metaData: r2 });
              break;
            case Wa.kLeave:
              this.emit("signalingLeave", { fromAccid: i2, metaData: r2 });
              break;
            case Wa.kCustom:
              this.emit("signalingCustomCommand", { fromAccid: i2, metaData: r2 });
              break;
            default:
              this.logger.warn(`signaling:notification, no such a type ${r2.eventType}`, s2);
          }
          return d2;
        }
        signalingSyncNotificationHandler(e2) {
          if (!(e2.content.datas && e2.content.datas.length > 0))
            return;
          const t2 = e2.content.datas.map((e3) => this.doNotify(e3)).filter((e3) => e3);
          t2.length > 0 && this.core.sendCmd("signalingBatchMarkRead", { sid: 15, cid: 11, ids: t2 });
        }
        singalingSyncChannelsHandler(e2) {
          if (this.timer = 0, this.channels = {}, !(e2.content.datas && e2.content.datas.length > 0))
            return;
          const t2 = e2.content.datas.map((e3) => formatSignaling(e3));
          this.emit("singalingSyncChannels", t2);
        }
        process(e2) {
          const t2 = this[e2.cmd + "Handler"];
          return "function" == typeof t2 ? (t2.call(this, e2), Promise.resolve(e2)) : e2.error && !e2.error.ignore ? Promise.reject(e2.error) : Promise.resolve(e2);
        }
      }
      return NIM.setAdapters(ds), NIM.registerService(AuthService, "auth"), NIM.registerService(class MsgService extends Service {
        constructor(e2) {
          super("msg", e2), this.service = new ModuleService$2(e2), registerParser({ cmdMap: Bs, cmdConfig: Vs });
        }
        sendTextMsg(e2) {
          return validate({ body: { type: "string", allowEmpty: false } }, e2), this.sendMsg(Object.assign(Object.assign({}, e2), { type: "text" }));
        }
        sendTipMsg(e2) {
          return validate({ body: { type: "string", allowEmpty: false } }, e2), this.sendMsg(Object.assign(Object.assign({}, e2), { type: "tip" }));
        }
        sendGeoLocationMsg(e2) {
          return validate({ attach: { type: "object", rules: { title: { type: "string", allowEmpty: false }, lat: { type: "number" }, lng: { type: "number" } } } }, e2), this.sendMsg(Object.assign(Object.assign({}, e2), { type: "geo", attach: JSON.stringify(e2.attach) }));
        }
        sendCustomMsg(e2) {
          return validate({ attach: { type: "string", allowEmpty: false } }, e2), this.sendMsg(Object.assign(Object.assign({}, e2), { type: "custom" }));
        }
        sendMsg(e2) {
          var t2;
          if (validate({ scene: { type: "enum", values: getEnumKeys(Fe) }, type: { type: "enum", values: getEnumKeys(Re) }, to: { type: "string", allowEmpty: false }, ext: { type: "string", required: false }, setting: { type: "object", rules: { resendFlag: { type: "boolean", required: false }, needSaveHistory: { type: "boolean", required: false }, needRoaming: { type: "boolean", required: false }, needOffline: { type: "boolean", required: false }, needSelfSync: { type: "boolean", required: false }, needRouted: { type: "boolean", required: false }, needUpdateSession: { type: "boolean", required: false } }, required: false }, antiSpamInfo: { type: "object", required: false, rules: { clientAntispamHitting: { type: "boolean", required: false }, antiSpamUsingYidun: { type: "boolean", required: false } } }, pushInfo: { type: "object", required: false, rules: Os }, robotInfo: { type: "object", required: false, rules: Rs }, teamSpecializationInfo: { type: "object", required: false, rules: { needACK: { type: "boolean", required: false } } } }, e2), "team" === e2.scene && e2.robotInfo && !e2.robotInfo.account)
            throw new ValidateError('When "scene" equals "team", account is required in robotInfo', { key: "account" }, "required");
          const r2 = "p2p" === e2.scene ? "sendMsg" : "team" === e2.scene ? "sendTeamMsg" : "sendSuperTeamMsg", s2 = function generatorMsgForCmd(e3, t3, r3, s3) {
            const { onSendBefore: i3, onUploadStart: n3, onUploadDone: o2, replyMsg: a2 } = e3, c2 = __rest(e3, ["onSendBefore", "onUploadStart", "onUploadDone", "replyMsg"]);
            let d2 = Object.assign(Object.assign({}, formatReverse(Fs, c2)), { scene: Fe[e3.scene], type: Re[e3.type], from: t3, fromClientType: 16, fromDeviceId: r3, fromNick: null == s3 ? void 0 : s3.nick, userUpdateTime: null == s3 ? void 0 : s3.updateTime, status: Le[Le.sending] });
            if (d2.idClient = d2.resendFlag ? e3.idClient : rs(), !d2.idClient)
              throw new FormatError("idClient is required to resend a message", "idClient", "required");
            return d2 = processPushInfoInMsg(d2, false), a2 && (d2.replyMsgFromAccount = a2.from, d2.replyMsgToAccount = a2.to, d2.replyMsgTime = +a2.time, d2.replyMsgIdServer = a2.idServer, d2.replyMsgIdClient = a2.idClient, d2.threadMsgFromAccount = a2.from, d2.threadMsgToAccount = a2.to, d2.threadMsgTime = +a2.time, d2.threadMsgIdServer = a2.idServer, d2.threadMsgIdClient = a2.idClient, a2.threadMessageInfo && a2.threadMessageInfo.threadMsgIdServer && (d2.threadMsgFromAccount = a2.threadMessageInfo.threadMsgFromAccount, d2.threadMsgToAccount = a2.threadMessageInfo.threadMsgToAccount, d2.threadMsgTime = a2.threadMessageInfo.threadMsgTime, d2.threadMsgIdServer = a2.threadMessageInfo.threadMsgIdServer, d2.threadMsgIdClient = a2.threadMessageInfo.threadMsgIdClient)), d2;
          }(e2, this.core.account, this.core.config.deviceId, null === (t2 = this.core.user) || void 0 === t2 ? void 0 : t2.myInfo), i2 = formatMsg(Object.assign(Object.assign({}, s2), { time: new Date().getTime() }), { account: this.core.account, featureValue: Ue.default, statusValue: Le.sending });
          try {
            e2.onSendBefore && e2.onSendBefore(i2);
          } catch (e3) {
            this.logger.error("sendMsg: options.onSendBefore error", e3);
          }
          let n2;
          return this.core.eventBus.emit("session/updateForNewMsg", i2), this.core.sendCmd(r2, { msg: s2 }).then((t3) => {
            const { content: r3, error: o2 } = t3;
            if (n2 = r3.msg, o2)
              throw o2;
            const a2 = formatMsg(Object.assign(Object.assign({}, s2), r3.msg), { account: this.core.account, featureValue: Ue.default, statusValue: Le.sent });
            return a2.from === a2.to && this.markMsgsAck([a2]), this.core.eventBus.emit("session/updateForNewMsg", a2), this.core.reporter.report("msgSend", { msgId: a2.idServer, clientId: a2.idClient, msgTime: a2.time, fromAccid: "p2p" === e2.scene ? this.core.account : "", toAccid: a2.to, type: Fe[a2.scene], roomId: "", tid: "p2p" === e2.scene ? "" : a2.to, result: 200, failReason: "", rt: Date.now() - i2.time }), a2;
          }).catch((t3) => {
            const r3 = formatMsg(Object.assign(Object.assign(Object.assign({}, s2), { time: new Date().getTime() }), n2), { account: this.core.account, featureValue: Ue.default, statusValue: 7101 === t3.code ? Le.refused : Le.sendFailed });
            throw t3.msg = r3, this.core.eventBus.emit("session/updateForNewMsg", r3), this.core.reporter.report("msgSend", { msgId: r3.idServer, clientId: r3.idClient, msgTime: r3.time, fromAccid: "p2p" === e2.scene ? this.core.account : "", toAccid: r3.to, type: Fe[r3.scene], roomId: "", tid: "p2p" === e2.scene ? "" : r3.to, result: null == t3 ? void 0 : t3.code, failReason: (null == t3 ? void 0 : t3.message) || "", rt: Date.now() - i2.time }), t3;
          });
        }
        resendMsg(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ msg: { type: "object", rules: { idClient: { type: "string", allowEmpty: false } } } }, e2);
            const t2 = e2.msg, r2 = Object.assign(Object.assign({}, t2), { attach: t2.attach ? JSON.stringify(t2.attach) : void 0, setting: { resendFlag: true } });
            if (t2.from !== this.core.account)
              throw new Error(`You can only resend messages that you sent: ${t2.idClient}`);
            return this.sendMsg(r2);
          });
        }
        forwardMsg(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ msg: { type: "object", rules: { idClient: { type: "string", allowEmpty: false } } }, scene: { type: "enum", values: getEnumKeys(Fe) }, to: { type: "string", allowEmpty: false } }, e2);
            const t2 = e2.msg, r2 = Object.assign(Object.assign({}, t2), { scene: e2.scene, to: e2.to, attach: t2.attach ? JSON.stringify(t2.attach) : void 0 });
            return this.sendMsg(r2);
          });
        }
        sendImageMsg(e2) {
          return this.doSendFile(Object.assign(Object.assign({}, e2), { type: "image" }));
        }
        sendFileMsg(e2) {
          return this.doSendFile(Object.assign(Object.assign({}, e2), { type: "file" }));
        }
        sendAudioMsg(e2) {
          return this.doSendFile(Object.assign(Object.assign({}, e2), { type: "audio" }));
        }
        sendVideoMsg(e2) {
          return this.doSendFile(Object.assign(Object.assign({}, e2), { type: "video" }));
        }
        doSendFile(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ scene: { type: "enum", values: getEnumKeys(Fe) }, to: { type: "string", allowEmpty: false }, type: { type: "string", allowEmpty: false }, attach: { type: "object", rules: { url: { type: "string", allowEmpty: false } }, required: false }, maxSize: { type: "number", min: 1, required: false } }, e2);
            let t2 = e2.attach;
            if (!t2) {
              if (!this.core.cloudStorage || !this.core.cloudStorage.uploadFile)
                throw new Error('Service "cloudStorage" does not exist');
              try {
                t2 = yield this.core.cloudStorage.uploadFile(e2);
              } catch (e3) {
                throw this.logger.error("sendFile:: upload File error or abort", e3), e3;
              }
            }
            return this.sendMsg(Object.assign(Object.assign({}, e2), { attach: JSON.stringify(t2), type: e2.type }));
          });
        }
        recallMsg(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ msg: { type: "object", rules: { idClient: { type: "string", allowEmpty: false }, idServer: { type: "string", allowEmpty: false }, scene: { type: "enum", values: getEnumKeys(Fe) }, time: { type: "number" } } }, pushInfo: { type: "object", required: false, rules: qs }, ps: { type: "string", allowEmpty: false, required: false } }, e2);
            const t2 = e2.msg;
            yield this.core.sendCmd({ p2p: "recallMsg", team: "recallMsg", superTeam: "recallSuperTeamMsg" }[t2.scene], { recallMsgTag: processPushInfoInMsg({ time: t2.time, type: { p2p: 7, team: 8, superTeam: 12 }[t2.scene], to: t2.to, from: t2.from, ps: e2.ps, attach: e2.attach, deletedIdClient: t2.idClient, deletedIdServer: t2.idServer, opeAccount: t2.from, env: e2.env, pushInfo: e2.pushInfo }) });
            const r2 = Object.assign({}, t2, { deletedMsgCreateTime: t2.time });
            return this.core.eventBus.emit("session/updateForDeletedMsg", formatDeletedMsgs([r2])), t2;
          });
        }
        deleteSelfMsgs(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ msgs: { type: "array", rules: { scene: { type: "enum", values: ["p2p", "team"] }, from: { type: "string", allowEmpty: false }, to: { type: "string", allowEmpty: false }, idServer: { type: "string", allowEmpty: false }, idClient: { type: "string", allowEmpty: false }, time: { type: "number", allowEmpty: false } } }, ext: { type: "string", allowEmpty: false, required: false } }, e2);
            const t2 = e2.msgs.map((t3) => ({ scene: "p2p" === t3.scene ? 1 : 2, from: t3.from, to: t3.to, idServer: t3.idServer, idClient: t3.idClient, deletedMsgCreateTime: t3.time, ext: e2.ext })), r2 = yield this.core.sendCmd("deleteSelfMsgs", { deletedMsgs: t2 }), s2 = formatDeletedMsgs(t2.map((e3) => {
              var t3;
              return Object.assign({}, e3, { time: null === (t3 = null == r2 ? void 0 : r2.content) || void 0 === t3 ? void 0 : t3.timetag });
            }));
            return this.core.eventBus.emit("session/updateForDeletedMsg", s2), s2;
          });
        }
        sendMsgReceipt(e2) {
          var t2, r2;
          return __awaiter(this, void 0, void 0, function* () {
            validate({ msg: { type: "object", rules: { idClient: { type: "string", allowEmpty: false }, target: { type: "string", allowEmpty: false }, time: { type: "number" } } } }, e2);
            const s2 = e2.msg;
            if ("p2p" !== s2.scene || "in" !== s2.flow)
              return void this.logger.warn(`Msg scene: ${s2.scene}, flow: ${s2.flow} is not allowed to send msg receipt`);
            const i2 = { to: s2.target, idClient: s2.idClient, time: s2.time }, n2 = yield this.core.sendCmd("sendMsgReceipt", { msgReceiptTag: i2 }), o2 = parseInt(null === (r2 = null === (t2 = n2.content) || void 0 === t2 ? void 0 : t2.msgReceiptTag) || void 0 === r2 ? void 0 : r2.time);
            return Object.assign(Object.assign({}, i2), { time: o2 ? Math.min(o2, i2.time) : i2.time });
          });
        }
        sendTeamMsgReceipt(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamMsgReceipts: { type: "array", rules: { teamId: { type: "string", allowEmpty: false }, idClient: { type: "string", allowEmpty: false }, idServer: { type: "string", allowEmpty: false } }, max: 50 } }, e2);
            const t2 = e2.teamMsgReceipts;
            this.core.sendCmd("sendTeamMsgReceipt", { teamMsgReceipts: t2 });
          });
        }
        getTeamMsgReads(e2) {
          var t2;
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamMsgReceipts: { type: "array", rules: { teamId: { type: "string", allowEmpty: false }, idClient: { type: "string", allowEmpty: false }, idServer: { type: "string", allowEmpty: false } } } }, e2);
            const r2 = e2.teamMsgReceipts, s2 = yield this.core.sendCmd("getTeamMsgReads", { teamMsgReceipts: r2 });
            let i2 = null === (t2 = s2.content) || void 0 === t2 ? void 0 : t2.teamMsgReceipts;
            return i2 = i2 ? i2.map((e3) => Object.assign(Object.assign({}, e3), { read: parseInt(e3.read), unread: parseInt(e3.unread) })) : [], i2;
          });
        }
        getTeamMsgReadAccounts(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamMsgReceipt: { type: "object", rules: { teamId: { type: "string", allowEmpty: false }, idClient: { type: "string", allowEmpty: false }, idServer: { type: "string", allowEmpty: false } } } }, e2);
            const t2 = e2.teamMsgReceipt;
            return (yield this.core.sendCmd("getTeamMsgReadAccounts", { teamMsgReceiptTag: t2 })).content;
          });
        }
        markMsgsAck(e2) {
          if (!(e2 && e2.length > 0))
            return;
          const t2 = [], r2 = [];
          e2.forEach((e3) => {
            "p2p" === e3.scene && "in" === e3.flow ? t2.push(e3) : "team" === e3.scene && "in" === e3.flow && r2.push(e3);
          }), t2.length > 0 && this.core.sendCmd("batchMarkRead", { sid: 7, cid: 2, ids: t2.map((e3) => e3.idServer) }), r2.length > 0 && this.core.sendCmd("batchMarkRead", { sid: 8, cid: 3, ids: r2.map((e3) => e3.idServer) });
        }
        onMsgHandler(e2) {
          var t2;
          if (e2.error)
            return void this.logger.error("msgHandler::recvError", e2.error);
          const r2 = "number" == typeof Ie(e2, "raw.r[0]") ? `${e2.raw.r[0]}` : void 0, s2 = e2.content.msg;
          s2.idServer = s2.idServer || r2;
          const i2 = Date.now(), n2 = getSessionId(s2, this.core.account), o2 = null === (t2 = this.core.session) || void 0 === t2 ? void 0 : t2.getSessionWithUncomplete({ id: n2 }), a2 = formatMsg(s2, o2 ? { account: this.core.account, sessionAck: o2.ack, msgReceiptTime: o2.msgReceiptTime } : { account: this.core.account });
          if ("debug" === this.core.options.debugLevel ? this.logger.debug("msgHandler::recvMsg", a2.idClient, a2.idServer, a2) : this.logger.log("msgHandler::recvMsg", a2.idClient, a2.idServer), this.markMsgsAck([a2]), this.core.eventBus.emit("session/updateForNewMsg", a2), this.core.emit("msg", a2), "notification" === a2.type)
            this.core.eventBus.emit("team/onNotification", a2);
          else if ("out" !== a2.flow) {
            const t3 = "p2p" === a2.scene, r3 = { msgId: a2.idServer, clientId: a2.idClient, receiveTime: e2.__receiveTime, serverTime: a2.time, callbackTime: Date.now(), preHandleTime: i2, fromAccid: a2.from, toAccid: this.core.account, type: Fe[a2.scene], tid: t3 ? "" : a2.to, result: 200, failReason: "", rt: Date.now() - a2.time };
            this.core.reporter.report("msgReceive", r3);
          }
          "notification" !== a2.type && this.core.user.checkUserUpdate(a2);
        }
        nimOnTeamMsgsHandler(e2) {
          e2.content.datas.forEach((t2) => {
            this.onMsgHandler(Object.assign({}, e2, { content: { msg: t2 } }));
          });
        }
        syncRoamingMsgsHandler(e2) {
          var t2, r2;
          let s2 = e2.content.msgs || [];
          if (0 === s2.length)
            return;
          const i2 = getSessionId(s2[0], this.core.account), n2 = null === (t2 = this.core.session) || void 0 === t2 ? void 0 : t2.getSessionWithUncomplete({ id: i2 });
          s2 = formatMsgs(s2, n2 ? { account: this.core.account, featureValue: Ue.roam, sessionAck: n2.ack, msgReceiptTime: n2.msgReceiptTime } : { account: this.core.account, featureValue: Ue.roam });
          const o2 = s2[0].time, a2 = { timetag: o2, sessionId: i2, msgs: Us(s2) };
          (null === (r2 = this.core.sync) || void 0 === r2 ? void 0 : r2.getSyncDoneFlag()) || this.core.eventBus.emit("session/syncMsgs", a2), this.core.emit("syncRoamingMsgs", a2), this.core.eventBus.emit("sync/updateTimetag", { roamingMsgs: o2 });
        }
        syncOfflineMsgsHandler(e2) {
          const t2 = e2.content.msgs || [];
          if (0 === t2.length)
            return;
          const r2 = {}, s2 = [];
          t2.forEach((e3) => {
            const t3 = getSessionId(e3, this.core.account), i3 = this.core.session.getSessionWithUncomplete({ id: t3 }), n2 = formatMsg(e3, i3 ? { account: this.core.account, featureValue: Ue.leave, sessionAck: i3.ack, msgReceiptTime: i3.msgReceiptTime } : { account: this.core.account, featureValue: Ue.leave });
            s2.push(n2), r2[n2.sessionId] ? r2[n2.sessionId].push(n2) : r2[n2.sessionId] = [n2];
          }), this.markMsgsAck(s2);
          let i2 = 0;
          Object.keys(r2).forEach((e3) => {
            let t3 = r2[e3].sort((e4, t4) => t4.time - e4.time);
            t3 = removeDupMsgsByIdClient(t3), t3[0].time > i2 && (i2 = t3[0].time);
            const s3 = { timetag: t3[0].time, sessionId: e3, msgs: t3 };
            this.core.eventBus.emit("session/syncMsgs", s3), this.core.emit("syncOfflineMsgs", s3);
          }), this.core.eventBus.emit("sync/updateTimetag", { offlineMsgs: i2 });
        }
        syncDeleteSelfMsgsHandler(e2) {
          var t2;
          const r2 = null === (t2 = e2.content) || void 0 === t2 ? void 0 : t2.deletedMsgs;
          r2 && r2.length > 0 || this.logger.warn("syncDeleteSelfMsgs:: no msgs");
          const s2 = r2[r2.length - 1].time;
          this.core.eventBus.emit("sync/updateTimetag", { deleteSelfMsgs: s2 });
        }
        onDeleteSelfMsgHandler(e2) {
          const t2 = formatDeletedMsgs([e2.content.deletedMsg]);
          this.core.eventBus.emit("session/updateForDeletedMsg", t2), this.core.emit("deleteSelfMsgs", t2);
        }
        onDeleteSelfMsgsHandler(e2) {
          const t2 = formatDeletedMsgs(e2.content.deletedMsgs);
          this.core.eventBus.emit("session/updateForDeletedMsg", t2), this.core.emit("deleteSelfMsgs", t2);
        }
        onBroadcastMsgHandler(e2) {
          const t2 = e2.content.msg, r2 = this.service.processBroadcastMsg([t2]);
          this.core.emit("broadcastMsgs", r2);
        }
        syncBroadcastMsgHandler(e2) {
          const t2 = e2.content.msgs, r2 = this.service.processBroadcastMsg(t2);
          this.core.emit("broadcastMsgs", r2);
        }
      }, "msg"), NIM.registerService(class MiscService extends Service {
        constructor(e2) {
          super("misc", e2), this.core = e2, this.nosCdnHostTimer = 0, registerParser({ cmdMap: Gs, cmdConfig: Ks });
        }
      }, "misc"), NIM.registerService(class UserService extends Service {
        constructor(e2) {
          super("user", e2), this.userInfoMap = /* @__PURE__ */ new Map(), this.myInfo = formatUser({}), registerParser({ cmdMap: Ps, cmdConfig: js });
        }
        setBlack(e2) {
          return validate({ account: { type: "string", allowEmpty: false }, isAdd: { type: "boolean" } }, e2), this.core.sendCmd("setBlack", e2).then(() => {
          });
        }
        setMute(e2) {
          return validate({ account: { type: "string", allowEmpty: false }, isAdd: { type: "boolean" } }, e2), this.core.sendCmd("setMute", e2).then(() => {
          });
        }
        getRelations() {
          return this.core.sendCmd("syncRelations", { timetag: 0 });
        }
        getBlackList() {
          return __awaiter(this, void 0, void 0, function* () {
            return (yield this.core.sendCmd("syncRelations", { timetag: 0 })).blackList || [];
          });
        }
        getMuteList() {
          return __awaiter(this, void 0, void 0, function* () {
            return (yield this.core.sendCmd("syncRelations", { timetag: 0 })).muteList || [];
          });
        }
        updatePushToken() {
          return __awaiter(this, void 0, void 0, function* () {
            this.logger.error("This function is deprecated, please use nim.offlinePush.setOfflinePushConfig instead");
          });
        }
        updateAppBackground() {
          return __awaiter(this, void 0, void 0, function* () {
            this.logger.error("This function is deprecated, please use nim.offlinePush.setOfflinePushConfig instead");
          });
        }
        getUsersNameCardFromServer(e2) {
          return validate({ accounts: { type: "array", max: 150, itemType: "string" } }, e2), this.core.sendCmd("getUsersNameCardFromServer", ni(e2, ["accounts"])).then((t2) => {
            const { content: r2 } = t2;
            return this.logger.log("user:: getUsers done", e2.accounts), r2 && r2.users ? r2.users.map((e3) => formatUser(e3)) : [];
          });
        }
        updateMyNameCard(e2) {
          if (validate({ nick: { type: "string", required: false }, avatar: { type: "string", required: false }, signature: { type: "string", required: false }, gender: { type: "enum", values: getEnumKeys(Cs), required: false }, email: { type: "string", required: false }, birth: { type: "string", required: false }, tel: { type: "string", required: false }, ext: { type: "string", required: false } }, e2), 0 === Object.keys(e2).length)
            return Promise.resolve(this.myInfo);
          const t2 = ni(e2, ["nick", "avatar", "signature", "email", "birth", "tel", "ext"]);
          return e2.gender && (t2.gender = Cs[e2.gender]), this.core.sendCmd("updateMyNameCard", { user: t2 }).then((r2) => {
            const { content: s2 } = r2;
            return s2 && s2.timetag && this.core.eventBus.emit("sync/updateTimetag", { myInfo: +s2.timetag }), e2.gender && (t2.gender = e2.gender), this.myInfo = Object.assign({}, this.myInfo, t2), this.myInfo;
          });
        }
        checkUserUpdate(e2) {
          const t2 = e2.from;
          if (this.logger.log("checkUserUpdate", t2), t2 !== this.core.account) {
            const r2 = this.userInfoMap.get(t2);
            if (r2) {
              const s2 = r2.updateTime, i2 = e2.userUpdateTime;
              !isNaN(s2) && !isNaN(i2) && "number" == typeof s2 && "number" == typeof i2 && s2 < i2 && this.refreshUserInfo(t2);
            } else
              this.refreshUserInfo(t2);
          }
        }
        refreshUserInfo(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            this.logger.log("refreshUserInfo", e2);
            const t2 = yield this.getUsersNameCardFromServer({ accounts: [e2] });
            for (const e3 of t2)
              this.userInfoMap.set(e3.account, e3), this.core.emit("updateUserInfo", e3);
          });
        }
        onUpdateBlackListHandler(e2) {
          const { content: t2 } = e2;
          t2.account ? this.core.emit("updateBlackList", t2) : this.logger.warn("onUpdateBlackListHandler: no account");
        }
        onUpdateMuteListHandler(e2) {
          const { content: t2 } = e2;
          t2.account ? this.core.emit("updateMuteList", t2) : this.logger.warn("onUpdateBlackListHandler: no account");
        }
        syncRelationsHandler(e2) {
          const { content: t2 } = e2, { list: r2, timetag: s2 } = t2, i2 = { blackList: [], muteList: [] };
          return s2 && this.core.eventBus.emit("sync/updateTimetag", { relations: s2 }), r2 && r2.length && r2.forEach((e3) => {
            const t3 = function formatRelationMember(e4) {
              const t4 = { account: e4.account, updateTime: +e4.updateTime, createTime: +e4.createTime };
              return "1" === e4.isMuted && (t4.isMuted = true), "1" === e4.isBlack && (t4.isBlack = true), t4;
            }(e3);
            t3.isBlack && i2.blackList.push(t3), t3.isMuted && i2.muteList.push(t3);
          }), this.core.emit("relations", i2), Promise.resolve(i2);
        }
        syncMyNameCardHandler(e2) {
          e2.content.user && (this.myInfo = formatUser(e2.content.user), this.core.emit("syncMyNameCard", this.myInfo), this.core.eventBus.emit("sync/updateTimetag", { myInfo: e2.content.timetag }));
        }
        onUpdateMyNameCardHandler(e2) {
          const t2 = e2.content.user;
          t2 ? (Object.assign(this.myInfo, formatUser(t2)), this.core.emit("updateMyNameCard", this.myInfo)) : this.logger.warn("onUpdateMyNameCardHandler no user info");
        }
      }, "user"), NIM.registerService(class SessionService extends Service {
        constructor(e2, t2) {
          super("session", e2), this.list = /* @__PURE__ */ new Map(), this.unreadCountFilterFn = (e3) => true, this.lastMessageFilterFn = (e3) => true, this.initEventListeners(), registerParser({ cmdMap: gn, cmdConfig: fn }), this.stickTopService = new StickTopService(e2), this.unreadModule = new UnreadModuleService(e2), t2 && this.setOptions(t2);
        }
        setOptions(e2) {
          "function" == typeof (null == e2 ? void 0 : e2.unreadCountFilterFn) && (this.unreadCountFilterFn = e2.unreadCountFilterFn), "function" == typeof (null == e2 ? void 0 : e2.lastMessageFilterFn) && (this.lastMessageFilterFn = e2.lastMessageFilterFn);
        }
        destroy() {
          this.list.forEach((e2) => {
            e2.unreadMsgs = [];
          }), this.list.clear();
        }
        initEventListeners() {
          this.core.eventBus.on("session/syncMsgs", this.onSyncMsgs.bind(this)), this.core.eventBus.on("session/updateForNewMsg", this.updateSessionWithMsg.bind(this)), this.core.eventBus.on("session/updateForClearMsg", (e2, t2 = true) => {
            e2 && e2.length > 0 && e2.forEach((e3) => {
              this.updateSession({ id: e3.sessionId, lastMsg: null, unread: 0, unreadMsgs: [] }, t2);
            });
          }), this.core.eventBus.on("session/updateForDeletedMsg", this.updateSessionForDeletedMsg.bind(this));
        }
        createSession(e2, t2) {
          try {
            const { scene: r2, accid: s2 } = getAccountFromSessionId(e2);
            return { id: e2, scene: r2, to: s2, lastMsg: t2, updateTime: t2 ? t2.time : 0, unread: 0, unreadMsgs: [], ack: 0 };
          } catch (t3) {
            throw this.logger.error(`Failed to create session with ${e2}`, t3), new Error(`Failed to create session with ${e2}`);
          }
        }
        getSession(e2) {
          validate({ id: { type: "string", allowEmpty: false } }, e2);
          const t2 = this.list.get(e2.id);
          if (this.isSessionComplete(t2))
            return t2;
        }
        getSessionWithUncomplete(e2) {
          return this.list.get(e2.id);
        }
        getAllSessions() {
          const e2 = [];
          for (const [t2, r2] of this.list)
            this.isSessionComplete(r2) && e2.push(r2);
          return e2;
        }
        getSessions(e2) {
          validate({ limit: { type: "number", required: false }, lastSessionId: { type: "string", allowEmpty: false, required: false }, desc: { type: "boolean", required: false } }, e2);
          const t2 = [], { limit: r2 = 100, desc: s2 = true } = e2;
          let { lastSessionId: i2 } = e2, n2 = 0;
          if (s2) {
            for (const [e3, r3] of this.list) {
              if (i2 === e3)
                break;
              this.isSessionComplete(r3) && t2.push(r3);
            }
            return t2.slice(-r2).reverse();
          }
          for (const [e3, s3] of this.list)
            if (i2)
              e3 === i2 && (i2 = void 0);
            else if (this.isSessionComplete(s3)) {
              if (++n2 > r2)
                break;
              t2.push(s3);
            }
          return t2;
        }
        resetSessionUnreadCount(e2) {
          var t2;
          return __awaiter(this, void 0, void 0, function* () {
            validate({ id: { type: "string", allowEmpty: false } }, e2), validate({ id: { type: "string", allowEmpty: false } }, e2);
            const r2 = e2.id, s2 = this.list.get(r2);
            if (!s2)
              throw this.logger.warn("resetSessionUnreadCount: can not find session " + r2), new Error("Session::canSessionResetUnreadCount: can not find session " + r2);
            let i2 = false;
            try {
              i2 = this.unreadModule.canSessionResetUnreadCount(s2);
            } catch (e3) {
              this.logger.warn(e3);
            }
            if (false === i2)
              return;
            const { accid: n2, scene: o2 } = getAccountFromSessionId(r2), a2 = { to: n2, timetag: (null === (t2 = null == s2 ? void 0 : s2.lastMsg) || void 0 === t2 ? void 0 : t2.time) || s2.updateTime || 0 };
            let c2 = "markSuperTeamSessionAck";
            return "superTeam" !== o2 && (a2.scene = "p2p" === o2 ? 0 : 1, c2 = "markSessionAck"), this.core.sendCmd(c2, a2).then(() => {
              const e3 = this.storeUnreadByAck(r2, a2.timetag);
              e3 && this.core.emit("updateSession", e3);
            });
          });
        }
        resetMultiSessionUnreadCount(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ ids: { type: "array", itemType: "string", min: 1 } }, e2);
            const t2 = e2.ids.map((e3) => this.list.get(e3)).filter((t3, r3) => !!t3 || (this.logger.warn("Session::canSessionResetUnreadCount: can not find session " + e2.ids[r3]), false)), { superTeam: r2, p2pOrTeam: s2 } = this.unreadModule.filterSessionForResetUnreadCount(t2), i2 = kn(r2.params, 50), n2 = kn(s2.params, 50);
            for (const e3 of i2)
              yield this.core.sendCmd(r2.cmd, { datas: e3 }), e3.forEach((e4) => {
                const t3 = this.storeUnreadByAck(e4.sessionId, e4.timetag);
                t3 && this.core.emit("updateSession", t3);
              });
            for (const e3 of n2)
              yield this.core.sendCmd(s2.cmd, { datas: e3 }), e3.forEach((e4) => {
                const t3 = this.storeUnreadByAck(e4.sessionId, e4.timetag);
                t3 && this.core.emit("updateSession", t3);
              });
          });
        }
        resetAllSessionsUnreadCount() {
          const e2 = [];
          return this.list.forEach((t2) => {
            e2.push(t2.id);
          }), this.resetMultiSessionUnreadCount({ ids: e2 });
        }
        deleteSession(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ id: { type: "string", allowEmpty: false }, isSyncToServer: { type: "boolean", required: false } }, e2), this.list.delete(e2.id), this.core.msgLog && e2.isSyncToServer && (yield this.core.msgLog.deleteRoamingMsgs({ ids: [e2.id] }));
          });
        }
        deleteAllSessionsFromLocal() {
          this.list.clear();
        }
        addStickTopSession(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            const t2 = yield this.stickTopService.addStickTopSession(e2);
            return this.list.set(t2.id, t2), t2;
          });
        }
        deleteStickTopSession(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            const t2 = yield this.stickTopService.deleteStickTopSession(e2);
            return this.list.set(t2.id, t2), t2;
          });
        }
        updateStickTopSession(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            const t2 = yield this.stickTopService.updateStickTopSession(e2);
            return this.list.set(t2.id, t2), t2;
          });
        }
        nimMultiSyncAddStickTopSessionHandler(e2) {
          const t2 = this.stickTopService.stickTopSessionHandler(e2.content.data);
          this.list.set(t2.id, t2), this.core.emit("updateSession", t2);
        }
        nimMultiSyncDeleteStickTopSessionHandler(e2) {
          const t2 = this.stickTopService.stickTopSessionHandler({ id: e2.content.data.id, updateTime: e2.content.timetag }, false);
          this.list.set(t2.id, t2), this.core.emit("updateSession", t2);
        }
        nimMultiSyncUpdateStickTopSessionHandler(e2) {
          const t2 = this.stickTopService.stickTopSessionHandler(e2.content.data);
          this.list.set(t2.id, t2), this.core.emit("updateSession", t2);
        }
        nimSyncStickTopSessionsHandler(e2) {
          e2.content.datas.forEach((e3) => {
            const t2 = this.stickTopService.stickTopSessionHandler(e3);
            this.list.set(t2.id, t2);
          });
        }
        updateSessionWithMsg(e2) {
          let t2 = true, r2 = true;
          try {
            t2 = !!this.unreadCountFilterFn(e2);
          } catch (e3) {
            this.logger.error("session:updateSessionWithMsg, unreadCountFilterFn error", e3);
          }
          try {
            r2 = !!this.lastMessageFilterFn(e2);
          } catch (e3) {
            this.logger.error("session:updateSessionWithMsg, lastMessageFilterFn error", e3);
          }
          const s2 = this.list.get(e2.sessionId) || this.createSession(e2.sessionId);
          let i2 = false;
          if (this.logger.log("session:updateSessionWithMsg, pending ", e2.sessionId, e2.idClient, e2.idServer, r2, t2), r2 && (!s2.lastMsg || s2.lastMsg.time < e2.time || e2.status === Le[Le.sending] || s2.lastMsg.status === Le[Le.sending]) && (s2.lastMsg = e2, s2.updateTime = e2.time, i2 = true), t2 && e2.status === Le[Le.unread] && e2.time > (s2.ack || 0)) {
            s2.unread++;
            const t3 = s2.unreadMsgs || [];
            t3.unshift(e2), t3.sort((e3, t4) => t4.time - e3.time), i2 = true;
          }
          i2 && (this.logger.log("session:updateSessionWithMsg updating ", s2.id, s2.unread, s2.lastMsg && s2.lastMsg.idClient), this.list.set(s2.id, s2), this.core.emit("updateSession", s2));
        }
        storeUnreadByAck(e2, t2) {
          const r2 = this.list.get(e2) || this.createSession(e2);
          if (r2.ack && t2 < r2.ack)
            return void this.logger.warn("storeUnreadByAck: not need update ack", e2, t2, r2.ack);
          const s2 = r2.unreadMsgs || [], i2 = [];
          let n2 = 0;
          return r2.unreadMsgs = [], s2.length > 0 && (s2.forEach((e3) => {
            e3.time > t2 && (n2++, i2.push(e3));
          }), r2.unreadMsgs = i2.sort((e3, t3) => t3.time - e3.time)), r2.ack = t2, r2.unread = n2, r2.lastMsg && "unread" === r2.lastMsg.status && t2 >= r2.lastMsg.time && (r2.lastMsg.status = "read"), this.list.set(e2, r2), r2;
        }
        updateSession(e2, t2 = true) {
          const r2 = e2.id, s2 = this.list.get(r2) || this.createSession(e2.id), i2 = Object.assign(s2, e2);
          return this.list.set(r2, i2), this.logger.log("updateSession: update", t2, ni(e2, ["id", "ack", "unread"]), i2.lastMsg && i2.lastMsg.idClient), t2 && this.core.emit("updateSession", i2), i2;
        }
        isSessionComplete(e2) {
          return !!e2 && (!!(e2.id && e2.scene && e2.to) && void 0 !== e2.lastMsg);
        }
        syncSessionAckHandler(e2) {
          const t2 = e2.content.p2p || {}, r2 = e2.content.team.m_map || {};
          this.logger.log("syncSessionAck::", t2, r2), Object.keys(t2).forEach((e3) => {
            this.updateSession({ id: "p2p-" + e3, ack: t2[e3] }, false);
          }), Object.keys(r2).forEach((e3) => {
            this.updateSession({ id: "team-" + e3, ack: r2[e3] }, false);
          });
        }
        syncSuperTeamSessionAckHandler(e2) {
          const t2 = e2.content.superTeam.m_map;
          this.logger.log("syncSuperTeamSessionAck::", t2), Object.keys(t2).forEach((e3) => {
            this.updateSession({ id: "superTeam-" + e3, ack: t2[e3] }, false);
          });
        }
        syncMarkSessionAckHandler(e2) {
          const t2 = e2.content, r2 = `${0 === t2.scene ? "p2p" : 1 === t2.scene ? "team" : "superTeam"}-${t2.to}`, s2 = this.list.get(r2);
          if (s2 && s2.ack && t2.timetag < s2.ack)
            this.logger.warn(`syncMarkSessionAckHandler: ${r2} do not need update ack`, s2.ack, t2.timetag);
          else {
            const e3 = this.storeUnreadByAck(r2, t2.timetag);
            e3 && this.core.emit("updateSession", e3);
          }
        }
        syncMarkSuperTeamSessionAckHandler(e2) {
          e2.content.scene = 5, this.syncMarkSessionAckHandler(e2);
        }
        onSyncDone() {
          let e2 = [];
          this.list.forEach((t2, r2) => {
            e2.push(this.storeUnreadByAck(r2, t2.ack || 0));
          }), this.list.clear(), e2.sort((e3, t2) => e3.updateTime - t2.updateTime).forEach((e3) => {
            this.list.set(e3.id, e3);
          }), e2 = e2.filter((e3) => this.isSessionComplete(e3)).sort((e3, t2) => t2.updateTime - e3.updateTime), e2.length > 0 && this.core.emit("sessions", e2);
        }
        onSyncMsgs(e2) {
          let t2 = this.list.get(e2.sessionId), r2 = [];
          try {
            r2 = e2.msgs.filter((e3) => this.unreadCountFilterFn(JSON.parse(JSON.stringify(e3))));
          } catch (e3) {
            this.logger.error("session:onSyncMsgs, unreadCountFilterFn error ", e3);
          }
          let s2, i2 = [];
          try {
            i2 = e2.msgs.filter((e3) => this.lastMessageFilterFn(JSON.parse(JSON.stringify(e3))));
          } catch (e3) {
            this.logger.error("session:onSyncMsgs, lastMessageFilterFn error ", e3);
          }
          i2 && i2.length > 0 && (s2 = i2[i2.length - 1], s2 = i2[0].time > s2.time ? i2[0] : s2);
          const n2 = s2 ? s2.time : 0;
          t2 || (t2 = s2 ? this.createSession(e2.sessionId, s2) : this.createSession(e2.sessionId)), t2.unreadMsgs = t2.unreadMsgs ? r2.concat(t2.unreadMsgs).filter((e3) => e3.status === Le[Le.unread]) : r2.filter((e3) => e3.status === Le[Le.unread]), t2.updateTime && t2.updateTime >= n2 || (t2.updateTime = n2), t2.lastMsg && t2.lastMsg.time >= n2 || (t2.lastMsg = s2), this.list.set(t2.id, t2);
        }
        updateSessionForDeletedMsg(e2) {
          const t2 = {};
          e2.forEach((e3) => {
            const r2 = e3.to === this.core.account ? e3.from : e3.to, s2 = `${e3.scene}-${r2}`, i2 = this.list.get(s2);
            if (!i2)
              return;
            if ((i2.ack || 0) < e3.time && e3.from !== this.core.account && i2.unread > 0 && (i2.unread = i2.unread - 1, i2.unreadMsgs && i2.unreadMsgs.length > 0)) {
              const t3 = un(i2.unreadMsgs, { idClient: e3.idClient });
              t3 >= 0 && i2.unreadMsgs.splice(t3, 1);
            }
            i2.lastMsg && i2.lastMsg.idClient === e3.idClient && (i2.lastMsg = null), t2[i2.id] = true;
          }), Object.keys(t2).forEach((e3) => {
            const t3 = this.list.get(e3);
            t3 && this.core.emit("updateSession", t3);
          });
        }
        multiSyncMsgReceiptHandler(e2) {
          var t2;
          const r2 = null === (t2 = e2.content) || void 0 === t2 ? void 0 : t2.msgReceiptTag;
          if (r2) {
            this.updateSessionMsgReceiptTime([r2], true), r2.msgReceiptTime = r2.time, r2.sessionId = `p2p-${r2.from}`;
            const e3 = __rest(r2, ["time", "from"]);
            this.core.emit("msgReceipts", [e3]);
          }
        }
        syncMsgReceiptsHandler(e2) {
          var t2;
          const r2 = null === (t2 = e2.content) || void 0 === t2 ? void 0 : t2.msgReceipts;
          r2 && this.updateSessionMsgReceiptTime(r2, false);
        }
        updateSessionMsgReceiptTime(e2, t2 = true) {
          e2 && e2.length > 0 && e2.forEach((e3) => {
            let r2 = this.list.get(`p2p-${e3.from}`);
            r2 || (r2 = this.createSession(`p2p-${e3.from}`));
            const s2 = parseInt(e3.time);
            r2.msgReceiptTime && r2.msgReceiptTime >= s2 || (r2.msgReceiptTime = s2, r2.lastMsg && "sent" === r2.lastMsg.status && s2 >= r2.lastMsg.time && (r2.lastMsg.status = "receipt"), this.logger.log(`session: update session ${r2.id} msgReceiptTime: ${r2.msgReceiptTime}`), this.list.set(r2.id, r2), t2 && this.core.emit("updateSession", r2));
          });
        }
        nimSyncSessionsWithMoreRoamingHandler(e2) {
          const t2 = function formatMoreRoamingSession(e3, t3) {
            return e3.map((e4) => {
              const r2 = format(Sn, e4);
              return r2.sessionId = getSessionId(e4, t3), r2;
            });
          }(e2.content.datas, this.core.account);
          this.logger.log("session:syncSessionsWithMoreRoaming", t2);
        }
      }, "session"), NIM.registerService(class TeamService extends Service {
        constructor(e2) {
          super("team", e2), this.myTeamMembersMap = /* @__PURE__ */ new Map(), this.service = new ModuleService$1(e2), this.core.eventBus.on("team/onNotification", (e3) => this.notificationHandler(e3)), registerParser({ cmdMap: Is, cmdConfig: Es });
        }
        destroy() {
          this.myTeamMembersMap.clear();
        }
        mergeMyTeamMembers(e2) {
          e2.forEach((e3) => {
            const t2 = e3.teamId, r2 = this.myTeamMembersMap.get(t2), s2 = Object.assign({}, r2, e3);
            this.myTeamMembersMap.set(t2, s2);
          });
        }
        getTeamInfo(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false } }, e2);
            return formatTeam((yield this.core.sendCmd("getTeamInfo", { teamId: e2.teamId })).content.team);
          });
        }
        getTeams() {
          return __awaiter(this, void 0, void 0, function* () {
            return formatTeams((yield this.core.sendCmd("getTeams", { timetag: 0 })).content.teams);
          });
        }
        getTeamsById(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamIds: { type: "array", itemType: "string" } }, e2);
            const t2 = yield this.core.sendCmd("getTeamsById", { teamIds: e2.teamIds });
            return { teams: formatTeams(t2.content.teams), tids: t2.content.tids };
          });
        }
        createTeam(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ type: { type: "enum", values: ["advanced", "normal"] }, name: { type: "string", allowEmpty: false }, level: { type: "number", required: false }, accounts: { type: "array", itemType: "string", required: false }, ps: { type: "string", allowEmpty: false, max: 5e3, required: false }, joinMode: { type: "enum", values: ["noVerify", "needVerify", "rejectAll"], required: false }, beInviteMode: { type: "enum", values: ["noVerify", "needVerify"], required: false }, inviteMode: { type: "enum", values: ["manager", "all"], required: false }, updateTeamMode: { type: "enum", values: ["manager", "all"], required: false }, updateExtMode: { type: "enum", values: ["manager", "all"], required: false }, intro: { type: "string", allowEmpty: false, required: false }, announcement: { type: "string", allowEmpty: false, required: false }, avatar: { type: "string", allowEmpty: false, required: false }, ext: { type: "string", allowEmpty: false, required: false } }, e2);
            const t2 = generateTeam(e2);
            return formatTeam((yield this.core.sendCmd("createTeam", { team: t2, accounts: e2.accounts || [], ps: e2.ps || "" })).content.team);
          });
        }
        dismissTeam(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false } }, e2), yield this.core.sendCmd("dismissTeam", { teamId: e2.teamId });
          });
        }
        leaveTeam(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false } }, e2), yield this.core.sendCmd("leaveTeam", { teamId: e2.teamId });
          });
        }
        transferTeam(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, account: { type: "string", allowEmpty: false }, leave: { type: "boolean" } }, e2), yield this.core.sendCmd("transferTeam", e2);
          });
        }
        updateTeamInfo(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, joinMode: { type: "enum", values: ["noVerify", "needVerify", "rejectAll"], required: false }, beInviteMode: { type: "enum", values: ["noVerify", "needVerify"], required: false }, inviteMode: { type: "enum", values: ["manager", "all"], required: false }, updateTeamMode: { type: "enum", values: ["manager", "all"], required: false }, updateExtMode: { type: "enum", values: ["manager", "all"], required: false }, intro: { type: "string", allowEmpty: true, required: false }, announcement: { type: "string", allowEmpty: false, required: false }, avatar: { type: "string", allowEmpty: false, required: false }, ext: { type: "string", allowEmpty: false, required: false } }, e2);
            const t2 = generateTeam(e2);
            return yield this.core.sendCmd("updateTeamInfo", { team: t2 }), formatTeam(t2);
          });
        }
        getTeamMembers(e2) {
          var t2;
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, accounts: { type: "array", itemType: "string", required: false } }, e2);
            const r2 = yield this.core.sendCmd("getTeamMembers", { teamId: e2.teamId, timetag: 0 }), s2 = formatTeamMembers(null === (t2 = r2.content) || void 0 === t2 ? void 0 : t2.teamMembers);
            return e2.accounts && e2.accounts.length > 0 ? s2.filter((t3) => {
              var r3;
              return null === (r3 = e2.accounts) || void 0 === r3 ? void 0 : r3.includes(t3.account);
            }) : s2;
          });
        }
        getMutedTeamMembers(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false } }, e2);
            return formatTeamMembers((yield this.core.sendCmd("getMutedTeamMembers", { teamId: e2.teamId })).content.teamMembers);
          });
        }
        addTeamMembers(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, accounts: { type: "array", itemType: "string", min: 1 }, ps: { type: "string", allowEmpty: true, max: 5e3, required: false } }, e2), yield this.core.sendCmd("addTeamMembers", { teamId: e2.teamId, accounts: e2.accounts, ps: e2.ps || "", attach: e2.ext || "" });
          });
        }
        removeTeamMembers(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, accounts: { type: "array", itemType: "string", min: 1 } }, e2), yield this.core.sendCmd("removeTeamMembers", { teamId: e2.teamId, accounts: e2.accounts });
          });
        }
        applyTeam(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, ps: { type: "string", allowEmpty: true, max: 5e3, required: false } }, e2);
            return formatTeam((yield this.core.sendCmd("applyTeam", { teamId: e2.teamId, ps: e2.ps || "" })).content.team);
          });
        }
        addTeamManagers(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, accounts: { type: "array", min: 1, itemType: "string" } }, e2), yield this.core.sendCmd("addTeamManagers", e2);
          });
        }
        removeTeamManagers(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, accounts: { type: "array", min: 1, itemType: "string" } }, e2), yield this.core.sendCmd("removeTeamManagers", e2);
          });
        }
        updateMyMemberInfo(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, nickInTeam: { type: "string", allowEmpty: true, required: false }, bitConfigMask: { type: "number", min: 0, max: 2, required: false }, ext: { type: "string", required: false } }, e2);
            const t2 = generatorTeamMemberForCmd({ teamId: e2.teamId, nickInTeam: e2.nickInTeam, bitConfigMask: e2.bitConfigMask, ext: e2.ext });
            yield this.core.sendCmd("updateMyMemberInfo", { teamMember: t2 });
            const r2 = formatTeamMember(Object.assign({ updateTime: new Date().getTime(), account: this.core.account }, t2));
            this.mergeMyTeamMembers([r2]), this.core.emit("updateTeamMember", r2);
            const s2 = Zn(this.myTeamMembersMap.get(r2.teamId));
            return this.core.emit("myTeamMembers", [s2]), r2;
          });
        }
        updateMemberNick(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, account: { type: "string", allowEmpty: false }, nickInTeam: { type: "string", allowEmpty: true } }, e2);
            const t2 = generatorTeamMemberForCmd({ teamId: e2.teamId, nickInTeam: e2.nickInTeam, account: e2.account });
            yield this.core.sendCmd("updateNickInTeam", { teamMember: t2 });
            return formatTeamMember(Object.assign({ updateTime: new Date().getTime() }, t2));
          });
        }
        muteTeamMember(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, account: { type: "string", allowEmpty: false }, mute: { type: "boolean" } }, e2), yield this.core.sendCmd("muteTeamMember", { teamId: e2.teamId, account: e2.account, mute: e2.mute ? 1 : 0 });
          });
        }
        getTeamMemberInvitorAccid(e2) {
          var t2;
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, accounts: { type: "array", itemType: "string", max: 200 } }, e2);
            const r2 = { teamId: e2.teamId };
            e2.accounts && e2.accounts.length > 0 && (r2.accounts = e2.accounts);
            const s2 = yield this.core.sendCmd("getTeamMemberInvitorAccid", r2);
            return (null === (t2 = s2.content) || void 0 === t2 ? void 0 : t2.accountsMap) || {};
          });
        }
        muteTeam(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, mute: { type: "boolean" } }, e2), yield this.core.sendCmd("muteTeam", { teamId: e2.teamId, mute: e2.mute ? 1 : 0 });
          });
        }
        passTeamApply(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, from: { type: "string", allowEmpty: false } }, e2), yield this.core.sendCmd("passTeamApply", e2);
          });
        }
        rejectTeamApply(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, from: { type: "string", allowEmpty: false }, ps: { type: "string", max: 5e3, required: false } }, e2), yield this.core.sendCmd("rejectTeamApply", { teamId: e2.teamId, from: e2.from, ps: e2.ps || "" });
          });
        }
        acceptTeamInvite(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, from: { type: "string", allowEmpty: false } }, e2), yield this.core.sendCmd("acceptTeamInvite", e2);
          });
        }
        rejectTeamInvite(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, from: { type: "string", allowEmpty: false }, ps: { type: "string", max: 5e3, required: false } }, e2), yield this.core.sendCmd("rejectTeamInvite", { teamId: e2.teamId, from: e2.from, ps: e2.ps || "" });
          });
        }
        notifyTeamMsgReceiptsHandler(e2) {
          var t2;
          const r2 = null === (t2 = e2.content) || void 0 === t2 ? void 0 : t2.teamMsgReceipts;
          r2 && r2.length > 0 && (this.core.emit("teamMsgReceipts", r2), this.core.emit("msgReceipts", r2));
        }
        syncTeamsHandler(e2) {
          const t2 = e2.content;
          this.core.eventBus.emit("sync/updateTimetag", { teams: parseInt(t2.timetag) });
          const r2 = null == t2 ? void 0 : t2.teams;
          if (r2 && r2.length) {
            const e3 = formatTeams(r2);
            this.core.emit("teams", e3);
          }
        }
        syncCreateTeamHandler(e2) {
          const t2 = e2.content, r2 = formatTeam(null == t2 ? void 0 : t2.team), s2 = generatorMemberByTeam(r2, r2.owner, "owner");
          this.core.emit("createTeam", r2, s2);
        }
        syncUpdateTeamMemberHandler(e2) {
          const t2 = e2.content, r2 = formatTeamMember(null == t2 ? void 0 : t2.teamMember);
          r2.updateTime || (r2.updateTime = new Date().getTime()), this.mergeMyTeamMembers([r2]), this.core.emit("updateTeamMember", r2);
          const s2 = Zn(this.myTeamMembersMap.get(r2.teamId));
          this.core.emit("myTeamMembers", [s2]);
        }
        syncMyTeamMembersHandler(e2) {
          const t2 = e2.content;
          this.core.eventBus.emit("sync/updateTimetag", { myTeamMembers: parseInt(t2.timetag) });
          const r2 = null == t2 ? void 0 : t2.teamMembers.map((e3) => formatTeamMember(e3));
          this.mergeMyTeamMembers(r2), this.core.emit("myTeamMembers", Zn(r2));
        }
        notificationHandler(e2) {
          const { attach: t2, scene: r2, from: s2, to: i2, time: n2, idServer: o2, idClient: a2 } = e2, { team: c2, account: d2, accounts: m2, type: l2 } = t2;
          if ("team" === r2)
            switch ("debug" === this.core.options.debugLevel ? this.logger.debug("team::recvNotification", o2, a2, t2) : this.logger.log("team::recvNotification", o2, a2, i2, l2, d2, m2), l2) {
              case "updateTeam":
                c2.updateTime = n2, this.core.emit("updateTeam", c2);
                break;
              case "addTeamMembers":
                this.service.notifyAddTeamMembers(c2, m2);
                break;
              case "acceptTeamInvite":
                this.service.notifyAddTeamMembers(c2, [s2]);
                break;
              case "passTeamApply":
                this.service.notifyAddTeamMembers(c2, [d2]);
                break;
              case "addTeamManagers":
                this.service.notifyUpdateTeamManagers(i2, m2, true, n2);
                break;
              case "removeTeamManagers":
                this.service.notifyUpdateTeamManagers(i2, m2, false, n2);
                break;
              case "removeTeamMembers":
                this.service.notifyRemoveTeamMembers(c2, m2);
                break;
              case "leaveTeam":
                this.service.notifyRemoveTeamMembers(c2, [s2]);
                break;
              case "dismissTeam":
                this.core.emit("dismissTeam", { teamId: i2 });
                break;
              case "transferTeam":
                this.service.notifyTransferTeam(c2, s2, d2);
                break;
              case "updateTeamMemberMute":
                this.service.notifyUpdateTeamMembersMute(c2, [d2], t2.mute);
            }
        }
      }, "team"), NIM.registerService(class SystemMessageService extends Service {
        constructor(e2) {
          super("systemMessage", e2), this.sysMsgUnread = { total: 0, friend: 0, msg: 0, team: 0, superTeam: 0 }, this.core.eventBus.on("logined", () => {
            this.initEventListeners();
          }), registerParser({ cmdMap: so, cmdConfig: oo });
        }
        initEventListeners() {
          this.core.eventBus.on("systemMessage/passFriendApply", (e2) => {
            this.core.emit("updateSystemMessages", [{ idServer: e2.idServer, from: e2.account, state: "pass", type: "friendRequest" }]);
          }), this.core.eventBus.on("systemMessage/rejectFriendApply", (e2) => {
            this.core.emit("updateSystemMessages", [{ idServer: e2.idServer, from: e2.account, state: "decline", type: "friendRequest" }]);
          });
        }
        doMarkSysMsgAck(e2) {
          const t2 = [], r2 = [], s2 = ["applySuperTeam", "rejectSuperTeamApply", "superTeamInvite", "rejectSuperTeamInvite", "customSuperTeam"];
          e2.forEach((e3) => {
            e3.idServer && (s2.includes(e3.type) ? r2.push(e3.idServer) : t2.push(e3.idServer));
          }), t2.length > 0 && this.core.sendCmd("batchMarkRead", { sid: "7", cid: "3", ids: t2 }), r2.length > 0 && this.core.sendCmd("batchMarkRead", { sid: "21", cid: "19", ids: r2 });
        }
        sendCustomSysMsg(e2) {
          validate({ to: { type: "string", allowEmpty: false }, type: { type: "enum", values: ["customP2p", "customTeam", "customSuperTeam"] }, attach: { type: "string", allowEmpty: false }, setting: { type: "object", rules: { needSaveOffline: { type: "boolean", required: false }, env: { type: "string", allowEmpty: false, required: false } }, required: false }, pushInfo: { type: "object", required: false, rules: qs } }, e2);
          const t2 = "customSuperTeam" === e2.type ? "sendSuperTeamCustomSysMsg" : "sendCustomSysMsg";
          return this.core.sendCmd(t2, { sysMsg: generatorSysMsgForCmd(e2) }).then(() => {
            this.logger.log("sendCustomSysMsg success");
          }).catch((e3) => {
            throw this.logger.error("sendCustomSysMsg failed", e3.message), e3;
          });
        }
        onSysMsgHandler(e2) {
          var t2;
          const r2 = null === (t2 = e2.content) || void 0 === t2 ? void 0 : t2.sysMsg;
          if (!r2)
            return void this.logger.warn("onSysMsg no content.sysMsg");
          const s2 = "number" == typeof Ie(e2, "raw.r[0]") ? `${e2.raw.r[0]}` : void 0;
          r2.idServer = r2.idServer || s2;
          const i2 = formatSystemMessage(r2, this.logger, Xn.default);
          this.core.emit("sysMsg", i2), this.doMarkSysMsgAck([i2]);
        }
        syncOfflineSysMsgsHandler(e2) {
          if (!(e2.content.sysMsgs && e2.content.sysMsgs.length > 0))
            return;
          const t2 = e2.content.sysMsgs.map((e3) => formatSystemMessage(e3, this.logger, Xn.leave));
          this.core.emit("syncSysMsgs", t2), this.doMarkSysMsgAck(t2);
        }
        onRecallMsgHandler(e2) {
          var t2;
          const r2 = null === (t2 = e2.content) || void 0 === t2 ? void 0 : t2.sysMsg;
          if (!r2)
            return void this.logger.warn("onSysMsg no content.sysMsg");
          const s2 = "number" == typeof Ie(e2, "raw.r[0]") ? `${e2.raw.r[0]}` : void 0;
          r2.idServer = r2.idServer || s2;
          const i2 = formatDeletedMsgs([r2], function getSceneFromRecallSysMsg(e3) {
            return e3 === eo.recallMsgP2p ? "p2p" : e3 === eo.recallMsgTeam ? "team" : e3 === eo.recallMsgSuperTeam ? "superTeam" : "";
          }(+r2.type));
          this.core.eventBus.emit("session/updateForDeletedMsg", i2);
          const n2 = formatSystemMessage(r2, this.logger, Xn.default);
          this.core.emit("sysMsg", n2), this.doMarkSysMsgAck([n2]);
        }
        syncRecallMsgOfflineAndRoamingHandler(e2) {
          const { timetag: t2, type: r2, sysMsgs: s2 } = e2.content, i2 = parseInt(r2), n2 = 1 === i2 ? Xn.leave : Xn.roam, o2 = s2.map((e3) => formatSystemMessage(e3, this.logger, n2));
          1 === i2 && this.doMarkSysMsgAck(o2), this.core.eventBus.emit("sync/updateTimetag", { recallMsg: t2 }), this.core.emit("syncSysMsgs", o2);
        }
      }, "systemMessage"), NIM.registerService(class FriendService extends Service {
        constructor(e2) {
          super("friend", e2), registerParser({ cmdMap: co, cmdConfig: po });
        }
        getFriends() {
          var e2;
          return __awaiter(this, void 0, void 0, function* () {
            const t2 = yield this.core.sendCmd("getFriends", { timetag: 0 });
            let r2 = (null === (e2 = t2.content) || void 0 === e2 ? void 0 : e2.friends) || [];
            return r2 = r2.map((e3) => reverseFriend(e3)), r2;
          });
        }
        addFriend(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ account: { type: "string", allowEmpty: false }, ps: { type: "string", allowEmpty: false, required: false } }, e2), yield this.core.sendCmd("friendReuqest", { account: e2.account, type: 1, ps: e2.ps || "" });
            const t2 = new Date().getTime();
            return { account: e2.account, createTime: t2, updateTime: t2, valid: true, source: 0, passRelationShip: 1, relationShip: 1, bitsExtension: 0 };
          });
        }
        applyFriend(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ account: { type: "string", allowEmpty: false } }, e2), yield this.core.sendCmd("friendReuqest", { account: e2.account, type: 2, ps: e2.ps || "" });
          });
        }
        passFriendApply(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ account: { type: "string", allowEmpty: false } }, e2), yield this.core.sendCmd("friendReuqest", { account: e2.account, type: 3, ps: e2.ps || "" }).then((t2) => (this.core.eventBus.emit("systemMessage/passFriendApply", e2), t2));
          });
        }
        rejectFriendApply(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ account: { type: "string", allowEmpty: false } }, e2), yield this.core.sendCmd("friendReuqest", { account: e2.account, type: 4, ps: e2.ps || "" }).then((t2) => (this.core.eventBus.emit("systemMessage/rejectFriendApply", e2), t2));
          });
        }
        deleteFriend(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ account: { type: "string", allowEmpty: false }, delAlias: { type: "boolean" } }, e2), yield this.core.sendCmd("deleteFriend", { account: e2.account, delFriendParams: { delAlias: true === e2.delAlias ? 1 : 0 } });
          });
        }
        updateFriend(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ account: { type: "string", allowEmpty: false }, alias: { type: "string" }, ext: { type: "string", required: false } }, e2), yield this.core.sendCmd("updateFriend", { updateFriendTag: e2 });
          });
        }
        syncFriendRequestHandler(e2) {
          const t2 = function formatFriendRequest(e3) {
            const t3 = Object.assign({}, e3);
            try {
              t3.ps = t3.ps && JSON.parse(t3.ps);
            } catch (e4) {
            }
            if (t3.type = ao[t3.type], "addFriend" === t3.type || "passFriendApply" === t3.type) {
              const r2 = new Date().getTime();
              t3.friend = { account: e3.account, alias: "", createTime: r2, ext: "", updateTime: r2, valid: true };
            }
            return t3;
          }(e2.content);
          this.core.emit("syncFriend", t2);
        }
        syncDeleteFriendHandler(e2) {
          const t2 = e2.content.account;
          this.logger.log(`friend::emit syncFriendAction: deleteFriend ${t2}`), this.core.emit("syncFriend", { type: "deleteFriend", account: t2 });
        }
        syncUpdateFriendHandler(e2) {
          const t2 = reverseFriend(e2.content.friend);
          this.logger.log("friend::emit syncFriendAction: updateFriend, ", null == t2 ? void 0 : t2.account), this.core.emit("syncFriend", { type: "updateFriend", friend: t2 });
        }
        syncFriendsHandler(e2) {
          const t2 = e2.content;
          this.core.eventBus.emit("sync/updateTimetag", { friends: parseInt(t2.timetag) });
          const r2 = null == t2 ? void 0 : t2.friends;
          if (r2 && r2.length) {
            const e3 = r2.map((e4) => reverseFriend(e4));
            this.core.emit("friends", e3);
          }
        }
        syncFriendUsersHandler(e2) {
          const t2 = e2.content;
          this.core.eventBus.emit("sync/updateTimetag", { friendUsers: parseInt(t2.timetag) });
          const r2 = null == t2 ? void 0 : t2.users;
          if (r2 && r2.length) {
            const e3 = r2.map((e4) => formatUser(e4));
            this.core.emit("users", e3);
          }
        }
      }, "friend"), NIM.registerService(class EventService extends Service {
        constructor(e2) {
          super("event", e2), registerParser({ cmdMap: go, cmdConfig: fo });
        }
        publishEvent(e2) {
          var t2;
          return __awaiter(this, void 0, void 0, function* () {
            validate({ type: { type: "number" }, value: { type: "number" }, ext: { type: "string", required: false }, validTime: { type: "number", min: 60, max: 2592e3, required: false }, broadcastType: { type: "number", required: false }, sync: { type: "boolean", required: false } }, e2);
            const r2 = Object.assign(Object.assign({ validTime: e2.validTime || 604800, broadcastType: e2.broadcastType || 2 }, e2), { idClient: rs(), sync: true === e2.sync ? 1 : 0 }), s2 = yield this.core.sendCmd("publishEvent", { msgEvent: r2 });
            return formatEvent((null === (t2 = s2.content) || void 0 === t2 ? void 0 : t2.msgEvent) || {});
          });
        }
        subscribeEvent(e2) {
          var t2;
          return __awaiter(this, void 0, void 0, function* () {
            validate({ type: { type: "number" }, accounts: { type: "array", itemType: "string", max: 100 }, subscribeTime: { type: "number", min: 60, max: 2592e3, required: false } }, e2);
            const r2 = Object.assign(Object.assign({ subscribeTime: 2592e3 }, e2), { sync: true === e2.sync ? 1 : 0 }), s2 = yield this.core.sendCmd("subscribeEvent", { msgEventSubscribe: r2, accounts: e2.accounts });
            return { failedAccounts: (null === (t2 = s2.content) || void 0 === t2 ? void 0 : t2.accounts) || [] };
          });
        }
        unSubscribeEvents(e2) {
          var t2;
          return __awaiter(this, void 0, void 0, function* () {
            validate({ type: { type: "number" }, accounts: { type: "array", itemType: "string", max: 100, required: false } }, e2);
            const r2 = { type: e2.type };
            let s2;
            if (e2.accounts && e2.accounts.length > 0) {
              const i2 = yield this.core.sendCmd("unSubscribeEventsByAccounts", { msgEventSubscribe: r2, accounts: e2.accounts });
              s2 = (null === (t2 = i2.content) || void 0 === t2 ? void 0 : t2.accounts) || [];
            } else
              yield this.core.sendCmd("unSubscribeEventsByType", { msgEventSubscribe: r2 }), s2 = [];
            return { failedAccounts: s2 };
          });
        }
        querySubscribeEvents(e2) {
          var t2;
          return __awaiter(this, void 0, void 0, function* () {
            let r2;
            return validate({ type: { type: "number" }, accounts: { type: "array", itemType: "string", max: 100, required: false } }, e2), r2 = e2.accounts && e2.accounts.length > 0 ? yield this.core.sendCmd("querySubscribeEventsByAccounts", { msgEventSubscribe: { type: e2.type }, accounts: e2.accounts }) : yield this.core.sendCmd("querySubscribeEventsByType", { msgEventSubscribe: { type: e2.type } }), formatSubscribes(null === (t2 = r2.content) || void 0 === t2 ? void 0 : t2.msgEventSubscribes);
          });
        }
        pushEventHandler(e2) {
          var t2;
          const r2 = (null === (t2 = e2.content) || void 0 === t2 ? void 0 : t2.msgEvent) || {};
          this.core.emit("pushEvents", [formatEvent(r2)]);
        }
        pushEventsHandler(e2) {
          var t2;
          const r2 = (null === (t2 = e2.content) || void 0 === t2 ? void 0 : t2.msgEvents) || {};
          this.core.emit("pushEvents", function formatEvents(e3) {
            return Array.isArray(e3) && e3.length > 0 ? e3.map((e4) => formatEvent(e4)) : [];
          }(r2));
        }
      }, "event"), NIM.registerService(class MsgExtendService extends Service {
        constructor(e2) {
          super("msgExtend", e2), registerParser({ cmdMap: vo, cmdConfig: Mo });
        }
        getThreadMsgs(e2) {
          var t2;
          return __awaiter(this, void 0, void 0, function* () {
            validate({ scene: { type: "enum", values: getEnumKeys(Fe) }, threadMsgFromAccount: { type: "string", allowEmpty: false }, threadMsgIdServer: { type: "string", allowEmpty: false }, threadMsgTime: { type: "number" }, threadMsgToAccount: { type: "string", allowEmpty: false }, beginTime: { type: "number", required: false }, endTime: { type: "number", required: false }, lastMsgId: { type: "string", allowEmpty: false, required: false }, limit: { type: "number", min: 1, max: 100, required: false }, reverse: { type: "boolean", required: false } }, e2);
            const r2 = yield this.core.sendCmd("getThreadMsgs", function generateThreadMsgsParams(e3) {
              const t3 = { scene: Ot[e3.scene], from: e3.threadMsgFromAccount, to: e3.threadMsgToAccount, time: e3.threadMsgTime, idServer: e3.threadMsgIdServer }, r3 = { limit: e3.limit < 100 ? e3.limit : 100, beginTime: "number" == typeof e3.beginTime ? e3.beginTime : 0, reverse: true === e3.reverse ? 1 : 0 };
              return e3.lastMsgId && (r3.lastMsgId = e3.lastMsgId), { msg: t3, threadMsgReq: r3 };
            }(e2));
            let { msgs: s2, threadMsg: i2 } = r2.content;
            const { threadMsgsMeta: n2 } = r2.content, o2 = getSessionId(i2, this.core.account), a2 = null === (t2 = this.core.session) || void 0 === t2 ? void 0 : t2.getSessionWithUncomplete({ id: o2 });
            return s2 = formatMsgs(s2, a2 ? { account: this.core.account, sessionAck: a2.ack, msgReceiptTime: a2.msgReceiptTime } : { account: this.core.account }), i2 = formatMsg(i2, a2 ? { account: this.core.account, sessionAck: a2.ack, msgReceiptTime: a2.msgReceiptTime } : { account: this.core.account }), { msgs: s2, threadMsg: i2, total: parseInt(n2.total), timetag: parseInt(n2.lastMsgTime) };
          });
        }
        getMsgsByIdServer(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ reqMsgs: { type: "array", rules: { scene: { type: "enum", values: getEnumKeys(Fe) }, from: { type: "string", allowEmpty: false }, to: { type: "string", allowEmpty: false }, idServer: { type: "string", allowEmpty: false }, time: { type: "number" } }, min: 1, max: 100 } }, e2);
            return (yield this.core.sendCmd("getMsgsByIdServer", { reqMsgs: e2.reqMsgs.map((e3) => Object.assign(Object.assign({}, e3), { scene: getEnumKeyByEnumValue(Fe, e3.scene) })) })).content.msgs.map((e3) => {
              var t2;
              const r2 = getSessionId(e3, this.core.account), s2 = null === (t2 = this.core.session) || void 0 === t2 ? void 0 : t2.getSessionWithUncomplete({ id: r2 });
              return formatMsg(e3, s2 ? { account: this.core.account, sessionAck: s2.ack, msgReceiptTime: s2.msgReceiptTime } : { account: this.core.account });
            });
          });
        }
      }, "msgExtend"), NIM.registerService(class MsgLogService extends Service {
        constructor(e2) {
          super("msgLog", e2), registerParser({ cmdMap: ko, cmdConfig: wo });
        }
        deleteRoamingMsgs(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ ids: { type: "array", itemType: "string" } }, e2);
            let t2 = [];
            try {
              t2 = e2.ids.map((e3) => {
                const { scene: t3, accid: r2 } = getAccountFromSessionId(e3);
                return `${t3}|${r2}`;
              });
            } catch (t3) {
              throw this.logger.error(`Failed to delete roaming msgs with ${e2.ids}`, t3), new Error(`Failed to create session with ${e2.ids}`);
            }
            yield this.core.sendCmd("deleteRoamingMsgs", { ids: t2 });
          });
        }
        getHistoryMsgs(e2) {
          var t2, r2;
          return __awaiter(this, void 0, void 0, function* () {
            (null === (t2 = this.core.sync) || void 0 === t2 ? void 0 : t2.getSyncDoneFlag()) || this.logger.warn("Please call getHistoryMsgs after syncdone event"), validate({ scene: { type: "enum", values: Object.keys(Ot) }, to: { type: "string", allowEmpty: false }, beginTime: { type: "number", required: false }, endTime: { type: "number", required: false }, limit: { type: "number", min: 1, max: 100, required: false }, reverse: { type: "boolean", required: false }, lastMsgId: { type: "string", required: false, allowEmpty: false }, asc: { type: "boolean", required: false }, msgTypes: { type: "array", itemType: "string", required: false } }, e2);
            const s2 = "p2p" === e2.scene ? "getHistoryMsgs" : "team" === e2.scene ? "getHistoryTeamMsgs" : "getHistorySuperTeamMsgs", i2 = yield this.core.sendCmd(s2, Object.assign(Object.assign({ beginTime: 0, endTime: 0, lastMsgId: 0, limit: 100, reverse: false }, e2), { msgTypes: e2.msgTypes ? e2.msgTypes.map((e3) => Rt[e3]) : [] })), { content: n2 } = i2;
            if (!(n2.msgs && n2.msgs.length > 0))
              return [];
            const o2 = getSessionId(n2.msgs[0], this.core.account), a2 = null === (r2 = this.core.session) || void 0 === r2 ? void 0 : r2.getSessionWithUncomplete({ id: o2 }), c2 = formatMsgs(n2.msgs, a2 ? { account: this.core.account, sessionAck: a2.ack, msgReceiptTime: a2.msgReceiptTime } : { account: this.core.account });
            return true === e2.asc ? c2.sort((e3, t3) => e3.time - t3.time) : c2;
          });
        }
        clearHistoryMsgsFromServer(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ scene: { type: "enum", values: ["p2p", "team"] }, to: { type: "string", allowEmpty: false }, ext: { type: "string", required: false }, isSyncSelf: { type: "boolean", required: false } }, e2);
            const t2 = Object.assign(Object.assign({ isDeleteRoam: 1 }, e2), { type: "team" === e2.scene ? 2 : 1, isSyncSelf: true === e2.isSyncSelf ? 1 : 0 });
            t2[2 === t2.type ? "toTid" : "otherAccid"] = e2.to;
            const r2 = (yield this.core.sendCmd("clearHistoryMsgsFromServer", { clearHistoryMsgsFromServerReqTag: t2 })).content;
            return this.core.eventBus.emit("session/updateForClearMsg", [{ sessionId: `${e2.scene}-${e2.to}` }], true), r2;
          });
        }
        multiSyncClearServerHistoryMsgsHandler(e2) {
          const t2 = formatClearResult(e2.content.data);
          this.core.eventBus.emit("session/updateForClearMsg", [t2], true), this.core.emit("clearServerHistoryMsgs", [t2]);
        }
        ftsCloudMsgLogs(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            return this.baseFtsCloudMsgLogs(e2, "nimFtsCloudMsgLogs");
          });
        }
        ftsCloudMsgLogsAggWithSession(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            return this.baseFtsCloudMsgLogs(e2, "nimFtsCloudMsgLogsAggWithSession");
          });
        }
        baseFtsCloudMsgLogs(e2, t2) {
          return __awaiter(this, void 0, void 0, function* () {
            if (validate({ keyword: { type: "string", allowEmpty: false }, fromTime: { type: "number", required: false }, toTime: { type: "number", required: false }, sessionLimit: { type: "number", required: false }, msglogsLimit: { type: "number", required: false }, orderRule: { type: "enum", values: getEnumKeys(bo), required: false }, p2pSessionList: { type: "array", itemType: "string", required: false }, teamSessionList: { type: "array", itemType: "string", required: false }, senderList: { type: "array", itemType: "string", required: false }, msgTypeList: { type: "array", itemType: "enum", values: getEnumKeys(Re), required: false }, msgSubTypeList: { type: "array", itemType: "number", required: false } }, e2), e2.fromTime && e2.toTime && e2.toTime < e2.fromTime)
              throw new ValidateError("Request parameter error: toTime should be greater than fromTime", e2, "");
            const r2 = function generateFtsTagForCmd(e3) {
              const t3 = format(Po, e3);
              return Array.isArray(t3.msgTypeList) && (t3.msgTypeList = t3.msgTypeList.map((e4) => Re[e4]).join(",")), ["p2pSessionList", "teamSessionList", "senderList", "msgSubTypeList"].forEach((e4) => {
                Array.isArray(t3[e4]) && (t3[e4] = t3[e4].join(","));
              }), t3;
            }(e2);
            return (yield this.core.sendCmd(t2, { tag: r2 })).content.datas.map((e3) => {
              var t3;
              const r3 = getSessionId(e3, this.core.account), s2 = null === (t3 = this.core.session) || void 0 === t3 ? void 0 : t3.getSessionWithUncomplete({ id: r3 });
              return formatMsg(e3, s2 ? { account: this.core.account, sessionAck: s2.ack, msgReceiptTime: s2.msgReceiptTime } : { account: this.core.account });
            });
          });
        }
        syncClearServerHistoryMsgsHandler(e2) {
          const t2 = function formatClearResults(e3) {
            return Array.isArray(e3) && e3.length > 0 ? e3.map((e4) => formatClearResult(e4)) : [];
          }(e2.content.datas);
          this.core.emit("clearServerHistoryMsgs", t2);
        }
      }, "msgLog"), NIM.registerService(class PassThroughService extends Service {
        constructor(e2) {
          super("passThrough", e2), this.core = e2, registerParser({ cmdMap: Ao, cmdConfig: Oo });
        }
        request(e2) {
          return validate({ path: { type: "string", allowEmpty: false } }, e2), this.core.sendCmd("requestProxy", { requestProxyTag: e2 }).then((e3) => {
            const { content: t2 } = e3;
            return t2.requestProxyTag;
          });
        }
        onRequestProxyHandler(e2) {
          const { proxyMsg: t2 } = e2.content;
          t2 && t2.time && (t2.time = +t2.time), this.core.emit("proxyMsg", t2);
        }
      }, "passThrough"), NIM.registerService(class CloudStorageService {
        constructor(e2, t2 = {}) {
          this.GRAYKEY = "AllGrayscaleConfig", this.MIXSTOREKEY = "AllMixStorePolicy", this.config = {}, this.nosCdnHostTimer = 0, this.grayConfig = { mixStoreEnable: false, timeStamp: 0, ttl: 0 }, this.mixStorePolicy = { providers: [], timeStamp: 0, ttl: 0, s3Policy: null, nosPolicy: null }, this.curProvider = Bo.nos, this.s3 = null, this.mixStoreErrorCount = 10, this.nosErrorCount = 0, this.circuitTimer = 0, this.name = "cloudStorage", this.logger = e2.logger, this.core = e2, registerParser({ cmdMap: Fo, cmdConfig: Uo }), this.setOptions(t2);
        }
        setOptions(e2 = {}) {
          const t2 = e2.storageKeyPrefix || "NIMClient";
          this.GRAYKEY = t2 + "-AllGrayscaleConfig", this.MIXSTOREKEY = t2 + "-AllMixStorePolicy";
          const { s3: r2 } = e2, s2 = __rest(e2, ["s3"]), i2 = Object.assign({}, $o, this.config);
          if (s2 && Object.prototype.hasOwnProperty.call(s2, "cdn")) {
            const e3 = { cdn: Object.assign(Object.assign({}, i2.cdn), s2.cdn) };
            this.config = Object.assign({}, i2, s2, e3);
          } else
            this.config = Object.assign({}, i2, s2);
          r2 && (this.s3 = r2);
        }
        init() {
          return __awaiter(this, void 0, void 0, function* () {
            this.grayConfig = null, this.mixStorePolicy = { providers: [], timeStamp: 0, ttl: 0, s3Policy: null, nosPolicy: null }, this.curProvider = Bo.nos, this.mixStoreErrorCount = 10, this.config.isNeedToGetUploadPolicyFromServer && (yield this.getGrayscaleConfig(this.core.options.appkey), yield this.getNosCdnHost());
          });
        }
        processCallback(e2) {
          const t2 = e2.onUploadProgress, r2 = e2.onUploadDone, s2 = e2.onUploadStart;
          return { onUploadStart: "function" == typeof s2 ? (e3) => {
            try {
              s2(e3);
            } catch (e4) {
              this.logger.error("CloudStorage::uploadFile:options.onUploadStart execute error", e4);
            }
          } : () => {
          }, onUploadProgress: "function" == typeof t2 ? (e3) => {
            try {
              t2(e3);
            } catch (e4) {
              this.logger.error("CloudStorage::uploadFile:options.onUploadProgress execute error", e4);
            }
          } : () => {
          }, onUploadDone: "function" == typeof r2 ? (e3) => {
            try {
              r2(e3);
            } catch (e4) {
              this.logger.error("CloudStorage::uploadFile:options.onUploadDone execute error", e4);
            }
          } : () => {
          } };
        }
        uploadFile(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            if (validate({ maxSize: { type: "number", required: false }, type: { type: "enum", values: ["file", "image", "audio", "video"] } }, e2), !e2.fileInput && !e2.file && !e2.filePath)
              throw new Error("uploadFile needs target file object or a filePath");
            if (e2.type && "file" !== e2.type) {
              const t3 = Ie(e2, "file.type");
              if ("string" == typeof t3 && -1 === t3.indexOf(e2.type))
                throw new Error(`The meta type "${t3}" does not match "${e2.type}"`);
            }
            const { onUploadStart: t2, onUploadProgress: r2, onUploadDone: s2 } = this.processCallback(e2);
            e2.onUploadStart = t2, e2.onUploadProgress = r2, e2.onUploadDone = s2;
            const i2 = yield this._uploadFile(e2);
            return i2.url = decodeURIComponent(i2.url), e2.onUploadDone({ size: i2.size, name: i2.name, url: i2.url, ext: i2.name.split(".")[1] || "unknown" }), i2;
          });
        }
        _uploadFile(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            if (!(this.grayConfig && this.grayConfig.mixStoreEnable && this.mixStorePolicy.providers.length))
              return this.logger.log("uploadFile:: uploadFile begin, use old nos"), this.nosUpload(e2);
            this.logger.log(`uploadFile:: uploadFile begin,Current settings grayConfig mixStoreEnable:${this.grayConfig.mixStoreEnable} curProvider:${this.curProvider}`), this.s3 || (this.curProvider = Bo.nos);
            let t2 = Do;
            try {
              t2 = (yield this.core.sendCmd("getMixStoreToken", { mixStoreTokenReqTag: { provider: this.curProvider, tokenCount: 1, tag: "qchat", returnBody: getUploadResponseFormat(e2.type) } })).content.mixStoreTokenResTag;
            } catch (e3) {
              throw this.core.logger.error("uploadFile:: getMixStoreToken error", e3), new UploadError("getMixStoreToken error", e3, this.curProvider, this.mixStorePolicy);
            }
            return this.curProvider === Bo.s3 ? this.s3Upload(e2, t2) : this.nosUpload(e2, t2);
          });
        }
        nosUpload(e2, t2) {
          var r2, s2;
          return __awaiter(this, void 0, void 0, function* () {
            const i2 = Ie(this.core, "config.cdn.bucket"), n2 = { tag: e2.nosScenes || i2 || "nim", expireSec: e2.nosSurvivalTime };
            let o2;
            if (!t2)
              try {
                o2 = yield this.core.sendCmd("getNosToken", { responseBody: getUploadResponseFormat(e2.type), nosToken: n2 });
              } catch (e3) {
                throw this.core.logger.error("uploadFile:: getNosToken error", e3), new UploadError("getNosToken error", e3, 1);
              }
            let a2, c2 = this.config.uploadReplaceFormat.replace("{host}", this.config.cdn.cdnDomain || this.config.cdn.defaultCdnDomain).replace("{object}", o2 ? o2.content.nosToken.objectName : null == t2 ? void 0 : t2.objectName);
            t2 && t2.shortUrl && (c2 = t2.shortUrl);
            try {
              const r3 = o2 ? o2.content.nosToken : t2;
              this.core.logger.debug("uploadFile:: uploadFile params", { nosToken: r3, chunkUploadHost: this.config.chunkUploadHost, commonUploadHost: this.config.commonUploadHost, platform: Cr.platform }), a2 = yield this.core.adapters.uploadFile(Object.assign(Object.assign({}, e2), { nosToken: r3, chunkUploadHost: this.config.chunkUploadHost, commonUploadHost: this.config.commonUploadHost, maxSize: e2.maxSize || this.config.chunkMaxSize }));
            } catch (s3) {
              if (this.core.logger.error("uploadFile::nos uploadFile error", s3), 10499 === Ie(s3, "errCode"))
                throw new UploadError(Ie(s3, "message") || "Request abort", s3, 1);
              if (t2) {
                if (0 === this.nosErrorCount) {
                  try {
                    this._addCircuitTimer();
                  } catch (t3) {
                    throw new UploadError("upload file error", t3, this.curProvider, this.mixStorePolicy, e2.file || e2.filePath);
                  }
                  return this.nosErrorCount = null === (r2 = this.mixStorePolicy.nosPolicy) || void 0 === r2 ? void 0 : r2.uploadConfig.retryPolicy.retry, this._uploadFile(e2);
                }
                return this.nosErrorCount--, this.nosUpload(e2, t2);
              }
              throw new UploadError("nos uploadFile error", s3, 1);
            }
            const d2 = null == a2 ? void 0 : a2.type, m2 = d2 && d2.indexOf("/") > -1 ? d2.slice(0, d2.indexOf("/")) : "", l2 = { image: "imageInfo", video: "vinfo", audio: "vinfo" };
            if (!l2[m2])
              return Object.assign({ url: c2 }, a2);
            let p2;
            try {
              c2.indexOf("_im_url=1") < 0 && (p2 = yield this.core.adapters.request(`${c2}?${l2[m2]}`, { method: "GET", dataType: "json", timeout: 5e3 }, { exception_service: 3 }));
            } catch (e3) {
              return this.core.logger.error("uploadFile:: fetch file info error", e3), Object.assign({ url: c2 }, a2);
            }
            if (p2) {
              const { data: e3 } = p2, t3 = "imageInfo" === l2[m2] ? e3 : null === (s2 = null == e3 ? void 0 : e3.GetVideoInfo) || void 0 === s2 ? void 0 : s2.VideoInfo, r3 = { url: c2, name: a2.name, size: a2.size, ext: a2.ext, w: t3.Width, h: t3.Height, orientation: t3.Orientation, dur: t3.Duration, audioCodec: t3.AudioCodec, videoCodec: t3.VideoCodec, container: t3.Container };
              return Ro(r3, function(e4, t4) {
                return void 0 !== t4;
              });
            }
            return Object.assign({ url: c2 }, a2);
          });
        }
        getNosCdnHost() {
          var e2;
          return __awaiter(this, void 0, void 0, function* () {
            let t2;
            try {
              t2 = yield this.core.sendCmd("getNosCdnHost");
            } catch (e3) {
              return void this.logger.error("getNosCdnHost::error", e3);
            }
            if (!t2)
              return;
            const r2 = null === (e2 = null == t2 ? void 0 : t2.content) || void 0 === e2 ? void 0 : e2.nosConfigTag, s2 = parseInt(null == r2 ? void 0 : r2.expire);
            0 !== s2 && r2.cdnDomain ? -1 === s2 ? (this.config.cdn.bucket = r2.bucket, this.config.cdn.cdnDomain = r2.cdnDomain, this.config.cdn.objectNamePrefix = r2.objectNamePrefix) : (this.config.cdn.bucket = r2.bucket, this.config.cdn.cdnDomain = r2.cdnDomain, this.config.cdn.objectNamePrefix = r2.objectNamePrefix, this.nosCdnHostTimer = this.core.timerManager.addTimer(() => {
              this.getNosCdnHost();
            }, 1e3 * s2)) : (this.config.cdn.bucket = "", this.config.cdn.cdnDomain = "", this.config.cdn.objectNamePrefix = "");
          });
        }
        getGrayscaleConfig(e2) {
          var t2;
          return __awaiter(this, void 0, void 0, function* () {
            if (Cr.localStorage)
              try {
                Cr.localStorage.getItem && Cr.localStorage.getItem(this.GRAYKEY) && (this.grayConfig = JSON.parse(Cr.localStorage.getItem(this.GRAYKEY))[e2]);
              } catch (e3) {
                Cr.localStorage.getItem(this.GRAYKEY) && this.core.logger.error("uploadFile:: JSON.parse grayscaleConfig error ", e3);
              }
            if (!this.grayConfig || this.grayConfig.timeStamp + 1e3 * this.grayConfig.ttl < new Date().getTime()) {
              const t3 = yield this.core.sendCmd("getGrayscaleConfig", { config: {} });
              if (t3.content && t3.content.grayConfigTag) {
                this.logger.log("uploadFile::getAppGrayConfigRequest success ");
                try {
                  this.grayConfig = JSON.parse(t3.content.grayConfigTag.config), this.grayConfig.ttl = JSON.parse(t3.content.grayConfigTag.ttl);
                } catch (e3) {
                  this.logger.error("getGrayscaleConfig error", e3);
                }
                if (!this.grayConfig)
                  return;
                const r2 = Cr.localStorage.getItem(this.GRAYKEY) ? JSON.parse(Cr.localStorage.getItem(this.GRAYKEY)) : {};
                this.grayConfig.timeStamp = new Date().getTime(), r2[e2] = this.grayConfig, Cr.localStorage.setItem(this.GRAYKEY, JSON.stringify(r2));
              } else
                this.logger.debug("uploadFile:: result grayConfig:", t3.content);
            }
            (null === (t2 = this.grayConfig) || void 0 === t2 ? void 0 : t2.mixStoreEnable) && (yield this._getMixStorePolicy(e2));
          });
        }
        _getMixStorePolicy(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            const t2 = new Date().getTime();
            if (Cr.localStorage)
              try {
                if (this.mixStorePolicy = JSON.parse(Cr.localStorage.getItem(this.MIXSTOREKEY))[e2], this.curProvider = parseInt(this.mixStorePolicy.providers[0]), this.mixStorePolicy.timeStamp && this.mixStorePolicy.timeStamp + 1e3 * this.mixStorePolicy.ttl > t2) {
                  const r2 = this.mixStorePolicy.timeStamp + 1e3 * this.mixStorePolicy.ttl - t2;
                  this.core.timerManager.addTimer(this._getMixStorePolicy.bind(this, e2), r2);
                }
              } catch (t3) {
                Cr.localStorage.getItem(this.MIXSTOREKEY) && JSON.parse(Cr.localStorage.getItem(this.MIXSTOREKEY))[e2] && this.core.logger.error("uploadFile:: JSON.parse mixStorePolicy error ", t3);
              }
            if (!this.mixStorePolicy || this.mixStorePolicy.timeStamp + 1e3 * this.mixStorePolicy.ttl <= t2)
              try {
                const t3 = (yield this.core.sendCmd("getMixStorePolicy", { supportType: this.s3 ? [1, 2] : [1] })).content.mixStorePolicyTag;
                this.mixStorePolicy = { providers: [], timeStamp: 0, ttl: 0, s3Policy: null, nosPolicy: null }, this.mixStorePolicy.ttl = Number(t3.ttl), this.mixStorePolicy.providers = t3.providers.split(","), this.circuitTimer && this.core.timerManager.deleteTimer(this.circuitTimer), this.curProvider = parseInt(this.mixStorePolicy.providers[0]), this.mixStorePolicy.nosPolicy = t3.nosPolicy ? JSON.parse(t3.nosPolicy) : null, this.mixStorePolicy.s3Policy = t3.s3Policy ? JSON.parse(t3.s3Policy) : null, null === this.mixStorePolicy.s3Policy ? this.mixStorePolicy.providers = ["1"] : null === this.mixStorePolicy.nosPolicy ? this.mixStorePolicy.providers = ["2"] : this.mixStorePolicy.providers = this.mixStorePolicy.s3Policy.priority < this.mixStorePolicy.nosPolicy.priority ? ["2", "1"] : ["1", "2"], this.core.timerManager.addTimer(this._getMixStorePolicy.bind(this, e2), 1e3 * this.mixStorePolicy.ttl);
                const r2 = Cr.localStorage.getItem(this.MIXSTOREKEY) ? JSON.parse(Cr.localStorage.getItem(this.MIXSTOREKEY)) : {};
                this.mixStorePolicy.timeStamp = new Date().getTime(), r2[e2] = this.mixStorePolicy, Cr.localStorage.setItem(this.MIXSTOREKEY, JSON.stringify(r2));
              } catch (t3) {
                if (this.logger.error("getMixStorePolicy error", t3), 0 === this.mixStoreErrorCount)
                  throw new Error("getMixStorePolicy all count error");
                this._getMixStorePolicy(e2), this.mixStoreErrorCount--;
              }
            this.mixStorePolicy.nosPolicy && (this.nosErrorCount = this.mixStorePolicy.nosPolicy.uploadConfig.retryPolicy.retry);
          });
        }
        s3Upload(e2, t2) {
          return __awaiter(this, void 0, void 0, function* () {
            let r2;
            if (e2.file)
              r2 = e2.file;
            else if ("string" == typeof e2.fileInput) {
              this.logger.warn("fileInput will abandon,Please use file or filepath");
              const t3 = document.getElementById(e2.fileInput);
              if (!(t3 && t3.files && t3.files[0]))
                throw new Error("Can not get file from fileInput");
              r2 = t3.files[0];
            } else {
              if (!(e2.fileInput && e2.fileInput.files && e2.fileInput.files[0]))
                throw new Error(`Can not get file from fileInput ${e2.fileInput}`);
              r2 = e2.fileInput.files[0];
            }
            if (!this.mixStorePolicy.s3Policy)
              throw new Error("dont get s3 policy");
            const s2 = { accessKeyId: t2.accessKeyId, secretAccessKey: t2.secretAccessKey, sessionToken: t2.sessionToken, region: t2.region, maxRetries: this.mixStorePolicy.s3Policy.uploadConfig.retryPolicy.retry }, i2 = new (0, this.s3)();
            i2.config.update(s2);
            const n2 = decodeURIComponent(t2.bucket), o2 = decodeURIComponent(t2.objectName), a2 = r2, c2 = { Bucket: n2, Key: o2, Body: a2, Metadata: { token: t2.token }, ContentType: a2.type || "application/octet-stream" };
            this.core.logger.debug("uploadFile:: s3 upload params:", c2);
            const d2 = i2.upload(c2);
            return d2.on("httpUploadProgress", (t3) => {
              const r3 = parseFloat((t3.loaded / t3.total).toFixed(2));
              e2.onUploadProgress && e2.onUploadProgress({ total: t3.total, loaded: t3.loaded, percentage: r3, percentageText: Math.round(100 * r3) + "%" });
            }), new Promise((r3, s3) => {
              const i3 = new Date().getTime();
              d2.send((c3, d3) => {
                var m2;
                if (c3 && "RequestAbortedError" === c3.code)
                  this.logger.error("uploadFile:", "api::s3:upload file abort", c3), s3(new CustomError(c3.message, c3, 10499));
                else if (c3) {
                  this.logger.error("uploadFile:", "api::s3:upload file failed", c3), this.core.reporter.reportTraceStart("exceptions", { user_id: this.core.options.account, trace_id: null === (m2 = this.core.clientSocket.socket) || void 0 === m2 ? void 0 : m2.sessionId, start_time: i3, action: 1, exception_service: 4 }), this.core.reporter.reportTraceUpdateV2("exceptions", { code: "number" == typeof c3.status ? c3.status : "number" == typeof c3.code ? c3.code : 0, description: c3.message || `${c3.code}`, operation_type: 1, target: JSON.stringify({ bucket: n2, object: o2 }) }, { asyncParams: Cr.net.getNetworkStatus() }), this.core.reporter.reportTraceEnd("exceptions", 1);
                  try {
                    this._addCircuitTimer();
                  } catch (c4) {
                    s3(new UploadError("upload file error", c4, this.curProvider, this.mixStorePolicy, e2.file || e2.filePath));
                  }
                  r3(this._uploadFile(e2));
                } else {
                  let e3 = this.mixStorePolicy.s3Policy.cdnSchema;
                  e3 = e3.replace("{cdnDomain}", this.mixStorePolicy.s3Policy.dlcdn), e3 = e3.replace("{objectName}", d3.Key), r3({ size: a2.size, name: a2.name, url: t2.shortUrl ? t2.shortUrl : e3, ext: a2.name.split(".")[1] || "unknown" });
                }
              }), e2.onUploadStart && e2.onUploadStart(d2);
            });
          });
        }
        getPrivateUrl(e2) {
          var t2;
          if (!new RegExp(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/).test(e2))
            return this.logger.error("illegal file url:" + e2), "";
          const [r2, s2, i2, n2, o2, a2, c2, d2] = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/.exec(e2);
          if (null === (t2 = this.grayConfig) || void 0 === t2 ? void 0 : t2.mixStoreEnable) {
            const t3 = this._getUrlType(e2);
            return t3 === Bo.s3 && this.mixStorePolicy.s3Policy && (e2 = this.mixStorePolicy.s3Policy.cdnSchema.replace("{cdnDomain}", this.mixStorePolicy.s3Policy.dlcdn).replace("{objectName}", a2)), t3 === Bo.nos && this.mixStorePolicy.nosPolicy && (e2 = this.mixStorePolicy.nosPolicy.cdnSchema.replace("{cdnDomain}", this.mixStorePolicy.nosPolicy.dlcdn).replace("{objectName}", a2)), e2;
          }
          const { downloadUrl: m2, downloadHostList: l2, nosCdnEnable: p2 } = this.config, u2 = this.config.cdn.cdnDomain, g2 = this.config.cdn.objectNamePrefix ? decodeURIComponent(this.config.cdn.objectNamePrefix) : "", y2 = decodeURIComponent(a2), h2 = y2.indexOf(g2);
          if (u2 && h2 > -1 && p2)
            return `${s2}${u2}/${y2.slice(h2)}`;
          if (l2.includes(n2) && a2.includes("/")) {
            const e3 = a2.indexOf("/"), t3 = a2.substring(0, e3), r3 = a2.substring(e3 + 1);
            return m2.replace("{bucket}", t3).replace("{object}", r3);
          }
          const f2 = l2.filter((e3) => "string" == typeof n2 && n2.includes(e3))[0], v2 = f2 ? n2.replace(f2, "").replace(/\W/g, "") : null;
          return v2 ? m2.replace("{bucket}", v2).replace("{object}", a2) : e2;
        }
        getOriginUrl(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            return (yield this.core.sendCmd("getOriginUrl", { nosSafeUrlTag: { safeUrl: e2 } })).content.nosSafeUrlTag.originUrl;
          });
        }
        getFileToken(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ type: { type: "number", min: 2, max: 3 }, urls: { type: "array", required: false, itemType: "string" } }, e2);
            const t2 = this.mixStorePolicy.nosPolicy ? this.mixStorePolicy.nosPolicy.authPolicy.policyType : null, r2 = this.mixStorePolicy.s3Policy ? this.mixStorePolicy.s3Policy.authPolicy.policyType : null;
            if (t2 === String(Ho.dontNeed) && r2 === String(Ho.dontNeed))
              throw this.logger.error("don't need token"), new Error("don't need token");
            if (e2.type === Ho.time) {
              if (t2 && t2.indexOf(String(Ho.time)) >= 0 || r2 && r2.indexOf(String(Ho.time)) > 0)
                return this.getFileAuthToken(e2);
              throw this.logger.error("don't support time token "), new Error("don't support type time token ");
            }
            {
              if (!e2.urls || !e2.urls.length)
                throw this.logger.error("urls is required when urls token"), new Error("urls is required when urls token");
              let s2 = [], i2 = [];
              if (e2.urls.forEach((e3) => {
                const t3 = this._getUrlType(e3);
                t3 === Bo.nos && i2.push(e3), t3 === Bo.s3 && s2.push(e3);
              }), (!r2 || 0 !== s2.length && r2.indexOf(String(Ho.urls)) < 0) && (this.logger.warn("s3 url don't support url token"), s2 = []), (!t2 || 0 !== i2.length && t2.indexOf(String(Ho.urls)) < 0) && (this.logger.warn("nos url don't support url token"), i2 = []), 0 === s2.length && 0 === i2.length)
                throw this.logger.error("not support urls"), new Error("not support urls");
              if (0 === s2.length || 0 === i2.length)
                return e2.urls = JSON.stringify(e2.urls), this.getFileAuthToken(e2);
            }
          });
        }
        getFileAuthToken(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            return (yield this.core.sendCmd("getFileAuthToken", { mixStoreAuthTokenReqTag: e2 })).content.mixStoreAuthTokenResTag;
          });
        }
        _getUrlType(e2) {
          return this.mixStorePolicy.nosPolicy && this.mixStorePolicy.nosPolicy.dlcdns.some((t2) => e2.indexOf(t2) >= 0) ? Bo.nos : this.mixStorePolicy.s3Policy && this.mixStorePolicy.s3Policy.dlcdns.some((t2) => e2.indexOf(t2) >= 0) ? Bo.s3 : null;
        }
        _addCircuitTimer() {
          const e2 = this.mixStorePolicy.providers, t2 = e2[(e2.indexOf(String(this.curProvider)) + 1) % e2.length];
          if (t2 === e2[0])
            throw new Error("uploadFile all policy fail");
          const r2 = Ie(this.mixStorePolicy, "s3Policy.uploadConfig.retryPolicy");
          if (r2 && r2.retryNext && t2 && (this.logger.log(`uploadFile:: upload policy will change,now policy:${this.curProvider} nextProvider:${t2}`), this.curProvider = parseInt(t2), this.mixStorePolicy.nosPolicy && this.mixStorePolicy.s3Policy)) {
            const e3 = this.mixStorePolicy[this.curProvider === Bo.nos ? "nosPolicy" : "s3Policy"].uploadConfig.retryPolicy.circuit;
            if (!e3 || 0 === e3)
              return;
            this.circuitTimer = this.core.timerManager.addTimer(() => {
              this.logger.log(`uploadFile:: upload policy will change,now policy:${this.curProvider} nextProvider:${parseInt(this.mixStorePolicy.providers[0])}`), this.curProvider = parseInt(this.mixStorePolicy.providers[0]), this.core.timerManager.deleteTimer(this.circuitTimer);
            }, 1e3 * e3);
          }
        }
        process(e2) {
          return e2.error && !e2.error.ignore ? Promise.reject(e2.error) : Promise.resolve(e2);
        }
      }, "cloudStorage"), NIM.registerService(class SuperTeamService extends Service {
        constructor(e2) {
          super("superTeam", e2), this.mySuperTeamMembersMap = /* @__PURE__ */ new Map(), this.service = new ModuleService(e2), registerParser({ cmdMap: sa, cmdConfig: oa }), this.core.eventBus.on("team/onNotification", (e3) => this.notificationHandler(e3));
        }
        destroy() {
          this.mySuperTeamMembersMap.clear();
        }
        mergeMySuperTeamMembers(e2) {
          e2.forEach((e3) => {
            const t2 = e3.teamId, r2 = this.mySuperTeamMembersMap.get(t2), s2 = Object.assign({}, r2, e3);
            this.mySuperTeamMembersMap.set(t2, s2);
          });
        }
        getSuperTeamInfo(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false } }, e2);
            return formatSuperTeam((yield this.core.sendCmd("getSuperTeamInfo", { teamId: e2.teamId })).content.superTeam);
          });
        }
        getSuperTeams() {
          return __awaiter(this, void 0, void 0, function* () {
            return formatSuperTeams((yield this.core.sendCmd("getSuperTeams", { timetag: 0 })).content.superTeams);
          });
        }
        updateSuperTeamInfo(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, name: { type: "string", allowEmpty: false, required: false }, joinMode: { type: "enum", values: ["noVerify", "needVerify", "rejectAll"], required: false }, beInviteMode: { type: "enum", values: ["noVerify", "needVerify"], required: false }, inviteMode: { type: "enum", values: ["manager", "all"], required: false }, updateTeamMode: { type: "enum", values: ["manager", "all"], required: false }, updateExtMode: { type: "enum", values: ["manager", "all"], required: false }, intro: { type: "string", allowEmpty: false, required: false }, announcement: { type: "string", allowEmpty: false, required: false }, avatar: { type: "string", allowEmpty: false, required: false }, ext: { type: "string", allowEmpty: false, required: false } }, e2);
            const t2 = function generateSuperTeam(e3) {
              const t3 = Object.assign({}, e3), r2 = { joinMode: Ko, beInviteMode: Jo, inviteMode: Qo, updateTeamMode: Zo, updateExtMode: ta };
              return ["avatar", "name", "intro", "announcement", "ext"].forEach((e4) => {
                void 0 !== t3[e4] && (t3[e4] = t3[e4].toString());
              }), Object.keys(r2).forEach((e4) => {
                void 0 !== t3[e4] && (t3[e4] = r2[e4][t3[e4]]);
              }), t3;
            }(e2);
            return yield this.core.sendCmd("updateSuperTeamInfo", { superTeam: t2 }), formatSuperTeam(t2);
          });
        }
        addSuperTeamMembers(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, accounts: { type: "array", itemType: "string", min: 1 }, ps: { type: "string", allowEmpty: true, max: 5e3, required: false } }, e2), yield this.core.sendCmd("addSuperTeamMembers", { teamId: e2.teamId, accounts: e2.accounts, ps: e2.ps || "", attach: e2.ext || "" });
          });
        }
        removeSuperTeamMembers(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, accounts: { type: "array", itemType: "string", min: 1 } }, e2), yield this.core.sendCmd("removeSuperTeamMembers", { teamId: e2.teamId, accounts: e2.accounts });
          });
        }
        addSuperTeamManagers(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, accounts: { type: "array", min: 1, itemType: "string" } }, e2), yield this.core.sendCmd("addSuperTeamManagers", e2);
          });
        }
        removeSuperTeamManagers(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, accounts: { type: "array", min: 1, itemType: "string" } }, e2), yield this.core.sendCmd("removeSuperTeamManagers", e2);
          });
        }
        applySuperTeam(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, ps: { type: "string", allowEmpty: true, max: 5e3, required: false } }, e2);
            return formatSuperTeam((yield this.core.sendCmd("applySuperTeam", { teamId: e2.teamId, ps: e2.ps || "" })).content.superTeam);
          });
        }
        transferSuperTeam(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, account: { type: "string", allowEmpty: false }, leave: { type: "boolean" } }, e2), yield this.core.sendCmd("transferSuperTeam", e2);
          });
        }
        muteSuperTeam(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, mute: { type: "boolean" } }, e2), yield this.core.sendCmd("muteSuperTeam", { teamId: e2.teamId, mute: e2.mute ? 1 : 0 });
          });
        }
        muteSuperTeamMembers(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, accounts: { type: "array", itemType: "string" }, mute: { type: "boolean" } }, e2), yield this.core.sendCmd("muteSuperTeamMembers", { teamId: e2.teamId, accounts: e2.accounts, mute: e2.mute ? 1 : 0 });
          });
        }
        updateMemberNick(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, account: { type: "string", allowEmpty: false }, nickInTeam: { type: "string", allowEmpty: true } }, e2);
            const t2 = generatorSuperTeamMemberForCmd({ teamId: e2.teamId, nickInTeam: e2.nickInTeam, account: e2.account });
            yield this.core.sendCmd("updateSuperTeamMemberNick", { teamMember: t2 });
            return formatSuperTeamMember(Object.assign({ updateTime: new Date().getTime() }, t2));
          });
        }
        updateMyMemberInfo(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, nickInTeam: { type: "string", allowEmpty: true, required: false }, bitConfigMask: { type: "number", min: 0, max: 2, required: false }, ext: { type: "string", required: false } }, e2);
            const t2 = generatorSuperTeamMemberForCmd({ teamId: e2.teamId, nickInTeam: e2.nickInTeam, bitConfigMask: e2.bitConfigMask, ext: e2.ext });
            yield this.core.sendCmd("updateMySuperTeamMemberInfo", { teamMember: t2 });
            const r2 = formatSuperTeamMember(Object.assign({ updateTime: new Date().getTime(), account: this.core.account }, t2));
            this.mergeMySuperTeamMembers([r2]), this.core.emit("updateSuperTeamMember", r2);
            const s2 = Zn(this.mySuperTeamMembersMap.get(r2.teamId));
            return this.core.emit("mySuperTeamMembers", [s2]), r2;
          });
        }
        getSuperTeamMembersByAccounts(e2) {
          var t2;
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, accounts: { type: "array", itemType: "string", max: 20, min: 1 } }, e2);
            const r2 = e2.accounts.map((t3) => `${e2.teamId}|${t3}`), s2 = yield this.core.sendCmd("getSuperTeamMembersByAccounts", { memberIds: r2 });
            return formatSuperTeamMembers(null === (t2 = s2.content) || void 0 === t2 ? void 0 : t2.superTeamMembers);
          });
        }
        getSuperTeamMembers(e2) {
          var t2;
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, joinTime: { type: "number", min: 0, required: false }, limit: { type: "number", min: 1, max: 1e3, required: false }, reverse: { type: "boolean", required: false } }, e2);
            const r2 = yield this.core.sendCmd("getSuperTeamMembers", Object.assign({ joinTime: 0, limit: 100, reverse: false }, e2));
            return formatSuperTeamMembers(null === (t2 = r2.content) || void 0 === t2 ? void 0 : t2.superTeamMembers);
          });
        }
        queryMuteMembers(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, joinTime: { type: "number", min: 0, required: false }, limit: { type: "number", min: 1, required: false }, reverse: { type: "boolean", required: false } }, e2);
            return formatSuperTeamMembers((yield this.core.sendCmd("queryMuteSuperTeamMembers", Object.assign({ limit: 100, joinTime: 0, reverse: false }, e2))).content.superTeamMembers);
          });
        }
        leaveSuperTeam(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false } }, e2), yield this.core.sendCmd("leaveSuperTeam", { teamId: e2.teamId });
          });
        }
        passSuperTeamApply(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, from: { type: "string", allowEmpty: false } }, e2), yield this.core.sendCmd("passSuperTeamApply", e2);
          });
        }
        rejectSuperTeamApply(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, from: { type: "string", allowEmpty: false }, ps: { type: "string", max: 5e3, required: false } }, e2), yield this.core.sendCmd("rejectSuperTeamApply", { teamId: e2.teamId, from: e2.from, ps: e2.ps || "" });
          });
        }
        acceptSuperTeamInvite(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, from: { type: "string", allowEmpty: false } }, e2), yield this.core.sendCmd("acceptSuperTeamInvite", e2);
          });
        }
        rejectSuperTeamInvite(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ teamId: { type: "string", regExp: /\d+/, allowEmpty: false }, from: { type: "string", allowEmpty: false }, ps: { type: "string", max: 5e3, required: false } }, e2), yield this.core.sendCmd("rejectSuperTeamInvite", { teamId: e2.teamId, from: e2.from, ps: e2.ps || "" });
          });
        }
        syncSuperTeamsHandler(e2) {
          const t2 = e2.content;
          this.core.eventBus.emit("sync/updateTimetag", { superTeams: parseInt(t2.timetag) });
          const r2 = null == t2 ? void 0 : t2.superTeams;
          if (r2 && r2.length) {
            const e3 = formatSuperTeams(r2);
            this.core.emit("superTeams", e3);
          }
        }
        syncCreateSuperTeamHandler(e2) {
          const t2 = e2.content, r2 = formatSuperTeam(null == t2 ? void 0 : t2.superTeam), s2 = generatorMemberBySuperTeam(r2, r2.owner, "owner");
          this.core.emit("createSuperTeam", r2, s2);
        }
        syncUpdateSuperTeamMemberHandler(e2) {
          const t2 = e2.content, r2 = formatSuperTeamMember(null == t2 ? void 0 : t2.teamMember);
          r2.updateTime || (r2.updateTime = new Date().getTime()), this.mergeMySuperTeamMembers([r2]), this.core.emit("updateSuperTeamMember", r2);
          const s2 = Zn(this.mySuperTeamMembersMap.get(r2.teamId));
          this.core.emit("mySuperTeamMembers", [s2]);
        }
        syncMySuperTeamMembersHandler(e2) {
          const t2 = e2.content;
          this.core.eventBus.emit("sync/updateTimetag", { mySuperTeamMembers: parseInt(t2.timetag) });
          const r2 = null == t2 ? void 0 : t2.teamMembers.map((e3) => formatSuperTeamMember(e3));
          this.mergeMySuperTeamMembers(r2), this.core.emit("mySuperTeamMembers", Zn(r2));
        }
        notificationHandler(e2) {
          const { attach: t2, scene: r2, from: s2, to: i2, time: n2, idServer: o2, idClient: a2 } = e2, { team: c2, account: d2, accounts: m2, type: l2 } = t2;
          if ("superTeam" === r2)
            switch ("debug" === this.core.options.debugLevel ? this.logger.debug("superTeam::recvNotification", o2, a2, t2) : this.logger.log("superTeam::recvNotification", o2, a2, i2, l2, d2, m2), l2) {
              case "updateSuperTeam":
                c2.updateTime = n2, this.core.emit("updateSuperTeam", c2);
                break;
              case "addSuperTeamMembers":
                this.service.notifyAddSuperTeamMembers(c2, m2);
                break;
              case "acceptSuperTeamInvite":
                this.service.notifyAddSuperTeamMembers(c2, [s2]);
                break;
              case "passSuperTeamApply":
                this.service.notifyAddSuperTeamMembers(c2, [d2]);
                break;
              case "addSuperTeamManagers":
                this.service.notifyUpdateSuperTeamManagers(i2, m2, true, n2);
                break;
              case "removeSuperTeamManagers":
                this.service.notifyUpdateSuperTeamManagers(i2, m2, false, n2);
                break;
              case "removeSuperTeamMembers":
                this.service.notifyRemoveSuperTeamMembers(c2, m2);
                break;
              case "leaveSuperTeam":
                this.service.notifyRemoveSuperTeamMembers(c2, [s2]);
                break;
              case "dismissSuperTeam":
                this.core.emit("dismissSuperTeam", { teamId: i2 });
                break;
              case "transferSuperTeam":
                this.service.notifyTransferSuperTeam(c2, s2, d2);
                break;
              case "updateSuperTeamMembersMute":
                this.service.notifyUpdateSuperTeamMembersMute(c2, m2, t2.mute);
            }
        }
      }, "superTeam"), NIM.registerService(SyncService, "sync"), NIM.registerService(class PluginService extends Service {
        constructor(e2) {
          super("plugin", e2), this.core = e2, registerParser({ cmdMap: aa, cmdConfig: ca });
        }
        getChatroomAddress(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ chatroomId: { type: "string", allowEmpty: false }, ipType: { type: "number", required: false } }, e2);
            return (yield this.core.sendCmd("getChatroomAddress", { chatroomId: e2.chatroomId, isWeixinApp: "WXAPP" === Cr.platform, ipType: e2.ipType || 0 })).content.address;
          });
        }
        getQChatAddress(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ ipType: { type: "number", required: false } }, e2);
            return (yield this.core.sendCmd("getQChatAddress", { getQChatAddressTag: { ipType: (null == e2 ? void 0 : e2.ipType) || 0 } })).content.address;
          });
        }
      }, "plugin"), NIM.registerService(class OfflinePushService extends Service {
        constructor(e2) {
          super("offlinePush", e2), this.plugin = void 0, this.authConfig = void 0, this.appBackgroundOptions = { badge: 0, isBackground: false }, this.setTokenAndBackgroundStateAfterLogin = (e3) => {
            this.plugin && (this.regToken(e3 && e3.aosPushInfo), this.core.sendCmd("updateAppBackground", this.appBackgroundOptions));
          }, registerParser({ cmdMap: Da, cmdConfig: Ba }), this.core.eventBus.on("logined", this.setTokenAndBackgroundStateAfterLogin);
        }
        setOfflinePushConfig(e2) {
          e2.plugin ? (validate({ plugin: { type: "object", required: true }, authConfig: { type: "object", required: true } }, e2), this.plugin = e2.plugin, this.authConfig = e2.authConfig) : this.logger.warn("setOfflinePushConfig: invoke setOfflinePushConfig without plugin. If you are not running iOS or android app, please ignore this notice.");
        }
        regToken(e2) {
          const t2 = Cr.getSystemInfo() || {}, r2 = t2.os ? t2.os.toLowerCase() : "";
          if (this.logger.log("OfflinePushService: os", r2), "ios" !== r2 && "android" !== r2)
            return void this.logger.warn("OfflinePushService: only Android or IOS support offline push");
          if (!this.plugin || "function" != typeof this.plugin.getDeviceToken)
            return void this.logger.warn("OfflinePushService: plugin.getDeviceToken is not a function");
          let s2 = "";
          e2 && e2.pushType ? s2 = e2.pushType : "ios" === r2 ? s2 = "" : "android" === r2 && (s2 = "8"), this.logger.log("OfflinePushService:: prepare to get device token. suggestPushType: " + s2), this.logger.log("OfflinePushService push config", JSON.stringify(this.authConfig, null, 2)), this.plugin.getDeviceToken({ suggestPushType: s2, config: this.authConfig }, (e3) => {
            e3 ? (this.logger.log("OfflinePushService:: token is :" + e3), this.pushTokenToServer(s2, e3)) : this.logger.warn("OfflinePushService:: token is empty. Please check your parameters");
          });
        }
        pushTokenToServer(e2, t2) {
          let r2 = "";
          const s2 = this.authConfig;
          switch (e2) {
            case "5":
              r2 = s2.xmCertificateName;
              break;
            case "6":
              r2 = s2.hwCertificateName;
              break;
            case "7":
              r2 = s2.mzCertificateName;
              break;
            case "8":
              r2 = s2.fcmCertificateName;
              break;
            case "9":
              r2 = s2.vivoCertificateName;
              break;
            case "10":
              r2 = s2.oppoCertificateName;
              break;
            default:
              r2 = s2.apnsCertificateName;
          }
          "" === r2 || void 0 === r2 ? this.logger.warn("OfflinePushService:: certificate name is empty for push type: ", e2) : this.updatePushToken({ tokenName: r2, token: t2, pushkit: 0 });
        }
        updatePushToken(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            let t2;
            validate({ tokenName: { type: "string", allowEmpty: false, required: true }, token: { type: "string", allowEmpty: false, required: true }, pushkit: { type: "number", required: false } }, e2);
            try {
              const r2 = ma.parse("557d1e3cafa43e2589a588270c53d56f");
              t2 = ma.stringify(qa.decrypt(e2.token, r2)), this.logger.log("updatePushToken:: token", t2);
            } catch (t3) {
              return this.logger.log("updatePushToken:: decrypt error", t3), void this.logger.warn("updatePushToken:: token before decrypt", e2.token);
            }
            yield this.core.sendCmd("updatePushToken", Object.assign(Object.assign({}, e2), { token: t2 }));
          });
        }
        updateAppBackground(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ isBackground: { type: "boolean", required: true }, badge: { type: "number", required: false } }, e2), this.appBackgroundOptions = e2, yield this.core.sendCmd("updateAppBackground", { isBackground: e2.isBackground, badge: e2.badge || 0 });
          });
        }
      }, "offlinePush"), NIM.registerService(class CloudSessionService extends Service {
        constructor(e2) {
          super("cloudSession", e2), registerParser({ cmdMap: Ha, cmdConfig: Va });
        }
        queryCloudSessionList(e2) {
          var t2;
          return __awaiter(this, void 0, void 0, function* () {
            validate({ minTimestamp: { type: "number", min: 0, required: false }, maxTimestamp: { type: "number", min: 0, required: false }, limit: { type: "number", min: 1, required: false }, includedLastMsg: { type: "boolean", required: false } }, e2);
            const r2 = Object.assign({ limit: 100, includedLastMsg: true }, e2);
            r2.includedLastMsg = Je.boolean(e2, "includedLastMsg");
            const s2 = yield this.core.sendCmd("nimQueryCloudSessionList", { tag: r2 }), i2 = (null === (t2 = s2.content) || void 0 === t2 ? void 0 : t2.tag) || {}, n2 = s2.content.sessions;
            return { hasMore: +i2.hasMore > 0, sessionList: (o2 = n2, a2 = this.core.account, c2 = this.logger, o2 && o2.length > 0 ? o2.map((e3) => formatCloudSession(e3, a2, c2)) : []) };
            var o2, a2, c2;
          });
        }
        queryCloudSession(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ sessionId: { type: "string", allowEmpty: false } }, e2);
            const { accid: t2, scene: r2 } = getAccountFromSessionId(e2.sessionId, "-");
            return formatCloudSession((yield this.core.sendCmd("nimQueryCloudSession", { tag: { sessionId: "superTeam" === r2 ? `super_team|${t2}` : `${r2}|${t2}` } })).content.session, this.core.account, this.logger);
          });
        }
        updateCloudSession(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ sessionId: { type: "string", allowEmpty: false }, ext: { type: "string", allowEmpty: false, required: false } }, e2);
            const { accid: t2, scene: r2 } = getAccountFromSessionId(e2.sessionId, "-");
            yield this.core.sendCmd("nimUpdateCloudSession", { tag: { sessionId: "superTeam" === r2 ? `super_team|${t2}` : `${r2}|${t2}`, ext: e2.ext } });
          });
        }
        deleteCloudSessionList(e2) {
          return __awaiter(this, void 0, void 0, function* () {
            validate({ sessionIdList: { type: "array", itemType: "string" } }, e2);
            const t2 = e2.sessionIdList.map((e3) => {
              const { accid: t3, scene: r2 } = getAccountFromSessionId(e3, "-");
              return { sessionId: "superTeam" === r2 ? `super_team|${t3}` : `${r2}|${t3}` };
            });
            yield this.core.sendCmd("nimDeleteCloudSessionList", { tags: t2 });
          });
        }
        nimMultiSyncUpdateCloudSessionHandler(e2) {
          const t2 = formatCloudSession(e2.content.session, this.core.account, this.logger);
          this.core.emit("multiSyncUpdateCloudSession", t2);
        }
      }, "cloudSession"), NIM.registerService(SignalingService, "signaling"), NIM;
    });
  }
});
export default require_NIM_UNIAPP_SDK();
//# sourceMappingURL=nim-web-sdk-ng_dist_NIM_UNIAPP_SDK.js.map

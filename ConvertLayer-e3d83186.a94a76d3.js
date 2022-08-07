// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"7KBa":[function(require,module,exports) {

"use strict"; // ref: https://github.com/tc39/proposal-global

var getGlobal = function () {
  // the only reliable means to get the global object is
  // `Function('return this')()`
  // However, this causes CSP violations in Chrome apps.
  if (typeof self !== 'undefined') {
    return self;
  }

  if (typeof window !== 'undefined') {
    return window;
  }

  if (typeof global !== 'undefined') {
    return global;
  }

  throw new Error('unable to locate global object');
};

var global = getGlobal();
module.exports = exports = global.fetch; // Needed for TypeScript and Webpack.

if (global.fetch) {
  exports.default = global.fetch.bind(global);
}

exports.Headers = global.Headers;
exports.Request = global.Request;
exports.Response = global.Response;
},{}],"l21D":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _indexD3c7217d = require("./index-d3c7217d.js");

var _react = require("react");

require("classnames");

require("styled-components");

require("react-spring");

require("react-dom");

require("blueimp-md5");

var _cloneDeep = _interopRequireDefault(require("clone-deep"));

require("js-cookie");

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _ = ["appId", "appKey"];

function v(e, t) {
  var n;
  n = "string" == typeof t ? [t] : t;
  var r = Object.prototype.toString.call(e).slice(8, -1);
  if (!n.includes(r)) throw new Error("parameter type must be " + n.join(" or ") + "!");
  return !0;
}

var m = null,
    y = function () {
  function e(e, t, n) {
    for (var r in void 0 === n && (n = "POST"), this.__table__ = e, this.__classes__ = "classes", this.__data__ = {}, this.id = t ? t.objectId : null, this.createdAt = t ? t.createdAt : null, this.updatedAt = t ? t.updatedAt : null, this.attributes = {}, this.__method__ = n, t) {
      if (Object.prototype.hasOwnProperty.call(t, r)) {
        if ("_r" === r || "_w" === r || "ua" === r || "ownerCode" === r) continue;
        this.attributes[r] = t[r];
      }
    }
  }

  var t = e.prototype;
  return t.increment = function (e, t) {
    return void 0 === t && (t = 1), v(e, "String"), v(t, "Number"), this.__data__[e] = {
      __op: "Increment",
      amount: t
    }, this;
  }, t.set = function (e, t) {
    return v(e, "String"), this.__data__[e] = t, this;
  }, t.get = function (e) {
    return v(e, "String"), this.attributes[e];
  }, t.setACL = function (e) {
    if (e instanceof b.ACL == 0) throw new Error("parameter must instacneof AV.ACL");
    this.__data__.ACL = {};
    var t = e.permissionsById;

    for (var n in t) {
      this.__data__.ACL[n] = t[n];
    }

    return this;
  }, t.save = function () {
    var e = this;
    return (0, _nodeFetch.default)("PUT" === this.__method__ ? b.serverURLs.api + "/1.1/" + this.__classes__ + "/" + this.__table__ + "/" + this.id + "?fetchWhenSave=true" : b.serverURLs.api + "/1.1/" + this.__classes__ + "/" + this.__table__ + "?fetchWhenSave=true", {
      method: this.__method__,
      body: JSON.stringify(this.__data__),
      headers: {
        "X-LC-Id": b.__appId__,
        "X-LC-Key": b.__appKey__,
        "X-LC-Session": m && m.attributes.sessionToken,
        "Content-Type": "application/json"
      }
    }).then(function (e) {
      return e.json();
    }).then(function (t) {
      return "PUT" === e.__method__ && (t = Object.assign(e.attributes, t)), "POST" === e.__method__ && (e.__method__ = "PUT", e.id = t.objectId), w(t, e.__table__);
    });
  }, e;
}(),
    g = function (e) {
  function n(t) {
    var n;
    return t || (t = "Users"), (n = e.call(this, t) || this).__table__ = t, n;
  }

  (0, _indexD3c7217d.c)(n, e);
  var r = n.prototype;
  return r.setUsername = function (e) {
    this.set("username", e);
  }, r.setPassword = function (e) {
    this.set("password", e);
  }, r.save = function () {
    var t = this;
    return e.prototype.save.call(this).then(function (e) {
      return "POST" === t.__method__ && (t.__method__ = "PUT", t.id = e.objectId), m || (m = {}), e.attributes.username = t.__data__.username, e = Object.assign(m, e), m = e;
    });
  }, n.current = function () {
    return m;
  }, n.logOut = function () {
    m = null;
  }, n.logIn = function (e, t) {
    var n = this;
    return (0, _nodeFetch.default)(b.serverURLs.api + "/1.1/login", {
      method: "POST",
      body: JSON.stringify({
        username: e,
        password: t
      }),
      headers: {
        "X-LC-Id": b.__appId__,
        "X-LC-Key": b.__appKey__,
        "Content-Type": "application/json"
      }
    }).then(function (e) {
      if (e.ok) return e.json();
      throw new Error("Login failed");
    }).then(function (t) {
      return function (e, t, n) {
        t.username = n, m = new y(e, t, "PUT");
      }(n.__table__, t, e), m;
    });
  }, n;
}(y);

function w(e, t) {
  return new y(t, e, "PUT");
}

var b = {
  __appId__: "",
  __appKey__: "",
  serverURLs: {
    api: "https://i5daxohp.api.lncld.net",
    engine: "https://i5daxohp.engine.lncld.net",
    push: "https://i5daxohp.push.lncld.net",
    stats: "https://i5daxohp.stats.lncld.net"
  },
  init: function init(t) {
    if (!t.appId || !t.appKey) throw new Error("appId or appKey must be required!");
    var n = t.appId,
        r = t.appKey,
        s = (0, _indexD3c7217d._)(t, _);

    for (var i in b.__appKey__ = r, b.__appId__ = n, s) {
      Object.prototype.hasOwnProperty.call(s, i) && null != b[i] && (b[i] = s[i]);
    }

    if ("string" == typeof b.serverURLs) {
      var o = b.serverURLs;
      b.serverURLs = {
        api: o,
        engine: o,
        push: o,
        stats: o
      };
    }
  },
  ACL: function () {
    function e() {
      this.permissionsById = {};
    }

    var t = e.prototype;
    return t.setPublicReadAccess = function (e) {
      v(e, "Boolean"), null == this.permissionsById["*"] && (this.permissionsById["*"] = {}), this.permissionsById["*"].read = e;
    }, t.setPublicWriteAccess = function (e) {
      v(e, "Boolean"), null == this.permissionsById["*"] && (this.permissionsById["*"] = {}), this.permissionsById["*"].write = e;
    }, t.setReadAccess = function (e, t) {
      v(t, "Boolean"), null == this.permissionsById[e] && (this.permissionsById[e] = {}), this.permissionsById[e].read = t;
    }, t.setWriteAccess = function (e, t) {
      v(t, "Boolean"), null == this.permissionsById[e] && (this.permissionsById[e] = {}), this.permissionsById[e].write = t;
    }, e;
  }(),
  Object: {
    extend: function extend(e) {
      return v(e, "String"), y.bind(void 0, e);
    }
  },
  Query: function () {
    function e(e) {
      e || (e = "Users"), this.__table__ = e, this.conditions = {};
    }

    var t = e.prototype;
    return t.equalTo = function (e, t) {
      return v(e, "String"), null == this.conditions.where && (this.conditions.where = {}), this.conditions.where[e] = t, this;
    }, t.get = function (e) {
      var t = this;
      return (0, _nodeFetch.default)(b.serverURLs.api + "/1.1/classes/" + this.__table__ + "/" + e + "?fetchWhenSave=true", {
        headers: {
          "X-LC-Id": b.__appId__,
          "X-LC-Key": b.__appKey__,
          "Content-Type": "application/json"
        }
      }).then(function (e) {
        return e.json();
      }).then(function (e) {
        return w(e, t.__table__);
      });
    }, t.notEqualTo = function (e, t) {
      return v(e, "String"), null == this.conditions.where && (this.conditions.where = {}), this.conditions.where[e] = {
        $ne: t
      }, this;
    }, t.containedIn = function (e, t) {
      return v(e, "String"), v(t, "Array"), null == this.conditions.where && (this.conditions.where = {}), this.conditions.where[e] = {
        $in: t
      }, this;
    }, t.select = function (e) {
      var t;
      v(e, ["String", "Array"]), "string" == typeof e ? t = [e] : Array.isArray(e) && (t = e), null == this.conditions.keys && (this.conditions.keys = "");

      for (var n = 0; n < t.length - 1; n++) {
        this.conditions.keys += t[n] + ",";
      }

      return this.conditions.keys += t[t.length - 1], this;
    }, t.skip = function (e) {
      return v(e, "Number"), this.conditions.skip = e, this;
    }, t.limit = function (e) {
      return v(e, "Number"), this.conditions.limit = e, this;
    }, t.addDescending = function (e) {
      return v(e, "String"), null != this.conditions.order ? this.conditions.order += "," : this.conditions.order = "", this.conditions.order += "-" + e, this;
    }, t.addAscending = function (e) {
      return v(e, "String"), null != this.conditions.order ? this.conditions.order += "," : this.conditions.order = "", this.conditions.order += e, this;
    }, t.descending = function (e) {
      return v(e, "String"), this.conditions.order = "-" + e, this;
    }, t.ascending = function (e) {
      return v(e, "String"), this.conditions.order = e, this;
    }, t.count = function () {
      return this.conditions.count = 1, null == this.conditions.limit && (this.conditions.limit = 0), this._find().then(function (e) {
        if (101 === e.code) throw e;
        return e.count;
      });
    }, t.find = function () {
      var e = this;
      return this._find().then(function (t) {
        if (101 === t.code) throw t;
        if (!t.results) throw t;

        for (var n = t.results, r = [], s = 0; s < n.length; s++) {
          r.push(new y(e.__table__, n[s], "PUT"));
        }

        return r;
      }).catch(function (e) {
        throw e;
      });
    }, t._find = function () {
      var e = "";

      for (var t in this.conditions) {
        var n = this.conditions[t],
            r = void 0;
        null != n && (r = "object" != _typeof(n) ? n : JSON.stringify(n), e += "&" + t + "=" + encodeURIComponent(r));
      }

      return e = e.slice(1), (0, _nodeFetch.default)(b.serverURLs.api + "/1.1/classes/" + this.__table__ + "?" + e, {
        headers: {
          "X-LC-Id": b.__appId__,
          "X-LC-Key": b.__appKey__,
          "Content-Type": "application/json"
        }
      }).then(function (e) {
        return e.json();
      });
    }, e;
  }(),
  User: g
};

function _default() {
  var e = (0, _react.useState)(!0),
      t = e[0],
      f = e[1],
      _ = (0, _react.useRef)(!1),
      v = (0, _react.useRef)([]),
      m = (0, _react.useRef)(!1),
      y = (0, _react.useRef)([]),
      g = (0, _react.useRef)({}),
      w = (0, _indexD3c7217d.r)(),
      I = w.pageviewMap,
      C = w.countMap,
      A = function () {
    var e = (0, _indexD3c7217d.r)(),
        t = e.appId,
        u = e.appKey,
        c = e.serverURLs,
        a = e.CommentClass,
        l = e.CounterClass,
        d = e.UserClass,
        h = e.editMode,
        p = e.pageviewMap,
        f = (0, _indexD3c7217d.g)("serverless_react_bbs_ownerCode"),
        _ = f || (0, _indexD3c7217d.e)(),
        v = {
      id: null,
      attributes: {
        objectId: null,
        sessionToken: null,
        username: null
      }
    },
        m = 1,
        y = {
      100: "Initialization failed, Please check your appId and appKey.",
      401: "Unauthorized operation, Please check your appId and appKey.",
      403: "Access denied by api domain white list, Please check your security domain."
    },
        g = (0, _indexD3c7217d.f)();

    function w(e, t) {
      var n = new (b.Object.extend(l))(),
          r = new b.ACL();
      return r.setPublicReadAccess(!0), r.setPublicWriteAccess(!0), n.setACL(r), n.set("uniqStr", e), n.set("title", t), n.set("time", 1), n.save().then(function () {
        return 1;
      }).catch(function (e) {
        return console.error(y[e.code], e), 1;
      });
    }

    function I() {
      return g ? Promise.resolve(g) : h ? new Promise(function (e) {
        return f ? b.User.logIn(f, f).then(function (t) {
          return console.log("Can login", t), e(t);
        }).catch(function (t) {
          return console.log(t), C().then(function (t) {
            return e(t);
          });
        }) : C().then(function (t) {
          return e(t);
        });
      }) : Promise.resolve(v);
    }

    function C() {
      if (!h) return Promise.resolve(v);
      var e = new b.User(d);
      e.setUsername(_), e.setPassword(_), console.log("signUp_server", e.id, JSON.stringify(e));
      var t = new b.ACL();
      return t.setPublicReadAccess(!1), t.setPublicWriteAccess(!1), e.setACL(t), console.log("Can not get, try create new user"), e.save().then(function (e) {
        return console.log("Create success"), (0, _indexD3c7217d.d)("serverless_react_bbs_ownerCode", _), f = _, e;
      }).catch(function (e) {
        return console.error(e), v;
      });
    }

    return {
      fetchComments_server: function fetchComments_server(e) {
        return new b.Query(a).equalTo("uniqStr", e).select(["nickname", "rootId", "message", "link", "pid", "avatar", "replyId", "at", "user_id"]).addDescending("createdAt").skip(1e3 * (m - 1)).limit(1e3).find().then(function (e) {
          return m++, e.map(function (e) {
            return e.attributes;
          });
        }).catch(function (e) {
          return 101 === e.code || console.error("Error happen in fetch owner task", e), [];
        });
      },
      fetchCounts_server: function fetchCounts_server(e, t) {
        void 0 === t && (t = !1);
        var n = new b.Query(a);
        return (t ? n.equalTo("uniqStr", e).count() : n.equalTo("uniqStr", e).equalTo("replyId", "").count()).then(function (e) {
          return e;
        }).catch(function (e) {
          return 101 === e.code || console.error("Error happen in fetch count", e), 0;
        });
      },
      fetchPageViews_server: function fetchPageViews_server(e, t) {
        return p.has(e) ? p.get(e) : new b.Query(l).equalTo("uniqStr", e).find().then(function (n) {
          if (0 === n.length) return w(e, t);
          n.length > 1 && console.warn("Warning! The uniqStr is not unique! Current uniqStr is: " + e);
          var r = n[0],
              s = r.get("time") + 1;
          return r.increment("time"), r.set("title", t), r.save().then(function () {
            return s;
          }).catch(function () {
            return s - 1;
          });
        }).catch(function (n) {
          return console.error(y[n.code], n), w(e, t);
        });
      },
      serverInit: function serverInit() {
        return function (e) {
          var t = e.appId,
              n = e.appKey,
              r = e.serverURLs;
          return b.__appKey__ && b.__appId__ ? Promise.resolve() : function (e, t) {
            return new Promise(function (n) {
              return t ? n(t) : function (e) {
                return fetch("https://app-router.leancloud.cn/2/route?appId=" + e, {
                  method: "get"
                }).then(function (e) {
                  return e.json();
                }).then(function (e) {
                  return e.api_server || e.api;
                });
              }(e).then(function (e) {
                return n(e);
              });
            }).then(function (e) {
              var t = e;
              return "string" != typeof t || t.startsWith("https://") || (t = "https://" + t), t;
            }).catch(function (e) {
              throw console.error(e), new Error("Something error happened in initial server urls. Please pass the serverURLs manually");
            });
          }(t, r).then(function (e) {
            if (!e) throw new Error("serverURLs 获取失败，请自行手动添加, https://github.com/stonehank/react-valine#获取serverURLs");

            try {
              b.init({
                appId: t,
                appKey: n,
                serverURLs: e
              });
            } catch (e) {
              throw console.error(e), new Error("Something error when initial leancloud, try again please");
            }
          });
        }({
          appId: t,
          appKey: u,
          serverURLs: c,
          CommentClass: a,
          CounterClass: l,
          UserClass: d
        });
      },
      signIn_server: I,
      signUp_server: C,
      updateComment_server: function updateComment_server(e, t) {
        if (!h) return Promise.reject(new Error("Not in editMode"));
        var n = new (b.Object.extend(a))({
          objectId: e,
          message: t
        }, "PUT");
        return n.set("message", t), n.save().then(function (e) {
          return e.attributes;
        }).catch(function (e) {
          return console.error("update error!", e), null;
        });
      },
      uploadComment_server: function uploadComment_server(e) {
        var t = new (b.Object.extend(a))();

        for (var n in e) {
          e.hasOwnProperty(n) && t.set(n, e[n]);
        }

        t.set("url", window.location.href);
        var r = new b.ACL();
        return r.setPublicReadAccess(!0), r.setPublicWriteAccess(!1), I().then(function (e) {
          return t.set("user_id", e.id), e.id && r.setWriteAccess(e.id, !0), t.setACL(r), t.save();
        }).then(function (e) {
          console.log("upload,success", e);
          var t = e.attributes;
          return t.error ? (console.error(t.error), null) : t;
        }).catch(function (e) {
          return console.log("upload,error", e, e.code), console.error(e.msg), null;
        });
      }
    };
  }(),
      P = A.serverInit,
      L = A.signIn_server,
      S = A.fetchCounts_server,
      U = A.fetchPageViews_server,
      j = A.updateComment_server,
      T = A.uploadComment_server,
      R = A.fetchComments_server;

  (0, _react.useEffect)(function () {
    P().then(function () {
      return f(!1);
    });
  }, []);
  var k = (0, _react.useCallback)(function (e) {
    return U(e).then(function (t) {
      return I.set(e, t), t;
    });
  }, []),
      O = (0, _react.useCallback)(function (e) {
    return S(e).then(function (t) {
      return C.set(e, t), t;
    });
  }, []),
      K = (0, _react.useCallback)(function (e, t) {
    return j(e, t).then(function (t) {
      return t ? (g.current[n = e].message = (r = t).message, g.current[n].updatedAt = r.updatedAt, t) : null;
      var n, r;
    });
  }, []),
      q = (0, _react.useCallback)(function (e) {
    return T(e).then(function (e) {
      if (!e) return null;

      if (!e.replyId) {
        var t = C.get(e.uniqStr);
        C.set(e.uniqStr, t + 1);
      }

      return function (e, t) {
        if (t.replyId) {
          var n = g.current[t.replyId];
          null == n.replys && (n.replys = [], n.replyCounts = 0), n.replys.unshift(t), n.replyCounts++;
        } else e.unshift(t);

        g.current[t.objectId] = t;
      }(y.current, e), e;
    }).catch(function (e) {
      return console.error(e), null;
    });
  }, []),
      B = (0, _react.useCallback)(function () {
    return L().then(function (e) {
      var t = e;
      return e.attributes && (t = {
        id: e.id,
        sessionToken: e.attributes.sessionToken,
        username: e.attributes.username
      }), (0, _indexD3c7217d.i)(t), t;
    });
  }, []);

  function x(e) {
    m.current && (e = e.concat(v.current), v.current = [], m.current = !1);

    for (var t, n = [], r = y.current.slice(), s = (0, _indexD3c7217d.h)(e); !(t = s()).done;) {
      var i = t.value;
      i.replyId ? n.push(i) : r.push(i);
    }

    n.sort(function (e, t) {
      return e.createdAt < t.createdAt ? -1 : 1;
    });

    for (var o = 0, c = n; o < c.length; o++) {
      var a = c[o],
          l = X(r, a);
      l.inserted ? r = l.list : v.current = [].concat(v.current, [a]);
    }

    return y.current = r, r;
  }

  function E(e) {
    for (var t, n = (0, _indexD3c7217d.h)(e); !(t = n()).done;) {
      var r = t.value;
      r.replys && r.replys.length > 0 ? (r.replyCounts = r.replys.length, E(r.replys)) : r.replyCounts = 0;
    }

    return e;
  }

  function W(e) {
    for (var t, n = (0, _indexD3c7217d.h)(e); !(t = n()).done;) {
      var r = t.value;
      g.current[r.objectId] = r;
    }

    return e;
  }

  function X(e, t) {
    if (!e || 0 === e.length) return {
      list: e,
      inserted: !1
    };
    e.sort(function (e, t) {
      return e.createdAt < t.createdAt ? 1 : -1;
    });

    for (var n = t.replyId, r = t.rootId, s = 0; s < e.length; s++) {
      var i = e[s];

      if ((i.rootId || i.objectId) === r) {
        if (i.objectId === n) return null == i.replys && (i.replys = []), i.replys.push(t), {
          list: e,
          inserted: !0
        };
        var o = X(i.replys, t);
        if (o.inserted) return i.replys = o.list, {
          list: e,
          inserted: !0
        };
      }
    }

    return {
      list: e,
      inserted: !1
    };
  }

  return {
    initialLoading: t,
    fetchPageViews: k,
    fetchComments: (0, _react.useCallback)(function (e) {
      var t = e.uniqStr,
          n = e.replyId,
          r = e.pageSize,
          s = e.page,
          i = e.deepReply,
          o = e.deepReplyCounts;
      return m.current = !0, (n || _.current ? Promise.resolve(y.current) : function (e) {
        return console.log("mock network"), R(e).then(function (e) {
          return _.current = e.length < 1e3, e;
        }).then(W).then(x).then(E);
      }(t)).then(function (e) {
        var t = e;
        n ? (t = g.current[n].replys, i && (t = function e(t) {
          for (var n = [], r = 0; r < t.length; r++) {
            n.push(t[r]), t[r].replys && (n = n.concat(e(t[r].replys)));
          }

          return n;
        }(t))) : i && (t = Object.values(g.current)), t = t.sort(function (e, t) {
          return e.createdAt < t.createdAt ? 1 : -1;
        });
        var u = (0, _cloneDeep.default)(t.slice(0, r * s));
        return o && function e(t) {
          for (var n = 0, r = 0; r < t.length; r++) {
            t[r].replys && t[r].replys.length > 0 ? (t[r].replyCounts = e(t[r].replys), n += t[r].replyCounts + 1) : n += 1;
          }

          return n;
        }(u), u = u.map(function (e) {
          return e.replys = null, e;
        }), new Promise(function (e) {
          setTimeout(function () {
            e({
              data: u,
              total: Math.max(y.current.length, u.length, t.length)
            });
          }, 200);
        });
      });
    }, []),
    fetchCounts: O,
    fetchCurrentUser: B,
    updateComment: K,
    uploadComment: q
  };
}
},{"./index-d3c7217d.js":"yUM/","react":"1n8/","classnames":"9qb7","styled-components":"tFSs","react-spring":"I+q1","react-dom":"NKHc","blueimp-md5":"Pqnw","clone-deep":"mP1A","js-cookie":"PhdE","node-fetch":"7KBa"}]},{},[], null)
//# sourceMappingURL=/react-bbs/ConvertLayer-e3d83186.a94a76d3.js.map
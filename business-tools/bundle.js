!(function (e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = e())
    : 'function' == typeof define && define.amd
    ? define([], e)
    : (('undefined' != typeof window
        ? window
        : 'undefined' != typeof global
        ? global
        : 'undefined' != typeof self
        ? self
        : this
      ).YYY = e())
})(function () {
  return (function i(r, o, a) {
    function s(n, e) {
      if (!o[n]) {
        if (!r[n]) {
          var t = 'function' == typeof require && require
          if (!e && t) return t(n, !0)
          if (l) return l(n, !0)
          throw (
            (((t = new Error("Cannot find module '" + n + "'")).code =
              'MODULE_NOT_FOUND'),
            t)
          )
        }
        ;(t = o[n] = { exports: {} }),
          r[n][0].call(
            t.exports,
            function (e) {
              return s(r[n][1][e] || e)
            },
            t,
            t.exports,
            i,
            r,
            o,
            a,
          )
      }
      return o[n].exports
    }
    for (
      var l = 'function' == typeof require && require, e = 0;
      e < a.length;
      e++
    )
      s(a[e])
    return s
  })(
    {
      1: [
        function (e, n, t) {
          'use strict'
          var i,
            r,
            o,
            a = e('firebase/app'),
            s = e('firebase/database'),
            l = chrome.runtime.getManifest(),
            e = e('./styles.css')
          function c(e, n) {
            let t = document.createElement('meta')
            ;(t.name = e),
              (t.content = n),
              document.getElementsByTagName('head')[0].appendChild(t)
          }
          !(function (e) {
            try {
              var n = document.createElement('script')
              ;(n.type = 'text/javascript'),
                (n.src = e),
                (
                  document.head ||
                  document.body ||
                  document.documentElement
                ).appendChild(n)
            } catch (e) {}
          })(chrome.extension.getURL('/vendor.js?v=' + l.version)),
            c('wawp-ex-id', chrome.runtime.id),
            c('wawp-ex-ui', chrome.i18n.getUILanguage()),
            c('wawp-ex-ver', l.version),
            (i = 'wawp-ex-css'),
            (r = e),
            null === document.getElementById(i) &&
              (((o = document.createElement('link')).rel = 'stylesheet'),
              (o.type = 'text/css'),
              (o.id = i),
              (o.href = 'data:text/css;charset=UTF-8,' + encodeURIComponent(r)),
              (
                document.head ||
                document.body ||
                document.documentElement
              ).appendChild(o)),
            chrome.runtime.onMessage.addListener(function (e, n, t) {
              return (
                'reInitValue' == e.action
                  ? window.dispatchEvent(
                      new CustomEvent('reInitValue', {
                        detail: { parameter: e.parameter, value: e.value },
                      }),
                    )
                  : 'aP' == e.action
                  ? window.dispatchEvent(
                      new CustomEvent('aP', {
                        detail: {
                          product: e.product,
                          time: e.time,
                          users: e.users,
                          expiration: e.expiration,
                          numbers: e.numbers,
                          show: e.show,
                        },
                      }),
                    )
                  : 'dP' == e.action &&
                    window.dispatchEvent(
                      new CustomEvent('dP', {
                        detail: {
                          product: e.product,
                          time: e.time,
                          status: e.status,
                          users: e.users,
                          expiration: e.expiration,
                          numbers: e.numbers,
                          show: e.show,
                        },
                      }),
                    ),
                t(),
                !0
              )
            }),
            window.addEventListener(
              'getUnreadMessages',
              function (e) {
                chrome.runtime.sendMessage({
                  type: 'setUnreadMessages',
                  messages: e.detail,
                })
              },
              !1,
            ),
            window.addEventListener(
              'enableDebug',
              function (e) {
                0
              },
              !1,
            ),
            window.addEventListener(
              'disableDebug',
              function (e) {
                0
              },
              !1,
            ),
            window.addEventListener(
              'setTargetIndex',
              function (e) {
                chrome.runtime.sendMessage({
                  type: 'setBadgeText',
                  title: e.detail,
                  color: 'red',
                })
              },
              !1,
            ),
            window.addEventListener(
              'setBadgeText',
              function (e) {
                chrome.runtime.sendMessage({
                  type: 'setBadgeText',
                  title: e.detail.text,
                  color: e.detail.color,
                })
              },
              !1,
            ),
            window.addEventListener(
              'getServerValues',
              function (e) {
                chrome.runtime.sendMessage({ type: 'getServerValues' })
              },
              !1,
            ),
            window.addEventListener(
              'getCRMLists',
              function (e) {
                chrome.runtime.sendMessage({
                  type: 'getCRMLists',
                  software: e.detail.software,
                  key: e.detail.key,
                })
              },
              !1,
            ),
            window.addEventListener(
              'getCRMContacts',
              function (e) {
                chrome.runtime.sendMessage({
                  type: 'getCRMContacts',
                  software: e.detail.software,
                  list: e.detail.list,
                  key: e.detail.key,
                })
              },
              !1,
            ),
            window.addEventListener(
              'saveContact',
              function (e) {
                chrome.runtime.sendMessage({
                  type: 'saveContact',
                  target: e.detail.target,
                  software: e.detail.software,
                  name: e.detail.name,
                  phone: e.detail.phone,
                  key: e.detail.key,
                })
              },
              !1,
            ),
            window.addEventListener(
              'saveSettings',
              function (t) {
                try {
                  let e = t.detail.value || ''
                  e.forEach(function (e) {
                    for (var n in e)
                      chrome.storage.local.set({
                        [t.detail.key + '_' + n]: e[n],
                      })
                  })
                } catch (e) {}
              },
              !1,
            ),
            window.addEventListener(
              'getSettings',
              function (e) {
                chrome.storage.local.get(null, function (e) {
                  e = new CustomEvent('restoreSettings', { detail: e })
                  window.dispatchEvent(e)
                })
              },
              !1,
            ),
            window.addEventListener(
              'validateLicenseCode',
              function (n) {
                chrome.storage.local.set({ key: n.detail.key }, function () {
                  var e = new CustomEvent('getProducts', {
                    detail: {
                      key: n.detail.key,
                      user: n.detail.user,
                      referrer: n.detail.referrer,
                      first: !0,
                    },
                  })
                  window.dispatchEvent(e)
                })
              },
              !1,
            ),
            window.addEventListener(
              'deleteLicense',
              function (e) {
                chrome.storage.local.remove('key')
              },
              !1,
            ),
            window.addEventListener(
              'saveReference',
              function (e) {
                chrome.runtime.sendMessage({
                  type: 'saveReference',
                  obj: e.detail,
                })
              },
              !1,
            ),
            window.addEventListener(
              'triggerWebhook',
              function (t) {
                chrome.runtime.sendMessage(
                  {
                    type: 'triggerWebhook',
                    method: t.detail.webhook.method,
                    endpoint: t.detail.webhook.endpoint,
                    params: (function (e) {
                      const n = []
                      for (var t in e)
                        n.push(
                          encodeURIComponent(t) +
                            '=' +
                            encodeURIComponent(e[t]),
                        )
                      return n.join('&')
                    })(t.detail.data),
                  },
                  function (e) {
                    var n
                    e.isError
                      ? ((n = new CustomEvent('notifyWebhookError', {
                          detail: e.response,
                        })),
                        window.dispatchEvent(n))
                      : ((e = new CustomEvent('sendMessage', {
                          detail: {
                            message: t.detail.data.m_serialized,
                            reply: t.detail.data.m_reply,
                            chat: t.detail.data.m_chat,
                            text: e,
                            quote: t.detail.data.m_quote,
                          },
                        })),
                        window.dispatchEvent(e))
                  },
                )
              },
              !1,
            ),
            window.addEventListener(
              'initFirebase',
              async function (e) {
                try {
                  var n = {
                    apiKey: e.detail.settings.api,
                    authDomain: e.detail.settings.project + '.firebaseapp.com',
                    databaseURL:
                      e.detail.settings.database ||
                      'https://' +
                        e.detail.settings.project +
                        '.firebaseio.com',
                    projectId: e.detail.settings.project,
                    storageBucket: e.detail.settings.project + '.appspot.com',
                  }
                  ;(0, a.getApps)().length &&
                    (await (0, a.deleteApp)((0, a.getApp)()))
                  var t = (0, a.initializeApp)(n)
                  const i = (0, s.getDatabase)(t)
                  e.detail.nodes.forEach(function (e) {
                    ;(0, s.onChildAdded)((0, s.ref)(i, e), function (n) {
                      n.val() &&
                        (0, s.remove)((0, s.ref)(i, e + '/' + n.ref.key))
                          .then(function () {
                            var e = new CustomEvent('sendMessageFromFirebase', {
                              detail: {
                                phone: n.val().phone,
                                group: n.val().group,
                                content: n.val().content,
                                type: n.val().type || 'text',
                                name: n.val().name || '',
                                text: n.val().text || '',
                              },
                            })
                            window.dispatchEvent(e)
                          })
                          .catch(function () {})
                    })
                  })
                } catch (e) {}
              },
              !1,
            ),
            window.addEventListener(
              'fetchFile',
              function (t) {
                try {
                  fetch(t.detail.url)
                    .then((e) => e.blob())
                    .then((e) => {
                      var n = new FileReader()
                      ;(n.onload = function () {
                        var e = new CustomEvent('sendMessageFromFirebase', {
                          detail: {
                            phone: t.detail.phone,
                            content: this.result,
                            type: 'media',
                            name: 'image.jpeg',
                            text: t.detail.text || '',
                          },
                        })
                        window.dispatchEvent(e)
                      }),
                        n.readAsDataURL(e)
                    })
                } catch (e) {}
              },
              !1,
            ),
            window.addEventListener(
              'buyProduct',
              function (e) {
                e.detail.user
                var n = e.detail.product || '',
                  t = e.detail.referrer || '',
                  e = document.createElement('a')
                e.setAttribute(
                  'href',
                  "mailto:info@soletstalkdigital.com"
                ),
                  e.setAttribute('target', '_blank'),
                  document.body.appendChild(e),
                  e.click(),
                  setTimeout(function () {
                    document.querySelector('.enter-license').click()
                  }, 3e3)
              },
              !1,
            ),
            window.addEventListener(
              'orderDetails',
              function (e) {
                var n
                e.detail.order
                  ? ((n = btoa(e.detail.order.subscription_id)),
                    (window.location.href =
                      "javascript:alerty.prompt('" +
                      chrome.i18n.getMessage('thank_you_for_subscribing') +
                      "',{inputType: 'text', cancelLabel: '" +
                      chrome.i18n.getMessage('close') +
                      "',title: '" +
                      chrome.i18n.getMessage('license_key') +
                      "',inputValue: '" +
                      n +
                      "'});"),
                    chrome.storage.local.set({ key: n }, function () {
                      window.dispatchEvent(
                        new CustomEvent('aP', {
                          detail: { product: product, time: n },
                        }),
                      )
                    }))
                  : document.querySelector('.enter-license').click()
              },
              !1,
            ),
            window.addEventListener(
              'getProducts',
              async function (e) {
                var i,
                  n = e.detail.user || '',
                  t = e.detail.referrer || '',
                  r = e.detail.first || !1
                let o =
                  ((i = 'key'),
                  (await new Promise((n, t) => {
                    try {
                      chrome.storage.local.get(i, function (e) {
                        n(e[i])
                      })
                    } catch (e) {
                      t(e)
                    }
                  })) || e.detail.key)
                if (o)
                  try {
                    ;(o = atob(o)),
                      chrome.runtime.sendMessage({
                        type: 'validateLicense',
                        key: o,
                        source: 'key',
                        user: n,
                        referrer: t,
                        first: r,
                      })
                  } catch (e) {
                    chrome.storage.local.remove('key'),
                      (window.location.href =
                        "javascript:aM('something_is_wrong_with_your_license_key')")
                  }
              },
              !1,
            )
        },
        { './styles.css': 10, 'firebase/app': 7, 'firebase/database': 8 },
      ],
      2: [
        function (e, n, t) {
          'use strict'
          Object.defineProperty(t, '__esModule', { value: !0 }),
            Object.defineProperty(t, 'FirebaseError', {
              enumerable: !0,
              get: function () {
                return s.FirebaseError
              },
            }),
            (t._DEFAULT_ENTRY_NAME = t.SDK_VERSION = void 0),
            (t._addComponent = p),
            (t._addOrOverwriteComponent = function (e, n) {
              e.container.addOrOverwriteComponent(n)
            }),
            (t._apps = void 0),
            (t._clearComponents = function () {
              u.clear()
            }),
            (t._components = void 0),
            (t._getProvider = g),
            (t._registerComponent = f),
            (t._removeServiceInstance = function (e, n, t = c) {
              g(e, n).clearInstance(t)
            }),
            (t.deleteApp = async function (e) {
              var n = e.name
              d.has(n) &&
                (d.delete(n),
                await Promise.all(
                  e.container.getProviders().map((e) => e.delete()),
                ),
                (e.isDeleted = !0))
            }),
            (t.getApp = function (e = c) {
              var n = d.get(e)
              if (n) return n
              throw m.create('no-app', { appName: e })
            }),
            (t.getApps = function () {
              return Array.from(d.values())
            }),
            (t.initializeApp = function (e, n = {}) {
              if ('object' != typeof n) {
                const i = n
                n = { name: i }
              }
              const t = Object.assign(
                  { name: c, automaticDataCollectionEnabled: !1 },
                  n,
                ),
                i = t.name
              if ('string' != typeof i || !i)
                throw m.create('bad-app-name', { appName: String(i) })
              n = d.get(i)
              if (n) {
                if (
                  (0, s.deepEqual)(e, n.options) &&
                  (0, s.deepEqual)(t, n.config)
                )
                  return n
                throw m.create('duplicate-app', { appName: i })
              }
              const r = new a.ComponentContainer(i)
              for (const o of u.values()) r.addComponent(o)
              e = new b(e, t, r)
              return d.set(i, e), e
            }),
            (t.onLog = function (e, n) {
              if (null !== e && 'function' != typeof e)
                throw m.create('invalid-log-argument')
              ;(0, i.setUserLogHandler)(e, n)
            }),
            (t.registerVersion = y),
            (t.setLogLevel = function (e) {
              ;(0, i.setLogLevel)(e)
            })
          var a = e('@firebase/component'),
            i = e('@firebase/logger'),
            s = e('@firebase/util')
          class r {
            constructor(e) {
              this.container = e
            }
            getPlatformInfoString() {
              const e = this.container.getProviders()
              return e
                .map((e) => {
                  if (
                    (function (e) {
                      e = e.getComponent()
                      return 'VERSION' === (null == e ? void 0 : e.type)
                    })(e)
                  ) {
                    e = e.getImmediate()
                    return `${e.library}/${e.version}`
                  }
                  return null
                })
                .filter((e) => e)
                .join(' ')
            }
          }
          const o = '@firebase/app',
            l = new i.Logger('@firebase/app')
          const c = '[DEFAULT]'
          t._DEFAULT_ENTRY_NAME = c
          const h = {
              '@firebase/app': 'fire-core',
              '@firebase/app-compat': 'fire-core-compat',
              '@firebase/analytics': 'fire-analytics',
              '@firebase/analytics-compat': 'fire-analytics-compat',
              '@firebase/app-check': 'fire-app-check',
              '@firebase/app-check-compat': 'fire-app-check-compat',
              '@firebase/auth': 'fire-auth',
              '@firebase/auth-compat': 'fire-auth-compat',
              '@firebase/database': 'fire-rtdb',
              '@firebase/database-compat': 'fire-rtdb-compat',
              '@firebase/functions': 'fire-fn',
              '@firebase/functions-compat': 'fire-fn-compat',
              '@firebase/installations': 'fire-iid',
              '@firebase/installations-compat': 'fire-iid-compat',
              '@firebase/messaging': 'fire-fcm',
              '@firebase/messaging-compat': 'fire-fcm-compat',
              '@firebase/performance': 'fire-perf',
              '@firebase/performance-compat': 'fire-perf-compat',
              '@firebase/remote-config': 'fire-rc',
              '@firebase/remote-config-compat': 'fire-rc-compat',
              '@firebase/storage': 'fire-gcs',
              '@firebase/storage-compat': 'fire-gcs-compat',
              '@firebase/firestore': 'fire-fst',
              '@firebase/firestore-compat': 'fire-fst-compat',
              'fire-js': 'fire-js',
              firebase: 'fire-js-all',
            },
            d = new Map()
          t._apps = d
          const u = new Map()
          function p(n, t) {
            try {
              n.container.addComponent(t)
            } catch (e) {
              l.debug(
                `Component ${t.name} failed to register with FirebaseApp ${n.name}`,
                e,
              )
            }
          }
          function f(e) {
            var n = e.name
            if (u.has(n))
              return (
                l.debug(
                  `There were multiple attempts to register component ${n}.`,
                ),
                !1
              )
            u.set(n, e)
            for (const t of d.values()) p(t, e)
            return !0
          }
          function g(e, n) {
            return e.container.getProvider(n)
          }
          t._components = u
          const m = new s.ErrorFactory('app', 'Firebase', {
            'no-app':
              "No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",
            'bad-app-name': "Illegal App name: '{$appName}",
            'duplicate-app':
              "Firebase App named '{$appName}' already exists with different options or config",
            'app-deleted': "Firebase App named '{$appName}' already deleted",
            'invalid-app-argument':
              'firebase.{$appName}() takes either no argument or a Firebase App instance.',
            'invalid-log-argument':
              'First argument to `onLog` must be null or a function.',
          })
          class b {
            constructor(e, n, t) {
              ;(this._isDeleted = !1),
                (this._options = Object.assign({}, e)),
                (this._config = Object.assign({}, n)),
                (this._name = n.name),
                (this._automaticDataCollectionEnabled =
                  n.automaticDataCollectionEnabled),
                (this._container = t),
                this.container.addComponent(
                  new a.Component('app', () => this, 'PUBLIC'),
                )
            }
            get automaticDataCollectionEnabled() {
              return this.checkDestroyed(), this._automaticDataCollectionEnabled
            }
            set automaticDataCollectionEnabled(e) {
              this.checkDestroyed(), (this._automaticDataCollectionEnabled = e)
            }
            get name() {
              return this.checkDestroyed(), this._name
            }
            get options() {
              return this.checkDestroyed(), this._options
            }
            get config() {
              return this.checkDestroyed(), this._config
            }
            get container() {
              return this._container
            }
            get isDeleted() {
              return this._isDeleted
            }
            set isDeleted(e) {
              this._isDeleted = e
            }
            checkDestroyed() {
              if (this.isDeleted)
                throw m.create('app-deleted', { appName: this._name })
            }
          }
          var _
          function y(e, n, t) {
            var i
            let r = null !== (i = h[e]) && void 0 !== i ? i : e
            t && (r += `-${t}`)
            ;(e = r.match(/\s|\//)), (t = n.match(/\s|\//))
            if (e || t) {
              const o = [
                `Unable to register library "${r}" with version "${n}":`,
              ]
              return (
                e &&
                  o.push(
                    `library name "${r}" contains illegal characters (whitespace or "/")`,
                  ),
                e && t && o.push('and'),
                t &&
                  o.push(
                    `version name "${n}" contains illegal characters (whitespace or "/")`,
                  ),
                void l.warn(o.join(' '))
              )
            }
            f(
              new a.Component(
                `${r}-version`,
                () => ({ library: r, version: n }),
                'VERSION',
              ),
            )
          }
          ;(t.SDK_VERSION = '9.1.3'),
            (_ = ''),
            f(new a.Component('platform-logger', (e) => new r(e), 'PRIVATE')),
            y(o, '0.7.4', _),
            y(o, '0.7.4', 'esm2017'),
            y('fire-js', '')
        },
        {
          '@firebase/component': 3,
          '@firebase/logger': 5,
          '@firebase/util': 6,
        },
      ],
      3: [
        function (e, n, t) {
          'use strict'
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.Provider = t.ComponentContainer = t.Component = void 0)
          var d = e('tslib'),
            i = e('@firebase/util'),
            e =
              ((r.prototype.setInstantiationMode = function (e) {
                return (this.instantiationMode = e), this
              }),
              (r.prototype.setMultipleInstances = function (e) {
                return (this.multipleInstances = e), this
              }),
              (r.prototype.setServiceProps = function (e) {
                return (this.serviceProps = e), this
              }),
              (r.prototype.setInstanceCreatedCallback = function (e) {
                return (this.onInstanceCreated = e), this
              }),
              r)
          function r(e, n, t) {
            ;(this.name = e),
              (this.instanceFactory = n),
              (this.type = t),
              (this.multipleInstances = !1),
              (this.serviceProps = {}),
              (this.instantiationMode = 'LAZY'),
              (this.onInstanceCreated = null)
          }
          t.Component = e
          var h = '[DEFAULT]',
            o =
              ((a.prototype.get = function (e) {
                var n = this.normalizeInstanceIdentifier(e)
                if (!this.instancesDeferred.has(n)) {
                  e = new i.Deferred()
                  if (
                    (this.instancesDeferred.set(n, e),
                    this.isInitialized(n) || this.shouldAutoInitialize())
                  )
                    try {
                      var t = this.getOrInitializeService({
                        instanceIdentifier: n,
                      })
                      t && e.resolve(t)
                    } catch (e) {}
                }
                return this.instancesDeferred.get(n).promise
              }),
              (a.prototype.getImmediate = function (n) {
                var e = this.normalizeInstanceIdentifier(
                    null == n ? void 0 : n.identifier,
                  ),
                  n =
                    null !== (n = null == n ? void 0 : n.optional) &&
                    void 0 !== n &&
                    n
                if (!this.isInitialized(e) && !this.shouldAutoInitialize()) {
                  if (n) return null
                  throw Error('Service ' + this.name + ' is not available')
                }
                try {
                  return this.getOrInitializeService({ instanceIdentifier: e })
                } catch (e) {
                  if (n) return null
                  throw e
                }
              }),
              (a.prototype.getComponent = function () {
                return this.component
              }),
              (a.prototype.setComponent = function (e) {
                var n, t
                if (e.name !== this.name)
                  throw Error(
                    'Mismatching Component ' +
                      e.name +
                      ' for Provider ' +
                      this.name +
                      '.',
                  )
                if (this.component)
                  throw Error(
                    'Component for ' + this.name + ' has already been provided',
                  )
                if (((this.component = e), this.shouldAutoInitialize())) {
                  if ('EAGER' === e.instantiationMode)
                    try {
                      this.getOrInitializeService({ instanceIdentifier: h })
                    } catch (e) {}
                  try {
                    for (
                      var i = (0, d.__values)(this.instancesDeferred.entries()),
                        r = i.next();
                      !r.done;
                      r = i.next()
                    ) {
                      var o = (0, d.__read)(r.value, 2),
                        a = o[0],
                        s = o[1],
                        l = this.normalizeInstanceIdentifier(a)
                      try {
                        var c = this.getOrInitializeService({
                          instanceIdentifier: l,
                        })
                        s.resolve(c)
                      } catch (e) {}
                    }
                  } catch (e) {
                    n = { error: e }
                  } finally {
                    try {
                      r && !r.done && (t = i.return) && t.call(i)
                    } finally {
                      if (n) throw n.error
                    }
                  }
                }
              }),
              (a.prototype.clearInstance = function (e) {
                this.instancesDeferred.delete((e = void 0 === e ? h : e)),
                  this.instancesOptions.delete(e),
                  this.instances.delete(e)
              }),
              (a.prototype.delete = function () {
                return (0, d.__awaiter)(this, void 0, void 0, function () {
                  var n
                  return (0, d.__generator)(this, function (e) {
                    switch (e.label) {
                      case 0:
                        return (
                          (n = Array.from(this.instances.values())),
                          [
                            4,
                            Promise.all(
                              (0, d.__spreadArray)(
                                (0, d.__spreadArray)(
                                  [],
                                  (0, d.__read)(
                                    n
                                      .filter(function (e) {
                                        return 'INTERNAL' in e
                                      })
                                      .map(function (e) {
                                        return e.INTERNAL.delete()
                                      }),
                                  ),
                                ),
                                (0, d.__read)(
                                  n
                                    .filter(function (e) {
                                      return '_delete' in e
                                    })
                                    .map(function (e) {
                                      return e._delete()
                                    }),
                                ),
                              ),
                            ),
                          ]
                        )
                      case 1:
                        return e.sent(), [2]
                    }
                  })
                })
              }),
              (a.prototype.isComponentSet = function () {
                return null != this.component
              }),
              (a.prototype.isInitialized = function (e) {
                return this.instances.has((e = void 0 === e ? h : e))
              }),
              (a.prototype.getOptions = function (e) {
                return (
                  this.instancesOptions.get((e = void 0 === e ? h : e)) || {}
                )
              }),
              (a.prototype.initialize = function (e) {
                var n,
                  t,
                  i = (e = void 0 === e ? {} : e).options,
                  i = void 0 === i ? {} : i,
                  r = this.normalizeInstanceIdentifier(e.instanceIdentifier)
                if (this.isInitialized(r))
                  throw Error(
                    this.name + '(' + r + ') has already been initialized',
                  )
                if (!this.isComponentSet())
                  throw Error(
                    'Component ' + this.name + ' has not been registered yet',
                  )
                var o = this.getOrInitializeService({
                  instanceIdentifier: r,
                  options: i,
                })
                try {
                  for (
                    var a = (0, d.__values)(this.instancesDeferred.entries()),
                      s = a.next();
                    !s.done;
                    s = a.next()
                  ) {
                    var l = (0, d.__read)(s.value, 2),
                      c = l[0],
                      h = l[1]
                    r === this.normalizeInstanceIdentifier(c) && h.resolve(o)
                  }
                } catch (e) {
                  n = { error: e }
                } finally {
                  try {
                    s && !s.done && (t = a.return) && t.call(a)
                  } finally {
                    if (n) throw n.error
                  }
                }
                return o
              }),
              (a.prototype.onInit = function (e, n) {
                var t = this.normalizeInstanceIdentifier(n),
                  i =
                    null !== (n = this.onInitCallbacks.get(t)) && void 0 !== n
                      ? n
                      : new Set()
                i.add(e), this.onInitCallbacks.set(t, i)
                n = this.instances.get(t)
                return (
                  n && e(n, t),
                  function () {
                    i.delete(e)
                  }
                )
              }),
              (a.prototype.invokeOnInitCallbacks = function (e, n) {
                var t,
                  i,
                  r = this.onInitCallbacks.get(n)
                if (r)
                  try {
                    for (
                      var o = (0, d.__values)(r), a = o.next();
                      !a.done;
                      a = o.next()
                    ) {
                      var s = a.value
                      try {
                        s(e, n)
                      } catch (e) {}
                    }
                  } catch (e) {
                    t = { error: e }
                  } finally {
                    try {
                      a && !a.done && (i = o.return) && i.call(o)
                    } finally {
                      if (t) throw t.error
                    }
                  }
              }),
              (a.prototype.getOrInitializeService = function (e) {
                var n = e.instanceIdentifier,
                  t = e.options,
                  i = void 0 === t ? {} : t,
                  e = this.instances.get(n)
                if (
                  !e &&
                  this.component &&
                  ((e = this.component.instanceFactory(this.container, {
                    instanceIdentifier: (t = n) === h ? void 0 : t,
                    options: i,
                  })),
                  this.instances.set(n, e),
                  this.instancesOptions.set(n, i),
                  this.invokeOnInitCallbacks(e, n),
                  this.component.onInstanceCreated)
                )
                  try {
                    this.component.onInstanceCreated(this.container, n, e)
                  } catch (e) {}
                return e || null
              }),
              (a.prototype.normalizeInstanceIdentifier = function (e) {
                return (
                  void 0 === e && (e = h),
                  !this.component || this.component.multipleInstances ? e : h
                )
              }),
              (a.prototype.shouldAutoInitialize = function () {
                return (
                  !!this.component &&
                  'EXPLICIT' !== this.component.instantiationMode
                )
              }),
              a)
          function a(e, n) {
            ;(this.name = e),
              (this.container = n),
              (this.component = null),
              (this.instances = new Map()),
              (this.instancesDeferred = new Map()),
              (this.instancesOptions = new Map()),
              (this.onInitCallbacks = new Map())
          }
          t.Provider = o
          ;(s.prototype.addComponent = function (e) {
            var n = this.getProvider(e.name)
            if (n.isComponentSet())
              throw new Error(
                'Component ' +
                  e.name +
                  ' has already been registered with ' +
                  this.name,
              )
            n.setComponent(e)
          }),
            (s.prototype.addOrOverwriteComponent = function (e) {
              this.getProvider(e.name).isComponentSet() &&
                this.providers.delete(e.name),
                this.addComponent(e)
            }),
            (s.prototype.getProvider = function (e) {
              if (this.providers.has(e)) return this.providers.get(e)
              var n = new o(e, this)
              return this.providers.set(e, n), n
            }),
            (s.prototype.getProviders = function () {
              return Array.from(this.providers.values())
            }),
            (e = s)
          function s(e) {
            ;(this.name = e), (this.providers = new Map())
          }
          t.ComponentContainer = e
        },
        { '@firebase/util': 6, tslib: 9 },
      ],
      4: [
        function (po, e, fo) {
          !function (uo) {
            !function () {
              'use strict'
              Object.defineProperty(fo, '__esModule', { value: !0 }),
                (fo._TEST_ACCESS_hijackHash = fo._TEST_ACCESS_forceRestClient = fo._ReferenceImpl = fo._QueryParams = fo._QueryImpl = fo.TransactionResult = fo.QueryConstraint = fo.OnDisconnect = fo.Database = fo.DataSnapshot = void 0),
                (fo._repoManagerDatabaseFromApp = ao),
                (fo._setSDKVersion = r),
                (fo._validateWritablePath = fo._validatePathString = void 0),
                (fo.child = Fr),
                (fo.connectDatabaseEmulator = function (e, n, t, i = {}) {
                  ;(e = (0, f.getModularInstance)(e))._checkNotDeleted(
                    'useEmulator',
                  ),
                    e._instanceStarted &&
                      R(
                        'Cannot call useEmulator() after instance has already been initialized.',
                      )
                  var r = e._repoInternal
                  let o = void 0
                  r.repoInfo_.nodeAdmin
                    ? (i.mockUserToken &&
                        R(
                          'mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".',
                        ),
                      (o = new G(G.OWNER)))
                    : i.mockUserToken &&
                      ((e =
                        'string' == typeof i.mockUserToken
                          ? i.mockUserToken
                          : (0, f.createMockUserToken)(
                              i.mockUserToken,
                              e.app.options.projectId,
                            )),
                      (o = new G(e)))
                  !(function (e, n, t, i) {
                    ;(e.repoInfo_ = new X(
                      `${n}:${t}`,
                      !1,
                      e.repoInfo_.namespace,
                      e.repoInfo_.webSocketOnly,
                      e.repoInfo_.nodeAdmin,
                      e.repoInfo_.persistenceKey,
                      e.repoInfo_.includeNamespaceInQueryParams,
                    )),
                      i && (e.authTokenProvider_ = i)
                  })(r, n, t, o)
                }),
                (fo.enableLogging = function (e, n) {
                  P(e, n)
                }),
                (fo.endAt = function (e, n) {
                  return Vi('endAt', 'key', n, !0), new Yr(e, n)
                }),
                (fo.endBefore = function (e, n) {
                  return Vi('endBefore', 'key', n, !0), new Gr(e, n)
                }),
                (fo.equalTo = function (e, n) {
                  return Vi('equalTo', 'key', n, !0), new to(e, n)
                }),
                (fo.get = function (n) {
                  return (function (t, i) {
                    var e = (function (e, n) {
                      const t = n._path
                      let i = null
                      e.syncPointTree_.foreachOnPath(t, (e, n) => {
                        e = Ee(e, t)
                        i = i || Qt(n, e)
                      })
                      let r = e.syncPointTree_.get(t)
                      r
                        ? (i = i || Qt(r, me()))
                        : ((r = new Bt()),
                          (e.syncPointTree_ = e.syncPointTree_.set(t, r)))
                      const o = null != i,
                        a = o ? new Gn(i, !0, !1) : null,
                        s = ft(e.pendingWriteTree_, n._path),
                        l = Vt(r, n, s, o ? a.getNode() : an.EMPTY_NODE, o)
                      return (function (e) {
                        return et(e.viewCache_)
                      })(l)
                    })(t.serverSyncTree_, i)
                    return null == e
                      ? t.server_.get(i).then(
                          (e) => {
                            var n = hn(e).withIndex(i._queryParams.getIndex()),
                              e = oi(t.serverSyncTree_, i._path, n)
                            return (
                              Ji(t.eventQueue_, i._path, e), Promise.resolve(n)
                            )
                          },
                          (e) => (
                            mr(
                              t,
                              'get for query ' +
                                (0, f.stringify)(i) +
                                ' failed: ' +
                                e,
                            ),
                            Promise.reject(new Error(e))
                          ),
                        )
                      : Promise.resolve(e)
                  })((n = (0, f.getModularInstance)(n))._repo, n).then(
                    (e) =>
                      new zr(
                        e,
                        new Lr(n._repo, n._path),
                        n._queryParams.getIndex(),
                      ),
                  )
                }),
                (fo.getDatabase = function (e = (0, t.getApp)(), n) {
                  return (0, t._getProvider)(e, 'database').getImmediate({
                    identifier: n,
                  })
                }),
                (fo.goOffline = function (e) {
                  ;(e = (0, f.getModularInstance)(e))._checkNotDeleted(
                    'goOffline',
                  ),
                    gr(e._repo)
                }),
                (fo.goOnline = function (e) {
                  ;(e = (0, f.getModularInstance)(e))._checkNotDeleted(
                    'goOnline',
                  ),
                    (function (e) {
                      e.persistentConnection_ &&
                        e.persistentConnection_.resume(nr)
                    })(e._repo)
                }),
                (fo.increment = function (e) {
                  return { '.sv': { increment: e } }
                }),
                (fo.limitToFirst = function (e) {
                  if ('number' != typeof e || Math.floor(e) !== e || e <= 0)
                    throw new Error(
                      'limitToFirst: First argument must be a positive integer.',
                    )
                  return new Kr(e)
                }),
                (fo.limitToLast = function (e) {
                  if ('number' != typeof e || Math.floor(e) !== e || e <= 0)
                    throw new Error(
                      'limitToLast: First argument must be a positive integer.',
                    )
                  return new Xr(e)
                }),
                (fo.off = function (e, n, t) {
                  let i = null
                  t = t ? new Nr(t) : null
                  'value' === n ? (i = new Ur(t)) : n && (i = new Wr(n, t))
                  fr(e._repo, e, i)
                }),
                (fo.onChildAdded = function (e, n, t, i) {
                  return Br(e, 'child_added', n, t, i)
                }),
                (fo.onChildChanged = function (e, n, t, i) {
                  return Br(e, 'child_changed', n, t, i)
                }),
                (fo.onChildMoved = function (e, n, t, i) {
                  return Br(e, 'child_moved', n, t, i)
                }),
                (fo.onChildRemoved = function (e, n, t, i) {
                  return Br(e, 'child_removed', n, t, i)
                }),
                (fo.onDisconnect = function (e) {
                  return (
                    (e = (0, f.getModularInstance)(e)), new Rr(e._repo, e._path)
                  )
                }),
                (fo.onValue = Hr),
                (fo.orderByChild = function (e) {
                  {
                    if ('$key' === e)
                      throw new Error(
                        'orderByChild: "$key" is invalid.  Use orderByKey() instead.',
                      )
                    if ('$priority' === e)
                      throw new Error(
                        'orderByChild: "$priority" is invalid.  Use orderByPriority() instead.',
                      )
                    if ('$value' === e)
                      throw new Error(
                        'orderByChild: "$value" is invalid.  Use orderByValue() instead.',
                      )
                  }
                  return Yi('orderByChild', 'path', e, !1), new Jr(e)
                }),
                (fo.orderByKey = function () {
                  return new Zr()
                }),
                (fo.orderByPriority = function () {
                  return new eo()
                }),
                (fo.orderByValue = function () {
                  return new no()
                }),
                (fo.push = function (e, n) {
                  ;(e = (0, f.getModularInstance)(e)),
                    $i('push', e._path),
                    Ui('push', n, e._path, !0)
                  const t = or(e._repo),
                    i = yn(t),
                    r = Fr(e, i),
                    o = Fr(e, i)
                  let a
                  a = null != n ? qr(o, n).then(() => o) : Promise.resolve(o)
                  return (
                    (r.then = a.then.bind(a)),
                    (r.catch = a.then.bind(a, void 0)),
                    r
                  )
                }),
                (fo.query = function (e, ...n) {
                  let t = (0, f.getModularInstance)(e)
                  for (const i of n) t = i._apply(t)
                  return t
                }),
                (fo.ref = jr),
                (fo.refFromURL = function (e, n) {
                  ;(e = (0, f.getModularInstance)(e))._checkNotDeleted(
                    'refFromURL',
                  )
                  const t = Ir(n, e._repo.repoInfo_.nodeAdmin)
                  Qi('refFromURL', t)
                  n = t.repoInfo
                  e._repo.repoInfo_.isCustomHost() ||
                    n.host === e._repo.repoInfo_.host ||
                    R(
                      'refFromURL: Host name does not match the current database: (found ' +
                        n.host +
                        ' but expected ' +
                        e._repo.repoInfo_.host +
                        ')',
                    )
                  return jr(e, t.path.toString())
                }),
                (fo.remove = function (e) {
                  return $i('remove', e._path), qr(e, null)
                }),
                (fo.runTransaction = function (r, e, n) {
                  if (
                    ((r = (0, f.getModularInstance)(r)),
                    $i('Reference.transaction', r._path),
                    '.length' === r.key || '.keys' === r.key)
                  )
                    throw (
                      'Reference.transaction failed: ' +
                      r.key +
                      ' is a read-only object.'
                    )
                  const t =
                      null === (n = null == n ? void 0 : n.applyLocally) ||
                      void 0 === n ||
                      n,
                    o = new f.Deferred(),
                    i = Hr(r, () => {})
                  return (
                    (function (n, t, e, i, r, o) {
                      mr(n, 'transaction on ' + t)
                      const a = {
                          path: t,
                          update: e,
                          onComplete: i,
                          status: null,
                          order: y(),
                          applyLocally: o,
                          retryCount: 0,
                          unwatcher: r,
                          abortReason: null,
                          currentWriteId: null,
                          currentInputSnapshot: null,
                          currentOutputSnapshotRaw: null,
                          currentOutputSnapshotResolved: null,
                        },
                        s = _r(n, t, void 0)
                      a.currentInputSnapshot = s
                      o = a.update(s.val())
                      if (void 0 === o)
                        a.unwatcher(),
                          (a.currentOutputSnapshotRaw = null),
                          (a.currentOutputSnapshotResolved = null),
                          a.onComplete &&
                            a.onComplete(null, !1, a.currentInputSnapshot)
                      else {
                        Wi('transaction failed: Data returned ', o, a.path),
                          (a.status = 0)
                        r = Si(n.transactionQueueTree_, t)
                        const l = Pi(r) || []
                        l.push(a), Ni(r, l)
                        let e
                        if (
                          'object' == typeof o &&
                          null !== o &&
                          (0, f.contains)(o, '.priority')
                        )
                          (e = (0, f.safeGet)(o, '.priority')),
                            (0, f.assert)(
                              qi(e),
                              'Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.',
                            )
                        else {
                          const c = li(n.serverSyncTree_, t) || an.EMPTY_NODE
                          e = c.getPriority().val()
                        }
                        ;(r = ar(n)), (o = hn(o, e)), (r = Ei(o, s, r))
                        ;(a.currentOutputSnapshotRaw = o),
                          (a.currentOutputSnapshotResolved = r),
                          (a.currentWriteId = hr(n))
                        r = ii(
                          n.serverSyncTree_,
                          t,
                          r,
                          a.currentWriteId,
                          a.applyLocally,
                        )
                        Zi(n.eventQueue_, t, r), yr(n, n.transactionQueueTree_)
                      }
                    })(
                      r._repo,
                      r._path,
                      e,
                      (e, n, t) => {
                        var i
                        e
                          ? o.reject(e)
                          : ((i = new zr(t, new Lr(r._repo, r._path), Xe)),
                            o.resolve(new co(n, i)))
                      },
                      i,
                      t,
                    ),
                    o.promise
                  )
                }),
                (fo.serverTimestamp = function () {
                  return lo
                }),
                (fo.set = qr),
                (fo.setPriority = function (e, n) {
                  ;(e = (0, f.getModularInstance)(e)),
                    $i('setPriority', e._path),
                    Hi('setPriority', n, !1)
                  const t = new f.Deferred()
                  return (
                    dr(
                      e._repo,
                      ke(e._path, '.priority'),
                      n,
                      null,
                      t.wrapCallback(() => {}),
                    ),
                    t.promise
                  )
                }),
                (fo.setWithPriority = function (e, n, t) {
                  if (
                    ($i('setWithPriority', e._path),
                    Ui('setWithPriority', n, e._path, !1),
                    Hi('setWithPriority', t, !1),
                    '.length' === e.key || '.keys' === e.key)
                  )
                    throw (
                      'setWithPriority failed: ' +
                      e.key +
                      ' is a read-only object.'
                    )
                  const i = new f.Deferred()
                  return (
                    dr(
                      e._repo,
                      e._path,
                      n,
                      t,
                      i.wrapCallback(() => {}),
                    ),
                    i.promise
                  )
                }),
                (fo.startAfter = function (e, n) {
                  return Vi('startAfter', 'key', n, !0), new Qr(e, n)
                }),
                (fo.startAt = function (e = null, n) {
                  return Vi('startAt', 'key', n, !0), new $r(e, n)
                }),
                (fo.update = function (e, n) {
                  Bi('update', n, e._path, !1)
                  const t = new f.Deferred()
                  return (
                    (function (r, o, e, a) {
                      mr(r, 'update', { path: o.toString(), value: e })
                      let t = !0
                      const i = ar(r),
                        s = {}
                      if (
                        (z(e, (e, n) => {
                          ;(t = !1),
                            (s[e] = Ci(ke(o, e), hn(n), r.serverSyncTree_, i))
                        }),
                        t)
                      )
                        N(
                          "update() called with empty data.  Don't do anything.",
                        ),
                          br(0, a, 'ok', void 0)
                      else {
                        const l = hr(r)
                        var n = (function (e, n, t, i) {
                          !(function (e, n, t, i) {
                            ;(0, f.assert)(
                              i > e.lastWriteId,
                              'Stacking an older merge on top of newer ones',
                            ),
                              e.allWrites.push({
                                path: n,
                                children: t,
                                writeId: i,
                                visible: !0,
                              }),
                              (e.visibleWrites = at(e.visibleWrites, n, t)),
                              (e.lastWriteId = i)
                          })(e.pendingWriteTree_, n, t, i)
                          t = it.fromObject(t)
                          return ci(e, new Yn(qn(), n, t))
                        })(r.serverSyncTree_, o, s, l)
                        Xi(r.eventQueue_, n),
                          r.server_.merge(o.toString(), e, (e, n) => {
                            var t = 'ok' === e
                            t || O('update at ' + o + ' failed: ' + e)
                            var i = ri(r.serverSyncTree_, l, !t),
                              t = 0 < i.length ? vr(r, o) : o
                            Zi(r.eventQueue_, t, i), br(0, a, e, n)
                          }),
                          z(e, (e) => {
                            e = Cr(r, ke(o, e))
                            vr(r, e)
                          }),
                          Zi(r.eventQueue_, o, [])
                      }
                    })(
                      e._repo,
                      e._path,
                      n,
                      t.wrapCallback(() => {}),
                    ),
                    t.promise
                  )
                })
              var t = po('@firebase/app'),
                e = po('@firebase/component'),
                f = po('@firebase/util'),
                i = po('@firebase/logger')
              const n = '@firebase/database'
              let s = ''
              function r(e) {
                s = e
              }
              class o {
                constructor(e) {
                  ;(this.domStorage_ = e), (this.prefix_ = 'firebase:')
                }
                set(e, n) {
                  null == n
                    ? this.domStorage_.removeItem(this.prefixedName_(e))
                    : this.domStorage_.setItem(
                        this.prefixedName_(e),
                        (0, f.stringify)(n),
                      )
                }
                get(e) {
                  e = this.domStorage_.getItem(this.prefixedName_(e))
                  return null == e ? null : (0, f.jsonEval)(e)
                }
                remove(e) {
                  this.domStorage_.removeItem(this.prefixedName_(e))
                }
                prefixedName_(e) {
                  return this.prefix_ + e
                }
                toString() {
                  return this.domStorage_.toString()
                }
              }
              class a {
                constructor() {
                  ;(this.cache_ = {}), (this.isInMemoryStorage = !0)
                }
                set(e, n) {
                  null == n ? delete this.cache_[e] : (this.cache_[e] = n)
                }
                get(e) {
                  return (0, f.contains)(this.cache_, e) ? this.cache_[e] : null
                }
                remove(e) {
                  delete this.cache_[e]
                }
              }
              var l,
                c,
                h,
                d,
                u,
                p = function (e) {
                  try {
                    if ('undefined' != typeof window && void 0 !== window[e]) {
                      const n = window[e]
                      return (
                        n.setItem('firebase:sentinel', 'cache'),
                        n.removeItem('firebase:sentinel'),
                        new o(n)
                      )
                    }
                  } catch (e) {}
                  return new a()
                }
              function g(e) {
                e = (0, f.stringToByteArray)(e)
                const n = new f.Sha1()
                return (
                  n.update(e), (e = n.digest()), f.base64.encodeByteArray(e)
                )
              }
              const m = p('localStorage'),
                b = p('sessionStorage'),
                _ = new i.Logger('@firebase/database'),
                y = (function () {
                  let e = 1
                  return function () {
                    return e++
                  }
                })(),
                v = function (...n) {
                  let t = ''
                  for (let e = 0; e < n.length; e++) {
                    var i = n[e]
                    Array.isArray(i) ||
                    (i && 'object' == typeof i && 'number' == typeof i.length)
                      ? (t += v.apply(null, i))
                      : (t += 'object' == typeof i ? (0, f.stringify)(i) : i),
                      (t += ' ')
                  }
                  return t
                }
              let w = null,
                x = !0
              function k(n) {
                return function (...e) {
                  N(n, ...e)
                }
              }
              function C(...e) {
                ;(e = 'FIREBASE INTERNAL ERROR: ' + v(...e)), _.error(e)
              }
              function E(e, n) {
                return e === n ? 0 : e < n ? -1 : 1
              }
              function I(e, n) {
                if (n && e in n) return n[e]
                throw new Error(
                  'Missing required key (' +
                    e +
                    ') in object: ' +
                    (0, f.stringify)(n),
                )
              }
              function T(n) {
                if ('object' != typeof n || null === n)
                  return (0, f.stringify)(n)
                const t = []
                for (const e in n) t.push(e)
                t.sort()
                let i = '{'
                for (let e = 0; e < t.length; e++)
                  0 !== e && (i += ','),
                    (i += (0, f.stringify)(t[e])),
                    (i += ':'),
                    (i += T(n[t[e]]))
                return (i += '}'), i
              }
              function S(n, t) {
                var i = n.length
                if (i <= t) return [n]
                const r = []
                for (let e = 0; e < i; e += t)
                  e + t > i
                    ? r.push(n.substring(e, i))
                    : r.push(n.substring(e, e + t))
                return r
              }
              const P = function (e, n) {
                  ;(0, f.assert)(
                    !n || !0 === e || !1 === e,
                    "Can't turn on custom loggers persistently.",
                  ),
                    !0 === e
                      ? ((_.logLevel = i.LogLevel.VERBOSE),
                        (w = _.log.bind(_)),
                        n && b.set('logging_enabled', !0))
                      : 'function' == typeof e
                      ? (w = e)
                      : ((w = null), b.remove('logging_enabled'))
                },
                N = function (...e) {
                  !0 === x &&
                    ((x = !1),
                    null === w && !0 === b.get('logging_enabled') && P(!0)),
                    w && ((e = v.apply(null, e)), w(e))
                },
                R = function (...e) {
                  e = `FIREBASE FATAL ERROR: ${v(...e)}`
                  throw (_.error(e), new Error(e))
                },
                O = function (...e) {
                  e = 'FIREBASE WARNING: ' + v(...e)
                  _.warn(e)
                },
                D = function (e) {
                  return (
                    'number' == typeof e &&
                    (e != e ||
                      e === Number.POSITIVE_INFINITY ||
                      e === Number.NEGATIVE_INFINITY)
                  )
                },
                A = '[MIN_NAME]',
                M = '[MAX_NAME]',
                L = function (e, n) {
                  if (e === n) return 0
                  if (e === A || n === M) return -1
                  if (n === A || e === M) return 1
                  var t = B(e),
                    i = B(n)
                  return null !== t
                    ? null !== i
                      ? t - i == 0
                        ? e.length - n.length
                        : t - i
                      : -1
                    : null === i && e < n
                    ? -1
                    : 1
                }
              function z(e, n) {
                for (const t in e) e.hasOwnProperty(t) && n(t, e[t])
              }
              function j(e) {
                ;(0, f.assert)(!D(e), 'Invalid JSON number')
                let n, t, i, r, o
                0 === e
                  ? ((t = 0), (i = 0), (n = 1 / e == -1 / 0 ? 1 : 0))
                  : ((n = e < 0),
                    (e = Math.abs(e)),
                    (i =
                      e >= Math.pow(2, -1022)
                        ? ((r = Math.min(
                            Math.floor(Math.log(e) / Math.LN2),
                            1023,
                          )),
                          (t = r + 1023),
                          Math.round(e * Math.pow(2, 52 - r) - Math.pow(2, 52)))
                        : ((t = 0), Math.round(e / Math.pow(2, -1074)))))
                const a = []
                for (o = 52; o; --o)
                  a.push(i % 2 ? 1 : 0), (i = Math.floor(i / 2))
                for (o = 11; o; --o)
                  a.push(t % 2 ? 1 : 0), (t = Math.floor(t / 2))
                a.push(n ? 1 : 0), a.reverse()
                const s = a.join('')
                let l = ''
                for (o = 0; o < 64; o += 8) {
                  let e = parseInt(s.substr(o, 8), 2).toString(16)
                  1 === e.length && (e = '0' + e), (l += e)
                }
                return l.toLowerCase()
              }
              function F(e, n) {
                const t = setTimeout(e, n)
                return 'object' == typeof t && t.unref && t.unref(), t
              }
              const q = new RegExp('^-?(0*)\\d{1,10}$'),
                U = -2147483648,
                W = 2147483647,
                B = function (e) {
                  if (q.test(e)) {
                    e = Number(e)
                    if (e >= U && e <= W) return e
                  }
                  return null
                },
                H = function (e) {
                  try {
                    e()
                  } catch (n) {
                    setTimeout(() => {
                      var e = n.stack || ''
                      throw (O('Exception was thrown by user callback.', e), n)
                    }, Math.floor(0))
                  }
                }
              class V {
                constructor(e, n) {
                  ;(this.appName_ = e),
                    (this.appCheckProvider = n),
                    (this.appCheck =
                      null == n ? void 0 : n.getImmediate({ optional: !0 })),
                    this.appCheck ||
                      (null != n && n.get().then((e) => (this.appCheck = e)))
                }
                getToken(t) {
                  return this.appCheck
                    ? this.appCheck.getToken(t)
                    : new Promise((e, n) => {
                        setTimeout(() => {
                          this.appCheck ? this.getToken(t).then(e, n) : e(null)
                        }, 0)
                      })
                }
                addTokenChangeListener(n) {
                  var e
                  null !== (e = this.appCheckProvider) &&
                    void 0 !== e &&
                    e.get().then((e) => e.addTokenListener(n))
                }
                notifyForInvalidToken() {
                  O(
                    `Provided AppCheck credentials for the app named "${this.appName_}" ` +
                      'are invalid. This usually indicates your app was not initialized correctly.',
                  )
                }
              }
              class Y {
                constructor(e, n, t) {
                  ;(this.appName_ = e),
                    (this.firebaseOptions_ = n),
                    (this.authProvider_ = t),
                    (this.auth_ = null),
                    (this.auth_ = t.getImmediate({ optional: !0 })),
                    this.auth_ || t.onInit((e) => (this.auth_ = e))
                }
                getToken(t) {
                  return this.auth_
                    ? this.auth_
                        .getToken(t)
                        .catch((e) =>
                          e && 'auth/token-not-initialized' === e.code
                            ? (N(
                                'Got auth/token-not-initialized error.  Treating as null token.',
                              ),
                              null)
                            : Promise.reject(e),
                        )
                    : new Promise((e, n) => {
                        setTimeout(() => {
                          this.auth_ ? this.getToken(t).then(e, n) : e(null)
                        }, 0)
                      })
                }
                addTokenChangeListener(n) {
                  this.auth_
                    ? this.auth_.addAuthTokenListener(n)
                    : this.authProvider_
                        .get()
                        .then((e) => e.addAuthTokenListener(n))
                }
                removeTokenChangeListener(n) {
                  this.authProvider_
                    .get()
                    .then((e) => e.removeAuthTokenListener(n))
                }
                notifyForInvalidToken() {
                  let e =
                    'Provided authentication credentials for the app named "' +
                    this.appName_ +
                    '" are invalid. This usually indicates your app was not initialized correctly. '
                  'credential' in this.firebaseOptions_
                    ? (e +=
                        'Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.')
                    : 'serviceAccount' in this.firebaseOptions_
                    ? (e +=
                        'Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.')
                    : (e +=
                        'Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.'),
                    O(e)
                }
              }
              class G {
                constructor(e) {
                  this.accessToken = e
                }
                getToken(e) {
                  return Promise.resolve({ accessToken: this.accessToken })
                }
                addTokenChangeListener(e) {
                  e(this.accessToken)
                }
                removeTokenChangeListener(e) {}
                notifyForInvalidToken() {}
              }
              G.OWNER = 'owner'
              const $ = /(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,
                Q = 'websocket',
                K = 'long_polling'
              class X {
                constructor(e, n, t, i, r = !1, o = '', a = !1) {
                  ;(this.secure = n),
                    (this.namespace = t),
                    (this.webSocketOnly = i),
                    (this.nodeAdmin = r),
                    (this.persistenceKey = o),
                    (this.includeNamespaceInQueryParams = a),
                    (this._host = e.toLowerCase()),
                    (this._domain = this._host.substr(
                      this._host.indexOf('.') + 1,
                    )),
                    (this.internalHost = m.get('host:' + e) || this._host)
                }
                isCacheableHost() {
                  return 's-' === this.internalHost.substr(0, 2)
                }
                isCustomHost() {
                  return (
                    'firebaseio.com' !== this._domain &&
                    'firebaseio-demo.com' !== this._domain
                  )
                }
                get host() {
                  return this._host
                }
                set host(e) {
                  e !== this.internalHost &&
                    ((this.internalHost = e),
                    this.isCacheableHost() &&
                      m.set('host:' + this._host, this.internalHost))
                }
                toString() {
                  let e = this.toURLString()
                  return (
                    this.persistenceKey &&
                      (e += '<' + this.persistenceKey + '>'),
                    e
                  )
                }
                toURLString() {
                  var e = this.secure ? 'https://' : 'http://',
                    n = this.includeNamespaceInQueryParams
                      ? `?ns=${this.namespace}`
                      : ''
                  return `${e}${this.host}/${n}`
                }
              }
              function J(e, n, t) {
                ;(0, f.assert)(
                  'string' == typeof n,
                  'typeof type must == string',
                ),
                  (0, f.assert)(
                    'object' == typeof t,
                    'typeof params must == object',
                  )
                let i
                if (n === Q)
                  i = (e.secure ? 'wss://' : 'ws://') + e.internalHost + '/.ws?'
                else {
                  if (n !== K) throw new Error('Unknown connection type: ' + n)
                  i =
                    (e.secure ? 'https://' : 'http://') +
                    e.internalHost +
                    '/.lp?'
                }
                ;((n = e).host !== n.internalHost ||
                  n.isCustomHost() ||
                  n.includeNamespaceInQueryParams) &&
                  (t.ns = e.namespace)
                const r = []
                return (
                  z(t, (e, n) => {
                    r.push(e + '=' + n)
                  }),
                  i + r.join('&')
                )
              }
              class Z {
                constructor() {
                  this.counters_ = {}
                }
                incrementCounter(e, n = 1) {
                  ;(0, f.contains)(this.counters_, e) ||
                    (this.counters_[e] = 0),
                    (this.counters_[e] += n)
                }
                get() {
                  return (0, f.deepCopy)(this.counters_)
                }
              }
              const ee = {},
                ne = {}
              function te(e) {
                e = e.toString()
                return ee[e] || (ee[e] = new Z()), ee[e]
              }
              class ie {
                constructor(e) {
                  ;(this.onMessage_ = e),
                    (this.pendingResponses = []),
                    (this.currentResponseNum = 0),
                    (this.closeAfterResponse = -1),
                    (this.onClose = null)
                }
                closeAfter(e, n) {
                  ;(this.closeAfterResponse = e),
                    (this.onClose = n),
                    this.closeAfterResponse < this.currentResponseNum &&
                      (this.onClose(), (this.onClose = null))
                }
                handleResponse(e, n) {
                  for (
                    this.pendingResponses[e] = n;
                    this.pendingResponses[this.currentResponseNum];

                  ) {
                    const t = this.pendingResponses[this.currentResponseNum]
                    delete this.pendingResponses[this.currentResponseNum]
                    for (let e = 0; e < t.length; ++e)
                      t[e] &&
                        H(() => {
                          this.onMessage_(t[e])
                        })
                    if (this.currentResponseNum === this.closeAfterResponse) {
                      this.onClose && (this.onClose(), (this.onClose = null))
                      break
                    }
                    this.currentResponseNum++
                  }
                }
              }
              class re {
                constructor(e, n, t, i, r, o, a) {
                  ;(this.connId = e),
                    (this.repoInfo = n),
                    (this.applicationId = t),
                    (this.appCheckToken = i),
                    (this.authToken = r),
                    (this.transportSessionId = o),
                    (this.lastSessionId = a),
                    (this.bytesSent = 0),
                    (this.bytesReceived = 0),
                    (this.everConnected_ = !1),
                    (this.log_ = k(e)),
                    (this.stats_ = te(n)),
                    (this.urlFn = (e) => (
                      this.appCheckToken && (e.ac = this.appCheckToken),
                      J(n, K, e)
                    ))
                }
                open(e, n) {
                  ;(this.curSegmentNum = 0),
                    (this.onDisconnect_ = n),
                    (this.myPacketOrderer = new ie(e)),
                    (this.isClosed_ = !1),
                    (this.connectTimeoutTimer_ = setTimeout(() => {
                      this.log_('Timed out trying to connect.'),
                        this.onClosed_(),
                        (this.connectTimeoutTimer_ = null)
                    }, Math.floor(3e4))),
                    (function (n) {
                      if (
                        (0, f.isNodeSdk)() ||
                        'complete' === document.readyState
                      )
                        n()
                      else {
                        let e = !1
                        const t = function () {
                          document.body
                            ? e || ((e = !0), n())
                            : setTimeout(t, Math.floor(10))
                        }
                        document.addEventListener
                          ? (document.addEventListener(
                              'DOMContentLoaded',
                              t,
                              !1,
                            ),
                            window.addEventListener('load', t, !1))
                          : document.attachEvent &&
                            (document.attachEvent('onreadystatechange', () => {
                              'complete' === document.readyState && t()
                            }),
                            window.attachEvent('onload', t))
                      }
                    })(() => {
                      if (!this.isClosed_) {
                        this.scriptTagHolder = new oe(
                          (...e) => {
                            var [n, t, i] = e
                            if (
                              (this.incrementIncomingBytes_(e),
                              this.scriptTagHolder)
                            )
                              if (
                                (this.connectTimeoutTimer_ &&
                                  (clearTimeout(this.connectTimeoutTimer_),
                                  (this.connectTimeoutTimer_ = null)),
                                (this.everConnected_ = !0),
                                'start' === n)
                              )
                                (this.id = t), (this.password = i)
                              else {
                                if ('close' !== n)
                                  throw new Error(
                                    'Unrecognized command received: ' + n,
                                  )
                                t
                                  ? ((this.scriptTagHolder.sendNewPolls = !1),
                                    this.myPacketOrderer.closeAfter(t, () => {
                                      this.onClosed_()
                                    }))
                                  : this.onClosed_()
                              }
                          },
                          (...e) => {
                            var [n, t] = e
                            this.incrementIncomingBytes_(e),
                              this.myPacketOrderer.handleResponse(n, t)
                          },
                          () => {
                            this.onClosed_()
                          },
                          this.urlFn,
                        )
                        const n = { start: 't' }
                        ;(n.ser = Math.floor(1e8 * Math.random())),
                          this.scriptTagHolder.uniqueCallbackIdentifier &&
                            (n.cb = this.scriptTagHolder.uniqueCallbackIdentifier),
                          (n.v = '5'),
                          this.transportSessionId &&
                            (n.s = this.transportSessionId),
                          this.lastSessionId && (n.ls = this.lastSessionId),
                          this.applicationId && (n.p = this.applicationId),
                          this.appCheckToken && (n.ac = this.appCheckToken),
                          'undefined' != typeof location &&
                            location.hostname &&
                            $.test(location.hostname) &&
                            (n.r = 'f')
                        var e = this.urlFn(n)
                        this.log_('Connecting via long-poll to ' + e),
                          this.scriptTagHolder.addTag(e, () => {})
                      }
                    })
                }
                start() {
                  this.scriptTagHolder.startLongPoll(this.id, this.password),
                    this.addDisconnectPingFrame(this.id, this.password)
                }
                static forceAllow() {
                  re.forceAllow_ = !0
                }
                static forceDisallow() {
                  re.forceDisallow_ = !0
                }
                static isAvailable() {
                  return (
                    !(0, f.isNodeSdk)() &&
                    (!!re.forceAllow_ ||
                      !(
                        re.forceDisallow_ ||
                        'undefined' == typeof document ||
                        null == document.createElement ||
                        ('object' == typeof window &&
                          window.chrome &&
                          window.chrome.extension &&
                          !/^chrome/.test(window.location.href)) ||
                        ('object' == typeof Windows &&
                          'object' == typeof Windows.UI)
                      ))
                  )
                }
                markConnectionHealthy() {}
                shutdown_() {
                  ;(this.isClosed_ = !0),
                    this.scriptTagHolder &&
                      (this.scriptTagHolder.close(),
                      (this.scriptTagHolder = null)),
                    this.myDisconnFrame &&
                      (document.body.removeChild(this.myDisconnFrame),
                      (this.myDisconnFrame = null)),
                    this.connectTimeoutTimer_ &&
                      (clearTimeout(this.connectTimeoutTimer_),
                      (this.connectTimeoutTimer_ = null))
                }
                onClosed_() {
                  this.isClosed_ ||
                    (this.log_('Longpoll is closing itself'),
                    this.shutdown_(),
                    this.onDisconnect_ &&
                      (this.onDisconnect_(this.everConnected_),
                      (this.onDisconnect_ = null)))
                }
                close() {
                  this.isClosed_ ||
                    (this.log_('Longpoll is being closed.'), this.shutdown_())
                }
                send(e) {
                  e = (0, f.stringify)(e)
                  ;(this.bytesSent += e.length),
                    this.stats_.incrementCounter('bytes_sent', e.length)
                  var e = (0, f.base64Encode)(e),
                    n = S(e, 1840)
                  for (let e = 0; e < n.length; e++)
                    this.scriptTagHolder.enqueueSegment(
                      this.curSegmentNum,
                      n.length,
                      n[e],
                    ),
                      this.curSegmentNum++
                }
                addDisconnectPingFrame(e, n) {
                  if (!(0, f.isNodeSdk)()) {
                    this.myDisconnFrame = document.createElement('iframe')
                    const t = { dframe: 't' }
                    ;(t.id = e),
                      (t.pw = n),
                      (this.myDisconnFrame.src = this.urlFn(t)),
                      (this.myDisconnFrame.style.display = 'none'),
                      document.body.appendChild(this.myDisconnFrame)
                  }
                }
                incrementIncomingBytes_(e) {
                  e = (0, f.stringify)(e).length
                  ;(this.bytesReceived += e),
                    this.stats_.incrementCounter('bytes_received', e)
                }
              }
              class oe {
                constructor(n, t, e, i) {
                  if (
                    ((this.onDisconnect = e),
                    (this.urlFn = i),
                    (this.outstandingRequests = new Set()),
                    (this.pendingSegs = []),
                    (this.currentSerial = Math.floor(1e8 * Math.random())),
                    (this.sendNewPolls = !0),
                    (0, f.isNodeSdk)())
                  )
                    (this.commandCB = n), (this.onMessageCB = t)
                  else {
                    ;(this.uniqueCallbackIdentifier = y()),
                      (window[
                        'pLPCommand' + this.uniqueCallbackIdentifier
                      ] = n),
                      (window['pRTLPCB' + this.uniqueCallbackIdentifier] = t),
                      (this.myIFrame = oe.createIFrame_())
                    let e = ''
                    this.myIFrame.src &&
                      'javascript:' ===
                        this.myIFrame.src.substr(0, 'javascript:'.length) &&
                      ((r = document.domain),
                      (e = '<script>document.domain="' + r + '";</script>'))
                    var r = '<html><body>' + e + '</body></html>'
                    try {
                      this.myIFrame.doc.open(),
                        this.myIFrame.doc.write(r),
                        this.myIFrame.doc.close()
                    } catch (e) {
                      N('frame writing exception'), e.stack && N(e.stack), N(e)
                    }
                  }
                }
                static createIFrame_() {
                  const n = document.createElement('iframe')
                  if (((n.style.display = 'none'), !document.body))
                    throw 'Document body has not initialized. Wait to initialize Firebase until after the document is ready.'
                  document.body.appendChild(n)
                  try {
                    n.contentWindow.document ||
                      N('No IE domain setting required')
                  } catch (e) {
                    var t = document.domain
                    n.src =
                      "javascript:void((function(){document.open();document.domain='" +
                      t +
                      "';document.close();})())"
                  }
                  return (
                    n.contentDocument
                      ? (n.doc = n.contentDocument)
                      : n.contentWindow
                      ? (n.doc = n.contentWindow.document)
                      : n.document && (n.doc = n.document),
                    n
                  )
                }
                close() {
                  ;(this.alive = !1),
                    this.myIFrame &&
                      ((this.myIFrame.doc.body.innerHTML = ''),
                      setTimeout(() => {
                        null !== this.myIFrame &&
                          (document.body.removeChild(this.myIFrame),
                          (this.myIFrame = null))
                      }, Math.floor(0)))
                  const e = this.onDisconnect
                  e && ((this.onDisconnect = null), e())
                }
                startLongPoll(e, n) {
                  for (
                    this.myID = e, this.myPW = n, this.alive = !0;
                    this.newRequest_();

                  );
                }
                newRequest_() {
                  if (
                    this.alive &&
                    this.sendNewPolls &&
                    this.outstandingRequests.size <
                      (0 < this.pendingSegs.length ? 2 : 1)
                  ) {
                    this.currentSerial++
                    const r = {}
                    ;(r.id = this.myID),
                      (r.pw = this.myPW),
                      (r.ser = this.currentSerial)
                    var t = this.urlFn(r)
                    let e = '',
                      n = 0
                    for (; 0 < this.pendingSegs.length; ) {
                      if (
                        !(this.pendingSegs[0].d.length + 30 + e.length <= 1870)
                      )
                        break
                      var i = this.pendingSegs.shift()
                      ;(e =
                        e +
                        '&seg' +
                        n +
                        '=' +
                        i.seg +
                        '&ts' +
                        n +
                        '=' +
                        i.ts +
                        '&d' +
                        n +
                        '=' +
                        i.d),
                        n++
                    }
                    return (
                      (t += e), this.addLongPollTag_(t, this.currentSerial), !0
                    )
                  }
                  return !1
                }
                enqueueSegment(e, n, t) {
                  this.pendingSegs.push({ seg: e, ts: n, d: t }),
                    this.alive && this.newRequest_()
                }
                addLongPollTag_(e, n) {
                  this.outstandingRequests.add(n)
                  const t = () => {
                      this.outstandingRequests.delete(n), this.newRequest_()
                    },
                    i = setTimeout(t, Math.floor(25e3))
                  this.addTag(e, () => {
                    clearTimeout(i), t()
                  })
                }
                addTag(e, t) {
                  ;(0, f.isNodeSdk)()
                    ? this.doNodeLongPoll(e, t)
                    : setTimeout(() => {
                        try {
                          if (!this.sendNewPolls) return
                          const n = this.myIFrame.doc.createElement('script')
                          ;(n.type = 'text/javascript'),
                            (n.async = !0),
                            (n.src = e),
                            (n.onload = n.onreadystatechange = function () {
                              var e = n.readyState
                              ;(e && 'loaded' !== e && 'complete' !== e) ||
                                ((n.onload = n.onreadystatechange = null),
                                n.parentNode && n.parentNode.removeChild(n),
                                t())
                            }),
                            (n.onerror = () => {
                              N('Long-poll script failed to load: ' + e),
                                (this.sendNewPolls = !1),
                                this.close()
                            }),
                            this.myIFrame.doc.body.appendChild(n)
                        } catch (e) {}
                      }, Math.floor(1))
                }
              }
              let ae = null
              'undefined' != typeof MozWebSocket
                ? (ae = MozWebSocket)
                : 'undefined' != typeof WebSocket && (ae = WebSocket)
              class se {
                constructor(e, n, t, i, r, o, a) {
                  ;(this.connId = e),
                    (this.applicationId = t),
                    (this.appCheckToken = i),
                    (this.authToken = r),
                    (this.keepaliveTimer = null),
                    (this.frames = null),
                    (this.totalFrames = 0),
                    (this.bytesSent = 0),
                    (this.bytesReceived = 0),
                    (this.log_ = k(this.connId)),
                    (this.stats_ = te(n)),
                    (this.connURL = se.connectionURL_(n, o, a, i)),
                    (this.nodeAdmin = n.nodeAdmin)
                }
                static connectionURL_(e, n, t, i) {
                  const r = { v: '5' }
                  return (
                    !(0, f.isNodeSdk)() &&
                      'undefined' != typeof location &&
                      location.hostname &&
                      $.test(location.hostname) &&
                      (r.r = 'f'),
                    n && (r.s = n),
                    t && (r.ls = t),
                    i && (r.ac = i),
                    J(e, Q, r)
                  )
                }
                open(e, n) {
                  ;(this.onDisconnect = n),
                    (this.onMessage = e),
                    this.log_('Websocket connecting to ' + this.connURL),
                    (this.everConnected_ = !1),
                    m.set('previous_websocket_failure', !0)
                  try {
                    if ((0, f.isNodeSdk)()) {
                      var t = this.nodeAdmin ? 'AdminNode' : 'Node'
                      const a = {
                        headers: {
                          'User-Agent': `Firebase/5/${s}/${uo.platform}/${t}`,
                          'X-Firebase-GMPID': this.applicationId || '',
                        },
                      }
                      this.authToken &&
                        (a.headers.Authorization = `Bearer ${this.authToken}`),
                        this.appCheckToken &&
                          (a.headers[
                            'X-Firebase-AppCheck'
                          ] = this.appCheckToken)
                      var i = uo.env,
                        r =
                          0 === this.connURL.indexOf('wss://')
                            ? i.HTTPS_PROXY || i.https_proxy
                            : i.HTTP_PROXY || i.http_proxy
                      r && (a.proxy = { origin: r }),
                        (this.mySock = new ae(this.connURL, [], a))
                    } else {
                      var o = {
                        headers: {
                          'X-Firebase-GMPID': this.applicationId || '',
                          'X-Firebase-AppCheck': this.appCheckToken || '',
                        },
                      }
                      this.mySock = new ae(this.connURL, [], o)
                    }
                  } catch (e) {
                    this.log_('Error instantiating WebSocket.')
                    o = e.message || e.data
                    return o && this.log_(o), void this.onClosed_()
                  }
                  ;(this.mySock.onopen = () => {
                    this.log_('Websocket connected.'),
                      (this.everConnected_ = !0)
                  }),
                    (this.mySock.onclose = () => {
                      this.log_('Websocket connection was disconnected.'),
                        (this.mySock = null),
                        this.onClosed_()
                    }),
                    (this.mySock.onmessage = (e) => {
                      this.handleIncomingFrame(e)
                    }),
                    (this.mySock.onerror = (e) => {
                      this.log_('WebSocket error.  Closing connection.')
                      e = e.message || e.data
                      e && this.log_(e), this.onClosed_()
                    })
                }
                start() {}
                static forceDisallow() {
                  se.forceDisallow_ = !0
                }
                static isAvailable() {
                  let e = !1
                  var n
                  return (
                    'undefined' == typeof navigator ||
                      !navigator.userAgent ||
                      ((n = navigator.userAgent.match(
                        /Android ([0-9]{0,}\.[0-9]{0,})/,
                      )) &&
                        1 < n.length &&
                        parseFloat(n[1]) < 4.4 &&
                        (e = !0)),
                    !e && null !== ae && !se.forceDisallow_
                  )
                }
                static previouslyFailed() {
                  return (
                    m.isInMemoryStorage ||
                    !0 === m.get('previous_websocket_failure')
                  )
                }
                markConnectionHealthy() {
                  m.remove('previous_websocket_failure')
                }
                appendFrame_(e) {
                  this.frames.push(e),
                    this.frames.length === this.totalFrames &&
                      ((e = this.frames.join('')),
                      (e = ((this.frames = null), f.jsonEval)(e)),
                      this.onMessage(e))
                }
                handleNewFrameCount_(e) {
                  ;(this.totalFrames = e), (this.frames = [])
                }
                extractFrameCount_(e) {
                  if (
                    ((0, f.assert)(
                      null === this.frames,
                      'We already have a frame buffer',
                    ),
                    e.length <= 6)
                  ) {
                    var n = Number(e)
                    if (!isNaN(n)) return this.handleNewFrameCount_(n), null
                  }
                  return this.handleNewFrameCount_(1), e
                }
                handleIncomingFrame(e) {
                  null !== this.mySock &&
                    ((e = e.data),
                    (this.bytesReceived += e.length),
                    this.stats_.incrementCounter('bytes_received', e.length),
                    this.resetKeepAlive(),
                    null !== this.frames
                      ? this.appendFrame_(e)
                      : null !== (e = this.extractFrameCount_(e)) &&
                        this.appendFrame_(e))
                }
                send(e) {
                  this.resetKeepAlive()
                  e = (0, f.stringify)(e)
                  ;(this.bytesSent += e.length),
                    this.stats_.incrementCounter('bytes_sent', e.length)
                  var n = S(e, 16384)
                  1 < n.length && this.sendString_(String(n.length))
                  for (let e = 0; e < n.length; e++) this.sendString_(n[e])
                }
                shutdown_() {
                  ;(this.isClosed_ = !0),
                    this.keepaliveTimer &&
                      (clearInterval(this.keepaliveTimer),
                      (this.keepaliveTimer = null)),
                    this.mySock && (this.mySock.close(), (this.mySock = null))
                }
                onClosed_() {
                  this.isClosed_ ||
                    (this.log_('WebSocket is closing itself'),
                    this.shutdown_(),
                    this.onDisconnect &&
                      (this.onDisconnect(this.everConnected_),
                      (this.onDisconnect = null)))
                }
                close() {
                  this.isClosed_ ||
                    (this.log_('WebSocket is being closed'), this.shutdown_())
                }
                resetKeepAlive() {
                  clearInterval(this.keepaliveTimer),
                    (this.keepaliveTimer = setInterval(() => {
                      this.mySock && this.sendString_('0'),
                        this.resetKeepAlive()
                    }, Math.floor(45e3)))
                }
                sendString_(e) {
                  try {
                    this.mySock.send(e)
                  } catch (e) {
                    this.log_(
                      'Exception thrown from WebSocket.send():',
                      e.message || e.data,
                      'Closing connection.',
                    ),
                      setTimeout(this.onClosed_.bind(this), 0)
                  }
                }
              }
              ;(se.responsesRequiredToBeHealthy = 2), (se.healthyTimeout = 3e4)
              class le {
                constructor(e) {
                  this.initTransports_(e)
                }
                static get ALL_TRANSPORTS() {
                  return [re, se]
                }
                initTransports_(e) {
                  var n = se && se.isAvailable()
                  let t = n && !se.previouslyFailed()
                  if (
                    (e.webSocketOnly &&
                      (n ||
                        O(
                          "wss:// URL used, but browser isn't known to support websockets.  Trying anyway.",
                        ),
                      (t = !0)),
                    t)
                  )
                    this.transports_ = [se]
                  else {
                    const i = (this.transports_ = [])
                    for (const r of le.ALL_TRANSPORTS)
                      r && r.isAvailable() && i.push(r)
                  }
                }
                initialTransport() {
                  if (0 < this.transports_.length) return this.transports_[0]
                  throw new Error('No transports available')
                }
                upgradeTransport() {
                  return 1 < this.transports_.length
                    ? this.transports_[1]
                    : null
                }
              }
              class ce {
                constructor(e, n, t, i, r, o, a, s, l, c) {
                  ;(this.id = e),
                    (this.repoInfo_ = n),
                    (this.applicationId_ = t),
                    (this.appCheckToken_ = i),
                    (this.authToken_ = r),
                    (this.onMessage_ = o),
                    (this.onReady_ = a),
                    (this.onDisconnect_ = s),
                    (this.onKill_ = l),
                    (this.lastSessionId = c),
                    (this.connectionCount = 0),
                    (this.pendingDataMessages = []),
                    (this.state_ = 0),
                    (this.log_ = k('c:' + this.id + ':')),
                    (this.transportManager_ = new le(n)),
                    this.log_('Connection created'),
                    this.start_()
                }
                start_() {
                  const e = this.transportManager_.initialTransport()
                  ;(this.conn_ = new e(
                    this.nextTransportId_(),
                    this.repoInfo_,
                    this.applicationId_,
                    this.appCheckToken_,
                    this.authToken_,
                    null,
                    this.lastSessionId,
                  )),
                    (this.primaryResponsesRequired_ =
                      e.responsesRequiredToBeHealthy || 0)
                  const n = this.connReceiver_(this.conn_),
                    t = this.disconnReceiver_(this.conn_)
                  ;(this.tx_ = this.conn_),
                    (this.rx_ = this.conn_),
                    (this.secondaryConn_ = null),
                    (this.isHealthy_ = !1),
                    setTimeout(() => {
                      this.conn_ && this.conn_.open(n, t)
                    }, Math.floor(0))
                  var i = e.healthyTimeout || 0
                  0 < i &&
                    (this.healthyTimeout_ = F(() => {
                      ;(this.healthyTimeout_ = null),
                        this.isHealthy_ ||
                          (this.conn_ && 102400 < this.conn_.bytesReceived
                            ? (this.log_(
                                'Connection exceeded healthy timeout but has received ' +
                                  this.conn_.bytesReceived +
                                  ' bytes.  Marking connection healthy.',
                              ),
                              (this.isHealthy_ = !0),
                              this.conn_.markConnectionHealthy())
                            : this.conn_ && 10240 < this.conn_.bytesSent
                            ? this.log_(
                                'Connection exceeded healthy timeout but has sent ' +
                                  this.conn_.bytesSent +
                                  ' bytes.  Leaving connection alive.',
                              )
                            : (this.log_(
                                'Closing unhealthy connection after timeout.',
                              ),
                              this.close()))
                    }, Math.floor(i)))
                }
                nextTransportId_() {
                  return 'c:' + this.id + ':' + this.connectionCount++
                }
                disconnReceiver_(n) {
                  return (e) => {
                    n === this.conn_
                      ? this.onConnectionLost_(e)
                      : n === this.secondaryConn_
                      ? (this.log_('Secondary connection lost.'),
                        this.onSecondaryConnectionLost_())
                      : this.log_('closing an old connection')
                  }
                }
                connReceiver_(n) {
                  return (e) => {
                    2 !== this.state_ &&
                      (n === this.rx_
                        ? this.onPrimaryMessageReceived_(e)
                        : n === this.secondaryConn_
                        ? this.onSecondaryMessageReceived_(e)
                        : this.log_('message on old connection'))
                  }
                }
                sendRequest(e) {
                  this.sendData_({ t: 'd', d: e })
                }
                tryCleanupConnection() {
                  this.tx_ === this.secondaryConn_ &&
                    this.rx_ === this.secondaryConn_ &&
                    (this.log_(
                      'cleaning up and promoting a connection: ' +
                        this.secondaryConn_.connId,
                    ),
                    (this.conn_ = this.secondaryConn_),
                    (this.secondaryConn_ = null))
                }
                onSecondaryControl_(e) {
                  't' in e &&
                    ('a' === (e = e.t)
                      ? this.upgradeIfSecondaryHealthy_()
                      : 'r' === e
                      ? (this.log_('Got a reset on secondary, closing it'),
                        this.secondaryConn_.close(),
                        (this.tx_ !== this.secondaryConn_ &&
                          this.rx_ !== this.secondaryConn_) ||
                          this.close())
                      : 'o' === e &&
                        (this.log_('got pong on secondary.'),
                        this.secondaryResponsesRequired_--,
                        this.upgradeIfSecondaryHealthy_()))
                }
                onSecondaryMessageReceived_(e) {
                  var n = I('t', e),
                    e = I('d', e)
                  if ('c' === n) this.onSecondaryControl_(e)
                  else {
                    if ('d' !== n)
                      throw new Error('Unknown protocol layer: ' + n)
                    this.pendingDataMessages.push(e)
                  }
                }
                upgradeIfSecondaryHealthy_() {
                  this.secondaryResponsesRequired_ <= 0
                    ? (this.log_('Secondary connection is healthy.'),
                      (this.isHealthy_ = !0),
                      this.secondaryConn_.markConnectionHealthy(),
                      this.proceedWithUpgrade_())
                    : (this.log_('sending ping on secondary.'),
                      this.secondaryConn_.send({
                        t: 'c',
                        d: { t: 'p', d: {} },
                      }))
                }
                proceedWithUpgrade_() {
                  this.secondaryConn_.start(),
                    this.log_('sending client ack on secondary'),
                    this.secondaryConn_.send({ t: 'c', d: { t: 'a', d: {} } }),
                    this.log_('Ending transmission on primary'),
                    this.conn_.send({ t: 'c', d: { t: 'n', d: {} } }),
                    (this.tx_ = this.secondaryConn_),
                    this.tryCleanupConnection()
                }
                onPrimaryMessageReceived_(e) {
                  var n = I('t', e),
                    e = I('d', e)
                  'c' === n
                    ? this.onControl_(e)
                    : 'd' === n && this.onDataMessage_(e)
                }
                onDataMessage_(e) {
                  this.onPrimaryResponse_(), this.onMessage_(e)
                }
                onPrimaryResponse_() {
                  this.isHealthy_ ||
                    (this.primaryResponsesRequired_--,
                    this.primaryResponsesRequired_ <= 0 &&
                      (this.log_('Primary connection is healthy.'),
                      (this.isHealthy_ = !0),
                      this.conn_.markConnectionHealthy()))
                }
                onControl_(e) {
                  var n = I('t', e)
                  if ('d' in e) {
                    e = e.d
                    if ('h' === n) this.onHandshake_(e)
                    else if ('n' === n) {
                      this.log_('recvd end transmission on primary'),
                        (this.rx_ = this.secondaryConn_)
                      for (let e = 0; e < this.pendingDataMessages.length; ++e)
                        this.onDataMessage_(this.pendingDataMessages[e])
                      ;(this.pendingDataMessages = []),
                        this.tryCleanupConnection()
                    } else
                      's' === n
                        ? this.onConnectionShutdown_(e)
                        : 'r' === n
                        ? this.onReset_(e)
                        : 'e' === n
                        ? C('Server Error: ' + e)
                        : 'o' === n
                        ? (this.log_('got pong on primary.'),
                          this.onPrimaryResponse_(),
                          this.sendPingOnPrimaryIfNecessary_())
                        : C('Unknown control packet command: ' + n)
                  }
                }
                onHandshake_(e) {
                  var n = e.ts,
                    t = e.v,
                    i = e.h
                  ;(this.sessionId = e.s),
                    (this.repoInfo_.host = i),
                    0 === this.state_ &&
                      (this.conn_.start(),
                      this.onConnectionEstablished_(this.conn_, n),
                      '5' !== t && O('Protocol version mismatch detected'),
                      this.tryStartUpgrade_())
                }
                tryStartUpgrade_() {
                  var e = this.transportManager_.upgradeTransport()
                  e && this.startUpgrade_(e)
                }
                startUpgrade_(e) {
                  ;(this.secondaryConn_ = new e(
                    this.nextTransportId_(),
                    this.repoInfo_,
                    this.applicationId_,
                    this.appCheckToken_,
                    this.authToken_,
                    this.sessionId,
                  )),
                    (this.secondaryResponsesRequired_ =
                      e.responsesRequiredToBeHealthy || 0)
                  var n = this.connReceiver_(this.secondaryConn_),
                    e = this.disconnReceiver_(this.secondaryConn_)
                  this.secondaryConn_.open(n, e),
                    F(() => {
                      this.secondaryConn_ &&
                        (this.log_('Timed out trying to upgrade.'),
                        this.secondaryConn_.close())
                    }, Math.floor(6e4))
                }
                onReset_(e) {
                  this.log_('Reset packet received.  New host: ' + e),
                    (this.repoInfo_.host = e),
                    1 === this.state_
                      ? this.close()
                      : (this.closeConnections_(), this.start_())
                }
                onConnectionEstablished_(e, n) {
                  this.log_('Realtime connection established.'),
                    (this.conn_ = e),
                    (this.state_ = 1),
                    this.onReady_ &&
                      (this.onReady_(n, this.sessionId),
                      (this.onReady_ = null)),
                    0 === this.primaryResponsesRequired_
                      ? (this.log_('Primary connection is healthy.'),
                        (this.isHealthy_ = !0))
                      : F(() => {
                          this.sendPingOnPrimaryIfNecessary_()
                        }, Math.floor(5e3))
                }
                sendPingOnPrimaryIfNecessary_() {
                  this.isHealthy_ ||
                    1 !== this.state_ ||
                    (this.log_('sending ping on primary.'),
                    this.sendData_({ t: 'c', d: { t: 'p', d: {} } }))
                }
                onSecondaryConnectionLost_() {
                  var e = this.secondaryConn_
                  ;(this.secondaryConn_ = null),
                    (this.tx_ !== e && this.rx_ !== e) || this.close()
                }
                onConnectionLost_(e) {
                  ;(this.conn_ = null),
                    e || 0 !== this.state_
                      ? 1 === this.state_ &&
                        this.log_('Realtime connection lost.')
                      : (this.log_('Realtime connection failed.'),
                        this.repoInfo_.isCacheableHost() &&
                          (m.remove('host:' + this.repoInfo_.host),
                          (this.repoInfo_.internalHost = this.repoInfo_.host))),
                    this.close()
                }
                onConnectionShutdown_(e) {
                  this.log_(
                    'Connection shutdown command received. Shutting down...',
                  ),
                    this.onKill_ && (this.onKill_(e), (this.onKill_ = null)),
                    (this.onDisconnect_ = null),
                    this.close()
                }
                sendData_(e) {
                  if (1 !== this.state_) throw 'Connection is not connected'
                  this.tx_.send(e)
                }
                close() {
                  2 !== this.state_ &&
                    (this.log_('Closing realtime connection.'),
                    (this.state_ = 2),
                    this.closeConnections_(),
                    this.onDisconnect_ &&
                      (this.onDisconnect_(), (this.onDisconnect_ = null)))
                }
                closeConnections_() {
                  this.log_('Shutting down all connections'),
                    this.conn_ && (this.conn_.close(), (this.conn_ = null)),
                    this.secondaryConn_ &&
                      (this.secondaryConn_.close(),
                      (this.secondaryConn_ = null)),
                    this.healthyTimeout_ &&
                      (clearTimeout(this.healthyTimeout_),
                      (this.healthyTimeout_ = null))
                }
              }
              class he {
                put(e, n, t, i) {}
                merge(e, n, t, i) {}
                refreshAuthToken(e) {}
                refreshAppCheckToken(e) {}
                onDisconnectPut(e, n, t) {}
                onDisconnectMerge(e, n, t) {}
                onDisconnectCancel(e, n) {}
                reportStats(e) {}
              }
              class de {
                constructor(e) {
                  ;(this.allowedEvents_ = e),
                    (this.listeners_ = {}),
                    (0, f.assert)(
                      Array.isArray(e) && 0 < e.length,
                      'Requires a non-empty array',
                    )
                }
                trigger(e, ...n) {
                  if (Array.isArray(this.listeners_[e])) {
                    const t = [...this.listeners_[e]]
                    for (let e = 0; e < t.length; e++)
                      t[e].callback.apply(t[e].context, n)
                  }
                }
                on(e, n, t) {
                  this.validateEventType_(e),
                    (this.listeners_[e] = this.listeners_[e] || []),
                    this.listeners_[e].push({ callback: n, context: t })
                  e = this.getInitialEvent(e)
                  e && n.apply(t, e)
                }
                off(e, n, t) {
                  this.validateEventType_(e)
                  const i = this.listeners_[e] || []
                  for (let e = 0; e < i.length; e++)
                    if (i[e].callback === n && (!t || t === i[e].context))
                      return void i.splice(e, 1)
                }
                validateEventType_(n) {
                  ;(0, f.assert)(
                    this.allowedEvents_.find((e) => e === n),
                    'Unknown event: ' + n,
                  )
                }
              }
              class ue extends de {
                constructor() {
                  super(['online']),
                    (this.online_ = !0),
                    'undefined' == typeof window ||
                      void 0 === window.addEventListener ||
                      (0, f.isMobileCordova)() ||
                      (window.addEventListener(
                        'online',
                        () => {
                          this.online_ ||
                            ((this.online_ = !0), this.trigger('online', !0))
                        },
                        !1,
                      ),
                      window.addEventListener(
                        'offline',
                        () => {
                          this.online_ &&
                            ((this.online_ = !1), this.trigger('online', !1))
                        },
                        !1,
                      ))
                }
                static getInstance() {
                  return new ue()
                }
                getInitialEvent(e) {
                  return (
                    (0, f.assert)('online' === e, 'Unknown event type: ' + e),
                    [this.online_]
                  )
                }
                currentlyOnline() {
                  return this.online_
                }
              }
              const pe = 32,
                fe = 768
              class ge {
                constructor(e, n) {
                  if (void 0 === n) {
                    this.pieces_ = e.split('/')
                    let n = 0
                    for (let e = 0; e < this.pieces_.length; e++)
                      0 < this.pieces_[e].length &&
                        ((this.pieces_[n] = this.pieces_[e]), n++)
                    ;(this.pieces_.length = n), (this.pieceNum_ = 0)
                  } else (this.pieces_ = e), (this.pieceNum_ = n)
                }
                toString() {
                  let n = ''
                  for (let e = this.pieceNum_; e < this.pieces_.length; e++)
                    '' !== this.pieces_[e] && (n += '/' + this.pieces_[e])
                  return n || '/'
                }
              }
              function me() {
                return new ge('')
              }
              function be(e) {
                return e.pieceNum_ >= e.pieces_.length
                  ? null
                  : e.pieces_[e.pieceNum_]
              }
              function _e(e) {
                return e.pieces_.length - e.pieceNum_
              }
              function ye(e) {
                let n = e.pieceNum_
                return n < e.pieces_.length && n++, new ge(e.pieces_, n)
              }
              function ve(e) {
                return e.pieceNum_ < e.pieces_.length
                  ? e.pieces_[e.pieces_.length - 1]
                  : null
              }
              function we(e, n = 0) {
                return e.pieces_.slice(e.pieceNum_ + n)
              }
              function xe(n) {
                if (n.pieceNum_ >= n.pieces_.length) return null
                const t = []
                for (let e = n.pieceNum_; e < n.pieces_.length - 1; e++)
                  t.push(n.pieces_[e])
                return new ge(t, 0)
              }
              function ke(n, t) {
                const i = []
                for (let e = n.pieceNum_; e < n.pieces_.length; e++)
                  i.push(n.pieces_[e])
                if (t instanceof ge)
                  for (let e = t.pieceNum_; e < t.pieces_.length; e++)
                    i.push(t.pieces_[e])
                else {
                  var r = t.split('/')
                  for (let e = 0; e < r.length; e++)
                    0 < r[e].length && i.push(r[e])
                }
                return new ge(i, 0)
              }
              function Ce(e) {
                return e.pieceNum_ >= e.pieces_.length
              }
              function Ee(e, n) {
                var t = be(e),
                  i = be(n)
                if (null === t) return n
                if (t === i) return Ee(ye(e), ye(n))
                throw new Error(
                  'INTERNAL ERROR: innerPath (' +
                    n +
                    ') is not within outerPath (' +
                    e +
                    ')',
                )
              }
              function Ie(e, n) {
                var t = we(e, 0),
                  i = we(n, 0)
                for (let e = 0; e < t.length && e < i.length; e++) {
                  var r = L(t[e], i[e])
                  if (0 !== r) return r
                }
                return t.length === i.length ? 0 : t.length < i.length ? -1 : 1
              }
              function Te(t, i) {
                if (_e(t) !== _e(i)) return !1
                for (
                  let e = t.pieceNum_, n = i.pieceNum_;
                  e <= t.pieces_.length;
                  e++, n++
                )
                  if (t.pieces_[e] !== i.pieces_[n]) return !1
                return !0
              }
              function Se(e, n) {
                let t = e.pieceNum_,
                  i = n.pieceNum_
                if (_e(e) > _e(n)) return !1
                for (; t < e.pieces_.length; ) {
                  if (e.pieces_[t] !== n.pieces_[i]) return !1
                  ++t, ++i
                }
                return !0
              }
              class Pe {
                constructor(e, n) {
                  ;(this.errorPrefix_ = n),
                    (this.parts_ = we(e, 0)),
                    (this.byteLength_ = Math.max(1, this.parts_.length))
                  for (let e = 0; e < this.parts_.length; e++)
                    this.byteLength_ += (0, f.stringLength)(this.parts_[e])
                  Ne(this)
                }
              }
              function Ne(e) {
                if (e.byteLength_ > fe)
                  throw new Error(
                    e.errorPrefix_ +
                      'has a key path longer than ' +
                      fe +
                      ' bytes (' +
                      e.byteLength_ +
                      ').',
                  )
                if (e.parts_.length > pe)
                  throw new Error(
                    e.errorPrefix_ +
                      'path specified exceeds the maximum depth that can be written (' +
                      pe +
                      ') or object contains a cycle ' +
                      Re(e),
                  )
              }
              function Re(e) {
                return 0 === e.parts_.length
                  ? ''
                  : "in property '" + e.parts_.join('.') + "'"
              }
              class Oe extends de {
                constructor() {
                  super(['visible'])
                  let n, e
                  'undefined' != typeof document &&
                    void 0 !== document.addEventListener &&
                    (void 0 !== document.hidden
                      ? ((e = 'visibilitychange'), (n = 'hidden'))
                      : void 0 !== document.mozHidden
                      ? ((e = 'mozvisibilitychange'), (n = 'mozHidden'))
                      : void 0 !== document.msHidden
                      ? ((e = 'msvisibilitychange'), (n = 'msHidden'))
                      : void 0 !== document.webkitHidden &&
                        ((e = 'webkitvisibilitychange'), (n = 'webkitHidden'))),
                    (this.visible_ = !0),
                    e &&
                      document.addEventListener(
                        e,
                        () => {
                          var e = !document[n]
                          e !== this.visible_ &&
                            ((this.visible_ = e), this.trigger('visible', e))
                        },
                        !1,
                      )
                }
                static getInstance() {
                  return new Oe()
                }
                getInitialEvent(e) {
                  return (
                    (0, f.assert)('visible' === e, 'Unknown event type: ' + e),
                    [this.visible_]
                  )
                }
              }
              class De extends he {
                constructor(e, n, t, i, r, o, a, s) {
                  if (
                    (super(),
                    (this.repoInfo_ = e),
                    (this.applicationId_ = n),
                    (this.onDataUpdate_ = t),
                    (this.onConnectStatus_ = i),
                    (this.onServerInfoUpdate_ = r),
                    (this.authTokenProvider_ = o),
                    (this.appCheckTokenProvider_ = a),
                    (this.authOverride_ = s),
                    (this.id = De.nextPersistentConnectionId_++),
                    (this.log_ = k('p:' + this.id + ':')),
                    (this.interruptReasons_ = {}),
                    (this.listens = new Map()),
                    (this.outstandingPuts_ = []),
                    (this.outstandingGets_ = []),
                    (this.outstandingPutCount_ = 0),
                    (this.outstandingGetCount_ = 0),
                    (this.onDisconnectRequestQueue_ = []),
                    (this.connected_ = !1),
                    (this.reconnectDelay_ = 1e3),
                    (this.maxReconnectDelay_ = 3e5),
                    (this.securityDebugCallback_ = null),
                    (this.lastSessionId = null),
                    (this.establishConnectionTimer_ = null),
                    (this.visible_ = !1),
                    (this.requestCBHash_ = {}),
                    (this.requestNumber_ = 0),
                    (this.realtime_ = null),
                    (this.authToken_ = null),
                    (this.appCheckToken_ = null),
                    (this.forceTokenRefresh_ = !1),
                    (this.invalidAuthTokenCount_ = 0),
                    (this.invalidAppCheckTokenCount_ = 0),
                    (this.firstConnection_ = !0),
                    (this.lastConnectionAttemptTime_ = null),
                    (this.lastConnectionEstablishedTime_ = null),
                    s && !(0, f.isNodeSdk)())
                  )
                    throw new Error(
                      'Auth override specified in options, but not supported on non Node.js platforms',
                    )
                  Oe.getInstance().on('visible', this.onVisible_, this),
                    -1 === e.host.indexOf('fblocal') &&
                      ue.getInstance().on('online', this.onOnline_, this)
                }
                sendRequest(e, n, t) {
                  var i = ++this.requestNumber_,
                    n = { r: i, a: e, b: n }
                  this.log_((0, f.stringify)(n)),
                    (0, f.assert)(
                      this.connected_,
                      "sendRequest call when we're not connected not allowed.",
                    ),
                    this.realtime_.sendRequest(n),
                    t && (this.requestCBHash_[i] = t)
                }
                get(e) {
                  this.initConnection_()
                  const t = new f.Deferred(),
                    i = { p: e._path.toString(), q: e._queryObject },
                    n = {
                      action: 'g',
                      request: i,
                      onComplete: (e) => {
                        var n = e.d
                        'ok' === e.s
                          ? (this.onDataUpdate_(i.p, n, !1, null), t.resolve(n))
                          : t.reject(n)
                      },
                    }
                  this.outstandingGets_.push(n), this.outstandingGetCount_++
                  const r = this.outstandingGets_.length - 1
                  return (
                    this.connected_ ||
                      setTimeout(() => {
                        var e = this.outstandingGets_[r]
                        void 0 !== e &&
                          n === e &&
                          (delete this.outstandingGets_[r],
                          this.outstandingGetCount_--,
                          0 === this.outstandingGetCount_ &&
                            (this.outstandingGets_ = []),
                          this.log_('get ' + r + ' timed out on connection'),
                          t.reject(new Error('Client is offline.')))
                      }, 3e3),
                    this.connected_ && this.sendGet_(r),
                    t.promise
                  )
                }
                listen(e, n, t, i) {
                  this.initConnection_()
                  var r = e._queryIdentifier,
                    o = e._path.toString()
                  this.log_('Listen called for ' + o + ' ' + r),
                    this.listens.has(o) || this.listens.set(o, new Map()),
                    (0, f.assert)(
                      e._queryParams.isDefault() ||
                        !e._queryParams.loadsAllData(),
                      'listen() called for non-default but complete query',
                    ),
                    (0, f.assert)(
                      !this.listens.get(o).has(r),
                      'listen() called twice for same path/queryId.',
                    )
                  t = { onComplete: i, hashFn: n, query: e, tag: t }
                  this.listens.get(o).set(r, t),
                    this.connected_ && this.sendListen_(t)
                }
                sendGet_(n) {
                  const t = this.outstandingGets_[n]
                  this.sendRequest('g', t.request, (e) => {
                    delete this.outstandingGets_[n],
                      this.outstandingGetCount_--,
                      0 === this.outstandingGetCount_ &&
                        (this.outstandingGets_ = []),
                      t.onComplete && t.onComplete(e)
                  })
                }
                sendListen_(i) {
                  const r = i.query,
                    o = r._path.toString(),
                    a = r._queryIdentifier
                  this.log_('Listen on ' + o + ' for ' + a)
                  const e = { p: o }
                  i.tag && ((e.q = r._queryObject), (e.t = i.tag)),
                    (e.h = i.hashFn()),
                    this.sendRequest('q', e, (e) => {
                      var n = e.d,
                        t = e.s
                      De.warnOnListenWarnings_(n, r),
                        (this.listens.get(o) && this.listens.get(o).get(a)) ===
                          i &&
                          (this.log_('listen response', e),
                          'ok' !== t && this.removeListen_(o, a),
                          i.onComplete && i.onComplete(t, n))
                    })
                }
                static warnOnListenWarnings_(e, n) {
                  if (e && 'object' == typeof e && (0, f.contains)(e, 'w')) {
                    const t = (0, f.safeGet)(e, 'w')
                    Array.isArray(t) &&
                      ~t.indexOf('no_index') &&
                      ((e =
                        '".indexOn": "' +
                        n._queryParams.getIndex().toString() +
                        '"'),
                      (n = n._path.toString()),
                      O(
                        'Using an unspecified index. Your data will be downloaded and ' +
                          `filtered on the client. Consider adding ${e} at ` +
                          `${n} to your security rules for better performance.`,
                      ))
                  }
                }
                refreshAuthToken(e) {
                  ;(this.authToken_ = e),
                    this.log_('Auth token refreshed'),
                    this.authToken_
                      ? this.tryAuth()
                      : this.connected_ &&
                        this.sendRequest('unauth', {}, () => {}),
                    this.reduceReconnectDelayIfAdminCredential_(e)
                }
                reduceReconnectDelayIfAdminCredential_(e) {
                  ;((e && 40 === e.length) || (0, f.isAdmin)(e)) &&
                    (this.log_(
                      'Admin auth credential detected.  Reducing max reconnect time.',
                    ),
                    (this.maxReconnectDelay_ = 3e4))
                }
                refreshAppCheckToken(e) {
                  ;(this.appCheckToken_ = e),
                    this.log_('App check token refreshed'),
                    this.appCheckToken_
                      ? this.tryAppCheck()
                      : this.connected_ &&
                        this.sendRequest('unappeck', {}, () => {})
                }
                tryAuth() {
                  if (this.connected_ && this.authToken_) {
                    const t = this.authToken_
                    var e = (0, f.isValidFormat)(t) ? 'auth' : 'gauth'
                    const n = { cred: t }
                    null === this.authOverride_
                      ? (n.noauth = !0)
                      : 'object' == typeof this.authOverride_ &&
                        (n.authvar = this.authOverride_),
                      this.sendRequest(e, n, (e) => {
                        var n = e.s,
                          e = e.d || 'error'
                        this.authToken_ === t &&
                          ('ok' === n
                            ? (this.invalidAuthTokenCount_ = 0)
                            : this.onAuthRevoked_(n, e))
                      })
                  }
                }
                tryAppCheck() {
                  this.connected_ &&
                    this.appCheckToken_ &&
                    this.sendRequest(
                      'appcheck',
                      { token: this.appCheckToken_ },
                      (e) => {
                        var n = e.s,
                          e = e.d || 'error'
                        'ok' === n
                          ? (this.invalidAppCheckTokenCount_ = 0)
                          : this.onAppCheckRevoked_(n, e)
                      },
                    )
                }
                unlisten(e, n) {
                  var t = e._path.toString(),
                    i = e._queryIdentifier
                  this.log_('Unlisten called for ' + t + ' ' + i),
                    (0, f.assert)(
                      e._queryParams.isDefault() ||
                        !e._queryParams.loadsAllData(),
                      'unlisten() called for non-default but complete query',
                    ),
                    this.removeListen_(t, i) &&
                      this.connected_ &&
                      this.sendUnlisten_(t, i, e._queryObject, n)
                }
                sendUnlisten_(e, n, t, i) {
                  this.log_('Unlisten on ' + e + ' for ' + n)
                  const r = { p: e }
                  i && ((r.q = t), (r.t = i)), this.sendRequest('n', r)
                }
                onDisconnectPut(e, n, t) {
                  this.initConnection_(),
                    this.connected_
                      ? this.sendOnDisconnect_('o', e, n, t)
                      : this.onDisconnectRequestQueue_.push({
                          pathString: e,
                          action: 'o',
                          data: n,
                          onComplete: t,
                        })
                }
                onDisconnectMerge(e, n, t) {
                  this.initConnection_(),
                    this.connected_
                      ? this.sendOnDisconnect_('om', e, n, t)
                      : this.onDisconnectRequestQueue_.push({
                          pathString: e,
                          action: 'om',
                          data: n,
                          onComplete: t,
                        })
                }
                onDisconnectCancel(e, n) {
                  this.initConnection_(),
                    this.connected_
                      ? this.sendOnDisconnect_('oc', e, null, n)
                      : this.onDisconnectRequestQueue_.push({
                          pathString: e,
                          action: 'oc',
                          data: null,
                          onComplete: n,
                        })
                }
                sendOnDisconnect_(e, n, t, i) {
                  t = { p: n, d: t }
                  this.log_('onDisconnect ' + e, t),
                    this.sendRequest(e, t, (e) => {
                      i &&
                        setTimeout(() => {
                          i(e.s, e.d)
                        }, Math.floor(0))
                    })
                }
                put(e, n, t, i) {
                  this.putInternal('p', e, n, t, i)
                }
                merge(e, n, t, i) {
                  this.putInternal('m', e, n, t, i)
                }
                putInternal(e, n, t, i, r) {
                  this.initConnection_()
                  const o = { p: n, d: t }
                  void 0 !== r && (o.h = r),
                    this.outstandingPuts_.push({
                      action: e,
                      request: o,
                      onComplete: i,
                    }),
                    this.outstandingPutCount_++
                  i = this.outstandingPuts_.length - 1
                  this.connected_
                    ? this.sendPut_(i)
                    : this.log_('Buffering put: ' + n)
                }
                sendPut_(n) {
                  const t = this.outstandingPuts_[n].action
                  var e = this.outstandingPuts_[n].request
                  const i = this.outstandingPuts_[n].onComplete
                  ;(this.outstandingPuts_[n].queued = this.connected_),
                    this.sendRequest(t, e, (e) => {
                      this.log_(t + ' response', e),
                        delete this.outstandingPuts_[n],
                        this.outstandingPutCount_--,
                        0 === this.outstandingPutCount_ &&
                          (this.outstandingPuts_ = []),
                        i && i(e.s, e.d)
                    })
                }
                reportStats(e) {
                  this.connected_ &&
                    (this.log_('reportStats', (e = { c: e })),
                    this.sendRequest('s', e, (e) => {
                      'ok' !== e.s &&
                        ((e = e.d),
                        this.log_('reportStats', 'Error sending stats: ' + e))
                    }))
                }
                onDataMessage_(e) {
                  if ('r' in e) {
                    this.log_('from server: ' + (0, f.stringify)(e))
                    var n = e.r
                    const t = this.requestCBHash_[n]
                    t && (delete this.requestCBHash_[n], t(e.b))
                  } else {
                    if ('error' in e)
                      throw 'A server-side error has occurred: ' + e.error
                    'a' in e && this.onDataPush_(e.a, e.b)
                  }
                }
                onDataPush_(e, n) {
                  this.log_('handleServerMessage', e, n),
                    'd' === e
                      ? this.onDataUpdate_(n.p, n.d, !1, n.t)
                      : 'm' === e
                      ? this.onDataUpdate_(n.p, n.d, !0, n.t)
                      : 'c' === e
                      ? this.onListenRevoked_(n.p, n.q)
                      : 'ac' === e
                      ? this.onAuthRevoked_(n.s, n.d)
                      : 'apc' === e
                      ? this.onAppCheckRevoked_(n.s, n.d)
                      : 'sd' === e
                      ? this.onSecurityDebugPacket_(n)
                      : C(
                          'Unrecognized action received from server: ' +
                            (0, f.stringify)(e) +
                            '\nAre you using the latest client?',
                        )
                }
                onReady_(e, n) {
                  this.log_('connection ready'),
                    (this.connected_ = !0),
                    (this.lastConnectionEstablishedTime_ = new Date().getTime()),
                    this.handleTimestamp_(e),
                    (this.lastSessionId = n),
                    this.firstConnection_ && this.sendConnectStats_(),
                    this.restoreState_(),
                    (this.firstConnection_ = !1),
                    this.onConnectStatus_(!0)
                }
                scheduleConnect_(e) {
                  ;(0, f.assert)(
                    !this.realtime_,
                    "Scheduling a connect when we're already connected/ing?",
                  ),
                    this.establishConnectionTimer_ &&
                      clearTimeout(this.establishConnectionTimer_),
                    (this.establishConnectionTimer_ = setTimeout(() => {
                      ;(this.establishConnectionTimer_ = null),
                        this.establishConnection_()
                    }, Math.floor(e)))
                }
                initConnection_() {
                  !this.realtime_ &&
                    this.firstConnection_ &&
                    this.scheduleConnect_(0)
                }
                onVisible_(e) {
                  e &&
                    !this.visible_ &&
                    this.reconnectDelay_ === this.maxReconnectDelay_ &&
                    (this.log_('Window became visible.  Reducing delay.'),
                    (this.reconnectDelay_ = 1e3),
                    this.realtime_ || this.scheduleConnect_(0)),
                    (this.visible_ = e)
                }
                onOnline_(e) {
                  e
                    ? (this.log_('Browser went online.'),
                      (this.reconnectDelay_ = 1e3),
                      this.realtime_ || this.scheduleConnect_(0))
                    : (this.log_('Browser went offline.  Killing connection.'),
                      this.realtime_ && this.realtime_.close())
                }
                onRealtimeDisconnect_() {
                  var e
                  this.log_('data client disconnected'),
                    (this.connected_ = !1),
                    (this.realtime_ = null),
                    this.cancelSentTransactions_(),
                    (this.requestCBHash_ = {}),
                    this.shouldReconnect_() &&
                      (this.visible_
                        ? this.lastConnectionEstablishedTime_ &&
                          (3e4 <
                            new Date().getTime() -
                              this.lastConnectionEstablishedTime_ &&
                            (this.reconnectDelay_ = 1e3),
                          (this.lastConnectionEstablishedTime_ = null))
                        : (this.log_(
                            "Window isn't visible.  Delaying reconnect.",
                          ),
                          (this.reconnectDelay_ = this.maxReconnectDelay_),
                          (this.lastConnectionAttemptTime_ = new Date().getTime())),
                      (e =
                        new Date().getTime() - this.lastConnectionAttemptTime_),
                      (e = Math.max(0, this.reconnectDelay_ - e)),
                      (e = Math.random() * e),
                      this.log_('Trying to reconnect in ' + e + 'ms'),
                      this.scheduleConnect_(e),
                      (this.reconnectDelay_ = Math.min(
                        this.maxReconnectDelay_,
                        1.3 * this.reconnectDelay_,
                      ))),
                    this.onConnectStatus_(!1)
                }
                async establishConnection_() {
                  if (this.shouldReconnect_()) {
                    this.log_('Making a connection attempt'),
                      (this.lastConnectionAttemptTime_ = new Date().getTime()),
                      (this.lastConnectionEstablishedTime_ = null)
                    var e = this.onDataMessage_.bind(this),
                      i = this.onReady_.bind(this)
                    const h = this.onRealtimeDisconnect_.bind(this)
                    var r = this.id + ':' + De.nextConnectionId_++,
                      o = this.lastSessionId
                    let n = !1,
                      t = null
                    var a = function () {
                      t ? t.close() : ((n = !0), h())
                    }
                    this.realtime_ = {
                      close: a,
                      sendRequest: function (e) {
                        ;(0, f.assert)(
                          t,
                          "sendRequest call when we're not connected not allowed.",
                        ),
                          t.sendRequest(e)
                      },
                    }
                    var s = this.forceTokenRefresh_
                    this.forceTokenRefresh_ = !1
                    try {
                      var [l, c] = await Promise.all([
                        this.authTokenProvider_.getToken(s),
                        this.appCheckTokenProvider_.getToken(s),
                      ])
                      n
                        ? N('getToken() completed but was canceled')
                        : (N('getToken() completed. Creating connection.'),
                          (this.authToken_ = l && l.accessToken),
                          (this.appCheckToken_ = c && c.token),
                          (t = new ce(
                            r,
                            this.repoInfo_,
                            this.applicationId_,
                            this.appCheckToken_,
                            this.authToken_,
                            e,
                            i,
                            h,
                            (e) => {
                              O(e + ' (' + this.repoInfo_.toString() + ')'),
                                this.interrupt('server_kill')
                            },
                            o,
                          )))
                    } catch (e) {
                      this.log_('Failed to get token: ' + e),
                        n || (this.repoInfo_.nodeAdmin && O(e), a())
                    }
                  }
                }
                interrupt(e) {
                  N('Interrupting connection for reason: ' + e),
                    (this.interruptReasons_[e] = !0),
                    this.realtime_
                      ? this.realtime_.close()
                      : (this.establishConnectionTimer_ &&
                          (clearTimeout(this.establishConnectionTimer_),
                          (this.establishConnectionTimer_ = null)),
                        this.connected_ && this.onRealtimeDisconnect_())
                }
                resume(e) {
                  N('Resuming connection for reason: ' + e),
                    delete this.interruptReasons_[e],
                    (0, f.isEmpty)(this.interruptReasons_) &&
                      ((this.reconnectDelay_ = 1e3),
                      this.realtime_ || this.scheduleConnect_(0))
                }
                handleTimestamp_(e) {
                  e -= new Date().getTime()
                  this.onServerInfoUpdate_({ serverTimeOffset: e })
                }
                cancelSentTransactions_() {
                  for (let e = 0; e < this.outstandingPuts_.length; e++) {
                    const n = this.outstandingPuts_[e]
                    n &&
                      'h' in n.request &&
                      n.queued &&
                      (n.onComplete && n.onComplete('disconnect'),
                      delete this.outstandingPuts_[e],
                      this.outstandingPutCount_--)
                  }
                  0 === this.outstandingPutCount_ &&
                    (this.outstandingPuts_ = [])
                }
                onListenRevoked_(e, n) {
                  let t
                  t = n ? n.map((e) => T(e)).join('$') : 'default'
                  const i = this.removeListen_(e, t)
                  i && i.onComplete && i.onComplete('permission_denied')
                }
                removeListen_(e, n) {
                  e = new ge(e).toString()
                  let t
                  if (this.listens.has(e)) {
                    const i = this.listens.get(e)
                    ;(t = i.get(n)),
                      i.delete(n),
                      0 === i.size && this.listens.delete(e)
                  } else t = void 0
                  return t
                }
                onAuthRevoked_(e, n) {
                  N('Auth token revoked: ' + e + '/' + n),
                    (this.authToken_ = null),
                    (this.forceTokenRefresh_ = !0),
                    this.realtime_.close(),
                    ('invalid_token' !== e && 'permission_denied' !== e) ||
                      (this.invalidAuthTokenCount_++,
                      3 <= this.invalidAuthTokenCount_ &&
                        ((this.reconnectDelay_ = 3e4),
                        this.authTokenProvider_.notifyForInvalidToken()))
                }
                onAppCheckRevoked_(e, n) {
                  N('App check token revoked: ' + e + '/' + n),
                    (this.appCheckToken_ = null),
                    (this.forceTokenRefresh_ = !0),
                    ('invalid_token' !== e && 'permission_denied' !== e) ||
                      (this.invalidAppCheckTokenCount_++,
                      3 <= this.invalidAppCheckTokenCount_ &&
                        this.appCheckTokenProvider_.notifyForInvalidToken())
                }
                onSecurityDebugPacket_(e) {
                  this.securityDebugCallback_
                    ? this.securityDebugCallback_(e)
                    : 0 in e
                }
                restoreState_() {
                  this.tryAuth(), this.tryAppCheck()
                  for (const n of this.listens.values())
                    for (const t of n.values()) this.sendListen_(t)
                  for (let e = 0; e < this.outstandingPuts_.length; e++)
                    this.outstandingPuts_[e] && this.sendPut_(e)
                  for (; this.onDisconnectRequestQueue_.length; ) {
                    var e = this.onDisconnectRequestQueue_.shift()
                    this.sendOnDisconnect_(
                      e.action,
                      e.pathString,
                      e.data,
                      e.onComplete,
                    )
                  }
                  for (let e = 0; e < this.outstandingGets_.length; e++)
                    this.outstandingGets_[e] && this.sendGet_(e)
                }
                sendConnectStats_() {
                  const e = {}
                  let n = 'js'
                  ;(0, f.isNodeSdk)() &&
                    (n = this.repoInfo_.nodeAdmin ? 'admin_node' : 'node'),
                    (e['sdk.' + n + '.' + s.replace(/\./g, '-')] = 1),
                    (0, f.isMobileCordova)()
                      ? (e['framework.cordova'] = 1)
                      : (0, f.isReactNative)() &&
                        (e['framework.reactnative'] = 1),
                    this.reportStats(e)
                }
                shouldReconnect_() {
                  var e = ue.getInstance().currentlyOnline()
                  return (0, f.isEmpty)(this.interruptReasons_) && e
                }
              }
              ;(De.nextPersistentConnectionId_ = 0), (De.nextConnectionId_ = 0)
              class Ae {
                constructor(e, n) {
                  ;(this.name = e), (this.node = n)
                }
                static Wrap(e, n) {
                  return new Ae(e, n)
                }
              }
              class Me {
                getCompare() {
                  return this.compare.bind(this)
                }
                indexedValueChanged(e, n) {
                  ;(e = new Ae(A, e)), (n = new Ae(A, n))
                  return 0 !== this.compare(e, n)
                }
                minPost() {
                  return Ae.MIN
                }
              }
              let Le
              class ze extends Me {
                static get __EMPTY_NODE() {
                  return Le
                }
                static set __EMPTY_NODE(e) {
                  Le = e
                }
                compare(e, n) {
                  return L(e.name, n.name)
                }
                isDefinedOn(e) {
                  throw (0, f.assertionError)(
                    'KeyIndex.isDefinedOn not expected to be called.',
                  )
                }
                indexedValueChanged(e, n) {
                  return !1
                }
                minPost() {
                  return Ae.MIN
                }
                maxPost() {
                  return new Ae(M, Le)
                }
                makePost(e, n) {
                  return (
                    (0, f.assert)(
                      'string' == typeof e,
                      'KeyIndex indexValue must always be a string.',
                    ),
                    new Ae(e, Le)
                  )
                }
                toString() {
                  return '.key'
                }
              }
              const je = new ze()
              class Fe {
                constructor(e, n, t, i, r = null) {
                  ;(this.isReverse_ = i),
                    (this.resultGenerator_ = r),
                    (this.nodeStack_ = [])
                  let o = 1
                  for (; !e.isEmpty(); )
                    if (((o = n ? t(e.key, n) : 1), i && (o *= -1), o < 0))
                      e = this.isReverse_ ? e.left : e.right
                    else {
                      if (0 === o) {
                        this.nodeStack_.push(e)
                        break
                      }
                      this.nodeStack_.push(e),
                        (e = this.isReverse_ ? e.right : e.left)
                    }
                }
                getNext() {
                  if (0 === this.nodeStack_.length) return null
                  let e = this.nodeStack_.pop(),
                    n
                  if (
                    ((n = this.resultGenerator_
                      ? this.resultGenerator_(e.key, e.value)
                      : { key: e.key, value: e.value }),
                    this.isReverse_)
                  )
                    for (e = e.left; !e.isEmpty(); )
                      this.nodeStack_.push(e), (e = e.right)
                  else
                    for (e = e.right; !e.isEmpty(); )
                      this.nodeStack_.push(e), (e = e.left)
                  return n
                }
                hasNext() {
                  return 0 < this.nodeStack_.length
                }
                peek() {
                  if (0 === this.nodeStack_.length) return null
                  var e = this.nodeStack_[this.nodeStack_.length - 1]
                  return this.resultGenerator_
                    ? this.resultGenerator_(e.key, e.value)
                    : { key: e.key, value: e.value }
                }
              }
              class qe {
                constructor(e, n, t, i, r) {
                  ;(this.key = e),
                    (this.value = n),
                    (this.color = null != t ? t : qe.RED),
                    (this.left = null != i ? i : Ue.EMPTY_NODE),
                    (this.right = null != r ? r : Ue.EMPTY_NODE)
                }
                copy(e, n, t, i, r) {
                  return new qe(
                    null != e ? e : this.key,
                    null != n ? n : this.value,
                    null != t ? t : this.color,
                    null != i ? i : this.left,
                    null != r ? r : this.right,
                  )
                }
                count() {
                  return this.left.count() + 1 + this.right.count()
                }
                isEmpty() {
                  return !1
                }
                inorderTraversal(e) {
                  return (
                    this.left.inorderTraversal(e) ||
                    !!e(this.key, this.value) ||
                    this.right.inorderTraversal(e)
                  )
                }
                reverseTraversal(e) {
                  return (
                    this.right.reverseTraversal(e) ||
                    e(this.key, this.value) ||
                    this.left.reverseTraversal(e)
                  )
                }
                min_() {
                  return this.left.isEmpty() ? this : this.left.min_()
                }
                minKey() {
                  return this.min_().key
                }
                maxKey() {
                  return this.right.isEmpty() ? this.key : this.right.maxKey()
                }
                insert(e, n, t) {
                  let i = this
                  var r = t(e, i.key)
                  return (
                    (i =
                      r < 0
                        ? i.copy(null, null, null, i.left.insert(e, n, t), null)
                        : 0 === r
                        ? i.copy(null, n, null, null, null)
                        : i.copy(
                            null,
                            null,
                            null,
                            null,
                            i.right.insert(e, n, t),
                          )),
                    i.fixUp_()
                  )
                }
                removeMin_() {
                  if (this.left.isEmpty()) return Ue.EMPTY_NODE
                  let e = this
                  return (
                    e.left.isRed_() ||
                      e.left.left.isRed_() ||
                      (e = e.moveRedLeft_()),
                    (e = e.copy(null, null, null, e.left.removeMin_(), null)),
                    e.fixUp_()
                  )
                }
                remove(e, n) {
                  let t, i
                  if (((t = this), n(e, t.key) < 0))
                    t.left.isEmpty() ||
                      t.left.isRed_() ||
                      t.left.left.isRed_() ||
                      (t = t.moveRedLeft_()),
                      (t = t.copy(null, null, null, t.left.remove(e, n), null))
                  else {
                    if (
                      (t.left.isRed_() && (t = t.rotateRight_()),
                      t.right.isEmpty() ||
                        t.right.isRed_() ||
                        t.right.left.isRed_() ||
                        (t = t.moveRedRight_()),
                      0 === n(e, t.key))
                    ) {
                      if (t.right.isEmpty()) return Ue.EMPTY_NODE
                      ;(i = t.right.min_()),
                        (t = t.copy(
                          i.key,
                          i.value,
                          null,
                          null,
                          t.right.removeMin_(),
                        ))
                    }
                    t = t.copy(null, null, null, null, t.right.remove(e, n))
                  }
                  return t.fixUp_()
                }
                isRed_() {
                  return this.color
                }
                fixUp_() {
                  let e = this
                  return (
                    e.right.isRed_() &&
                      !e.left.isRed_() &&
                      (e = e.rotateLeft_()),
                    e.left.isRed_() &&
                      e.left.left.isRed_() &&
                      (e = e.rotateRight_()),
                    e.left.isRed_() && e.right.isRed_() && (e = e.colorFlip_()),
                    e
                  )
                }
                moveRedLeft_() {
                  let e = this.colorFlip_()
                  return (
                    e.right.left.isRed_() &&
                      ((e = e.copy(
                        null,
                        null,
                        null,
                        null,
                        e.right.rotateRight_(),
                      )),
                      (e = e.rotateLeft_()),
                      (e = e.colorFlip_())),
                    e
                  )
                }
                moveRedRight_() {
                  let e = this.colorFlip_()
                  return (
                    e.left.left.isRed_() &&
                      ((e = e.rotateRight_()), (e = e.colorFlip_())),
                    e
                  )
                }
                rotateLeft_() {
                  var e = this.copy(null, null, qe.RED, null, this.right.left)
                  return this.right.copy(null, null, this.color, e, null)
                }
                rotateRight_() {
                  var e = this.copy(null, null, qe.RED, this.left.right, null)
                  return this.left.copy(null, null, this.color, null, e)
                }
                colorFlip_() {
                  var e = this.left.copy(
                      null,
                      null,
                      !this.left.color,
                      null,
                      null,
                    ),
                    n = this.right.copy(
                      null,
                      null,
                      !this.right.color,
                      null,
                      null,
                    )
                  return this.copy(null, null, !this.color, e, n)
                }
                checkMaxDepth_() {
                  var e = this.check_()
                  return Math.pow(2, e) <= this.count() + 1
                }
                check_() {
                  if (this.isRed_() && this.left.isRed_())
                    throw new Error(
                      'Red node has red child(' +
                        this.key +
                        ',' +
                        this.value +
                        ')',
                    )
                  if (this.right.isRed_())
                    throw new Error(
                      'Right child of (' +
                        this.key +
                        ',' +
                        this.value +
                        ') is red',
                    )
                  var e = this.left.check_()
                  if (e !== this.right.check_())
                    throw new Error('Black depths differ')
                  return e + (this.isRed_() ? 0 : 1)
                }
              }
              ;(qe.RED = !0), (qe.BLACK = !1)
              class Ue {
                constructor(e, n = Ue.EMPTY_NODE) {
                  ;(this.comparator_ = e), (this.root_ = n)
                }
                insert(e, n) {
                  return new Ue(
                    this.comparator_,
                    this.root_
                      .insert(e, n, this.comparator_)
                      .copy(null, null, qe.BLACK, null, null),
                  )
                }
                remove(e) {
                  return new Ue(
                    this.comparator_,
                    this.root_
                      .remove(e, this.comparator_)
                      .copy(null, null, qe.BLACK, null, null),
                  )
                }
                get(e) {
                  var n
                  let t = this.root_
                  for (; !t.isEmpty(); ) {
                    if (0 === (n = this.comparator_(e, t.key))) return t.value
                    n < 0 ? (t = t.left) : 0 < n && (t = t.right)
                  }
                  return null
                }
                getPredecessorKey(e) {
                  let n,
                    t = this.root_,
                    i = null
                  for (; !t.isEmpty(); ) {
                    if (0 === (n = this.comparator_(e, t.key))) {
                      if (t.left.isEmpty()) return i ? i.key : null
                      for (t = t.left; !t.right.isEmpty(); ) t = t.right
                      return t.key
                    }
                    n < 0 ? (t = t.left) : 0 < n && ((i = t), (t = t.right))
                  }
                  throw new Error(
                    'Attempted to find predecessor key for a nonexistent key.  What gives?',
                  )
                }
                isEmpty() {
                  return this.root_.isEmpty()
                }
                count() {
                  return this.root_.count()
                }
                minKey() {
                  return this.root_.minKey()
                }
                maxKey() {
                  return this.root_.maxKey()
                }
                inorderTraversal(e) {
                  return this.root_.inorderTraversal(e)
                }
                reverseTraversal(e) {
                  return this.root_.reverseTraversal(e)
                }
                getIterator(e) {
                  return new Fe(this.root_, null, this.comparator_, !1, e)
                }
                getIteratorFrom(e, n) {
                  return new Fe(this.root_, e, this.comparator_, !1, n)
                }
                getReverseIteratorFrom(e, n) {
                  return new Fe(this.root_, e, this.comparator_, !0, n)
                }
                getReverseIterator(e) {
                  return new Fe(this.root_, null, this.comparator_, !0, e)
                }
              }
              function We(e, n) {
                return L(e.name, n.name)
              }
              function Be(e, n) {
                return L(e, n)
              }
              Ue.EMPTY_NODE = new (class {
                copy(e, n, t, i, r) {
                  return this
                }
                insert(e, n, t) {
                  return new qe(e, n, null)
                }
                remove(e, n) {
                  return this
                }
                count() {
                  return 0
                }
                isEmpty() {
                  return !0
                }
                inorderTraversal(e) {
                  return !1
                }
                reverseTraversal(e) {
                  return !1
                }
                minKey() {
                  return null
                }
                maxKey() {
                  return null
                }
                check_() {
                  return 0
                }
                isRed_() {
                  return !1
                }
              })()
              let He
              function Ve(e) {
                return 'number' == typeof e ? 'number:' + j(e) : 'string:' + e
              }
              function Ye(e) {
                var n
                e.isLeafNode()
                  ? ((n = e.val()),
                    (0, f.assert)(
                      'string' == typeof n ||
                        'number' == typeof n ||
                        ('object' == typeof n && (0, f.contains)(n, '.sv')),
                      'Priority must be a string or number.',
                    ))
                  : (0, f.assert)(
                      e === He || e.isEmpty(),
                      'priority of unexpected type.',
                    ),
                  (0, f.assert)(
                    e === He || e.getPriority().isEmpty(),
                    "Priority nodes can't have a priority of their own.",
                  )
              }
              let Ge
              class $e {
                constructor(e, n = $e.__childrenNodeConstructor.EMPTY_NODE) {
                  ;(this.value_ = e),
                    (this.priorityNode_ = n),
                    ((this.lazyHash_ = null), f.assert)(
                      void 0 !== this.value_ && null !== this.value_,
                      "LeafNode shouldn't be created with null/undefined value.",
                    ),
                    Ye(this.priorityNode_)
                }
                static set __childrenNodeConstructor(e) {
                  Ge = e
                }
                static get __childrenNodeConstructor() {
                  return Ge
                }
                isLeafNode() {
                  return !0
                }
                getPriority() {
                  return this.priorityNode_
                }
                updatePriority(e) {
                  return new $e(this.value_, e)
                }
                getImmediateChild(e) {
                  return '.priority' === e
                    ? this.priorityNode_
                    : $e.__childrenNodeConstructor.EMPTY_NODE
                }
                getChild(e) {
                  return Ce(e)
                    ? this
                    : '.priority' === be(e)
                    ? this.priorityNode_
                    : $e.__childrenNodeConstructor.EMPTY_NODE
                }
                hasChild() {
                  return !1
                }
                getPredecessorChildName(e, n) {
                  return null
                }
                updateImmediateChild(e, n) {
                  return '.priority' === e
                    ? this.updatePriority(n)
                    : n.isEmpty() && '.priority' !== e
                    ? this
                    : $e.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(
                        e,
                        n,
                      ).updatePriority(this.priorityNode_)
                }
                updateChild(e, n) {
                  var t = be(e)
                  return null === t
                    ? n
                    : n.isEmpty() && '.priority' !== t
                    ? this
                    : ((0, f.assert)(
                        '.priority' !== t || 1 === _e(e),
                        '.priority must be the last token in a path',
                      ),
                      this.updateImmediateChild(
                        t,
                        $e.__childrenNodeConstructor.EMPTY_NODE.updateChild(
                          ye(e),
                          n,
                        ),
                      ))
                }
                isEmpty() {
                  return !1
                }
                numChildren() {
                  return 0
                }
                forEachChild(e, n) {
                  return !1
                }
                val(e) {
                  return e && !this.getPriority().isEmpty()
                    ? {
                        '.value': this.getValue(),
                        '.priority': this.getPriority().val(),
                      }
                    : this.getValue()
                }
                hash() {
                  if (null === this.lazyHash_) {
                    let e = ''
                    this.priorityNode_.isEmpty() ||
                      (e += 'priority:' + Ve(this.priorityNode_.val()) + ':')
                    var n = typeof this.value_
                    ;(e += n + ':'),
                      (e += 'number' == n ? j(this.value_) : this.value_),
                      (this.lazyHash_ = g(e))
                  }
                  return this.lazyHash_
                }
                getValue() {
                  return this.value_
                }
                compareTo(e) {
                  return e === $e.__childrenNodeConstructor.EMPTY_NODE
                    ? 1
                    : e instanceof $e.__childrenNodeConstructor
                    ? -1
                    : ((0, f.assert)(e.isLeafNode(), 'Unknown node type'),
                      this.compareToLeafNode_(e))
                }
                compareToLeafNode_(e) {
                  var n = typeof e.value_,
                    t = typeof this.value_,
                    i = $e.VALUE_TYPE_ORDER.indexOf(n),
                    r = $e.VALUE_TYPE_ORDER.indexOf(t)
                  return (
                    (0, f.assert)(0 <= i, 'Unknown leaf type: ' + n),
                    (0, f.assert)(0 <= r, 'Unknown leaf type: ' + t),
                    i === r
                      ? 'object' == t
                        ? 0
                        : this.value_ < e.value_
                        ? -1
                        : this.value_ === e.value_
                        ? 0
                        : 1
                      : r - i
                  )
                }
                withIndex() {
                  return this
                }
                isIndexed() {
                  return !0
                }
                equals(e) {
                  return (
                    e === this ||
                    (!!e.isLeafNode() &&
                      this.value_ === e.value_ &&
                      this.priorityNode_.equals(e.priorityNode_))
                  )
                }
              }
              $e.VALUE_TYPE_ORDER = ['object', 'boolean', 'number', 'string']
              let Qe, Ke
              const Xe = new (class extends Me {
                  compare(e, n) {
                    const t = e.node.getPriority()
                    var i = n.node.getPriority(),
                      i = t.compareTo(i)
                    return 0 === i ? L(e.name, n.name) : i
                  }
                  isDefinedOn(e) {
                    return !e.getPriority().isEmpty()
                  }
                  indexedValueChanged(e, n) {
                    return !e.getPriority().equals(n.getPriority())
                  }
                  minPost() {
                    return Ae.MIN
                  }
                  maxPost() {
                    return new Ae(M, new $e('[PRIORITY-POST]', Ke))
                  }
                  makePost(e, n) {
                    e = Qe(e)
                    return new Ae(n, new $e('[PRIORITY-POST]', e))
                  }
                  toString() {
                    return '.priority'
                  }
                })(),
                Je = Math.log(2)
              class Ze {
                constructor(e) {
                  var n
                  ;(this.count = ((n = e + 1), parseInt(Math.log(n) / Je, 10))),
                    (this.current_ = this.count - 1)
                  var t,
                    i = ((t = this.count), parseInt(Array(t + 1).join('1'), 2))
                  this.bits_ = (e + 1) & i
                }
                nextBitIsOne() {
                  var e = !(this.bits_ & (1 << this.current_))
                  return this.current_--, e
                }
              }
              function en(l, e, c, n) {
                l.sort(e)
                const h = function (e, n) {
                  var t = n - e
                  let i, r
                  if (0 == t) return null
                  if (1 == t)
                    return (
                      (i = l[e]),
                      (r = c ? c(i) : i),
                      new qe(r, i.node, qe.BLACK, null, null)
                    )
                  ;(t = parseInt(t / 2, 10) + e),
                    (e = h(e, t)),
                    (n = h(t + 1, n))
                  return (
                    (i = l[t]),
                    (r = c ? c(i) : i),
                    new qe(r, i.node, qe.BLACK, e, n)
                  )
                }
                var t = (function (n) {
                  let r = null,
                    o = null,
                    a = l.length
                  function t(e, n) {
                    var t = a - e,
                      i = a
                    ;(a -= e),
                      (e = h(1 + t, i)),
                      (i = l[t]),
                      (t = c ? c(i) : i),
                      (function (e) {
                        if (r) {
                          r.left = e
                          r = e
                        } else {
                          o = e
                          r = e
                        }
                      })(new qe(t, i.node, n, null, e))
                  }
                  for (let e = 0; e < n.count; ++e) {
                    var i = n.nextBitIsOne(),
                      s = Math.pow(2, n.count - (e + 1))
                    i ? t(s, qe.BLACK) : (t(s, qe.BLACK), t(s, qe.RED))
                  }
                  return o
                })(new Ze(l.length))
                return new Ue(n || e, t)
              }
              let nn
              const tn = {}
              class rn {
                constructor(e, n) {
                  ;(this.indexes_ = e), (this.indexSet_ = n)
                }
                static get Default() {
                  return (
                    (0, f.assert)(
                      (tn, Xe),
                      'ChildrenNode.ts has not been loaded',
                    ),
                    (nn =
                      nn || new rn({ '.priority': tn }, { '.priority': Xe })),
                    nn
                  )
                }
                get(e) {
                  var n = (0, f.safeGet)(this.indexes_, e)
                  if (!n) throw new Error('No index defined for ' + e)
                  return n instanceof Ue ? n : null
                }
                hasIndex(e) {
                  return (0, f.contains)(this.indexSet_, e.toString())
                }
                addIndex(e, n) {
                  ;(0, f.assert)(
                    e !== je,
                    "KeyIndex always exists and isn't meant to be added to the IndexMap.",
                  )
                  const t = []
                  let i = !1
                  const r = n.getIterator(Ae.Wrap)
                  let o = r.getNext()
                  for (; o; )
                    (i = i || e.isDefinedOn(o.node)),
                      t.push(o),
                      (o = r.getNext())
                  let a
                  a = i ? en(t, e.getCompare()) : tn
                  n = e.toString()
                  const s = Object.assign({}, this.indexSet_)
                  s[n] = e
                  const l = Object.assign({}, this.indexes_)
                  return (l[n] = a), new rn(l, s)
                }
                addToIndexes(a, s) {
                  var e = (0, f.map)(this.indexes_, (n, t) => {
                    const i = (0, f.safeGet)(this.indexSet_, t)
                    if (
                      ((0, f.assert)(
                        i,
                        'Missing index implementation for ' + t,
                      ),
                      n === tn)
                    ) {
                      if (i.isDefinedOn(a.node)) {
                        const r = [],
                          o = s.getIterator(Ae.Wrap)
                        let e = o.getNext()
                        for (; e; )
                          e.name !== a.name && r.push(e), (e = o.getNext())
                        return r.push(a), en(r, i.getCompare())
                      }
                      return tn
                    }
                    {
                      t = s.get(a.name)
                      let e = n
                      return (
                        t && (e = e.remove(new Ae(a.name, t))),
                        e.insert(a, a.node)
                      )
                    }
                  })
                  return new rn(e, this.indexSet_)
                }
                removeFromIndexes(t, i) {
                  var e = (0, f.map)(this.indexes_, (e) => {
                    if (e === tn) return e
                    var n = i.get(t.name)
                    return n ? e.remove(new Ae(t.name, n)) : e
                  })
                  return new rn(e, this.indexSet_)
                }
              }
              let on
              class an {
                constructor(e, n, t) {
                  ;(this.children_ = e),
                    (this.priorityNode_ = n),
                    (this.indexMap_ = t),
                    (this.lazyHash_ = null),
                    this.priorityNode_ && Ye(this.priorityNode_),
                    this.children_.isEmpty() &&
                      (0, f.assert)(
                        !this.priorityNode_ || this.priorityNode_.isEmpty(),
                        'An empty node cannot have a priority',
                      )
                }
                static get EMPTY_NODE() {
                  return (on = on || new an(new Ue(Be), null, rn.Default))
                }
                isLeafNode() {
                  return !1
                }
                getPriority() {
                  return this.priorityNode_ || on
                }
                updatePriority(e) {
                  return this.children_.isEmpty()
                    ? this
                    : new an(this.children_, e, this.indexMap_)
                }
                getImmediateChild(e) {
                  if ('.priority' === e) return this.getPriority()
                  e = this.children_.get(e)
                  return null === e ? on : e
                }
                getChild(e) {
                  var n = be(e)
                  return null === n
                    ? this
                    : this.getImmediateChild(n).getChild(ye(e))
                }
                hasChild(e) {
                  return null !== this.children_.get(e)
                }
                updateImmediateChild(t, i) {
                  if (
                    ((0, f.assert)(
                      i,
                      'We should always be passing snapshot nodes',
                    ),
                    '.priority' === t)
                  )
                    return this.updatePriority(i)
                  {
                    var r = new Ae(t, i)
                    let e, n
                    n = i.isEmpty()
                      ? ((e = this.children_.remove(t)),
                        this.indexMap_.removeFromIndexes(r, this.children_))
                      : ((e = this.children_.insert(t, i)),
                        this.indexMap_.addToIndexes(r, this.children_))
                    r = e.isEmpty() ? on : this.priorityNode_
                    return new an(e, r, n)
                  }
                }
                updateChild(e, n) {
                  var t = be(e)
                  if (null === t) return n
                  ;(0, f.assert)(
                    '.priority' !== be(e) || 1 === _e(e),
                    '.priority must be the last token in a path',
                  )
                  n = this.getImmediateChild(t).updateChild(ye(e), n)
                  return this.updateImmediateChild(t, n)
                }
                isEmpty() {
                  return this.children_.isEmpty()
                }
                numChildren() {
                  return this.children_.count()
                }
                val(t) {
                  if (this.isEmpty()) return null
                  const i = {}
                  let r = 0,
                    o = 0,
                    a = !0
                  if (
                    (this.forEachChild(Xe, (e, n) => {
                      ;(i[e] = n.val(t)),
                        r++,
                        a && an.INTEGER_REGEXP_.test(e)
                          ? (o = Math.max(o, Number(e)))
                          : (a = !1)
                    }),
                    !t && a && o < 2 * r)
                  ) {
                    const e = []
                    for (const n in i) e[n] = i[n]
                    return e
                  }
                  return (
                    t &&
                      !this.getPriority().isEmpty() &&
                      (i['.priority'] = this.getPriority().val()),
                    i
                  )
                }
                hash() {
                  if (null === this.lazyHash_) {
                    let t = ''
                    this.getPriority().isEmpty() ||
                      (t += 'priority:' + Ve(this.getPriority().val()) + ':'),
                      this.forEachChild(Xe, (e, n) => {
                        n = n.hash()
                        '' !== n && (t += ':' + e + ':' + n)
                      }),
                      (this.lazyHash_ = '' === t ? '' : g(t))
                  }
                  return this.lazyHash_
                }
                getPredecessorChildName(e, n, t) {
                  const i = this.resolveIndex_(t)
                  if (i) {
                    n = i.getPredecessorKey(new Ae(e, n))
                    return n ? n.name : null
                  }
                  return this.children_.getPredecessorKey(e)
                }
                getFirstChildName(e) {
                  const n = this.resolveIndex_(e)
                  if (n) {
                    e = n.minKey()
                    return e && e.name
                  }
                  return this.children_.minKey()
                }
                getFirstChild(e) {
                  e = this.getFirstChildName(e)
                  return e ? new Ae(e, this.children_.get(e)) : null
                }
                getLastChildName(e) {
                  const n = this.resolveIndex_(e)
                  if (n) {
                    e = n.maxKey()
                    return e && e.name
                  }
                  return this.children_.maxKey()
                }
                getLastChild(e) {
                  e = this.getLastChildName(e)
                  return e ? new Ae(e, this.children_.get(e)) : null
                }
                forEachChild(e, n) {
                  const t = this.resolveIndex_(e)
                  return t
                    ? t.inorderTraversal((e) => n(e.name, e.node))
                    : this.children_.inorderTraversal(n)
                }
                getIterator(e) {
                  return this.getIteratorFrom(e.minPost(), e)
                }
                getIteratorFrom(n, t) {
                  const e = this.resolveIndex_(t)
                  if (e) return e.getIteratorFrom(n, (e) => e)
                  {
                    const i = this.children_.getIteratorFrom(n.name, Ae.Wrap)
                    let e = i.peek()
                    for (; null != e && t.compare(e, n) < 0; )
                      i.getNext(), (e = i.peek())
                    return i
                  }
                }
                getReverseIterator(e) {
                  return this.getReverseIteratorFrom(e.maxPost(), e)
                }
                getReverseIteratorFrom(n, t) {
                  const e = this.resolveIndex_(t)
                  if (e) return e.getReverseIteratorFrom(n, (e) => e)
                  {
                    const i = this.children_.getReverseIteratorFrom(
                      n.name,
                      Ae.Wrap,
                    )
                    let e = i.peek()
                    for (; null != e && 0 < t.compare(e, n); )
                      i.getNext(), (e = i.peek())
                    return i
                  }
                }
                compareTo(e) {
                  return this.isEmpty()
                    ? e.isEmpty()
                      ? 0
                      : -1
                    : e.isLeafNode() || e.isEmpty()
                    ? 1
                    : e === ln
                    ? -1
                    : 0
                }
                withIndex(e) {
                  if (e === je || this.indexMap_.hasIndex(e)) return this
                  e = this.indexMap_.addIndex(e, this.children_)
                  return new an(this.children_, this.priorityNode_, e)
                }
                isIndexed(e) {
                  return e === je || this.indexMap_.hasIndex(e)
                }
                equals(e) {
                  if (e === this) return !0
                  if (e.isLeafNode()) return !1
                  {
                    const t = e
                    if (this.getPriority().equals(t.getPriority())) {
                      if (this.children_.count() !== t.children_.count())
                        return !1
                      {
                        const i = this.getIterator(Xe),
                          r = t.getIterator(Xe)
                        let e = i.getNext(),
                          n = r.getNext()
                        for (; e && n; ) {
                          if (e.name !== n.name || !e.node.equals(n.node))
                            return !1
                          ;(e = i.getNext()), (n = r.getNext())
                        }
                        return null === e && null === n
                      }
                    }
                    return !1
                  }
                }
                resolveIndex_(e) {
                  return e === je ? null : this.indexMap_.get(e.toString())
                }
              }
              an.INTEGER_REGEXP_ = /^(0|[1-9]\d*)$/
              class sn extends an {
                constructor() {
                  super(new Ue(Be), an.EMPTY_NODE, rn.Default)
                }
                compareTo(e) {
                  return e === this ? 0 : 1
                }
                equals(e) {
                  return e === this
                }
                getPriority() {
                  return this
                }
                getImmediateChild(e) {
                  return an.EMPTY_NODE
                }
                isEmpty() {
                  return !1
                }
              }
              const ln = new sn()
              Object.defineProperties(Ae, {
                MIN: { value: new Ae(A, an.EMPTY_NODE) },
                MAX: { value: new Ae(M, ln) },
              }),
                (ze.__EMPTY_NODE = an.EMPTY_NODE),
                ($e.__childrenNodeConstructor = an),
                (l = ln),
                (He = l),
                (c = ln),
                (Ke = c)
              const cn = !0
              function hn(r, e = null) {
                if (null === r) return an.EMPTY_NODE
                if (
                  ('object' == typeof r &&
                    '.priority' in r &&
                    (e = r['.priority']),
                  (0, f.assert)(
                    null === e ||
                      'string' == typeof e ||
                      'number' == typeof e ||
                      ('object' == typeof e && '.sv' in e),
                    'Invalid priority type found: ' + typeof e,
                  ),
                  'object' !=
                    typeof (r =
                      'object' == typeof r &&
                      '.value' in r &&
                      null !== r['.value']
                        ? r['.value']
                        : r) || '.sv' in r)
                ) {
                  var n = r
                  return new $e(n, hn(e))
                }
                if (r instanceof Array || !cn) {
                  let i = an.EMPTY_NODE
                  return (
                    z(r, (e, n) => {
                      if ((0, f.contains)(r, e) && '.' !== e.substring(0, 1)) {
                        const t = hn(n)
                        ;(!t.isLeafNode() && t.isEmpty()) ||
                          (i = i.updateImmediateChild(e, t))
                      }
                    }),
                    i.updatePriority(hn(e))
                  )
                }
                {
                  const o = []
                  let i = !1
                  if (
                    (z(r, (e, n) => {
                      if ('.' !== e.substring(0, 1)) {
                        const t = hn(n)
                        t.isEmpty() ||
                          ((i = i || !t.getPriority().isEmpty()),
                          o.push(new Ae(e, t)))
                      }
                    }),
                    0 === o.length)
                  )
                    return an.EMPTY_NODE
                  var t = en(o, We, (e) => e.name, Be)
                  if (i) {
                    n = en(o, Xe.getCompare())
                    return new an(
                      t,
                      hn(e),
                      new rn({ '.priority': n }, { '.priority': Xe }),
                    )
                  }
                  return new an(t, hn(e), rn.Default)
                }
              }
              Qe = hn
              class dn extends Me {
                constructor(e) {
                  super(),
                    (this.indexPath_ = e),
                    (0, f.assert)(
                      !Ce(e) && '.priority' !== be(e),
                      "Can't create PathIndex with empty path or .priority key",
                    )
                }
                extractChild(e) {
                  return e.getChild(this.indexPath_)
                }
                isDefinedOn(e) {
                  return !e.getChild(this.indexPath_).isEmpty()
                }
                compare(e, n) {
                  const t = this.extractChild(e.node)
                  var i = this.extractChild(n.node),
                    i = t.compareTo(i)
                  return 0 === i ? L(e.name, n.name) : i
                }
                makePost(e, n) {
                  ;(e = hn(e)),
                    (e = an.EMPTY_NODE.updateChild(this.indexPath_, e))
                  return new Ae(n, e)
                }
                maxPost() {
                  var e = an.EMPTY_NODE.updateChild(this.indexPath_, ln)
                  return new Ae(M, e)
                }
                toString() {
                  return we(this.indexPath_, 0).join('/')
                }
              }
              function un(n) {
                if (n === '' + W) return mn
                var e = B(n)
                if (null != e) return '' + (e + 1)
                const t = new Array(n.length)
                for (let e = 0; e < t.length; e++) t[e] = n.charAt(e)
                if (t.length < _n) return t.push(mn), t.join('')
                let i = t.length - 1
                for (; 0 <= i && t[i] === bn; ) i--
                return -1 === i
                  ? M
                  : ((e = t[i]),
                    (e = gn.charAt(gn.indexOf(e) + 1)),
                    (t[i] = e),
                    t.slice(0, i + 1).join(''))
              }
              function pn(n) {
                if (n === '' + U) return A
                var e = B(n)
                if (null != e) return '' + (e - 1)
                const t = new Array(n.length)
                for (let e = 0; e < t.length; e++) t[e] = n.charAt(e)
                return t[t.length - 1] === mn
                  ? 1 === t.length
                    ? '' + W
                    : (delete t[t.length - 1], t.join(''))
                  : ((t[t.length - 1] = gn.charAt(
                      gn.indexOf(t[t.length - 1]) - 1,
                    )),
                    t.join('') + bn.repeat(_n - t.length))
              }
              const fn = new (class extends Me {
                  compare(e, n) {
                    var t = e.node.compareTo(n.node)
                    return 0 === t ? L(e.name, n.name) : t
                  }
                  isDefinedOn(e) {
                    return !0
                  }
                  indexedValueChanged(e, n) {
                    return !e.equals(n)
                  }
                  minPost() {
                    return Ae.MIN
                  }
                  maxPost() {
                    return Ae.MAX
                  }
                  makePost(e, n) {
                    e = hn(e)
                    return new Ae(n, e)
                  }
                  toString() {
                    return '.value'
                  }
                })(),
                gn =
                  '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz',
                mn = '-',
                bn = 'z',
                _n = 786,
                yn = (function () {
                  let o = 0
                  const a = []
                  return function (e) {
                    var n = e === o
                    o = e
                    let t
                    const i = new Array(8)
                    for (t = 7; 0 <= t; t--)
                      (i[t] = gn.charAt(e % 64)), (e = Math.floor(e / 64))
                    ;(0, f.assert)(0 === e, 'Cannot push at time == 0')
                    let r = i.join('')
                    if (n) {
                      for (t = 11; 0 <= t && 63 === a[t]; t--) a[t] = 0
                      a[t]++
                    } else
                      for (t = 0; t < 12; t++)
                        a[t] = Math.floor(64 * Math.random())
                    for (t = 0; t < 12; t++) r += gn.charAt(a[t])
                    return (
                      (0, f.assert)(
                        20 === r.length,
                        'nextPushId: Length should be 20.',
                      ),
                      r
                    )
                  }
                })()
              function vn(e) {
                return { type: 'value', snapshotNode: e }
              }
              function wn(e, n) {
                return { type: 'child_added', snapshotNode: n, childName: e }
              }
              function xn(e, n) {
                return { type: 'child_removed', snapshotNode: n, childName: e }
              }
              function kn(e, n, t) {
                return {
                  type: 'child_changed',
                  snapshotNode: n,
                  childName: e,
                  oldSnap: t,
                }
              }
              class Cn {
                constructor(e) {
                  this.index_ = e
                }
                updateChild(e, n, t, i, r, o) {
                  ;(0, f.assert)(
                    e.isIndexed(this.index_),
                    'A node must be indexed if only a child is updated',
                  )
                  const a = e.getImmediateChild(n)
                  return a.getChild(i).equals(t.getChild(i)) &&
                    a.isEmpty() === t.isEmpty()
                    ? e
                    : (null != o &&
                        (t.isEmpty()
                          ? e.hasChild(n)
                            ? o.trackChildChange(xn(n, a))
                            : (0, f.assert)(
                                e.isLeafNode(),
                                'A child remove without an old child only makes sense on a leaf node',
                              )
                          : a.isEmpty()
                          ? o.trackChildChange(wn(n, t))
                          : o.trackChildChange(kn(n, t, a))),
                      e.isLeafNode() && t.isEmpty()
                        ? e
                        : e.updateImmediateChild(n, t).withIndex(this.index_))
                }
                updateFullNode(i, t, r) {
                  return (
                    null != r &&
                      (i.isLeafNode() ||
                        i.forEachChild(Xe, (e, n) => {
                          t.hasChild(e) || r.trackChildChange(xn(e, n))
                        }),
                      t.isLeafNode() ||
                        t.forEachChild(Xe, (e, n) => {
                          if (i.hasChild(e)) {
                            const t = i.getImmediateChild(e)
                            t.equals(n) || r.trackChildChange(kn(e, n, t))
                          } else r.trackChildChange(wn(e, n))
                        })),
                    t.withIndex(this.index_)
                  )
                }
                updatePriority(e, n) {
                  return e.isEmpty() ? an.EMPTY_NODE : e.updatePriority(n)
                }
                filtersNodes() {
                  return !1
                }
                getIndexedFilter() {
                  return this
                }
                getIndex() {
                  return this.index_
                }
              }
              class En {
                constructor(e) {
                  ;(this.indexedFilter_ = new Cn(e.getIndex())),
                    (this.index_ = e.getIndex()),
                    (this.startPost_ = En.getStartPost_(e)),
                    (this.endPost_ = En.getEndPost_(e))
                }
                getStartPost() {
                  return this.startPost_
                }
                getEndPost() {
                  return this.endPost_
                }
                matches(e) {
                  return (
                    this.index_.compare(this.getStartPost(), e) <= 0 &&
                    this.index_.compare(e, this.getEndPost()) <= 0
                  )
                }
                updateChild(e, n, t, i, r, o) {
                  return (
                    this.matches(new Ae(n, t)) || (t = an.EMPTY_NODE),
                    this.indexedFilter_.updateChild(e, n, t, i, r, o)
                  )
                }
                updateFullNode(e, n, t) {
                  let i = (n = n.isLeafNode() ? an.EMPTY_NODE : n).withIndex(
                    this.index_,
                  )
                  i = i.updatePriority(an.EMPTY_NODE)
                  const r = this
                  return (
                    n.forEachChild(Xe, (e, n) => {
                      r.matches(new Ae(e, n)) ||
                        (i = i.updateImmediateChild(e, an.EMPTY_NODE))
                    }),
                    this.indexedFilter_.updateFullNode(e, i, t)
                  )
                }
                updatePriority(e, n) {
                  return e
                }
                filtersNodes() {
                  return !0
                }
                getIndexedFilter() {
                  return this.indexedFilter_
                }
                getIndex() {
                  return this.index_
                }
                static getStartPost_(e) {
                  if (e.hasStart()) {
                    var n = e.getIndexStartName()
                    return e.getIndex().makePost(e.getIndexStartValue(), n)
                  }
                  return e.getIndex().minPost()
                }
                static getEndPost_(e) {
                  if (e.hasEnd()) {
                    var n = e.getIndexEndName()
                    return e.getIndex().makePost(e.getIndexEndValue(), n)
                  }
                  return e.getIndex().maxPost()
                }
              }
              class In {
                constructor(e) {
                  ;(this.rangedFilter_ = new En(e)),
                    (this.index_ = e.getIndex()),
                    (this.limit_ = e.getLimit()),
                    (this.reverse_ = !e.isViewFromLeft())
                }
                updateChild(e, n, t, i, r, o) {
                  return (
                    this.rangedFilter_.matches(new Ae(n, t)) ||
                      (t = an.EMPTY_NODE),
                    e.getImmediateChild(n).equals(t)
                      ? e
                      : e.numChildren() < this.limit_
                      ? this.rangedFilter_
                          .getIndexedFilter()
                          .updateChild(e, n, t, i, r, o)
                      : this.fullLimitUpdateChild_(e, n, t, r, o)
                  )
                }
                updateFullNode(e, a, n) {
                  let s
                  if (a.isLeafNode() || a.isEmpty())
                    s = an.EMPTY_NODE.withIndex(this.index_)
                  else if (
                    2 * this.limit_ < a.numChildren() &&
                    a.isIndexed(this.index_)
                  ) {
                    s = an.EMPTY_NODE.withIndex(this.index_)
                    let n
                    n = this.reverse_
                      ? a.getReverseIteratorFrom(
                          this.rangedFilter_.getEndPost(),
                          this.index_,
                        )
                      : a.getIteratorFrom(
                          this.rangedFilter_.getStartPost(),
                          this.index_,
                        )
                    let t = 0
                    for (; n.hasNext() && t < this.limit_; ) {
                      var i = n.getNext()
                      let e
                      if (
                        ((e = this.reverse_
                          ? this.index_.compare(
                              this.rangedFilter_.getStartPost(),
                              i,
                            ) <= 0
                          : this.index_.compare(
                              i,
                              this.rangedFilter_.getEndPost(),
                            ) <= 0),
                        !e)
                      )
                        break
                      ;(s = s.updateImmediateChild(i.name, i.node)), t++
                    }
                  } else {
                    ;(s = a.withIndex(this.index_)),
                      (s = s.updatePriority(an.EMPTY_NODE))
                    let e, n, t, i
                    if (this.reverse_) {
                      ;(i = s.getReverseIterator(this.index_)),
                        (e = this.rangedFilter_.getEndPost()),
                        (n = this.rangedFilter_.getStartPost())
                      const c = this.index_.getCompare()
                      t = (e, n) => c(n, e)
                    } else
                      (i = s.getIterator(this.index_)),
                        (e = this.rangedFilter_.getStartPost()),
                        (n = this.rangedFilter_.getEndPost()),
                        (t = this.index_.getCompare())
                    let r = 0,
                      o = !1
                    for (; i.hasNext(); ) {
                      var l = i.getNext()
                      !o && t(e, l) <= 0 && (o = !0),
                        o && r < this.limit_ && t(l, n) <= 0
                          ? r++
                          : (s = s.updateImmediateChild(l.name, an.EMPTY_NODE))
                    }
                  }
                  return this.rangedFilter_
                    .getIndexedFilter()
                    .updateFullNode(e, s, n)
                }
                updatePriority(e, n) {
                  return e
                }
                filtersNodes() {
                  return !0
                }
                getIndexedFilter() {
                  return this.rangedFilter_.getIndexedFilter()
                }
                getIndex() {
                  return this.index_
                }
                fullLimitUpdateChild_(e, n, t, i, r) {
                  let o
                  if (this.reverse_) {
                    const u = this.index_.getCompare()
                    o = (e, n) => u(n, e)
                  } else o = this.index_.getCompare()
                  const a = e
                  ;(0, f.assert)(a.numChildren() === this.limit_, '')
                  var s = new Ae(n, t),
                    l = this.reverse_
                      ? a.getFirstChild(this.index_)
                      : a.getLastChild(this.index_),
                    c = this.rangedFilter_.matches(s)
                  if (a.hasChild(n)) {
                    var h = a.getImmediateChild(n)
                    let e = i.getChildAfterChild(this.index_, l, this.reverse_)
                    for (; null != e && (e.name === n || a.hasChild(e.name)); )
                      e = i.getChildAfterChild(this.index_, e, this.reverse_)
                    var d = null == e ? 1 : o(e, s)
                    if (c && !t.isEmpty() && 0 <= d)
                      return (
                        null != r && r.trackChildChange(kn(n, t, h)),
                        a.updateImmediateChild(n, t)
                      )
                    {
                      null != r && r.trackChildChange(xn(n, h))
                      const p = a.updateImmediateChild(n, an.EMPTY_NODE)
                      return null != e && this.rangedFilter_.matches(e)
                        ? (null != r && r.trackChildChange(wn(e.name, e.node)),
                          p.updateImmediateChild(e.name, e.node))
                        : p
                    }
                  }
                  return !t.isEmpty() && c && 0 <= o(l, s)
                    ? (null != r &&
                        (r.trackChildChange(xn(l.name, l.node)),
                        r.trackChildChange(wn(n, t))),
                      a
                        .updateImmediateChild(n, t)
                        .updateImmediateChild(l.name, an.EMPTY_NODE))
                    : e
                }
              }
              class Tn {
                constructor() {
                  ;(this.limitSet_ = !1),
                    (this.startSet_ = !1),
                    (this.startNameSet_ = !1),
                    (this.startAfterSet_ = !1),
                    (this.endSet_ = !1),
                    (this.endNameSet_ = !1),
                    (this.endBeforeSet_ = !1),
                    (this.limit_ = 0),
                    (this.viewFrom_ = ''),
                    (this.indexStartValue_ = null),
                    (this.indexStartName_ = ''),
                    (this.indexEndValue_ = null),
                    (this.indexEndName_ = ''),
                    (this.index_ = Xe)
                }
                hasStart() {
                  return this.startSet_
                }
                hasStartAfter() {
                  return this.startAfterSet_
                }
                hasEndBefore() {
                  return this.endBeforeSet_
                }
                isViewFromLeft() {
                  return '' === this.viewFrom_
                    ? this.startSet_
                    : 'l' === this.viewFrom_
                }
                getIndexStartValue() {
                  return (
                    (0, f.assert)(
                      this.startSet_,
                      'Only valid if start has been set',
                    ),
                    this.indexStartValue_
                  )
                }
                getIndexStartName() {
                  return (
                    (0, f.assert)(
                      this.startSet_,
                      'Only valid if start has been set',
                    ),
                    this.startNameSet_ ? this.indexStartName_ : A
                  )
                }
                hasEnd() {
                  return this.endSet_
                }
                getIndexEndValue() {
                  return (
                    (0, f.assert)(
                      this.endSet_,
                      'Only valid if end has been set',
                    ),
                    this.indexEndValue_
                  )
                }
                getIndexEndName() {
                  return (
                    (0, f.assert)(
                      this.endSet_,
                      'Only valid if end has been set',
                    ),
                    this.endNameSet_ ? this.indexEndName_ : M
                  )
                }
                hasLimit() {
                  return this.limitSet_
                }
                hasAnchoredLimit() {
                  return this.limitSet_ && '' !== this.viewFrom_
                }
                getLimit() {
                  return (
                    (0, f.assert)(
                      this.limitSet_,
                      'Only valid if limit has been set',
                    ),
                    this.limit_
                  )
                }
                getIndex() {
                  return this.index_
                }
                loadsAllData() {
                  return !(this.startSet_ || this.endSet_ || this.limitSet_)
                }
                isDefault() {
                  return this.loadsAllData() && this.index_ === Xe
                }
                copy() {
                  const e = new Tn()
                  return (
                    (e.limitSet_ = this.limitSet_),
                    (e.limit_ = this.limit_),
                    (e.startSet_ = this.startSet_),
                    (e.indexStartValue_ = this.indexStartValue_),
                    (e.startNameSet_ = this.startNameSet_),
                    (e.indexStartName_ = this.indexStartName_),
                    (e.endSet_ = this.endSet_),
                    (e.indexEndValue_ = this.indexEndValue_),
                    (e.endNameSet_ = this.endNameSet_),
                    (e.indexEndName_ = this.indexEndName_),
                    (e.index_ = this.index_),
                    (e.viewFrom_ = this.viewFrom_),
                    e
                  )
                }
              }
              function Sn(e, n, t) {
                const i = e.copy()
                return (
                  (i.startSet_ = !0),
                  void 0 === n && (n = null),
                  (i.indexStartValue_ = n),
                  null != t
                    ? ((i.startNameSet_ = !0), (i.indexStartName_ = t))
                    : ((i.startNameSet_ = !1), (i.indexStartName_ = '')),
                  i
                )
              }
              function Pn(e, n, t) {
                const i = e.copy()
                return (
                  (i.endSet_ = !0),
                  void 0 === n && (n = null),
                  (i.indexEndValue_ = n),
                  void 0 !== t
                    ? ((i.endNameSet_ = !0), (i.indexEndName_ = t))
                    : ((i.endNameSet_ = !1), (i.indexEndName_ = '')),
                  i
                )
              }
              function Nn(e, n) {
                const t = e.copy()
                return (t.index_ = n), t
              }
              function Rn(e) {
                const n = {}
                if (e.isDefault()) return n
                let t
                return (
                  (t =
                    e.index_ === Xe
                      ? '$priority'
                      : e.index_ === fn
                      ? '$value'
                      : e.index_ === je
                      ? '$key'
                      : ((0, f.assert)(
                          e.index_ instanceof dn,
                          'Unrecognized index type!',
                        ),
                        e.index_.toString())),
                  (n.orderBy = (0, f.stringify)(t)),
                  e.startSet_ &&
                    ((n.startAt = (0, f.stringify)(e.indexStartValue_)),
                    e.startNameSet_ &&
                      (n.startAt += ',' + (0, f.stringify)(e.indexStartName_))),
                  e.endSet_ &&
                    ((n.endAt = (0, f.stringify)(e.indexEndValue_)),
                    e.endNameSet_ &&
                      (n.endAt += ',' + (0, f.stringify)(e.indexEndName_))),
                  e.limitSet_ &&
                    (e.isViewFromLeft()
                      ? (n.limitToFirst = e.limit_)
                      : (n.limitToLast = e.limit_)),
                  n
                )
              }
              function On(n) {
                const t = {}
                if (
                  (n.startSet_ &&
                    ((t.sp = n.indexStartValue_),
                    n.startNameSet_ && (t.sn = n.indexStartName_)),
                  n.endSet_ &&
                    ((t.ep = n.indexEndValue_),
                    n.endNameSet_ && (t.en = n.indexEndName_)),
                  n.limitSet_)
                ) {
                  t.l = n.limit_
                  let e = n.viewFrom_
                  '' === e && (e = n.isViewFromLeft() ? 'l' : 'r'), (t.vf = e)
                }
                return n.index_ !== Xe && (t.i = n.index_.toString()), t
              }
              fo._QueryParams = Tn
              class Dn extends he {
                constructor(e, n, t, i) {
                  super(),
                    (this.repoInfo_ = e),
                    (this.onDataUpdate_ = n),
                    (this.authTokenProvider_ = t),
                    (this.appCheckTokenProvider_ = i),
                    (this.log_ = k('p:rest:')),
                    (this.listens_ = {})
                }
                reportStats(e) {
                  throw new Error('Method not implemented.')
                }
                static getListenId_(e, n) {
                  return void 0 !== n
                    ? 'tag$' + n
                    : ((0, f.assert)(
                        e._queryParams.isDefault(),
                        "should have a tag if it's not a default query.",
                      ),
                      e._path.toString())
                }
                listen(e, n, i, r) {
                  const o = e._path.toString()
                  this.log_('Listen called for ' + o + ' ' + e._queryIdentifier)
                  const a = Dn.getListenId_(e, i),
                    s = {}
                  this.listens_[a] = s
                  e = Rn(e._queryParams)
                  this.restRequest_(o + '.json', e, (n, e) => {
                    let t = e
                    if (
                      (null === (n = 404 === n ? (t = null) : n) &&
                        this.onDataUpdate_(o, t, !1, i),
                      (0, f.safeGet)(this.listens_, a) === s)
                    ) {
                      let e
                      ;(e = n
                        ? 401 === n
                          ? 'permission_denied'
                          : 'rest_error:' + n
                        : 'ok'),
                        r(e, null)
                    }
                  })
                }
                unlisten(e, n) {
                  n = Dn.getListenId_(e, n)
                  delete this.listens_[n]
                }
                get(e) {
                  var n = Rn(e._queryParams)
                  const i = e._path.toString(),
                    r = new f.Deferred()
                  return (
                    this.restRequest_(i + '.json', n, (e, n) => {
                      let t = n
                      null === (e = 404 === e ? (t = null) : e)
                        ? (this.onDataUpdate_(i, t, !1, null), r.resolve(t))
                        : r.reject(new Error(t))
                    }),
                    r.promise
                  )
                }
                refreshAuthToken(e) {}
                restRequest_(r, o = {}, a) {
                  return (
                    (o.format = 'export'),
                    Promise.all([
                      this.authTokenProvider_.getToken(!1),
                      this.appCheckTokenProvider_.getToken(!1),
                    ]).then(([e, n]) => {
                      e && e.accessToken && (o.auth = e.accessToken),
                        n && n.token && (o.ac = n.token)
                      const t =
                        (this.repoInfo_.secure ? 'https://' : 'http://') +
                        this.repoInfo_.host +
                        r +
                        '?ns=' +
                        this.repoInfo_.namespace +
                        (0, f.querystring)(o)
                      this.log_('Sending REST request for ' + t)
                      const i = new XMLHttpRequest()
                      ;(i.onreadystatechange = () => {
                        if (a && 4 === i.readyState) {
                          this.log_(
                            'REST Response for ' + t + ' received. status:',
                            i.status,
                            'response:',
                            i.responseText,
                          )
                          let e = null
                          if (200 <= i.status && i.status < 300) {
                            try {
                              e = (0, f.jsonEval)(i.responseText)
                            } catch (e) {
                              O(
                                'Failed to parse JSON response for ' +
                                  t +
                                  ': ' +
                                  i.responseText,
                              )
                            }
                            a(null, e)
                          } else
                            401 !== i.status &&
                              404 !== i.status &&
                              O(
                                'Got unsuccessful REST response for ' +
                                  t +
                                  ' Status: ' +
                                  i.status,
                              ),
                              a(i.status)
                          a = null
                        }
                      }),
                        i.open('GET', t, !0),
                        i.send()
                    })
                  )
                }
              }
              class An {
                constructor() {
                  this.rootNode_ = an.EMPTY_NODE
                }
                getNode(e) {
                  return this.rootNode_.getChild(e)
                }
                updateSnapshot(e, n) {
                  this.rootNode_ = this.rootNode_.updateChild(e, n)
                }
              }
              function Mn() {
                return { value: null, children: new Map() }
              }
              function Ln(e, n, t) {
                var i
                Ce(n)
                  ? ((e.value = t), e.children.clear())
                  : null !== e.value
                  ? (e.value = e.value.updateChild(n, t))
                  : ((i = be(n)),
                    e.children.has(i) || e.children.set(i, Mn()),
                    Ln(e.children.get(i), (n = ye(n)), t))
              }
              function zn(e, t, i) {
                var r
                null !== e.value
                  ? i(t, e.value)
                  : ((r = (e, n) => {
                      zn(n, new ge(t.toString() + '/' + e), i)
                    }),
                    e.children.forEach((e, n) => {
                      r(n, e)
                    }))
              }
              class jn {
                constructor(e) {
                  ;(this.collection_ = e), (this.last_ = null)
                }
                get() {
                  var e = this.collection_.get()
                  const t = Object.assign({}, e)
                  return (
                    this.last_ &&
                      z(this.last_, (e, n) => {
                        t[e] = t[e] - n
                      }),
                    (this.last_ = e),
                    t
                  )
                }
              }
              class Fn {
                constructor(e, n) {
                  ;(this.server_ = n),
                    (this.statsToReport_ = {}),
                    (this.statsListener_ = new jn(e))
                  e = 1e4 + 2e4 * Math.random()
                  F(this.reportStats_.bind(this), Math.floor(e))
                }
                reportStats_() {
                  var e = this.statsListener_.get()
                  const t = {}
                  let i = !1
                  z(e, (e, n) => {
                    0 < n &&
                      (0, f.contains)(this.statsToReport_, e) &&
                      ((t[e] = n), (i = !0))
                  }),
                    i && this.server_.reportStats(t),
                    F(
                      this.reportStats_.bind(this),
                      Math.floor(2 * Math.random() * 3e5),
                    )
                }
              }
              function qn() {
                return {
                  fromUser: !0,
                  fromServer: !1,
                  queryId: null,
                  tagged: !1,
                }
              }
              function Un() {
                return {
                  fromUser: !1,
                  fromServer: !0,
                  queryId: null,
                  tagged: !1,
                }
              }
              function Wn(e) {
                return { fromUser: !1, fromServer: !0, queryId: e, tagged: !0 }
              }
              ;((p = h = h || {})[(p.OVERWRITE = 0)] = 'OVERWRITE'),
                (p[(p.MERGE = 1)] = 'MERGE'),
                (p[(p.ACK_USER_WRITE = 2)] = 'ACK_USER_WRITE'),
                (p[(p.LISTEN_COMPLETE = 3)] = 'LISTEN_COMPLETE')
              class Bn {
                constructor(e, n, t) {
                  ;(this.path = e),
                    (this.affectedTree = n),
                    (this.revert = t),
                    (this.type = h.ACK_USER_WRITE),
                    (this.source = qn())
                }
                operationForChild(e) {
                  if (Ce(this.path)) {
                    if (null != this.affectedTree.value)
                      return (
                        (0, f.assert)(
                          this.affectedTree.children.isEmpty(),
                          'affectedTree should not have overlapping affected paths.',
                        ),
                        this
                      )
                    var n = this.affectedTree.subtree(new ge(e))
                    return new Bn(me(), n, this.revert)
                  }
                  return (
                    (0, f.assert)(
                      be(this.path) === e,
                      'operationForChild called for unrelated child.',
                    ),
                    new Bn(ye(this.path), this.affectedTree, this.revert)
                  )
                }
              }
              class Hn {
                constructor(e, n) {
                  ;(this.source = e),
                    (this.path = n),
                    (this.type = h.LISTEN_COMPLETE)
                }
                operationForChild(e) {
                  return Ce(this.path)
                    ? new Hn(this.source, me())
                    : new Hn(this.source, ye(this.path))
                }
              }
              class Vn {
                constructor(e, n, t) {
                  ;(this.source = e),
                    (this.path = n),
                    (this.snap = t),
                    (this.type = h.OVERWRITE)
                }
                operationForChild(e) {
                  return Ce(this.path)
                    ? new Vn(this.source, me(), this.snap.getImmediateChild(e))
                    : new Vn(this.source, ye(this.path), this.snap)
                }
              }
              class Yn {
                constructor(e, n, t) {
                  ;(this.source = e),
                    (this.path = n),
                    (this.children = t),
                    (this.type = h.MERGE)
                }
                operationForChild(e) {
                  if (Ce(this.path)) {
                    const n = this.children.subtree(new ge(e))
                    return n.isEmpty()
                      ? null
                      : n.value
                      ? new Vn(this.source, me(), n.value)
                      : new Yn(this.source, me(), n)
                  }
                  return (
                    (0, f.assert)(
                      be(this.path) === e,
                      "Can't get a merge for a child not on the path of the operation",
                    ),
                    new Yn(this.source, ye(this.path), this.children)
                  )
                }
                toString() {
                  return (
                    'Operation(' +
                    this.path +
                    ': ' +
                    this.source.toString() +
                    ' merge: ' +
                    this.children.toString() +
                    ')'
                  )
                }
              }
              class Gn {
                constructor(e, n, t) {
                  ;(this.node_ = e),
                    (this.fullyInitialized_ = n),
                    (this.filtered_ = t)
                }
                isFullyInitialized() {
                  return this.fullyInitialized_
                }
                isFiltered() {
                  return this.filtered_
                }
                isCompleteForPath(e) {
                  if (Ce(e)) return this.isFullyInitialized() && !this.filtered_
                  e = be(e)
                  return this.isCompleteForChild(e)
                }
                isCompleteForChild(e) {
                  return (
                    (this.isFullyInitialized() && !this.filtered_) ||
                    this.node_.hasChild(e)
                  )
                }
                getNode() {
                  return this.node_
                }
              }
              class $n {
                constructor(e) {
                  ;(this.query_ = e),
                    (this.index_ = this.query_._queryParams.getIndex())
                }
              }
              function Qn(t, e, n, i) {
                var r = []
                const o = []
                return (
                  e.forEach((e) => {
                    var n
                    'child_changed' === e.type &&
                      t.index_.indexedValueChanged(e.oldSnap, e.snapshotNode) &&
                      o.push(
                        ((n = e.childName),
                        {
                          type: 'child_moved',
                          snapshotNode: e.snapshotNode,
                          childName: n,
                        }),
                      )
                  }),
                  Kn(t, r, 'child_removed', e, i, n),
                  Kn(t, r, 'child_added', e, i, n),
                  Kn(t, r, 'child_moved', o, i, n),
                  Kn(t, r, 'child_changed', e, i, n),
                  Kn(t, r, 'value', e, i, n),
                  r
                )
              }
              function Kn(o, a, n, e, s, l) {
                const t = e.filter((e) => e.type === n)
                t.sort((e, n) =>
                  (function (e, n, t) {
                    if (null == n.childName || null == t.childName)
                      throw (0, f.assertionError)(
                        'Should only compare child_ events.',
                      )
                    ;(n = new Ae(n.childName, n.snapshotNode)),
                      (t = new Ae(t.childName, t.snapshotNode))
                    return e.index_.compare(n, t)
                  })(o, e, n),
                ),
                  t.forEach((n) => {
                    const t =
                      ((e = o),
                      (r = l),
                      'value' === (i = n).type ||
                        'child_removed' === i.type ||
                        (i.prevName = r.getPredecessorChildName(
                          i.childName,
                          i.snapshotNode,
                          e.index_,
                        )),
                      i)
                    var e, i, r
                    s.forEach((e) => {
                      e.respondsTo(n.type) && a.push(e.createEvent(t, o.query_))
                    })
                  })
              }
              function Xn(e, n) {
                return { eventCache: e, serverCache: n }
              }
              function Jn(e, n, t, i) {
                return Xn(new Gn(n, t, i), e.serverCache)
              }
              function Zn(e, n, t, i) {
                return Xn(e.eventCache, new Gn(n, t, i))
              }
              function et(e) {
                return e.eventCache.isFullyInitialized()
                  ? e.eventCache.getNode()
                  : null
              }
              function nt(e) {
                return e.serverCache.isFullyInitialized()
                  ? e.serverCache.getNode()
                  : null
              }
              let tt
              class it {
                constructor(e, n = ((tt = tt || new Ue(E)), tt)) {
                  ;(this.value = e), (this.children = n)
                }
                static fromObject(e) {
                  let t = new it(null)
                  return (
                    z(e, (e, n) => {
                      t = t.set(new ge(e), n)
                    }),
                    t
                  )
                }
                isEmpty() {
                  return null === this.value && this.children.isEmpty()
                }
                findRootMostMatchingPathAndValue(e, n) {
                  if (null != this.value && n(this.value))
                    return { path: me(), value: this.value }
                  if (Ce(e)) return null
                  {
                    var t = be(e)
                    const i = this.children.get(t)
                    if (null === i) return null
                    n = i.findRootMostMatchingPathAndValue(ye(e), n)
                    return null == n
                      ? null
                      : { path: ke(new ge(t), n.path), value: n.value }
                  }
                }
                findRootMostValueAndPath(e) {
                  return this.findRootMostMatchingPathAndValue(e, () => !0)
                }
                subtree(e) {
                  if (Ce(e)) return this
                  {
                    var n = be(e)
                    const t = this.children.get(n)
                    return null !== t ? t.subtree(ye(e)) : new it(null)
                  }
                }
                set(e, n) {
                  if (Ce(e)) return new it(n, this.children)
                  {
                    var t = be(e)
                    const i = this.children.get(t) || new it(null)
                    ;(n = i.set(ye(e), n)), (n = this.children.insert(t, n))
                    return new it(this.value, n)
                  }
                }
                remove(n) {
                  if (Ce(n))
                    return this.children.isEmpty()
                      ? new it(null)
                      : new it(null, this.children)
                  {
                    var t = be(n)
                    const i = this.children.get(t)
                    if (i) {
                      const r = i.remove(ye(n))
                      let e
                      return (
                        (e = r.isEmpty()
                          ? this.children.remove(t)
                          : this.children.insert(t, r)),
                        null === this.value && e.isEmpty()
                          ? new it(null)
                          : new it(this.value, e)
                      )
                    }
                    return this
                  }
                }
                get(e) {
                  if (Ce(e)) return this.value
                  {
                    var n = be(e)
                    const t = this.children.get(n)
                    return t ? t.get(ye(e)) : null
                  }
                }
                setTree(n, t) {
                  if (Ce(n)) return t
                  {
                    var i = be(n)
                    const r = this.children.get(i) || new it(null),
                      o = r.setTree(ye(n), t)
                    let e
                    return (
                      (e = o.isEmpty()
                        ? this.children.remove(i)
                        : this.children.insert(i, o)),
                      new it(this.value, e)
                    )
                  }
                }
                fold(e) {
                  return this.fold_(me(), e)
                }
                fold_(t, i) {
                  const r = {}
                  return (
                    this.children.inorderTraversal((e, n) => {
                      r[e] = n.fold_(ke(t, e), i)
                    }),
                    i(t, this.value, r)
                  )
                }
                findOnPath(e, n) {
                  return this.findOnPath_(e, me(), n)
                }
                findOnPath_(e, n, t) {
                  var i = !!this.value && t(n, this.value)
                  if (i) return i
                  if (Ce(e)) return null
                  {
                    i = be(e)
                    const r = this.children.get(i)
                    return r ? r.findOnPath_(ye(e), ke(n, i), t) : null
                  }
                }
                foreachOnPath(e, n) {
                  return this.foreachOnPath_(e, me(), n)
                }
                foreachOnPath_(e, n, t) {
                  if (Ce(e)) return this
                  {
                    this.value && t(n, this.value)
                    var i = be(e)
                    const r = this.children.get(i)
                    return r
                      ? r.foreachOnPath_(ye(e), ke(n, i), t)
                      : new it(null)
                  }
                }
                foreach(e) {
                  this.foreach_(me(), e)
                }
                foreach_(t, i) {
                  this.children.inorderTraversal((e, n) => {
                    n.foreach_(ke(t, e), i)
                  }),
                    this.value && i(t, this.value)
                }
                foreachChild(t) {
                  this.children.inorderTraversal((e, n) => {
                    n.value && t(e, n.value)
                  })
                }
              }
              class rt {
                constructor(e) {
                  this.writeTree_ = e
                }
                static empty() {
                  return new rt(new it(null))
                }
              }
              function ot(n, t, i) {
                if (Ce(t)) return new rt(new it(i))
                var r = n.writeTree_.findRootMostValueAndPath(t)
                if (null != r) {
                  var o = r.path
                  let e = r.value
                  r = Ee(o, t)
                  return (
                    (e = e.updateChild(r, i)), new rt(n.writeTree_.set(o, e))
                  )
                }
                ;(i = new it(i)), (i = n.writeTree_.setTree(t, i))
                return new rt(i)
              }
              function at(e, t, n) {
                let i = e
                return (
                  z(n, (e, n) => {
                    i = ot(i, ke(t, e), n)
                  }),
                  i
                )
              }
              function st(e, n) {
                if (Ce(n)) return rt.empty()
                n = e.writeTree_.setTree(n, new it(null))
                return new rt(n)
              }
              function lt(e, n) {
                return null != ct(e, n)
              }
              function ct(e, n) {
                var t = e.writeTree_.findRootMostValueAndPath(n)
                return null != t
                  ? e.writeTree_.get(t.path).getChild(Ee(t.path, n))
                  : null
              }
              function ht(e) {
                const t = [],
                  n = e.writeTree_.value
                return (
                  null != n
                    ? n.isLeafNode() ||
                      n.forEachChild(Xe, (e, n) => {
                        t.push(new Ae(e, n))
                      })
                    : e.writeTree_.children.inorderTraversal((e, n) => {
                        null != n.value && t.push(new Ae(e, n.value))
                      }),
                  t
                )
              }
              function dt(e, n) {
                if (Ce(n)) return e
                var t = ct(e, n)
                return null != t
                  ? new rt(new it(t))
                  : new rt(e.writeTree_.subtree(n))
              }
              function ut(e) {
                return e.writeTree_.isEmpty()
              }
              function pt(e, n) {
                return (function i(r, e, o) {
                  {
                    if (null != e.value) return o.updateChild(r, e.value)
                    {
                      let t = null
                      return (
                        e.children.inorderTraversal((e, n) => {
                          '.priority' === e
                            ? ((0, f.assert)(
                                null !== n.value,
                                'Priority writes must always be leaf nodes',
                              ),
                              (t = n.value))
                            : (o = i(ke(r, e), n, o))
                        }),
                        (o =
                          !o.getChild(r).isEmpty() && null !== t
                            ? o.updateChild(ke(r, '.priority'), t)
                            : o)
                      )
                    }
                  }
                })(me(), e.writeTree_, n)
              }
              function ft(e, n) {
                return It(n, e)
              }
              function gt(n, t) {
                var e,
                  i = n.allWrites.findIndex((e) => e.writeId === t)
                ;(0, f.assert)(
                  0 <= i,
                  'removeWrite called with nonexistent writeId.',
                )
                const r = n.allWrites[i]
                n.allWrites.splice(i, 1)
                let o = r.visible,
                  a = !1,
                  s = n.allWrites.length - 1
                for (; o && 0 <= s; ) {
                  var l = n.allWrites[s]
                  l.visible &&
                    (s >= i &&
                    (function (e, n) {
                      {
                        if (e.snap) return Se(e.path, n)
                        for (const t in e.children)
                          if (
                            e.children.hasOwnProperty(t) &&
                            Se(ke(e.path, t), n)
                          )
                            return !0
                        return !1
                      }
                    })(l, r.path)
                      ? (o = !1)
                      : Se(r.path, l.path) && (a = !0)),
                    s--
                }
                return (
                  !!o &&
                  (a
                    ? (((e = n).visibleWrites = bt(e.allWrites, mt, me())),
                      0 < e.allWrites.length
                        ? (e.lastWriteId =
                            e.allWrites[e.allWrites.length - 1].writeId)
                        : (e.lastWriteId = -1))
                    : r.snap
                    ? (n.visibleWrites = st(n.visibleWrites, r.path))
                    : z(r.children, (e) => {
                        n.visibleWrites = st(n.visibleWrites, ke(r.path, e))
                      }),
                  !0)
                )
              }
              function mt(e) {
                return e.visible
              }
              function bt(n, t, i) {
                let r = rt.empty()
                for (let e = 0; e < n.length; ++e) {
                  const a = n[e]
                  if (t(a)) {
                    var o = a.path
                    let e
                    if (a.snap)
                      Se(i, o)
                        ? ((e = Ee(i, o)), (r = ot(r, e, a.snap)))
                        : Se(o, i) &&
                          ((e = Ee(o, i)),
                          (r = ot(r, me(), a.snap.getChild(e))))
                    else {
                      if (!a.children)
                        throw (0, f.assertionError)(
                          'WriteRecord should have .snap or .children',
                        )
                      if (Se(i, o)) (e = Ee(i, o)), (r = at(r, e, a.children))
                      else if (Se(o, i))
                        if (((e = Ee(o, i)), Ce(e))) r = at(r, me(), a.children)
                        else {
                          const s = (0, f.safeGet)(a.children, be(e))
                          s && ((o = s.getChild(ye(e))), (r = ot(r, me(), o)))
                        }
                    }
                  }
                }
                return r
              }
              function _t(e, n, t, i, r) {
                if (i || r) {
                  var o = dt(e.visibleWrites, n)
                  if (!r && ut(o)) return t
                  if (r || null != t || lt(o, me()))
                    return pt(
                      bt(
                        e.allWrites,
                        function (e) {
                          return (
                            (e.visible || r) &&
                            (!i || !~i.indexOf(e.writeId)) &&
                            (Se(e.path, n) || Se(n, e.path))
                          )
                        },
                        n,
                      ),
                      t || an.EMPTY_NODE,
                    )
                  return null
                }
                o = ct(e.visibleWrites, n)
                if (null != o) return o
                e = dt(e.visibleWrites, n)
                return ut(e)
                  ? t
                  : null != t || lt(e, me())
                  ? pt(e, t || an.EMPTY_NODE)
                  : null
              }
              function yt(e, n, t, i) {
                return _t(e.writeTree, e.treePath, n, t, i)
              }
              function vt(e, n) {
                return (function (e, n, t) {
                  let i = an.EMPTY_NODE
                  const r = ct(e.visibleWrites, n)
                  if (r)
                    return (
                      r.isLeafNode() ||
                        r.forEachChild(Xe, (e, n) => {
                          i = i.updateImmediateChild(e, n)
                        }),
                      i
                    )
                  if (t) {
                    const o = dt(e.visibleWrites, n)
                    return (
                      t.forEachChild(Xe, (e, n) => {
                        n = pt(dt(o, new ge(e)), n)
                        i = i.updateImmediateChild(e, n)
                      }),
                      ht(o).forEach((e) => {
                        i = i.updateImmediateChild(e.name, e.node)
                      }),
                      i
                    )
                  }
                  return (
                    ht(dt(e.visibleWrites, n)).forEach((e) => {
                      i = i.updateImmediateChild(e.name, e.node)
                    }),
                    i
                  )
                })(e.writeTree, e.treePath, n)
              }
              function wt(e, n, t, i) {
                return (
                  (r = e.writeTree),
                  (e = e.treePath),
                  (n = n),
                  (i = i),
                  (0, f.assert)(
                    t || i,
                    'Either existingEventSnap or existingServerSnap must exist',
                  ),
                  (e = ke(e, n)),
                  lt(r.visibleWrites, e)
                    ? null
                    : ut((e = dt(r.visibleWrites, e)))
                    ? i.getChild(n)
                    : pt(e, i.getChild(n))
                )
                var r
              }
              function xt(e, n) {
                return (
                  (t = e.writeTree),
                  (n = ke(e.treePath, n)),
                  ct(t.visibleWrites, n)
                )
                var t
              }
              function kt(e, n, t, i, r, o) {
                return (function (e, n, t, i, r, o, a) {
                  let s
                  if (((e = dt(e.visibleWrites, n)), null != (n = ct(e, me()))))
                    s = n
                  else {
                    if (null == t) return []
                    s = pt(e, t)
                  }
                  if (((s = s.withIndex(a)), s.isEmpty() || s.isLeafNode()))
                    return []
                  {
                    const l = [],
                      c = a.getCompare(),
                      h = o
                        ? s.getReverseIteratorFrom(i, a)
                        : s.getIteratorFrom(i, a)
                    let e = h.getNext()
                    for (; e && l.length < r; )
                      0 !== c(e, i) && l.push(e), (e = h.getNext())
                    return l
                  }
                })(e.writeTree, e.treePath, n, t, i, r, o)
              }
              function Ct(e, n, t) {
                return (
                  (i = e.writeTree),
                  (r = e.treePath),
                  (e = t),
                  (n = ke(r, (t = n))),
                  null != (r = ct(i.visibleWrites, n))
                    ? r
                    : e.isCompleteForChild(t)
                    ? pt(
                        dt(i.visibleWrites, n),
                        e.getNode().getImmediateChild(t),
                      )
                    : null
                )
                var i, r
              }
              function Et(e, n) {
                return It(ke(e.treePath, n), e.writeTree)
              }
              function It(e, n) {
                return { treePath: e, writeTree: n }
              }
              class Tt {
                constructor() {
                  this.changeMap = new Map()
                }
                trackChildChange(e) {
                  var n = e.type,
                    t = e.childName
                  ;(0, f.assert)(
                    'child_added' === n ||
                      'child_changed' === n ||
                      'child_removed' === n,
                    'Only child changes supported for tracking',
                  ),
                    (0, f.assert)(
                      '.priority' !== t,
                      'Only non-priority child changes can be tracked.',
                    )
                  var i = this.changeMap.get(t)
                  if (i) {
                    var r = i.type
                    if ('child_added' === n && 'child_removed' === r)
                      this.changeMap.set(
                        t,
                        kn(t, e.snapshotNode, i.snapshotNode),
                      )
                    else if ('child_removed' === n && 'child_added' === r)
                      this.changeMap.delete(t)
                    else if ('child_removed' === n && 'child_changed' === r)
                      this.changeMap.set(t, xn(t, i.oldSnap))
                    else if ('child_changed' === n && 'child_added' === r)
                      this.changeMap.set(t, wn(t, e.snapshotNode))
                    else {
                      if ('child_changed' !== n || 'child_changed' !== r)
                        throw (0, f.assertionError)(
                          'Illegal combination of changes: ' +
                            e +
                            ' occurred after ' +
                            i,
                        )
                      this.changeMap.set(t, kn(t, e.snapshotNode, i.oldSnap))
                    }
                  } else this.changeMap.set(t, e)
                }
                getChanges() {
                  return Array.from(this.changeMap.values())
                }
              }
              const St = new (class {
                getCompleteChild(e) {
                  return null
                }
                getChildAfterChild(e, n, t) {
                  return null
                }
              })()
              class Pt {
                constructor(e, n, t = null) {
                  ;(this.writes_ = e),
                    (this.viewCache_ = n),
                    (this.optCompleteServerCache_ = t)
                }
                getCompleteChild(e) {
                  const n = this.viewCache_.eventCache
                  if (n.isCompleteForChild(e))
                    return n.getNode().getImmediateChild(e)
                  var t =
                    null != this.optCompleteServerCache_
                      ? new Gn(this.optCompleteServerCache_, !0, !1)
                      : this.viewCache_.serverCache
                  return Ct(this.writes_, e, t)
                }
                getChildAfterChild(e, n, t) {
                  var i =
                      null != this.optCompleteServerCache_
                        ? this.optCompleteServerCache_
                        : nt(this.viewCache_),
                    e = kt(this.writes_, i, n, 1, t, e)
                  return 0 === e.length ? null : e[0]
                }
              }
              function Nt(e, n, t, i, r) {
                const o = new Tt()
                let a, s
                if (t.type === h.OVERWRITE) {
                  var l = t
                  a = l.source.fromUser
                    ? Dt(e, n, l.path, l.snap, i, r, o)
                    : ((0, f.assert)(l.source.fromServer, 'Unknown source.'),
                      (s =
                        l.source.tagged ||
                        (n.serverCache.isFiltered() && !Ce(l.path))),
                      Ot(e, n, l.path, l.snap, i, r, s, o))
                } else if (t.type === h.MERGE) {
                  var c = t
                  a = c.source.fromUser
                    ? (function (t, i, r, e, o, a, s) {
                        let l = i
                        return (
                          e.foreach((e, n) => {
                            e = ke(r, e)
                            At(i, be(e)) && (l = Dt(t, l, e, n, o, a, s))
                          }),
                          e.foreach((e, n) => {
                            e = ke(r, e)
                            At(i, be(e)) || (l = Dt(t, l, e, n, o, a, s))
                          }),
                          l
                        )
                      })(e, n, c.path, c.children, i, r, o)
                    : ((0, f.assert)(c.source.fromServer, 'Unknown source.'),
                      (s = c.source.tagged || n.serverCache.isFiltered()),
                      Lt(e, n, c.path, c.children, i, r, s, o))
                } else if (t.type === h.ACK_USER_WRITE) {
                  c = t
                  a = c.revert
                    ? (function (t, i, r, o, a, s) {
                        let l
                        {
                          if (null != xt(o, r)) return i
                          {
                            a = new Pt(o, i, a)
                            const h = i.eventCache.getNode()
                            let n
                            if (Ce(r) || '.priority' === be(r)) {
                              let e
                              ;(e = i.serverCache.isFullyInitialized()
                                ? yt(o, nt(i))
                                : ((c = i.serverCache.getNode()),
                                  (0, f.assert)(
                                    c instanceof an,
                                    'serverChildren would be complete if leaf node',
                                  ),
                                  vt(o, c))),
                                (e = e),
                                (n = t.filter.updateFullNode(h, e, s))
                            } else {
                              var c = be(r)
                              let e = Ct(o, c, i.serverCache)
                              null == e &&
                                i.serverCache.isCompleteForChild(c) &&
                                (e = h.getImmediateChild(c)),
                                (n =
                                  null != e
                                    ? t.filter.updateChild(h, c, e, ye(r), a, s)
                                    : i.eventCache.getNode().hasChild(c)
                                    ? t.filter.updateChild(
                                        h,
                                        c,
                                        an.EMPTY_NODE,
                                        ye(r),
                                        a,
                                        s,
                                      )
                                    : h),
                                n.isEmpty() &&
                                  i.serverCache.isFullyInitialized() &&
                                  ((l = yt(o, nt(i))),
                                  l.isLeafNode() &&
                                    (n = t.filter.updateFullNode(n, l, s)))
                            }
                            return (
                              (l =
                                i.serverCache.isFullyInitialized() ||
                                null != xt(o, me())),
                              Jn(i, n, l, t.filter.filtersNodes())
                            )
                          }
                        }
                      })(e, n, c.path, i, r, o)
                    : (function (e, n, r, t, o, a, s) {
                        if (null != xt(o, r)) return n
                        const l = n.serverCache.isFiltered(),
                          c = n.serverCache
                        {
                          if (null != t.value) {
                            if (
                              (Ce(r) && c.isFullyInitialized()) ||
                              c.isCompleteForPath(r)
                            )
                              return Ot(
                                e,
                                n,
                                r,
                                c.getNode().getChild(r),
                                o,
                                a,
                                l,
                                s,
                              )
                            if (Ce(r)) {
                              let t = new it(null)
                              return (
                                c.getNode().forEachChild(je, (e, n) => {
                                  t = t.set(new ge(e), n)
                                }),
                                Lt(e, n, r, t, o, a, l, s)
                              )
                            }
                            return n
                          }
                          {
                            let i = new it(null)
                            return (
                              t.foreach((e, n) => {
                                var t = ke(r, e)
                                c.isCompleteForPath(t) &&
                                  (i = i.set(e, c.getNode().getChild(t)))
                              }),
                              Lt(e, n, r, i, o, a, l, s)
                            )
                          }
                        }
                      })(e, n, c.path, c.affectedTree, i, r, o)
                } else {
                  if (t.type !== h.LISTEN_COMPLETE)
                    throw (0, f.assertionError)(
                      'Unknown operation type: ' + t.type,
                    )
                  a = (function (e, n, t, i, r) {
                    const o = n.serverCache,
                      a = Zn(
                        n,
                        o.getNode(),
                        o.isFullyInitialized() || Ce(t),
                        o.isFiltered(),
                      )
                    return Rt(e, a, t, i, St, r)
                  })(e, n, t.path, i, o)
                }
                i = o.getChanges()
                return (
                  (function (e, n, t) {
                    const i = n.eventCache
                    if (i.isFullyInitialized()) {
                      var r = i.getNode().isLeafNode() || i.getNode().isEmpty()
                      const o = et(e)
                      ;(0 < t.length ||
                        !e.eventCache.isFullyInitialized() ||
                        (r && !i.getNode().equals(o)) ||
                        !i.getNode().getPriority().equals(o.getPriority())) &&
                        t.push(vn(et(n)))
                    }
                  })(n, a, i),
                  { viewCache: a, changes: i }
                )
              }
              function Rt(i, r, o, a, s, l) {
                const c = r.eventCache
                if (null != xt(a, o)) return r
                {
                  let n, t
                  if (Ce(o)) {
                    var e
                    ;(0, f.assert)(
                      r.serverCache.isFullyInitialized(),
                      'If change path is empty, we must have complete server data',
                    ),
                      (n = r.serverCache.isFiltered()
                        ? ((e = vt(
                            a,
                            (e = nt(r)) instanceof an ? e : an.EMPTY_NODE,
                          )),
                          i.filter.updateFullNode(r.eventCache.getNode(), e, l))
                        : ((h = yt(a, nt(r))),
                          i.filter.updateFullNode(
                            r.eventCache.getNode(),
                            h,
                            l,
                          )))
                  } else {
                    var h = be(o)
                    if ('.priority' === h) {
                      ;(0, f.assert)(
                        1 === _e(o),
                        "Can't have a priority with additional path components",
                      )
                      var d = c.getNode()
                      t = r.serverCache.getNode()
                      var u = wt(a, o, d, t)
                      n =
                        null != u ? i.filter.updatePriority(d, u) : c.getNode()
                    } else {
                      d = ye(o)
                      let e
                      ;(e = c.isCompleteForChild(h)
                        ? ((t = r.serverCache.getNode()),
                          null != (u = wt(a, o, c.getNode(), t))
                            ? c.getNode().getImmediateChild(h).updateChild(d, u)
                            : c.getNode().getImmediateChild(h))
                        : Ct(a, h, r.serverCache)),
                        (n =
                          null != e
                            ? i.filter.updateChild(c.getNode(), h, e, d, s, l)
                            : c.getNode())
                    }
                  }
                  return Jn(
                    r,
                    n,
                    c.isFullyInitialized() || Ce(o),
                    i.filter.filtersNodes(),
                  )
                }
              }
              function Ot(e, n, t, i, r, o, a, s) {
                const l = n.serverCache
                let c
                const h = a ? e.filter : e.filter.getIndexedFilter()
                if (Ce(t)) c = h.updateFullNode(l.getNode(), i, null)
                else if (h.filtersNodes() && !l.isFiltered()) {
                  var d = l.getNode().updateChild(t, i)
                  c = h.updateFullNode(l.getNode(), d, null)
                } else {
                  a = be(t)
                  if (!l.isCompleteForPath(t) && 1 < _e(t)) return n
                  d = ye(t)
                  const u = l.getNode().getImmediateChild(a)
                  i = u.updateChild(d, i)
                  c =
                    '.priority' === a
                      ? h.updatePriority(l.getNode(), i)
                      : h.updateChild(l.getNode(), a, i, d, St, null)
                }
                n = Zn(n, c, l.isFullyInitialized() || Ce(t), h.filtersNodes())
                return Rt(e, n, t, r, new Pt(r, n, o), s)
              }
              function Dt(n, t, i, r, e, o, a) {
                const s = t.eventCache
                let l, c
                const h = new Pt(e, t, o)
                if (Ce(i))
                  (c = n.filter.updateFullNode(t.eventCache.getNode(), r, a)),
                    (l = Jn(t, c, !0, n.filter.filtersNodes()))
                else {
                  o = be(i)
                  if ('.priority' === o)
                    (c = n.filter.updatePriority(t.eventCache.getNode(), r)),
                      (l = Jn(t, c, s.isFullyInitialized(), s.isFiltered()))
                  else {
                    i = ye(i)
                    const d = s.getNode().getImmediateChild(o)
                    let e
                    if (Ce(i)) e = r
                    else {
                      const u = h.getCompleteChild(o)
                      e =
                        null != u
                          ? '.priority' === ve(i) && u.getChild(xe(i)).isEmpty()
                            ? u
                            : u.updateChild(i, r)
                          : an.EMPTY_NODE
                    }
                    l = d.equals(e)
                      ? t
                      : Jn(
                          t,
                          n.filter.updateChild(s.getNode(), o, e, i, h, a),
                          s.isFullyInitialized(),
                          n.filter.filtersNodes(),
                        )
                  }
                }
                return l
              }
              function At(e, n) {
                return e.eventCache.isCompleteForChild(n)
              }
              function Mt(e, t, n) {
                return (
                  n.foreach((e, n) => {
                    t = t.updateChild(e, n)
                  }),
                  t
                )
              }
              function Lt(i, r, e, n, o, a, s, l) {
                if (
                  r.serverCache.getNode().isEmpty() &&
                  !r.serverCache.isFullyInitialized()
                )
                  return r
                let c = r,
                  t
                t = Ce(e) ? n : new it(null).setTree(e, n)
                const h = r.serverCache.getNode()
                return (
                  t.children.inorderTraversal((e, n) => {
                    h.hasChild(e) &&
                      ((n = Mt(
                        0,
                        r.serverCache.getNode().getImmediateChild(e),
                        n,
                      )),
                      (c = Ot(i, c, new ge(e), n, o, a, s, l)))
                  }),
                  t.children.inorderTraversal((e, n) => {
                    var t =
                      !r.serverCache.isCompleteForChild(e) && void 0 === n.value
                    h.hasChild(e) ||
                      t ||
                      ((n = Mt(
                        0,
                        r.serverCache.getNode().getImmediateChild(e),
                        n,
                      )),
                      (c = Ot(i, c, new ge(e), n, o, a, s, l)))
                  }),
                  c
                )
              }
              class zt {
                constructor(e, n) {
                  ;(this.query_ = e), (this.eventRegistrations_ = [])
                  const t = this.query_._queryParams,
                    i = new Cn(t.getIndex()),
                    r = (e = t).loadsAllData()
                      ? new Cn(e.getIndex())
                      : new (e.hasLimit() ? In : En)(e)
                  this.processor_ = { filter: r }
                  const o = n.serverCache,
                    a = n.eventCache
                  ;(e = i.updateFullNode(an.EMPTY_NODE, o.getNode(), null)),
                    (n = r.updateFullNode(an.EMPTY_NODE, a.getNode(), null)),
                    (e = new Gn(e, o.isFullyInitialized(), i.filtersNodes())),
                    (n = new Gn(n, a.isFullyInitialized(), r.filtersNodes()))
                  ;(this.viewCache_ = Xn(n, e)),
                    (this.eventGenerator_ = new $n(this.query_))
                }
                get query() {
                  return this.query_
                }
              }
              function jt(e) {
                return 0 === e.eventRegistrations_.length
              }
              function Ft(t, i, n) {
                const r = []
                if (n) {
                  ;(0, f.assert)(
                    null == i,
                    'A cancel should cancel all event registrations.',
                  )
                  const o = t.query._path
                  t.eventRegistrations_.forEach((e) => {
                    e = e.createCancelEvent(n, o)
                    e && r.push(e)
                  })
                }
                if (i) {
                  let n = []
                  for (let e = 0; e < t.eventRegistrations_.length; ++e) {
                    const a = t.eventRegistrations_[e]
                    if (a.matches(i)) {
                      if (i.hasAnyCallback()) {
                        n = n.concat(t.eventRegistrations_.slice(e + 1))
                        break
                      }
                    } else n.push(a)
                  }
                  t.eventRegistrations_ = n
                } else t.eventRegistrations_ = []
                return r
              }
              function qt(e, n, t, i) {
                n.type === h.MERGE &&
                  null !== n.source.queryId &&
                  ((0, f.assert)(
                    nt(e.viewCache_),
                    'We should always have a full cache before handling merges',
                  ),
                  (0, f.assert)(
                    et(e.viewCache_),
                    'Missing event cache, even though we have a server cache',
                  ))
                const r = e.viewCache_,
                  o = Nt(e.processor_, r, n, t, i)
                return (
                  (t = e.processor_),
                  (i = o.viewCache),
                  (0, f.assert)(
                    i.eventCache.getNode().isIndexed(t.filter.getIndex()),
                    'Event snap not indexed',
                  ),
                  (0, f.assert)(
                    i.serverCache.getNode().isIndexed(t.filter.getIndex()),
                    'Server snap not indexed',
                  ),
                  (0, f.assert)(
                    o.viewCache.serverCache.isFullyInitialized() ||
                      !r.serverCache.isFullyInitialized(),
                    'Once a server snap is complete, it should never go back',
                  ),
                  (e.viewCache_ = o.viewCache),
                  Ut(e, o.changes, o.viewCache.eventCache.getNode(), null)
                )
              }
              function Ut(e, n, t, i) {
                i = i ? [i] : e.eventRegistrations_
                return Qn(e.eventGenerator_, n, t, i)
              }
              let Wt
              class Bt {
                constructor() {
                  this.views = new Map()
                }
              }
              function Ht(n, t, i, r) {
                var e = t.source.queryId
                if (null !== e) {
                  e = n.views.get(e)
                  return (
                    (0, f.assert)(
                      null != e,
                      'SyncTree gave us an op for an invalid query.',
                    ),
                    qt(e, t, i, r)
                  )
                }
                {
                  let e = []
                  for (const o of n.views.values()) e = e.concat(qt(o, t, i, r))
                  return e
                }
              }
              function Vt(e, t, i, r, o) {
                var n = t._queryIdentifier,
                  n = e.views.get(n)
                if (n) return n
                {
                  let e = yt(i, o ? r : null),
                    n = !1
                  n =
                    !!e ||
                    ((e = r instanceof an ? vt(i, r) : an.EMPTY_NODE), !1)
                  o = Xn(new Gn(e, n, !1), new Gn(r, o, !1))
                  return new zt(t, o)
                }
              }
              function Yt(e, n, t, i, r, o) {
                o = Vt(e, n, i, r, o)
                return (
                  e.views.has(n._queryIdentifier) ||
                    e.views.set(n._queryIdentifier, o),
                  o.eventRegistrations_.push(t),
                  (function (e, n) {
                    const t = e.viewCache_.eventCache,
                      i = []
                    if (!t.getNode().isLeafNode()) {
                      const r = t.getNode()
                      r.forEachChild(Xe, (e, n) => {
                        i.push(wn(e, n))
                      })
                    }
                    return (
                      t.isFullyInitialized() && i.push(vn(t.getNode())),
                      Ut(e, i, t.getNode(), n)
                    )
                  })(o, t)
                )
              }
              function Gt(e, n, t, i) {
                var r = n._queryIdentifier
                const o = []
                let a = []
                var s = Jt(e)
                if ('default' === r)
                  for (var [l, c] of e.views.entries())
                    (a = a.concat(Ft(c, t, i))),
                      jt(c) &&
                        (e.views.delete(l),
                        c.query._queryParams.loadsAllData() || o.push(c.query))
                else {
                  const h = e.views.get(r)
                  h &&
                    ((a = a.concat(Ft(h, t, i))),
                    jt(h) &&
                      (e.views.delete(r),
                      h.query._queryParams.loadsAllData() || o.push(h.query)))
                }
                return (
                  s &&
                    !Jt(e) &&
                    o.push(
                      ((0, f.assert)(Wt, 'Reference.ts has not been loaded'),
                      new Wt(n._repo, n._path)),
                    ),
                  { removed: o, events: a }
                )
              }
              function $t(e) {
                const n = []
                for (const t of e.views.values())
                  t.query._queryParams.loadsAllData() || n.push(t)
                return n
              }
              function Qt(e, n) {
                let t = null
                for (const i of e.views.values())
                  t =
                    t ||
                    (function (e, n) {
                      const t = nt(e.viewCache_)
                      return t &&
                        (e.query._queryParams.loadsAllData() ||
                          (!Ce(n) && !t.getImmediateChild(be(n)).isEmpty()))
                        ? t.getChild(n)
                        : null
                    })(i, n)
                return t
              }
              function Kt(e, n) {
                const t = n._queryParams
                if (t.loadsAllData()) return Zt(e)
                n = n._queryIdentifier
                return e.views.get(n)
              }
              function Xt(e, n) {
                return null != Kt(e, n)
              }
              function Jt(e) {
                return null != Zt(e)
              }
              function Zt(e) {
                for (const n of e.views.values())
                  if (n.query._queryParams.loadsAllData()) return n
                return null
              }
              let ei
              let ni = 1
              class ti {
                constructor(e) {
                  ;(this.listenProvider_ = e),
                    (this.syncPointTree_ = new it(null)),
                    (this.pendingWriteTree_ = {
                      visibleWrites: rt.empty(),
                      allWrites: [],
                      lastWriteId: -1,
                    }),
                    (this.tagToQueryMap = new Map()),
                    (this.queryToTagMap = new Map())
                }
              }
              function ii(e, n, t, i, r) {
                var o, a, s, l
                return (
                  (o = e.pendingWriteTree_),
                  (a = n),
                  (s = t),
                  (l = i),
                  (i = r),
                  (0, f.assert)(
                    l > o.lastWriteId,
                    'Stacking an older write on top of newer ones',
                  ),
                  o.allWrites.push({
                    path: a,
                    snap: s,
                    writeId: l,
                    visible: (i = void 0 === i ? !0 : i),
                  }),
                  i && (o.visibleWrites = ot(o.visibleWrites, a, s)),
                  (o.lastWriteId = l),
                  r ? ci(e, new Vn(qn(), n, t)) : []
                )
              }
              function ri(e, n, t = !1) {
                var i = (function (n, t) {
                  for (let e = 0; e < n.allWrites.length; e++) {
                    var i = n.allWrites[e]
                    if (i.writeId === t) return i
                  }
                  return null
                })(e.pendingWriteTree_, n)
                if (gt(e.pendingWriteTree_, n)) {
                  let n = new it(null)
                  return (
                    null != i.snap
                      ? (n = n.set(me(), !0))
                      : z(i.children, (e) => {
                          n = n.set(new ge(e), !0)
                        }),
                    ci(e, new Bn(i.path, n, t))
                  )
                }
                return []
              }
              function oi(e, n, t) {
                return ci(e, new Vn(Un(), n, t))
              }
              function ai(t, e, n, i) {
                var r = e._path,
                  o = t.syncPointTree_.get(r)
                let a = []
                if (o && ('default' === e._queryIdentifier || Xt(o, e))) {
                  n = Gt(o, e, n, i)
                  0 === o.views.size &&
                    (t.syncPointTree_ = t.syncPointTree_.remove(r))
                  const h = n.removed
                  a = n.events
                  ;(o =
                    -1 !== h.findIndex((e) => e._queryParams.loadsAllData())),
                    (n = t.syncPointTree_.findOnPath(r, (e, n) => Jt(n)))
                  if (o && !n) {
                    const d = t.syncPointTree_.subtree(r)
                    if (!d.isEmpty()) {
                      var s = d.fold((e, n, i) => {
                        if (n && Jt(n)) return [Zt(n)]
                        {
                          let t = []
                          return (
                            n && (t = $t(n)),
                            z(i, (e, n) => {
                              t = t.concat(n)
                            }),
                            t
                          )
                        }
                      })
                      for (let e = 0; e < s.length; ++e) {
                        var l = s[e],
                          c = l.query,
                          l = di(t, l)
                        t.listenProvider_.startListening(
                          bi(c),
                          ui(t, c),
                          l.hashFn,
                          l.onComplete,
                        )
                      }
                    }
                  }
                  !n &&
                    0 < h.length &&
                    !i &&
                    (o
                      ? t.listenProvider_.stopListening(bi(e), null)
                      : h.forEach((e) => {
                          var n = t.queryToTagMap.get(pi(e))
                          t.listenProvider_.stopListening(bi(e), n)
                        })),
                    (function (n, t) {
                      for (let e = 0; e < t.length; ++e) {
                        const o = t[e]
                        var i, r
                        o._queryParams.loadsAllData() ||
                          ((i = pi(o)),
                          (r = n.queryToTagMap.get(i)),
                          n.queryToTagMap.delete(i),
                          n.tagToQueryMap.delete(r))
                      }
                    })(t, h)
                }
                return a
              }
              function si(e, n, t) {
                const i = n._path
                let r = null,
                  o = !1
                e.syncPointTree_.foreachOnPath(i, (e, n) => {
                  e = Ee(e, i)
                  ;(r = r || Qt(n, e)), (o = o || Jt(n))
                })
                let a = e.syncPointTree_.get(i)
                a
                  ? ((o = o || Jt(a)), (r = r || Qt(a, me())))
                  : ((a = new Bt()),
                    (e.syncPointTree_ = e.syncPointTree_.set(i, a)))
                let s
                if (null != r) s = !0
                else {
                  ;(s = !1), (r = an.EMPTY_NODE)
                  const u = e.syncPointTree_.subtree(i)
                  u.foreachChild((e, n) => {
                    n = Qt(n, me())
                    n && (r = r.updateImmediateChild(e, n))
                  })
                }
                var l,
                  c = Xt(a, n)
                c ||
                  n._queryParams.loadsAllData() ||
                  ((h = pi(n)),
                  (0, f.assert)(
                    !e.queryToTagMap.has(h),
                    'View does not exist, but we have a tag',
                  ),
                  (l = ni++),
                  e.queryToTagMap.set(h, l),
                  e.tagToQueryMap.set(l, h))
                var h = ft(e.pendingWriteTree_, i)
                let d = Yt(a, n, t, h, r, s)
                return (
                  c ||
                    o ||
                    ((c = Kt(a, n)),
                    (d = d.concat(
                      (function (n, e, t) {
                        const i = e._path,
                          r = ui(n, e),
                          o = di(n, t),
                          a = n.listenProvider_.startListening(
                            bi(e),
                            r,
                            o.hashFn,
                            o.onComplete,
                          ),
                          s = n.syncPointTree_.subtree(i)
                        if (r)
                          (0, f.assert)(
                            !Jt(s.value),
                            "If we're adding a query, it shouldn't be shadowed",
                          )
                        else {
                          var l = s.fold((e, n, i) => {
                            if (!Ce(e) && n && Jt(n)) return [Zt(n).query]
                            {
                              let t = []
                              return (
                                n && (t = t.concat($t(n).map((e) => e.query))),
                                z(i, (e, n) => {
                                  t = t.concat(n)
                                }),
                                t
                              )
                            }
                          })
                          for (let e = 0; e < l.length; ++e) {
                            var c = l[e]
                            n.listenProvider_.stopListening(bi(c), ui(n, c))
                          }
                        }
                        return a
                      })(e, n, c),
                    ))),
                  d
                )
              }
              function li(e, t, n) {
                var i = e.pendingWriteTree_,
                  e = e.syncPointTree_.findOnPath(t, (e, n) => {
                    e = Qt(n, Ee(e, t))
                    if (e) return e
                  })
                return _t(i, t, e, n, !0)
              }
              function ci(e, n) {
                return (function n(t, i, r, o) {
                  {
                    if (Ce(t.path)) return hi(t, i, r, o)
                    {
                      const a = i.get(me())
                      null == r && null != a && (r = Qt(a, me()))
                      let e = []
                      const s = be(t.path),
                        l = t.operationForChild(s),
                        c = i.children.get(s)
                      if (c && l) {
                        const h = r ? r.getImmediateChild(s) : null,
                          d = Et(o, s)
                        e = e.concat(n(l, c, h, d))
                      }
                      return a && (e = e.concat(Ht(a, t, o, r))), e
                    }
                  }
                })(n, e.syncPointTree_, null, ft(e.pendingWriteTree_, me()))
              }
              function hi(r, e, o, a) {
                var n = e.get(me())
                null == o && null != n && (o = Qt(n, me()))
                let s = []
                return (
                  e.children.inorderTraversal((e, n) => {
                    var t = o ? o.getImmediateChild(e) : null,
                      i = Et(a, e),
                      e = r.operationForChild(e)
                    e && (s = s.concat(hi(e, n, t, i)))
                  }),
                  n && (s = s.concat(Ht(n, r, a, o))),
                  s
                )
              }
              function di(i, n) {
                const r = n.query,
                  o = ui(i, r)
                return {
                  hashFn: () => {
                    const e =
                      n.viewCache_.serverCache.getNode() || an.EMPTY_NODE
                    return e.hash()
                  },
                  onComplete: (e) => {
                    if ('ok' === e)
                      return o
                        ? (function (e, n, t) {
                            var i = fi(e, t)
                            if (i) {
                              ;(t = gi(i)),
                                (i = t.path),
                                (t = t.queryId),
                                (n = Ee(i, n))
                              return mi(e, i, new Hn(Wn(t), n))
                            }
                            return []
                          })(i, r._path, o)
                        : ((n = i), (t = r._path), ci(n, new Hn(Un(), t)))
                    var n,
                      t,
                      e = (function (e, n) {
                        let t = 'Unknown Error'
                        'too_big' === e
                          ? (t =
                              'The data requested exceeds the maximum size that can be accessed with a single request.')
                          : 'permission_denied' === e
                          ? (t =
                              "Client doesn't have permission to access the desired data.")
                          : 'unavailable' === e &&
                            (t = 'The service is unavailable')
                        const i = new Error(
                          e + ' at ' + n._path.toString() + ': ' + t,
                        )
                        return (i.code = e.toUpperCase()), i
                      })(e, r)
                    return ai(i, r, null, e)
                  },
                }
              }
              function ui(e, n) {
                n = pi(n)
                return e.queryToTagMap.get(n)
              }
              function pi(e) {
                return e._path.toString() + '$' + e._queryIdentifier
              }
              function fi(e, n) {
                return e.tagToQueryMap.get(n)
              }
              function gi(e) {
                var n = e.indexOf('$')
                return (
                  (0, f.assert)(-1 !== n && n < e.length - 1, 'Bad queryKey.'),
                  { queryId: e.substr(n + 1), path: new ge(e.substr(0, n)) }
                )
              }
              function mi(e, n, t) {
                var i = e.syncPointTree_.get(n)
                return (
                  (0, f.assert)(
                    i,
                    "Missing sync point for query tag that we're tracking",
                  ),
                  Ht(i, t, ft(e.pendingWriteTree_, n), null)
                )
              }
              function bi(e) {
                return e._queryParams.loadsAllData() &&
                  !e._queryParams.isDefault()
                  ? ((0, f.assert)(ei, 'Reference.ts has not been loaded'),
                    new ei(e._repo, e._path))
                  : e
              }
              class _i {
                constructor(e) {
                  this.node_ = e
                }
                getImmediateChild(e) {
                  e = this.node_.getImmediateChild(e)
                  return new _i(e)
                }
                node() {
                  return this.node_
                }
              }
              class yi {
                constructor(e, n) {
                  ;(this.syncTree_ = e), (this.path_ = n)
                }
                getImmediateChild(e) {
                  e = ke(this.path_, e)
                  return new yi(this.syncTree_, e)
                }
                node() {
                  return li(this.syncTree_, this.path_)
                }
              }
              function vi(e) {
                return (
                  ((e = e || {}).timestamp =
                    e.timestamp || new Date().getTime()),
                  e
                )
              }
              function wi(e, n, t) {
                return e && 'object' == typeof e
                  ? ((0, f.assert)(
                      '.sv' in e,
                      'Unexpected leaf node or priority contents',
                    ),
                    'string' == typeof e['.sv']
                      ? xi(e['.sv'], n, t)
                      : 'object' == typeof e['.sv']
                      ? ki(e['.sv'], n)
                      : void (0, f.assert)(
                          !1,
                          'Unexpected server value: ' +
                            JSON.stringify(e, null, 2),
                        ))
                  : e
              }
              const xi = function (e, n, t) {
                  if ('timestamp' === e) return t.timestamp
                  ;(0, f.assert)(!1, 'Unexpected server value: ' + e)
                },
                ki = function (e, n, t) {
                  e.hasOwnProperty('increment') ||
                    (0, f.assert)(
                      !1,
                      'Unexpected server value: ' + JSON.stringify(e, null, 2),
                    )
                  e = e.increment
                  'number' != typeof e &&
                    (0, f.assert)(!1, 'Unexpected increment value: ' + e)
                  const i = n.node()
                  if (
                    ((0, f.assert)(
                      null !== i && void 0 !== i,
                      'Expected ChildrenNode.EMPTY_NODE for nulls',
                    ),
                    !i.isLeafNode())
                  )
                    return e
                  const r = i
                  n = r.getValue()
                  return 'number' != typeof n ? e : n + e
                },
                Ci = function (e, n, t, i) {
                  return Ii(n, new yi(t, e), i)
                },
                Ei = function (e, n, t) {
                  return Ii(e, new _i(n), t)
                }
              function Ii(e, i, r) {
                var n = e.getPriority().val(),
                  t = wi(n, i.getImmediateChild('.priority'), r)
                let o
                if (e.isLeafNode()) {
                  const a = e
                  n = wi(a.getValue(), i, r)
                  return n !== a.getValue() || t !== a.getPriority().val()
                    ? new $e(n, hn(t))
                    : e
                }
                {
                  const s = e
                  return (
                    (o = s),
                    t !== s.getPriority().val() &&
                      (o = o.updatePriority(new $e(t))),
                    s.forEachChild(Xe, (e, n) => {
                      var t = Ii(n, i.getImmediateChild(e), r)
                      t !== n && (o = o.updateImmediateChild(e, t))
                    }),
                    o
                  )
                }
              }
              class Ti {
                constructor(
                  e = '',
                  n = null,
                  t = { children: {}, childCount: 0 },
                ) {
                  ;(this.name = e), (this.parent = n), (this.node = t)
                }
              }
              function Si(e, n) {
                let t = n instanceof ge ? n : new ge(n),
                  i = e,
                  r = be(t)
                for (; null !== r; ) {
                  var o = (0, f.safeGet)(i.node.children, r) || {
                    children: {},
                    childCount: 0,
                  }
                  ;(i = new Ti(r, i, o)), (t = ye(t)), (r = be(t))
                }
                return i
              }
              function Pi(e) {
                return e.node.value
              }
              function Ni(e, n) {
                ;(e.node.value = n), Ai(e)
              }
              function Ri(e) {
                return 0 < e.node.childCount
              }
              function Oi(t, i) {
                z(t.node.children, (e, n) => {
                  i(new Ti(e, t, n))
                })
              }
              function Di(e) {
                return new ge(
                  null === e.parent ? e.name : Di(e.parent) + '/' + e.name,
                )
              }
              function Ai(e) {
                var n, t, i, r
                null !== e.parent &&
                  ((n = e.parent),
                  (t = e.name),
                  (r = (function (e) {
                    return void 0 === Pi(e) && !Ri(e)
                  })((i = e))),
                  (e = (0, f.contains)(n.node.children, t)),
                  r && e
                    ? (delete n.node.children[t], n.node.childCount--, Ai(n))
                    : r ||
                      e ||
                      ((n.node.children[t] = i.node),
                      n.node.childCount++,
                      Ai(n)))
              }
              const Mi = /[\[\].#$\/\u0000-\u001F\u007F]/,
                Li = /[\[\].#$\u0000-\u001F\u007F]/,
                zi = 10485760,
                ji = function (e) {
                  return 'string' == typeof e && 0 !== e.length && !Mi.test(e)
                },
                Fi = function (e) {
                  return 'string' == typeof e && 0 !== e.length && !Li.test(e)
                },
                qi = function (e) {
                  return (
                    null === e ||
                    'string' == typeof e ||
                    ('number' == typeof e && !D(e)) ||
                    (e && 'object' == typeof e && (0, f.contains)(e, '.sv'))
                  )
                },
                Ui = function (e, n, t, i) {
                  ;(i && void 0 === n) ||
                    Wi((0, f.errorPrefix)(e, 'value'), n, t)
                },
                Wi = function (o, e, n) {
                  const a = n instanceof ge ? new Pe(n, o) : n
                  if (void 0 === e)
                    throw new Error(o + 'contains undefined ' + Re(a))
                  if ('function' == typeof e)
                    throw new Error(
                      o +
                        'contains a function ' +
                        Re(a) +
                        ' with contents = ' +
                        e.toString(),
                    )
                  if (D(e))
                    throw new Error(
                      o + 'contains ' + e.toString() + ' ' + Re(a),
                    )
                  if (
                    'string' == typeof e &&
                    e.length > zi / 3 &&
                    (0, f.stringLength)(e) > zi
                  )
                    throw new Error(
                      o +
                        'contains a string greater than ' +
                        zi +
                        ' utf8 bytes ' +
                        Re(a) +
                        " ('" +
                        e.substring(0, 50) +
                        "...')",
                    )
                  if (e && 'object' == typeof e) {
                    let i = !1,
                      r = !1
                    if (
                      (z(e, (e, n) => {
                        if ('.value' === e) i = !0
                        else if (
                          '.priority' !== e &&
                          '.sv' !== e &&
                          ((r = !0), !ji(e))
                        )
                          throw new Error(
                            o +
                              ' contains an invalid key (' +
                              e +
                              ') ' +
                              Re(a) +
                              '.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"',
                          )
                        var t
                        ;(t = a),
                          (e = e),
                          0 < t.parts_.length && (t.byteLength_ += 1),
                          t.parts_.push(e),
                          (t.byteLength_ += (0, f.stringLength)(e)),
                          Ne(t),
                          Wi(o, n, a),
                          (t = a),
                          (n = t.parts_.pop()),
                          (t.byteLength_ -= (0, f.stringLength)(n)),
                          0 < t.parts_.length && --t.byteLength_
                      }),
                      i && r)
                    )
                      throw new Error(
                        o +
                          ' contains ".value" child ' +
                          Re(a) +
                          ' in addition to actual children.',
                      )
                  }
                },
                Bi = function (e, n, i, t) {
                  if (!t || void 0 !== n) {
                    const r = (0, f.errorPrefix)(e, 'values')
                    if (!n || 'object' != typeof n || Array.isArray(n))
                      throw new Error(
                        r +
                          ' must be an object containing the children to replace.',
                      )
                    const o = []
                    z(n, (e, n) => {
                      const t = new ge(e)
                      if ((Wi(r, n, ke(i, t)), '.priority' === ve(t) && !qi(n)))
                        throw new Error(
                          r +
                            "contains an invalid value for '" +
                            t.toString() +
                            "', which must be a valid Firebase priority (a string, finite number, server value, or null).",
                        )
                      o.push(t)
                    }),
                      (function (n, e) {
                        let t, i
                        for (t = 0; t < e.length; t++) {
                          i = e[t]
                          var r = we(i)
                          for (let e = 0; e < r.length; e++)
                            if (
                              ('.priority' !== r[e] || e !== r.length - 1) &&
                              !ji(r[e])
                            )
                              throw new Error(
                                n +
                                  'contains an invalid key (' +
                                  r[e] +
                                  ') in path ' +
                                  i.toString() +
                                  '. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"',
                              )
                        }
                        e.sort(Ie)
                        let o = null
                        for (t = 0; t < e.length; t++) {
                          if (((i = e[t]), null !== o && Se(o, i)))
                            throw new Error(
                              n +
                                'contains a path ' +
                                o.toString() +
                                ' that is ancestor of another path ' +
                                i.toString(),
                            )
                          o = i
                        }
                      })(r, o)
                  }
                },
                Hi = function (e, n, t) {
                  if (!t || void 0 !== n) {
                    if (D(n))
                      throw new Error(
                        (0, f.errorPrefix)(e, 'priority') +
                          'is ' +
                          n.toString() +
                          ', but must be a valid Firebase priority (a string, finite number, server value, or null).',
                      )
                    if (!qi(n))
                      throw new Error(
                        (0, f.errorPrefix)(e, 'priority') +
                          'must be a valid Firebase priority (a string, finite number, server value, or null).',
                      )
                  }
                },
                Vi = function (e, n, t, i) {
                  if (!((i && void 0 === t) || ji(t)))
                    throw new Error(
                      (0, f.errorPrefix)(e, n) +
                        'was an invalid key = "' +
                        t +
                        '".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").',
                    )
                },
                Yi = function (e, n, t, i) {
                  if (!((i && void 0 === t) || Fi(t)))
                    throw new Error(
                      (0, f.errorPrefix)(e, n) +
                        'was an invalid path = "' +
                        t +
                        '". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"',
                    )
                }
              fo._validatePathString = Yi
              const Gi = function (e, n, t, i) {
                  ;(t = t && t.replace(/^\/*\.info(\/|$)/, '/')), Yi(e, n, t, i)
                },
                $i = function (e, n) {
                  if ('.info' === be(n))
                    throw new Error(
                      e + " failed = Can't modify data under /.info/",
                    )
                }
              fo._validateWritablePath = $i
              const Qi = function (e, n) {
                var t = n.path.toString()
                if (
                  'string' != typeof n.repoInfo.host ||
                  0 === n.repoInfo.host.length ||
                  (!ji(n.repoInfo.namespace) &&
                    'localhost' !== n.repoInfo.host.split(':')[0]) ||
                  (0 !== t.length &&
                    ((t = (t = t) && t.replace(/^\/*\.info(\/|$)/, '/')),
                    !Fi(t)))
                )
                  throw new Error(
                    (0, f.errorPrefix)(e, 'url') +
                      'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".',
                  )
              }
              class Ki {
                constructor() {
                  ;(this.eventLists_ = []), (this.recursionDepth_ = 0)
                }
              }
              function Xi(n, t) {
                let i = null
                for (let e = 0; e < t.length; e++) {
                  const o = t[e]
                  var r = o.getPath()
                  null === i ||
                    Te(r, i.path) ||
                    (n.eventLists_.push(i), (i = null)),
                    null === i && (i = { events: [], path: r }),
                    i.events.push(o)
                }
                i && n.eventLists_.push(i)
              }
              function Ji(e, n, t) {
                Xi(e, t), er(e, (e) => Te(e, n))
              }
              function Zi(e, n, t) {
                Xi(e, t), er(e, (e) => Se(e, n) || Se(n, e))
              }
              function er(n, t) {
                n.recursionDepth_++
                let i = !0
                for (let e = 0; e < n.eventLists_.length; e++) {
                  var r = n.eventLists_[e]
                  r &&
                    (t(r.path)
                      ? ((function (n) {
                          for (let e = 0; e < n.events.length; e++) {
                            const i = n.events[e]
                            var t
                            null !== i &&
                              ((n.events[e] = null),
                              (t = i.getEventRunner()),
                              w && N('event: ' + i.toString()),
                              H(t))
                          }
                        })(n.eventLists_[e]),
                        (n.eventLists_[e] = null))
                      : (i = !1))
                }
                i && (n.eventLists_ = []), n.recursionDepth_--
              }
              const nr = 'repo_interrupt',
                tr = 25
              class ir {
                constructor(e, n, t, i) {
                  ;(this.repoInfo_ = e),
                    (this.forceRestClient_ = n),
                    (this.authTokenProvider_ = t),
                    (this.appCheckProvider_ = i),
                    (this.dataUpdateCount = 0),
                    (this.statsListener_ = null),
                    (this.eventQueue_ = new Ki()),
                    (this.nextWriteId_ = 1),
                    (this.interceptServerDataCallback_ = null),
                    (this.onDisconnect_ = Mn()),
                    (this.transactionQueueTree_ = new Ti()),
                    (this.persistentConnection_ = null),
                    (this.key = this.repoInfo_.toURLString())
                }
                toString() {
                  return (
                    (this.repoInfo_.secure ? 'https://' : 'http://') +
                    this.repoInfo_.host
                  )
                }
              }
              function rr(a, e, n) {
                if (
                  ((a.stats_ = te(a.repoInfo_)),
                  a.forceRestClient_ ||
                    (function () {
                      const e =
                        ('object' == typeof window &&
                          window.navigator &&
                          window.navigator.userAgent) ||
                        ''
                      return (
                        0 <=
                        e.search(
                          /googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i,
                        )
                      )
                    })())
                )
                  (a.server_ = new Dn(
                    a.repoInfo_,
                    (e, n, t, i) => {
                      sr(a, e, n, t, i)
                    },
                    a.authTokenProvider_,
                    a.appCheckProvider_,
                  )),
                    setTimeout(() => lr(a, !0), 0)
                else {
                  if (null != n) {
                    if ('object' != typeof n)
                      throw new Error(
                        'Only objects are supported for option databaseAuthVariableOverride',
                      )
                    try {
                      ;(0, f.stringify)(n)
                    } catch (e) {
                      throw new Error('Invalid authOverride provided: ' + e)
                    }
                  }
                  ;(a.persistentConnection_ = new De(
                    a.repoInfo_,
                    e,
                    (e, n, t, i) => {
                      sr(a, e, n, t, i)
                    },
                    (e) => {
                      lr(a, e)
                    },
                    (e) => {
                      var t
                      ;(t = a),
                        z(e, (e, n) => {
                          cr(t, e, n)
                        })
                    },
                    a.authTokenProvider_,
                    a.appCheckProvider_,
                    n,
                  )),
                    (a.server_ = a.persistentConnection_)
                }
                a.authTokenProvider_.addTokenChangeListener((e) => {
                  a.server_.refreshAuthToken(e)
                }),
                  a.appCheckProvider_.addTokenChangeListener((e) => {
                    a.server_.refreshAppCheckToken(e.token)
                  }),
                  (a.statsReporter_ =
                    ((e = a.repoInfo_),
                    (n = () => new Fn(a.stats_, a.server_)),
                    (e = e.toString()),
                    ne[e] || (ne[e] = n()),
                    ne[e])),
                  (a.infoData_ = new An()),
                  (a.infoSyncTree_ = new ti({
                    startListening: (e, n, t, i) => {
                      let r = []
                      const o = a.infoData_.getNode(e._path)
                      return (
                        o.isEmpty() ||
                          ((r = oi(a.infoSyncTree_, e._path, o)),
                          setTimeout(() => {
                            i('ok')
                          }, 0)),
                        r
                      )
                    },
                    stopListening: () => {},
                  })),
                  cr(a, 'connected', !1),
                  (a.serverSyncTree_ = new ti({
                    startListening: (t, e, n, i) => (
                      a.server_.listen(t, n, e, (e, n) => {
                        n = i(e, n)
                        Zi(a.eventQueue_, t._path, n)
                      }),
                      []
                    ),
                    stopListening: (e, n) => {
                      a.server_.unlisten(e, n)
                    },
                  }))
              }
              function or(e) {
                const n = e.infoData_.getNode(new ge('.info/serverTimeOffset'))
                e = n.val() || 0
                return new Date().getTime() + e
              }
              function ar(e) {
                return vi({ timestamp: or(e) })
              }
              function sr(e, n, t, i, r) {
                e.dataUpdateCount++
                var o,
                  a,
                  s,
                  l = new ge(n)
                t = e.interceptServerDataCallback_
                  ? e.interceptServerDataCallback_(n, t)
                  : t
                let c = []
                c = r
                  ? i
                    ? ((o = (0, f.map)(t, (e) => hn(e))),
                      (function (e, n, t, i) {
                        var r = fi(e, i)
                        if (r) {
                          ;(i = gi(r)),
                            (r = i.path),
                            (i = i.queryId),
                            (n = Ee(r, n)),
                            (t = it.fromObject(t))
                          return mi(e, r, new Yn(Wn(i), n, t))
                        }
                        return []
                      })(e.serverSyncTree_, l, o, r))
                    : ((n = hn(t)),
                      (o = e.serverSyncTree_),
                      (a = l),
                      (s = n),
                      null == (r = fi(o, (n = r)))
                        ? []
                        : ((n = gi(r)),
                          (r = n.path),
                          (n = n.queryId),
                          (a = Ee(r, a)),
                          mi(o, r, new Vn(Wn(n), a, s))))
                  : i
                  ? ((a = (0, f.map)(t, (e) => hn(e))),
                    (s = e.serverSyncTree_),
                    (i = l),
                    (a = a),
                    (a = it.fromObject(a)),
                    ci(s, new Yn(Un(), i, a)))
                  : ((t = hn(t)), oi(e.serverSyncTree_, l, t))
                let h = l
                0 < c.length && (h = vr(e, l)), Zi(e.eventQueue_, h, c)
              }
              function lr(e, n) {
                cr(e, 'connected', n),
                  !1 === n &&
                    (function (t) {
                      mr(t, 'onDisconnectEvents')
                      const i = ar(t),
                        r = Mn()
                      zn(t.onDisconnect_, me(), (e, n) => {
                        n = Ci(e, n, t.serverSyncTree_, i)
                        Ln(r, e, n)
                      })
                      let o = []
                      zn(r, me(), (e, n) => {
                        o = o.concat(oi(t.serverSyncTree_, e, n))
                        e = Cr(t, e)
                        vr(t, e)
                      }),
                        (t.onDisconnect_ = Mn()),
                        Zi(t.eventQueue_, me(), o)
                    })(e)
              }
              function cr(e, n, t) {
                ;(n = new ge('/.info/' + n)), (t = hn(t))
                e.infoData_.updateSnapshot(n, t)
                t = oi(e.infoSyncTree_, n, t)
                Zi(e.eventQueue_, n, t)
              }
              function hr(e) {
                return e.nextWriteId_++
              }
              function dr(i, r, e, n, o) {
                mr(i, 'set', { path: r.toString(), value: e, priority: n })
                var t = ar(i)
                const a = hn(e, n)
                ;(n = li(i.serverSyncTree_, r)), (t = Ei(a, n, t))
                const s = hr(i)
                t = ii(i.serverSyncTree_, r, t, s, !0)
                Xi(i.eventQueue_, t),
                  i.server_.put(r.toString(), a.val(!0), (e, n) => {
                    var t = 'ok' === e
                    t || O('set at ' + r + ' failed: ' + e)
                    t = ri(i.serverSyncTree_, s, !t)
                    Zi(i.eventQueue_, r, t), br(0, o, e, n)
                  })
                t = Cr(i, r)
                vr(i, t), Zi(i.eventQueue_, t, [])
              }
              function ur(t, i, r) {
                t.server_.onDisconnectCancel(i.toString(), (e, n) => {
                  'ok' === e &&
                    !(function e(t, n) {
                      if (Ce(n)) return (t.value = null), t.children.clear(), !0
                      if (null !== t.value) {
                        if (t.value.isLeafNode()) return !1
                        {
                          const r = t.value
                          return (
                            (t.value = null),
                            r.forEachChild(Xe, (e, n) => {
                              Ln(t, new ge(e), n)
                            }),
                            e(t, n)
                          )
                        }
                      }
                      if (0 < t.children.size) {
                        var i = be(n)
                        return (
                          (n = ye(n)),
                          t.children.has(i) &&
                            e(t.children.get(i), n) &&
                            t.children.delete(i),
                          0 === t.children.size
                        )
                      }
                      return !0
                    })(t.onDisconnect_, i),
                    br(0, r, e, n)
                })
              }
              function pr(t, i, e, r) {
                const o = hn(e)
                t.server_.onDisconnectPut(i.toString(), o.val(!0), (e, n) => {
                  'ok' === e && Ln(t.onDisconnect_, i, o), br(0, r, e, n)
                })
              }
              function fr(e, n, t) {
                let i
                ;(i =
                  '.info' === be(n._path)
                    ? ai(e.infoSyncTree_, n, t)
                    : ai(e.serverSyncTree_, n, t)),
                  Ji(e.eventQueue_, n._path, i)
              }
              function gr(e) {
                e.persistentConnection_ && e.persistentConnection_.interrupt(nr)
              }
              function mr(e, ...n) {
                let t = ''
                e.persistentConnection_ &&
                  (t = e.persistentConnection_.id + ':'),
                  N(t, ...n)
              }
              function br(e, i, r, o) {
                i &&
                  H(() => {
                    if ('ok' === r) i(null)
                    else {
                      var n = (r || 'error').toUpperCase()
                      let e = n
                      o && (e += ': ' + o)
                      const t = new Error(e)
                      ;(t.code = n), i(t)
                    }
                  })
              }
              function _r(e, n, t) {
                return li(e.serverSyncTree_, n, t) || an.EMPTY_NODE
              }
              function yr(n, e = n.transactionQueueTree_) {
                if ((e || kr(n, e), Pi(e))) {
                  const t = xr(n, e)
                  ;(0, f.assert)(
                    0 < t.length,
                    'Sending zero length transaction queue',
                  ),
                    t.every((e) => 0 === e.status) &&
                      (function (r, o, a) {
                        const e = a.map((e) => e.currentWriteId),
                          n = _r(r, o, e)
                        let t = n
                        var i = n.hash()
                        for (let e = 0; e < a.length; e++) {
                          const h = a[e]
                          ;(0, f.assert)(
                            0 === h.status,
                            'tryToSendTransactionQueue_: items in queue should all be run.',
                          ),
                            (h.status = 1),
                            h.retryCount++
                          var s = Ee(o, h.path)
                          t = t.updateChild(s, h.currentOutputSnapshotRaw)
                        }
                        const l = t.val(!0),
                          c = o
                        r.server_.put(
                          c.toString(),
                          l,
                          (n) => {
                            mr(r, 'transaction put response', {
                              path: c.toString(),
                              status: n,
                            })
                            let t = []
                            if ('ok' === n) {
                              const i = []
                              for (let e = 0; e < a.length; e++)
                                (a[e].status = 2),
                                  (t = t.concat(
                                    ri(r.serverSyncTree_, a[e].currentWriteId),
                                  )),
                                  a[e].onComplete &&
                                    i.push(() =>
                                      a[e].onComplete(
                                        null,
                                        !0,
                                        a[e].currentOutputSnapshotResolved,
                                      ),
                                    ),
                                  a[e].unwatcher()
                              kr(r, Si(r.transactionQueueTree_, o)),
                                yr(r, r.transactionQueueTree_),
                                Zi(r.eventQueue_, o, t)
                              for (let e = 0; e < i.length; e++) H(i[e])
                            } else {
                              if ('datastale' === n)
                                for (let e = 0; e < a.length; e++)
                                  3 === a[e].status
                                    ? (a[e].status = 4)
                                    : (a[e].status = 0)
                              else {
                                O(
                                  'transaction at ' +
                                    c.toString() +
                                    ' failed: ' +
                                    n,
                                )
                                for (let e = 0; e < a.length; e++)
                                  (a[e].status = 4), (a[e].abortReason = n)
                              }
                              vr(r, o)
                            }
                          },
                          i,
                        )
                      })(n, Di(e), t)
                } else
                  Ri(e) &&
                    Oi(e, (e) => {
                      yr(n, e)
                    })
              }
              function vr(e, n) {
                var t = wr(e, n),
                  n = Di(t)
                return (
                  (function (r, o, a) {
                    if (0 !== o.length) {
                      const c = []
                      let i = []
                      const e = o.filter((e) => 0 === e.status),
                        h = e.map((e) => e.currentWriteId)
                      for (let t = 0; t < o.length; t++) {
                        const d = o[t]
                        var s = Ee(a, d.path)
                        let e = !1,
                          n
                        if (
                          ((0, f.assert)(
                            null !== s,
                            'rerunTransactionsUnderNode_: relativePath should not be null.',
                          ),
                          4 === d.status)
                        )
                          (e = !0),
                            (n = d.abortReason),
                            (i = i.concat(
                              ri(r.serverSyncTree_, d.currentWriteId, !0),
                            ))
                        else if (0 === d.status)
                          if (d.retryCount >= tr)
                            (e = !0),
                              (n = 'maxretry'),
                              (i = i.concat(
                                ri(r.serverSyncTree_, d.currentWriteId, !0),
                              ))
                          else {
                            const u = _r(r, d.path, h)
                            d.currentInputSnapshot = u
                            var l = o[t].update(u.val())
                            if (void 0 !== l) {
                              Wi(
                                'transaction failed: Data returned ',
                                l,
                                d.path,
                              )
                              let e = hn(l)
                              ;('object' == typeof l &&
                                null != l &&
                                (0, f.contains)(l, '.priority')) ||
                                (e = e.updatePriority(u.getPriority()))
                              ;(s = d.currentWriteId),
                                (l = ar(r)),
                                (l = Ei(e, u, l))
                              ;(d.currentOutputSnapshotRaw = e),
                                (d.currentOutputSnapshotResolved = l),
                                (d.currentWriteId = hr(r)),
                                h.splice(h.indexOf(s), 1),
                                (i = i.concat(
                                  ii(
                                    r.serverSyncTree_,
                                    d.path,
                                    l,
                                    d.currentWriteId,
                                    d.applyLocally,
                                  ),
                                )),
                                (i = i.concat(ri(r.serverSyncTree_, s, !0)))
                            } else
                              (e = !0),
                                (n = 'nodata'),
                                (i = i.concat(
                                  ri(r.serverSyncTree_, d.currentWriteId, !0),
                                ))
                          }
                        Zi(r.eventQueue_, a, i),
                          (i = []),
                          e &&
                            ((o[t].status = 2),
                            (function (e) {
                              setTimeout(e, Math.floor(0))
                            })(o[t].unwatcher),
                            o[t].onComplete &&
                              ('nodata' === n
                                ? c.push(() =>
                                    o[t].onComplete(
                                      null,
                                      !1,
                                      o[t].currentInputSnapshot,
                                    ),
                                  )
                                : c.push(() =>
                                    o[t].onComplete(new Error(n), !1, null),
                                  )))
                      }
                      kr(r, r.transactionQueueTree_)
                      for (let e = 0; e < c.length; e++) H(c[e])
                      yr(r, r.transactionQueueTree_)
                    }
                  })(e, xr(e, t), n),
                  n
                )
              }
              function wr(e, n) {
                let t,
                  i = e.transactionQueueTree_
                for (t = be(n); null !== t && void 0 === Pi(i); )
                  (i = Si(i, t)), (n = ye(n)), (t = be(n))
                return i
              }
              function xr(e, n) {
                const t = []
                return (
                  (function n(t, e, i) {
                    const r = Pi(e)
                    if (r) for (let e = 0; e < r.length; e++) i.push(r[e])
                    Oi(e, (e) => {
                      n(t, e, i)
                    })
                  })(e, n, t),
                  t.sort((e, n) => e.order - n.order),
                  t
                )
              }
              function kr(n, e) {
                const t = Pi(e)
                if (t) {
                  let n = 0
                  for (let e = 0; e < t.length; e++)
                    2 !== t[e].status && ((t[n] = t[e]), n++)
                  ;(t.length = n), Ni(e, 0 < t.length ? t : void 0)
                }
                Oi(e, (e) => {
                  kr(n, e)
                })
              }
              function Cr(n, e) {
                var t = Di(wr(n, e)),
                  e = Si(n.transactionQueueTree_, e)
                return (
                  (function (e, n, t) {
                    let i = t ? e : e.parent
                    for (; null !== i; ) {
                      if (n(i)) return
                      i = i.parent
                    }
                  })(e, (e) => {
                    Er(n, e)
                  }),
                  Er(n, e),
                  (function n(e, t, i, r) {
                    i && !r && t(e),
                      Oi(e, (e) => {
                        n(e, t, !0, r)
                      }),
                      i && r && t(e)
                  })(e, (e) => {
                    Er(n, e)
                  }),
                  t
                )
              }
              function Er(i, e) {
                const r = Pi(e)
                if (r) {
                  const o = []
                  let n = [],
                    t = -1
                  for (let e = 0; e < r.length; e++)
                    3 === r[e].status ||
                      (1 === r[e].status
                        ? ((0, f.assert)(
                            t === e - 1,
                            'All SENT items should be at beginning of queue.',
                          ),
                          (t = e),
                          (r[e].status = 3),
                          (r[e].abortReason = 'set'))
                        : ((0, f.assert)(
                            0 === r[e].status,
                            'Unexpected transaction status in abort',
                          ),
                          r[e].unwatcher(),
                          (n = n.concat(
                            ri(i.serverSyncTree_, r[e].currentWriteId, !0),
                          )),
                          r[e].onComplete &&
                            o.push(
                              r[e].onComplete.bind(
                                null,
                                new Error('set'),
                                !1,
                                null,
                              ),
                            )))
                  ;-1 === t ? Ni(e, void 0) : (r.length = t + 1),
                    Zi(i.eventQueue_, Di(e), n)
                  for (let e = 0; e < o.length; e++) H(o[e])
                }
              }
              const Ir = function (e, n) {
                  var t = Tr(e),
                    i = t.namespace
                  'firebase.com' === t.domain &&
                    R(
                      t.host +
                        ' is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead',
                    ),
                    (i && 'undefined' !== i) ||
                      'localhost' === t.domain ||
                      R(
                        'Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com',
                      ),
                    t.secure ||
                      ('undefined' != typeof window &&
                        window.location &&
                        window.location.protocol &&
                        -1 !== window.location.protocol.indexOf('https:') &&
                        O(
                          'Insecure Firebase access from a secure page. Please use https in calls to new Firebase().',
                        ))
                  e = 'ws' === t.scheme || 'wss' === t.scheme
                  return {
                    repoInfo: new X(
                      t.host,
                      t.secure,
                      i,
                      n,
                      e,
                      '',
                      i !== t.subdomain,
                    ),
                    path: new ge(t.pathString),
                  }
                },
                Tr = function (i) {
                  let r = '',
                    o = '',
                    a = '',
                    s = '',
                    l = '',
                    c = !0,
                    h = 'https',
                    d = 443
                  if ('string' == typeof i) {
                    let e = i.indexOf('//')
                    0 <= e &&
                      ((h = i.substring(0, e - 1)), (i = i.substring(e + 2)))
                    let n = i.indexOf('/')
                    ;-1 === n && (n = i.length)
                    let t = i.indexOf('?')
                    ;-1 === t && (t = i.length),
                      (r = i.substring(0, Math.min(n, t))),
                      n < t &&
                        (s = (function (e) {
                          let t = ''
                          var i = e.split('/')
                          for (let n = 0; n < i.length; n++)
                            if (0 < i[n].length) {
                              let e = i[n]
                              try {
                                e = decodeURIComponent(e.replace(/\+/g, ' '))
                              } catch (e) {}
                              t += '/' + e
                            }
                          return t
                        })(i.substring(n, t)))
                    var u = (function (e) {
                      const n = {}
                      for (const i of (e =
                        '?' === e.charAt(0) ? e.substring(1) : e).split('&')) {
                        var t
                        0 !== i.length &&
                          (2 === (t = i.split('=')).length
                            ? (n[decodeURIComponent(t[0])] = decodeURIComponent(
                                t[1],
                              ))
                            : O(`Invalid query segment '${i}' in query '${e}'`))
                      }
                      return n
                    })(i.substring(Math.min(i.length, t)))
                    ;(e = r.indexOf(':')),
                      0 <= e
                        ? ((c = 'https' === h || 'wss' === h),
                          (d = parseInt(r.substring(e + 1), 10)))
                        : (e = r.length)
                    const p = r.slice(0, e)
                    'localhost' === p.toLowerCase()
                      ? (o = 'localhost')
                      : p.split('.').length <= 2
                      ? (o = p)
                      : ((i = r.indexOf('.')),
                        (a = r.substring(0, i).toLowerCase()),
                        (o = r.substring(i + 1)),
                        (l = a)),
                      'ns' in u && (l = u.ns)
                  }
                  return {
                    host: r,
                    port: d,
                    domain: o,
                    subdomain: a,
                    secure: c,
                    scheme: h,
                    pathString: s,
                    namespace: l,
                  }
                }
              class Sr {
                constructor(e, n, t, i) {
                  ;(this.eventType = e),
                    (this.eventRegistration = n),
                    (this.snapshot = t),
                    (this.prevName = i)
                }
                getPath() {
                  var e = this.snapshot.ref
                  return ('value' === this.eventType ? e : e.parent)._path
                }
                getEventType() {
                  return this.eventType
                }
                getEventRunner() {
                  return this.eventRegistration.getEventRunner(this)
                }
                toString() {
                  return (
                    this.getPath().toString() +
                    ':' +
                    this.eventType +
                    ':' +
                    (0, f.stringify)(this.snapshot.exportVal())
                  )
                }
              }
              class Pr {
                constructor(e, n, t) {
                  ;(this.eventRegistration = e),
                    (this.error = n),
                    (this.path = t)
                }
                getPath() {
                  return this.path
                }
                getEventType() {
                  return 'cancel'
                }
                getEventRunner() {
                  return this.eventRegistration.getEventRunner(this)
                }
                toString() {
                  return this.path.toString() + ':cancel'
                }
              }
              class Nr {
                constructor(e, n) {
                  ;(this.snapshotCallback = e), (this.cancelCallback = n)
                }
                onValue(e, n) {
                  this.snapshotCallback.call(null, e, n)
                }
                onCancel(e) {
                  return (
                    (0, f.assert)(
                      this.hasCancelCallback,
                      'Raising a cancel event on a listener with no cancel callback',
                    ),
                    this.cancelCallback.call(null, e)
                  )
                }
                get hasCancelCallback() {
                  return !!this.cancelCallback
                }
                matches(e) {
                  return (
                    this.snapshotCallback === e.snapshotCallback ||
                    (void 0 !== this.snapshotCallback.userCallback &&
                      this.snapshotCallback.userCallback ===
                        e.snapshotCallback.userCallback &&
                      this.snapshotCallback.context ===
                        e.snapshotCallback.context)
                  )
                }
              }
              class Rr {
                constructor(e, n) {
                  ;(this._repo = e), (this._path = n)
                }
                cancel() {
                  const e = new f.Deferred()
                  return (
                    ur(
                      this._repo,
                      this._path,
                      e.wrapCallback(() => {}),
                    ),
                    e.promise
                  )
                }
                remove() {
                  $i('OnDisconnect.remove', this._path)
                  const e = new f.Deferred()
                  return (
                    pr(
                      this._repo,
                      this._path,
                      null,
                      e.wrapCallback(() => {}),
                    ),
                    e.promise
                  )
                }
                set(e) {
                  $i('OnDisconnect.set', this._path),
                    Ui('OnDisconnect.set', e, this._path, !1)
                  const n = new f.Deferred()
                  return (
                    pr(
                      this._repo,
                      this._path,
                      e,
                      n.wrapCallback(() => {}),
                    ),
                    n.promise
                  )
                }
                setWithPriority(e, n) {
                  $i('OnDisconnect.setWithPriority', this._path),
                    Ui('OnDisconnect.setWithPriority', e, this._path, !1),
                    Hi('OnDisconnect.setWithPriority', n, !1)
                  const t = new f.Deferred()
                  return (
                    (function (t, i, e, n, r) {
                      const o = hn(e, n)
                      t.server_.onDisconnectPut(
                        i.toString(),
                        o.val(!0),
                        (e, n) => {
                          'ok' === e && Ln(t.onDisconnect_, i, o),
                            br(0, r, e, n)
                        },
                      )
                    })(
                      this._repo,
                      this._path,
                      e,
                      n,
                      t.wrapCallback(() => {}),
                    ),
                    t.promise
                  )
                }
                update(e) {
                  $i('OnDisconnect.update', this._path),
                    Bi('OnDisconnect.update', e, this._path, !1)
                  const n = new f.Deferred()
                  return (
                    (function (t, i, r, o) {
                      if ((0, f.isEmpty)(r))
                        return (
                          N(
                            "onDisconnect().update() called with empty data.  Don't do anything.",
                          ),
                          br(0, o, 'ok', void 0)
                        )
                      t.server_.onDisconnectMerge(i.toString(), r, (e, n) => {
                        'ok' === e &&
                          z(r, (e, n) => {
                            n = hn(n)
                            Ln(t.onDisconnect_, ke(i, e), n)
                          }),
                          br(0, o, e, n)
                      })
                    })(
                      this._repo,
                      this._path,
                      e,
                      n.wrapCallback(() => {}),
                    ),
                    n.promise
                  )
                }
              }
              fo.OnDisconnect = Rr
              class Or {
                constructor(e, n, t, i) {
                  ;(this._repo = e),
                    (this._path = n),
                    (this._queryParams = t),
                    (this._orderByCalled = i)
                }
                get key() {
                  return Ce(this._path) ? null : ve(this._path)
                }
                get ref() {
                  return new Lr(this._repo, this._path)
                }
                get _queryIdentifier() {
                  var e = On(this._queryParams),
                    e = T(e)
                  return '{}' === e ? 'default' : e
                }
                get _queryObject() {
                  return On(this._queryParams)
                }
                isEqual(e) {
                  if (!((e = (0, f.getModularInstance)(e)) instanceof Or))
                    return !1
                  var n = this._repo === e._repo,
                    t = Te(this._path, e._path),
                    e = this._queryIdentifier === e._queryIdentifier
                  return n && t && e
                }
                toJSON() {
                  return this.toString()
                }
                toString() {
                  return (
                    this._repo.toString() +
                    (function (n) {
                      let t = ''
                      for (let e = n.pieceNum_; e < n.pieces_.length; e++)
                        '' !== n.pieces_[e] &&
                          (t += '/' + encodeURIComponent(String(n.pieces_[e])))
                      return t || '/'
                    })(this._path)
                  )
                }
              }
              function Dr(e, n) {
                if (!0 === e._orderByCalled)
                  throw new Error(
                    n + ": You can't combine multiple orderBy calls.",
                  )
              }
              function Ar(e) {
                let n = null,
                  t = null
                if (
                  (e.hasStart() && (n = e.getIndexStartValue()),
                  e.hasEnd() && (t = e.getIndexEndValue()),
                  e.getIndex() === je)
                ) {
                  var i =
                      'Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().',
                    r =
                      'Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.'
                  if (e.hasStart()) {
                    if (e.getIndexStartName() !== A) throw new Error(i)
                    if ('string' != typeof n) throw new Error(r)
                  }
                  if (e.hasEnd()) {
                    if (e.getIndexEndName() !== M) throw new Error(i)
                    if ('string' != typeof t) throw new Error(r)
                  }
                } else if (e.getIndex() === Xe) {
                  if ((null != n && !qi(n)) || (null != t && !qi(t)))
                    throw new Error(
                      'Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).',
                    )
                } else if (
                  ((0, f.assert)(
                    e.getIndex() instanceof dn || e.getIndex() === fn,
                    'unknown index type.',
                  ),
                  (null != n && 'object' == typeof n) ||
                    (null != t && 'object' == typeof t))
                )
                  throw new Error(
                    'Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.',
                  )
              }
              function Mr(e) {
                if (
                  e.hasStart() &&
                  e.hasEnd() &&
                  e.hasLimit() &&
                  !e.hasAnchoredLimit()
                )
                  throw new Error(
                    "Query: Can't combine startAt(), startAfter(), endAt(), endBefore(), and limit(). Use limitToFirst() or limitToLast() instead.",
                  )
              }
              fo._QueryImpl = Or
              class Lr extends Or {
                constructor(e, n) {
                  super(e, n, new Tn(), !1)
                }
                get parent() {
                  var e = xe(this._path)
                  return null === e ? null : new Lr(this._repo, e)
                }
                get root() {
                  let e = this
                  for (; null !== e.parent; ) e = e.parent
                  return e
                }
              }
              fo._ReferenceImpl = Lr
              class zr {
                constructor(e, n, t) {
                  ;(this._node = e), (this.ref = n), (this._index = t)
                }
                get priority() {
                  return this._node.getPriority().val()
                }
                get key() {
                  return this.ref.key
                }
                get size() {
                  return this._node.numChildren()
                }
                child(e) {
                  var n = new ge(e),
                    e = Fr(this.ref, e)
                  return new zr(this._node.getChild(n), e, Xe)
                }
                exists() {
                  return !this._node.isEmpty()
                }
                exportVal() {
                  return this._node.val(!0)
                }
                forEach(t) {
                  if (this._node.isLeafNode()) return !1
                  const e = this._node
                  return !!e.forEachChild(this._index, (e, n) =>
                    t(new zr(n, Fr(this.ref, e), Xe)),
                  )
                }
                hasChild(e) {
                  e = new ge(e)
                  return !this._node.getChild(e).isEmpty()
                }
                hasChildren() {
                  return !this._node.isLeafNode() && !this._node.isEmpty()
                }
                toJSON() {
                  return this.exportVal()
                }
                val() {
                  return this._node.val()
                }
              }
              function jr(e, n) {
                return (
                  (e = (0, f.getModularInstance)(e))._checkNotDeleted('ref'),
                  void 0 !== n ? Fr(e._root, n) : e._root
                )
              }
              function Fr(e, n) {
                return (
                  (null === be((e = (0, f.getModularInstance)(e))._path)
                    ? Gi
                    : Yi)('child', 'path', n, !1),
                  new Lr(e._repo, ke(e._path, n))
                )
              }
              function qr(e, n) {
                ;(e = (0, f.getModularInstance)(e)),
                  $i('set', e._path),
                  Ui('set', n, e._path, !1)
                const t = new f.Deferred()
                return (
                  dr(
                    e._repo,
                    e._path,
                    n,
                    null,
                    t.wrapCallback(() => {}),
                  ),
                  t.promise
                )
              }
              fo.DataSnapshot = zr
              class Ur {
                constructor(e) {
                  this.callbackContext = e
                }
                respondsTo(e) {
                  return 'value' === e
                }
                createEvent(e, n) {
                  var t = n._queryParams.getIndex()
                  return new Sr(
                    'value',
                    this,
                    new zr(e.snapshotNode, new Lr(n._repo, n._path), t),
                  )
                }
                getEventRunner(e) {
                  return 'cancel' === e.getEventType()
                    ? () => this.callbackContext.onCancel(e.error)
                    : () => this.callbackContext.onValue(e.snapshot, null)
                }
                createCancelEvent(e, n) {
                  return this.callbackContext.hasCancelCallback
                    ? new Pr(this, e, n)
                    : null
                }
                matches(e) {
                  return (
                    e instanceof Ur &&
                    (!e.callbackContext ||
                      !this.callbackContext ||
                      e.callbackContext.matches(this.callbackContext))
                  )
                }
                hasAnyCallback() {
                  return null !== this.callbackContext
                }
              }
              class Wr {
                constructor(e, n) {
                  ;(this.eventType = e), (this.callbackContext = n)
                }
                respondsTo(e) {
                  let n = 'children_added' === e ? 'child_added' : e
                  return (
                    (n = 'children_removed' === n ? 'child_removed' : n),
                    this.eventType === n
                  )
                }
                createCancelEvent(e, n) {
                  return this.callbackContext.hasCancelCallback
                    ? new Pr(this, e, n)
                    : null
                }
                createEvent(e, n) {
                  ;(0, f.assert)(
                    null != e.childName,
                    'Child events should have a childName.',
                  )
                  var t = Fr(new Lr(n._repo, n._path), e.childName),
                    n = n._queryParams.getIndex()
                  return new Sr(
                    e.type,
                    this,
                    new zr(e.snapshotNode, t, n),
                    e.prevName,
                  )
                }
                getEventRunner(e) {
                  return 'cancel' === e.getEventType()
                    ? () => this.callbackContext.onCancel(e.error)
                    : () => this.callbackContext.onValue(e.snapshot, e.prevName)
                }
                matches(e) {
                  return (
                    e instanceof Wr &&
                    this.eventType === e.eventType &&
                    (!this.callbackContext ||
                      !e.callbackContext ||
                      this.callbackContext.matches(e.callbackContext))
                  )
                }
                hasAnyCallback() {
                  return !!this.callbackContext
                }
              }
              function Br(t, e, n, i, r) {
                let o
                if (
                  ('object' == typeof i && ((o = void 0), (r = i)),
                  'function' == typeof i && (o = i),
                  r && r.onlyOnce)
                ) {
                  const s = n
                  r = (e, n) => {
                    fr(t._repo, t, a), s(e, n)
                  }
                  ;(r.userCallback = n.userCallback),
                    (r.context = n.context),
                    (n = r)
                }
                n = new Nr(n, o || void 0)
                const a = 'value' === e ? new Ur(n) : new Wr(e, n)
                return (
                  (function (e, n, t) {
                    let i
                    ;(i =
                      '.info' === be(n._path)
                        ? si(e.infoSyncTree_, n, t)
                        : si(e.serverSyncTree_, n, t)),
                      Ji(e.eventQueue_, n._path, i)
                  })(t._repo, t, a),
                  () => fr(t._repo, t, a)
                )
              }
              function Hr(e, n, t, i) {
                return Br(e, 'value', n, t, i)
              }
              class Vr {}
              class Yr extends (fo.QueryConstraint = Vr) {
                constructor(e, n) {
                  super(), (this._value = e), (this._key = n)
                }
                _apply(e) {
                  Ui('endAt', this._value, e._path, !0)
                  var n = Pn(e._queryParams, this._value, this._key)
                  if ((Mr(n), Ar(n), e._queryParams.hasEnd()))
                    throw new Error(
                      'endAt: Starting point was already set (by another call to endAt, endBefore or equalTo).',
                    )
                  return new Or(e._repo, e._path, n, e._orderByCalled)
                }
              }
              class Gr extends Vr {
                constructor(e, n) {
                  super(), (this._value = e), (this._key = n)
                }
                _apply(e) {
                  Ui('endBefore', this._value, e._path, !1)
                  var n = (function (e, n, t) {
                    let i, r
                    return (
                      (r =
                        e.index_ === je
                          ? Pn(e, (n = 'string' == typeof n ? pn(n) : n), t)
                          : ((i = null == t ? A : pn(t)), Pn(e, n, i))),
                      (r.endBeforeSet_ = !0),
                      r
                    )
                  })(e._queryParams, this._value, this._key)
                  if ((Mr(n), Ar(n), e._queryParams.hasEnd()))
                    throw new Error(
                      'endBefore: Starting point was already set (by another call to endAt, endBefore or equalTo).',
                    )
                  return new Or(e._repo, e._path, n, e._orderByCalled)
                }
              }
              class $r extends Vr {
                constructor(e, n) {
                  super(), (this._value = e), (this._key = n)
                }
                _apply(e) {
                  Ui('startAt', this._value, e._path, !0)
                  var n = Sn(e._queryParams, this._value, this._key)
                  if ((Mr(n), Ar(n), e._queryParams.hasStart()))
                    throw new Error(
                      'startAt: Starting point was already set (by another call to startAt, startBefore or equalTo).',
                    )
                  return new Or(e._repo, e._path, n, e._orderByCalled)
                }
              }
              class Qr extends Vr {
                constructor(e, n) {
                  super(), (this._value = e), (this._key = n)
                }
                _apply(e) {
                  Ui('startAfter', this._value, e._path, !1)
                  var n = (function (n, t, i) {
                    let r
                    if (n.index_ === je)
                      'string' == typeof t && (t = un(t)), (r = Sn(n, t, i))
                    else {
                      let e
                      ;(e = null == i ? M : un(i)), (r = Sn(n, t, e))
                    }
                    return (r.startAfterSet_ = !0), r
                  })(e._queryParams, this._value, this._key)
                  if ((Mr(n), Ar(n), e._queryParams.hasStart()))
                    throw new Error(
                      'startAfter: Starting point was already set (by another call to startAt, startAfter, or equalTo).',
                    )
                  return new Or(e._repo, e._path, n, e._orderByCalled)
                }
              }
              class Kr extends Vr {
                constructor(e) {
                  super(), (this._limit = e)
                }
                _apply(e) {
                  if (e._queryParams.hasLimit())
                    throw new Error(
                      'limitToFirst: Limit was already set (by another call to limitToFirst or limitToLast).',
                    )
                  return new Or(
                    e._repo,
                    e._path,
                    (function (e, n) {
                      const t = e.copy()
                      return (
                        (t.limitSet_ = !0),
                        (t.limit_ = n),
                        (t.viewFrom_ = 'l'),
                        t
                      )
                    })(e._queryParams, this._limit),
                    e._orderByCalled,
                  )
                }
              }
              class Xr extends Vr {
                constructor(e) {
                  super(), (this._limit = e)
                }
                _apply(e) {
                  if (e._queryParams.hasLimit())
                    throw new Error(
                      'limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).',
                    )
                  return new Or(
                    e._repo,
                    e._path,
                    (function (e, n) {
                      const t = e.copy()
                      return (
                        (t.limitSet_ = !0),
                        (t.limit_ = n),
                        (t.viewFrom_ = 'r'),
                        t
                      )
                    })(e._queryParams, this._limit),
                    e._orderByCalled,
                  )
                }
              }
              class Jr extends Vr {
                constructor(e) {
                  super(), (this._path = e)
                }
                _apply(e) {
                  Dr(e, 'orderByChild')
                  var n = new ge(this._path)
                  if (Ce(n))
                    throw new Error(
                      'orderByChild: cannot pass in empty path. Use orderByValue() instead.',
                    )
                  ;(n = new dn(n)), (n = Nn(e._queryParams, n))
                  return Ar(n), new Or(e._repo, e._path, n, !0)
                }
              }
              class Zr extends Vr {
                _apply(e) {
                  Dr(e, 'orderByKey')
                  var n = Nn(e._queryParams, je)
                  return Ar(n), new Or(e._repo, e._path, n, !0)
                }
              }
              class eo extends Vr {
                _apply(e) {
                  Dr(e, 'orderByPriority')
                  var n = Nn(e._queryParams, Xe)
                  return Ar(n), new Or(e._repo, e._path, n, !0)
                }
              }
              class no extends Vr {
                _apply(e) {
                  Dr(e, 'orderByValue')
                  var n = Nn(e._queryParams, fn)
                  return Ar(n), new Or(e._repo, e._path, n, !0)
                }
              }
              class to extends Vr {
                constructor(e, n) {
                  super(), (this._value = e), (this._key = n)
                }
                _apply(e) {
                  if (
                    (Ui('equalTo', this._value, e._path, !1),
                    e._queryParams.hasStart())
                  )
                    throw new Error(
                      'equalTo: Starting point was already set (by another call to startAt/startAfter or equalTo).',
                    )
                  if (e._queryParams.hasEnd())
                    throw new Error(
                      'equalTo: Ending point was already set (by another call to endAt/endBefore or equalTo).',
                    )
                  return new Yr(this._value, this._key)._apply(
                    new $r(this._value, this._key)._apply(e),
                  )
                }
              }
              ;(d = Lr),
                (0, f.assert)(
                  !Wt,
                  '__referenceConstructor has already been defined',
                ),
                (Wt = d),
                (u = Lr),
                (0, f.assert)(
                  !ei,
                  '__referenceConstructor has already been defined',
                ),
                (ei = u)
              const io = 'FIREBASE_DATABASE_EMULATOR_HOST',
                ro = {}
              let oo = !1
              function ao(e, n, t, i, r) {
                let o = i || e.options.databaseURL
                void 0 === o &&
                  (e.options.projectId ||
                    R(
                      "Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp().",
                    ),
                  N('Using default host for project ', e.options.projectId),
                  (o = `${e.options.projectId}-default-rtdb.firebaseio.com`))
                let a = Ir(o, r),
                  s = a.repoInfo,
                  l,
                  c = void 0
                void 0 !== uo && (c = uo.env[io]),
                  c
                    ? ((l = !0),
                      (o = `http://${c}?ns=${s.namespace}`),
                      (a = Ir(o, r)),
                      (s = a.repoInfo))
                    : (l = !a.repoInfo.secure)
                n = r && l ? new G(G.OWNER) : new Y(e.name, e.options, n)
                Qi('Invalid Firebase Database URL', a),
                  Ce(a.path) ||
                    R(
                      'Database URL must point to the root of a Firebase Database (not including a child path).',
                    )
                t = (function (e, n, t, i) {
                  let r = ro[n.name]
                  r || ((r = {}), (ro[n.name] = r))
                  n = r[e.toURLString()]
                  n &&
                    R(
                      'Database initialized multiple times. Please make sure the format of the database URL matches with each database() call.',
                    )
                  return (n = new ir(e, oo, t, i)), (r[e.toURLString()] = n)
                })(s, e, n, new V(e.name, t))
                return new so(t, e)
              }
              class so {
                constructor(e, n) {
                  ;(this._repoInternal = e),
                    (this.app = n),
                    (this.type = 'database'),
                    (this._instanceStarted = !1)
                }
                get _repo() {
                  return (
                    this._instanceStarted ||
                      (rr(
                        this._repoInternal,
                        this.app.options.appId,
                        this.app.options.databaseAuthVariableOverride,
                      ),
                      (this._instanceStarted = !0)),
                    this._repoInternal
                  )
                }
                get _root() {
                  return (
                    this._rootInternal ||
                      (this._rootInternal = new Lr(this._repo, me())),
                    this._rootInternal
                  )
                }
                _delete() {
                  return (
                    null !== this._rootInternal &&
                      ((function (e, n) {
                        const t = ro[n]
                        ;(t && t[e.key] === e) ||
                          R(
                            `Database ${n}(${e.repoInfo_}) has already been deleted.`,
                          ),
                          gr(e),
                          delete t[e.key]
                      })(this._repo, this.app.name),
                      (this._repoInternal = null),
                      (this._rootInternal = null)),
                    Promise.resolve()
                  )
                }
                _checkNotDeleted(e) {
                  null === this._rootInternal &&
                    R('Cannot call ' + e + ' on a deleted database.')
                }
              }
              fo.Database = so
              const lo = { '.sv': 'timestamp' }
              class co {
                constructor(e, n) {
                  ;(this.committed = e), (this.snapshot = n)
                }
                toJSON() {
                  return {
                    committed: this.committed,
                    snapshot: this.snapshot.toJSON(),
                  }
                }
              }
              ;(fo.TransactionResult = co),
                De,
                (De.prototype.simpleListen = function (e, n) {
                  this.sendRequest('q', { p: e }, n)
                }),
                (De.prototype.echo = function (e, n) {
                  this.sendRequest('echo', { d: e }, n)
                }),
                ce
              ;(fo._TEST_ACCESS_hijackHash = function (r) {
                const o = De.prototype.put
                return (
                  (De.prototype.put = function (e, n, t, i) {
                    void 0 !== i && (i = r()), o.call(this, e, n, t, i)
                  }),
                  function () {
                    De.prototype.put = o
                  }
                )
              }),
                X
              var ho
              ;(fo._TEST_ACCESS_forceRestClient = function (e) {
                ;(e = e), (oo = e)
              }),
                r(t.SDK_VERSION),
                (0, t._registerComponent)(
                  new e.Component(
                    'database',
                    (e, { instanceIdentifier: n }) => {
                      return ao(
                        e.getProvider('app').getImmediate(),
                        e.getProvider('auth-internal'),
                        e.getProvider('app-check-internal'),
                        n,
                      )
                    },
                    'PUBLIC',
                  ).setMultipleInstances(!0),
                ),
                (0, t.registerVersion)(n, '0.12.2', ho),
                (0, t.registerVersion)(n, '0.12.2', 'esm2017')
            }.call(this)
          }.call(this, po('_process'))
        },
        {
          '@firebase/app': 2,
          '@firebase/component': 3,
          '@firebase/logger': 5,
          '@firebase/util': 6,
          _process: 11,
        },
      ],
      5: [
        function (e, n, t) {
          'use strict'
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.Logger = t.LogLevel = void 0),
            (t.setLogLevel = function (n) {
              i.forEach((e) => {
                e.setLogLevel(n)
              })
            }),
            (t.setUserLogHandler = function (o, e) {
              for (const n of i) {
                let r = null
                e && e.level && (r = s[e.level]),
                  (n.userLogHandler =
                    null === o
                      ? null
                      : (e, n, ...t) => {
                          var i = t
                            .map((e) => {
                              if (null == e) return null
                              if ('string' == typeof e) return e
                              if ('number' == typeof e || 'boolean' == typeof e)
                                return e.toString()
                              if (e instanceof Error) return e.message
                              try {
                                return JSON.stringify(e)
                              } catch (e) {
                                return null
                              }
                            })
                            .filter((e) => e)
                            .join(' ')
                          n >= (null !== r && void 0 !== r ? r : e.logLevel) &&
                            o({
                              level: a[n].toLowerCase(),
                              message: i,
                              args: t,
                              type: e.name,
                            })
                        })
              }
            })
          const i = []
          var a, r
          ;(t.LogLevel = a),
            ((r = a || (t.LogLevel = a = {}))[(r.DEBUG = 0)] = 'DEBUG'),
            (r[(r.VERBOSE = 1)] = 'VERBOSE'),
            (r[(r.INFO = 2)] = 'INFO'),
            (r[(r.WARN = 3)] = 'WARN'),
            (r[(r.ERROR = 4)] = 'ERROR'),
            (r[(r.SILENT = 5)] = 'SILENT')
          const s = {
              debug: a.DEBUG,
              verbose: a.VERBOSE,
              info: a.INFO,
              warn: a.WARN,
              error: a.ERROR,
              silent: a.SILENT,
            },
            o = a.INFO,
            l = {
              [a.DEBUG]: 'log',
              [a.VERBOSE]: 'log',
              [a.INFO]: 'info',
              [a.WARN]: 'warn',
              [a.ERROR]: 'error',
            },
            c = (e, n) => {
              if (!(n < e.logLevel)) {
                new Date().toISOString()
                e = l[n]
                if (!e)
                  throw new Error(
                    `Attempted to log a message with an invalid logType (value: ${n})`,
                  )
              }
            }
          t.Logger = class {
            constructor(e) {
              ;(this.name = e),
                (this._logLevel = o),
                (this._logHandler = c),
                (this._userLogHandler = null),
                i.push(this)
            }
            get logLevel() {
              return this._logLevel
            }
            set logLevel(e) {
              if (!(e in a))
                throw new TypeError(
                  `Invalid value "${e}" assigned to \`logLevel\``,
                )
              this._logLevel = e
            }
            setLogLevel(e) {
              this._logLevel = 'string' == typeof e ? s[e] : e
            }
            get logHandler() {
              return this._logHandler
            }
            set logHandler(e) {
              if ('function' != typeof e)
                throw new TypeError(
                  'Value assigned to `logHandler` must be a function',
                )
              this._logHandler = e
            }
            get userLogHandler() {
              return this._userLogHandler
            }
            set userLogHandler(e) {
              this._userLogHandler = e
            }
            debug(...e) {
              this._userLogHandler && this._userLogHandler(this, a.DEBUG, ...e),
                this._logHandler(this, a.DEBUG, ...e)
            }
            log(...e) {
              this._userLogHandler &&
                this._userLogHandler(this, a.VERBOSE, ...e),
                this._logHandler(this, a.VERBOSE, ...e)
            }
            info(...e) {
              this._userLogHandler && this._userLogHandler(this, a.INFO, ...e),
                this._logHandler(this, a.INFO, ...e)
            }
            warn(...e) {
              this._userLogHandler && this._userLogHandler(this, a.WARN, ...e),
                this._logHandler(this, a.WARN, ...e)
            }
            error(...e) {
              this._userLogHandler && this._userLogHandler(this, a.ERROR, ...e),
                this._logHandler(this, a.ERROR, ...e)
            }
          }
        },
        {},
      ],
      6: [
        function (e, n, E) {
          !function (C) {
            !function () {
              'use strict'
              Object.defineProperty(E, '__esModule', { value: !0 }),
                (E.Sha1 = E.RANDOM_FACTOR = E.MAX_VALUE_MILLIS = E.FirebaseError = E.ErrorFactory = E.Deferred = E.CONSTANTS = void 0),
                (E.areCookiesEnabled = function () {
                  return !(
                    'undefined' == typeof navigator || !navigator.cookieEnabled
                  )
                }),
                (E.assertionError = E.assert = void 0),
                (E.async = function (n, t) {
                  return (...e) => {
                    Promise.resolve(!0)
                      .then(() => {
                        n(...e)
                      })
                      .catch((e) => {
                        t && t(e)
                      })
                  }
                }),
                (E.base64urlEncodeWithoutPadding = E.base64Encode = E.base64Decode = E.base64 = void 0),
                (E.calculateBackoffMillis = function (e, n = v, t = w) {
                  ;(t = n * Math.pow(t, e)),
                    (e = Math.round(k * t * (Math.random() - 0.5) * 2))
                  return Math.min(x, t + e)
                }),
                (E.contains = function (e, n) {
                  return Object.prototype.hasOwnProperty.call(e, n)
                }),
                (E.createMockUserToken = function (e, n) {
                  if (e.uid)
                    throw new Error(
                      'The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.',
                    )
                  var t = n || 'demo-project',
                    i = e.iat || 0,
                    n = e.sub || e.user_id
                  if (!n)
                    throw new Error(
                      "mockUserToken must contain 'sub' or 'user_id' field!",
                    )
                  e = Object.assign(
                    {
                      iss: `https://securetoken.google.com/${t}`,
                      aud: t,
                      iat: i,
                      exp: i + 3600,
                      auth_time: i,
                      sub: n,
                      user_id: n,
                      firebase: { sign_in_provider: 'custom', identities: {} },
                    },
                    e,
                  )
                  return [
                    a(JSON.stringify({ alg: 'none', type: 'JWT' })),
                    a(JSON.stringify(e)),
                    '',
                  ].join('.')
                }),
                (E.createSubscribe = function (e, n) {
                  const t = new b(e, n)
                  return t.subscribe.bind(t)
                }),
                (E.decode = void 0),
                (E.deepCopy = function (e) {
                  return c(void 0, e)
                }),
                (E.deepEqual = function e(n, t) {
                  if (n === t) return !0
                  const i = Object.keys(n)
                  const r = Object.keys(t)
                  for (const o of i) {
                    if (!r.includes(o)) return !1
                    const a = n[o],
                      s = t[o]
                    if (m(a) && m(s)) {
                      if (!e(a, s)) return !1
                    } else if (a !== s) return !1
                  }
                  for (const l of r) if (!i.includes(l)) return !1
                  return !0
                }),
                (E.deepExtend = c),
                (E.errorPrefix = y),
                (E.extractQuerystring = function (e) {
                  var n = e.indexOf('?')
                  if (!n) return ''
                  var t = e.indexOf('#', n)
                  return e.substring(n, 0 < t ? t : void 0)
                }),
                (E.getGlobal = function () {
                  if ('undefined' != typeof self) return self
                  if ('undefined' != typeof window) return window
                  if (void 0 === C)
                    throw new Error('Unable to locate global object.')
                  return C
                }),
                (E.getModularInstance = function (e) {
                  return e && e._delegate ? e._delegate : e
                }),
                (E.getUA = h),
                (E.isAdmin = void 0),
                (E.isBrowser = function () {
                  return 'object' == typeof self && self.self === self
                }),
                (E.isBrowserExtension = function () {
                  var e =
                    'object' == typeof chrome
                      ? chrome.runtime
                      : 'object' == typeof browser
                      ? browser.runtime
                      : void 0
                  return 'object' == typeof e && void 0 !== e.id
                }),
                (E.isElectron = function () {
                  return 0 <= h().indexOf('Electron/')
                }),
                (E.isEmpty = function (e) {
                  for (const n in e)
                    if (Object.prototype.hasOwnProperty.call(e, n)) return !1
                  return !0
                }),
                (E.isIE = function () {
                  const e = h()
                  return 0 <= e.indexOf('MSIE ') || 0 <= e.indexOf('Trident/')
                }),
                (E.isIndexedDBAvailable = function () {
                  return 'object' == typeof indexedDB
                }),
                (E.isMobileCordova = function () {
                  return (
                    'undefined' != typeof window &&
                    !!(window.cordova || window.phonegap || window.PhoneGap) &&
                    /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(
                      h(),
                    )
                  )
                }),
                (E.isNode = e),
                (E.isNodeSdk = function () {
                  return !0 === n.NODE_CLIENT || !0 === n.NODE_ADMIN
                }),
                (E.isReactNative = function () {
                  return (
                    'object' == typeof navigator &&
                    'ReactNative' === navigator.product
                  )
                }),
                (E.isSafari = function () {
                  return (
                    !e() &&
                    navigator.userAgent.includes('Safari') &&
                    !navigator.userAgent.includes('Chrome')
                  )
                }),
                (E.isUWP = function () {
                  return 0 <= h().indexOf('MSAppHost/')
                }),
                (E.issuedAtTime = E.isValidTimestamp = E.isValidFormat = void 0),
                (E.jsonEval = f),
                (E.map = function (e, n, t) {
                  const i = {}
                  for (const r in e)
                    Object.prototype.hasOwnProperty.call(e, r) &&
                      (i[r] = n.call(t, e[r], r, e))
                  return i
                }),
                (E.ordinal = function (e) {
                  return Number.isFinite(e)
                    ? e +
                        (function (e) {
                          var n = (e = Math.abs(e)) % 100
                          if (10 <= n && n <= 20) return 'th'
                          e %= 10
                          return 1 != e
                            ? 2 != e
                              ? 3 != e
                                ? 'th'
                                : 'rd'
                              : 'nd'
                            : 'st'
                        })(e)
                    : `${e}`
                }),
                (E.querystring = function (e) {
                  const n = []
                  for (const [t, i] of Object.entries(e))
                    Array.isArray(i)
                      ? i.forEach((e) => {
                          n.push(
                            encodeURIComponent(t) + '=' + encodeURIComponent(e),
                          )
                        })
                      : n.push(
                          encodeURIComponent(t) + '=' + encodeURIComponent(i),
                        )
                  return n.length ? '&' + n.join('&') : ''
                }),
                (E.querystringDecode = function (e) {
                  const t = {},
                    n = e.replace(/^\?/, '').split('&')
                  return (
                    n.forEach((e) => {
                      var n
                      e &&
                        (([n, e] = e.split('=')),
                        (t[decodeURIComponent(n)] = decodeURIComponent(e)))
                    }),
                    t
                  )
                }),
                (E.safeGet = function (e, n) {
                  if (Object.prototype.hasOwnProperty.call(e, n)) return e[n]
                }),
                (E.stringToByteArray = E.stringLength = void 0),
                (E.stringify = function (e) {
                  return JSON.stringify(e)
                }),
                (E.validateArgCount = void 0),
                (E.validateCallback = function (e, n, t, i) {
                  if ((!i || t) && 'function' != typeof t)
                    throw new Error(y(e, n) + 'must be a valid function.')
                }),
                (E.validateContextObject = function (e, n, t, i) {
                  if ((!i || t) && ('object' != typeof t || null === t))
                    throw new Error(y(e, n) + 'must be a valid context object.')
                }),
                (E.validateIndexedDBOpenable = function () {
                  return new Promise((n, t) => {
                    try {
                      let e = !0
                      const i =
                          'validate-browser-context-for-indexeddb-analytics-module',
                        r = self.indexedDB.open(i)
                      ;(r.onsuccess = () => {
                        r.result.close(),
                          e || self.indexedDB.deleteDatabase(i),
                          n(!0)
                      }),
                        (r.onupgradeneeded = () => {
                          e = !1
                        }),
                        (r.onerror = () => {
                          var e
                          t(
                            (null === (e = r.error) || void 0 === e
                              ? void 0
                              : e.message) || '',
                          )
                        })
                    } catch (e) {
                      t(e)
                    }
                  })
                })
              const n = {
                NODE_CLIENT: !(E.validateNamespace = function (e, n, t) {
                  if ((!t || n) && 'string' != typeof n)
                    throw new Error(
                      y(e, 'namespace') + 'must be a valid firebase namespace.',
                    )
                }),
                NODE_ADMIN: !1,
                SDK_VERSION: '${JSCORE_VERSION}',
              }
              E.CONSTANTS = n
              function s(e, n) {
                if (!e) throw t(n)
              }
              E.assert = s
              const t = function (e) {
                return new Error(
                  'Firebase Database (' +
                    n.SDK_VERSION +
                    ') INTERNAL ASSERT FAILED: ' +
                    e,
                )
              }
              E.assertionError = t
              function i(t) {
                const i = []
                let r = 0
                for (let n = 0; n < t.length; n++) {
                  let e = t.charCodeAt(n)
                  e < 128
                    ? (i[r++] = e)
                    : (e < 2048
                        ? (i[r++] = (e >> 6) | 192)
                        : (55296 == (64512 & e) &&
                          n + 1 < t.length &&
                          56320 == (64512 & t.charCodeAt(n + 1))
                            ? ((e =
                                65536 +
                                ((1023 & e) << 10) +
                                (1023 & t.charCodeAt(++n))),
                              (i[r++] = (e >> 18) | 240),
                              (i[r++] = ((e >> 12) & 63) | 128))
                            : (i[r++] = (e >> 12) | 224),
                          (i[r++] = ((e >> 6) & 63) | 128)),
                      (i[r++] = (63 & e) | 128))
                }
                return i
              }
              const r = {
                byteToCharMap_: null,
                charToByteMap_: null,
                byteToCharMapWebSafe_: null,
                charToByteMapWebSafe_: null,
                ENCODED_VALS_BASE:
                  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
                get ENCODED_VALS() {
                  return this.ENCODED_VALS_BASE + '+/='
                },
                get ENCODED_VALS_WEBSAFE() {
                  return this.ENCODED_VALS_BASE + '-_.'
                },
                HAS_NATIVE_SUPPORT: 'function' == typeof atob,
                encodeByteArray(i, e) {
                  if (!Array.isArray(i))
                    throw Error('encodeByteArray takes an array as a parameter')
                  this.init_()
                  var r = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_
                  const o = []
                  for (let t = 0; t < i.length; t += 3) {
                    var a = i[t],
                      s = t + 1 < i.length,
                      l = s ? i[t + 1] : 0,
                      c = t + 2 < i.length,
                      h = c ? i[t + 2] : 0
                    let e = ((15 & l) << 2) | (h >> 6),
                      n = 63 & h
                    c || ((n = 64), s || (e = 64)),
                      o.push(
                        r[a >> 2],
                        r[((3 & a) << 4) | (l >> 4)],
                        r[e],
                        r[n],
                      )
                  }
                  return o.join('')
                },
                encodeString(e, n) {
                  return this.HAS_NATIVE_SUPPORT && !n
                    ? btoa(e)
                    : this.encodeByteArray(i(e), n)
                },
                decodeString(e, n) {
                  return this.HAS_NATIVE_SUPPORT && !n
                    ? atob(e)
                    : (function (e) {
                        const n = []
                        let t = 0,
                          i = 0
                        for (; t < e.length; ) {
                          var r,
                            o,
                            a = e[t++]
                          a < 128
                            ? (n[i++] = String.fromCharCode(a))
                            : 191 < a && a < 224
                            ? ((r = e[t++]),
                              (n[i++] = String.fromCharCode(
                                ((31 & a) << 6) | (63 & r),
                              )))
                            : 239 < a && a < 365
                            ? ((o =
                                (((7 & a) << 18) |
                                  ((63 & e[t++]) << 12) |
                                  ((63 & e[t++]) << 6) |
                                  (63 & e[t++])) -
                                65536),
                              (n[i++] = String.fromCharCode(55296 + (o >> 10))),
                              (n[i++] = String.fromCharCode(
                                56320 + (1023 & o),
                              )))
                            : ((r = e[t++]),
                              (o = e[t++]),
                              (n[i++] = String.fromCharCode(
                                ((15 & a) << 12) | ((63 & r) << 6) | (63 & o),
                              )))
                        }
                        return n.join('')
                      })(this.decodeStringToByteArray(e, n))
                },
                decodeStringToByteArray(n, e) {
                  this.init_()
                  var t = e ? this.charToByteMapWebSafe_ : this.charToByteMap_
                  const i = []
                  for (let e = 0; e < n.length; ) {
                    var r = t[n.charAt(e++)],
                      o = e < n.length ? t[n.charAt(e)] : 0
                    ++e
                    var a = e < n.length ? t[n.charAt(e)] : 64
                    ++e
                    var s = e < n.length ? t[n.charAt(e)] : 64
                    if ((++e, null == r || null == o || null == a || null == s))
                      throw Error()
                    i.push((r << 2) | (o >> 4)),
                      64 !== a &&
                        (i.push(((o << 4) & 240) | (a >> 2)),
                        64 !== s && i.push(((a << 6) & 192) | s))
                  }
                  return i
                },
                init_() {
                  if (!this.byteToCharMap_) {
                    ;(this.byteToCharMap_ = {}),
                      (this.charToByteMap_ = {}),
                      (this.byteToCharMapWebSafe_ = {}),
                      (this.charToByteMapWebSafe_ = {})
                    for (let e = 0; e < this.ENCODED_VALS.length; e++)
                      (this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e)),
                        (this.charToByteMap_[this.byteToCharMap_[e]] = e),
                        (this.byteToCharMapWebSafe_[
                          e
                        ] = this.ENCODED_VALS_WEBSAFE.charAt(e)),
                        (this.charToByteMapWebSafe_[
                          this.byteToCharMapWebSafe_[e]
                        ] = e),
                        e >= this.ENCODED_VALS_BASE.length &&
                          ((this.charToByteMap_[
                            this.ENCODED_VALS_WEBSAFE.charAt(e)
                          ] = e),
                          (this.charToByteMapWebSafe_[
                            this.ENCODED_VALS.charAt(e)
                          ] = e))
                  }
                },
              }
              E.base64 = r
              function o(e) {
                return (e = i(e)), r.encodeByteArray(e, !0)
              }
              E.base64Encode = o
              const a = function (e) {
                return o(e).replace(/\./g, '')
              }
              E.base64urlEncodeWithoutPadding = a
              function l(e) {
                try {
                  return r.decodeString(e, !0)
                } catch (e) {}
                return null
              }
              function c(e, n) {
                if (!(n instanceof Object)) return n
                switch (n.constructor) {
                  case Date:
                    const t = n
                    return new Date(t.getTime())
                  case Object:
                    void 0 === e && (e = {})
                    break
                  case Array:
                    e = []
                    break
                  default:
                    return n
                }
                for (const i in n)
                  n.hasOwnProperty(i) &&
                    '__proto__' !== i &&
                    (e[i] = c(e[i], n[i]))
                return e
              }
              E.base64Decode = l
              function h() {
                return 'undefined' != typeof navigator &&
                  'string' == typeof navigator.userAgent
                  ? navigator.userAgent
                  : ''
              }
              function e() {
                try {
                  return (
                    '[object process]' ===
                    Object.prototype.toString.call(C.process)
                  )
                } catch (e) {
                  return !1
                }
              }
              E.Deferred = class {
                constructor() {
                  ;(this.reject = () => {}),
                    (this.resolve = () => {}),
                    (this.promise = new Promise((e, n) => {
                      ;(this.resolve = e), (this.reject = n)
                    }))
                }
                wrapCallback(t) {
                  return (e, n) => {
                    e ? this.reject(e) : this.resolve(n),
                      'function' == typeof t &&
                        (this.promise.catch(() => {}),
                        1 === t.length ? t(e) : t(e, n))
                  }
                }
              }
              class d extends Error {
                constructor(e, n, t) {
                  super(n),
                    (this.code = e),
                    (this.customData = t),
                    (this.name = 'FirebaseError'),
                    Object.setPrototypeOf(this, d.prototype),
                    Error.captureStackTrace &&
                      Error.captureStackTrace(this, u.prototype.create)
                }
              }
              E.FirebaseError = d
              class u {
                constructor(e, n, t) {
                  ;(this.service = e), (this.serviceName = n), (this.errors = t)
                }
                create(e, ...n) {
                  var i,
                    t = n[0] || {},
                    n = `${this.service}/${e}`,
                    e = this.errors[e],
                    e = e
                      ? ((i = t),
                        e.replace(p, (e, n) => {
                          var t = i[n]
                          return null != t ? String(t) : `<${n}?>`
                        }))
                      : 'Error',
                    e = `${this.serviceName}: ${e} (${n}).`
                  return new d(n, e, t)
                }
              }
              E.ErrorFactory = u
              const p = /\{\$([^}]+)}/g
              function f(e) {
                return JSON.parse(e)
              }
              function g(e) {
                let n = {},
                  t = {},
                  i = {},
                  r = ''
                try {
                  var o = e.split('.')
                  ;(n = f(l(o[0]) || '')),
                    (t = f(l(o[1]) || '')),
                    (r = o[2]),
                    (i = t.d || {}),
                    delete t.d
                } catch (e) {}
                return { header: n, claims: t, data: i, signature: r }
              }
              E.decode = g
              E.isValidTimestamp = function (e) {
                const n = g(e).claims
                e = Math.floor(new Date().getTime() / 1e3)
                let t = 0,
                  i = 0
                return (
                  'object' == typeof n &&
                    (n.hasOwnProperty('nbf')
                      ? (t = n.nbf)
                      : n.hasOwnProperty('iat') && (t = n.iat),
                    (i = n.hasOwnProperty('exp') ? n.exp : t + 86400)),
                  !!e && !!t && !!i && e >= t && e <= i
                )
              }
              E.issuedAtTime = function (e) {
                const n = g(e).claims
                return 'object' == typeof n && n.hasOwnProperty('iat')
                  ? n.iat
                  : null
              }
              E.isValidFormat = function (e) {
                const n = g(e),
                  t = n.claims
                return !!t && 'object' == typeof t && t.hasOwnProperty('iat')
              }
              function m(e) {
                return null !== e && 'object' == typeof e
              }
              E.isAdmin = function (e) {
                e = g(e).claims
                return 'object' == typeof e && !0 === e.admin
              }
              E.Sha1 = class {
                constructor() {
                  ;(this.chain_ = []),
                    (this.buf_ = []),
                    (this.W_ = []),
                    (this.pad_ = []),
                    (this.inbuf_ = 0),
                    (this.total_ = 0),
                    (this.blockSize = 64),
                    (this.pad_[0] = 128)
                  for (let e = 1; e < this.blockSize; ++e) this.pad_[e] = 0
                  this.reset()
                }
                reset() {
                  ;(this.chain_[0] = 1732584193),
                    (this.chain_[1] = 4023233417),
                    (this.chain_[2] = 2562383102),
                    (this.chain_[3] = 271733878),
                    (this.chain_[4] = 3285377520),
                    (this.inbuf_ = 0),
                    (this.total_ = 0)
                }
                compress_(n, t) {
                  t = t || 0
                  const i = this.W_
                  if ('string' == typeof n)
                    for (let e = 0; e < 16; e++)
                      (i[e] =
                        (n.charCodeAt(t) << 24) |
                        (n.charCodeAt(t + 1) << 16) |
                        (n.charCodeAt(t + 2) << 8) |
                        n.charCodeAt(t + 3)),
                        (t += 4)
                  else
                    for (let e = 0; e < 16; e++)
                      (i[e] =
                        (n[t] << 24) |
                        (n[t + 1] << 16) |
                        (n[t + 2] << 8) |
                        n[t + 3]),
                        (t += 4)
                  for (let e = 16; e < 80; e++) {
                    var r = i[e - 3] ^ i[e - 8] ^ i[e - 14] ^ i[e - 16]
                    i[e] = 4294967295 & ((r << 1) | (r >>> 31))
                  }
                  let o = this.chain_[0],
                    a = this.chain_[1],
                    s = this.chain_[2],
                    l = this.chain_[3],
                    c = this.chain_[4],
                    h,
                    d
                  for (let e = 0; e < 80; e++) {
                    d =
                      e < 40
                        ? e < 20
                          ? ((h = l ^ (a & (s ^ l))), 1518500249)
                          : ((h = a ^ s ^ l), 1859775393)
                        : e < 60
                        ? ((h = (a & s) | (l & (a | s))), 2400959708)
                        : ((h = a ^ s ^ l), 3395469782)
                    var u =
                      (((o << 5) | (o >>> 27)) + h + c + d + i[e]) & 4294967295
                    ;(c = l),
                      (l = s),
                      (s = 4294967295 & ((a << 30) | (a >>> 2))),
                      (a = o),
                      (o = u)
                  }
                  ;(this.chain_[0] = (this.chain_[0] + o) & 4294967295),
                    (this.chain_[1] = (this.chain_[1] + a) & 4294967295),
                    (this.chain_[2] = (this.chain_[2] + s) & 4294967295),
                    (this.chain_[3] = (this.chain_[3] + l) & 4294967295),
                    (this.chain_[4] = (this.chain_[4] + c) & 4294967295)
                }
                update(t, i) {
                  if (null != t) {
                    var r = (i = void 0 === i ? t.length : i) - this.blockSize
                    let e = 0
                    const o = this.buf_
                    let n = this.inbuf_
                    for (; e < i; ) {
                      if (0 === n)
                        for (; e <= r; )
                          this.compress_(t, e), (e += this.blockSize)
                      if ('string' == typeof t) {
                        for (; e < i; )
                          if (
                            ((o[n] = t.charCodeAt(e)),
                            ++n,
                            ++e,
                            n === this.blockSize)
                          ) {
                            this.compress_(o), (n = 0)
                            break
                          }
                      } else
                        for (; e < i; )
                          if (((o[n] = t[e]), ++n, ++e, n === this.blockSize)) {
                            this.compress_(o), (n = 0)
                            break
                          }
                    }
                    ;(this.inbuf_ = n), (this.total_ += i)
                  }
                }
                digest() {
                  const t = []
                  let n = 8 * this.total_
                  this.inbuf_ < 56
                    ? this.update(this.pad_, 56 - this.inbuf_)
                    : this.update(
                        this.pad_,
                        this.blockSize - (this.inbuf_ - 56),
                      )
                  for (let e = this.blockSize - 1; 56 <= e; e--)
                    (this.buf_[e] = 255 & n), (n /= 256)
                  this.compress_(this.buf_)
                  let i = 0
                  for (let n = 0; n < 5; n++)
                    for (let e = 24; 0 <= e; e -= 8)
                      (t[i] = (this.chain_[n] >> e) & 255), ++i
                  return t
                }
              }
              class b {
                constructor(e, n) {
                  ;(this.observers = []),
                    (this.unsubscribes = []),
                    (this.observerCount = 0),
                    (this.task = Promise.resolve()),
                    (this.finalized = !1),
                    (this.onNoObservers = n),
                    this.task
                      .then(() => {
                        e(this)
                      })
                      .catch((e) => {
                        this.error(e)
                      })
                }
                next(n) {
                  this.forEachObserver((e) => {
                    e.next(n)
                  })
                }
                error(n) {
                  this.forEachObserver((e) => {
                    e.error(n)
                  }),
                    this.close(n)
                }
                complete() {
                  this.forEachObserver((e) => {
                    e.complete()
                  }),
                    this.close()
                }
                subscribe(e, n, t) {
                  let i
                  if (void 0 === e && void 0 === n && void 0 === t)
                    throw new Error('Missing Observer.')
                  ;(i = (function (e, n) {
                    if ('object' != typeof e || null === e) return !1
                    for (const t of n)
                      if (t in e && 'function' == typeof e[t]) return !0
                    return !1
                  })(e, ['next', 'error', 'complete'])
                    ? e
                    : { next: e, error: n, complete: t }),
                    void 0 === i.next && (i.next = _),
                    void 0 === i.error && (i.error = _),
                    void 0 === i.complete && (i.complete = _)
                  t = this.unsubscribeOne.bind(this, this.observers.length)
                  return (
                    this.finalized &&
                      this.task.then(() => {
                        try {
                          this.finalError
                            ? i.error(this.finalError)
                            : i.complete()
                        } catch (e) {}
                      }),
                    this.observers.push(i),
                    t
                  )
                }
                unsubscribeOne(e) {
                  void 0 !== this.observers &&
                    void 0 !== this.observers[e] &&
                    (delete this.observers[e],
                    --this.observerCount,
                    0 === this.observerCount &&
                      void 0 !== this.onNoObservers &&
                      this.onNoObservers(this))
                }
                forEachObserver(n) {
                  if (!this.finalized)
                    for (let e = 0; e < this.observers.length; e++)
                      this.sendOne(e, n)
                }
                sendOne(e, n) {
                  this.task.then(() => {
                    if (
                      void 0 !== this.observers &&
                      void 0 !== this.observers[e]
                    )
                      try {
                        n(this.observers[e])
                      } catch (e) {}
                  })
                }
                close(e) {
                  this.finalized ||
                    ((this.finalized = !0),
                    void 0 !== e && (this.finalError = e),
                    this.task.then(() => {
                      ;(this.observers = void 0), (this.onNoObservers = void 0)
                    }))
                }
              }
              function _() {}
              function y(e, n) {
                return `${e} failed: ${n} argument `
              }
              E.validateArgCount = function (e, n, t, i) {
                let r
                if (
                  (i < n
                    ? (r = 'at least ' + n)
                    : t < i && (r = 0 === t ? 'none' : 'no more than ' + t),
                  r)
                ) {
                  i =
                    e +
                    ' failed: Was called with ' +
                    i +
                    (1 === i ? ' argument.' : ' arguments.') +
                    ' Expects ' +
                    r +
                    '.'
                  throw new Error(i)
                }
              }
              E.stringToByteArray = function (t) {
                const i = []
                let r = 0
                for (let n = 0; n < t.length; n++) {
                  let e = t.charCodeAt(n)
                  var o, a
                  55296 <= e &&
                    e <= 56319 &&
                    ((o = e - 55296),
                    n++,
                    s(n < t.length, 'Surrogate pair missing trail surrogate.'),
                    (a = t.charCodeAt(n) - 56320),
                    (e = 65536 + (o << 10) + a)),
                    e < 128
                      ? (i[r++] = e)
                      : (e < 2048
                          ? (i[r++] = (e >> 6) | 192)
                          : (e < 65536
                              ? (i[r++] = (e >> 12) | 224)
                              : ((i[r++] = (e >> 18) | 240),
                                (i[r++] = ((e >> 12) & 63) | 128)),
                            (i[r++] = ((e >> 6) & 63) | 128)),
                        (i[r++] = (63 & e) | 128))
                }
                return i
              }
              E.stringLength = function (n) {
                let t = 0
                for (let e = 0; e < n.length; e++) {
                  var i = n.charCodeAt(e)
                  i < 128
                    ? t++
                    : i < 2048
                    ? (t += 2)
                    : 55296 <= i && i <= 56319
                    ? ((t += 4), e++)
                    : (t += 3)
                }
                return t
              }
              const v = 1e3,
                w = 2,
                x = 144e5
              E.MAX_VALUE_MILLIS = x
              const k = 0.5
              E.RANDOM_FACTOR = k
            }.call(this)
          }.call(
            this,
            'undefined' != typeof global
              ? global
              : 'undefined' != typeof self
              ? self
              : 'undefined' != typeof window
              ? window
              : {},
          )
        },
        {},
      ],
      7: [
        function (e, n, t) {
          'use strict'
          Object.defineProperty(t, '__esModule', { value: !0 })
          var i = e('@firebase/app')
          Object.keys(i).forEach(function (e) {
            'default' !== e &&
              '__esModule' !== e &&
              ((e in t && t[e] === i[e]) ||
                Object.defineProperty(t, e, {
                  enumerable: !0,
                  get: function () {
                    return i[e]
                  },
                }))
          })
          ;(0, i.registerVersion)('firebase', '9.1.3', 'app')
        },
        { '@firebase/app': 2 },
      ],
      8: [
        function (e, n, t) {
          'use strict'
          Object.defineProperty(t, '__esModule', { value: !0 })
          var i = e('@firebase/database')
          Object.keys(i).forEach(function (e) {
            'default' !== e &&
              '__esModule' !== e &&
              ((e in t && t[e] === i[e]) ||
                Object.defineProperty(t, e, {
                  enumerable: !0,
                  get: function () {
                    return i[e]
                  },
                }))
          })
        },
        { '@firebase/database': 4 },
      ],
      9: [
        function (e, n, t) {
          'use strict'
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.__assign = void 0),
            (t.__asyncDelegator = function (i) {
              var e, r
              return (
                (e = {}),
                n('next'),
                n('throw', function (e) {
                  throw e
                }),
                n('return'),
                (e[Symbol.iterator] = function () {
                  return this
                }),
                e
              )
              function n(n, t) {
                e[n] = i[n]
                  ? function (e) {
                      return (r = !r)
                        ? { value: d(i[n](e)), done: 'return' === n }
                        : t
                        ? t(e)
                        : e
                    }
                  : t
              }
            }),
            (t.__asyncGenerator = function (e, n, t) {
              if (!Symbol.asyncIterator)
                throw new TypeError('Symbol.asyncIterator is not defined.')
              var r,
                o = t.apply(e, n || []),
                a = []
              return (
                (r = {}),
                i('next'),
                i('throw'),
                i('return'),
                (r[Symbol.asyncIterator] = function () {
                  return this
                }),
                r
              )
              function i(i) {
                o[i] &&
                  (r[i] = function (t) {
                    return new Promise(function (e, n) {
                      1 < a.push([i, t, e, n]) || s(i, t)
                    })
                  })
              }
              function s(e, n) {
                try {
                  ;(t = o[e](n)).value instanceof d
                    ? Promise.resolve(t.value.v).then(l, c)
                    : h(a[0][2], t)
                } catch (e) {
                  h(a[0][3], e)
                }
                var t
              }
              function l(e) {
                s('next', e)
              }
              function c(e) {
                s('throw', e)
              }
              function h(e, n) {
                e(n), a.shift(), a.length && s(a[0][0], a[0][1])
              }
            }),
            (t.__asyncValues = function (a) {
              if (!Symbol.asyncIterator)
                throw new TypeError('Symbol.asyncIterator is not defined.')
              var e,
                n = a[Symbol.asyncIterator]
              return n
                ? n.call(a)
                : ((a = s(a)),
                  (e = {}),
                  t('next'),
                  t('throw'),
                  t('return'),
                  (e[Symbol.asyncIterator] = function () {
                    return this
                  }),
                  e)
              function t(o) {
                e[o] =
                  a[o] &&
                  function (r) {
                    return new Promise(function (e, n) {
                      var t, i
                      ;(r = a[o](r)),
                        (t = e),
                        (e = n),
                        (i = r.done),
                        (n = r.value),
                        Promise.resolve(n).then(function (e) {
                          t({ value: e, done: i })
                        }, e)
                    })
                  }
              }
            }),
            (t.__await = d),
            (t.__awaiter = function (e, a, s, l) {
              return new (s = s || Promise)(function (t, n) {
                function i(e) {
                  try {
                    o(l.next(e))
                  } catch (e) {
                    n(e)
                  }
                }
                function r(e) {
                  try {
                    o(l.throw(e))
                  } catch (e) {
                    n(e)
                  }
                }
                function o(e) {
                  var n
                  e.done
                    ? t(e.value)
                    : ((n = e.value) instanceof s
                        ? n
                        : new s(function (e) {
                            e(n)
                          })
                      ).then(i, r)
                }
                o((l = l.apply(e, a || [])).next())
              })
            }),
            (t.__classPrivateFieldGet = function (e, n, t, i) {
              if ('a' === t && !i)
                throw new TypeError(
                  'Private accessor was defined without a getter',
                )
              if ('function' == typeof n ? e !== n || !i : !n.has(e))
                throw new TypeError(
                  'Cannot read private member from an object whose class did not declare it',
                )
              return 'm' === t
                ? i
                : 'a' === t
                ? i.call(e)
                : i
                ? i.value
                : n.get(e)
            }),
            (t.__classPrivateFieldSet = function (e, n, t, i, r) {
              if ('m' === i)
                throw new TypeError('Private method is not writable')
              if ('a' === i && !r)
                throw new TypeError(
                  'Private accessor was defined without a setter',
                )
              if ('function' == typeof n ? e !== n || !r : !n.has(e))
                throw new TypeError(
                  'Cannot write private member to an object whose class did not declare it',
                )
              return (
                'a' === i ? r.call(e, t) : r ? (r.value = t) : n.set(e, t), t
              )
            }),
            (t.__createBinding = void 0),
            (t.__decorate = function (e, n, t, i) {
              var r,
                o = arguments.length,
                a =
                  o < 3
                    ? n
                    : null === i
                    ? (i = Object.getOwnPropertyDescriptor(n, t))
                    : i
              if (
                'object' == typeof Reflect &&
                'function' == typeof Reflect.decorate
              )
                a = Reflect.decorate(e, n, t, i)
              else
                for (var s = e.length - 1; 0 <= s; s--)
                  (r = e[s]) &&
                    (a = (o < 3 ? r(a) : 3 < o ? r(n, t, a) : r(n, t)) || a)
              return 3 < o && a && Object.defineProperty(n, t, a), a
            }),
            (t.__exportStar = function (e, n) {
              for (var t in e)
                'default' === t ||
                  Object.prototype.hasOwnProperty.call(n, t) ||
                  o(n, e, t)
            }),
            (t.__extends = function (e, n) {
              if ('function' != typeof n && null !== n)
                throw new TypeError(
                  'Class extends value ' +
                    String(n) +
                    ' is not a constructor or null',
                )
              function t() {
                this.constructor = e
              }
              i(e, n),
                (e.prototype =
                  null === n
                    ? Object.create(n)
                    : ((t.prototype = n.prototype), new t()))
            }),
            (t.__generator = function (t, i) {
              var r,
                o,
                a,
                e,
                s = {
                  label: 0,
                  sent: function () {
                    if (1 & a[0]) throw a[1]
                    return a[1]
                  },
                  trys: [],
                  ops: [],
                }
              return (
                (e = { next: n(0), throw: n(1), return: n(2) }),
                'function' == typeof Symbol &&
                  (e[Symbol.iterator] = function () {
                    return this
                  }),
                e
              )
              function n(n) {
                return function (e) {
                  return (function (n) {
                    if (r)
                      throw new TypeError('Generator is already executing.')
                    for (; s; )
                      try {
                        if (
                          ((r = 1),
                          o &&
                            (a =
                              2 & n[0]
                                ? o.return
                                : n[0]
                                ? o.throw || ((a = o.return) && a.call(o), 0)
                                : o.next) &&
                            !(a = a.call(o, n[1])).done)
                        )
                          return a
                        switch (
                          ((o = 0), (n = a ? [2 & n[0], a.value] : n)[0])
                        ) {
                          case 0:
                          case 1:
                            a = n
                            break
                          case 4:
                            return s.label++, { value: n[1], done: !1 }
                          case 5:
                            s.label++, (o = n[1]), (n = [0])
                            continue
                          case 7:
                            ;(n = s.ops.pop()), s.trys.pop()
                            continue
                          default:
                            if (
                              !(a =
                                0 < (a = s.trys).length && a[a.length - 1]) &&
                              (6 === n[0] || 2 === n[0])
                            ) {
                              s = 0
                              continue
                            }
                            if (
                              3 === n[0] &&
                              (!a || (n[1] > a[0] && n[1] < a[3]))
                            ) {
                              s.label = n[1]
                              break
                            }
                            if (6 === n[0] && s.label < a[1]) {
                              ;(s.label = a[1]), (a = n)
                              break
                            }
                            if (a && s.label < a[2]) {
                              ;(s.label = a[2]), s.ops.push(n)
                              break
                            }
                            a[2] && s.ops.pop(), s.trys.pop()
                            continue
                        }
                        n = i.call(t, s)
                      } catch (e) {
                        ;(n = [6, e]), (o = 0)
                      } finally {
                        r = a = 0
                      }
                    if (5 & n[0]) throw n[1]
                    return { value: n[0] ? n[1] : void 0, done: !0 }
                  })([n, e])
                }
              }
            }),
            (t.__importDefault = function (e) {
              return e && e.__esModule ? e : { default: e }
            }),
            (t.__importStar = function (e) {
              if (e && e.__esModule) return e
              var n = {}
              if (null != e)
                for (var t in e)
                  'default' !== t &&
                    Object.prototype.hasOwnProperty.call(e, t) &&
                    o(n, e, t)
              return l(n, e), n
            }),
            (t.__makeTemplateObject = function (e, n) {
              Object.defineProperty
                ? Object.defineProperty(e, 'raw', { value: n })
                : (e.raw = n)
              return e
            }),
            (t.__metadata = function (e, n) {
              if (
                'object' == typeof Reflect &&
                'function' == typeof Reflect.metadata
              )
                return Reflect.metadata(e, n)
            }),
            (t.__param = function (t, i) {
              return function (e, n) {
                i(e, n, t)
              }
            }),
            (t.__read = a),
            (t.__rest = function (e, n) {
              var t = {}
              for (r in e)
                Object.prototype.hasOwnProperty.call(e, r) &&
                  n.indexOf(r) < 0 &&
                  (t[r] = e[r])
              if (
                null != e &&
                'function' == typeof Object.getOwnPropertySymbols
              )
                for (
                  var i = 0, r = Object.getOwnPropertySymbols(e);
                  i < r.length;
                  i++
                )
                  n.indexOf(r[i]) < 0 &&
                    Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
                    (t[r[i]] = e[r[i]])
              return t
            }),
            (t.__spread = function () {
              for (var e = [], n = 0; n < arguments.length; n++)
                e = e.concat(a(arguments[n]))
              return e
            }),
            (t.__spreadArray = function (e, n, t) {
              if (t || 2 === arguments.length)
                for (var i, r = 0, o = n.length; r < o; r++)
                  (!i && r in n) ||
                    ((i = i || Array.prototype.slice.call(n, 0, r))[r] = n[r])
              return e.concat(i || Array.prototype.slice.call(n))
            }),
            (t.__spreadArrays = function () {
              for (var e = 0, n = 0, t = arguments.length; n < t; n++)
                e += arguments[n].length
              for (var i = Array(e), r = 0, n = 0; n < t; n++)
                for (var o = arguments[n], a = 0, s = o.length; a < s; a++, r++)
                  i[r] = o[a]
              return i
            }),
            (t.__values = s)
          var i = function (e, n) {
            return (i =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, n) {
                  e.__proto__ = n
                }) ||
              function (e, n) {
                for (var t in n)
                  Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t])
              })(e, n)
          }
          var r = function () {
            return (
              (t.__assign = r =
                Object.assign ||
                function (e) {
                  for (var n, t = 1, i = arguments.length; t < i; t++)
                    for (var r in (n = arguments[t]))
                      Object.prototype.hasOwnProperty.call(n, r) &&
                        (e[r] = n[r])
                  return e
                }),
              r.apply(this, arguments)
            )
          }
          t.__assign = r
          var o = Object.create
            ? function (e, n, t, i) {
                void 0 === i && (i = t),
                  Object.defineProperty(e, i, {
                    enumerable: !0,
                    get: function () {
                      return n[t]
                    },
                  })
              }
            : function (e, n, t, i) {
                e[(i = void 0 === i ? t : i)] = n[t]
              }
          function s(e) {
            var n = 'function' == typeof Symbol && Symbol.iterator,
              t = n && e[n],
              i = 0
            if (t) return t.call(e)
            if (e && 'number' == typeof e.length)
              return {
                next: function () {
                  return {
                    value: (e = e && i >= e.length ? void 0 : e) && e[i++],
                    done: !e,
                  }
                },
              }
            throw new TypeError(
              n ? 'Object is not iterable.' : 'Symbol.iterator is not defined.',
            )
          }
          function a(e, n) {
            var t = 'function' == typeof Symbol && e[Symbol.iterator]
            if (!t) return e
            var i,
              r,
              o = t.call(e),
              a = []
            try {
              for (; (void 0 === n || 0 < n--) && !(i = o.next()).done; )
                a.push(i.value)
            } catch (e) {
              r = { error: e }
            } finally {
              try {
                i && !i.done && (t = o.return) && t.call(o)
              } finally {
                if (r) throw r.error
              }
            }
            return a
          }
          function d(e) {
            return this instanceof d ? ((this.v = e), this) : new d(e)
          }
          t.__createBinding = o
          var l = Object.create
            ? function (e, n) {
                Object.defineProperty(e, 'default', {
                  enumerable: !0,
                  value: n,
                })
              }
            : function (e, n) {
                e.default = n
              }
        },
        {},
      ],
      10: [
        function (e, n, t) {
          n.exports =
            '.wabs-tooltip {\n  position: relative;\n  display: inline-block;\n}\n\n.wabs-tooltip .tooltiptext {\n  visibility: hidden;\n  font-size: small;\n  padding: 8px;\n  background-color: black;\n  color: #fff;\n  text-align: left;\n  border-radius: 6px;\n  position: absolute;\n  z-index: 1;\n  top: 150%;\n  left: 20%;\n  width: 290px;\n  margin-left: -144px;\n  line-height: 1.2;\n  white-space: normal;\n}\n\n.wabs-tooltip .tooltiptext::after {\n  content: "";\n  position: absolute;\n  bottom: 100%;\n  left: 50%;\n  margin-left: -5px;\n  border-width: 5px;\n  border-style: solid;\n  border-color: transparent transparent black transparent;\n}\n\n.wabs-tooltip:hover .tooltiptext {\n  visibility: visible;\n}\n\n\n.dark #wabs {\n background-color: var(--background-default) !important;\n color: var(--primary-lighter);\n}\n\n.dark #wabs .language ul > li:hover {\n  color: var(--background-default)\n}\n\n.dark #wabs label {\n  color: var(--primary-lighter) !important;\n}\n\n.dark #wabs .tabs .tab-label-content > label {\n  background-color: var(--panel-background);\n}\n\n.dark #wabs .footer-nav, .dark #wabs .language ul {\n  background-color: var(--panel-background) !important;\n}\n\n.dark #wabs .btn--primary {\n  background-color: var(--button-round-background);\n}\n\n.dark #wabs #logo {\n  background:white;\n  padding:5px 10px;\n  border-radius:20px\n}\n\n.dark #wabs label[for*="collapsible-"] {\n  border-bottom: 1px solid var(--border-list);\n}\n\n.dark #wabs button svg path {\n  fill: var(--primary-stronger);\n}\n\n.dark #wabs .modal-log-trigger {\n  color: var(--primary-stronger) !important;\n}\n\n\n.dark #wabs .choices__inner {\n  background-color: var(--panel-background);\n  border-color: var(--border-list);\n}\n\n.dark #wabs .modal-content .choices__inner {\n  border-color: var(--button-round-background)\n}\n\n.dark #wabs .choices__input {\n  background-color: transparent;\n}\n\n.dark #wabs .modal-content {\n  background: var(--panel-background);\n}\n\n.dark #wabs input[type="text"], .dark #wabs select {\n  color: var(--secondary-lighter) !important;\n}\n\n.dark #wabs .modal-content code {\n  background: var(--background-default);\n}\n\n\n.dark #wabs .message.sent {\n  background-color: var(--outgoing-background);\n}\n\n.dark #wabs .message.sent textarea {\n  color: var(--primary-stronger);\n}\n\n.dark #wabs .message.sent::after {\n  border-color: transparent transparent transparent var(--outgoing-background);\n}\n\n.dark #wabs .btn--flat {\n  border-radius: 1.98px;\n}\n\n.dark #wabs .choices_list--dropdown .choices_item--selectable.ishighlighted{\n  background:var(--button-round-background) !important;\n  color: #ffffff;\n}\n\n.dark #wabs .collapsible-wrap.card.no-pad>label{\n  border-bottom-color:var(--border-list) !important;\n}\n\n.dark #wabs .choices__list--dropdown .choices__item--selectable.is-highlighted{\n  background:var(--button-round-background) !important;\n  color: #ffffff;\n}\n.dark #wabs .choices[data-type*=\'select-multiple\'] .choices__button, .choices[data-type*=\'text\'] .choices__button{\n  border-left:1px solid #fff !important\n}\n\n.dark #wabs .is-open .choices__list--dropdown {\n  background-color: var(--panel-background);\n}\n\n.dark #wabs .choices[data-type*="select-one"]::after {\n  border-color: var(--secondary-lighter) transparent transparent;\n}\n\n.dark #wabs #activities-table .table-header, .dark #wabs .packages-table .table-header {\n  color: var(--primary-stronger);\n}\n\n.dark #wabs table tr:hover {\n  color: var(--panel-background);\n}\n\n.dark .alerty {\n  background: var(--background-default);\n  color: var(--primary-lighter);\n}\n\n.dark .alerty .alerty-title {\n  color: var(--primary-lighter)\n}\n\n.dark .alerty .alerty-action .btn-ok {\n  background-color: var(--button-round-background);\n}\n\n.dark .alerty .alerty-action .btn-ok:hover {\n  background-color: var(--button-round-background);\n  filter: brightness(120%);\n}\n\n\n.dark .alerty .alerty-action .btn-cancel {\n  color: var(--button-round-background);\n}\n\n.dark .alerty .alerty-content .alerty-prompt input {\n  background-color: var(--panel-background);\n  color: var(--primary-lighter);\n}\n\n.dark .alerty .alerty-content .alerty-message {\n  color: var(--primary-lighter);\n}\n\n.dark footer > .quick-replies-container > button {\n  background-color: var(--button-primary-background);\n  color: var(--primary-stronger);\n}\n\n.dark .snackbar {\n  background-color: var(--button-primary-background);\n}\n\n\n.dark .snackbar span a {\n  color: #ffffff;\n}\n\n.dark .emoji-picker-container svg path {\n  fill: currentColor !important;\n}\n\n.dark #waResetPassword {\n  color: #eee !important;\n}\n\n\n\nfooter .quick-replies-container {\n  padding: 5px 5px 2px 5px;\n  white-space: nowrap;\n  overflow-y:scroll;\n/*  position: absolute;\nbottom: 60px;*/\nmax-width: 100%;\nbackground-color: var(--rich-text-panel-background);\nborder-left: 1px solid var(--border-stronger);\n/*opacity: 0.4;*/\n}\n\n/*footer .quick-replies-container:hover {\n  opacity: 1;\n  }*/\n\n  footer > .quick-replies-container > button {\n    padding: 2px 5px;\n    background: #ebebeb;\n    border-radius: 20px;\n    color: #444444;\n    box-shadow: 0 1px .5px rgba(var(--shadow-rgb),.13);\n  }\n\n  footer > .quick-replies-container > button.disabled-button {\n    opacity: 0.4;\n    pointer-events: none;\n  }\n\n  .quick-labels-list-holder {\n    transform-origin: right top;\n    transform: scale(0);\n    top: 44px;\n    max-width: 340px;\n    overflow: hidden;\n    position: absolute;\n    z-index: 10000;\n    background-color: var(--dropdown-background);\n    border-radius: 3px;\n    box-shadow: 0 2px 5px 0 rgba(var(--shadow-rgb), 0.26), 0 2px 10px 0 rgba(var(--shadow-rgb), 0.16);\n    padding: 9px 0;\n    transition: transform 150ms linear;\n    overflow-y: auto;\n    max-height: 450px;\n  }\n  .quick-labels-list-holder.active {\n    transform: scale(1);\n  }\n  .quick-labels-list-holder span {\n    display: none;\n  }\n  .quick-labels-list-holder .has-label span {\n    display: inline-block;\n  }\n  .quick-label-item-inner {\n    flex-grow: 1;\n    overflow: hidden;\n    position: relative;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    box-sizing: border-box;\n    color: var(--primary);\n    display: block;\n    font-size: 14.5px;\n    height: 40px;\n    line-height: 14.5px;\n    white-space: nowrap;\n    cursor: pointer;\n    padding-top: 13px;\n  }\n  .quick-label-item {\n    position: relative;\n  }\n  .quick-label-item:hover {\n    background-color: var(--dropdown-background-hover);\n  }\n  html[dir="ltr"] .quick-labels-list-holder {\n    text-align: left;\n  }\n  html[dir="ltr"] .quick-labels-list-holder {\n    right: 4px;\n  }\n  html[dir="ltr"] .quick-label-item-inner {\n    padding-left: 24px;\n    padding-right: 58px;\n  }\n\n\n\n\n\n\n\n\n  @-webkit-keyframes tada { \n    0% {-webkit-transform: scale(1);}\n    10%, 20% {-webkit-transform: scale(0.9) rotate(-3deg);} \n    30%, 50%, 70%, 90% {-webkit-transform: scale(1.1) rotate(3deg);}\n    40%, 60%, 80% {-webkit-transform: scale(1.1) rotate(-3deg);} \n    100% {-webkit-transform: scale(1) rotate(0);} \n  }\n\n  @keyframes tada { \n    0% {transform: scale(1);} \n    10%, 20% {transform: scale(0.9) rotate(-3deg);} \n    30%, 50%, 70%, 90% {transform: scale(1.1) rotate(3deg);} \n    40%, 60%, 80% {transform: scale(1.1) rotate(-3deg);} \n    100% {transform: scale(1) rotate(0);}\n  }\n\n\n  #wabs .tada { \n    -webkit-animation-name: tada; \n    animation-name: tada;\n    -webkit-animation-duration: 1s;\n    animation-duration: 1s; \n    -webkit-animation-fill-mode: both; \n    animation-fill-mode: both;\n    animation-iteration-count: infinite;\n  }\n\n  #wabs.rtl #send-sticker, #wabs.rtl #send-status {\n   -moz-transform: scale(-1, -1);\n   -o-transform: scale(-1, -1);\n   -webkit-transform: scale(-1, -1);\n   transform: scale(-1, -1);\n }\n\n #wabs.rtl .modal-content label > input[type="checkbox"] {\n  margin-right: 0;\n  margin-left: 10px;\n}\n\n#wabs.rtl .modal-content label > input[type="checkbox"]:not(.modal-trigger):not(.toggle):not(#alert-check):not([id*="lightbox-"]):checked::after {\n  right: 0;\n}\n\n/* snackbar */\n#snackbar-container {\n  position: fixed;\n  left: 20px;\n  bottom: 0;\n  z-index: 99999;\n}\n.snackbar {\n  overflow: hidden;\n  clear: both;\n  /*min-width: 288px;\n  max-width: 568px;*/\n  width: fit-content;\n  cursor: pointer;\n  opacity: 0;\n}\n.snackbar.snackbar-opened {\n  height: auto;\n  opacity: 1;\n}\n@media (max-width: 767px) {\n  #snackbar-container {\n    left: 0px !important;\n    right: 0px;\n    width: 100%;\n  }\n  #snackbar-container .snackbar {\n    min-width: 100%;\n  }\n  #snackbar-container [class="snackbar snackbar-opened"] ~ .snackbar.toast {\n    margin-top: 20px;\n  }\n  #snackbar-container [class="snackbar snackbar-opened"] {\n    border-radius: 0;\n    margin-bottom: 0;\n  }\n}\n\n.snackbar {\n  background-color: #323232;\n  color: #FFFFFF;\n  font-size: 14px;\n  border-radius: 2px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n  height: 0;\n  -moz-transition: -moz-transform 0.2s ease-in-out, opacity 0.2s ease-in, height 0 linear 0.2s, padding 0 linear 0.2s, height 0 linear 0.2s;\n  -webkit-transition: -webkit-transform 0.2s ease-in-out, opacity 0.2s ease-in, height 0 linear 0.2s, padding 0 linear 0.2s, height 0 linear 0.2s;\n  transition: transform 0.2s ease-in-out, opacity 0.2s ease-in, height 0 linear 0.2s, padding 0 linear 0.2s, height 0 linear 0.2s;\n  -moz-transform: translateY(200%);\n  -webkit-transform: translateY(200%);\n  transform: translateY(200%);\n}\n.snackbar.snackbar-opened {\n  padding: 14px 15px;\n  margin-bottom: 20px;\n  height: auto;\n  -moz-transition: -moz-transform 0.2s ease-in-out, opacity 0.2s ease-in, height 0 linear 0.2s;\n  -webkit-transition: -webkit-transform 0.2s ease-in-out, opacity 0.2s ease-in, height 0 linear 0.2s;\n  transition: transform 0.2s ease-in-out, opacity 0.2s ease-in, height 0 linear 0.2s, height 0 linear 0.2s;\n  -moz-transform: none;\n  -webkit-transform: none;\n  transform: none;\n}\n.snackbar.toast {\n  border-radius: 200px;\n}\n\n\n#wabs .emoji-picker-list > li {\n  padding: 0 !important;\n  margin: 0 !important;\n}\n\n#wabs button[disabled] {\n  pointer-events: none;\n  background-color: lightgray;\n  color: #eee;\n}\n\n.alerty ::selection { \n  background: #04CD52 !important;\n  color: #ffffff !important\n}\n\n.alerty-message .labels-list {\n  margin-left: -24px;\n  margin-right: -24px;\n}\n\n.alerty-message .labels-list li {\n  cursor: pointer;\n}\n\n.alerty-message .labels-list li:hover {\n  background-color: #f5f5f5;\n}\n\n.alerty-message .labels-list li label {\n  padding: 5px;\n  text-align: left;\n  direction: ltr;\n}\n\n.alerty-message .labels-list li label {\n  padding-left: 24px;\n  padding-right: 24px;\n}\n\n.alerty .btn-cancel, .alerty .btn-ok {\n  text-transform: uppercase;\n}\n\n.wabs-rtl .alerty {\n  direction: rtl;\n  text-align: right;\n}\n\n.wabs-rtl .alerty input[type="text"] {\n  direction: ltr;\n  text-align: left;\n}\n\n.wabs-rtl .alerty-content, .wabs-rtl .alerty .alerty-content .alerty-message {\n  text-align: right;\n}\n\n.wabs-rtl .snackbar.snackbar-opened {\n  direction: rtl;\n  text-align: right;\n}\n\n#wabs .tip.groups-tools-btn:hover::after {\n  bottom: -3em;\n  left: 0 !important;\n  width: max-content;\n  transform: none;\n}\n\n#wabs #add-group-action:hover::after {\n  bottom: -35px !important;\n  right: 0 !important;\n  width: max-content;\n  transform: none;\n  left: auto !important;\n}\n\n\n/*\n.center-menu {\n  position: absolute;\n  margin: auto;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 99999;\n}\n\n.center-menu.menu {\n  width: 30px;\n  height: 30px;\n}\n\n.center-menu .item {\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  width: 30px;\n  height: 30px;\n  background-color: white;\n  -moz-border-radius: 50%;\n  -webkit-border-radius: 50%;\n  border-radius: 50%;\n  cursor: pointer;\n  text-align: center;\n  line-height: 30px;\n}\n\n.center-menu i {\n  font-size: calc(30*0.6)px;\n  color: #222222;\n}\n\n*/\n\n#wabs .choices.is-open {\n  z-index: 9999999;\n}\n\n#wabs .vcard-container .choices, #wabs .vcard-container .choices .choices__inner {\n  width: 100% !important;\n  height: fit-content !important;\n} \n\n#wabs .reply-days-container .choices, #wabs .reply-days-container .choices .choices__inner {\n  width: 100% !important;\n  height: fit-content !important;\n  margin-top: 5px !important;\n  margin-bottom: 5px !important;\n} \n\n#wabs .reply-groups-container .choices, #wabs .reply-groups-container .choices .choices__inner {\n  width: 100% !important;\n  height: fit-content !important;\n  margin-top: 5px !important;\n  margin-bottom: 5px !important;\n}\n\n#wabs .reply-auto-label-container .choices, #wabs .reply-auto-label-container .choices .choices__inner {\n  width: 100% !important;\n  height: fit-content !important;\n  margin-top: 5px !important;\n  margin-bottom: 5px !important;\n}\n\n#wabs .reply-options-holder label {\n  line-height: 1.5 !important;\n}\n\n\nhtml[dir=rtl] .alerty-content {\n  direction: rtl;\n  text-align: right;\n}\n\n#wabs.rtl .emoji-picker-trigger {\n  left: 0;\n}\n\n/*\n      emoji-picker styles\n      */\n\n      #wabs .emoji-picker-container {\n        position: relative;\n      }\n\n      #wabs .emoji-picker-trigger {\n        position: absolute;\n        top: 10px;\n        right: 10px;\n        background: none;\n        box-shadow: none;\n        border: none;\n        opacity: 0.5;\n        cursor: pointer;\n        outline: none !important;\n        border-radius: 50%;\n      }\n      #wabs .emoji-picker-trigger:hover {\n        opacity: 1;\n      }\n\n      #wabs .emoji-picker-open .emoji-picker-trigger > svg {\n        opacity: 0;\n        visibility: hidden;\n      }\n      #wabs .emoji-picker-open .emoji-picker-trigger:before {\n        content: "\0D7";\n        position: absolute;\n        font-size: 24px;\n        background: #fff;\n        top: -3px;\n        right: 0;\n      }\n\n      #wabs .emoji-picker {\n        display: none;\n        z-index: 999;\n        width: 272px;\n        overflow: hidden;\n        background: #fff;\n        border-radius: 5px;\n        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);\n        margin-top: 8px;\n        outline: none;\n      }\n      #wabs .emoji-picker-open .emoji-picker {\n        display: block;\n        position: absolute;\n        right: 0;\n        top: 30px;\n      }\n      #wabs [data-meteor-emoji-large] + .emoji-picker {\n        display: block;\n        width: 100%;\n        margin-bottom: 15px;\n        position: static !important;\n      }\n\n      #wabs .emoji-picker-tabs {\n        padding: 0;\n        margin: 0;\n        display: table;\n        width: 100%;\n        background: #eff0f1;\n        list-style: none;\n      }\n\n      #wabs .emoji-picker-tabs > li {\n        display: table-cell;\n      }\n\n      #wabs .emoji-picker-anchor {\n        display: block;\n        padding: 5px;\n        text-align: center;\n        text-decoration: none;\n        font-size: 24px;\n        position: initial;\n        opacity: 0.75;\n      }\n      #wabs .emoji-picker-anchor:hover {\n        background: rgba(0,0,0,.05);\n        opacity: 1;\n      }\n      #wabs .emoji-picker-anchor.active {\n        background: rgba(0,0,0,.15);\n      }\n\n      #wabs .emoji-picker-list {\n        padding: 10px 0;\n        margin: 0;\n        margin-left: 3%;\n        list-style: none;\n        text-align: left;\n      }\n      #wabs .emoji-picker-list > li {\n        display: inline-block;\n      }\n\n      #wabs .emoji-picker-emoji {\n        background: none;\n        border: none;\n        -webkit-appearance: none;\n        padding: 5px;\n        margin: 1px;\n        font-size: 24px !important;\n        line-height: 1;\n        border-radius: 3px;\n        cursor: pointer;\n        font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Helvetica, Arial, sans-serif, \'Apple Color Emoji\', \'Segoe UI Emoji\', \'Segoe UI Symbol\';\n      }\n      #wabs .emoji-picker-emoji:hover {\n        background: rgba(0,0,0,.07);\n      }\n\n\n\n\n\n\n\n      #wabs .language ul {\n        bottom: 20px;\n        background-color: rgb(26, 188, 156);\n        transform-origin: 0 100%;\n        margin: 0 8px;\n        width: 90px;\n        padding-right: 15px;\n        margin-right: 0;\n      }\n\n\n      #wabs .language ul > li {\n        padding: 5px 8px;\n        display: inline-block;\n        margin: 0;\n      }\n\n      #wabs .language ul > li:hover {\n        color: rgb(26, 188, 156);\n        background-color: #fff;\n      }\n\n      #wabs .label-tag {\n        background-color: red;\n        color: white;\n        font-size: x-small;\n        vertical-align: middle;\n        text-transform: uppercase;\n        line-height: 1.5;\n        height: fit-content;\n      }\n\n\n      #wabs #datepicker {\n        border-radius: 4px;\n        padding: 6px;\n        position: relative;\n        display: inline-block;\n        border: 2px solid rgb(33, 150, 243);\n        overflow: visible;\n        outline: none;\n      }\n\n      #wabs #datepicker::before {\n        width: 0px;\n        height: 0px;\n        border-left: 5px solid transparent;\n        border-right: 5px solid transparent;\n        position: absolute;\n        right: 8px;\n        top: -9px;\n        border-bottom: 8px solid rgb(33, 150, 243);\n        content: " ";\n      }\n\n      #wabs #datepicker.has-error {\n        border: 2px solid red !important;\n      }\n\n      #wabs #datepicker.has-error::before {\n        border-bottom: 8px solid red !important;\n      }\n\n      .chat-dropdown {\n        top:44px;\n        right:4px;\n        background-color:var(--dropdown-background);\n        border-radius:3px;\n        box-shadow:0 2px 5px 0 rgba(var(--shadow-rgb),.26),0 2px 10px 0 rgba(var(--shadow-rgb),.16);\n        padding:12px;\n        position: absolute;\n        max-width: 250px;\n        z-index: 9;\n      }\n\n\n      .chat-dropdown li {\n        flex-grow: 1;\n        overflow: hidden;\n        position: relative;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n        box-sizing: border-box;\n        color: var(--primary);\n        display: block;\n        font-size: 14.5px;\n        height: 40px;\n        line-height: 14.5px;\n        white-space: nowrap;\n      }\n\n      .chat-dropdown li img {\n        border-radius: 50%;\n        width: 30px;\n        float: left;\n      }\n\n      .message{color:#000;clear:both;line-height:18px;font-size:15px;padding:8px;position:relative;margin:8px 0;max-width:100%;word-wrap:break-word;z-index:-1;margin-bottom: 20px}\n      .message:after{position:absolute;content:"";width:0;height:0;border-style:solid;}\n      .message.sent{background:#e1ffc7;border-radius:5px 0px 5px 5px;}\n      .message.sent:after{border-width:0px 0 10px 10px;border-color:transparent transparent transparent #e1ffc7;top:0;right:-10px;}\n\n\n\n      .message-type-container > label > span, .reply-type-container > label > span {\n        padding: 20px 5px;\n        vertical-align: middle;\n        line-height: 2;\n        cursor: pointer;\n      }\n\n\n\n      .shake {\n        animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;\n        transform: translate3d(0, 0, 0);\n        backface-visibility: hidden;\n        perspective: 1000px;\n      }\n\n      @keyframes shake {\n        10%, 90% {\n          transform: translate3d(-1px, 0, 0);\n        }\n\n        20%, 80% {\n          transform: translate3d(2px, 0, 0);\n        }\n\n        30%, 50%, 70% {\n          transform: translate3d(-4px, 0, 0);\n        }\n\n        40%, 60% {\n          transform: translate3d(4px, 0, 0);\n        }\n      }\n\n\n\n      .wa-lock-inner {\n        position: fixed;\n        top: 50%;\n        left: 50%;\n        margin-left: -150px;\n        width: 300px;\n        text-align: center;\n        margin-top: -100px;\n      }\n\n\n      .wa-lock-inner img {\n        display: block;\n        margin: 0 auto;\n        width: 60px;\n        border-radius: 50%;\n      }\n\n      .wa-lock-inner input {\n        width: 200px;\n        height: 30px;\n        line-height: 30px;\n        border-radius: 25px;\n        border: 0;\n        -webkit-box-shadow:  0px 0px 42px -1px rgba(0,0,0,0.2);\n        -moz-box-shadow: 0px 0px 42px -1px rgba(0,0,0,0.2);\n        box-shadow: 0px 0px 42px -1px rgba(0,0,0,0.2);\n        outline: none;\n        text-align: center;\n        padding: 2px 25px;\n        font-size: 18px;\n      }\n\n      .wa-lock-inner p {\n        color: red;\n        opacity: 0.55;\n        cursor: pointer;\n        display: inline-block;\n      }\n\n      .wa-lock-inner .input-holder {\n        position: relative;\n        margin-top: 20px;\n      }\n\n      .wa-lock-inner .input-holder > svg {\n        position: absolute;\n        left: 36px;\n        top: 6px;\n      }\n\n      .wa-lock-inner button {\n        height: 30px;\n        background: #4adf82;\n        color: #ffffff;\n        width: 30px;\n        border-radius: 25px;\n        position: absolute;\n        right: 28px;\n        top: 2px;\n      }\n\n      .wa-lock-inner button svg {\n        -webkit-transform: scaleX(-1);\n        transform: scaleX(-1);\n        margin-left: 2px;\n      }\n\n      .wa-lock-inner input::placeholder {\n        color: lightgray;\n      }\n\n      .wa-lock-wrapper {\n        position: absolute;\n        left: 0;\n        top: 0;\n        width: 100%;\n        height: 100%;\n        z-index: 99999;\n        direction: ltr;\n      }\n\n      .wa-lock {\n        filter: blur(10px);\n        -webkit-filter: blur(10px);\n        pointer-events: none;\n      }\n\n      .black-and-white {\n        -webkit-filter: grayscale(100%);\n        filter: grayscale(100%);\n      }\n\n      .alerty {\n        color: #1b1919;\n        position: fixed;\n        z-index: 1061;\n        border-radius: 2px;\n        width: 400px;\n        margin-left: -200px;\n        background-color: #fff;\n        -webkit-box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);\n        box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);\n        font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif;\n        left: 50%;\n        top: 50%;\n        font-size: 16px;\n      }\n\n\n      @-webkit-keyframes zoomIn {\n        from {\n          opacity: 0;\n          -webkit-transform: scale3d(0.3, 0.3, 0.3);\n          transform: scale3d(0.3, 0.3, 0.3);\n        }\n\n        50% {\n          opacity: 1;\n        }\n      }\n\n      @keyframes zoomIn {\n        from {\n          opacity: 0;\n          -webkit-transform: scale3d(0.3, 0.3, 0.3);\n          transform: scale3d(0.3, 0.3, 0.3);\n        }\n\n        50% {\n          opacity: 1;\n        }\n      }\n\n      .zoomIn {\n        -webkit-animation-name: zoomIn;\n        animation-name: zoomIn;\n      }\n\n\n      @-webkit-keyframes zoomOut {\n        from {\n          opacity: 1;\n        }\n\n        50% {\n          opacity: 0;\n          -webkit-transform: scale3d(0.3, 0.3, 0.3);\n          transform: scale3d(0.3, 0.3, 0.3);\n        }\n\n        to {\n          opacity: 0;\n        }\n      }\n\n      @keyframes zoomOut {\n        from {\n          opacity: 1;\n        }\n\n        50% {\n          opacity: 0;\n          -webkit-transform: scale3d(0.3, 0.3, 0.3);\n          transform: scale3d(0.3, 0.3, 0.3);\n        }\n\n        to {\n          opacity: 0;\n        }\n      }\n\n      .zoomOut {\n        -webkit-animation-name: zoomOut;\n        animation-name: zoomOut;\n      }\n\n\n\n      .alerty.alerty-show {\n        -webkit-animation: zoomIn .35s ease;\n        -o-animation: zoomIn .35s ease;\n        animation: zoomIn .35s ease;\n      }\n\n      .alerty.alerty-hide {\n        -webkit-animation: zoomOut .35s ease;\n        -o-animation: zoomOut .35s ease;\n        animation: zoomOut .35s ease;\n      }\n\n      .alerty .alerty-title {\n        padding: 24px 24px 20px;\n        font-size: 20px;\n        color: #1b1919;\n        line-height: 1;\n      }\n\n      .alerty .alerty-title + .alerty-content {\n        padding-top: 0;\n      }\n\n      .alerty .alerty-content {\n        text-align: left;\n        line-height: 1.2;\n        padding: 24px;\n        padding: 24px;\n      }\n\n      .alerty .alerty-content .alerty-message {\n        margin: 0;\n        padding: 0;\n        color: #635a56;\n      }\n\n      .alerty .alerty-content .alerty-prompt {\n        margin-top: 16px;\n        text-align: center;\n        position: relative;\n      }\n\n      .alerty .alerty-content .alerty-prompt input {\n        width: 100%;\n        height: 36px;\n        display: inline-block;\n        padding: 6px 0;\n        -webkit-box-shadow: none;\n        box-shadow: none;\n        border: none;\n        outline: none;\n        font-size: 16px;\n        color: #1b1919;\n        border-bottom: 1px solid #d9d6d4;\n      }\n\n      .alerty .alerty-content .alerty-prompt input:focus + .input-line {\n        visibility: visible;\n        -webkit-transform: scaleX(1);\n        -ms-transform: scaleX(1);\n        -o-transform: scaleX(1);\n        transform: scaleX(1);\n      }\n\n      .alerty .alerty-content .alerty-prompt .input-line {\n        height: 2px;\n        position: absolute;\n        bottom: 0;\n        width: 100%;\n        background-color: #00bfa5;\n        visibility: hidden;\n        -webkit-transform: scaleX(0);\n        -ms-transform: scaleX(0);\n        -o-transform: scaleX(0);\n        transform: scaleX(0);\n        -webkit-transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);\n        -o-transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);\n        transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);\n        display: block;\n      }\n\n      .alerty .alerty-action {\n        padding: 22px 24px 20px;\n        text-align: right;\n      }\n\n      .alerty .alerty-action [class*="btn-"] {\n        margin-left: 8px;\n        cursor: pointer;\n        color: #1b1919;\n        height: 36px;\n        line-height: 36px;\n        min-width: 88px;\n        text-align: center;\n        outline: none !important;\n        background-color: transparent;\n        display: inline-block;\n        border-radius: 2px;\n        -webkit-tap-highlight-color: rgba(0, 0, 0, 0.12);\n        -webkit-transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);\n        -o-transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);\n        transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);\n        font-size: 14px;\n      }\n\n\n      .alerty .alerty-action .btn-ok {\n        color: #ffffff;\n        background-color: #05cd51;\n        padding: 0 10px;\n      }\n\n\n      .alerty .alerty-action .btn-ok:hover {\n        background-color: #06d755;\n        box-shadow: 0 1px 1px 0 rgba(0,0,0,.06), 0 2px 5px 0 rgba(0,0,0,.2);\n      }\n\n\n      .alerty .alerty-action .btn-cancel {\n        color: #05cd51;\n      }\n\n\n      .alerty .alerty-action .btn-cancel:hover {\n        background-color: #fff;\n        box-shadow: 0 1px 1px 0 rgba(0,0,0,.06), 0 2px 5px 0 rgba(0,0,0,.2);\n      }\n\n      .alerty.toasts {\n        height: 48px;\n        top: auto;\n        bottom: 0;\n        background-color: #323232;\n        min-width: 288px;\n        max-width: 568px;\n        -webkit-box-shadow: none;\n        box-shadow: none;\n      }\n\n      .alerty.toasts .alerty-content {\n        height: 48px;\n        line-height: 48px;\n        padding: 0 24px;\n        font-size: 14px;\n      }\n\n      .alerty.toasts .alerty-content .alerty-message {\n        color: #fff;\n      }\n\n      .alerty.toasts.alerty-show {\n        -webkit-animation: slideInUp .35s ease;\n        -o-animation: slideInUp .35s ease;\n        animation: slideInUp .35s ease;\n      }\n\n      .alerty.toasts.alerty-hide {\n        -webkit-animation: slideOutDown .35s ease;\n        -o-animation: slideOutDown .35s ease;\n        animation: slideOutDown .35s ease;\n      }\n\n      .alerty.toasts.place-top {\n        top: 0;\n        bottom: auto;\n      }\n\n      .alerty.toasts.place-top.alerty-show {\n        -webkit-animation: slideInDown .35s ease;\n        -o-animation: slideInDown .35s ease;\n        animation: slideInDown .35s ease;\n      }\n\n      .alerty.toasts.place-top.alerty-hide {\n        -webkit-animation: slideOutUp .35s ease;\n        -o-animation: slideOutUp .35s ease;\n        animation: slideOutUp .35s ease;\n      }\n\n      @media all and (max-width: 540px) {\n        .alerty {\n          width: auto;\n          margin-left: 0;\n          margin-right: 0;\n          left: 15px;\n          right: 15px;\n        }\n        .alerty.toasts {\n          width: 100%;\n          border-radius: 0;\n          left: 0;\n          right: 0;\n        }\n      }\n\n      .alerty-overlay {\n        position: fixed;\n        background-color: #000;\n        z-index: 1060;\n        height: 100%;\n        width: 100%;\n        left: 0;\n        right: 0;\n        top: 0;\n        bottom: 0;\n        opacity: 0;\n        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";\n        -webkit-transition: opacity 0.45s cubic-bezier(0.23, 1, 0.32, 1);\n        -o-transition: opacity 0.45s cubic-bezier(0.23, 1, 0.32, 1);\n        transition: opacity 0.45s cubic-bezier(0.23, 1, 0.32, 1);\n      }\n\n      .alerty-overlay.active {\n        opacity: 0.4;\n        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=40)";\n      }\n\n      .no-scrolling {\n        height: 100%;\n        overflow: hidden;\n      }\n\n\n\n\n      #wabs * {\n        font-size: small;\n      }\n\n      #wabs [class^=btn] {\n        /*transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);*/\n        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.14), 0 2px 10px 0 rgba(0, 0, 0, 0.1);\n        position: relative;\n        cursor: pointer;\n        text-transform: uppercase;\n        margin-bottom: 10px;\n        background-image: none;\n        background-size: 0;\n        background-repeat: no-repeat;\n        background-position: 50% 50%;\n        /*transition: background-color 0.3s cubic-bezier(0.64, 0.09, 0.08, 1), box-shadow 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);*/\n        will-change: background-size, background-image;\n        padding: 10px 20px;\n        display: inline-block;\n        font-family: inherit;\n        border: 0;\n      }\n      #wabs [class^=btn]:after {\n        position: absolute;\n        content: "";\n        transition: none;\n        background: radial-gradient(circle, white 95%, rgba(0, 0, 0, 0) 95%);\n        background-size: 0.7%;\n        background-position: 50% 50%;\n        background-repeat: no-repeat;\n      }\n/*#wabs [class^=btn]:focus {\n  outline: none;\n  background-size: 1000%;\n  transition: all 1s cubic-bezier(0.64, 0.09, 0.08, 1);\n  }*/\n\n  #wabs .btn--float {\n    border-radius: 50%;\n    width: 50px;\n    height: 50px;\n    background-image: radial-gradient(circle, #ffeb3b 1%, #fff388 15%, rgba(0, 0, 0, 0) 30%);\n    background-color: #ffeb3b;\n    will-change: box-shadow, background-color;\n    font-size: 22px;\n    padding: 0;\n  }\n  #wabs .btn--float:hover {\n    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.16), 0 4px 15px 0 rgba(0, 0, 0, 0.13);\n    background-color: #ffee55;\n  }\n\n  #wabs .btn--raised {\n    border-radius: 1.98px;\n    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.14), 0 2px 10px 0 rgba(0, 0, 0, 0.1);\n    background-image: radial-gradient(circle, #3498db 1%, #75b9e7 15%, rgba(0, 0, 0, 0) 30%);\n    background-color: #3498db;\n    will-change: box-shadow, background-color;\n    color: white;\n  }\n  #wabs .btn--raised:hover {\n    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.16), 0 4px 15px 0 rgba(0, 0, 0, 0.13);\n    background-color: #4aa3df;\n  }\n\n  #wabs .btn--flat {\n    background-image: radial-gradient(circle, #28e1bd 1%, #6bebd1 15%, rgba(0, 0, 0, 0) 30%);\n    background-color: #28e1bd;\n    background-color: #fcfcfc;\n    box-shadow: none;\n  }\n\n  #wabs .btn--primary {\n    background-image: radial-gradient(circle, #1abc9c 1%, #3ee4c4 15%, rgba(0, 0, 0, 0) 30%);\n    background-color: #1abc9c;\n  }\n  #wabs .btn--primary:hover {\n    background-color: #1dd2af;\n  }\n\n  #wabs .btn--secondary {\n    background-image: radial-gradient(circle, #28e1bd 1%, #6bebd1 15%, rgba(0, 0, 0, 0) 30%);\n    background-color: #28e1bd;\n  }\n  #wabs .btn--secondary:hover {\n    background-color: #3ee4c4;\n  }\n\n  #wabs .btn--accent {\n    background-image: radial-gradient(circle, #ffeb3b 1%, #fff388 15%, rgba(0, 0, 0, 0) 30%);\n    background-color: #ffeb3b;\n  }\n  #wabs .btn--accent:hover {\n    background-color: #ffee55;\n  }\n\n  #wabs .btn--red {\n    background-image: radial-gradient(circle, #e74c3c 1%, #ef8b80 15%, rgba(0, 0, 0, 0) 30%);\n    background-color: #e74c3c;\n  }\n  #wabs .btn--red:hover {\n    background-color: #ea6153;\n  }\n\n  #wabs .btn--yellow {\n    background-image: radial-gradient(circle, #f1c40f 1%, #f5d657 15%, rgba(0, 0, 0, 0) 30%);\n    background-color: #f1c40f;\n  }\n  #wabs .btn--yellow:hover {\n    background-color: #f2ca27;\n  }\n\n  #wabs .btn--green {\n    background-image: radial-gradient(circle, #4caf50 1%, #80c883 15%, rgba(0, 0, 0, 0) 30%);\n    background-color: #4caf50;\n  }\n  #wabs .btn--green:hover {\n    background-color: #5cb860;\n  }\n\n  #wabs .btn--blue {\n    background-image: radial-gradient(circle, #2196f3 1%, #6ab8f7 15%, rgba(0, 0, 0, 0) 30%);\n    background-color: #2196f3;\n  }\n  #wabs .btn--blue:hover {\n    background-color: #39a1f4;\n  }\n\n\n\n  #wabs [id*=collapsible-] {\n    display: none;\n  }\n  #wabs [id*=collapsible-]:checked ~ [class*=collapsible-][class$=area] {\n    transform: scaleY(1);\n    height: auto;\n    padding: 15px 20px;\n    margin-bottom: 20px;\n  }\n  #wabs [id*=collapsible-]:checked + label:before {\n    margin-top: 6px;\n    transform: rotate(-45deg) translateX(1px);\n  }\n  #wabs [id*=collapsible-]:checked + label:after {\n    margin-top: 5px;\n    transform: rotate(45deg) translate(4px, -3px);\n  }\n  #wabs label[for*=collapsible-] {\n    width: 100%;\n    cursor: pointer;\n    display: flex;\n    position: relative;\n    padding: 15px 24px;\n    border-bottom: solid 1px #ebebeb;\n    color: #474747;\n    border-radius: 3px;\n  }\n  #wabs label[for*=collapsible-]:before, #wabs label[for*=collapsible-]:after {\n    content: "";\n    position: absolute;\n    right: 20px;\n    width: 2px;\n    height: 8px;\n    background: #9e9e9e;\n    transition: all 0.3s ease;\n  }\n  #wabs label[for*=collapsible-]:before {\n    margin-top: 2px;\n    transform: rotate(50deg);\n  }\n  #wabs label[for*=collapsible-]:after {\n    margin-top: 6px;\n    transform: rotate(-50deg);\n  }\n  #wabs [class*=collapsible-][class$=area] {\n    transform: scaleY(0);\n    transform-origin: 0 0;\n    height: 0;\n    will-change: height, transform;\n    transition: all 0.3s ease;\n    padding-left: 20px;\n  }\n\n  #wabs label[for=collapsible-no-arrow]:before, #wabs label[for=collapsible-no-arrow]:after {\n    display: none !important;\n  }\n\n\n\n\n\n  .alerty .subscription-status-items li {\n    margin-top: 5px;\n  }\n\n\n  #wabs table {\n    width: 100%;\n  }\n\n  #wabs .table-header {\n    color: #474747;\n    font-size: 16px;\n    line-height: 52px;\n    font-weight: bold;\n  }\n\n  #wabs #activities-table tr, #wabs #groups-duplicates-table tr , #wabs #table-import-targets tr, #wabs #calls-table tr {\n    line-height: 2;\n  }\n\n\n  #wabs tr {\n    font-size: 17px;\n    line-height: 52px;\n    border-bottom: solid 1px #ebebeb;\n    will-change: background;\n  }\n\n  #wabs tr:not(.table-header):hover {\n    background: #ebebeb;\n  }\n\n  #wabs td:first-child {\n    padding-left: 20px;\n  }\n  @media screen and (max-width: 1200px) {\n   #wabs td:first-child {\n    padding-left: 12px;\n  }\n}\n@media screen and (max-width: 900px) {\n  #wabs td:first-child {\n    padding-left: 20px;\n  }\n}\n#wabs td:last-child {\n  padding-right: 20px;\n}\n@media screen and (max-width: 1200px) {\n  #wabs td:last-child {\n    padding-right: 12px;\n  }\n}\n@media screen and (max-width: 900px) {\n  #wabs td:last-child {\n    padding-right: 20px;\n  }\n}\n\n\n\n\n#wabs label > input[type=checkbox] {\n  margin-right: 10px;\n  vertical-align: text-top;\n}\n\n#wabs label {\n  color: #2e2e2e;\n}\n#wabs input[type=email], #wabs input[type=text]:not(.choices__input), #wabs input[type=password] {\n  margin-bottom: 40px;\n  width: 200px;\n  display: block;\n  border: none;\n  padding: 10px 0;\n  border-bottom: solid 1px #1abc9c;\n  will-change: background-position;\n  transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);\n  background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 96%, #1abc9c 96%);\n  background-position: -200px 0;\n  background-size: 200px 100%;\n  background-repeat: no-repeat;\n  color: #0e6252;\n}\n#wabs input[type=email]:focus, #wabs input[type=email]:valid, #wabs input[type=text]:not(.choices__input):focus, #wabs input[type=text]:not(.choices__input):valid, #wabs input[type=password]:focus, #wabs input[type=password]:valid {\n  box-shadow: none;\n  outline: none;\n  background-position: 0 0;\n}\n#wabs input[type=email]:focus::-webkit-input-placeholder, #wabs input[type=email]:valid::-webkit-input-placeholder, #wabs input[type=text]:not(.choices__input):focus::-webkit-input-placeholder, #wabs input[type=text]:not(.choices__input):valid::-webkit-input-placeholder, #wabs input[type=password]:focus::-webkit-input-placeholder, #wabs input[type=password]:valid::-webkit-input-placeholder {\n  color: #1abc9c;\n  font-size: 11px;\n  transform: translateY(-20px);\n  visibility: visible !important;\n}\n#wabs input[type=email]::-webkit-input-placeholder, #wabs input[type=text]:not(.choices__input)::-webkit-input-placeholder, #wabs input[type=password]::-webkit-input-placeholder {\n  transition: all 0.2s cubic-bezier(0.64, 0.09, 0.08, 1);\n}\n#wabs input[type=checkbox]:not(.modal-trigger):not(.toggle):not(#alert-check):not([id*=lightbox-]) {\n  position: relative;\n  cursor: pointer;\n}\n#wabs input[type=checkbox]:not(.modal-trigger):not(.toggle):not(#alert-check):not([id*=lightbox-]):before {\n  content: "";\n  width: 12px;\n  height: 12px;\n  border: solid 2px #1abc9c;\n  border-radius: 3px;\n  background: white;\n  position: absolute;\n}\n#wabs input[type=checkbox]:not(.modal-trigger):not(.toggle):not(#alert-check):not([id*=lightbox-]):after {\n  content: "\u2713";\n  color: white;\n  background: #1abc9c;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 12px;\n  height: 12px;\n  border: solid 2px #1abc9c;\n  border-radius: 3px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  opacity: 0;\n  /*transition: opacity 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);*/\n  will-change: opacity;\n}\n#wabs input[type=checkbox]:not(.modal-trigger):not(.toggle):not(#alert-check):not([id*=lightbox-]):checked:after {\n  opacity: 1;\n}\n#wabs input[type=checkbox]:not(.modal-trigger):not(.toggle):not(#alert-check):not([id*=lightbox-]):focus {\n  outline: none;\n}\n#wabs input[type=radio] {\n  position: relative;\n  top: 2px;\n  left: 2px;\n  margin: 0 8px;\n  cursor: pointer;\n}\n#wabs input[type=radio]:before {\n  content: "";\n  background-color: white;\n  width: 16px;\n  height: 16px;\n  border-radius: 50%;\n  border: solid 2px #1abc9c;\n  display: inline-block;\n  position: absolute;\n  top: -2px;\n  left: -2px;\n  background-image: radial-gradient(circle, #1abc9c 40%, white 50%);\n  background-size: 0;\n  background-position: 50% 50%;\n  background-repeat: no-repeat;\n  transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);\n  will-change: background-size;\n  z-index: 2;\n}\n#wabs input[type=radio]:after {\n  content: "";\n  width: 16px;\n  height: 16px;\n  background: white;\n  border-radius: 50%;\n  position: absolute;\n  transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);\n}\n#wabs input[type=radio]:checked:before {\n  background-size: 14px 14px;\n}\n#wabs input[type=radio]:focus {\n  outline: none;\n}\n#wabs select {\n  border: none;\n  border-bottom: 2.5px solid rgb(26, 188, 156);\n  color: #212121;\n  padding: 6px;\n  cursor: pointer;\n}\n\n#wabs select.classic {\n  background-image:\n  linear-gradient(45deg, transparent 50%, #1abc9c 50%),\n  linear-gradient(135deg, #1abc9c 50%, transparent 50%),\n  linear-gradient(to right, transparent, transparent);\n  background-position:\n  calc(100% - 20px) calc(1em + 2px),\n  calc(100% - 15px) calc(1em + 2px),\n  100% 0;\n  background-size:\n  5px 5px,\n  5px 5px,\n  2.5em 2.5em;\n  background-repeat: no-repeat;\n}\n\n#wabs select.classic:focus {\n  background-image:\n  linear-gradient(45deg, #1abc9c 50%, transparent 50%),\n  linear-gradient(135deg, transparent 50%, #1abc9c 50%),\n  linear-gradient(to right, transparent, transparent);\n  background-position:\n  calc(100% - 15px) 1em,\n  calc(100% - 20px) 1em,\n  100% 0;\n  background-size:\n  5px 5px,\n  5px 5px,\n  2.5em 2.5em;\n  background-repeat: no-repeat;\n  border-color: #1abc9c;\n  outline: 0;\n}\n#wabs input[type=range] {\n  -webkit-appearance: none;\n}\n#wabs input[type=range]:focus {\n  outline: none;\n}\n#wabs input[type=range]::-webkit-slider-runnable-track {\n  height: 3px;\n  cursor: pointer;\n  background: #9e9e9e;\n}\n#wabs input[type=range]::-webkit-slider-thumb {\n  height: 16px;\n  width: 16px;\n  border-radius: 50%;\n  background: #2ecc71;\n  cursor: pointer;\n  -webkit-appearance: none;\n  margin-top: -6px;\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.07);\n}\n#wabs input[type=range]::-moz-range-track {\n  height: 3px;\n  cursor: pointer;\n  background: #9e9e9e;\n}\n#wabs input[type=range]::-moz-range-thumb {\n  height: 16px;\n  width: 16px;\n  border-radius: 50%;\n  border: none;\n  background: #2ecc71;\n  cursor: pointer;\n}\n#wabs input[type=range]::-ms-track {\n  cursor: pointer;\n  background: transparent;\n  border-color: transparent;\n  color: transparent;\n}\n#wabs input[type=range]::-ms-fill-lower {\n  background: #2ecc71;\n}\n#wabs input[type=range]::-ms-fill-upper {\n  background: #9e9e9e;\n}\n#wabs input[type=range]::-ms-thumb {\n  background: #2ecc71;\n}\n#wabs .toggle {\n  display: none;\n}\n#wabs .toggle:checked + label {\n  background: #93e7b6;\n}\n#wabs .toggle:checked + label:after {\n  background: #2ecc71;\n  margin-left: 18px;\n}\n#wabs .toggle + label {\n  position: absolute;\n  width: 30px;\n  height: 6px;\n  margin-top: 12px;\n  background: #9e9e9e;\n  transition: background 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);\n  will-change: background;\n}\n#wabs .toggle + label:after {\n  position: absolute;\n  content: "";\n  width: 14px;\n  height: 14px;\n  border-radius: 50%;\n  background: #dedede;\n  display: inline-block;\n  cursor: pointer;\n  margin-top: -4px;\n  margin-left: -1px;\n  transition: all 0.3s ease;\n  will-change: background, margin-left;\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.07);\n}\n#wabs textarea {\n  border: solid 1px #9e9e9e;\n  transition: border 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);\n  font-family: inherit;\n}\n#wabs textarea:focus {\n  border: solid 1px #1abc9c;\n  outline: none;\n}\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.g--1 {\n  width: 8.3333333333%;\n  margin-top: 40px;\n  margin-bottom: 40px;\n}\n\n.m--1 {\n  margin-left: 8.3333333333%;\n}\n\n.g--2 {\n  width: 16.6666666667%;\n  margin-top: 40px;\n  margin-bottom: 40px;\n}\n\n.m--2 {\n  margin-left: 16.6666666667%;\n}\n\n.g--3 {\n  width: 25%;\n  margin-top: 40px;\n  margin-bottom: 40px;\n}\n\n.m--3 {\n  margin-left: 25%;\n}\n\n.g--4 {\n  width: 33.3333333333%;\n  margin-top: 40px;\n  margin-bottom: 40px;\n}\n\n.m--4 {\n  margin-left: 33.3333333333%;\n}\n\n.g--5 {\n  width: 41.6666666667%;\n  margin-top: 40px;\n  margin-bottom: 40px;\n}\n\n.m--5 {\n  margin-left: 41.6666666667%;\n}\n\n.g--6 {\n  width: 50%;\n  margin-top: 40px;\n  margin-bottom: 40px;\n}\n\n.m--6 {\n  margin-left: 50%;\n}\n\n.g--7 {\n  width: 58.3333333333%;\n  margin-top: 40px;\n  margin-bottom: 40px;\n}\n\n.m--7 {\n  margin-left: 58.3333333333%;\n}\n\n.g--8 {\n  width: 66.6666666667%;\n  margin-top: 40px;\n  margin-bottom: 40px;\n}\n\n.m--8 {\n  margin-left: 66.6666666667%;\n}\n\n.g--9 {\n  width: 75%;\n  margin-top: 40px;\n  margin-bottom: 40px;\n}\n\n.m--9 {\n  margin-left: 75%;\n}\n\n.g--10 {\n  width: 83.3333333333%;\n  margin-top: 40px;\n  margin-bottom: 40px;\n}\n\n.m--10 {\n  margin-left: 83.3333333333%;\n}\n\n.g--11 {\n  width: 91.6666666667%;\n  margin-top: 40px;\n  margin-bottom: 40px;\n}\n\n.m--11 {\n  margin-left: 91.6666666667%;\n}\n\n.g--12 {\n  width: 100%;\n  margin-top: 40px;\n  margin-bottom: 40px;\n}\n\n.m--12 {\n  margin-left: 100%;\n}\n\n.m--0 {\n  margin-left: 0;\n}\n\n[class*=container] {\n  display: flex;\n}\n\n.container--baseline {\n  align-items: baseline;\n}\n\n.container--center {\n  align-items: center;\n}\n\n.container--start {\n  align-items: flex-start;\n}\n\n.container--end {\n  align-items: flex-end;\n}\n\n.container--justify {\n  justify-content: center;\n}\n\n.container--wrap {\n  flex-wrap: wrap;\n}\n\n.nudge--right {\n  margin-right: 20px;\n}\n\n.nudge--left {\n  margin-left: 20px;\n}\n\n@media screen and (max-width: 1200px) {\n  .g-m--1 {\n    width: 8.3333333333%;\n    margin-top: 26px;\n    margin-bottom: 26px;\n  }\n\n  .m-m--1 {\n    margin-left: 8.3333333333%;\n  }\n\n  .g-m--2 {\n    width: 16.6666666667%;\n    margin-top: 26px;\n    margin-bottom: 26px;\n  }\n\n  .m-m--2 {\n    margin-left: 16.6666666667%;\n  }\n\n  .g-m--3 {\n    width: 25%;\n    margin-top: 26px;\n    margin-bottom: 26px;\n  }\n\n  .m-m--3 {\n    margin-left: 25%;\n  }\n\n  .g-m--4 {\n    width: 33.3333333333%;\n    margin-top: 26px;\n    margin-bottom: 26px;\n  }\n\n  .m-m--4 {\n    margin-left: 33.3333333333%;\n  }\n\n  .g-m--5 {\n    width: 41.6666666667%;\n    margin-top: 26px;\n    margin-bottom: 26px;\n  }\n\n  .m-m--5 {\n    margin-left: 41.6666666667%;\n  }\n\n  .g-m--6 {\n    width: 50%;\n    margin-top: 26px;\n    margin-bottom: 26px;\n  }\n\n  .m-m--6 {\n    margin-left: 50%;\n  }\n\n  .g-m--7 {\n    width: 58.3333333333%;\n    margin-top: 26px;\n    margin-bottom: 26px;\n  }\n\n  .m-m--7 {\n    margin-left: 58.3333333333%;\n  }\n\n  .g-m--8 {\n    width: 66.6666666667%;\n    margin-top: 26px;\n    margin-bottom: 26px;\n  }\n\n  .m-m--8 {\n    margin-left: 66.6666666667%;\n  }\n\n  .g-m--9 {\n    width: 75%;\n    margin-top: 26px;\n    margin-bottom: 26px;\n  }\n\n  .m-m--9 {\n    margin-left: 75%;\n  }\n\n  .g-m--10 {\n    width: 83.3333333333%;\n    margin-top: 26px;\n    margin-bottom: 26px;\n  }\n\n  .m-m--10 {\n    margin-left: 83.3333333333%;\n  }\n\n  .g-m--11 {\n    width: 91.6666666667%;\n    margin-top: 26px;\n    margin-bottom: 26px;\n  }\n\n  .m-m--11 {\n    margin-left: 91.6666666667%;\n  }\n\n  .g-m--12 {\n    width: 100%;\n    margin-top: 26px;\n    margin-bottom: 26px;\n  }\n\n  .m-m--12 {\n    margin-left: 100%;\n  }\n\n  .m-m--0 {\n    margin-left: 0;\n  }\n\n  .container--wrap--m {\n    flex-wrap: wrap;\n  }\n\n  .no-nudge--m {\n    margin-left: 0;\n    margin-right: 0;\n  }\n}\n@media screen and (max-width: 900px) {\n  .g-s--1 {\n    width: 8.3333333333%;\n    margin-top: 18px;\n    margin-bottom: 18px;\n  }\n\n  .m-s--1 {\n    margin-left: 8.3333333333%;\n  }\n\n  .g-s--2 {\n    width: 16.6666666667%;\n    margin-top: 18px;\n    margin-bottom: 18px;\n  }\n\n  .m-s--2 {\n    margin-left: 16.6666666667%;\n  }\n\n  .g-s--3 {\n    width: 25%;\n    margin-top: 18px;\n    margin-bottom: 18px;\n  }\n\n  .m-s--3 {\n    margin-left: 25%;\n  }\n\n  .g-s--4 {\n    width: 33.3333333333%;\n    margin-top: 18px;\n    margin-bottom: 18px;\n  }\n\n  .m-s--4 {\n    margin-left: 33.3333333333%;\n  }\n\n  .g-s--5 {\n    width: 41.6666666667%;\n    margin-top: 18px;\n    margin-bottom: 18px;\n  }\n\n  .m-s--5 {\n    margin-left: 41.6666666667%;\n  }\n\n  .g-s--6 {\n    width: 50%;\n    margin-top: 18px;\n    margin-bottom: 18px;\n  }\n\n  .m-s--6 {\n    margin-left: 50%;\n  }\n\n  .g-s--7 {\n    width: 58.3333333333%;\n    margin-top: 18px;\n    margin-bottom: 18px;\n  }\n\n  .m-s--7 {\n    margin-left: 58.3333333333%;\n  }\n\n  .g-s--8 {\n    width: 66.6666666667%;\n    margin-top: 18px;\n    margin-bottom: 18px;\n  }\n\n  .m-s--8 {\n    margin-left: 66.6666666667%;\n  }\n\n  .g-s--9 {\n    width: 75%;\n    margin-top: 18px;\n    margin-bottom: 18px;\n  }\n\n  .m-s--9 {\n    margin-left: 75%;\n  }\n\n  .g-s--10 {\n    width: 83.3333333333%;\n    margin-top: 18px;\n    margin-bottom: 18px;\n  }\n\n  .m-s--10 {\n    margin-left: 83.3333333333%;\n  }\n\n  .g-s--11 {\n    width: 91.6666666667%;\n    margin-top: 18px;\n    margin-bottom: 18px;\n  }\n\n  .m-s--11 {\n    margin-left: 91.6666666667%;\n  }\n\n  .g-s--12 {\n    width: 100%;\n    margin-top: 18px;\n    margin-bottom: 18px;\n  }\n\n  .m-s--12 {\n    margin-left: 100%;\n  }\n\n  .m-s--0 {\n    margin-left: 0;\n  }\n\n  .container--wrap--s {\n    flex-wrap: wrap;\n  }\n\n  .nudge--right {\n    margin-right: 15px;\n  }\n\n  .nudge--left {\n    margin-left: 15px;\n  }\n\n  .no-nudge--s {\n    margin-left: 0;\n    margin-right: 0;\n  }\n}\n@media screen and (max-width: 520px) {\n  .g-t--1 {\n    width: 8.3333333333%;\n    margin-top: 10px;\n    margin-bottom: 10px;\n  }\n\n  .m-t--1 {\n    margin-left: 8.3333333333%;\n  }\n\n  .g-t--2 {\n    width: 16.6666666667%;\n    margin-top: 10px;\n    margin-bottom: 10px;\n  }\n\n  .m-t--2 {\n    margin-left: 16.6666666667%;\n  }\n\n  .g-t--3 {\n    width: 25%;\n    margin-top: 10px;\n    margin-bottom: 10px;\n  }\n\n  .m-t--3 {\n    margin-left: 25%;\n  }\n\n  .g-t--4 {\n    width: 33.3333333333%;\n    margin-top: 10px;\n    margin-bottom: 10px;\n  }\n\n  .m-t--4 {\n    margin-left: 33.3333333333%;\n  }\n\n  .g-t--5 {\n    width: 41.6666666667%;\n    margin-top: 10px;\n    margin-bottom: 10px;\n  }\n\n  .m-t--5 {\n    margin-left: 41.6666666667%;\n  }\n\n  .g-t--6 {\n    width: 50%;\n    margin-top: 10px;\n    margin-bottom: 10px;\n  }\n\n  .m-t--6 {\n    margin-left: 50%;\n  }\n\n  .g-t--7 {\n    width: 58.3333333333%;\n    margin-top: 10px;\n    margin-bottom: 10px;\n  }\n\n  .m-t--7 {\n    margin-left: 58.3333333333%;\n  }\n\n  .g-t--8 {\n    width: 66.6666666667%;\n    margin-top: 10px;\n    margin-bottom: 10px;\n  }\n\n  .m-t--8 {\n    margin-left: 66.6666666667%;\n  }\n\n  .g-t--9 {\n    width: 75%;\n    margin-top: 10px;\n    margin-bottom: 10px;\n  }\n\n  .m-t--9 {\n    margin-left: 75%;\n  }\n\n  .g-t--10 {\n    width: 83.3333333333%;\n    margin-top: 10px;\n    margin-bottom: 10px;\n  }\n\n  .m-t--10 {\n    margin-left: 83.3333333333%;\n  }\n\n  .g-t--11 {\n    width: 91.6666666667%;\n    margin-top: 10px;\n    margin-bottom: 10px;\n  }\n\n  .m-t--11 {\n    margin-left: 91.6666666667%;\n  }\n\n  .g-t--12 {\n    width: 100%;\n    margin-top: 10px;\n    margin-bottom: 10px;\n  }\n\n  .m-t--12 {\n    margin-left: 100%;\n  }\n\n  .m-t--0 {\n    margin-left: 0;\n  }\n\n  .container--wrap--t {\n    flex-wrap: wrap;\n  }\n\n  .nudge--right {\n    margin-right: 10px;\n  }\n\n  .nudge--left {\n    margin-left: 10px;\n  }\n\n  .no-nudge--t {\n    margin-left: 0;\n    margin-right: 0;\n  }\n}\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n#wabs input[id*=modal-] {\n  display: none;\n}\n#wabs input[id*=modal-]:checked + label {\n  outline: none;\n  background-size: 1000%;\n  transition: all 1s cubic-bezier(0.64, 0.09, 0.08, 1);\n}\n#wabs input[id*=modal-]:checked + label:before {\n  content: "";\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.4);\n  transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);\n}\n#wabs input[id*=modal-]:checked ~ .modal-content {\n  transition: opacity 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);\n  opacity: 1;\n  display: block;\n  height: auto;\n  width: auto;\n  padding: 40px;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 10;\n}\n#wabs input[id*=modal-]:checked ~ .modal-content * {\n  height: auto;\n  width: auto;\n}\n#wabs .modal-trigger {\n  white-space: pre;\n  cursor: pointer;\n  /*transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);*/\n  padding: 10px 20px;\n  background-size: 0;\n  background-repeat: no-repeat;\n  background-position: 50% 50%;\n  position: absolute;\n  left: -100px;\n}\n#wabs .modal-trigger:after {\n  white-space: nowrap;\n  padding: 10px;\n  cursor: pointer;\n  /*transition: all 0.2s cubic-bezier(0.64, 0.09, 0.08, 1);*/\n  background-image: none;\n}\n#wabs .modal-content {\n  display: none;\n  position: fixed;\n  opacity: 0;\n  height: 0;\n  background: white;\n  border-radius: 3px;\n}\n#wabs .modal-content * {\n  width: 0;\n  height: 0;\n}\n\n\n\n\n\n\n\n\n\n\n\n.nav--horizontal {\n  display: flex;\n  margin-top: 0;\n  margin-bottom: 0;\n}\n.nav--horizontal ul, .nav--horizontal ol {\n  margin-left: 0;\n}\n.nav--horizontal > ul, .nav--horizontal > li {\n  display: flex;\n}\n.nav--horizontal a {\n  display: inline-block;\n}\n\n.nav--vertical {\n  margin-top: 0;\n  margin-bottom: 0;\n}\n.nav--vertical ul, .nav--vertical ol {\n  margin-left: 0;\n}\n.nav--vertical ul, .nav--vertical li, .nav--vertical a {\n  display: inline-block;\n  float: left;\n  clear: left;\n}\n.nav--vertical li:first-child a {\n  margin-bottom: 7px;\n}\n.nav--vertical li:last-child a {\n  margin-top: 7px;\n}\n.nav--vertical li a {\n  margin-top: 7px;\n  margin-bottom: 7px;\n}\n\n.logo-area {\n  width: 100%;\n  height: 152px;\n  border-bottom: solid 1px #e0e0e0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #474747;\n}\n\n.nav--super-vertical {\n  margin-top: 0;\n  margin-bottom: 0;\n  position: fixed;\n  height: 100%;\n  -webkit-transform: translateZ(0);\n  -webkit-backface-visibility: hidden;\n  background: white;\n  z-index: 7;\n  overflow-Y: auto;\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);\n}\n.nav--super-vertical a, .nav--super-vertical label {\n  width: 100%;\n  display: block;\n  text-decoration: none;\n  color: #474747;\n  cursor: pointer;\n  font-weight: 500;\n  padding: 20px 24px;\n  transition: none;\n  background-image: none;\n}\n.nav--super-vertical a:hover, .nav--super-vertical label:hover {\n  background: #e0e0e0;\n}\n.nav--super-vertical input {\n  display: none;\n}\n.nav--super-vertical input:checked + label {\n  transition: background 0.2s cubic-bezier(0.64, 0.09, 0.08, 1), color 0.2s cubic-bezier(0.64, 0.09, 0.08, 1);\n  background: #e0e0e0;\n}\n.nav--super-vertical input:checked ~ .nav-collapsible-links {\n  height: auto;\n  transform: scaleY(1);\n}\n.nav--super-vertical input:checked ~ .nav-collapsible-links a {\n  height: 54px;\n}\n\n.nav-collapsible-links {\n  height: 100%;\n  transform: scaleY(0);\n  transform-origin: 0 0;\n  transition: transform 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);\n}\n.nav-collapsible-links a {\n  padding: 0 24px 0 34px;\n  height: 0;\n  font-weight: 400;\n  transition: height 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);\n  display: flex;\n  align-items: center;\n}\n\n#nav--super-vertical-responsive,\n#nav--super-vertical-responsive + label,\n#nav--horizontal-responsive,\n#nav--horizontal-responsive + label {\n  display: none;\n}\n\n@media screen and (max-width: 1200px) {\n  .nav--super-vertical {\n    padding-top: 40px;\n    transform: translateX(-100%);\n    transition: transform 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);\n  }\n\n  #nav--super-vertical-responsive + label {\n    display: block;\n    position: fixed;\n    z-index: 8;\n    top: 0;\n    left: 0;\n    padding: 10px;\n    background: white;\n    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.07);\n    cursor: pointer;\n    transition: background 0.3s cubic-bezier(0.64, 0.09, 0.08, 1), color 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);\n  }\n\n  #nav--super-vertical-responsive:checked + label {\n    background: #1abc9c;\n    color: white;\n  }\n  #nav--super-vertical-responsive:checked ~ .nav--super-vertical {\n    transform: translateX(0);\n  }\n}\n@media screen and (max-width: 900px) {\n  .nav--horizontal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    z-index: 7;\n    transform: translateY(-100%);\n    transition: transform 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);\n  }\n  .nav--horizontal ul, .nav--horizontal li, .nav--horizontal a {\n    width: 100%;\n    display: block;\n    margin: 0;\n  }\n  .nav--horizontal a {\n    line-height: 40px;\n  }\n  .nav--horizontal > ul {\n    padding-top: 50px;\n    background: white;\n    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.07);\n  }\n\n  #nav--horizontal-responsive + label {\n    display: block;\n    position: fixed;\n    z-index: 8;\n    top: 0;\n    left: 0;\n    padding: 10px;\n    background: white;\n    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.07);\n    cursor: pointer;\n    transition: background 0.3s cubic-bezier(0.64, 0.09, 0.08, 1), color 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);\n  }\n\n  #nav--horizontal-responsive:checked + label {\n    background: #1abc9c;\n    color: white;\n  }\n  #nav--horizontal-responsive:checked ~ .nav--horizontal {\n    transform: translateY(0);\n  }\n}\n.nav--vertical a, .nav--horizontal a {\n  color: #1abc9c;\n  background: white;\n  padding: 10px;\n  transition: none;\n  will-change: background;\n}\n.nav--vertical a:hover, .nav--horizontal a:hover {\n  background: #e5e5e5;\n}\n\n.dropdown {\n  position: relative;\n}\n.dropdown ul {\n  position: absolute;\n  background: white;\n  left: 0;\n  transition: all 0.3s ease;\n  transform: scale(0);\n  transform-origin: 0 0;\n  z-index: 2;\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.07);\n  width: 100%;\n}\n.dropdown ul li {\n  width: 100%;\n  margin: 0;\n  padding: 0;\n}\n.dropdown ul li a {\n  width: 100%;\n  padding: 8px 10px;\n  display: inline-block;\n  margin: 0;\n  border-radius: 0;\n}\n.dropdown:hover ul {\n  transform: scale(1);\n}\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n#wabs .tabs {\n  display: flex;\n  position: relative;\n  padding: 0;\n}\n#wabs .tabs input[type=radio][name=tabs] {\n  position: absolute;\n  z-index: -1;\n}\n#wabs .tabs input[type=radio][name=tabs]:checked + .tab-label-content > label {\n  color: white;\n}\n#wabs .tabs input[type=radio][name=tabs]:checked + .tab-label-content .tab-content {\n  display: block;\n}\n#wabs .tabs input[type=radio][name=tabs]:first-of-type:checked ~ .slide {\n  left: 0;\n}\n#wabs .tabs input[type=radio][name=tabs]:nth-of-type(1):checked ~ .slide-demo {\n  left: 0%;\n  left: calc((100% / 4) * 0);\n}\n#wabs .tabs input[type=radio][name=tabs]:nth-of-type(2):checked ~ .slide-demo {\n  left: 25%;\n  left: calc((100% / 4) * 1);\n}\n#wabs .tabs input[type=radio][name=tabs]:nth-of-type(3):checked ~ .slide-demo {\n  left: 50%;\n  left: calc((100% / 4) * 2);\n}\n#wabs .tabs input[type=radio][name=tabs]:nth-of-type(4):checked ~ .slide-demo {\n  left: 75%;\n  left: calc((100% / 4) * 3);\n}\n#wabs .slide-demo {\n  width: 25%;\n  width: calc(100% / 4);\n}\n#wabs .tab-label-content:nth-of-type(1) .tab-content {\n  left: 0%;\n}\n#wabs .tab-label-content:nth-of-type(2) .tab-content {\n  left: -100%;\n}\n#wabs .tab-label-content:nth-of-type(3) .tab-content {\n  left: -200%;\n}\n#wabs .tab-label-content:nth-of-type(4) .tab-content {\n  left: -300%;\n}\n#wabs .tab-content {\n  width: 385%;\n  z-index: 9999;\n}\n#wabs .tabs .tab-label-content > label {\n  cursor: pointer;\n  color: rgba(255, 255, 255, 0.8);\n  background-color: #00bfa5;\n  box-sizing: border-box;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  height: 40px;\n  transition: color 0.2s cubic-bezier(0.64, 0.09, 0.08, 1);\n  will-change: color;\n  width: 100%;\n}\n#wabs .slide {\n  background: #ffeb3b;\n  height: 4px;\n  position: absolute;\n  left: 0;\n  top: 37px;\n  transition: left 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);\n  will-change: left;\n}\n#wabs .tab-label-content {\n  width: 100%;\n  position: relative;\n}\n#wabs .tab-label-content .tab-content {\n  padding: 10px;\n  position: absolute;\n  padding: 20px;\n  display: none;\n}\n#wabs .card.tabs .tab-label-content:first-of-type label {\n  border-top-left-radius: 3px;\n}\n#wabs .card.tabs .tab-label-content:nth-last-child(2) label {\n  border-top-right-radius: 3px;\n}\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n#wabs .tip {\n  position: relative;\n}\n#wabs .tip:hover:after {\n  position: absolute;\n  content: attr(data-text);\n  background: rgba(0,0,0,.82);\n  border-radius: 3px;\n  padding: 8px;\n  bottom: -2.5em;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 2;\n  color: #ffffff;\n}\n\n#wabs #account-info.tip:hover::after {\n  line-height: 1;\n  bottom: 26px;\n  width: max-content;\n  left: 100% !important;\n}\n\n#wabs #subscription-status.tip:hover::after {\n  line-height: 1;\n  bottom: 30px;\n  width: max-content;\n  left: 100% !important;\n}\n\n\n\n\n\n\n\n\n\n\n\n.card.tabs .tab-label-content:first-of-type label {\n  border-top-left-radius: 0 !important;\n}\n\n.card.tabs .tab-label-content:nth-last-child(2) label {\n  border-top-right-radius:  0 !important;\n}\n\n@-webkit-keyframes blink {\n  0% {\n    border-color: red\n  }\n  50% {\n    border-color: transparent\n  }\n  100% {\n    border-color: red\n  }\n}\n\n.blinking {\n  -webkit-animation: blink 1s infinite;\n  -moz-animation: blink 1s infinite;\n  -ms-animation: blink 1s infinite;\n  border: 3px solid\n}\n\n\n/*#wabs {\n  -webkit-transform: translateX(0);\n    transform: translateX(0);\n    }*/\n\n/*\n#wabs {\n  -webkit-animation-duration: 0.1s;\n  animation-duration: 0.1s;\n  -webkit-animation-fill-mode: both;\n  animation-fill-mode: both;\n   -webkit-animation-name: zoomIn;\n  animation-name: zoomIn;\n}\n\n\n@-webkit-keyframes zoomIn {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1);\n    transform: scale3d(0.1, 0.1, 0.1);\n  }\n\n  50% {\n    opacity: 1;\n  }\n}\n\n@keyframes zoomIn {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1);\n    transform: scale3d(0.1, 0.1, 0.1);\n  }\n\n  50% {\n    opacity: 1;\n  }\n}\n*/\n\n#wabs label svg path {\n  color: var(--icon);\n}\n\n\n#wabs .modal-rate svg {\n  display: inline-block;\n  fill: #febf00;\n}\n\n#wabs input.modal-subscribe-input:checked + label::before {\n  top: 40px;\n  left: 1px;\n  cursor: not-allowed;\n}\n\n#wabs .buy-btn {\n  padding-top: 10px;\n  padding-bottom: 10px;\n  padding-left: 15px;\n  padding-right: 15px;\n  border: 1px solid #eee;\n  cursor: pointer;\n  background-repeat: no-repeat;\n  height: 17px;\n  text-align: left;\n  line-height: 1;\n  background-position-y: center;\n  background-position-x: 93%;\n  width: 300px;\n  margin: 0 auto;\n}\n\n#wabs .choices[data-type="select-multiple"] input.choices__input {\n  width: fit-content !important;\n}\n\n#wabs .messages-templates-selection input.choices__input {\n  display: inline;\n  width: auto !important;\n}\n\n#wabs b {\n  font-weight: bold;\n}\n\n#wabs .text-right {\n  text-align: right;\n  direction: rtl;\n}\n\n#wabs .text-left {\n  text-align: left;\n  direction: ltr;\n}\n\n#wabs .text-center {\n  text-align: center;\n}\n\n#wabs label[for*="collapsible-"] {\n  width: auto;\n}\n\n#wabs .btn--small {\n  font-size: x-small;\n  padding: 5px;\n}\n\n#wabs input {\n  background-size: 100% !important;\n}\n\n#wabs #replies-container .collapsible-wrap {\n  width: 100%;\n}\n\n#wabs #replies-container .collapse-label {\n  width: auto !important;\n}\n\n#wabs #replies-container .collapse-label span,\n#wabs #scheduling-container .collapse-label span {\n  font-size: small;\n  margin-left: 20px;\n  padding: 2px 0;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 70% !important;\n}\n\n#wabs #replies-container .collapsible-wrap div > p {\n  line-height: 1.5;\n  font-size: small;\n}\n\n#wabs #bulkMsg-variables .tip:hover::after {\n  width: 200px;\n  bottom: -5em;\n  font-size: x-small;\n}\n\n#wabs #bulkMsg-tools .tip:hover::after {\n  font-size: x-small;\n  white-space: nowrap;\n  bottom: -3.5em;\n}\n\n#wabs #replies-container .tip:hover::after, \n#wabs #templates-container .tip:hover::after,\n#wabs #scheduling-container .tip:hover::after,\n#wabs .modal-content .tip:hover::after {\n  font-size: x-small;\n  white-space: nowrap;\n  bottom: -3.5em;\n}\n\n#wabs .footer-nav ul {\n  float: right;\n  margin-right: 20px;\n}\n\n#wabs .footer-nav li {\n  display: inline;\n}\n\n\n#wabs .footer-nav li a {\n  color: #ffffff;\n  float: left;\n  margin: 0 10px;\n}\n\n#wabs .footer-nav {\n  position: fixed;\n  bottom: 0;\n  width: 100%;\n  background-color: rgb(26, 188, 156);\n  color: white;\n  padding: 10px;\n  font-size: small;\n  z-index: 999999;\n}\n\n/*#wabs .footer-nav {\n  border: 1px solid rgb(26, 188, 156);\n  right: 100px; \n  position: fixed; \n  bottom: 33px; \n  background-color: white; \n  z-index: 999999;\n}\n\n#wabs .footer-nav li {\n  margin: 3px 0;\n  overflow: hidden;\n  }*/\n\n  #wabs textarea::selection {\n    color: white;\n    background-color: blue;\n  }\n\n  #wabs input::selection {\n    color: white;\n    background-color: blue;\n  }\n\n  #wabs .modal-content h4 {\n    font-size: 20px;\n    font-weight: bold;\n    margin-bottom: 20px;\n  }\n\n  #wabs .modal-content p {\n    line-height: 1.5;\n    margin-bottom: 10px;\n  }\n\n\n  #wabs .target-reach p {\n    margin-bottom: 5px;\n  }\n\n  #wabs .m0 {\n    margin: 0;\n  }\n\n  #wabs .ml-2 {\n    margin-left: 20px;\n  }\n\n  #wabs .pl-2 {\n    padding-left: 20px;\n  }\n\n  #wabs code {\n    background: #eee;\n    padding: 2px 3px;\n    border-radius: 3px;\n  }\n\n  #wabs .vars-list li {\n    font-size: small;\n    line-height: 1.4;\n  }\n\n  #wabs .bulkMsg {\n    margin: 10px 0 10px 20px;\n    width: 80%;\n    height: 40px;\n    padding: 10px;\n    border-radius: 3px;\n    resize: vertical;\n  }\n\n  #wabs #bulkMsg-tools {\n    position: absolute;\n    bottom: 20px;\n    right: 14%;\n  }\n\n  #wabs #bulkMsg-tools span {\n    display: inline-block;\n  }\n\n  #wabs ul li {\n    margin: 5px 0;\n  }\n\n  #wabs .choices__inner {\n    min-height: 28px;\n    padding: 4.5px 4.5px 0.25px;\n  }\n\n  /* #wabs .choices__input {\n    display: none;\n  } */\n\n  #wabs [data-type="select-one"] .choices__inner {\n    padding: 4.5px 4.5px 4.5px !important;\n  }\n\n/*\n#wabs .choices {\n  width: 85% !important;\n  display: grid;\n  }*/\n\n  #wabs .choices {\n    margin: 15px 0 !important;\n  }\n\n  #wabs #account-info a {\n    color: #fff;\n  }\n\n\n  #wabs .modal-content.g--4 {\n    transform: translate(-50%, -51%) !important;\n  }\n\n  #wabs .modal-content.modal-add-reply-content,  #wabs .modal-content.modal-add-template-content {\n    transform: translate(-50%, -50.1%) !important;\n  }\n\n  #wabs .bulk-running, #wabs .export-groups-running {\n    opacity: 0.3;\n    pointer-events: none;\n  }\n\n\n  #wabs .rtl .modal-add-reply-content label, #wabs .rtl .modal-add-template-content label {\n    direction: ltr;\n    margin-left: 10px !important;\n  }\n\n/*#wabs .collapsible-wrap label {\n    z-index: -1;\n}\n\n#wabs .collapsible-wrap {\n    z-index: -1;\n}\n\n#wabs .collapsible-wrap li {\n    z-index: -1;\n}\n\n\n\n\n*/\n\n\n\n\n\n\n.choices{position:relative;overflow:hidden;margin-bottom:24px;font-size:16px}.choices:focus{outline:0}.choices:last-child{margin-bottom:0}.choices.is-open{overflow:initial}.choices.is-disabled .choices__inner,.choices.is-disabled .choices__input{background-color:#eaeaea;cursor:not-allowed;-webkit-user-select:none;-ms-user-select:none;user-select:none}.choices.is-disabled .choices__item{cursor:not-allowed}.choices [hidden]{display:none!important}.choices[data-type*=select-one]{cursor:pointer}.choices[data-type*=select-one] .choices__inner{padding-bottom:7.5px}.choices[data-type*=select-one] .choices__input{display:block;width:100%;padding:10px;border-bottom:1px solid #ddd;background-color:#fff;margin:0}.choices[data-type*=select-one] .choices__button{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yLjU5Mi4wNDRsMTguMzY0IDE4LjM2NC0yLjU0OCAyLjU0OEwuMDQ0IDIuNTkyeiIvPjxwYXRoIGQ9Ik0wIDE4LjM2NEwxOC4zNjQgMGwyLjU0OCAyLjU0OEwyLjU0OCAyMC45MTJ6Ii8+PC9nPjwvc3ZnPg==);padding:0;background-size:8px;position:absolute;top:50%;right:0;margin-top:-10px;margin-right:25px;height:20px;width:20px;border-radius:10em;opacity:.25}.choices[data-type*=select-one] .choices__button:focus,.choices[data-type*=select-one] .choices__button:hover{opacity:1}.choices[data-type*=select-one] .choices__button:focus{box-shadow:0 0 0 2px #00bcd4}.choices[data-type*=select-one] .choices__item[data-value=\'\'] .choices__button{display:none}.choices[data-type*=select-one]:after{content:\'\';height:0;width:0;border-style:solid;border-color:#333 transparent transparent;border-width:5px;position:absolute;right:11.5px;top:50%;margin-top:-2.5px;pointer-events:none}.choices[data-type*=select-one].is-open:after{border-color:transparent transparent #333;margin-top:-7.5px}.choices[data-type*=select-one][dir=rtl]:after{left:11.5px;right:auto}.choices[data-type*=select-one][dir=rtl] .choices__button{right:auto;left:0;margin-left:25px;margin-right:0}.choices[data-type*=select-multiple] .choices__inner,.choices[data-type*=text] .choices__inner{cursor:text}.choices[data-type*=select-multiple] .choices__button,.choices[data-type*=text] .choices__button{position:relative;display:inline-block;margin:0 -4px 0 8px;padding-left:16px;border-left:1px solid #008fa1;background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yLjU5Mi4wNDRsMTguMzY0IDE4LjM2NC0yLjU0OCAyLjU0OEwuMDQ0IDIuNTkyeiIvPjxwYXRoIGQ9Ik0wIDE4LjM2NEwxOC4zNjQgMGwyLjU0OCAyLjU0OEwyLjU0OCAyMC45MTJ6Ii8+PC9nPjwvc3ZnPg==);background-size:8px;width:8px;line-height:1;opacity:.75;border-radius:0}.choices[data-type*=select-multiple] .choices__button:focus,.choices[data-type*=select-multiple] .choices__button:hover,.choices[data-type*=text] .choices__button:focus,.choices[data-type*=text] .choices__button:hover{opacity:1}.choices__inner{display:inline-block;vertical-align:top;width:100%;background-color:#f9f9f9;padding:7.5px 7.5px 3.75px;border:1px solid #ddd;border-radius:2.5px;font-size:14px;min-height:44px;overflow:hidden}.is-focused .choices__inner,.is-open .choices__inner{border-color:#b7b7b7}.is-open .choices__inner{border-radius:2.5px 2.5px 0 0}.is-flipped.is-open .choices__inner{border-radius:0 0 2.5px 2.5px}.choices__list{margin:0;padding-left:0;list-style:none}.choices__list--single{display:inline-block;padding:4px 16px 4px 4px;width:100%}[dir=rtl] .choices__list--single{padding-right:4px;padding-left:16px}.choices__list--single .choices__item{width:100%}.choices__list--multiple{display:inline}.choices__list--multiple .choices__item{display:inline-block;vertical-align:middle;border-radius:20px;padding:4px 10px;font-size:12px;font-weight:500;margin-right:3.75px;margin-bottom:3.75px;background-color:#00bcd4;border:1px solid #00a5bb;color:#fff;word-break:break-all;box-sizing:border-box}.choices__list--multiple .choices__item[data-deletable]{padding-right:5px}[dir=rtl] .choices__list--multiple .choices__item{margin-right:0;margin-left:3.75px}.choices__list--multiple .choices__item.is-highlighted{background-color:#00a5bb;border:1px solid #008fa1}.is-disabled .choices__list--multiple .choices__item{background-color:#aaa;border:1px solid #919191}.choices__list--dropdown{visibility:hidden;z-index:1;position:absolute;width:100%;background-color:#fff;border:1px solid #ddd;top:100%;margin-top:-1px;border-bottom-left-radius:2.5px;border-bottom-right-radius:2.5px;overflow:hidden;word-break:break-all;will-change:visibility}.choices__list--dropdown.is-active{visibility:visible}.is-open .choices__list--dropdown{border-color:#b7b7b7}.is-flipped .choices__list--dropdown{top:auto;bottom:100%;margin-top:0;margin-bottom:-1px;border-radius:.25rem .25rem 0 0}.choices__list--dropdown .choices__list{position:relative;max-height:300px;overflow:auto;-webkit-overflow-scrolling:touch;will-change:scroll-position}.choices__list--dropdown .choices__item{position:relative;padding:10px;font-size:14px}[dir=rtl] .choices__list--dropdown .choices__item{text-align:right}@media (min-width:640px){.choices__list--dropdown .choices__item--selectable{padding-right:100px}.choices__list--dropdown .choices__item--selectable:after{content:attr(data-select-text);font-size:12px;opacity:0;position:absolute;right:10px;top:50%;transform:translateY(-50%)}[dir=rtl] .choices__list--dropdown .choices__item--selectable{text-align:right;padding-left:100px;padding-right:10px}[dir=rtl] .choices__list--dropdown .choices__item--selectable:after{right:auto;left:10px}}.choices__list--dropdown .choices__item--selectable.is-highlighted{background-color:#f2f2f2}.choices__list--dropdown .choices__item--selectable.is-highlighted:after{opacity:.5}.choices__item{cursor:default}.choices__item--selectable{cursor:pointer}.choices__item--disabled{cursor:not-allowed;-webkit-user-select:none;-ms-user-select:none;user-select:none;opacity:.5}.choices__heading{font-weight:600;font-size:12px;padding:10px;border-bottom:1px solid #f7f7f7;color:gray}.choices__button{text-indent:-9999px;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:0;background-color:transparent;background-repeat:no-repeat;background-position:center;cursor:pointer}.choices__button:focus,.choices__input:focus{outline:0}.choices__input{display:inline-block;vertical-align:baseline;background-color:#f9f9f9;font-size:14px;margin-bottom:5px;border:0;border-radius:0;max-width:100%;padding:4px 0 4px 2px}[dir=rtl] .choices__input{padding-right:2px;padding-left:0}.choices__placeholder{opacity:.5}\n\n\n\n#wabs [class*="collapsible-"][class$="area"] {\n  position: relative !important;\n  z-index: 100 !important;\n}\n\n\n\n\n/* reactions */\n/*.FB_reactions {\n  border: 1px solid #bfbfbf;\n  color: #8c8c8c;\n  position:relative;\n  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5); \n  border-radius: 4px;\n  cursor: pointer;\n  display: inline-block;\n  text-transform: uppercase;\n  font-family: "Open Sans","Helvetica Neue",sans-serif;\n  font-size: 13px;\n  font-weight: 400;\n  background:#fff;\n  line-height: 20px;\n  padding: 2px ;\n  transition: all 20ms ease-out;\n  vertical-align: top;\n  z-index: 99999;\n  width:90px;   \n  background:url(chrome-extension://ekcgkejcjdcmonfpmnljobemcbpnkamh/src/emojis/emojis/default.png) center left no-repeat;  \n  background-position: left 10px top 2px;\n}\n\n[data-emoji-class="like"]{background:url(chrome-extension://ekcgkejcjdcmonfpmnljobemcbpnkamh/src/emojis/like.gif) center left no-repeat; background-size: 25px 25px; background-position: left 10px top 6px;}\n[data-emoji-class="love"]{background:url(chrome-extension://ekcgkejcjdcmonfpmnljobemcbpnkamh/src/emojis/emojis/love.gif) center left no-repeat; background-size: 25px 25px; background-position: left 10px top 6px;}\n[data-emoji-class="haha"]{background:url(chrome-extension://ekcgkejcjdcmonfpmnljobemcbpnkamh/src/emojis/emojis/haha.gif) center left no-repeat;background-size: 25px 25px; background-position: left 10px top 6px;}\n[data-emoji-class="wow"]{background:url(chrome-extension://ekcgkejcjdcmonfpmnljobemcbpnkamh/src/emojis/emojis/wow.gif) center left no-repeat;background-size: 25px 25px; background-position: left 10px top 6px;}\n[data-emoji-class="sad"]{background:url(chrome-extension://ekcgkejcjdcmonfpmnljobemcbpnkamh/src/emojis/emojis/sad.gif) center left no-repeat;background-size: 25px 25px; background-position: left 10px top 6px;}\n[data-emoji-class="angry"]{background:url(chrome-extension://ekcgkejcjdcmonfpmnljobemcbpnkamh/src/emojis/emojis/angry.gif) center left no-repeat;background-size: 25px 25px; background-position: left 10px top 6px;}\n\n.FB_reactions span{display:block; padding:9px 0px 4px 40px; text-align:left;}\n*/\n\n._bar ._inner img {\n  width: 40px;\n/*  padding: 0;\n  margin-right: -17px;\n  margin-top: -6px;\n  margin-bottom: -6px;\n  margin-left: -5px;*/\n  position: relative;\n  cursor: pointer;\n  float:left;\n  transform: scale(.8, .8) translate(0, 0);\n  transition: transform 200ms ease;\n  z-index: 99999;\n}\n\n._bar ._inner img:nth-child(1) { \n  -webkit-animation:bounce .21s .1s;\n}\n._bar ._inner img:nth-child(2) { \n  -webkit-animation:bounce .25s .1s;\n}\n._bar ._inner img:nth-child(3) { \n  -webkit-animation:bounce .29s .1s;\n}\n._bar ._inner img:nth-child(4) { \n  -webkit-animation:bounce .3s .1s;\n}\n._bar ._inner img:nth-child(5) { \n  -webkit-animation:bounce .35s .1s;\n}\n._bar ._inner img:nth-child(6) { \n  -webkit-animation:bounce .4s .1s\n}\n._bar ._inner img:nth-child(7) { \n  -webkit-animation:bounce .49s .1s\n}\n\n@-webkit-keyframes bounce {\n  0%       { bottom:5px;  }\n  25%{ bottom:55px; }   \n  50%      { bottom:20px;  }\n  75% { bottom:15px; }\n  100%     {bottom:0; }\n}\n\n._bar ._inner img:hover {\n  transform: scale(1.2, 1.2) translate(0, -6px);\n  opacity: 1;      \n}\n\n._bar {\n  display:none;\n}\n\n._inner {\n  position: relative;\n  overflow: hidden;\n  background-color: white;\n  margin: auto;\n  padding: 0px 0px 1px 1px;\n  border-radius: 20px;\n  -moz-box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.2);\n  -webkit-box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.2);\n  box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.2);\n  -moz-backface-visibility: hidden;\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  -moz-transform: translate3d(0, 0, 0);\n  -ms-transform: translate3d(0, 0, 0);\n  -webkit-transform: translate3d(0, 0, 0);\n  transform: translate3d(0, 0, 0);\n  -moz-transform-style: preserve-3d;\n  -webkit-transform-style: preserve-3d;\n  transform-style: preserve-3d;\n  z-index: 99999;\n}\n\n\n._bar.reactions-container {\n  border-radius: 50px !important;\n}\n\n.ov_visi{ overflow:visible;}\n\n\n.header-warning {\n  font-size: x-small;\n  color: white;\n  position: absolute;\n  background: red;\n  padding: 5px;\n  right: 0;\n}\n\n.header-warning:hover {\n  background: yellow;\n  color: black;\n}\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.call-popup {\n  z-index: 1000;\n  background-color: #f1f1f1;\n  text-align: center;\n  min-height: 500px;\n  min-width: 410px;\n  max-height: 700px;\n  max-width: 800px;\n  height: 500px;\n  width: 410px;\n  box-shadow: 0 1px 1px 0 rgba(0,0,0,.06), 0 2px 5px 0 rgba(0,0,0,.2);\n  background-color: rgb(26, 188, 156);\n/*  margin: auto;\n  position: absolute;\n  top: 0; left: 0; bottom: 0; right: 0;\n  */\n}\n\n/*Drgable */\n\n.call-popup {\n  position: absolute;\n  /*resize: both; !*enable this to css resize*! */\n  overflow: hidden;\n}\n\n.call-popup-header {\n  padding: 10px;\n  cursor: move;\n  z-index: 10;\n  background-color: #009688;;\n  color: #fff;\n  height: auto;\n}\n\n/*Resizeable*/\n\n.call-popup .resizer-right {\n  width: 5px;\n  height: 100%;\n  background: transparent;\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  cursor: e-resize;\n}\n\n.call-popup .resizer-bottom {\n  width: 100%;\n  height: 5px;\n  background: transparent;\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  cursor: n-resize;\n}\n\n.call-popup .resizer-both {\n  width: 5px;\n  height: 5px;\n  background: transparent;\n  z-index: 10;\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  cursor: nw-resize;\n}\n\n/*NOSELECT*/\n\n.call-popup * {\n  -webkit-touch-callout: none; /* iOS Safari */\n  -webkit-user-select: none; /* Safari */\n  -khtml-user-select: none; /* Konqueror HTML */\n  -moz-user-select: none; /* Firefox */\n  -ms-user-select: none; /* Internet Explorer/Edge */\n  user-select: none; /* Non-prefixed version, currently\n  supported by Chrome and Opera */\n}\n\n.call-animation {\n  background: #fff;\n  width: 135px;\n  height: 135px;\n  position: relative;\n  margin: 0 auto;\n  border-radius: 100%;\n  border: solid 5px #fff;\n  animation: play 2s ease infinite;\n  -webkit-backface-visibility: hidden;\n  -moz-backface-visibility: hidden;\n  -ms-backface-visibility: hidden;\n  backface-visibility: hidden;\n  margin: auto;\n  position: absolute;\n  top: 0; left: 0; bottom: 0; right: 0;\n\n\n}\n\n.call-popup .caller-image {\n  width: 135px;\n  height: 135px;\n  border-radius: 100%;\n  position: absolute;\n  left: 0px;\n  top: 0px;\n}\n\n@keyframes play {\n\n  0% {\n    transform: scale(1);\n  }\n  15% {\n    box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.4);\n  }\n  25% {\n    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0.4), 0 0 0 20px rgba(255, 255, 255, 0.2);\n  }\n  25% {\n    box-shadow: 0 0 0 15px rgba(255, 255, 255, 0.4), 0 0 0 30px rgba(255, 255, 255, 0.2);\n  }\n\n}\n\n#wabs .choices__list--multiple .choices__item {\n  background-color: rgb(26, 188, 156);\n  border-color: rgb(26, 188, 156);\n  border-radius: 3px;\n}\n\n#wabs input[id*="modal-"]:checked + label::before {\n  z-index: 9999;\n}\n\n\n\n\n\n#wabs .packages-table {\n  margin: -20px auto 15px auto;\n}\n\n#wabs .packages-table .table-header {\n  text-align: center;\n}\n\n#wabs .packages-table tr {\n  line-height: 2.5;\n  position: relative;\n}\n\n#wabs .packages-table td {\n  padding: 0 25px;\n  position: relative;\n}\n\n#wabs .packages-table .off {\n  color: lightgray !important;\n}\n\n#wabs .packages-table td > span {\n  margin-right: 5px;\n}\n\n#wabs .packages-table td:not(.off) > span {\n  color: #00BEA5;\n}\n\n#wabs .packages-table td.popular:not(.off) > span {\n  color: #ffffff;\n}\n\n#wabs .btn--medium {\n  display: inline-block;\n  padding: 3px 10px;\n  line-height: 22px;\n  font-size: small;\n}\n\n#wabs .packages-table .popular {\n  background: #00bea5;\n  color: #ffffff;\n}\n\n#wabs .packages-table tr:hover a {\n  display: block;\n  /*margin: 10px 0;*/\n  /*float: __MSG_x_direction_float_opposite__;*/\n  position: absolute;\n  right: 5px;\n  top: 10px;\n  cursor: pointer;\n}\n\n#wabs .packages-table tr svg {\n  fill: #00bea5;\n}\n\n#wabs .packages-table tr td.popular svg {\n  fill: #ffffff;\n}\n\n#wabs .packages-table tr a {\n  display: none;\n}\n\n\n.wabs-is-online {\n  overflow: visible !important\n}\n\nbody.dark .app-wrapper-web::after {\n  display: none !important;\n}\n\nbody.dark {\n  background-size: cover !important;\n}\n\n\n._3mMX1 .wabs-is-online::after {\n  border: 2px solid #ebebeb;\n}\n\n.wabs-is-online::after {\n  content:" ";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  background-color: #07d755;\n  border-radius: 100%;\n  width: 13px;\n  height: 13px;\n  border: 2px solid #ffffff;\n  z-index: 9999;\n}\n\n/* chat folders */\n  #chat-folders ul.folders li {\n      display: inline-block;\n      height: 100%;\n      align-items: center;\n  }\n\n  #chat-folders #arrow-right {\n      position: absolute;\n      height: 100%;\n      right: 0;\n      width: 50px;\n      vertical-align: middle;\n      text-align: center;\n      background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(9, 9, 121, 0) 0%, rgba(0, 0, 0, 1) 100%);\n      line-height: 2.6;\n      cursor: pointer;\n      z-index: 99999;\n  }\n\n  #chat-folders #arrow-left {\n      position: absolute;\n      height: 100%;\n      left: 0;\n      width: 50px;\n      vertical-align: middle;\n      text-align: center;\n      background: linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, rgba(9, 9, 121, 0) 0%, rgba(0, 0, 0, 1) 100%);\n      line-height: 2.6;\n      cursor: pointer;\n      z-index: 99999;\n  }\n\n  #chat-folders ul.folders li div.folder-item-container {\n      padding: 0 13px;\n      height: 100%;\n      display: flex;\n      align-items: center;\n  }\n\n  #chat-folders ul.folders li div.folder-item-container .controls {\n      display: inline-flex;\n      align-items: center;\n  }\n\n  #chat-folders ul.folders li div.folder-item-container button.label:hover {\n      color: #009588;\n  }\n\n  #chat-folders ul.folders li div.folder-item-container button.dropdown-button:hover {\n      background-color: #009588;\n  }\n\n  #chat-folders ul.folders li.active div.folder-item-container .controls {\n      height: 100%;\n  }\n\n  #chat-folders ul.folders li.active div.folder-item-container .controls::after {\n      content: "";\n      display: inline-block;\n      position: absolute;\n      background: #009588;\n      width: 100%;\n      height: 4px;\n      left: 0;\n      bottom: 0;\n  }\n\n  #chat-folders ul.folders li.active div.folder-item-container button.label {\n      color: #009588;\n  }\n\n  #chat-folders {\n      display: flex;\n      justify-content: space-between;\n      height: 100%;\n      border-bottom: 1px solid var(--border-default);\n      overflow: hidden;\n      height: 48px;\n      max-height: 48px;\n      z-index: 250;\n      position: relative;\n  }\n\n  #chat-folders ul.folders {\n      height: 100%;\n      white-space: nowrap;\n      margin-top: 1px;\n      margin-right: auto;\n      margin-bottom: 0px;\n      margin-left: auto;\n  }\n\n  #chat-folders * {\n      position: relative;\n  }\n\n  #chat-folders button {\n      font-size: 14px;\n      font-weight: 500;\n      color: #636466;\n  }\n\n  /* end chat folders */\n'
        },
        {},
      ],
      11: [
        function (e, n, t) {
          var i,
            r,
            n = (n.exports = {})
          function o() {
            throw new Error('setTimeout has not been defined')
          }
          function a() {
            throw new Error('clearTimeout has not been defined')
          }
          function s(n) {
            if (i === setTimeout) return setTimeout(n, 0)
            if ((i === o || !i) && setTimeout)
              return (i = setTimeout), setTimeout(n, 0)
            try {
              return i(n, 0)
            } catch (e) {
              try {
                return i.call(null, n, 0)
              } catch (e) {
                return i.call(this, n, 0)
              }
            }
          }
          !(function () {
            try {
              i = 'function' == typeof setTimeout ? setTimeout : o
            } catch (e) {
              i = o
            }
            try {
              r = 'function' == typeof clearTimeout ? clearTimeout : a
            } catch (e) {
              r = a
            }
          })()
          var l,
            c = [],
            h = !1,
            d = -1
          function u() {
            h &&
              l &&
              ((h = !1),
              l.length ? (c = l.concat(c)) : (d = -1),
              c.length && p())
          }
          function p() {
            if (!h) {
              var e = s(u)
              h = !0
              for (var n = c.length; n; ) {
                for (l = c, c = []; ++d < n; ) l && l[d].run()
                ;(d = -1), (n = c.length)
              }
              ;(l = null),
                (h = !1),
                (function (n) {
                  if (r === clearTimeout) return clearTimeout(n)
                  if ((r === a || !r) && clearTimeout)
                    return (r = clearTimeout), clearTimeout(n)
                  try {
                    r(n)
                  } catch (e) {
                    try {
                      return r.call(null, n)
                    } catch (e) {
                      return r.call(this, n)
                    }
                  }
                })(e)
            }
          }
          function f(e, n) {
            ;(this.fun = e), (this.array = n)
          }
          function g() {}
          ;(n.nextTick = function (e) {
            var n = new Array(arguments.length - 1)
            if (1 < arguments.length)
              for (var t = 1; t < arguments.length; t++) n[t - 1] = arguments[t]
            c.push(new f(e, n)), 1 !== c.length || h || s(p)
          }),
            (f.prototype.run = function () {
              this.fun.apply(null, this.array)
            }),
            (n.title = 'browser'),
            (n.browser = !0),
            (n.env = {}),
            (n.argv = []),
            (n.version = ''),
            (n.versions = {}),
            (n.on = g),
            (n.addListener = g),
            (n.once = g),
            (n.off = g),
            (n.removeListener = g),
            (n.removeAllListeners = g),
            (n.emit = g),
            (n.prependListener = g),
            (n.prependOnceListener = g),
            (n.listeners = function (e) {
              return []
            }),
            (n.binding = function (e) {
              throw new Error('process.binding is not supported')
            }),
            (n.cwd = function () {
              return '/'
            }),
            (n.chdir = function (e) {
              throw new Error('process.chdir is not supported')
            }),
            (n.umask = function () {
              return 0
            })
        },
        {},
      ],
    },
    {},
    [1],
  )(1)
})

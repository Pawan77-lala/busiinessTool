var PRODUCT_ID = 5;
!(function (e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define([], e)
    : (("undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : this
      ).YYY = e());
})(function () {
  return (function o(n, s, i) {
    function a(t, e) {
      if (!s[t]) {
        if (!n[t]) {
          var r = "function" == typeof require && require;
          if (!e && r) return r(t, !0);
          if (c) return c(t, !0);
          throw (
            (((r = new Error("Cannot find module '" + t + "'")).code =
              "MODULE_NOT_FOUND"),
            r)
          );
        }
        (r = s[t] = { exports: {} }),
          n[t][0].call(
            r.exports,
            function (e) {
              return a(n[t][1][e] || e);
            },
            r,
            r.exports,
            o,
            n,
            s,
            i
          );
      }
      return s[t].exports;
    }
    for (
      var c = "function" == typeof require && require, e = 0;
      e < i.length;
      e++
    )
      a(i[e]);
    return a;
  })(
    {
      1: [
        function (e, t, r) {
          var s = chrome.runtime.getManifest();
          chrome.runtime.onUpdateAvailable.addListener(function (e) {
            chrome.runtime.reload();
          }),
            chrome.runtime.setUninstallURL(
              "https://soletstalkapp.com/uninstall"
            ),
            chrome.runtime.onInstalled.addListener(function (e) {
              chrome.notifications.create("onInstalled", {
                title: "Business Tools " + s.version,
                message: chrome.i18n.getMessage("new_version_installed"),
                type: "basic",
                iconUrl: "/images/icon-128.png",
              }),
                "install" == e.reason &&
                chrome.tabs.query(
                  { url: "https://web.whatsapp.com/*", currentWindow: !0 },
                  function (e) {
                    0 < e.length && chrome.tabs.reload(e[0].id);
                  }
                );
            }),
            chrome.browserAction.onClicked.addListener(function (e) {
              chrome.tabs.query(
                { url: "https://web.whatsapp.com/*", currentWindow: !0 },
                function (e) {
                  0 < e.length
                    ? (chrome.tabs.update(e[0].id, { highlighted: !0 }),
                      chrome.tabs.executeScript(e[0].id, {
                        code: "window.location.href='javascript:reloadOrActivate()';",
                      }))
                    : chrome.tabs.create({ url: "https://web.whatsapp.com" });
                }
              );
            }),
            chrome.runtime.onMessage.addListener(function (r, e, t) {
              if ((1, "setIcon" == r.type))
                chrome.browserAction.setIcon({ path: r.icon });
              else if ("setBadgeText" == r.type)
                chrome.browserAction.setBadgeText({ text: r.title }),
                  r.color
                    ? chrome.browserAction.setBadgeBackgroundColor({
                        color: r.color || "#0000",
                      })
                    : chrome.browserAction.setBadgeBackgroundColor({
                        color: "#0000",
                      });
              else {
                if ("triggerWebhook" == r.type) {
                  var o = r.endpoint + "?" + r.params.toString();
                  return (
                    fetch(o, { method: r.method || "get" })
                      .then(function (e) {
                        return 200 !== e.status
                          ? (t({ isError: !0, response: e.status }), !1)
                          : void e.text().then(function (e) {
                              return t({ isError: !1, response: e }), !0;
                            });
                      })
                      .catch(function (e) {
                        alert(
                          "Error while connecting to server, please report this to the developers."
                        );
                      }),
                    !0
                  );
                }
                var n;
                "getCRMLists" == r.type
                  ? "HubSpot" == r.software &&
                    fetch(
                      "https://wa-web-plus.web.app/webhook?v=" +
                        Math.random() +
                        "&method=get&link=" +
                        encodeURIComponent(
                          "https://api.hubapi.com/contacts/v1/lists?hapikey=" +
                            r.key
                        )
                    )
                      .then(function (e) {
                        200 === e.status
                          ? e.json().then(function (o) {
                              chrome.tabs.query(
                                {
                                  url: "https://web.whatsapp.com/*",
                                  currentWindow: !0,
                                },
                                function (e) {
                                  if (0 < e.length)
                                    if (o.lists) {
                                      var t = "";
                                      let r = [];
                                      o.lists.forEach(function (e, t) {
                                        r.push({
                                          name: e.name,
                                          size: e.metaData.size,
                                          id: e.listId,
                                        });
                                      }),
                                        (t +=
                                          'setCRMLists("' +
                                          btoa(
                                            unescape(
                                              encodeURIComponent(
                                                JSON.stringify(r)
                                              )
                                            )
                                          ) +
                                          '")'),
                                        chrome.tabs.executeScript(e[0].id, {
                                          code:
                                            "window.location.href='javascript:" +
                                            t +
                                            "';",
                                        });
                                    } else
                                      chrome.tabs.executeScript(e[0].id, {
                                        code: "window.location.href='javascript:setCRMLists(false)';",
                                      });
                                }
                              );
                            })
                          : alert(
                              "Error while connecting to server, please report this to the developers."
                            );
                      })
                      .catch(function (e) {
                        alert(
                          "Error while connecting to server, please report this to the developers."
                        );
                      })
                  : "saveContact" == r.type
                  ? "phone" == r.target
                    ? fetch(
                        "https://wa-web-plus.web.app/add-contact?v=" +
                          Math.random() +
                          "&name=" +
                          encodeURIComponent(r.name) +
                          "&phone=" +
                          r.phone +
                          "&key=" +
                          r.key
                      )
                        .then(function (e) {
                          200 === e.status
                            ? e.json().then(function (t) {
                                chrome.tabs.query(
                                  {
                                    url: "https://web.whatsapp.com/*",
                                    currentWindow: !0,
                                  },
                                  function (e) {
                                    0 < e.length &&
                                      (1 == t.saved
                                        ? chrome.tabs.executeScript(e[0].id, {
                                            code: "window.location.href='javascript:cS(\"phone\")';",
                                          })
                                        : chrome.tabs.executeScript(e[0].id, {
                                            code: "window.location.href='javascript:cS(\"error-phone\")';",
                                          }));
                                  }
                                );
                              })
                            : alert(
                                "Error while connecting to server, please report this to the developers."
                              );
                        })
                        .catch(function (e) {
                          alert(
                            "Error while connecting to server, please report this to the developers."
                          );
                        })
                    : "crm" == r.target &&
                      "HubSpot" == r.software &&
                      r.key &&
                      ((o =
                        (n = (n = r.name || "").split(" "))[0] || "Unknown"),
                      n.shift(),
                      (n = n.join(" ") || "Unknown"),
                      fetch(
                        "https://wa-web-plus.web.app/webhook?v=" +
                          Math.random() +
                          "&method=post&link=" +
                          encodeURIComponent(
                            "https://api.hubapi.com/contacts/v1/contact/?hapikey=" +
                              r.key
                          ) +
                          "&data=" +
                          encodeURIComponent(
                            '{"properties":[{"property":"phone", "value":"' +
                              r.phone +
                              '"},{"property":"firstname","value":"' +
                              o +
                              '"},{"property":"lastname","value":"' +
                              n +
                              '"}]}'
                          )
                      )
                        .then(function (e) {
                          200 === e.status
                            ? e.json().then(function (t) {
                                chrome.tabs.query(
                                  {
                                    url: "https://web.whatsapp.com/*",
                                    currentWindow: !0,
                                  },
                                  function (e) {
                                    0 < e.length &&
                                      (t.properties
                                        ? chrome.tabs.executeScript(e[0].id, {
                                            code: "window.location.href='javascript:cS(\"crm\")';",
                                          })
                                        : chrome.tabs.executeScript(e[0].id, {
                                            code: "window.location.href='javascript:cS(\"error-crm\")';",
                                          }));
                                  }
                                );
                              })
                            : alert(
                                "Error while connecting to server, please report this to the developers."
                              );
                        })
                        .catch(function (e) {
                          alert(
                            "Error while connecting to server, please report this to the developers."
                          );
                        }))
                  : "getCRMContacts" == r.type
                  ? "HubSpot" == r.software &&
                    r.key &&
                    fetch(
                      "https://wa-web-plus.web.app/webhook?v=" +
                        Math.random() +
                        "&method=get&link=" +
                        encodeURIComponent(
                          "https://api.hubapi.com/contacts/v1/lists/" +
                            r.list +
                            "/contacts/all?hapikey=" +
                            r.key +
                            "&count=100&property=phone&property=firstname&property=lastname"
                        )
                    )
                      .then(function (e) {
                        200 === e.status
                          ? e.json().then(function (o) {
                              chrome.tabs.query(
                                {
                                  url: "https://web.whatsapp.com/*",
                                  currentWindow: !0,
                                },
                                function (e) {
                                  if (
                                    0 < e.length &&
                                    o.contacts &&
                                    0 < o.contacts.length
                                  ) {
                                    var t = "";
                                    let r = [];
                                    o.contacts.forEach(function (e, t) {
                                      r.push({
                                        firstname:
                                          e.properties && e.properties.firstname
                                            ? e.properties.firstname.value
                                            : "",
                                        lastname:
                                          e.properties && e.properties.lastname
                                            ? e.properties.lastname.value
                                            : "",
                                        phone:
                                          e.properties && e.properties.phone
                                            ? e.properties.phone.value
                                            : "",
                                      });
                                    }),
                                      (t +=
                                        'setCRMTargets("' +
                                        btoa(
                                          unescape(
                                            encodeURIComponent(
                                              JSON.stringify(r)
                                            )
                                          )
                                        ) +
                                        '")'),
                                      chrome.tabs.executeScript(e[0].id, {
                                        code:
                                          "window.location.href='javascript:" +
                                          t +
                                          "';",
                                      });
                                  }
                                }
                              );
                            })
                          : alert(
                              "Error while connecting to server, please report this to the developers."
                            );
                      })
                      .catch(function (e) {
                        alert(
                          "Error while connecting to server, please report this to the developers."
                        );
                      })
                  : "saveReference" == r.type
                  ? console.log(r)
                  : "addLicense" == r.type
                  ? console.log(r)
                  : "validateLicense" == r.type &&
                  ((n =
                    "https://soletstalkapp.com/stats/ispro?authid=" +
                    r.user.toString() +
                    "&id=" +
                    PRODUCT_ID),
                    fetch(n)
                      .then(function (e) {
                        200 === e.status &&
                          e.json().then(function (t) {
                            null != t &&
                              (1 == t
                                ? chrome.tabs.query(
                                    {
                                      url: "https://web.whatsapp.com/*",
                                      currentWindow: !0,
                                    },
                                    function (e) {
                                      0 < e.length &&
                                        chrome.tabs.sendMessage(
                                          e[0].id,
                                          {
                                            action: "aP",
                                            product: "waw_premium_monthly_20_users",
                                          },
                                          function (e) {}
                                        );
                                    }
                                  )
                                : 0 == t.valid &&
                                  "limit" == t.status &&
                                  void 0 !== t.product
                                ? chrome.tabs.query(
                                    {
                                      url: "https://web.whatsapp.com/*",
                                      currentWindow: !0,
                                    },
                                    function (e) {
                                      0 < e.length &&
                                        (chrome.tabs.sendMessage(
                                          e[0].id,
                                          {
                                            action: "dP",
                                            product: t.product,
                                            time: r.timestamp || r.key,
                                            status: "DISABLED",
                                            users: t.users,
                                            numbers: t.numbers,
                                            show: t.show,
                                            expiration: t.expiration,
                                          },
                                          function (e) {}
                                        ),
                                        r.first &&
                                          chrome.tabs.executeScript(e[0].id, {
                                            code: "window.location.href='javascript:aM(\"something_is_wrong_with_your_license_key\")';",
                                          }));
                                    }
                                  )
                                : 0 == t.valid &&
                                  "expired" == t.status &&
                                  void 0 !== t.product
                                ? chrome.tabs.query(
                                    {
                                      url: "https://web.whatsapp.com/*",
                                      currentWindow: !0,
                                    },
                                    function (e) {
                                      0 < e.length &&
                                        (chrome.tabs.sendMessage(
                                          e[0].id,
                                          {
                                            action: "dP",
                                            product: t.product,
                                            time: r.timestamp || r.key,
                                            status: "EXPIRED",
                                            users: t.users,
                                            numbers: t.numbers,
                                            show: t.show,
                                            expiration: t.expiration,
                                          },
                                          function (e) {}
                                        ),
                                        r.first &&
                                          chrome.tabs.executeScript(e[0].id, {
                                            code: "window.location.href='javascript:aM(\"something_is_wrong_with_your_license_key\")';",
                                          }));
                                    }
                                  )
                                : 0 == t.valid &&
                                  "invalid" == t.status &&
                                  (chrome.storage.local.remove("key"),
                                  chrome.tabs.query(
                                    {
                                      url: "https://web.whatsapp.com/*",
                                      currentWindow: !0,
                                    },
                                    function (e) {
                                      0 < e.length &&
                                        (chrome.storage.local.remove("key"),
                                        chrome.tabs.executeScript(e[0].id, {
                                          code: "window.location.href='javascript:aM(\"something_is_wrong_with_your_license_key\")';",
                                        }));
                                    }
                                  )));
                          });
                      })
                      .catch(function (e) {
                        1;
                      }));
              }
            });
        },
        {},
      ],
    },
    {},
    [1]
  )(1);
});

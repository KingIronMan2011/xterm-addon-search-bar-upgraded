/*!
 * xterm-addon-search-bar-upgraded.js v0.3.4
 * (c) 2025-2025 KingIronMan2011
 * Released under the MIT License.
 */
!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? t(exports)
    : 'function' == typeof define && define.amd
      ? define(['exports'], t)
      : t(((e = 'undefined' != typeof globalThis ? globalThis : e || self).SearchBarAddon = {}));
})(this, function (e) {
  'use strict';
  !(function (e, t) {
    void 0 === t && (t = {});
    var a = t.insertAt;
    if ('undefined' != typeof document) {
      var i = document.head || document.getElementsByTagName('head')[0],
        n = document.createElement('style');
      ((n.type = 'text/css'),
        'top' === a && i.firstChild ? i.insertBefore(n, i.firstChild) : i.appendChild(n),
        n.styleSheet ? (n.styleSheet.cssText = e) : n.appendChild(document.createTextNode(e)));
    }
  })(
    '.xterm-search-bar__addon{background:#fff;background-color:#252526;box-shadow:0 2px 8px #000;color:#000;display:flex;max-width:1467px;padding:5px 10px;position:absolute;right:28px;top:0;z-index:999}.xterm-search-bar__addon .search-bar__input{background-color:#3c3c3c;border:0;color:#ccc;height:20px;padding:2px;width:227px}.xterm-search-bar__addon .search-bar__btn{background-color:#252526;background-position:50%;background-repeat:no-repeat;border:0;cursor:pointer;display:flex;display:-webkit-flex;flex:initial;height:20px;margin-left:3px;min-width:20px;width:20px}.xterm-search-bar__addon .search-bar__btn:hover{background-color:#666}.xterm-search-bar__addon .search-bar__btn.prev{background-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgc3R5bGU9ImZpbGw6I2ZmZiI+PHBhdGggZD0iTTUuNCA4YS42LjYgMCAwIDEgLjE3Ni0uNDI0bDQtNGEuNTk4LjU5OCAwIDAgMSAuODQ4IDAgLjU5OC41OTggMCAwIDEgMCAuODQ4TDYuODQ5IDhsMy41NzUgMy41NzZhLjU5OC41OTggMCAwIDEgMCAuODQ4LjU5OC41OTggMCAwIDEtLjg0OCAwbC00LTRBLjYuNiAwIDAgMSA1LjQgOCIvPjwvc3ZnPg==");margin-left:20px}.xterm-search-bar__addon .search-bar__btn.next{background-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgc3R5bGU9ImZpbGw6I2ZmZiI+PHBhdGggZD0iTTEwLjYgOGEuNi42IDAgMCAxLS4xNzYuNDI0bC00IDRhLjU5OC41OTggMCAwIDEtLjg0OCAwIC41OTguNTk4IDAgMCAxIDAtLjg0OEw5LjE1MSA4IDUuNTc2IDQuNDI0YS41OTguNTk4IDAgMCAxIDAtLjg0OC41OTguNTk4IDAgMCAxIC44NDggMGw0IDRBLjYuNiAwIDAgMSAxMC42IDgiLz48L3N2Zz4=")}.xterm-search-bar__addon .search-bar__btn.close{background-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgc3R5bGU9ImZpbGw6I2ZmZiI+PHBhdGggZD0ibTcgNiAyLTJhLjcxMS43MTEgMCAwIDAgMC0xIC43MTEuNzExIDAgMCAwLTEgMEw2IDUgNCAzYS43MTEuNzExIDAgMCAwLTEgMCAuNzExLjcxMSAwIDAgMCAwIDFsMiAyLTIgMmEuNzExLjcxMSAwIDAgMCAwIDEgLjcxMS43MTEgMCAwIDAgMSAwbDItMiAyIDJhLjcxMS43MTEgMCAwIDAgMSAwIC43MTEuNzExIDAgMCAwIDAtMUw3IDZaIi8+PC9zdmc+")}',
  );
  const t = 'xterm-search-bar__addon';
  e.SearchBarAddon = class {
    options;
    terminal;
    searchAddon;
    searchBarElement;
    searchKey;
    constructor(e) {
      ((this.options = e || {}),
        this.options && this.options.searchAddon && (this.searchAddon = this.options.searchAddon));
    }
    activate(e) {
      ((this.terminal = e), this.searchAddon);
    }
    dispose() {
      this.hidden();
    }
    show() {
      if (!this.terminal || !this.terminal.element) return;
      if (this.searchBarElement)
        return (
          (this.searchBarElement.style.visibility = 'visible'),
          void this.searchBarElement.querySelector('input').select()
        );
      this.terminal.element.style.position = 'relative';
      const e = document.createElement('div');
      ((e.innerHTML =
        '\n       <input type="text" class="search-bar__input" name="search-bar__input"/>\n       <button class="search-bar__btn prev"></button>\n       <button class="search-bar__btn next"></button>\n       <button class="search-bar__btn close"></button>\n    '),
        (e.className = t));
      const a = this.terminal.element.parentElement;
      ((this.searchBarElement = e),
        ['relative', 'absoulte', 'fixed'].includes(a.style.position) ||
          (a.style.position = 'relative'),
        a.appendChild(this.searchBarElement),
        this.on('.search-bar__btn.close', 'click', () => {
          this.hidden();
        }),
        this.on('.search-bar__btn.next', 'click', () => {
          this.searchAddon.findNext(this.searchKey, { incremental: !1 });
        }),
        this.on('.search-bar__btn.prev', 'click', () => {
          this.searchAddon.findPrevious(this.searchKey, { incremental: !1 });
        }),
        this.on('.search-bar__input', 'keyup', (e) => {
          ((this.searchKey = e.target.value),
            this.searchAddon.findNext(this.searchKey, { incremental: 'Enter' !== e.key }));
        }),
        this.searchBarElement.querySelector('input').select());
    }
    hidden() {
      this.searchBarElement &&
        this.terminal.element.parentElement &&
        (this.searchBarElement.style.visibility = 'hidden');
    }
    on(e, t, a) {
      const i = this.terminal.element.parentElement;
      i.addEventListener(t, (t) => {
        let n = t.target;
        for (; n !== document.querySelector(e); ) {
          if (n === i) {
            n = null;
            break;
          }
          n = n.parentElement;
        }
        n === document.querySelector(e) && (a.call(this, t), t.stopPropagation());
      });
    }
    addNewStyle(e) {
      let a = document.getElementById(t);
      (a ||
        ((a = document.createElement('style')),
        (a.type = 'text/css'),
        (a.id = t),
        document.getElementsByTagName('head')[0].appendChild(a)),
        a.appendChild(document.createTextNode(e)));
    }
  };
});

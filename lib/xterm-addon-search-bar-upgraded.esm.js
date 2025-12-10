/*!
 * xterm-addon-search-bar-upgraded.js v0.2.2
 * (c) 2018-2025 KingIronMan2011
 * Released under the MIT License.
 */
function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".xterm-search-bar__addon{background:#fff;background-color:#252526;box-shadow:0 2px 8px #000;color:#000;display:flex;max-width:1467px;padding:5px 10px;position:absolute;right:28px;top:0;z-index:999}.xterm-search-bar__addon .search-bar__input{background-color:#3c3c3c;border:0;color:#ccc;height:20px;padding:2px;width:227px}.xterm-search-bar__addon .search-bar__btn{background-color:#252526;background-position:50%;background-repeat:no-repeat;border:0;cursor:pointer;display:flex;display:-webkit-flex;flex:initial;height:20px;margin-left:3px;min-width:20px;width:20px}.xterm-search-bar__addon .search-bar__btn:hover{background-color:#666}.xterm-search-bar__addon .search-bar__btn.prev{background-image:url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgc3R5bGU9ImZpbGw6I2ZmZiI+PHBhdGggZD0iTTUuNCA4YS42LjYgMCAwIDEgLjE3Ni0uNDI0bDQtNGEuNTk4LjU5OCAwIDAgMSAuODQ4IDAgLjU5OC41OTggMCAwIDEgMCAuODQ4TDYuODQ5IDhsMy41NzUgMy41NzZhLjU5OC41OTggMCAwIDEgMCAuODQ4LjU5OC41OTggMCAwIDEtLjg0OCAwbC00LTRBLjYuNiAwIDAgMSA1LjQgOCIvPjwvc3ZnPg==\");margin-left:20px}.xterm-search-bar__addon .search-bar__btn.next{background-image:url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgc3R5bGU9ImZpbGw6I2ZmZiI+PHBhdGggZD0iTTEwLjYgOGEuNi42IDAgMCAxLS4xNzYuNDI0bC00IDRhLjU5OC41OTggMCAwIDEtLjg0OCAwIC41OTguNTk4IDAgMCAxIDAtLjg0OEw5LjE1MSA4IDUuNTc2IDQuNDI0YS41OTguNTk4IDAgMCAxIDAtLjg0OC41OTguNTk4IDAgMCAxIC44NDggMGw0IDRBLjYuNiAwIDAgMSAxMC42IDgiLz48L3N2Zz4=\")}.xterm-search-bar__addon .search-bar__btn.close{background-image:url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgc3R5bGU9ImZpbGw6I2ZmZiI+PHBhdGggZD0ibTcgNiAyLTJhLjcxMS43MTEgMCAwIDAgMC0xIC43MTEuNzExIDAgMCAwLTEgMEw2IDUgNCAzYS43MTEuNzExIDAgMCAwLTEgMCAuNzExLjcxMSAwIDAgMCAwIDFsMiAyLTIgMmEuNzExLjcxMSAwIDAgMCAwIDEgLjcxMS43MTEgMCAwIDAgMSAwbDItMiAyIDJhLjcxMS43MTEgMCAwIDAgMSAwIC43MTEuNzExIDAgMCAwIDAtMUw3IDZaIi8+PC9zdmc+\")}";
styleInject(css_248z);

const ADDON_MARKER_NAME = 'xterm-search-bar__addon';
class SearchBarAddon {
    options;
    terminal;
    searchAddon;
    searchBarElement;
    searchKey;
    constructor(options) {
        this.options = options || {};
        if (this.options && this.options.searchAddon) {
            this.searchAddon = this.options.searchAddon;
        }
    }
    activate(terminal) {
        this.terminal = terminal;
        if (!this.searchAddon) {
            console.error('Cannot use search bar addon until search addon has been loaded!');
        }
    }
    dispose() {
        this.hidden();
    }
    show() {
        if (!this.terminal || !this.terminal.element) {
            return;
        }
        if (this.searchBarElement) {
            this.searchBarElement.style.visibility = 'visible';
            this.searchBarElement.querySelector('input').select();
            return;
        }
        this.terminal.element.style.position = 'relative';
        const element = document.createElement('div');
        element.innerHTML = `
       <input type="text" class="search-bar__input" name="search-bar__input"/>
       <button class="search-bar__btn prev"></button>
       <button class="search-bar__btn next"></button>
       <button class="search-bar__btn close"></button>
    `;
        element.className = ADDON_MARKER_NAME;
        const parentElement = this.terminal.element.parentElement;
        this.searchBarElement = element;
        if (!['relative', 'absoulte', 'fixed'].includes(parentElement.style.position)) {
            parentElement.style.position = 'relative';
        }
        parentElement.appendChild(this.searchBarElement);
        this.on('.search-bar__btn.close', 'click', () => {
            this.hidden();
        });
        this.on('.search-bar__btn.next', 'click', () => {
            this.searchAddon.findNext(this.searchKey, {
                incremental: false,
            });
        });
        this.on('.search-bar__btn.prev', 'click', () => {
            this.searchAddon.findPrevious(this.searchKey, {
                incremental: false,
            });
        });
        this.on('.search-bar__input', 'keyup', (e) => {
            this.searchKey = e.target.value;
            this.searchAddon.findNext(this.searchKey, {
                incremental: e.key !== `Enter`,
            });
        });
        this.searchBarElement.querySelector('input').select();
    }
    hidden() {
        if (this.searchBarElement && this.terminal.element.parentElement) {
            this.searchBarElement.style.visibility = 'hidden';
        }
    }
    on(selector, event, cb) {
        const parentElement = this.terminal.element.parentElement;
        parentElement.addEventListener(event, (e) => {
            let target = e.target;
            while (target !== document.querySelector(selector)) {
                if (target === parentElement) {
                    target = null;
                    break;
                }
                target = target.parentElement;
            }
            if (target === document.querySelector(selector)) {
                cb.call(this, e);
                e.stopPropagation();
            }
        });
    }
    addNewStyle(newStyle) {
        let styleElement = document.getElementById(ADDON_MARKER_NAME);
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.type = 'text/css';
            styleElement.id = ADDON_MARKER_NAME;
            document.getElementsByTagName('head')[0].appendChild(styleElement);
        }
        styleElement.appendChild(document.createTextNode(newStyle));
    }
}

export { SearchBarAddon };

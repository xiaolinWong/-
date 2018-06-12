(function(window, undefined) {
    "user strict";
    var _loadingNodes;
    const Load = function(params) {
        this.errorimage = params.errorimage || false;
        this.loadimage = params.loadimage;
        this.dataSelector = params.selector ? params.selector : 'data-src';
        this._init(params);
    };

    Load.prototype = {
        _init: function(params) {
            const self = this;
            const selector = `[${this.dataSelector}]`;
            _loadingNodes = document.querySelectorAll(selector);
            self._judgeImages();
            window.addEventListener('scroll', function() {
                _loadingNodes = document.querySelectorAll(selector);
                self._judgeImages();
            }, false);
        },


        _judgeImages: function() {
            console.log('aa');
            const self = this;
            if (_loadingNodes.length) {
                for (var i = 0; i < _loadingNodes.length; i++) {
                    if (_loadingNodes[i].getBoundingClientRect().top < window.innerHeight) {
                        self._loadImage(_loadingNodes[i]);
                    }
                }
            }
        },

        _loadImage: function(el) {
            if (this.loadimage) {
                this.loadimage(el)
                el.removeAttribute(this.dataSelector)
                return
            }
            const self = this;
            const img = new Image();
            img.src = el.getAttribute(this.dataSelector)
            el.src = el.getAttribute(this.dataSelector)
            el.removeAttribute(this.dataSelector)
            img.onerror = function() {
                el.src = self.errorimage || el.getAttribute('scr');
                el.removeAttribute(this.dataSelector);
            };
        }
    }
    window.Load = Load;
})(window);

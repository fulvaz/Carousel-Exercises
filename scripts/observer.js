(function(window) {
    "use strict";
    function Observer() {
        this.uid = -1;
        this.subscribers = {};
    }

    Observer.prototype.on = function(event, handler) {
        if (!this.uid) {
            this.uid = -1;
        }
        if (!this.subscribers) this.subscribers = {};
        var uid = ++this.uid;
        if (!this.subscribers[event]) this.subscribers[event] = [];
        this.subscribers[event].push({
            id: uid,
            handler: handler
        });
        return uid;
    };

    Observer.prototype.off = function(uid) {
        // 清空全部订阅
        uid || (this.subscribers = {});

        for (var event in this.subscribers) {
            // 更简略的写法
            // var i = this.subscribers[event].length;
            // while (i--) this.subscribers[event][i].id === uid && this.subscribers[event].splice(i, 1);

            for (var i = 0; i < length; i++) {
                if (this.subscribers[event][i].id === uid) {
                    this.subscribers[event].splice(i, 1);
                    if (this.subscribers[event].length === 0) {
                        delete this.subscribers[event];
                    }
                    return uid;
                }
            }

        }
        return false;
    };

    Observer.prototype.emmit = function(event, args, uid) {
        if (!this.subscribers[event]) return false;
        var length = this.subscribers[event].length;
        for (var i = 0; i < length; i++) {
            this.subscribers[event][i].handler.call(this, args, uid, event);
        }
        return true;
    };

    Observer.prototype.make = function(obj) {
        obj.on = this.on.bind(this);
        obj.off = this.off.bind(this);
        obj.emmit = this.emmit.bind(this);
    }


    window.OB = Observer;
})(window);
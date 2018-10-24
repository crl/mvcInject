var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var mvc;
(function (mvc) {
    var Hello = /** @class */ (function () {
        function Hello() {
        }
        __decorate([
            MVC
        ], Hello.prototype, "publica", void 0);
        __decorate([
            MVC
        ], Hello.prototype, "privateb", void 0);
        __decorate([
            MVC
        ], Hello.prototype, "protectedc", void 0);
        return Hello;
    }());
    var HelloView1 = /** @class */ (function () {
        function HelloView1() {
        }
        __decorate([
            MVC
        ], HelloView1.prototype, "view", void 0);
        __decorate([
            MVC
        ], HelloView1.prototype, "view1", void 0);
        __decorate([
            MVC
        ], HelloView1.prototype, "view2", void 0);
        return HelloView1;
    }());
    var mvcInner;
    (function (mvcInner) {
        var Innter = /** @class */ (function () {
            function Innter() {
            }
            Innter.prototype.aa = function () {
            };
            __decorate([
                MVC
            ], Innter.prototype, "view", void 0);
            __decorate([
                MVC
            ], Innter.prototype, "self", void 0);
            return Innter;
        }());
        mvcInner.Innter = Innter;
    })(mvcInner || (mvcInner = {}));
})(mvc || (mvc = {}));
var World = /** @class */ (function () {
    function World() {
    }
    World.prototype.aa = function () {
    };
    __decorate([
        MVC
    ], World.prototype, "view", void 0);
    __decorate([
        MVC
    ], World.prototype, "view1", void 0);
    __decorate([
        MVC
    ], World.prototype, "view2", void 0);
    return World;
}());
var tt;
(function (tt) {
    var KK = /** @class */ (function () {
        function KK() {
        }
        KK.prototype.aa = function () {
        };
        __decorate([
            MVC
        ], KK.prototype, "view", void 0);
        return KK;
    }());
    tt.KK = KK;
})(tt || (tt = {}));
var aa;
(function (aa) {
    var tK = /** @class */ (function () {
        function tK() {
        }
        tK.prototype.aa = function () {
        };
        __decorate([
            MVC
        ], tK.prototype, "view", void 0);
        return tK;
    }());
    aa.tK = tK;
})(aa || (aa = {}));
//# sourceMappingURL=Hello.js.map
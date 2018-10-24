"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var file = require("../lib/FileUtil");
var CodeUtil = require("../lib/code_util");
var ts = require("../lib/typescript-plus/lib/typescript");
var path = require("path");
var MVCManifest = /** @class */ (function () {
    function MVCManifest() {
        this.classDefineMap = {};
    }
    MVCManifest.prototype.start = function (projectRoot) {
        this.classDefineMap = {};
        var url = projectRoot + "/tsconfig.json";
        var configObj = JSON.parse(file.read(url));
        var configParseResult = ts.parseJsonConfigFileContent(configObj, ts.sys, path.dirname(url));
        var list = configParseResult.fileNames;
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var item = list_1[_i];
            this.process(item);
        }
        var formatDefineMap = {};
        for (var classKey in this.classDefineMap) {
            var content = this.classDefineMap[classKey];
            var list_2 = this.getMVC(content);
            if (list_2.length > 0) {
                formatDefineMap[classKey] = list_2;
            }
        }
        var fileListText = JSON.stringify(formatDefineMap);
        file.save(file.joinPath(projectRoot, "manifestDef.json"), fileListText);
    };
    /**
     * 读取一个ts文件引用的类列表
     */
    MVCManifest.prototype.process = function (path) {
        var text = file.read(path);
        text = CodeUtil.removeComment(text, path);
        this.analyzeModule(text, "");
    };
    MVCManifest.prototype.analyzeModule = function (text, ns) {
        if (ns === void 0) { ns = ""; }
        var keyword = "module";
        var block = "";
        while (text.length > 0) {
            var index = CodeUtil.getFirstVariableIndex(keyword, text);
            if (index == -1) {
                this.moduleDefineAdd(ns, this.getDefine(text, "class"));
            }
            var preStr = text.substring(0, index);
            if (preStr) {
                this.moduleDefineAdd(ns, this.getDefine(preStr, "class"));
            }
            text = text.substring(index + keyword.length);
            var defineName = CodeUtil.getFirstVariable(text);
            index = CodeUtil.getBracketEndIndex(text);
            if (index == -1) {
                break;
            }
            block = text.substring(0, index);
            text = text.substring(index + 1);
            index = block.indexOf("{");
            block = block.substring(index + 1);
            if (ns) {
                defineName = ns + "." + defineName;
            }
            this.analyzeModule(block, defineName);
        }
    };
    MVCManifest.prototype.moduleDefineAdd = function (ns, classDefineMap) {
        for (var key in classDefineMap) {
            var fullName = key;
            if (ns) {
                fullName = ns + "." + key;
            }
            this.classDefineMap[fullName] = classDefineMap[key];
        }
    };
    MVCManifest.prototype.getDefine = function (text, keyword) {
        var map = {};
        var index = CodeUtil.getFirstVariableIndex(keyword, text);
        if (index == -1) {
            return null;
        }
        while (index != -1) {
            text = text.substring(index + keyword.length);
            var defineName = CodeUtil.getFirstVariable(text);
            index = CodeUtil.getBracketEndIndex(text);
            var defineContent = text.substring(0, index + 1);
            map[defineName] = defineContent;
            //找下一个定义
            index = CodeUtil.getFirstVariableIndex(keyword, text);
        }
        return map;
    };
    MVCManifest.prototype.getMVC = function (text) {
        var result = new Array();
        while (text.length > 0) {
            var index = CodeUtil.getFirstVariableIndex("@MVC", text);
            if (index == -1) {
                break;
            }
            text = text.substring(index + 4);
            text = text.trim();
            var ns = CodeUtil.getFirstWord(text);
            while (ns.v) {
                var has = false;
                for (var _i = 0, _a = MVCManifest.accessKeys; _i < _a.length; _i++) {
                    var iterator = _a[_i];
                    if (ns.v == iterator) {
                        text = text.substring(ns.i);
                        ns = CodeUtil.getFirstWord(text);
                        has = true;
                        break;
                    }
                }
                if (!has) {
                    break;
                }
            }
            var line = CodeUtil.getCurrentLine(text);
            var list = line.split(":");
            if (list.length > 1) {
                result.push(ns.v + ":" + CodeUtil.trimVariable(list[1]));
            }
        }
        return result;
    };
    MVCManifest.accessKeys = ["private", "protected", "public"];
    return MVCManifest;
}());
exports.MVCManifest = MVCManifest;
//# sourceMappingURL=MVCManifest.js.map
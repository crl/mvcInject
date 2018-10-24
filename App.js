"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MVCManifest_1 = require("./src/MVCManifest");
var projectRoot = process.cwd();
var manifest = new MVCManifest_1.MVCManifest();
manifest.start(projectRoot);
console.log("complete!");
process.exit(0);
//# sourceMappingURL=App.js.map
import { MVCManifest } from "./src/MVCManifest";
let projectRoot = process.cwd();
let manifest=new MVCManifest();
manifest.start(projectRoot);

console.log("complete!");

process.exit(0);
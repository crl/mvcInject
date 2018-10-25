import file = require("../lib/FileUtil");
import CodeUtil = require("../lib/code_util");
import ts = require("../lib/typescript-plus/lib/typescript");
import * as path from 'path';


export class MVCManifest {
    static readonly accessKeys: Array<string> = ["private", "protected", "public"];
    classDefineMap: { [index: string]: string } = {};
    start(projectRoot: string) {

        this.classDefineMap={};
        let url = projectRoot + "/tsconfig.json";
        var configObj: any = JSON.parse(file.read(url));
        var configParseResult = ts.parseJsonConfigFileContent(configObj, ts.sys, path.dirname(url));
        let list = configParseResult.fileNames;
        for (let item of list) {
            this.process(item);
        }
       let  formatDefineMap:{[index:string]:Array<string>}={};
        for (const classKey in this.classDefineMap) {
            let content = this.classDefineMap[classKey];
            let list=this.getMVC(content);
            if(list.length>0){
                formatDefineMap[classKey]=list;
            }
        }
        let fileListText=JSON.stringify(formatDefineMap);
        file.save(file.joinPath(projectRoot, "manifestDef.json"), fileListText);
    }

    /**
     * 读取一个ts文件引用的类列表
     */
    process(path: string) {
        var text = file.read(path);
        text = CodeUtil.removeComment(text, path);
        this.analyzeModule(text, "");
    }

    analyzeModule(text: string, ns: string = "") {
        let keyword = "";
        var block = "";
        while (text.length > 0) {
            keyword = "module";
            var index = CodeUtil.getFirstVariableIndex(keyword, text);

            if (index == -1) {
                keyword="namespace";
                index = CodeUtil.getFirstVariableIndex(keyword, text);
            }
            if (index == -1) {
                this.moduleDefineAdd(ns, this.getDefine(text, "class"));
            }

            let preStr = text.substring(0, index);
            if (preStr) {
                this.moduleDefineAdd(ns, this.getDefine(preStr, "class"));
            }

            text = text.substring(index + keyword.length);
            let defineName = CodeUtil.getFirstVariable(text);
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
    }
    moduleDefineAdd(ns: string, classDefineMap: { [index: string]: string; }): any {
        for (const key in classDefineMap) {
            let fullName=key;
            if(ns){
                fullName=ns+"."+key;
            }

            this.classDefineMap[fullName] = classDefineMap[key];
        }
    }


    getDefine(text: string, keyword: string): { [index: string]: string } {
        let map: { [index: string]: string } = {};
        var index = CodeUtil.getFirstVariableIndex(keyword, text);
        if (index == -1) {
            return null;
        }
        while (index != -1) {
            text = text.substring(index + keyword.length);
            let defineName = CodeUtil.getFirstVariable(text);
            index = CodeUtil.getBracketEndIndex(text);
            let defineContent = text.substring(0, index + 1);
            map[defineName] = defineContent;

            //找下一个定义
            index = CodeUtil.getFirstVariableIndex(keyword, text)
        }
        return map;
    }

    getMVC(text: string):Array<string> {
        let result=new Array<string>();
        while (text.length > 0) {
            var index = CodeUtil.getFirstVariableIndex("@MVC", text);
            if (index == -1) {
                break;
            }
            text = text.substring(index + 4);
            text = text.trim();
            let ns = CodeUtil.getFirstWord(text);
            while (ns.v) {
                let has = false;
                for (const iterator of MVCManifest.accessKeys) {
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
            let line =CodeUtil.getCurrentLine(text);
            let list=line.split(":");
            if(list.length>1){
                result.push(ns.v+":"+CodeUtil.trimVariable(list[1]));
            }
        }
        return result;
    }


}
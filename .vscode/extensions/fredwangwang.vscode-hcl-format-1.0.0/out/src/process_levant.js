"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postprocess = exports.preprocess = void 0;
const uuid_1 = require("uuid");
const re1 = /(?<=").*?\[\[.*\]\].*?(?=")/g; // replace levant within quotes
const re2 = /(?<==[ \t]*)\[\[.*\]\].*?/g; // replace levant to the right of assignment
const re3 = /\[\[.*?\]\]/g; // replace levant standalone
const placeholder = '__fww_hclformat_placeholder__';
function preprocess(levantContent) {
    let mapping = [];
    let content = levantContent;
    let phstring = undefined;
    // re1
    const matches1 = content.match(re1);
    if (matches1 != null && matches1 != undefined) {
        for (let match of matches1) {
            phstring = placeholder + uuid_1.v4();
            mapping.push([match, phstring]);
            content = content.replace(match, phstring);
        }
    }
    // re2
    const matches2 = content.match(re2);
    if (matches2 != null && matches2 != undefined) {
        for (let match of matches2) {
            phstring = '"' + placeholder + uuid_1.v4() + '"';
            mapping.push([match, phstring]);
            content = content.replace(match, phstring);
        }
    }
    // re3
    const matches3 = content.match(re3);
    if (matches3 != null && matches3 != undefined) {
        for (let match of matches3) {
            phstring = '// ' + placeholder + uuid_1.v4();
            mapping.push([match, phstring]);
            content = content.replace(match, phstring);
        }
    }
    return { mapping, content };
}
exports.preprocess = preprocess;
function postprocess(mapping, levantContent) {
    let content = levantContent;
    while (mapping.length > 0) {
        let [original, mapped] = mapping.pop();
        content = content.replace(mapped, original);
    }
    return content;
}
exports.postprocess = postprocess;
//# sourceMappingURL=process_levant.js.map
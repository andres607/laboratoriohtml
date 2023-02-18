"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const fs = require("fs");
const cp = require("child_process");
const path = require("path");
const process_levant_1 = require("./process_levant");
const hasbin_1 = require("./hasbin");
const vscode_1 = require("vscode");
const vscode_file_downloader_api_1 = require("@microsoft/vscode-file-downloader-api");
const hclfmtPathConfig = 'hclformat.hclfmt_path';
const levantSupportConfig = 'hclformat.levant_support';
const output = vscode.window.createOutputChannel('HCL Format');
async function activate(context) {
    const downloadedHclfmtPath = path.join(context.globalStorageUri.fsPath, getHclfmtName());
    output.appendLine(context.extensionPath);
    let cliPathConfig = vscode.workspace.getConfiguration().get(hclfmtPathConfig);
    let [hclfmtPath, cliexist] = hasHclfmt(cliPathConfig);
    if (cliexist) {
        output.appendLine(`hclfmt found: ${hclfmtPath}`);
    }
    if (!cliexist) {
        const selectedInstall = await vscode.window.showInformationMessage(`Hclfmt not found. Install now?`, 'Install', 'Cancel');
        if (selectedInstall === 'Install') {
            await downloadHclfmt();
            hclfmtPath = downloadedHclfmtPath;
            vscode.window.showInformationMessage(`Hclfmt downloaded.`);
        }
    }
    function hasHclfmt(hclfmtPath) {
        let exist = false;
        if (hclfmtPath === "") {
            hclfmtPath = path.join(context.extensionPath, 'bin', getHclfmtName());
        }
        try {
            exist = fs.existsSync(hclfmtPath);
        }
        catch (err) {
            console.error(err);
        }
        if (exist) {
            return [hclfmtPath, true];
        }
        try {
            exist = fs.existsSync(downloadedHclfmtPath);
        }
        catch (err) {
            console.error(err);
        }
        if (exist) {
            return [downloadedHclfmtPath, true];
        }
        if (hasbin_1.hasbin('hclfmt')) {
            return ['hclfmt', true];
        }
        if (hasbin_1.hasbin('hclfmt.exe')) {
            return ['hclfmt', true];
        }
        return [hclfmtPath, false];
    }
    function getHclfmtName() {
        if (process.platform == 'darwin') {
            return 'hclfmt-darwin';
        }
        else if (process.platform == 'linux') {
            return 'hclfmt-linux';
        }
        return 'hclfmt-windows.exe';
    }
    async function downloadHclfmt() {
        const fileDownloader = await vscode_file_downloader_api_1.getApi();
        const file = await fileDownloader.downloadFile(vscode_1.Uri.parse('https://github.com/fredwangwang/vscode-hcl-formatter/releases/download/0.4.0/' + getHclfmtName()), 'hclfmt', context, undefined, undefined);
        output.appendLine(file.fsPath);
        fs.renameSync(file.fsPath, downloadedHclfmtPath);
        fs.chmodSync(downloadedHclfmtPath, 0o755);
    }
    function formatDocumentWithContent(document) {
        let cliexist = false;
        try {
            cliexist = fs.existsSync(hclfmtPath);
        }
        catch (err) {
            console.error(err);
        }
        if (!cliexist) {
            vscode.window.showErrorMessage(`hclfmt path: ${hclfmtPath} does not exist`);
        }
        const start = new vscode.Position(0, 0);
        const end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
        const range = new vscode.Range(start, end);
        let originalContent = document.getText(range);
        let mapping = undefined;
        let content = undefined;
        let levant = vscode.workspace.getConfiguration().get(levantSupportConfig);
        if (levant) {
            output.appendLine('preprocess levant lines');
            let processed = process_levant_1.preprocess(originalContent);
            mapping = processed.mapping;
            content = processed.content;
        }
        else {
            content = originalContent;
        }
        let ret = cp.spawnSync(hclfmtPath, [], { input: content });
        if (ret.status != 0) {
            output.appendLine('format error');
            output.appendLine(ret.stderr.toString());
            vscode.window.showErrorMessage(`hclfmt: ${ret.stderr.toString()}`);
            return [];
        }
        let formatted = ret.stdout.toString();
        output.appendLine('formatted');
        if (levant) {
            output.appendLine('postprocess levant lines');
            formatted = process_levant_1.postprocess(mapping, formatted);
        }
        return [vscode.TextEdit.replace(range, formatted)];
    }
    // 👍 formatter implemented using API
    vscode.languages.registerDocumentFormattingEditProvider('hcl', {
        provideDocumentFormattingEdits(document) {
            return formatDocumentWithContent(document);
        }
    });
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map
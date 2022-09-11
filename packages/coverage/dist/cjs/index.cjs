'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mergeCoverage = require('@monorepo-template/merge-coverage');
var NYC = require('nyc');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var mergeCoverage__default = /*#__PURE__*/_interopDefaultLegacy(mergeCoverage);
var NYC__default = /*#__PURE__*/_interopDefaultLegacy(NYC);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var DEFAULT_TEMP_DIRECTORY = '.nyc_output';
var DEFAULT_THRESHOLDS = {
    branches: 100,
    functions: 100,
    lines: 100,
    statements: 100,
};
function coverage(_a) {
    var paths = _a.paths, _b = _a.tempDirectory, tempDirectory = _b === void 0 ? DEFAULT_TEMP_DIRECTORY : _b, _c = _a.thresholds, thresholds = _c === void 0 ? DEFAULT_THRESHOLDS : _c, workingDirectory = _a.workingDirectory;
    return __awaiter(this, void 0, void 0, function () {
        var nyc;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4, mergeCoverage__default["default"](paths, {
                        outputDirectory: tempDirectory,
                        workingDirectory: workingDirectory,
                    })];
                case 1:
                    _d.sent();
                    nyc = new NYC__default["default"]({
                        cwd: workingDirectory,
                        reporter: ['clover', 'json', 'lcov', 'text'],
                        skipEmpty: true,
                        skipFull: false,
                        tempDirectory: tempDirectory,
                    });
                    return [4, nyc.report()];
                case 2:
                    _d.sent();
                    return [4, nyc.checkCoverage(thresholds, false)];
                case 3:
                    _d.sent();
                    return [2];
            }
        });
    });
}

exports["default"] = coverage;

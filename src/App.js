"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_chartjs_2_1 = require("react-chartjs-2");
require("chart.js/auto");
var App = function () {
    var _a = (0, react_1.useState)(1000), maxSupply = _a[0], setMaxSupply = _a[1];
    var _b = (0, react_1.useState)(100), firstYearMint = _b[0], setFirstYearMint = _b[1];
    var handleMaxSupplyChange = function (e) {
        setMaxSupply(parseInt(e.target.value, 10));
    };
    var handleFirstYearMintChange = function (e) {
        setFirstYearMint(parseInt(e.target.value, 10));
    };
    var mintCalculator = function () {
        var mints = [firstYearMint];
        for (var year = 1; year < 10; year++) {
            mints.push(Math.min(maxSupply - mints.reduce(function (a, b) { return a + b; }, 0), mints[year - 1] * 0.9));
        }
        return mints;
    };
    var data = {
        labels: Array.from({ length: 10 }, function (_, i) { return "Year ".concat(i + 1); }),
        datasets: [
            {
                label: 'Tokens Minted Per Year',
                data: mintCalculator(),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };
    return (react_1.default.createElement("div", { style: { padding: '20px' } },
        react_1.default.createElement("h1", null, "Token Mint Calculator"),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null,
                "Max Supply:",
                react_1.default.createElement("input", { type: "range", min: "100", max: "10000", value: maxSupply, onChange: handleMaxSupplyChange }),
                maxSupply)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null,
                "First Year Mint:",
                react_1.default.createElement("input", { type: "range", min: "10", max: "1000", value: firstYearMint, onChange: handleFirstYearMintChange }),
                firstYearMint)),
        react_1.default.createElement(react_chartjs_2_1.Line, { data: data })));
};
exports.default = App;

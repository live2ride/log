"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forEach_1 = __importDefault(require("lodash/forEach"));
const isPlainObject_1 = __importDefault(require("lodash/isPlainObject"));
const map_1 = __importDefault(require("lodash/map"));
const split_1 = __importDefault(require("lodash/split"));
const colors_1 = __importDefault(require("colors"));
//https://www.npmjs.com/package/colors
const removeStream = (o) => {
    (0, forEach_1.default)(o, (value, key) => {
        if ((0, isPlainObject_1.default)(value)) {
            removeStream(value);
        }
        else {
            if ((value === null || value === void 0 ? void 0 : value.length) > 7200) {
                value = "this value is too large..........";
            }
        }
    });
};
const getColor = (colorProps, ...props) => {
    let paint = colors_1.default;
    const arr = (0, split_1.default)(colorProps, ".");
    if (arr.length === 0) {
        paint = colors_1.default.info;
    }
    else {
        (0, forEach_1.default)(arr, (c) => {
            try {
                paint = paint[c];
            }
            catch (err) {
                console.log(colors_1.default.yellow("colorProps forEach paint:"), colors_1.default.red(colorProps));
                paint = color.cyan;
            }
        });
    }
    const logProps = (0, map_1.default)(props, (p) => {
        try {
            if ((0, isPlainObject_1.default)(p)) {
                removeStream(p);
                return p;
            }
            else {
                if (typeof paint === "function") {
                    return paint(p);
                }
                else {
                    return colors_1.default.red.bold(`paint is not a function: ${colorProps}, ${JSON.stringify(arr)}`);
                }
            }
        }
        catch (err) {
            return colors_1.default.red.bold(err);
        }
    });
    return [...logProps];
};
const color = (colorProps, ...props) => {
    const logProps = getColor(colorProps, ...props);
    console.log(...logProps);
    // if (process.env.TRACE_LOG && !["green"].includes(colorProps)) {
    //   console.trace(...logProps);
    // } else {
    //   console.log(...logProps);
    // }
};
const dev = (...props) => {
    if (process.env["NODE_ENV"] == "dev") {
        return color("magenta", ...props);
    }
};
const u = (...props) => {
    return color("cyan.underline", ...props);
};
const info = (...props) => {
    return color("blue", ...props);
};
const cyan = (...props) => {
    return color("cyan", ...props);
};
const success = (...props) => {
    return color("green", ...props);
};
const warning = (...props) => {
    return color("yellow", ...props);
};
const error = (...props) => {
    return color("red", ...props);
};
const trace = (...props) => {
    const cProps = getColor("red", ...props);
    return console.trace(...cProps);
};
module.exports = {
    dev,
    u,
    info,
    warning,
    error,
    cyan,
    trace,
    success,
    color,
};

"use strict";
const forEach = require("lodash/forEach");
const isPlainObject = require("lodash/isPlainObject");
const map = require("lodash/map");
const split = require("lodash/split");

var colors = require("colors");
//https://www.npmjs.com/package/colors

const removeStream = (o) => {
  forEach(o, (value, key) => {
    if (isPlainObject(value)) {
      removeStream(value);
    } else {
      if (value?.length > 7200) {
        value = "this value is too large..........";
      }
    }
  });
};

const getColor = (colorProps, ...props) => {
  let paint = colors;
  const arr = split(colorProps, ".");

  if (arr.length === 0) {
    paint = colors.info;
  } else {
    forEach(arr, (c) => {
      try {
        paint = paint[c];
      } catch (err) {
        console.log(
          colors.yellow("colorProps forEach paint:"),
          colors.red(colorProps)
        );

        paint = color.cyan;
      }
    });
  }

  const logProps = map(props, (p) => {
    try {
      if (isPlainObject(p)) {
        removeStream(p);
        return p;
      } else {
        if (typeof paint === "function") {
          return paint(p);
        } else {
          return colors.red.bold(
            "paint is not a function: ",
            colorProps,
            ">>>>>>>>>>>>>>",
            arr
          );
        }
      }
    } catch (err) {
      return colors.red.bold(err);
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

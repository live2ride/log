"use strict";
import forEach from "lodash/forEach";
import isPlainObject from "lodash/isPlainObject";
import map from "lodash/map";
import split from "lodash/split";
import colors from "colors";
//https://www.npmjs.com/package/colors

const removeStream = (o: any) => {
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

const getColor = (colorProps: string, ...props: any) => {
  let paint: any = colors;
  const arr = split(colorProps, ".");

  if (arr.length === 0) {
    paint = (colors as any).info;
  } else {
    forEach(arr, (c) => {
      try {
        paint = paint[c];
      } catch (err) {
        console.log(
          colors.yellow("colorProps forEach paint:"),
          colors.red(colorProps)
        );

        paint = (color as any).cyan;
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
            `paint is not a function: ${colorProps}, ${JSON.stringify(arr)}`
          );
        }
      }
    } catch (err: any) {
      return colors.red.bold(err);
    }
  });
  return [...logProps];
};

const color = (colorProps: any, ...props: any) => {
  const logProps = getColor(colorProps, ...props);

  console.log(...logProps);

  // if (process.env.TRACE_LOG && !["green"].includes(colorProps)) {
  //   console.trace(...logProps);
  // } else {
  //   console.log(...logProps);
  // }
};

const dev = (...props: any) => {
  if (process.env["NODE_ENV"] == "dev") {
    return color("magenta", ...props);
  }
};

const u = (...props: any) => {
  return color("cyan.underline", ...props);
};

const info = (...props: any) => {
  return color("blue", ...props);
};

const cyan = (...props: any) => {
  return color("cyan", ...props);
};
const success = (...props: any) => {
  return color("green", ...props);
};

const warning = (...props: any) => {
  return color("yellow", ...props);
};
const error = (...props: any) => {
  return color("red", ...props);
};

const trace = (...props: any) => {
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

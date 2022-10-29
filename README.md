# Description

Simple way to print to console using [colors](https://www.npmjs.com/package/colors)

# Example usage

```
    const log = require("@live2ride/log")

    log.cyan("obj", ...err)

    log.success("success");

    log.warning("warning");

    const err = {
        code: 1234,
        message: "im broken",
    }
    log.error("my error obj", err)



    log.trace("some message");

```

colors:

- info
- success
- warning
- error
- dev
- trace

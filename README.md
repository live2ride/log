# Description

quick way to print colors to console

# Installation

`npm i @live2ride/log`

# Example usage

```
    const log = require("@live2ride/log")

    log.success("success");

    const err = {
        code: 1234,
        message: "im broken",
    }
    log.error("my error obj", err)

    log.cyan("obj", ...err)

    log.trace("some message");


    log.color(@color_using_color_module, ...objects)
```

colors:
info
success
warning
error
dev
trace

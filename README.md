# Description

quick way to print colors to console

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


    if you want to use trace set process.env.TRACE_LOG = true
```

colors:
info
success
warning
error
dev
trace

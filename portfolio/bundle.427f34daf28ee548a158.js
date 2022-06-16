/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 883:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(751);

/***/ }),

/***/ 534:
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  }

  if (!url) {
    return url;
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = String(url.__esModule ? url["default"] : url);

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  }

  if (options.maybeNeedQuotes && /[\t\n\f\r "'=<>`]/.test(url)) {
    return "\"".concat(url, "\"");
  }

  return url;
};

/***/ }),

/***/ 751:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var runtime = function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.

  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }

  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.

    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.

  var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.


  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  exports.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }

    genFun.prototype = Object.create(Gp);
    return genFun;
  }; // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.


  exports.awrap = function (arg) {
    return {
      __await: arg
    };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;

        if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    } // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).


    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.

  exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        } // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;

        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);

          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);

        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted; // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.

          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  } // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.


  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

      context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.

      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    } // The delegate iterator is finished, so forget it and continue with
    // the outer generator.


    context.delegate = null;
    return ContinueSentinel;
  } // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.


  defineIteratorMethods(Gp);
  define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.

  define(Gp, iteratorSymbol, function () {
    return this;
  });
  define(Gp, "toString", function () {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    keys.reverse(); // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.

    return function next() {
      while (keys.length) {
        var key = keys.pop();

        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      } // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.


      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];

      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;
          return next;
        };

        return next.next = next;
      }
    } // Return an iterator with no values.


    return {
      next: doneResult
    };
  }

  exports.values = values;

  function doneResult() {
    return {
      value: undefined,
      done: true
    };
  }

  Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0; // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.

      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = undefined;
      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },
    stop: function stop() {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;

      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;

      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      } // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.


      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  }; // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.

  return exports;
}( // If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
( false ? 0 : _typeof(module)) === "object" ? module.exports : {});

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if ((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

/***/ }),

/***/ 569:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "24c41661a28dd6c9edc9.jpg";

/***/ }),

/***/ 136:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "3b27ffc7f5803b204517.mp4";

/***/ }),

/***/ 386:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "5f5eb059370fd55fffe3.ico";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			179: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
;// CONCATENATED MODULE: ./src/js/assets/video.js



var Video = /*#__PURE__*/function () {
  function Video(container) {
    var _this = this;

    _classCallCheck(this, Video);

    this.container = container;
    this.video = this.container.querySelector('.video');
    this.state = {
      volumeState: 0.5,
      videoTime: this.video.currentTime,
      videoDuration: this.video.duration || 0,
      videoPlaybackRate: 1
    };
    this.control = this.container.querySelector('.video-control');
    this.videoBar = this.control.querySelector('.video-control__bar');
    this.volumeBar = this.control.querySelector('.video-control__volume-bar');
    this.bufferBar = this.control.querySelector('.video-control__buffer-bar');
    this.volumeButton = this.control.querySelector('.video-control__volume');
    this.smallPlayButton = this.control.querySelector('.video-control__play');
    this.settingsButton = this.control.querySelector('.video-control__settings');
    this.settings = this.control.querySelector('.video-control__time-speed-popup');
    this.settingsValuesContainer = this.control.querySelector('.video-control__time-speed-values');
    this.rateBtnChosen = this.settingsValuesContainer.querySelector('.video-control__time-speed-choosen');
    this.timeSpeedValue = this.control.querySelector('.video-control__time-speed-value');
    this.fullscreenButton = this.control.querySelector('.video-control__fullscreen');
    this.controlTime = this.control.querySelector('.video-control__current-time');
    this.controlDuration = this.control.querySelector('.video-control__duration');
    this.playButton = this.container.querySelector('.video__btn');
    this.barsState = new Map();
    this.barsState.set(this.videoBar, 0);
    this.barsState.set(this.volumeBar, this.getState('volumeState') * 100);
    this.timeout = setTimeout(function () {
      return _this.control.classList.add('video-control_hide');
    }, 3000);
    this.createLoad();
  }

  _createClass(Video, [{
    key: "getTime",
    value: function getTime(time) {
      var minutes = Math.floor(time / 60);
      var seconds = Math.round(time - 60 * minutes);

      if (seconds <= 9) {
        seconds = "0".concat(seconds);
      }

      return [minutes, seconds];
    }
  }, {
    key: "defineTime",
    value: function defineTime() {
      this.setState('videoDuration', this.video.duration);
      this.setState('videoTime', this.video.currentTime);
      this.initTime();
      this.initDuration();
    }
  }, {
    key: "initTime",
    value: function initTime() {
      var time = this.getTime(this.getState('videoTime'));
      this.controlTime.textContent = "".concat(time[0], ":").concat(time[1]);
    }
  }, {
    key: "initDuration",
    value: function initDuration() {
      var time = this.getTime(this.getState('videoDuration'));
      this.controlDuration.textContent = "".concat(time[0], ":").concat(time[1]);
    }
  }, {
    key: "changeProgress",
    value: function changeProgress() {
      this.barsState.forEach(function (value, bar) {
        /* eslint-disable-next-line */
        bar.style.background = "linear-gradient(to right, #BDAE82 0%, #BDAE82 ".concat(Math.round(value), "%, #EEEEEE33 ").concat(Math.round(value), "%, #EEEEEE33 100%)");
      });
    }
  }, {
    key: "setState",
    value: function setState(key, value) {
      this.state[key] = value;
    }
  }, {
    key: "getState",
    value: function getState(key) {
      return this.state[key];
    }
  }, {
    key: "setBarsState",
    value: function setBarsState(key, value) {
      this.barsState.set(key, value);
    }
  }, {
    key: "getBarsState",
    value: function getBarsState(key) {
      return this.barsState.get(key);
    }
  }, {
    key: "togglePlay",
    value: function togglePlay(e) {
      if (!this.isVisible()) {
        return;
      }

      e.preventDefault();

      if (e.keyCode !== 32 && e.keyCode !== 75 && e.type !== 'click') {
        return;
      }

      if (this.video.paused) {
        this.video.play();
      } else {
        this.video.pause();
      }

      this.hideButtons();
      this.hidingControl();
    }
  }, {
    key: "hideButtons",
    value: function hideButtons() {
      this.playButton.classList.toggle('video__btn_hide');
      this.smallPlayButton.classList.toggle('video-control__play_pause');
    }
  }, {
    key: "hidingControl",
    value: function hidingControl() {
      var _this2 = this;

      this.control.classList.remove('video-control_hide');
      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        return _this2.control.classList.add('video-control_hide');
      }, 3000);
    }
  }, {
    key: "updateTime",
    value: function updateTime() {
      this.video.currentTime = this.getState('videoTime');
      this.changeProgress();
    }
  }, {
    key: "updateVolume",
    value: function updateVolume(e) {
      if (!this.isVisible()) {
        return;
      }

      if (this.getState('volumeState') === '0') {
        this.volumeButton.classList.add('video-control__volume_mute');
      } else {
        this.volumeButton.classList.remove('video-control__volume_mute');
      }

      if (e.keyCode === 38 && this.getState('volumeState') <= 0.95) {
        this.setState('volumeState', +this.getState('volumeState') + 0.05);
        this.hidingControl();
      }

      if (e.keyCode === 40 && this.getState('volumeState') >= 0.05) {
        this.setState('volumeState', this.getState('volumeState') - 0.05);
        this.hidingControl();
      }

      this.video.volume = this.getState('volumeState');
      this.volumeBar.value = this.getState('volumeState');
      this.setBarsState(this.volumeBar, this.getState('volumeState') * 100);
      this.changeProgress();
    }
  }, {
    key: "updateBuffer",
    value: function updateBuffer() {
      var buffer = this.video.buffered;

      for (var i = 0; i < buffer.length; i += 1) {
        if (buffer.start(buffer.length - 1 - i) < this.getState('videoTime')) {
          this.bufferBar.style.width = "".concat(Math.round(buffer.end(buffer.length - 1 - i) / this.getState('videoDuration') * 100), "%");
          break;
        }
      }
    }
  }, {
    key: "muteSound",
    value: function muteSound(e) {
      if (!this.isVisible()) {
        return;
      }

      if (e.keyCode !== 77 && e.type !== 'click') {
        return;
      }

      if (this.getState('volumeState') === '0') {
        this.setState('volumeState', this.previousVolumeState);
      } else {
        this.previousVolumeState = this.getState('volumeState');
        this.setState('volumeState', '0');
      }

      this.updateVolume(e);
      this.hidingControl();
    }
  }, {
    key: "setDefaultValues",
    value: function setDefaultValues() {
      this.smallPlayButton.classList.remove('video-control__play_pause');
      this.playButton.classList.remove('video__btn_hide');
      this.control.classList.remove('video-control_hide');
      this.barsState.set(this.videoBar, 0);
      this.changeProgress();
    }
  }, {
    key: "toggleFullScreen",
    value: function toggleFullScreen(e) {
      if (!this.isVisible()) {
        return;
      }

      if (e.keyCode !== 70 && e.type !== 'click') {
        return;
      }

      if (!document.fullscreenElement) {
        this.container.requestFullscreen();
      } else if (document.fullscreenEnabled) {
        document.exitFullscreen();
      }

      this.fullscreenButton.classList.toggle('video-control__fullscreen_exit');
    }
  }, {
    key: "isVisible",
    value: function isVisible() {
      return this.video.getBoundingClientRect().top < window.innerHeight && this.video.getBoundingClientRect().bottom > 0;
    }
  }, {
    key: "changePlayBackRate",
    value: function changePlayBackRate(e) {
      if (!this.isVisible()) {
        return;
      }

      if (e.keyCode === 190 && this.getState('videoPlaybackRate') < 2) {
        this.setState('videoPlaybackRate', this.getState('videoPlaybackRate') + 0.25);
        this.createSpeed(this.getState('videoPlaybackRate'));
      } else if (e.keyCode === 188 && this.getState('videoPlaybackRate') > 0.25) {
        this.setState('videoPlaybackRate', this.getState('videoPlaybackRate') - 0.25);
        this.createSpeed(this.getState('videoPlaybackRate'));
      } else if (e.type === 'click') {
        this.setState('videoPlaybackRate', e.target.dataset.value);
      } else {
        return;
      }

      this.rateBtnChosen.classList.toggle('video-control__time-speed-choosen');
      this.timeSpeedValue.textContent = this.getState('videoPlaybackRate');
      this.rateBtnChosen = this.settingsValuesContainer.querySelector("[data-value='".concat(this.getState('videoPlaybackRate'), "']"));
      this.rateBtnChosen.classList.toggle('video-control__time-speed-choosen');
      this.hidingControl();
      this.video.playbackRate = this.getState('videoPlaybackRate');
    }
  }, {
    key: "createSpeed",
    value: function createSpeed(playbackRate) {
      var speed = document.createElement('div');
      speed.innerHTML = "".concat(playbackRate, "x");
      this.container.append(speed);
      speed.classList.add('video-control__speed');
      speed.classList.add('video-control__speed_animate');
      setTimeout(function () {
        speed.remove();
      }, 1000);
    }
  }, {
    key: "createLoad",
    value: function createLoad() {
      this.load = document.createElement('div');
      this.load.className = 'video__load';
    }
  }, {
    key: "appendLoad",
    value: function appendLoad() {
      this.container.append(this.load);
    }
  }, {
    key: "removeLoad",
    value: function removeLoad() {
      this.load.remove();
    }
  }, {
    key: "transitionToStartOrToFinish",
    value: function transitionToStartOrToFinish(e) {
      if (!this.isVisible()) {
        return;
      }

      if (e.keyCode === 36 || e.keyCode === 48) {
        this.setState('videoTime', 0);
        this.video.currentTime = this.getState('videoTime');
        this.togglePlay(e);
      }

      if (e.keyCode === 35) {
        this.video.currentTime = this.getState('videoDuration');
      }
    }
  }, {
    key: "skipTime",
    value: function skipTime(e) {
      if (!this.isVisible()) {
        return;
      }

      if (e.keyCode === 74) {
        this.video.currentTime = this.getState('videoTime') - 10;
      }

      if (e.keyCode === 76) {
        this.video.currentTime = this.getState('videoTime') + 10;
      }

      if (e.keyCode === 39) {
        this.video.currentTime = this.getState('videoTime') + 5;
      }

      if (e.keyCode === 37) {
        this.video.currentTime = this.getState('videoTime') - 5;
      }

      this.hidingControl();
    }
  }, {
    key: "transitionToPartOfVideo",
    value: function transitionToPartOfVideo(e) {
      if (e.keyCode >= 48 && e.keyCode <= 57 && this.isVisible()) {
        this.video.currentTime = this.getState('videoDuration') / 10 * e.key;
        this.hidingControl();
      }
    }
  }]);

  return Video;
}();


;// CONCATENATED MODULE: ./src/js/assets/burger.js



var BurgerMenu = /*#__PURE__*/function () {
  function BurgerMenu(burger, nav, parent) {
    _classCallCheck(this, BurgerMenu);

    this.burger = burger;
    this.nav = nav;
    this.parent = parent;
  }

  _createClass(BurgerMenu, [{
    key: "toggleMenuClasses",
    value: function toggleMenuClasses() {
      this.burger.classList.toggle('burger-menu_active');
      this.nav.classList.toggle('navigation_active');

      if (!this.nav.classList.contains('navigation_active')) {
        this.nav.classList.add('navigation_inactive');
      } else {
        this.nav.classList.remove('navigation_inactive');
      }

      this.parent.classList.toggle('body_overlay');
    }
  }]);

  return BurgerMenu;
}();


;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(883);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);
;// CONCATENATED MODULE: ./src/js/assets/portfolio.js





var ImagesChanger = /*#__PURE__*/function () {
  function ImagesChanger(container) {
    _classCallCheck(this, ImagesChanger);

    this.container = container;
    this.buttons = this.container.querySelector('.seasons-list');
    this.buttonActive = this.buttons.querySelector('.seasons-list__season-btn_active');
    this.imagesContainer = this.container.querySelector('.photos');
    this.images = {};
  }

  _createClass(ImagesChanger, [{
    key: "changeImages",
    value: function () {
      var _changeImages = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee(season) {
        var _this = this;

        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.destroyImages();

                if (!(this.images[season] === undefined)) {
                  _context.next = 5;
                  break;
                }

                _context.next = 4;
                return this.setImagesFromGithub(season);

              case 4:
                this.images[season] = _context.sent;

              case 5:
                this.images[season].forEach(function (img) {
                  _this.imagesContainer.append(img);
                });

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function changeImages(_x) {
        return _changeImages.apply(this, arguments);
      }

      return changeImages;
    }()
  }, {
    key: "destroyImages",
    value: function destroyImages() {
      while (this.imagesContainer.firstChild) {
        this.imagesContainer.firstChild.remove();
      }
    }
  }, {
    key: "setImagesFromGithub",
    value: function () {
      var _setImagesFromGithub = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee2(season) {
        var arr, length, _loop, i, _i;

        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                arr = [];
                length = this.getCountOfImages();

                _loop = function _loop(i) {
                  arr.push(new Promise(function (resolve) {
                    fetch("https://raw.githubusercontent.com/rolling-scopes-school/file-storage/portfolio/assets/img/".concat(season, "/").concat(i, ".jpg")).then(function (response) {
                      return response.blob();
                    }).then(function (res) {
                      return resolve(res);
                    });
                  }));
                };

                for (i = 1; i <= length; i += 1) {
                  _loop(i);
                }

                _context2.next = 6;
                return Promise.all(arr);

              case 6:
                arr = _context2.sent;

                for (_i = 0; _i < length; _i += 1) {
                  arr[_i] = this.createImg(arr[_i]);
                }

                return _context2.abrupt("return", arr);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function setImagesFromGithub(_x2) {
        return _setImagesFromGithub.apply(this, arguments);
      }

      return setImagesFromGithub;
    }()
  }, {
    key: "createImg",
    value: function createImg(blob) {
      var img = new Image();
      img.src = URL.createObjectURL(blob);
      img.classList.add('photos__photo');
      return img;
    }
  }, {
    key: "getCountOfImages",
    value: function getCountOfImages() {
      return this.imagesCount;
    }
  }, {
    key: "setCountOfImages",
    value: function setCountOfImages(count) {
      this.imagesCount = count;
    }
  }]);

  return ImagesChanger;
}();


;// CONCATENATED MODULE: ./src/js/assets/theme.js



var ThemeChanger = /*#__PURE__*/function () {
  function ThemeChanger(node, body) {
    _classCallCheck(this, ThemeChanger);

    this.theme = node;
    this.body = body;
  }

  _createClass(ThemeChanger, [{
    key: "changeTheme",
    value: function changeTheme() {
      this.body.classList.toggle('dark-theme');
      this.body.classList.toggle('light-theme');
    }
  }, {
    key: "changeIcon",
    value: function changeIcon() {
      this.theme.classList.toggle('theme-changer__sun');
      this.theme.classList.toggle('theme-changer__moon');
    }
  }]);

  return ThemeChanger;
}();


;// CONCATENATED MODULE: ./src/js/assets/translate.js



var Translator = /*#__PURE__*/function () {
  function Translator(nodes, langsContainer) {
    _classCallCheck(this, Translator);

    this.textNodes = nodes;
    this.langsContainer = langsContainer;
    this.en = this.langsContainer.querySelector('.langs__en');
    this.ru = this.langsContainer.querySelector('.langs__ru');
    this.i18Obj = {
      en: {
        skills: 'Skills',
        portfolio: 'Portfolio',
        video: 'Video',
        price: 'Price',
        contacts: 'Contacts',
        'hero-title': 'Alexa Rise',
        'hero-text': 'Save sincere emotions, romantic feelings and happy moments of life together with professional photographer Alexa Rise',
        hire: 'Hire me',
        'skill-title-1': 'Digital photography',
        'skill-text-1': 'High-quality photos in the studio and on the nature',
        'skill-title-2': 'Video shooting',
        'skill-text-2': 'Capture your moments so that they always stay with you',
        'skill-title-3': 'Rotouch',
        'skill-text-3': 'I strive to make photography surpass reality',
        'skill-title-4': 'Audio',
        'skill-text-4': 'Professional sounds recording for video, advertising, portfolio',
        winter: 'Winter',
        spring: 'Spring',
        summer: 'Summer',
        autumn: 'Autumn',
        'price-description-1-span-1': 'One location',
        'price-description-1-span-2': '120 photos in color',
        'price-description-1-span-3': '12 photos in retouch',
        'price-description-1-span-4': 'Readiness 2-3 weeks',
        'price-description-1-span-5': 'Make up, visage',
        'price-description-2-span-1': 'One or two locations',
        'price-description-2-span-2': '200 photos in color',
        'price-description-2-span-3': '20 photos in retouch',
        'price-description-2-span-4': 'Readiness 1-2 weeks',
        'price-description-2-span-5': 'Make up, visage',
        'price-description-3-span-1': 'Three locations or more',
        'price-description-3-span-2': '300 photos in color',
        'price-description-3-span-3': '50 photos in retouch',
        'price-description-3-span-4': 'Readiness 1 week',
        'price-description-3-span-5': 'Make up, visage, hairstyle',
        order: 'Order shooting',
        'contact-me': 'Contact me',
        'send-message': 'Send message'
      },
      ru: {
        skills: 'Навыки',
        portfolio: 'Портфолио',
        video: 'Видео',
        price: 'Цены',
        contacts: 'Контакты',
        'hero-title': 'Алекса Райс',
        'hero-text': 'Сохраните искренние эмоции, романтические переживания и счастливые моменты жизни вместе с профессиональным фотографом',
        hire: 'Пригласить',
        'skill-title-1': 'Фотография',
        'skill-text-1': 'Высококачественные фото в студии и на природе',
        'skill-title-2': 'Видеосъемка',
        'skill-text-2': 'Запечатлите лучшие моменты, чтобы они всегда оставались с вами',
        'skill-title-3': 'Ретушь',
        'skill-text-3': 'Я стремлюсь к тому, чтобы фотография превосходила реальность',
        'skill-title-4': 'Звук',
        'skill-text-4': 'Профессиональная запись звука для видео, рекламы, портфолио',
        winter: 'Зима',
        spring: 'Весна',
        summer: 'Лето',
        autumn: 'Осень',
        'price-description-1-span-1': 'Одна локация',
        'price-description-1-span-2': '120 цветных фото',
        'price-description-1-span-3': '12 отретушированных фото',
        'price-description-1-span-4': 'Готовность через 2-3 недели',
        'price-description-1-span-5': 'Макияж, визаж',
        'price-description-2-span-1': 'Одна-две локации',
        'price-description-2-span-2': '200 цветных фото',
        'price-description-2-span-3': '20 отретушированных фото',
        'price-description-2-span-4': 'Готовность через 1-2 недели',
        'price-description-2-span-5': 'Макияж, визаж',
        'price-description-3-span-1': 'Три локации и больше',
        'price-description-3-span-2': '300 цветных фото',
        'price-description-3-span-3': '50 отретушированных фото',
        'price-description-3-span-4': 'Готовность через 1 неделю',
        'price-description-3-span-5': 'Макияж, визаж, прическа',
        order: 'Заказать съемку',
        'contact-me': 'Свяжитесь со мной',
        'send-message': 'Отправить'
      }
    };
  }

  _createClass(Translator, [{
    key: "translate",
    value: function translate(lang) {
      var _this = this;

      this.textNodes.forEach(function (node) {
        /* eslint-disable-next-line */
        node.textContent = _this.i18Obj[lang][node.dataset.i18n];
      });
    }
  }]);

  return Translator;
}();


;// CONCATENATED MODULE: ./src/js/application/application.js








var Application = /*#__PURE__*/function () {
  function Application(node) {
    _classCallCheck(this, Application);

    this.node = node;
    this.menu = new BurgerMenu(this.node.querySelector('.burger-menu'), this.node.querySelector('.navigation'), this.node);
    this.imagesChanger = new ImagesChanger(this.node.querySelector('.portfolio-container'));
    this.imagesChanger.setCountOfImages(6);
    this.imagesChanger.changeImages('winter');
    this.videoPlayer = new Video(this.node.querySelector('.video-player-container'));
    this.themeChanger = new ThemeChanger(this.node.querySelector('.theme-changer'), this.node);
    this.translator = new Translator(this.node.querySelectorAll('[data-i18n]'), this.node.querySelector('.langs'));
  }

  _createClass(Application, [{
    key: "activateListeners",
    value: function activateListeners() {
      var _this = this;

      this.node.onclick = function (e) {
        if (!e.target.closest('.navigation, .burger-menu') && _this.menu.burger.classList.contains('burger-menu_active')) {
          _this.node.classList.toggle('body_overlay');
        }

        if (!e.target.closest('.video-control__settings, .video-control__time-speed-values, .video-control__time-speed-popup, video-control__time-speed-values-exit') && _this.videoPlayer.settings.classList.contains('video-control__time-speed-popup_active')) {
          _this.videoPlayer.settings.classList.toggle('video-control__time-speed-popup_active');
        }

        if (!e.target.closest('.video-control__settings, .video-control__time-speed-values, .video-control__time-speed-popup, video-control__time-speed-values-exit') && _this.videoPlayer.settingsValuesContainer.classList.contains('video-control__time-speed-values_active')) {
          _this.videoPlayer.settingsValuesContainer.classList.toggle('video-control__time-speed-values_active');
        }
      }; // menu


      this.menu.burger.onclick = function () {
        _this.menu.toggleMenuClasses();
      };

      this.menu.nav.onclick = function (e) {
        if (e.target.classList.contains('navigation__link') && _this.menu.burger.classList.contains('burger-menu_active')) {
          _this.menu.toggleMenuClasses();
        }
      }; // video


      this.videoPlayer.video.oncanplay = function () {
        _this.videoPlayer.defineTime();

        _this.videoPlayer.videoBar.oninput = function (e) {
          _this.videoPlayer.setBarsState(_this.videoPlayer.videoBar, e.target.value);

          _this.videoPlayer.setState('videoTime', e.target.value / 100 * _this.videoPlayer.state.videoDuration);

          _this.videoPlayer.updateTime();
        };

        _this.videoPlayer.volumeBar.oninput = function (e) {
          _this.videoPlayer.setState('volumeState', e.target.value);

          _this.videoPlayer.setBarsState(_this.videoPlayer.volumeBar, _this.videoPlayer.getState('volumeState') * 100);

          _this.videoPlayer.updateVolume(e);
        };

        _this.videoPlayer.video.onclick = function (e) {
          _this.videoPlayer.togglePlay(e);
        };

        _this.videoPlayer.video.onended = function () {
          return _this.videoPlayer.setDefaultValues();
        };

        _this.videoPlayer.video.ontimeupdate = function () {
          _this.videoPlayer.initTime();

          _this.videoPlayer.setState('videoTime', _this.videoPlayer.video.currentTime);

          _this.videoPlayer.setBarsState(_this.videoPlayer.videoBar, _this.videoPlayer.getState('videoTime') / _this.videoPlayer.getState('videoDuration') * 100);

          _this.videoPlayer.changeProgress();

          _this.videoPlayer.videoBar.value = _this.videoPlayer.getBarsState(_this.videoPlayer.videoBar);
        };

        _this.videoPlayer.playButton.onclick = function (e) {
          _this.videoPlayer.togglePlay(e);
        };

        _this.videoPlayer.smallPlayButton.onclick = function (e) {
          _this.videoPlayer.togglePlay(e);
        };

        _this.videoPlayer.volumeButton.onclick = function (e) {
          return _this.videoPlayer.muteSound(e);
        };

        _this.videoPlayer.fullscreenButton.onclick = function (e) {
          _this.videoPlayer.toggleFullScreen(e);
        };

        _this.videoPlayer.container.onmouseover = function () {
          if (!document.fullscreenElement) {
            _this.videoPlayer.control.classList.remove('video-control_hide');
          }
        };

        _this.videoPlayer.container.onmousemove = function () {
          if (document.fullscreenElement) {
            _this.videoPlayer.hidingControl();
          }
        };

        _this.videoPlayer.container.onmouseout = function () {
          if (!_this.videoPlayer.video.paused) {
            _this.videoPlayer.control.classList.add('video-control_hide');
          }
        };

        _this.videoPlayer.video.onprogress = function () {
          _this.videoPlayer.updateBuffer();
        };

        _this.videoPlayer.video.onwaiting = function () {
          _this.videoPlayer.appendLoad();

          _this.videoPlayer.video.onplaying = function () {
            _this.videoPlayer.removeLoad();
          };

          _this.videoPlayer.video.onpause = function () {
            _this.videoPlayer.removeLoad();
          };
        };

        _this.videoPlayer.settingsButton.onclick = function () {
          _this.videoPlayer.settingsButton.classList.toggle('video-control__settings_active');

          if (_this.videoPlayer.settingsValuesContainer.classList.contains('video-control__time-speed-values_active')) {
            _this.videoPlayer.settingsValuesContainer.classList.remove('video-control__time-speed-values_active');
          } else {
            _this.videoPlayer.settings.classList.toggle('video-control__time-speed-popup_active');
          }
        };

        _this.videoPlayer.settings.onclick = function () {
          _this.videoPlayer.settings.classList.toggle('video-control__time-speed-popup_active');

          _this.videoPlayer.settingsValuesContainer.classList.toggle('video-control__time-speed-values_active');
        };

        _this.videoPlayer.settingsValuesContainer.onclick = function (e) {
          if (e.target.classList.contains('video-control__time-speed-values-exit')) {
            _this.videoPlayer.settings.classList.toggle('video-control__time-speed-popup_active');
          }

          if (e.target.classList.contains('video-control__time-speed-btn')) {
            _this.videoPlayer.changePlayBackRate(e);
          }

          _this.videoPlayer.settingsValuesContainer.classList.toggle('video-control__time-speed-values_active');
        };
      };

      window.onkeydown = function (e) {
        _this.videoPlayer.changePlayBackRate(e);

        _this.videoPlayer.togglePlay(e);

        _this.videoPlayer.updateVolume(e);

        _this.videoPlayer.muteSound(e);

        _this.videoPlayer.toggleFullScreen(e);

        _this.videoPlayer.transitionToStartOrToFinish(e);

        _this.videoPlayer.skipTime(e);

        _this.videoPlayer.transitionToPartOfVideo(e);
      }; // portfolio


      this.imagesChanger.buttons.onclick = function (e) {
        if (e.target.classList.contains('btn')) {
          _this.imagesChanger.buttonActive.classList.toggle('seasons-list__season-btn_active');

          _this.imagesChanger.buttonActive = e.target;

          _this.imagesChanger.buttonActive.classList.toggle('seasons-list__season-btn_active');

          _this.imagesChanger.changeImages(e.target.dataset.season);
        }
      };

      this.themeChanger.theme.onclick = function () {
        _this.themeChanger.changeTheme();

        _this.themeChanger.changeIcon();
      };

      this.translator.en.oninput = function () {
        _this.translator.translate(_this.translator.en.value);
      };

      this.translator.ru.oninput = function () {
        _this.translator.translate(_this.translator.ru.value);
      };
    }
  }]);

  return Application;
}();


;// CONCATENATED MODULE: ./src/js/index.js

var app = new Application(document.body);
app.activateListeners();
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// extracted by mini-css-extract-plugin

})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(534);
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___HTML_LOADER_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(386), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(136), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(569), __webpack_require__.b);
// Module
var ___HTML_LOADER_REPLACEMENT_0___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_0___);
var ___HTML_LOADER_REPLACEMENT_1___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_1___);
var ___HTML_LOADER_REPLACEMENT_2___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_2___);
var code = "<!DOCTYPE html> <html lang=\"en\"> <head> <meta charset=\"UTF-8\"> <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"> <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"> <link rel=\"icon\" href=\"" + ___HTML_LOADER_REPLACEMENT_0___ + "\"> <title>Portfolio</title> </head> <body class=\"dark-theme\"> <header class=\"header\"> <div class=\"container header-container\"> <a href=\"index.html\" class=\"header__logo\"></a> <nav class=\"navigation header__navigation\"> <ul class=\"navigation__list\"> <li class=\"navigation__item\"><a class=\"link navigation__link\" href=\"#skills\" data-i18n=\"skills\">Skills</a></li> <li class=\"navigation__item\"><a class=\"link navigation__link\" href=\"#portfolio\" data-i18n=\"portfolio\">Portfolio</a></li> <li class=\"navigation__item\"><a class=\"link navigation__link\" href=\"#video\" data-i18n=\"video\">Video</a></li> <li class=\"navigation__item\"><a class=\"link navigation__link\" href=\"#price\" data-i18n=\"price\">Price</a></li> <li class=\"navigation__item\"><a class=\"link navigation__link\" href=\"#contacts\" data-i18n=\"contacts\">Contacts</a></li> </ul> </nav> <div class=\"langs\"> <input id=\"en\" type=\"radio\" name=\"lang\" class=\"langs__en\" value=\"en\" checked=\"checked\"> <label class=\"en en_active\" for=\"en\">en</label> <span class=\"langs__slash\">/</span> <input id=\"ru\" type=\"radio\" name=\"lang\" class=\"langs__ru\" value=\"ru\"> <label class=\"ru\" for=\"ru\">ru</label> </div> <div class=\"burger-menu\"> <span class=\"burger-menu__item\"></span> </div> <div class=\"theme-changer theme-changer__sun\"></div> </div> </header> <main class=\"main\"> <section class=\"about\"> <div class=\"container about-container\"> <div class=\"hero about__hero\"> <h1 class=\"hero__title\" data-i18n=\"hero-title\">Alexa Rise</h1> <p class=\"hero__description\" data-i18n=\"hero-text\">Save sincere emotions, romantic feelings and happy moments of life together with professional photographer Alexa Rise</p> <button class=\"btn hero__btn\" type=\"button\" data-i18n=\"hire\">Hire me</button> </div> </div> </section> <section class=\"skills\" id=\"skills\"> <div class=\"container skills-container\"> <div class=\"title-container skills__title-container\"> <h2 class=\"title skills__title\" data-i18n=\"skills\">Skills</h2> </div> <ul class=\"skills-list\"> <li class=\"skill\"> <div class=\"skill__logo camera-logo\"></div> <h4 class=\"skill__title\" data-i18n=\"skill-title-1\">Digital photography</h4> <p class=\"skill__description\" data-i18n=\"skill-text-1\">High-quality photos in the studio and on the nature</p> </li> <li class=\"skill\"> <div class=\"skill__logo video-logo\"></div> <h4 class=\"skill__title\" data-i18n=\"skill-title-2\">Video shooting</h4> <p class=\"skill__description\" data-i18n=\"skill-text-2\">Capture your moments so that they always stay with you</p> </li> <li class=\"skill\"> <div class=\"skill__logo picture-logo\"></div> <h4 class=\"skill__title\" data-i18n=\"skill-title-3\">Retouch</h4> <p class=\"skill__description\" data-i18n=\"skill-text-3\">I strive to make photography surpass reality</p> </li> <li class=\"skill\"> <div class=\"skill__logo audio-logo\"></div> <h4 class=\"skill__title\" data-i18n=\"skill-title-4\">Audio</h4> <p class=\"skill__description\" data-i18n=\"skill-text-4\">Professional sounds recording for video, advertising, portfolio</p> </li> </ul> </div> </section> <section class=\"portfolio\" id=\"portfolio\"> <div class=\"container portfolio-container\"> <div class=\"title-container section__title\"> <h2 class=\"title portfolio__title\" data-i18n=\"portfolio\">Portfolio</h2> </div> <ul class=\"seasons-list\"> <li class=\"seasons-list__season\"><button class=\"btn seasons-list__season-btn seasons-list__season-btn_active\" data-season=\"winter\" data-i18n=\"winter\">Winter</button></li> <li class=\"seasons-list__season\"><button class=\"btn seasons-list__season-btn\" data-season=\"spring\" data-i18n=\"spring\">Spring</button></li> <li class=\"seasons-list__season\"><button class=\"btn seasons-list__season-btn\" data-season=\"summer\" data-i18n=\"summer\">Summer</button></li> <li class=\"seasons-list__season\"><button class=\"btn seasons-list__season-btn\" data-season=\"autumn\" data-i18n=\"autumn\">Autumn</button></li> </ul> <div class=\"photos portfolio__photos\"></div> </div> </section> <section class=\"video-section\" id=\"video\"> <div class=\"container video-container\"> <div class=\"title-container section__title\"> <h2 class=\"title video__title\" data-i18n=\"video\">Video</h2> </div> <div class=\"video-player-container\"> <video preload=\"metadata\" class=\"video\" src=\"" + ___HTML_LOADER_REPLACEMENT_1___ + "\" poster=\"" + ___HTML_LOADER_REPLACEMENT_2___ + "\"></video> <button class=\"video__btn\" type=\"button\"></button> <div class=\"video-control\"> <div class=\"video-control-container\"> <input class=\"video-control__bar\" type=\"range\" min=\"0\" max=\"100\" value=\"0\" step=\"1\" name=\"currentTime\"> <div class=\"video-control__buffer-bar\"></div> <button class=\"video-control__play\" type=\"button\"></button> <div class=\"video-control__volume-container\"> <button class=\"video-control__volume\" type=\"button\"></button> <input class=\"video-control__volume-bar\" type=\"range\" min=\"0\" max=\"1\" value=\"0.5\" step=\"0.01\" name=\"volume\"> </div> <div class=\"video-control__time\"> <div class=\"video-control__current-time\">0:00</div> <span class=\"video-control__slash\">/</span> <div class=\"video-control__duration\"></div> </div> <button class=\"video-control__settings\" type=\"button\"></button> <button class=\"video-control__fullscreen\" type=\"button\"></button> </div> <div class=\"video-control__time-speed-popup\"> <div class=\"video-control__time-speed-description\"> <div class=\"video-control__time-speed-text\">Time speed</div> <div class=\"video-control__time-speed-value\">1</div> </div> </div> <div class=\"video-control__time-speed-values\"> <button class=\"video-control__time-speed-values-exit\" type=\"button\">Time speed</button> <div class=\"video-control__time-speed-values-buttons\"> <button class=\"video-control__time-speed-btn\" data-value=\"0.25\" type=\"button\">0.25</button> <button class=\"video-control__time-speed-btn\" data-value=\"0.5\" type=\"button\">0.5</button> <button class=\"video-control__time-speed-btn\" data-value=\"0.75\" type=\"button\">0.75</button> <button class=\"video-control__time-speed-btn video-control__time-speed-choosen\" data-value=\"1\" type=\"button\">1</button> <button class=\"video-control__time-speed-btn\" data-value=\"1.25\" type=\"button\">1.25</button> <button class=\"video-control__time-speed-btn\" data-value=\"1.5\" type=\"button\">1.5</button> <button class=\"video-control__time-speed-btn\" data-value=\"1.75\" type=\"button\">1.75</button> <button class=\"video-control__time-speed-btn\" data-value=\"2\" type=\"button\">2</button> </div> </div> </div> </div> </div> </section> <section class=\"prices-section\" id=\"price\"> <div class=\"container price-container\"> <div class=\"title-container section__title\"> <h2 class=\"title prices__title\" data-i18n=\"price\">Price</h2> </div> <div class=\"prices prices-section__prices\"> <div class=\"price\"> <h3 class=\"price__title\">Standard</h3> <b class=\"price__value\">500 $</b> <ul class=\"price-description-list\"> <li class=\"price-description-list__item\" data-i18n=\"price-description-1-span-1\">One location</li> <li class=\"price-description-list__item\" data-i18n=\"price-description-1-span-2\">120 photos in color</li> <li class=\"price-description-list__item\" data-i18n=\"price-description-1-span-3\">12 photos in retouch</li> <li class=\"price-description-list__item\" data-i18n=\"price-description-1-span-4\">Readiness 2-3 weeks</li> <li class=\"price-description-list__item\" data-i18n=\"price-description-1-span-5\">Make up, visage</li> </ul> <button class=\"btn price__btn\" type=\"button\" data-i18n=\"order\">Order shooting</button> </div> <div class=\"price\"> <h3 class=\"price__title\">Premium</h3> <b class=\"price__value\">700 $</b> <ul class=\"price-description-list\"> <li class=\"price-description-list__item\" data-i18n=\"price-description-2-span-1\">One or two locations</li> <li class=\"price-description-list__item\" data-i18n=\"price-description-2-span-2\">200 photos in color</li> <li class=\"price-description-list__item\" data-i18n=\"price-description-2-span-3\">20 photos in retouch</li> <li class=\"price-description-list__item\" data-i18n=\"price-description-2-span-4\">Readiness 1-2 weeks</li> <li class=\"price-description-list__item\" data-i18n=\"price-description-2-span-5\">Make up, visage</li> </ul> <button class=\"btn price__btn\" type=\"button\" data-i18n=\"order\">Order shooting</button> </div> <div class=\"price\"> <h3 class=\"price__title\">Gold</h3> <b class=\"price__value\">1000 $</b> <ul class=\"price-description-list\"> <li class=\"price-description-list__item\" data-i18n=\"price-description-3-span-1\">Three locations or more</li> <li class=\"price-description-list__item\" data-i18n=\"price-description-3-span-2\">300 photos in color</li> <li class=\"price-description-list__item\" data-i18n=\"price-description-3-span-3\">50 photos in retouch</li> <li class=\"price-description-list__item\" data-i18n=\"price-description-3-span-4\">Readiness 1 week</li> <li class=\"price-description-list__item\" data-i18n=\"price-description-3-span-5\">Make up, visage, hairstyle</li> </ul> <button class=\"btn price__btn\" type=\"button\" data-i18n=\"order\">Order shooting</button> </div> </div> </div> </section> <section class=\"contacts\" id=\"contacts\"> <div class=\"container contacts-container\"> <div class=\"form-container\"> <h2 class=\"contacts__title\" data-i18n=\"contact-me\">Contact me</h2> <form class=\"form\"> <input class=\"form__input\" type=\"email\" placeholder=\"E-mail\" required> <input class=\"form__input\" type=\"tel\" placeholder=\"Phone\" required> <textarea class=\"form__input form__textarea\" placeholder=\"Message\"></textarea> <button class=\"btn form__btn\" type=\"submit\" data-i18n=\"send-message\">Send message</button> </form> </div> </div> </section> </main> <footer class=\"footer\"> <div class=\"container footer-container\"> <div class=\"footer__copyrights\"> <span class=\"footer__copyrught\">©</span> <time class=\"footer__creation-date\">2022</time> <a class=\"link\" href=\"https://github.com/Bulation\">github</a> </div> <a class=\"link footer__link\" href=\"https://rs.school/js-stage0/\">Rolling Scopes School</a> <ul class=\"footer-socials\"> <li class=\"footer-socials__item footer-socials__item_instagram\"><a class=\"footer-socials__link\" href=\"https://instagram.com\"></a></li> <li class=\"footer-socials__item footer-socials__item_facebook\"><a class=\"footer-socials__link\" href=\"https://facebook.com\"></a></li> <li class=\"footer-socials__item footer-socials__item_twitter\"><a class=\"footer-socials__link\" href=\"https://twitter.com\"></a></li> <li class=\"footer-socials__item footer-socials__item_pinterest\"><a class=\"footer-socials__link\" href=\"https://pinterest.com\"></a></li> </ul> </div> </footer> </body> </html>";
// Exports
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (code)));
})();

/******/ })()
;
//# sourceMappingURL=bundle.427f34daf28ee548a158.js.map
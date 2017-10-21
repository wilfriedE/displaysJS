module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NOT_FOUND = "NOTFOUND";

/**
 * TimeAction is the class representing a time Action that can occur in a Timeline.
 *
 * @param {function} func Reference to a function to call on trigger
 * @param {Object} args A list of arguments to pass to the func on trigger.
 * @param {String} name (** optional **) A name for the TimeAction
 */

var TimeAction = function () {
  function TimeAction(func, args) {
    var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "undefined";

    _classCallCheck(this, TimeAction);

    this.action = func;
    this.args = args;
    this.name = name;
  }

  _createClass(TimeAction, [{
    key: "toString",
    value: function toString() {
      return 'TimeAction:(' + this.name + ')';
    }

    /**
     * Trigger an action by calling *func* and passing it *args* passed from initialization.
     */

  }, {
    key: "trigger",
    value: function trigger() {
      console.log(this, this.args);
      this.action.apply(this, this.args);
    }
  }]);

  return TimeAction;
}();

;

/**
 * Timeline with many actions
 *
 * @param {Object} args Object containing Timeline args.
 * @param {String} [args.name="undefined"] The name of the Timeline.
 * @param {Number} [args.treshold=5] The treshold for calling TimeActions
 */

var Timeline = function () {
  function Timeline(args) {
    _classCallCheck(this, Timeline);

    this.time_actions = {};
    this.name = args.name || "undefined";
    this.treshold = args.treshold || 5;
  }

  _createClass(Timeline, [{
    key: "toString",
    value: function toString() {
      return '(' + this.name + ')';
    }

    /**
     * Add a time action to the timeline.
     * @param {Number} time               The time value at which to perform the action
     * @param {function} action           The function to call when trigger
     * @param {Array}  [args=[]]          The args to pass to function on trigger
     * @param {String} [name="undefined"] The name of the TimeAction
     */

  }, {
    key: "addTimeAction",
    value: function addTimeAction(time, action) {
      var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var name = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "undefined";

      if (!(Object.prototype.toString.call(args) === '[object Array]')) {
        args = [args];
      }
      this.time_actions[time] = new TimeAction(action, args, name);
    }

    /**
     * This function triggers the TimeAction on the Timeline at the given time if there is one.
     * @param  {Number} time The time value at which the action is at.
     */

  }, {
    key: "callTimeAction",
    value: function callTimeAction(time) {
      if (this.time_actions.hasOwnProperty(time)) {
        this.time_actions[time].trigger();
      }
    }

    /**
     * This function triggers the nearest TimeAction on the Timeline within the treshold
     *  of the Timeline.
     * @param  {Number} time The time value to call action within treshold for.
     */

  }, {
    key: "callNearestTimeAction",
    value: function callNearestTimeAction(time) {
      var t;
      if (this.time_actions.hasOwnProperty(time)) {
        t = time;
      } else {
        t = this.getNearestTime(time);
      }

      if (!(t == NOT_FOUND) && this.time_actions.hasOwnProperty(t)) {
        this.time_actions[t].trigger();
      }
    }

    /**
     * This function is a helper to get the nearest time value within the Timeline's treshold
     * @param  {Number} time The time to look within Timeline treshold
     * @return {Number}      The value within treshold. "NOT_FOUND" if no value within treshold.
     */

  }, {
    key: "getNearestTime",
    value: function getNearestTime(time) {
      for (var i = 1; i < this.treshold; i++) {
        if (this.time_actions.hasOwnProperty(time + i)) {
          return time + i;
        } else if (this.time_actions.hasOwnProperty(time - i)) {
          return time - i;
        }
      }
      return NOT_FOUND;
    }
  }]);

  return Timeline;
}();

;

module.exports = { Timeline: Timeline, TimeAction: TimeAction };

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _timeline = __webpack_require__(0);

var _eventemitter = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The DisplayCoordinator is reponsible for coordinating and starting a performance
 *
 * Creates a context for the performance and passes it the Display instances.
 * Sets up EventListeners for DisplayCoordinator
 *
 * @param {Object} args Initialization arguments for the DisplayCoordinator
 * @param {String} [args.name="undefined"] The of the DisplayCoordinator or the performance.
 * @param {Number} [args.duration=0] The length of the Perfomance
 * @param {Object} [args.stage={add:function(args) {}}] A stage to add Display render to if available.
 *
 * ** Note **
 * Stage is not needed unless you have a specific type of Stage you want to append your Display renders to.
 * Otherwise you can just render where you need it when the DisplayCoordinator calls render on the Display.
 *
 * @param {Array} args.displays A list of Display instances to add to performance.
 * @param {Number} args.timeline_treshold  A treshold to use for DisplayCoordinator's (performance) Timeline.
 * @param {Display} args.primary_display  The PrimaryDisplay for the performance. It controls the time flow.
 *
 *
 */
var DisplayCoordinator = function () {
  function DisplayCoordinator(args) {
    _classCallCheck(this, DisplayCoordinator);

    this.context = {
      time: 0,
      duration: args.duration || 0,
      emitter: new _eventemitter.EventEmitter2({
        maxListeners: 14 // might need to think this through more.
      })
    };
    this.stage = args.stage || { add: function add(args) {} };
    this.name = args.name || "undefined";
    this.timeline = new _timeline.Timeline({ name: this.name + "-timeline",
      treshold: args.timeline_treshold });
    this.displays = args.displays;
    this.displays_not_ready = [];

    if (args.primary_display != undefined) {
      args.primary_display.setAsPrimaryDisplay();
    }

    for (var display in this.displays) {
      this.displays[display].setContext(this.context);
      if (!this.displays[display].ready()) {
        this.displays_not_ready.push(this.displays[display]);
      }
    }

    // Setup event listeners for DisplayCoordinator
    this.context.emitter.on("tick", this.handleTick.bind(this));
    this.context.emitter.on("pause", this.pausePerformance.bind(this));
    this.context.emitter.on("continue", this.continuePerformance.bind(this));
    this.context.emitter.on("ready", this.checkAllReady.bind(this));
  }

  _createClass(DisplayCoordinator, [{
    key: "toString",
    value: function toString() {
      return '(' + this.name + ')';
    }

    /**
     * Checks if all Display instances are ready.
     * Emits 'all_ready' if All Displays are ready.
     *
     * @TODO Change checkAllReady to performWhenAllReady.
     * @body Keeps waiting until all Displays are ready and starts the performance.
     */

  }, {
    key: "checkAllReady",
    value: function checkAllReady() {
      for (var display in this.displays_not_ready) {
        if (this.displays_not_ready[display].ready()) {
          this.displays_not_ready.splice(display, 1);
        }
      }
      if (this.displays_not_ready.length == 0) {
        this.context.emitter.emit("all_ready");
      }
    }

    /**
     *  Helper to check if All Displays are ready to start performance.
     *
     * @return {Boolean} true if all Displays are ready, false Otherwise
     * @TODO Change ready vs not ready logic.
     * @body Make this checkAllReady instead of allReady
     */

  }, {
    key: "allReady",
    value: function allReady() {
      if (this.displays_not_ready.length == 0) {
        return true;
      } else {
        return false;
      }
    }

    /**
     * The DisplayCoordinator's tick function.
     * Handles tick and emits it to all listeners in the performance.
     * Increases time by 1 unit.
     *
     *  ** Note ** The PrimaryDisplay should be doing this, not the DisplayCoordinator
     */

  }, {
    key: "tick",
    value: function tick() {
      this.context.time += 1;
      this.context.emitter.emit('tick');
    }

    /**
     * Handler for Tick events for the DisplayCoordinator.
     * Calls Time actions on the DisplayCoordinator's timeline
     *
     * ** Note **
     * Overwrite if you think your DisplayCoordinator should have more control.
     */

  }, {
    key: "handleTick",
    value: function handleTick() {
      this.timeline.callTimeAction(this.context.time);
    }

    /**
     * Skips time to a given time t for the performance.
     * And emits 'tick' for all listeners
     *
     * ** Note ** The PrimaryDisplay should be doing this, not the DisplayCoordinator
     * But You may use at your own risk.
     *
     * @param  {Number} t The time to skip to.
     */

  }, {
    key: "seek",
    value: function seek(t) {
      this.context.time = t;
      this.context.emitter.emit('tick');
    }

    /**
     * Starts the performance.
     * * Calls Setup on all display instances
     * * Then calls Render on them and appends them to stage if anything is returned.
     * * Checks that all Displays are ready then Starts all Displays.
     *
     * @TODO Adjust start of performance logic
     */

  }, {
    key: "perform",
    value: function perform() {
      for (var display in this.displays) {
        this.displays[display].setup();
      }

      function startup() {
        for (var display in this.displays) {
          var rendering = this.displays[display].render();
          if (rendering != undefined) {
            this.stage.add(rendering);
          }
          this.displays[display].play();
        }
      }

      if (this.allReady()) {
        startup.bind(this)();
      } else {
        this.context.emitter.on("all_ready", startup.bind(this));
      }
    }

    /**
     * Continues the performance where if paused
     */

  }, {
    key: "continuePerformance",
    value: function continuePerformance() {
      for (var display in this.displays) {
        this.displays[display].play();
      }
    }

    /**
     * Pauses the performance
     */

  }, {
    key: "pausePerformance",
    value: function pausePerformance() {
      for (var display in this.displays) {
        this.displays[display].pause();
      }
    }

    /**
     * Resets all displays and stops the performance.
     */

  }, {
    key: "stopPerformance",
    value: function stopPerformance() {
      this.seek(0);
      for (var display in this.displays) {
        this.displays[display].reset();
      }
    }
  }]);

  return DisplayCoordinator;
}();

;

module.exports = { DisplayCoordinator: DisplayCoordinator };

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * EventEmitter2
 * https://github.com/hij1nx/EventEmitter2
 *
 * Copyright (c) 2013 hij1nx
 * Licensed under the MIT license.
 */
;!function (undefined) {

  var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };
  var defaultMaxListeners = 10;

  function init() {
    this._events = {};
    if (this._conf) {
      configure.call(this, this._conf);
    }
  }

  function configure(conf) {
    if (conf) {
      this._conf = conf;

      conf.delimiter && (this.delimiter = conf.delimiter);
      this._maxListeners = conf.maxListeners !== undefined ? conf.maxListeners : defaultMaxListeners;

      conf.wildcard && (this.wildcard = conf.wildcard);
      conf.newListener && (this.newListener = conf.newListener);
      conf.verboseMemoryLeak && (this.verboseMemoryLeak = conf.verboseMemoryLeak);

      if (this.wildcard) {
        this.listenerTree = {};
      }
    } else {
      this._maxListeners = defaultMaxListeners;
    }
  }

  function logPossibleMemoryLeak(count, eventName) {
    var errorMsg = '(node) warning: possible EventEmitter memory ' + 'leak detected. ' + count + ' listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.';

    if (this.verboseMemoryLeak) {
      errorMsg += ' Event name: ' + eventName + '.';
    }

    if (typeof process !== 'undefined' && process.emitWarning) {
      var e = new Error(errorMsg);
      e.name = 'MaxListenersExceededWarning';
      e.emitter = this;
      e.count = count;
      process.emitWarning(e);
    } else {
      console.error(errorMsg);

      if (console.trace) {
        console.trace();
      }
    }
  }

  function EventEmitter(conf) {
    this._events = {};
    this.newListener = false;
    this.verboseMemoryLeak = false;
    configure.call(this, conf);
  }
  EventEmitter.EventEmitter2 = EventEmitter; // backwards compatibility for exporting EventEmitter property

  //
  // Attention, function return type now is array, always !
  // It has zero elements if no any matches found and one or more
  // elements (leafs) if there are matches
  //
  function searchListenerTree(handlers, type, tree, i) {
    if (!tree) {
      return [];
    }
    var listeners = [],
        leaf,
        len,
        branch,
        xTree,
        xxTree,
        isolatedBranch,
        endReached,
        typeLength = type.length,
        currentType = type[i],
        nextType = type[i + 1];
    if (i === typeLength && tree._listeners) {
      //
      // If at the end of the event(s) list and the tree has listeners
      // invoke those listeners.
      //
      if (typeof tree._listeners === 'function') {
        handlers && handlers.push(tree._listeners);
        return [tree];
      } else {
        for (leaf = 0, len = tree._listeners.length; leaf < len; leaf++) {
          handlers && handlers.push(tree._listeners[leaf]);
        }
        return [tree];
      }
    }

    if (currentType === '*' || currentType === '**' || tree[currentType]) {
      //
      // If the event emitted is '*' at this part
      // or there is a concrete match at this patch
      //
      if (currentType === '*') {
        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i + 1));
          }
        }
        return listeners;
      } else if (currentType === '**') {
        endReached = i + 1 === typeLength || i + 2 === typeLength && nextType === '*';
        if (endReached && tree._listeners) {
          // The next element has a _listeners, add it to the handlers.
          listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength));
        }

        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            if (branch === '*' || branch === '**') {
              if (tree[branch]._listeners && !endReached) {
                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength));
              }
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            } else if (branch === nextType) {
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i + 2));
            } else {
              // No match on this one, shift into the tree but not in the type array.
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            }
          }
        }
        return listeners;
      }

      listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i + 1));
    }

    xTree = tree['*'];
    if (xTree) {
      //
      // If the listener tree will allow any match for this part,
      // then recursively explore all branches of the tree
      //
      searchListenerTree(handlers, type, xTree, i + 1);
    }

    xxTree = tree['**'];
    if (xxTree) {
      if (i < typeLength) {
        if (xxTree._listeners) {
          // If we have a listener on a '**', it will catch all, so add its handler.
          searchListenerTree(handlers, type, xxTree, typeLength);
        }

        // Build arrays of matching next branches and others.
        for (branch in xxTree) {
          if (branch !== '_listeners' && xxTree.hasOwnProperty(branch)) {
            if (branch === nextType) {
              // We know the next element will match, so jump twice.
              searchListenerTree(handlers, type, xxTree[branch], i + 2);
            } else if (branch === currentType) {
              // Current node matches, move into the tree.
              searchListenerTree(handlers, type, xxTree[branch], i + 1);
            } else {
              isolatedBranch = {};
              isolatedBranch[branch] = xxTree[branch];
              searchListenerTree(handlers, type, { '**': isolatedBranch }, i + 1);
            }
          }
        }
      } else if (xxTree._listeners) {
        // We have reached the end and still on a '**'
        searchListenerTree(handlers, type, xxTree, typeLength);
      } else if (xxTree['*'] && xxTree['*']._listeners) {
        searchListenerTree(handlers, type, xxTree['*'], typeLength);
      }
    }

    return listeners;
  }

  function growListenerTree(type, listener) {

    type = typeof type === 'string' ? type.split(this.delimiter) : type.slice();

    //
    // Looks for two consecutive '**', if so, don't add the event at all.
    //
    for (var i = 0, len = type.length; i + 1 < len; i++) {
      if (type[i] === '**' && type[i + 1] === '**') {
        return;
      }
    }

    var tree = this.listenerTree;
    var name = type.shift();

    while (name !== undefined) {

      if (!tree[name]) {
        tree[name] = {};
      }

      tree = tree[name];

      if (type.length === 0) {

        if (!tree._listeners) {
          tree._listeners = listener;
        } else {
          if (typeof tree._listeners === 'function') {
            tree._listeners = [tree._listeners];
          }

          tree._listeners.push(listener);

          if (!tree._listeners.warned && this._maxListeners > 0 && tree._listeners.length > this._maxListeners) {
            tree._listeners.warned = true;
            logPossibleMemoryLeak.call(this, tree._listeners.length, name);
          }
        }
        return true;
      }
      name = type.shift();
    }
    return true;
  }

  // By default EventEmitters will print a warning if more than
  // 10 listeners are added to it. This is a useful default which
  // helps finding memory leaks.
  //
  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.

  EventEmitter.prototype.delimiter = '.';

  EventEmitter.prototype.setMaxListeners = function (n) {
    if (n !== undefined) {
      this._maxListeners = n;
      if (!this._conf) this._conf = {};
      this._conf.maxListeners = n;
    }
  };

  EventEmitter.prototype.event = '';

  EventEmitter.prototype.once = function (event, fn) {
    return this._once(event, fn, false);
  };

  EventEmitter.prototype.prependOnceListener = function (event, fn) {
    return this._once(event, fn, true);
  };

  EventEmitter.prototype._once = function (event, fn, prepend) {
    this._many(event, 1, fn, prepend);
    return this;
  };

  EventEmitter.prototype.many = function (event, ttl, fn) {
    return this._many(event, ttl, fn, false);
  };

  EventEmitter.prototype.prependMany = function (event, ttl, fn) {
    return this._many(event, ttl, fn, true);
  };

  EventEmitter.prototype._many = function (event, ttl, fn, prepend) {
    var self = this;

    if (typeof fn !== 'function') {
      throw new Error('many only accepts instances of Function');
    }

    function listener() {
      if (--ttl === 0) {
        self.off(event, listener);
      }
      return fn.apply(this, arguments);
    }

    listener._origin = fn;

    this._on(event, listener, prepend);

    return self;
  };

  EventEmitter.prototype.emit = function () {

    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this.newListener) {
      if (!this._events.newListener) {
        return false;
      }
    }

    var al = arguments.length;
    var args, l, i, j;
    var handler;

    if (this._all && this._all.length) {
      handler = this._all.slice();
      if (al > 3) {
        args = new Array(al);
        for (j = 0; j < al; j++) {
          args[j] = arguments[j];
        }
      }

      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
          case 1:
            handler[i].call(this, type);
            break;
          case 2:
            handler[i].call(this, type, arguments[1]);
            break;
          case 3:
            handler[i].call(this, type, arguments[1], arguments[2]);
            break;
          default:
            handler[i].apply(this, args);
        }
      }
    }

    if (this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    } else {
      handler = this._events[type];
      if (typeof handler === 'function') {
        this.event = type;
        switch (al) {
          case 1:
            handler.call(this);
            break;
          case 2:
            handler.call(this, arguments[1]);
            break;
          case 3:
            handler.call(this, arguments[1], arguments[2]);
            break;
          default:
            args = new Array(al - 1);
            for (j = 1; j < al; j++) {
              args[j - 1] = arguments[j];
            }handler.apply(this, args);
        }
        return true;
      } else if (handler) {
        // need to make copy of handlers because list can change in the middle
        // of emit call
        handler = handler.slice();
      }
    }

    if (handler && handler.length) {
      if (al > 3) {
        args = new Array(al - 1);
        for (j = 1; j < al; j++) {
          args[j - 1] = arguments[j];
        }
      }
      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
          case 1:
            handler[i].call(this);
            break;
          case 2:
            handler[i].call(this, arguments[1]);
            break;
          case 3:
            handler[i].call(this, arguments[1], arguments[2]);
            break;
          default:
            handler[i].apply(this, args);
        }
      }
      return true;
    } else if (!this._all && type === 'error') {
      if (arguments[1] instanceof Error) {
        throw arguments[1]; // Unhandled 'error' event
      } else {
        throw new Error("Uncaught, unspecified 'error' event.");
      }
      return false;
    }

    return !!this._all;
  };

  EventEmitter.prototype.emitAsync = function () {

    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this.newListener) {
      if (!this._events.newListener) {
        return Promise.resolve([false]);
      }
    }

    var promises = [];

    var al = arguments.length;
    var args, l, i, j;
    var handler;

    if (this._all) {
      if (al > 3) {
        args = new Array(al);
        for (j = 1; j < al; j++) {
          args[j] = arguments[j];
        }
      }
      for (i = 0, l = this._all.length; i < l; i++) {
        this.event = type;
        switch (al) {
          case 1:
            promises.push(this._all[i].call(this, type));
            break;
          case 2:
            promises.push(this._all[i].call(this, type, arguments[1]));
            break;
          case 3:
            promises.push(this._all[i].call(this, type, arguments[1], arguments[2]));
            break;
          default:
            promises.push(this._all[i].apply(this, args));
        }
      }
    }

    if (this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    } else {
      handler = this._events[type];
    }

    if (typeof handler === 'function') {
      this.event = type;
      switch (al) {
        case 1:
          promises.push(handler.call(this));
          break;
        case 2:
          promises.push(handler.call(this, arguments[1]));
          break;
        case 3:
          promises.push(handler.call(this, arguments[1], arguments[2]));
          break;
        default:
          args = new Array(al - 1);
          for (j = 1; j < al; j++) {
            args[j - 1] = arguments[j];
          }promises.push(handler.apply(this, args));
      }
    } else if (handler && handler.length) {
      handler = handler.slice();
      if (al > 3) {
        args = new Array(al - 1);
        for (j = 1; j < al; j++) {
          args[j - 1] = arguments[j];
        }
      }
      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
          case 1:
            promises.push(handler[i].call(this));
            break;
          case 2:
            promises.push(handler[i].call(this, arguments[1]));
            break;
          case 3:
            promises.push(handler[i].call(this, arguments[1], arguments[2]));
            break;
          default:
            promises.push(handler[i].apply(this, args));
        }
      }
    } else if (!this._all && type === 'error') {
      if (arguments[1] instanceof Error) {
        return Promise.reject(arguments[1]); // Unhandled 'error' event
      } else {
        return Promise.reject("Uncaught, unspecified 'error' event.");
      }
    }

    return Promise.all(promises);
  };

  EventEmitter.prototype.on = function (type, listener) {
    return this._on(type, listener, false);
  };

  EventEmitter.prototype.prependListener = function (type, listener) {
    return this._on(type, listener, true);
  };

  EventEmitter.prototype.onAny = function (fn) {
    return this._onAny(fn, false);
  };

  EventEmitter.prototype.prependAny = function (fn) {
    return this._onAny(fn, true);
  };

  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  EventEmitter.prototype._onAny = function (fn, prepend) {
    if (typeof fn !== 'function') {
      throw new Error('onAny only accepts instances of Function');
    }

    if (!this._all) {
      this._all = [];
    }

    // Add the function to the event listener collection.
    if (prepend) {
      this._all.unshift(fn);
    } else {
      this._all.push(fn);
    }

    return this;
  };

  EventEmitter.prototype._on = function (type, listener, prepend) {
    if (typeof type === 'function') {
      this._onAny(type, listener);
      return this;
    }

    if (typeof listener !== 'function') {
      throw new Error('on only accepts instances of Function');
    }
    this._events || init.call(this);

    // To avoid recursion in the case that type == "newListeners"! Before
    // adding it to the listeners, first emit "newListeners".
    this.emit('newListener', type, listener);

    if (this.wildcard) {
      growListenerTree.call(this, type, listener);
      return this;
    }

    if (!this._events[type]) {
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;
    } else {
      if (typeof this._events[type] === 'function') {
        // Change to array.
        this._events[type] = [this._events[type]];
      }

      // If we've already got an array, just add
      if (prepend) {
        this._events[type].unshift(listener);
      } else {
        this._events[type].push(listener);
      }

      // Check for listener leak
      if (!this._events[type].warned && this._maxListeners > 0 && this._events[type].length > this._maxListeners) {
        this._events[type].warned = true;
        logPossibleMemoryLeak.call(this, this._events[type].length, type);
      }
    }

    return this;
  };

  EventEmitter.prototype.off = function (type, listener) {
    if (typeof listener !== 'function') {
      throw new Error('removeListener only takes instances of Function');
    }

    var handlers,
        leafs = [];

    if (this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
    } else {
      // does not use listeners(), so no side effect of creating _events[type]
      if (!this._events[type]) return this;
      handlers = this._events[type];
      leafs.push({ _listeners: handlers });
    }

    for (var iLeaf = 0; iLeaf < leafs.length; iLeaf++) {
      var leaf = leafs[iLeaf];
      handlers = leaf._listeners;
      if (isArray(handlers)) {

        var position = -1;

        for (var i = 0, length = handlers.length; i < length; i++) {
          if (handlers[i] === listener || handlers[i].listener && handlers[i].listener === listener || handlers[i]._origin && handlers[i]._origin === listener) {
            position = i;
            break;
          }
        }

        if (position < 0) {
          continue;
        }

        if (this.wildcard) {
          leaf._listeners.splice(position, 1);
        } else {
          this._events[type].splice(position, 1);
        }

        if (handlers.length === 0) {
          if (this.wildcard) {
            delete leaf._listeners;
          } else {
            delete this._events[type];
          }
        }

        this.emit("removeListener", type, listener);

        return this;
      } else if (handlers === listener || handlers.listener && handlers.listener === listener || handlers._origin && handlers._origin === listener) {
        if (this.wildcard) {
          delete leaf._listeners;
        } else {
          delete this._events[type];
        }

        this.emit("removeListener", type, listener);
      }
    }

    function recursivelyGarbageCollect(root) {
      if (root === undefined) {
        return;
      }
      var keys = Object.keys(root);
      for (var i in keys) {
        var key = keys[i];
        var obj = root[key];
        if (obj instanceof Function || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== "object" || obj === null) continue;
        if (Object.keys(obj).length > 0) {
          recursivelyGarbageCollect(root[key]);
        }
        if (Object.keys(obj).length === 0) {
          delete root[key];
        }
      }
    }
    recursivelyGarbageCollect(this.listenerTree);

    return this;
  };

  EventEmitter.prototype.offAny = function (fn) {
    var i = 0,
        l = 0,
        fns;
    if (fn && this._all && this._all.length > 0) {
      fns = this._all;
      for (i = 0, l = fns.length; i < l; i++) {
        if (fn === fns[i]) {
          fns.splice(i, 1);
          this.emit("removeListenerAny", fn);
          return this;
        }
      }
    } else {
      fns = this._all;
      for (i = 0, l = fns.length; i < l; i++) {
        this.emit("removeListenerAny", fns[i]);
      }this._all = [];
    }
    return this;
  };

  EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

  EventEmitter.prototype.removeAllListeners = function (type) {
    if (arguments.length === 0) {
      !this._events || init.call(this);
      return this;
    }

    if (this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);

      for (var iLeaf = 0; iLeaf < leafs.length; iLeaf++) {
        var leaf = leafs[iLeaf];
        leaf._listeners = null;
      }
    } else if (this._events) {
      this._events[type] = null;
    }
    return this;
  };

  EventEmitter.prototype.listeners = function (type) {
    if (this.wildcard) {
      var handlers = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
      return handlers;
    }

    this._events || init.call(this);

    if (!this._events[type]) this._events[type] = [];
    if (!isArray(this._events[type])) {
      this._events[type] = [this._events[type]];
    }
    return this._events[type];
  };

  EventEmitter.prototype.eventNames = function () {
    return Object.keys(this._events);
  };

  EventEmitter.prototype.listenerCount = function (type) {
    return this.listeners(type).length;
  };

  EventEmitter.prototype.listenersAny = function () {

    if (this._all) {
      return this._all;
    } else {
      return [];
    }
  };

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return EventEmitter;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    // CommonJS
    module.exports = EventEmitter;
  } else {
    // Browser global.
    window.EventEmitter2 = EventEmitter;
  }
}();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _timeline = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// An object with modes available to a Display.
// MODES are used to track Display modes.
// Such as User Interaction Mode vs Normal Display Mode.
var MODES = { NORMAL: 0, USER: 1 };

/**
 * The Base class for all Displays.
 *
 * @param {Object} args An object with arguments to initialize the display.
 *
 * @param {String} args.name Name of Display Instance
 * @param {Number} args.timeline_treshold A treshold of error for picking a time action for the display
 *
 * @param {Object}  args.context (** optional**) Reference to DisplayCoordinator's context
 */

var Display = function () {
  function Display(args) {
    _classCallCheck(this, Display);

    this.context = args.context || undefined;
    this.name = args.name || "undefined";
    this.timeline = new _timeline.Timeline({ name: this.name + "-timeline",
      treshold: args.timeline_treshold });
    this.is_primary_display = false;
    this.mode = MODES.NORMAL;
    this.m_ready = false;
  }

  _createClass(Display, [{
    key: "toString",
    value: function toString() {
      return '(' + this.name + ')';
    }

    /**
     * Set the context for the Display.
     *
     * @param {Object} context DisplayCoordinator's context
     */

  }, {
    key: "setContext",
    value: function setContext(context) {
      this.context = context;
      this.context.emitter.on("tick", this.handleTick.bind(this));
      this.context.emitter.on("pause", this.handlePause.bind(this));
      this.context.emitter.on("continue", this.handleContinue.bind(this));
    }

    /**
     * Set the the Display's ready state to True.
     *
     */

  }, {
    key: "setAsReady",
    value: function setAsReady() {
      this.m_ready = true;
      if (this.context != undefined) {
        this.context.emitter.emit("ready");
      }
    }

    /**
     * Check if Display is ready
     *
     * @return {Boolean} True if Ready, False otherwise
     */

  }, {
    key: "ready",
    value: function ready() {
      return this.m_ready;
    }

    /**
     * Set the Display as the Primary Display for a performance.
     */

  }, {
    key: "setAsPrimaryDisplay",
    value: function setAsPrimaryDisplay() {
      this.is_primary_display = true;
    }

    /**
     * Check if the Display is the PrimaryDisplay for the performance
     *
     * @return {Boolean} True if PrimaryDisplay, False otherwise
     */

  }, {
    key: "isPrimaryDisplay",
    value: function isPrimaryDisplay() {
      if (this.is_primary_display) {
        return true;
      } else {
        return false;
      }
    }

    /**
     * This function is responsible for controling time flow for a performance
     * if the Display is the PrimaryDisplay in a performance.
     *
     * ** Note ** Your Display implementation may override this to properly handle
     * time tick as needed.
     * * By default, this function increments the time flow by 1 and emits it to all
     * listeners in the performance.
     * * Ensure that the Display is the PrimaryDisplay before controlling time.
     */

  }, {
    key: "tick",
    value: function tick() {
      if (this.isPrimaryDisplay()) {
        this.context.emitter.emit('tick');
        this.context.time += 1;
      }
    }

    /**
     * This function sets the Display mode to user mode.
     *
     * ** Note **
     * Only use this if user mode is needed
     */

  }, {
    key: "enableUserMode",
    value: function enableUserMode() {
      this.mode = MODES.USER;
    }

    /**
     * This function changes the Display mode to Normal mode.
     *
     */

  }, {
    key: "releaseUserMode",
    value: function releaseUserMode() {
      this.mode = MODES.NORMAL;
    }

    /**
     * Check if Display is in user mode
     * @return {Boolean} True if in user mode, False otherwise
     */

  }, {
    key: "isInUserMode",
    value: function isInUserMode() {
      if (this.mode == MODES.USER) {
        return true;
      }
      return false;
    }

    /**
     * Handles tick events for the Display.
     *
     * ** Note **
     * When a tick event is emitted in the performance, this function get's trigered.
     *
     * You may overwrite this function to better handle your Display implementation's
     * case.
     * * By default it calls the nearest TimeAction at the current performance time.
     */

  }, {
    key: "handleTick",
    value: function handleTick() {
      this.timeline.callTimeAction(this.context.time);
    }

    /**
     * This function handles any pause event triggered by in a performance.
     *
     * ** Note **
     * By default it calls the Display's pause function.
     * * This may be overwritten to handle pause events differently for the Display implementation.
     * @TODO Implement handlePause default action
     */

  }, {
    key: "handlePause",
    value: function handlePause() {}

    /**
     * This function handles any continue event triggered by in a performance. Ussually after a pause.
     *
     * ** Note **
     * By default it calls the Display's play function.
     *
     * * This may be overwritten to handle continue events differently for the Display implementation.
     * @TODO Implement handleContinue default action
     */

  }, {
    key: "handleContinue",
    value: function handleContinue() {}

    /**
     * This function is a placeholder to perform any setup the Display needs done..
     *
     * ** Note **
     * You **need** to overwrite this function to do handle anything the Display needs
     * to setup.
     *
     * It is a good idea to mark the Display as ready here. Or in render().
     *
     */

  }, {
    key: "setup",
    value: function setup() {}

    /**
     * This function is a placeholder to be overwritten to handle any rendering that
     * needs to performed at startup after setup in the performance.
     *
     * ** Note **
     * You **need** to overwrite this function to do handle anything the Display needs
     * to render.
     *
     * (** optional **) This can return a value to be appended to the DisplayCoordinator's Stage.
     */

  }, {
    key: "render",
    value: function render() {}

    /**
     * This function pauses the Display and does not respond to Ticks
     *
     * @TODO Implement pause default Action.
     */

  }, {
    key: "pause",
    value: function pause() {}

    /**
     * This function removes the Display from a pause state and performs the action
     * from the Display's timeline at the current performance time (context.time).
     *
     * ** Note **
     * You may overwrite this function to do what you'd prefer in your Display implementation.
     * @TODO Implement play default Action.
     */

  }, {
    key: "play",
    value: function play() {}

    /**
     * This function skips to a given time for the Display.
     *
     * @param  {Number} t The time to skip to.
     */

  }, {
    key: "seek",
    value: function seek(t) {
      this.timeline.callTimeAction(t);
    }

    /**
     * This function resets the Display's timeline back to 0
     *
     * ** Note **
     * You may overwrite this function to do what you'd prefer in your Display implementation.
     * @TODO Implement reset default Action.
     */

  }, {
    key: "reset",
    value: function reset() {}
  }]);

  return Display;
}();

;

module.exports = { Display: Display };

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _timeline = __webpack_require__(0);

var _display_coordinator = __webpack_require__(1);

var _display = __webpack_require__(4);

module.exports = { Timeline: _timeline.Timeline, DisplayCoordinator: _display_coordinator.DisplayCoordinator, Display: _display.Display };

/***/ })
/******/ ]);
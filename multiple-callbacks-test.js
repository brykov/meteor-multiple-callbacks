// Generated by CoffeeScript 1.7.1
(function() {
  var materialize, render;

  materialize = function(content, parent) {
    var func;
    func = content;
    if (typeof content !== 'function') {
      func = function() {
        return content;
      };
    }
    return Blaze.render(func, parent);
  };

  render = function(comp) {
    var div;
    div = document.createElement("div");
    materialize(comp, div);
    return document.body.appendChild(div);
  };

  Tinytest.addAsync('attaching created callback', function(test, cb) {
    var div, fail_timeout;
    fail_timeout = setTimeout(function() {
      test.fail({
        message: 'Timed out!'
      });
      return cb();
    }, 1000);
    Template.created('testBasicCreated', function() {
      clearTimeout(fail_timeout);
      test.ok();
      return cb();
    });
    div = render(Template['testBasicCreated']);
    return div.remove();
  });

  Tinytest.addAsync('attaching rendered callback', function(test, cb) {
    var div, fail_timeout;
    fail_timeout = setTimeout(function() {
      test.fail({
        message: 'Timed out!'
      });
      return cb();
    }, 1000);
    Template.rendered('testBasicRendered', function() {
      clearTimeout(fail_timeout);
      test.ok();
      return cb();
    });
    div = render(Template['testBasicRendered']);
    return div.remove();
  });

  Tinytest.addAsync('attaching destroyed callback', function(test, cb) {
    var fail_timeout;
    fail_timeout = setTimeout(function() {
      test.fail({
        message: 'Timed out!'
      });
      return cb();
    }, 1000);
    Template.destroyed('testBasicDestroyed', function() {
      clearTimeout(fail_timeout);
      test.ok();
      return cb();
    });
    Template.rendered('testBasicDestroyed', function() {
      return this.view._domrange.destroy();
    });
    return render(Template['testBasicDestroyed']);
  });

  Template['testStandardCallbacksCompatibility'].rendered = function() {
    return this.__standard_rendered_ok__ = true;
  };

  Tinytest.addAsync('dealing with standard rendered callback', function(test, cb) {
    var div, fail_timeout;
    fail_timeout = setTimeout(function() {
      test.fail({
        message: 'Timed out!'
      });
      return cb();
    }, 1000);
    Template.rendered('testStandardCallbacksCompatibility', function() {
      clearTimeout(fail_timeout);
      test.isTrue(this.__standard_rendered_ok__);
      return cb();
    });
    div = render(Template['testStandardCallbacksCompatibility']);
    return div.remove();
  });

  Tinytest.addAsync('attach rendered callback to multiple templates at once', function(test, cb) {
    var fail_timeout, _multiple_callback_log;
    fail_timeout = setTimeout(function() {
      test.fail({
        message: 'Timed out!'
      });
      return cb();
    }, 1000);
    _multiple_callback_log = [];
    Template.rendered('testMultipleTemplates1', 'testMultipleTemplates2', 'testMultipleTemplates3', function() {
      _multiple_callback_log.push(true);
      if (_multiple_callback_log.length === 3) {
        clearTimeout(fail_timeout);
        test.ok();
        return cb();
      }
    });
    render(Template['testMultipleTemplates1']);
    render(Template['testMultipleTemplates2']);
    return render(Template['testMultipleTemplates3']);
  });

}).call(this);

//# sourceMappingURL=multiple-callbacks-test.map

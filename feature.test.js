require('./feature');

describe('.testAll()', () => {
  beforeAll(() => {
    window.feature.testAll();
  });

  test('test classnames are added to documentElement', () => {
    const classes = document.documentElement.className;

    expect(classes.includes('js')).toBe(true);

    for (var test in window.feature) {
      if (test === 'testAll') { continue; }

      if (['testAll', 'extend'].includes(test)) {
        expect(classes).not.toMatch(new RegExp(test, 'i'));
      } else if (window.feature[test]) {
        expect(classes).toMatch(new RegExp(test, 'i'));
      } else {
        expect(classes).not.toMatch(new RegExp(test, 'i'));
      }
    }
  });
});

describe('.extend()', () => {
  test('additional feature tests can be added', () => {
    window.feature.extend('foo', function () {
      return true;
    });

    window.feature.extend('bar', function () {
      return false;
    });

    window.feature.extend('baz', function () {
      return 'not a boolean';
    });

    window.feature.extend('qux', function () {});

    expect(window.feature.foo).toBe(true);
    expect(window.feature.bar).toBe(false);
    expect(window.feature.baz).toBe(true);
    expect(window.feature.qux).toBe(false);

    expect(() => window.feature.extend('corge')).toThrow(TypeError);
    expect(() => window.feature.extend('corge')).toThrow('not a Function');

    window.feature.testAll();

    expect(document.documentElement.className.includes('foo')).toBe(true);
    expect(document.documentElement.className.includes('bar')).toBe(false);
  });

  test('utilities are supplied to callback', () => {
    window.feature.extend('foo', function (util) {
      expect(util).toHaveProperty('create');
      expect(util).toHaveProperty('old');
      expect(util).toHaveProperty('pfx');

      expect(util.create('foo')).toBeInstanceOf(HTMLElement);

      expect(util.old).toBe(false);

      expect(util.pfx).toBeInstanceOf(Function);
      expect(util.pfx('bar')).toBeNull();
      expect(util.pfx('min-height')).toMatch(/min-height/);
    });
  });

  test('tests can be overridden', () => {
    // known to be true, thanks to `jest-canvas-mock` package
    expect(window.feature.canvas).toBe(true);

    window.feature.extend('canvas', function () {
      return false;
    });

    expect(window.feature.canvas).toBe(false);
  });

  test('returns an instance', function () {
    const extension = window.feature.extend('foo', function () {
      return true;
    });

    expect(window.feature).toStrictEqual(extension);
    expect(window.feature.foo).toBeDefined();
  });
});

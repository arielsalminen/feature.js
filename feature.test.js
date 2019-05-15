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

      if (['testAll'].includes(test)) {
        expect(classes).not.toMatch(new RegExp(test, 'i'));
      } else if (window.feature[test]) {
        expect(classes).toMatch(new RegExp(test, 'i'));
      } else {
        expect(classes).not.toMatch(new RegExp(test, 'i'));
      }
    }
  });
});

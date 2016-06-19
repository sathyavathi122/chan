import test from 'tape';
import { terminal, readChangelog } from './helpers';

test('test "added" command. Precondition: CHANGELOG.md exists. Does not contain any new change. / Postcondition: A new change is added to the CHANGELOG.md', (t) => {
    t.plan(1);
    const ti = terminal('added', 'changelog_exists', ['super *cool feature*']);
    ti.onFinish((result) => {
        const expected = readChangelog('expected/added/changelog_exists').toString();
        t.deepEqual(result, expected, 'chan added a new change successfully.');
    });
});

test('test "added" command. Precondition: CHANGELOG.md already exists and contains changes added. / Postcondition: A new change is added to the CHANGELOG.md, previous changes are maintaned ok.', (t) => {
    t.plan(1);
    const ti = terminal('added', 'changelog_with_items', ['super *cool feature*']);
    ti.onFinish((result) => {
        const expected = readChangelog('expected/added/changelog_with_items').toString();
        t.deepEqual(result, expected, 'chan added a new change to an already populated CHANGELOG.md.');
    });
});

test('test "added" command. Precondition: CHANGELOG.md already exists but there is no user input. / Postcondition: CHANGELOG.md remains the same.', (t) => {
    t.plan(1);
    const ti = terminal('added', 'changelog_exists');
    ti.onFinish((result) => {
        const expected = null;
        t.deepEqual(result, expected, 'chan does not modify CHANGELOG.md.');
    });
});
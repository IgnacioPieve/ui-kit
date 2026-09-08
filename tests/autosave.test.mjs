import { test } from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { create, act } from 'react-test-renderer';
import { useAutosave } from '../dist/index.js';
function mount(save) {
  let current;
  function Editor() { current = useAutosave(save); return null; }
  let renderer;
  act(() => { renderer = create(React.createElement(Editor)); });
  return { get current() { return current; }, dispose() { act(() => renderer.unmount()); } };
}
test('serializes and coalesces queued saves before flushing', async () => {
  const releases=[];
  let calls=0;
  const editor=mount(() => { calls++; return new Promise(resolve => releases.push(resolve)); });
  act(() => { editor.current.save(); editor.current.save(); editor.current.save(); });
  assert.equal(calls,1);
  assert.equal(editor.current.status,'saving');
  await act(async () => { releases.shift()(); });
  assert.equal(calls,2);
  let flushed=false;
  const flush=editor.current.flush().then(result => { flushed=result; });
  assert.equal(flushed,false);
  await act(async () => { releases.shift()(); await flush; });
  assert.equal(flushed,true);
  assert.equal(editor.current.status,'saved');
  editor.dispose();
});
test('failed saves prevent navigation until a retry succeeds', async () => {
  let fail=true;
  const editor=mount(async () => { if(fail) throw Error('offline'); });
  await act(async () => { editor.current.save(); });
  assert.equal(editor.current.status,'error');
  assert.equal(await editor.current.flush(),false);
  fail=false;
  await act(async () => { editor.current.save(); });
  assert.equal(await editor.current.flush(),true);
  assert.equal(editor.current.status,'saved');
  editor.dispose();
});

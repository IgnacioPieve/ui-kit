import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { createHttpClient, HttpError } from '../dist/index.js';
const originalFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = originalFetch; });
for (const [name, body, status, expected] of [
  ['validation errors', {detail:[{msg:'Required field'},{msg:'Invalid amount'}]},422,'Required field; Invalid amount'],
  ['domain errors', {detail:'Category is in use'},409,'Category is in use'],
  ['unexpected detail', {detail:{reason:'bad'}},500,'HTTP 500'],
  ['empty detail', {detail:[]},400,'HTTP 400'],
]) {
  test(name, async () => {
    globalThis.fetch = async () => new Response(JSON.stringify(body), {status});
    await assert.rejects(createHttpClient().get('/api/items'), error => error instanceof HttpError && error.status === status && error.message === expected);
  });
}
test('non-JSON proxy errors', async () => {
  globalThis.fetch = async () => new Response('<html>Unavailable</html>', {status:503,statusText:'Service Unavailable'});
  await assert.rejects(createHttpClient().get('/api/items'), {message:'Service Unavailable'});
});
test('downloads preserve API error details', async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({detail:'Backup unavailable'}), {status:409});
  await assert.rejects(createHttpClient().download('/api/backup','backup.zip'), {message:'Backup unavailable'});
});
test('empty successful responses', async () => {
  globalThis.fetch = async () => new Response(null, {status:204});
  assert.equal(await createHttpClient().del('/api/items/1'), undefined);
});

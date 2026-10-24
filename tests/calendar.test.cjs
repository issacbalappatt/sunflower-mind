const test = require('node:test');
const assert = require('node:assert/strict');
const calendar = require('../dist/booking.js');
test('February uses leap year rules',()=>{assert.equal(calendar.daysInMonth(2028,1),29);assert.equal(calendar.daysInMonth(2027,1),28);assert.equal(calendar.daysInMonth(2100,1),28)});
test('Calendar starts Monday and pads correctly',()=>{const cells=calendar.monthCells(2026,9);assert.deepEqual(cells.slice(0,4),[null,null,null,1]);assert.equal(cells.at(-1),31);assert.equal(calendar.monthCells(2026,10)[6],1)});
test('India date rolls over before UTC midnight',()=>{assert.equal(calendar.localToday('Asia/Kolkata',new Date('2026-10-24T20:00:00Z')),'2026-10-25');assert.equal(calendar.localToday('Asia/Kolkata',new Date('2026-10-24T18:00:00Z')),'2026-10-24')});
test('Date keys remain chronologically sortable across year boundaries',()=>{assert.equal(calendar.dateKey(2027,0,2),'2027-01-02');assert.ok(calendar.dateKey(2026,11,31)<calendar.dateKey(2027,0,1))});
test('Booking URLs reject insecure and credential-bearing URLs',()=>{assert.equal(calendar.safeBookingUrl('http://cal.com/a'),null);assert.equal(calendar.safeBookingUrl('javascript:alert(1)'),null);assert.equal(calendar.safeBookingUrl('https://user:secret@cal.com/a'),null);assert.equal(calendar.safeBookingUrl(''),null);assert.equal(calendar.safeBookingUrl('https://cal.com/nayana/session').hostname,'cal.com')});

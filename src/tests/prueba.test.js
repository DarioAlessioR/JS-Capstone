/* eslint-disable import/no-duplicates */
/**
 * @jest-environment jsdom
 */
 import sum from '../modules/prueba.js';
 
 
 describe('adds 1 + 2 to equal 3', () => {
   test('add 2 numbers', () => {
    expect(sum(1, 2)).toBe(3);
   });
 });

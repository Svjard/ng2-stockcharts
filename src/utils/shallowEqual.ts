// https://github.com/jonschlinkert/is-equal-shallow/

/*
The MIT License (MIT)

Copyright (c) 2015, Jon Schlinkert.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

function isDate(date: any): boolean {
  return Object.prototype.toString.call(date) === "[object Date]";
}

function isEqual(val1: any, val2: any): boolean {
  return (isDate(val1) && isDate(val2))
    ? val1.getTime() === val2.getTime()
    : val1 === val2;
}

export default function shallowEqual(a: any, b: any): boolean {
  if (!a && !b) {
    return true;
  }
  
  if (!a && b || a && !b) {
    return false;
  }

  let numKeysA: number = 0;
  let numKeysB: number = 0;
  let key: string;
  for (key in b) {
    numKeysB++;
    if (!a.hasOwnProperty(key) || !isEqual(a[key], b[key])) {
      return false;
    }
  }
  
  for (key in a) {
    numKeysA++;
  }
  
  return numKeysA === numKeysB;
}
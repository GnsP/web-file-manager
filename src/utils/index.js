export function interleave (arr, sep) {
  let res = [];
  for (let x of arr) {
    res.push(x);
    res.push(sep);
  }
  return res.slice(0, res.length-1);
}

export function matches (str, pat) {
  return new RegExp(pat).test(str);
}

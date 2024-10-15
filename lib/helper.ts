function uniq(array?: string[]) {
  var seen: { [key: string]: boolean } = {};
  return array?.filter(function (item: string) {
    return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  });
}

export { uniq };

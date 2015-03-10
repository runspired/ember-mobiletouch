export default function (str) {
  var colonIndex = str.indexOf(':');
  if (colonIndex !== -1) {
    return str.substr(0, colonIndex);
  }
  return '';
}

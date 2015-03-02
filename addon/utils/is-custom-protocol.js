import getProtocol from "./get-protocol";

export default function isCustomProtocol(str) {
  var protocol = getProtocol(str);
  return !!protocol && protocol.indexOf('http') !== -1;
}

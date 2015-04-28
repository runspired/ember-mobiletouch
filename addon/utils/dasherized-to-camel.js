// TODO add dependency on `ember-allpurpose` and port these functions there
import capitalize from "./capitalize-word";
import uncapitalize from "./uncapitalize-word";

function dashToWords(s) {
  return s.replace(/-/g, ' ');
}

function capitalizeWords(sentence) {
  return sentence.split(' ')
    .map(function (word) {
      return capitalize(word);
    })
    .join(' ');
}

function stripWhiteSpace(s) {
  return s.replace(/\s/g, '');
}

export default function(s) {
  return uncapitalize(stripWhiteSpace(capitalizeWords(dashToWords(s))));
}

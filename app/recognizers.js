export default function () {

  /**
   * Place your recognizer customizations here
   */

  //this.Manager is a reference to the hammer Manager instance
  //this.Recognizers is a hash of available recognizers
  //   e.g. this.Recognizers.Pan

  //you can add a new recognizer, for instance doubletap, like so
  /*

  ```
  this.recognize('tap', { event : 'doubleTap', taps : 2 });
  this.Recognizers.doubleTap.recognizeWith(this.Recognizers.Tap);
  ```
   */
  //the jQuery event would be `doubletap` and the Ember event would be `doubleTap`


}

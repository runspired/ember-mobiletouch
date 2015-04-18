import Tappable from "../tappable-element/component";

export default Tappable.extend({
    tagName : 'button',
    classNames : ['btn'],
    classNameBindings : ['disabled:disabled:'],
    attributeBindings : ['disabled'],
    disabled : false
});

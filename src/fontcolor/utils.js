const normalizeColorCode = value => {
  return value.replace( /\s/g, '' );
}

// from view to model
const renderUpcastAttribute = styleAttr => {
  return viewElement => normalizeColorCode(viewElement.getStyle(styleAttr));
}

// from model to view
const renderDowncastElement = styleAttr => {
  return (modelAttributeValue, {writer}) => writer.createAttributeElement( 'span', {
    style: `${ styleAttr }:${ modelAttributeValue}`
  }, {priority: 7});
}

const FONT_COLOR = 'fontColor';

export {
  normalizeColorCode,
  renderUpcastAttribute,
  renderDowncastElement,
  FONT_COLOR
}
// allow fontColor being used
import FontColorCommand from './fontcolorcommand';
import { Plugin } from 'ckeditor5/src/core';
import { FONT_COLOR, renderDowncastElement, renderUpcastAttribute } from './utils';

export default class FontColorEditing extends Plugin {
  static get pluginName() {
    return 'FontColorEditing';
  }

  constructor(editor) {
    super(editor);

    // 1) make sure fontColor can be applied to nodes and changes on nodes apply back to model
    editor.conversion.for('upcast').elementToAttribute({
      view: {
        name: 'span',
        styles: {
          'color': /[\s\S]+/
        }
      },
      model: {
        key: FONT_COLOR,
        value: renderUpcastAttribute('color')
      }
    });

    editor.conversion.for('downcast').attributeToElement({
      model: FONT_COLOR,
      view: renderDowncastElement('color')
    });

    // 2) add command
    editor.commands.add(FONT_COLOR, new FontColorCommand(editor));

    // 3) allow fontColor as an attribute like bold/italic/code
    editor.model.schema.extend('$text', { allowAttributes: FONT_COLOR });
    editor.model.schema.setAttributeProperties(FONT_COLOR, {
      isFormatting: true,
      copyOnEnter: true
    });
  }
}





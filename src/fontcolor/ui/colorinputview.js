import {
  FocusCycler,
  InputTextView,
  Template,
  View,
  LabelView,
  LabeledFieldView,
  createLabeledInputText,
  ButtonView
} from 'ckeditor5/src/ui';
import './colorinputview.css';
import hashIcon from './hash.svg';
import checkIcon from './check.svg';

const HEX_COLOR_REGEX = new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$");

// ColorInputView consists of color label, color input and a button
export default class ColorInputView extends View {
  constructor(locale, { color }) {
    super(locale);

    this.set('selectedColor');

    this.set('inputColor'); // color in input field

    this.items = this.createCollection();

    this.setTemplate({
      tag: 'div',
      attributes: {
        class: [
          'ck',
          'ck-color-input-container'
        ]
      },
      children: this.items
    })
    
    this._appendColorInput(locale, color);
    this._appendEnterButton(locale);

    // on change of selectedColor
    this.on('change:selectedColor', (evt, name, selectedColor) => {
      for(const item of this.items) {
        item.selectedColor = selectedColor;
      }
    })
  }

  _appendColorInput(locale, color) {
    const labeledFieldView = new LabeledFieldView(locale, createLabeledInputText);
    labeledFieldView.set({
      label: 'Hex Color'
    })
    // for input
    const fieldView = labeledFieldView.fieldView;
    fieldView.set({
      value: color,
      placeholder: '000000'
    })
    fieldView.delegate('input').to(labeledFieldView);

    // ui
    this.items.add(labeledFieldView);

    // observe selectedColor
    labeledFieldView.set('selectedColor');
    labeledFieldView.on('change:selectedColor', (evt, name, selectedColor) => {
      fieldView.set({
        value: selectedColor ? selectedColor.replace('#', '') : ''
      })
    })

    // listen to input event
    labeledFieldView.on('input', (eventInfo, inputEvent) => {
      const hexColor = `#${inputEvent.target.value}`;
      const isHexColorValid = HEX_COLOR_REGEX.test(hexColor);
      labeledFieldView.set({
        class: isHexColorValid ? '' : 'ck-error'
      })
      this.set('inputColor', isHexColorValid ? hexColor : undefined);
    })
  }

  _appendEnterButton(locale) {
    const buttonView = new ButtonView(locale);
    buttonView.set({
      icon: checkIcon,
    })
    buttonView.bind('isEnabled').to(this, 'inputColor'); // if inputColor is undefined, disable the button

    buttonView.on('execute', () => {
      if (!this.inputColor) return;
      this.fire('execute', { value: this.inputColor });
    })

    this.items.add(buttonView);
  }
}

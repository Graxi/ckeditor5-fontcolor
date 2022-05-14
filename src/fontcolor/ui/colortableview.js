import {
  ColorGridView,
  ColorTileView,
  ButtonView,
  View
} from 'ckeditor5/src/ui';
import { Collection } from 'ckeditor5/src/utils';
import { FONT_COLOR } from '../utils';
import './colortableview.css';
import resetColorIcon from '../../../theme/icons/reset-color.svg';

export default class ColorTableView extends View {
  constructor(locale, colorsConfig) {
    super(locale);

    this.set('selectedColor'); // make selectedColor observable

    this.items = this.createCollection();

    this.setTemplate( {
      tag: 'div',
      attributes: {
        class: [
          'ck',
          'ck-color-table'
        ]
      },
      children: this.items
    });

    // append preset colors grid
    this._createPresetColorsGrid(locale, colorsConfig);

    this.on('change:selectedColor', (evt, name, selectedColor) => {
      for(const item of this.items) {
        item.selectedColor = selectedColor;
      }
    })
  }

  _createPresetColorsGrid(locale, colorsConfig) {
    const { colors, columns } = colorsConfig;
    const presetColorsCollection = new Collection(colors);
    const presetColorsGridView = new ColorGridView(locale, {
      columns,
    });
    presetColorsGridView.extendTemplate({
      attributes: {
        class: [
          'ck-color-grid--custom'
        ]
      }
    })
    // data
    presetColorsGridView.items.bindTo(presetColorsCollection).using(colorObj => {
      const { model, label } = colorObj;
      if (model == '') {
        return this._createRemoveColorButton();
      } else {
        return this._createColorTile(model, label);
      }
    })
    presetColorsCollection.add({
      model: '',
    }, 0)

    // event
    presetColorsGridView.delegate('execute').to(this);

    this.items.add(presetColorsGridView);
  }

  _createColorTile(color, label) {
    const colorTileView = new ColorTileView();
    colorTileView.set({
      color,
      label: label || color,
      tooltip: true,
      class: 'ck-color-grid__tile--custom'
    })
    colorTileView.on('execute', () => {
      this.fire('execute', { value: color });
    });
    return colorTileView;
  }

  _createRemoveColorButton() {
    const resetColorView = new ButtonView();
    resetColorView.set({
      icon: resetColorIcon,
      class: 'ck-reset-color',
      label: 'reset',
      tooltip: true
    })
    resetColorView.delegate('execute').to(this);
    resetColorView.on('execute', () => {
      this.fire('execute', { value: null });
    })
    return resetColorView;
  }
}
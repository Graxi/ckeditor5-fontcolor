import { Plugin } from 'ckeditor5/src/core';
import { FONT_COLOR } from './utils';
import {
  normalizeColorOptions,
  createDropdown,
} from 'ckeditor5/src/ui';
import fontColorIcon from '../../theme/icons/fontcolor.svg';
import ColorTableView from './ui/colortableview';
import ColorInputView from './ui/colorinputview';

export default class FontColorUI extends Plugin {
  constructor(editor) {
    super(editor);
  }

  init() {
    const editor = this.editor;
    const locale = editor.locale;
    const t = locale.t;
    const command = editor.commands.get(FONT_COLOR);

    // Register the UI component
    editor.ui.componentFactory.add(FONT_COLOR, locale => {
      const dropdownView = createDropdown(locale);
      dropdownView.buttonView.set({
        label: t('Font Color'),
        icon: fontColorIcon,
        tooltip: true
      })

      // add preset colors table
      const colors = normalizeColorOptions(editor.config.get(FONT_COLOR).colors);
      const columns = editor.config.get(FONT_COLOR).columns;
      const presetColorsGridView = new ColorTableView(locale, {
        colors,
        columns
      })
      // bind command to change color
      presetColorsGridView.bind('selectedColor').to(command, 'value');
      presetColorsGridView.on('execute', (evt, data) => {
        editor.execute(FONT_COLOR, data);
        editor.editing.view.focus();
      })
      dropdownView.panelView.children.add(presetColorsGridView);


      // custom color input
      const colorInputView = new ColorInputView(locale, {color: ''});
      // bind command to change color
      colorInputView.bind('selectedColor').to(command, 'value');
      colorInputView.on('execute', (evt, data) => {
        editor.execute(FONT_COLOR, data);
        editor.editing.view.focus();
      })
      dropdownView.panelView.children.add(colorInputView);

      dropdownView.buttonView.on('execute', () => {
        //
        editor.editing.view.focus();
      })

      return dropdownView;
    });
  }
}
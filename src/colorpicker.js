// // start with supporting fontColorPicker only
// import { Plugin } from 'ckeditor5/src/core';
// // import { ButtonView } from 'ckeditor5/src/ui';
// import { createDropdown, ColorGridView, ColorTileView, ButtonView, InputView } from 'ckeditor5/src/ui';
// import { Collection } from 'ckeditor5/src/utils';
// import fontColorIcon from '../theme/icons/fontcolor.svg';
// import resetColorIcon from '../theme/icons/reset-color.svg';
// import './colorpicker.css';
// // helpers
// const normalizeColorCode = value => {
// 	return value.replace( /\s/g, '' );
// }

// // from view to model
// const renderUpcastAttribute = styleAttr => {
// 	return viewElement => normalizeColorCode(viewElement.getStyle(styleAttr));
// }

// // from model to view
// const renderDowncastElement = styleAttr => {
// 	return (modelAttributeValue, {writer}) => writer.createAttributeElement( 'span', {
// 		style: `${ styleAttr }:${ modelAttributeValue}`
// 	}, {priority: 7});
// }

// const DEFAULT_COLORS = [
// 	{
// 		color: '#61BD6D'
// 	},
// 	{
// 		color: '#1ABC9C'
// 	},
// 	{
// 		color: '#54ACD2'
// 	},
// 	{
// 		color: '#2C82C9'
// 	},
// 	{
// 		color: '#9365B8'
// 	},
// 	{
// 		color: '#475577'
// 	},
// 	{
// 		color: '#CCCCCC'
// 	},
// 	{
// 		color: '#41A85F'
// 	}
// ];
// const COLOR_GRID_COLUMN = 5;

// // to use command system
// const setColor = (editor, writer, fontColor) => {
// 	const selection = editor.model.document.selection;
// 	if (selection.isCollapsed) {
// 		if (fontColor) {
// 			writer.setSelectionAttribute('fontColor', fontColor);
// 		} else {
// 			writer.removeSelectionAttribute('fontColor');
// 		}
// 	} else {
// 		const ranges = editor.model.schema.getValidRanges(selection.getRanges(), 'fontColor');
// 		for (const range of ranges) {
// 			if (fontColor) {
// 				writer.setAttribute('fontColor', fontColor, range );
// 			} else {
// 				writer.removeAttribute('fontColor', range);
// 			}
// 		}
// 	}
// }

// export default class ColorPicker extends Plugin {
// 	static get pluginName() {
// 		return 'ColorPicker';
// 	}

// 	init() {
// 		const editor = this.editor;
// 		const t = editor.t;
// 		const model = editor.model;

// 		// prepare for setting color
// 		// 1) allow fontColor as an attribute like bold/italic/code
// 		editor.model.schema.extend('$text', {allowAttributes: 'fontColor'});
// 		editor.model.schema.setAttributeProperties('fontColor', {
// 			isFormatting: true,
// 			copyOnEnter: true
// 		});
// 		// 2) make sure fontColor can be applied to nodes and changes on nodes apply back to model
// 		editor.conversion.for('upcast').elementToAttribute( {
// 			view: {
// 				name: 'span',
// 				styles: {
// 					'color': /[\s\S]+/
// 				}
// 			},
// 			model: {
// 				key: 'fontColor',
// 				value: renderUpcastAttribute('color')
// 			}
// 		});

// 		editor.conversion.for('downcast').attributeToElement({
// 			model: 'fontColor',
// 			view: renderDowncastElement('color')
// 		});

// 		editor.ui.componentFactory.add('colorPicker', locale => {
// 			const dropdownView = createDropdown(locale);
// 			dropdownView.buttonView.set({
// 				label: t('Color Picker'),
// 				icon: fontColorIcon,
// 				tooltip: true
// 			})
// 			// dropdown list
// 			const presetColorsCollection = new Collection(DEFAULT_COLORS, { idProperty: 'color'});
// 			const presetColorsGridView = new ColorGridView(locale, {
// 	      columns: COLOR_GRID_COLUMN
//       });
//       presetColorsGridView.extendTemplate({
//       	attributes: {
//           class: [
//           	'ck-color-grid--custom'
//           ]
//         }
//       })
//       presetColorsGridView.items.bindTo(presetColorsCollection).using(colorObj => {
//       	const { color, label } = colorObj;
//       	if (color == 'none') {
//       		// reset color view
//       		const resetColorView = new ButtonView();
//       		resetColorView.set({
//       			icon: resetColorIcon,
//       			class: 'ck-reset-color',
//       			label: 'reset',
//       			tooltip: true
//       		})
//       		resetColorView.on('execute', () => {
//       			model.change(writer => {
//       				setColor(editor, writer, null);
//       			})
//       		})
//       		return resetColorView;
//       	} else {
// 	      	const colorTileView = new ColorTileView();
// 	      	colorTileView.set({
// 	      		color,
// 	      		label: label || color,
// 	      		tooltip: true,
// 	      		class: 'ck-color-grid__tile--custom'
// 	      	})
// 				  colorTileView.on('execute', () => {
// 			      model.change(writer => {
// 			      	setColor(editor, writer, color);
// 			      })
// 			    });
// 	      	return colorTileView;
//       	}
//       })
//       presetColorsCollection.add({
//       	color: 'none',
//       	label: 'reset'
//       }, 0)
//       // Todo add focus tracker
//       dropdownView.panelView.children.add(presetColorsGridView);

//       // custom color input
//       const colorInputView = new InputView();
//       // colorInputView.set({
//       // 	label: 'Custom Color',
//       // 	locale,
//       // 	value: ''
//       // })
//       dropdownView.panelView.children.add(colorInputView);

// 			dropdownView.buttonView.on('execute', () => {
// 				//
// 				editor.editing.view.focus();
// 			})

// 			// Insert a text into the editor after clicking the button.
// 			// this.listenTo(dropdownView, 'execute', () => {
// 			// 	model.change( writer => {
// 			// 		const textNode = writer.createText( 'Hello CKEditor 5!' );

// 			// 		model.insertContent( textNode );
// 			// 	} );

// 			// 	editor.editing.view.focus();
// 			// } );

// 			return dropdownView;
// 		} );
// 	}
// }

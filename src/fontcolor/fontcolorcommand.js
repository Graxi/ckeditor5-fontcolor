import { Command } from 'ckeditor5/src/core';
import { FONT_COLOR } from './utils';

// to be added to editor
export default class FontColorCommand extends Command {
	constructor(editor) {
		super(editor);
	}

	refresh() {
		const model = this.editor.model;
		const doc = model.document;
		this.value = doc.selection.getAttribute(FONT_COLOR);
		this.isEnabled = model.schema.checkAttributeInSelection(doc.selection, FONT_COLOR);
	}

	execute(options = {}) {
		const model = this.editor.model;
		const document = model.document;
		const selection = document.selection;

		const value = options.value;

		model.change(writer => {
			if (selection.isCollapsed) {
				if (value) {
					writer.setSelectionAttribute(FONT_COLOR, value);
				} else {
					writer.removeSelectionAttribute(FONT_COLOR);
				}
			} else {
				const ranges = editor.model.schema.getValidRanges(selection.getRanges(), FONT_COLOR);
				for (const range of ranges) {
					if (value) {
						writer.setAttribute(FONT_COLOR, value, range );
					} else {
						writer.removeAttribute(FONT_COLOR, range);
					}
				}
			}
		})
	}
}
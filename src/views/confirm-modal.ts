import { Modal, Setting, type App } from "obsidian";

export function showConfirmModal(
	app: App,
	title: string,
	message: string,
	onConfirm: () => void
): void {
	const modal = new ConfirmModal(app, title, message, onConfirm);
	modal.open();
}

class ConfirmModal extends Modal {
	private title: string;
	private message: string;
	private onConfirm: () => void;

	constructor(app: App, title: string, message: string, onConfirm: () => void) {
		super(app);
		this.title = title;
		this.message = message;
		this.onConfirm = onConfirm;
	}

	onOpen(): void {
		const { contentEl } = this;
		contentEl.createEl("h3", { text: this.title });
		contentEl.createEl("p", { text: this.message });

		new Setting(contentEl)
			.addButton((btn) =>
				btn
					.setButtonText("Cancel")
					.onClick(() => this.close())
			)
			.addButton((btn) =>
				btn
					.setButtonText("Confirm")
					.setWarning()
					.onClick(() => {
						this.close();
						this.onConfirm();
					})
			);
	}

	onClose(): void {
		this.contentEl.empty();
	}
}

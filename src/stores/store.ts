import { defineStore } from 'pinia';

export interface GrzObject {
	id: number;
	text: string;
	rect: [number, number, number, number];
	confidence: number;
}

export interface GrzResponse {
	requestId: string;
	time: {
		preprocess: number;
		inference: number;
		postprocess: number;
	};
	objectCount: number;
	objects: GrzObject[];
}

export const useGrzStore = defineStore('grz', {
	state: () => ({
		imageBase64: '' as string,
		result: null as GrzResponse | null,
		error: '' as string,
	}),
	actions: {
		setImage(base64: string) {
			this.imageBase64 = base64;
		},
		setResult(result: GrzResponse | null) {
			this.result = result;
		},
		setError(error: string) {
			if (error) {
				this.error = error;
			}
		},
		clear() {
			this.result = null; // оставляем изображение
			this.error = '';
		},
	},
});

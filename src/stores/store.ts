import { defineStore } from 'pinia';

export interface GrzObject {
	id: number[];
	text: string;
	rect: [number, number, number, number];
	confidence: number;
}

export interface GrzResponse {
	requstId: string;
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
	}),
	actions: {
		setImage(base64: string) {
			this.imageBase64 = base64;
		},
		setResult(result: GrzResponse) {
			this.result = result;
		},
		clear() {
			this.imageBase64 = '';
			this.result = null;
		},
	},
});

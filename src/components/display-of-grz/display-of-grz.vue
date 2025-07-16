<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useGrzStore } from '@/stores/store';

const store = useGrzStore();
const fileInput = ref<HTMLInputElement | null>(null);
const error = ref<string>('');

const width = 650;
const height = 500;
const padding = 200;

const imageSrc = computed(() =>
	store.imageBase64 ? `data:image/jpeg;base64,${store.imageBase64}` : '',
);

const handleFileChange = async (e: Event) => {
	const file = (e.target as HTMLInputElement).files?.[0];
	if (!file) return;

	const reader = new FileReader();
	reader.onload = () => {
		const base64 = (reader.result as string).split(',')[1];
		store.setImage(base64);
	};
	reader.readAsDataURL(file);
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const getBoxStyle = (rect: [number, number, number, number]) => {
	let [x, y, w, h] = rect;

	let left = clamp(x - w / 2, padding, width - padding - w);
	let top = clamp(y - h / 2, padding, height - padding - h);
	let boxWidth = clamp(w, 0, width - padding * 2);
	let boxHeight = clamp(h, 0, height - padding * 2);

	return {
		left: `${left}px`,
		top: `${top}px`,
		width: `${boxWidth}px`,
		height: `${boxHeight}px`,
	};
};

const getTextStyle = (rect: [number, number, number, number]) => {
	let [x, y, w, h] = rect;
	let left = clamp(x - w / 2, padding, width - padding - w);
	let top = clamp(y - h / 2 - 30, padding, height - padding - h);
	return {
		left: `${left}px`,
		top: `${top}px`,
	};
};
</script>

<template>
	<div class="upload-container" v-if="!store.imageBase64">
		<input
			ref="fileInput"
			type="file"
			accept="image/*"
			@change="handleFileChange"
			class="upload-input"
		/>
	</div>

	<div class="upload-image">
		<img
			v-if="store.imageBase64"
			:src="imageSrc"
			alt="Загруженное изображение"
			class="preview-image"
			:width="width"
			:height="height"
			draggable="false"
		/>

		<template v-if="store.result?.objects?.length && store.imageBase64">
			<template v-for="(obj, idx) in store.result.objects" :key="obj.id">
				<div class="overlay-rect" :style="getBoxStyle(obj.rect)"></div>
				<div class="overlay-label" :style="getTextStyle(obj.rect)">
					<span class="overlay-number">{{ obj.text }}</span>
					<span class="overlay-confidence">
						({{ (obj.confidence * 100).toFixed(1) }}%)
					</span>
				</div>
			</template>
		</template>
	</div>
</template>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.upload-container {
	width: 650px;
	height: 500px;
	position: relative;
	border: 2px dashed $border-color;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
}
.upload-image {
	width: 650px;
	height: 500px;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
}

.upload-input {
	width: 100%;
	height: 100%;
	cursor: pointer;
	opacity: 0;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
}

.upload-container::before {
	content: 'Выберите изображение';
	position: absolute;
	color: $border-color;
	font-size: 14px;
	text-align: center;
	pointer-events: none;
	z-index: 0;
	width: 100%;
	text-align: center;
	opacity: 0.8;
}
.upload-input:focus + .upload-container::before,
img.preview-image + .upload-container::before {
	display: none;
}

.preview-image {
	width: 100%;
	height: 100%;
	object-fit: contain;
	user-select: none;
	-webkit-user-drag: none;
}

.overlay-rect {
	position: absolute;
	border: 3px solid #ff3b3b;
	border-radius: 4px;
	box-shadow: 0 0 8px 2px rgba(255, 59, 59, 0.2);
	pointer-events: none;
	z-index: 10;
}

.overlay-label {
	position: absolute;
	top: 0;
	left: 0;
	transform: translateY(-100%);
	background: rgba(0, 0, 0, 0.72);
	color: #fff;
	padding: 4px 8px;
	border-radius: 4px 4px 4px 0;
	font-size: 14px;
	font-family: 'SF Mono', 'Fira Mono', 'Menlo', monospace;
	display: flex;
	gap: 8px;
	align-items: center;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
	z-index: 15;
	pointer-events: none;
}
.overlay-number {
	font-weight: 600;
	letter-spacing: 1px;
	font-size: 15px;
}
.overlay-confidence {
	color: #87ffb7;
	font-size: 13px;
	font-weight: 400;
}
</style>

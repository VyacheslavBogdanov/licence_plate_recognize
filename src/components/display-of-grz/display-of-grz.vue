<script setup lang="ts">
import { ref, computed } from 'vue';
import { useGrzStore } from '@/stores/store';

const store = useGrzStore();
const fileInput = ref<HTMLInputElement | null>(null);
const imageSrc = computed(() =>
	store.imageBase64 ? `data:image/jpeg;base64,${store.imageBase64}` : '',
);

// Размеры области (как и прежде)
const width = 650;
const height = 500;

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

// Рисуем рамку: rect = [xc, yc, w, h], абсолютные пиксели для 300x300
const getBoxStyle = (rect: [number, number, number, number]) => {
	const [x, y, w, h] = rect;
	return {
		left: `${x - w / 2}px`,
		top: `${y - h / 2}px`,
		width: `${w}px`,
		height: `${h}px`,
	};
};
// Для размещения подписи
const getTextStyle = (rect: [number, number, number, number]) => {
	const [x, y, w, h] = rect;
	return {
		left: `${x - w / 2}px`,
		top: `${y - h / 2 - 30}px`,
	};
};
</script>

<template>
	<div class="upload-container" style="position: relative">
		<img
			v-if="store.imageBase64"
			:src="imageSrc"
			alt="Загруженное изображение"
			class="preview-image"
			:width="width"
			:height="height"
		/>
		<input
			v-else
			ref="fileInput"
			type="file"
			accept="image/*"
			@change="handleFileChange"
			class="upload-input"
		/>

		<!-- Рамки и подписи поверх изображения -->
		<template v-if="store.result?.objects?.length && store.imageBase64">
			<template v-for="(obj, idx) in store.result.objects" :key="obj.id">
				<!-- Красная рамка -->
				<div class="overlay-rect" :style="getBoxStyle(obj.rect)"></div>
				<!-- Подпись -->
				<div class="overlay-label" :style="getTextStyle(obj.rect)">
					<span class="overlay-number">{{ obj.text }}</span>
					<span class="overlay-confidence"
						>({{ (obj.confidence * 100).toFixed(1) }}%)</span
					>
				</div>
			</template>
		</template>
	</div>
</template>

<style lang="scss" scoped>
.upload-container {
	width: 650px;
	height: 500px;
	position: relative;
	border: 2px dashed #ccc;
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
	color: #888;
	font-size: 14px;
	text-align: center;
	pointer-events: none;
	z-index: 0;
}
.preview-image {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

/* ==== Стили поверх изображения ==== */
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

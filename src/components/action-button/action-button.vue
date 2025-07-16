<script setup lang="ts">
import { computed } from 'vue';
import { useGrzStore } from '@/stores/store';
import { v4 as uuidv4 } from 'uuid';

const HOST_URL = import.meta.env.VITE_HOST_URL;

const store = useGrzStore();

const fetchResult = async () => {
	if (!store.imageBase64) return;
	try {
		const uuid = uuidv4();
		const response = await fetch(`${HOST_URL}/predict`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				requestId: uuid,
				image: store.imageBase64,
				imageType: 'jpeg',
			}),
		});
		const result = await response.json();
		store.setResult(result);
	} catch (error) {
		console.error(error);
		store.setError('Ошибка изображения. Пожалуйста попробуйте другое.');
	}
};

const hasResult = computed(() => !!store.result?.objects?.length);
const clear = () => store.clear();
</script>

<template>
	<div class="action-button">
		<button v-if="hasResult && store.imageBase64" class="clear" @click="clear">
			<span class="clear__name">Очистить</span>
		</button>
		<button
			v-if="!hasResult && store.imageBase64"
			class="detect"
			@click="fetchResult"
			:disabled="!store.imageBase64"
		>
			<span class="detect__name">Распознать</span>
		</button>
	</div>
</template>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.action-button {
	width: 200px;
	height: 100px;
	min-width: 200px;
	min-height: 100px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.clear {
	position: relative;
	height: 50px;
	padding: 0 30px;
	color: #513d3d;
	border: $border-width solid #513d3d;
	background-color: $color-bg;
	border-radius: $border-radius;
	user-select: none;
	white-space: nowrap;
	transition: all 0.05s linear;
	font-family: inherit;
	margin: 20px 0 20px 10px;

	&:hover {
		cursor: pointer;
		border-color: $border-color;
		color: $border-color;
	}

	&:active {
		transform: scale(0.97);
	}

	&__name {
		font-size: 25px;
		z-index: 3;
		position: relative;
		font-weight: 500;
	}
}

.detect {
	position: relative;
	height: 50px;
	padding: 0 30px;
	color: #513d3d;
	border: $border-width solid #513d3d;
	background-color: $color-bg;
	border-radius: $border-radius;
	user-select: none;
	white-space: nowrap;
	transition: all 0.05s linear;
	font-family: inherit;
	margin: 20px 0 20px 10px;

	&:before,
	&:after {
		content: '';
		position: absolute;
		background-color: $color-bg;
		transition: all 0.2s linear;
	}

	&:before {
		width: calc(100% + 6px);
		height: calc(100% - 16px);
		top: 8px;
		left: -3px;
	}

	&:after {
		width: calc(100% - 16px);
		height: calc(100% + 6px);
		top: -3px;
		left: 8px;
	}

	&:hover {
		cursor: pointer;
		border-color: rgb(227, 52, 25);
		color: rgb(227, 52, 25);

		&:before {
			height: calc(100% - 32px);
			top: 16px;
		}

		&:after {
			width: calc(100% - 32px);
			left: 16px;
		}
	}

	&:active {
		transform: scale(0.97);
	}

	&__name {
		font-size: 25px;
		z-index: 3;
		position: relative;
		font-weight: 500;
	}
}
</style>

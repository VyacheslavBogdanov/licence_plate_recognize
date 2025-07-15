<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const fetchResult = async () => {
	try {
		const uuid = uuidv4();
		const response = await fetch('http://localhost:3000/predict', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				requestId: uuid,
				image: '123',
			}),
		});
		const result = await response.json();
		console.log(result);
	} catch (error) {
		console.error(error);
	}
};

// const props = defineProps<{
// 	status: string;
// 	fireRects: { top: number; left: number; width: number; height: number }[];
// }>();

// const emit = defineEmits<{
// 	(event: 'sendRequest'): void;
// 	(event: 'clearPreview'): void;
// }>();

// const hasFireRects = computed(() => props.fireRects.length > 0);
const hasFireRects = computed(() => 0 > 0);

onMounted(fetchResult);
</script>

<template>
	<button v-if="hasFireRects" class="clear">
		<span class="clear__name">Очистить</span>
	</button>
	<button v-else class="fire-detect">
		<span class="fire-detect__name">Распознать</span>
	</button>
</template>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

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

.fire-detect {
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

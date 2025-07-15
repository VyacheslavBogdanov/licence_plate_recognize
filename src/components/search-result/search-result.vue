<script setup lang="ts"></script>

<template>
	<div v-if="1 > 0" :class="['result', 'result--fire']">
		<div class="result__icon">ⓘ</div>
		<span>Автомобиль обнаружен</span>
	</div>
</template>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.middle-elements {
	height: 50px;
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 40px 0 40px 0;

	@media (max-width: 1250px) {
		flex-direction: column;
		height: 110px;
	}
}

.preview {
	max-width: 740px;
	height: 400px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	overflow: hidden;
	border: 1px solid #ddd;
	border-radius: $border-radius;

	&__img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	&__rect {
		position: absolute;
		border: 2px solid red;
		box-sizing: border-box;
	}

	&__confidence {
		position: absolute;
		text-align: center;
		font-size: 12px;
		background: rgba(255, 255, 255, 0.8);
		color: red;
		padding: 2px 4px;
		border-radius: 4px;
		transform: translateY(-100%);
	}
}

.result {
	position: relative;
	display: flex;
	align-items: center;
	padding: 10px 30px 10px 40px;
	border-radius: $border-radius;
	max-width: fit-content;
	word-wrap: break-word;
	font-size: 23px;
	height: 40px;
	opacity: 0.85;
	margin: 20px 0;

	@media (max-width: 835px) {
		font-size: 17px;
	}

	&__icon {
		display: flex;
		position: absolute;
		left: 10px;
		height: 30px;
	}

	&--fire {
		background-color: #e0fde7;
		color: $color-success;
	}

	&--no-fire {
		background-color: #f2dee0;
		color: $color-error;
	}

	&--info {
		background-color: #e3e3ff;
		color: $color-primary;
	}
}
</style>

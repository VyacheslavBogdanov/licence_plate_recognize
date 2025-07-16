<script setup lang="ts"></script>

<template>
	<div>
		<div :class="['health', 'health--success']">
			<div class="health__icon">ⓘ</div>
			<span>Модуль включен</span>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.health {
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

	&--success {
		background-color: #e0fde7;
		color: $color-success;
	}

	&--warning {
		background-color: #f9ebd8;
		color: $color-warning;
	}
}
</style>

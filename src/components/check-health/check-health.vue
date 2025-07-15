<script setup lang="ts">
import { onMounted } from 'vue';
// import type { MessageType } from '../utils/types';

// const props = defineProps<{
// 	messageTypes: MessageType[];
// 	status: string;
// }>();

// const filteredMessageTypes = computed(() => {
// 	if (props.status === 'active') {
// 		return props.messageTypes.filter((type) => type.class === 'health--success');
// 	}
// 	return props.messageTypes.filter((type) => type.class === 'health--warning');
// });
</script>

<template>
	<div>
		<!-- <div
			v-for="(type, index) in filteredMessageTypes"
			:key="index"
			:class="['health', type.class]"
		>
			<div class="health__icon">ⓘ</div>
			<span>{{ type.message }}</span>
		</div> -->
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

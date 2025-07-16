<script setup lang="ts">
import ActionButton from './components/action-button/action-button.vue';
import CheckHealth from './components/check-health/check-health.vue';
import DisplayOfGrz from './components/display-of-grz/display-of-grz.vue';
import SearchResult from './components/search-result/search-result.vue';
</script>

<template>
	<div id="app">
		<!-- <div class="app"> -->
		<CheckHealth />
		<ActionButton />
		<DisplayOfGrz />
		<SearchResult />
		<!-- </div> -->
	</div>
</template>

<style lang="scss" scoped>
@import './styles/variables.scss';

#app {
	min-width: 550px;
	height: 3000px;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #f9f9f9;

	// .app {
	// width: 50%;
	// height: 100%;
	// display: flex;
	// align-items: center;
	// flex-direction: column;
	// font-family: sans-serif;
	// background-color: $color-bg;
	// margin: 1%;
	// padding: 20px;
	// border: $border-width solid $border-color;
	// border-radius: $border-radius;
	// }
}
</style>

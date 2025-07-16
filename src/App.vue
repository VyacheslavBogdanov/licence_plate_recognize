<script setup lang="ts">
import ActionButton from './components/action-button/action-button.vue';
import CheckHealth from './components/check-health/check-health.vue';
import DisplayOfGrz from './components/display-of-grz/display-of-grz.vue';
import SearchResult from './components/search-result/search-result.vue';
</script>

<template>
	<div id="app">
		<CheckHealth />
		<ActionButton />
		<DisplayOfGrz />
		<SearchResult />
	</div>
</template>

<style lang="scss" scoped>
#app {
	min-width: 550px;
	height: 3000px;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #f9f9f9;
}
</style>

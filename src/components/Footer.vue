<template>
	<el-footer class="footer">
		<div id="footer-copyright">CopyRight © 2020-{{ currentYear }} 翼爪龙联</div>
		<a href="https://beian.miit.gov.cn/">粤ICP备20009202号</a>
	</el-footer>
</template>

<style scoped lang="scss">
.footer {
	text-align: center;
}
</style>

<script>
export default {
	data() {
		return {
			currentYear: 0,
		}
	},
	mounted() {
		const date = new Date();
		this.currentYear = date.getFullYear();
	},
};
</script>
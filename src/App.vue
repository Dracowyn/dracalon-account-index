<script setup>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import Hero from "@/components/Hero.vue";
</script>

<template>
	<el-config-provider>
		<!--导航栏-->
		<NavBar/>
		<el-main>
			<!--第一个内容-->
			<Hero/>
		</el-main>
		<!--    <el-main class="bg-gray">-->
		<!--      <div class="grid-cols-2">-->
		<!--        <div class="text-left">-->
		<!--          <h2>设置您的账户资料与密码</h2>-->
		<!--          <p>快捷编辑您的用户名和电子邮箱等信息</p>-->
		<!--          <ul>-->
		<!--            <li>确保您的用户名独一无二</li>-->
		<!--            <li>用户名和电子邮箱均可用于登录</li>-->
		<!--            <li>随时更新您的用户名与电子邮箱、密码，提高安全性</li>-->
		<!--          </ul>-->
		<!--        </div>-->
		<!--        <div class="img-right">-->
		<!--&lt;!&ndash;          <el-icon>&ndash;&gt;-->
		<!--&lt;!&ndash;            <StarFilled/>&ndash;&gt;-->
		<!--&lt;!&ndash;          </el-icon>&ndash;&gt;-->
		<!--          <IconFeature1/>-->
		<!--        </div>-->
		<!--      </div>-->
		<!--    </el-main>-->
		<!--也许后边要用上Vue-route-->

		<Footer/>
	</el-config-provider>
</template>

<script>
import {defineComponent} from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default defineComponent({
	data() {
		return {
			loadingInstance: null,
			timeoutId: null,
		};
	},
	created() {
		NProgress.start()
	},
	mounted() {
		// 全屏加载
		// this.loadingInstance = ElLoading.service({
		//   lock: true,
		//   spinner: 'none',
		//   // text: "Loading",
		//   // 改进为透明遮罩
		//   background: "rgba(0, 0, 0, 0)",
		// })
		// 如果超时了就重置下全屏加载
		this.timeoutId = setTimeout(() => {
			console.error("Keycloak init timeout")
			// this.loadingInstance.close()
			this.loadingInstance = ElNotification({
				title: 'Error',
				message: 'Backend service init timeout, please refresh the page.',
				type: 'error',
				duration: 0,
			})
			NProgress.done()
		}, 5000)

		console.log("Keycloak init")
		// 监听 this.$keycloak.ready 的变化
		this.$watch("$keycloak.ready", (ready) => {
			if (ready) {
				console.log("Keycloak ready:", ready)
				clearTimeout(this.timeoutId);
				this.hideLoading()
			}
		})

		// 避免因为一些刷新的情况导致全屏加载再次被开启
		if (this.$keycloak.ready) {
			clearTimeout(this.timeoutId);
			this.hideLoading()
		}
	},
	methods: {
		// 关闭全屏加载
		hideLoading() {
			// if (this.loadingInstance) {
			// 	this.loadingInstance.close();
			// }
			NProgress.done()

			// 清除#iss，避免刷新页面时再次跳转到登录页
			let url = window.location.href
			let index = url.indexOf('#iss')
			if (index !== -1) {
				console.log("Clear #iss")
				url = url.substring(0, index)
				window.history.replaceState({}, document.title, url)
			}
		},
	},
})

</script>

<style scoped lang="scss">
.el-main {
	width: 100%;
	display: flex;
	justify-content: center;
}

//.bg-gray {
//  background: var(--el-color-primary-light-9);
//  margin-bottom: 20px;
//}
//.grid-cols-2 {
//  display: grid;
//  grid-template-columns: repeat(2, minmax(0, 1fr));
//  gap: 4rem;
//  align-items: center;
//  max-width: 1280px;
//
//  .text-left {
//    font-size: 1.125rem;
//    line-height: 1.75rem;
//  }
//
//  .img-right {
//    display: flex;
//    justify-content: center;
//    .el-icon {
//      max-width: 100%;
//      height: auto;
//      width: auto;
//    }
//
//    svg {
//      color: #409eff;
//      max-width: 100%;
//      width: 100%;
//      height: 100%;
//      display: flex;
//    }
//
//  }
//}
</style>

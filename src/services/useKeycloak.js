export default {
	data() {
		return {
			kcLoading: true,
			kcButtonDisabled: true,
		};
	},
	mounted() {
		const onKeycloakReady = (ready) => {
			if (ready) {
				this.kcButtonDisabled = false;
				this.kcLoading = false;
			}
		};

		// 监听 $keycloak.ready 变化
		this.$watch("$keycloak.ready", onKeycloakReady);

		// 如果 $keycloak 已经准备就绪，则立即执行操作
		if (this.$keycloak.ready) {
			onKeycloakReady(true);
		}

		// 设置超时时间，超时后取消加载状态
		const kcTimeout = setTimeout(() => {
			this.kcLoading = false;
			clearTimeout(kcTimeout);
		}, 5000);
	},
	beforeUnmount() {
		// 在组件销毁前取消监听
		this.$watch("$keycloak.ready", null);
	},
};

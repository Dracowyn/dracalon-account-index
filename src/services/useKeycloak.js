export default {
	data() {
		return {
			kcLoading: true,
		};
	},
	mounted() {
		this.$watch("$keycloak.ready", (ready) => {
			if (ready) {
				this.kcLoading = false;
			}
		});

		if (this.$keycloak.ready) {
			this.kcLoading = false;
		}
	},
};
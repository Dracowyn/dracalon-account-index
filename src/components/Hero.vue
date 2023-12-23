<script setup>
import IconLogo from "@/components/icons/IconLogo.vue"

</script>
<template>
	<el-container direction="vertical" class="hero-container">
		<el-container class="hero-wrapper">
			<el-container direction="vertical" class="left">
				<h1>{{ $t("message.siteName") }}<br>{{ $t("message.heroTitle") }}</h1>
				<p>{{ $t("message.heroDescription") }}</p>
				<div>
					<el-container class="col-gap">
						<div v-if="$keycloak.authenticated">
							<el-link
								href="https://account.dracalon.com/realms/dracalon/account"
								:underline="false">
								<el-button size="large" type="success">
									{{ $t("message.accountConsole") }}
								</el-button>
							</el-link>
						</div>
						<div class="col-gap" v-else>
							<el-link
								@click="$keycloak.login"
								:underline="false"
								:disabled="kcLoading">
								<el-button
									size="large" type="primary"
									id="loginButton"
									:loading="kcLoading"
									:disabled="kcLoading">
									{{ $t("message.login") }}
								</el-button>
							</el-link>
							<el-link
								href="https://account.dracalon.com/realms/dracalon/account"
								:underline="false">
								<el-button size="large" type="success">
									{{ $t("message.accountConsole") }}
								</el-button>
							</el-link>
						</div>
						<!--            <el-link href="https://account.dracalon.com/realms/dracalon/account" :underline="false">-->
						<!--              <el-button size="large" type="primary">{{ $t("message.register") }}</el-button>-->
						<!--            </el-link>-->
						<el-link href="https://www.dracalon.com/" :underline="false">
							<el-button size="large" type="warning">
								{{ $t("message.documentation") }} ✨
							</el-button>
						</el-link>
					</el-container>
				</div>
			</el-container>
			<el-aside class="logo">
				<IconLogo/>
			</el-aside>
		</el-container>

	</el-container>
</template>

<style scoped lang="scss">
.hero-container {
	margin: auto;
	align-items: center;

	.hero-wrapper {
		display: grid;
		gap: 0;
		max-width: 1280px;
		grid-template-columns: repeat(12, minmax(0, 1fr));

		& > .el-container {
			flex: unset;
		}

		.logo {
			width: unset;
			grid-column: span 5 / span 5;

			svg {
				color: #409eff;
				max-width: 100%;
			}

			//img {
			//  max-width: 100%;
			//}
		}

		.left {
			//margin-left: 1rem;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			grid-column: span 7 / span 7;
			place-self: center;

			h1 {
				font-size: 3.75rem;
				line-height: 1;
				margin-bottom: 2rem;
			}

			p {
				font-size: 1.25rem;
				line-height: 1.75rem;
				margin-bottom: 1.5rem;
			}

			.col-gap {
				display: flex;
				column-gap: 1rem;
			}
		}
	}
}


@media screen and (max-width: 1024px) {
	.hero-container {
		.hero-wrapper {
			gap: 2rem;
		}
	}
}

@media screen and (max-width: 768px) {
	.hero-container {
		.hero-wrapper {
			grid-template-columns: unset;

			.logo {
				display: none;
			}

			.left {
				grid-column: unset;

				h1 {
					font-size: 2.25rem;
					margin-bottom: 1rem;
				}

				p {
					font-weight: 300;
				}
			}

		}
	}
}
</style>

<script>
// import {defineComponent} from 'vue'
// export default defineComponent({
//   data() {
//     return {
//       keycloakLoading: true,
//     }
//   },
//   mounted () {
//     // console.log(this.$keycloak && this.$keycloak.ready)
//     this.keycloakLoading = !this.$keycloak && !this.$keycloak.ready
//   }
// });
import {defineComponent} from 'vue'

export default defineComponent({
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
		})

		if (this.$keycloak.ready) {
			this.kcLoading = false;
		}
	},
})
</script>
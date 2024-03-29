<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

// 获取浏览器是否为暗黑模式
const isDarkModePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;

// 从localStorage中获取暗黑模式设置，如果没有设置，则使用浏览器默认值
const localDarkMode = localStorage.getItem('darkMode');
const isDark = ref(localDarkMode ? localDarkMode === 'true' : isDarkModePreferred);

// 初始化暗黑模式
const initDarkMode = () => {
	const html = document.querySelector('html');
	html.classList.toggle('dark', isDark.value);
};

// 切换暗黑模式
const toggleDark = () => {
	isDark.value = !isDark.value;
	localStorage.setItem('darkMode', isDark.value.toString());
	// 更新页面样式
	updatePageStyle();
};

// 更新页面样式
const updatePageStyle = () => {
	const html = document.querySelector('html');
	html.classList.toggle('dark', isDark.value);
};

// i18n国际化
const { locale } = useI18n();

// 初始化语言
const initLanguage = () => {
	const localLang = localStorage.getItem('lang');
	if (localLang) {
		locale.value = localLang;
	}
};

// 改变语言
const changeLang = (val) => {
	locale.value = val;
	localStorage.setItem('lang', val);
};

// 默认activeIndex
const activeIndex = ref('account');

// 在组件挂载后执行初始化操作
onMounted(() => {
	initDarkMode();
	initLanguage();
});
</script>

<template>
	<el-header>
		<el-container class="header-container">
			<el-menu
				mode="horizontal"
				:ellipsis="false"
				background-color="none"
				text-color="var(--color-text)"
				router
				:default-active="activeIndex">
				<el-menu-item index="0">
					<!--          <img-->
					<!--              style="height: 75%"-->
					<!--              src="https://static.dragepic.com/images/common-logo-blue.svg"-->
					<!--              alt="Logo"-->
					<!--          />-->
					<IconLogo class="logo"/>
					<span>{{ $t("message.siteName") }}</span>
				</el-menu-item>
				<el-menu-item index="index">
					<a href="https://www.dracalon.com" target="_blank">{{ $t("message.mainSite") }}</a>
				</el-menu-item>
				<el-menu-item index="bbs">
					<a href="https://bbs.dracalon.com/" target="_blank">{{ $t("message.community") }}</a>
				</el-menu-item>
				<el-menu-item index="wiki">
					<a href="https://www.dra.wiki/" target="_blank">{{ $t("message.wiki") }}</a>
				</el-menu-item>
				<el-menu-item index="img">
					<a href="https://img.dracalon.com/" target="_blank">{{ $t("message.imageHosting") }}</a>
				</el-menu-item>
				<el-menu-item index="account">
					<a href="https://account.dracalon.com/">{{ $t("message.stargate") }}</a>
				</el-menu-item>
				<div class="flex-grow"/>
				<el-sub-menu index="0">
					<template #title>
						<el-icon>
							<Operation/>
						</el-icon>
					</template>
					<el-menu-item index="0">
						<a href="https://www.dracalon.com" target="_blank">{{ $t("message.mainSite") }}</a>
					</el-menu-item>
					<el-menu-item index="0">
						<a href="https://bbs.dracalon.com/" target="_blank">{{ $t("message.community") }}</a>
					</el-menu-item>
					<el-menu-item index="0">
						<a href="https://www.dra.wiki/" target="_blank">{{ $t("message.wiki") }}</a>
					</el-menu-item>
					<el-menu-item index="0">
						<a href="https://img.dracalon.com/" target="_blank">{{ $t("message.imageHosting") }}</a>
					</el-menu-item>
					<el-menu-item index="0">
						<a href="https://account.dracalon.com/">{{ $t("message.stargate") }}</a>
					</el-menu-item>
					<el-menu-item index="0">
						<a href="https://account.dracalon.com/realms/dracalon/account"
						   target="_blank">{{ $t("message.login") }}</a>
					</el-menu-item>
				</el-sub-menu>
			</el-menu>
			<el-dropdown>
        		<span class="el-dropdown-link">
					<IconLanguage/>
					<el-icon class="el-icon--right">
						<arrow-down/>
        			</el-icon>
        		</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item @click="changeLang('zh-CN')">中文</el-dropdown-item>
						<el-dropdown-item @click="changeLang('en-US')">English</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>

			<!--      <el-button link class="loginButton">-->
			<!--        <el-link href="https://account.dracalon.com/realms/dracalon/account" :underline="false">-->
			<!--          {{ $t("message.register") }}-->
			<!--        </el-link>-->
			<!--      </el-button>-->

			<el-button
				text class="switch"
				:class="isDark ? 'isDark-switch' : 'noDark-switch'"
				@click="toggleDark">
				<el-icon v-if="isDark">
					<IconLight/>
				</el-icon>
				<el-icon v-else>
					<IconDark/>
				</el-icon>
			</el-button>
			<div>
				<el-container v-if="$keycloak.authenticated" class="user-info">
					<el-button link class="loginButton">
						{{ $t("message.welcome") }}:{{ $keycloak.idTokenParsed.preferred_username }}
					</el-button>
					<el-link href="https://account.dracalon.com/realms/dracalon/account" :underline="false">
						<el-button class="loginButton" type="success">
							{{ $t("message.accountConsole") }}
						</el-button>
					</el-link>
					<el-button @click="$keycloak.logoutFn" type="danger">
						{{ $t("message.logout") }}
					</el-button>
				</el-container>
				<el-button
					type="primary"
					@click="$keycloak.login"
					:loading="kcLoading"
					:disabled="kcButtonDisabled"
					v-else>
					{{ $t("message.login") }}
				</el-button>
			</div>
		</el-container>
	</el-header>
</template>

<style scoped lang="scss">
$header-height: 60px;

.el-header {
	width: 100%;
	backdrop-filter: saturate(50%) blur(4px);
	box-shadow: 0 1px 0 var(--el-border-color);
	display: flex;
	justify-content: center;

	.el-menu {
		border-bottom: unset;
		width: 100%;
	}

	.el-dropdown {

		.el-dropdown-link {
			display: flex;
		}
	}

	.header-container {
		max-width: 1280px;
		margin-left: -20px;
		//.logo {
		//  display: flex;
		align-items: center;

		//}
		.el-menu-item {
			span {
				margin-inline-start: 0.7rem;
				font-size: 1rem;
			}
		}

		.logo {
			height: 75%;
			color: #409eff;
		}

		.el-sub-menu {
			display: none;
		}

		.flex-grow {
			flex-grow: 1;
		}

		.user-info {
			column-gap: 10px;
		}
	}

}

//@media screen and (max-width: 1024px) {
//  .el-header {
//      padding: 0 1.5rem;
//  }
//}

@media screen and (max-width: 768px) {
	.el-header {
		//padding: 0 1rem;

		.el-dropdown {
			margin-right: unset;
		}

		.header-container {
			.el-menu-item {
				display: none;
			}

			.el-menu-item:nth-child(1),
			.el-sub-menu {
				display: flex;
			}

			.loginButton {
				display: none;
			}
		}
	}
}
</style>

<script>
import {defineComponent} from 'vue'
import useKeycloak from "@/services/useKeycloak";

export default defineComponent({
	mixins: [useKeycloak],
})
</script>
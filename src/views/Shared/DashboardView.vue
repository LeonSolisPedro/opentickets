<template>
	<div id="kt_app_page" class="app-page  flex-column flex-column-fluid ">
		<header id="kt_app_header" class="app-header">
			<div id="kt_app_header_container"
				class="app-container container-fluid d-flex align-items-stretch justify-content-between">
				<div class="d-flex align-items-center d-lg-none ms-n2 me-2" title="Show sidebar menu">
					<div class="btn btn-icon btn-active-color-primary w-35px h-35px" id="kt_app_sidebar_mobile_toggle">
						<span class="svg-icon svg-icon-1">
							<font-awesome-icon icon="fa-solid fa-bars" />
						</span>
					</div>
				</div>
				<div class="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
					<router-link to="/" class="d-lg-none">
						<img alt="Logo" src="@/assets/media/logos/default-small.svg" class="theme-light-show h-35px" />
						<img alt="Logo" src="@/assets/media/logos/default-small-dark.svg" class="theme-dark-show h-35px" />
					</router-link>
				</div>
				<div class="d-flex align-items-stretch justify-content-between flex-lg-grow-1" id="kt_app_header_wrapper">
					<div>
					</div>
					<div class="app-navbar flex-shrink-0">
						<div class="app-navbar-item ms-1 ms-lg-3" id="kt_header_user_menu_toggle">
							<div class="cursor-pointer symbol symbol-35px symbol-md-40px"
								data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-attach="parent"
								data-kt-menu-placement="bottom-end">
								<img src="@/assets/media/avatars/300-3.jpg" alt="user" />
							</div>
							<div
								class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px"
								v-ktmenu data-kt-menu="true">
								<div class="menu-item px-3">
									<div class="menu-content d-flex align-items-center px-3">
										<div class="symbol symbol-50px me-5">
											<img alt="Logo" src="@/assets/media/avatars/300-3.jpg" />
										</div>
										<div class="d-flex flex-column">
											<div class="fw-bold d-flex align-items-center fs-5">Administrador
												<span class="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2">Admin</span>
											</div>
											<a href="#" class="fw-semibold text-muted text-hover-primary fs-7">admin@admin.com</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
		<div id="kt_app_wrapper" class="app-wrapper  flex-column flex-row-fluid ">
			<aside id="kt_app_sidebar" class="app-sidebar flex-column" v-ktdrawer data-kt-drawer="true"
				data-kt-drawer-name="app-sidebar" data-kt-drawer-activate="{default: true, lg: false}"
				data-kt-drawer-overlay="true" data-kt-drawer-width="225px" data-kt-drawer-direction="start"
				data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle">
				<div class="app-sidebar-logo px-6" id="kt_app_sidebar_logo">
					<router-link to="/">
						<img alt="Logo" src="@/assets/media/logos/default-dark.svg" class="h-40px app-sidebar-logo-default" />
					</router-link>
					<div id="kt_app_sidebar_toggle" class="app-sidebar-toggle btn btn-icon btn-sm h-30px w-30px rotate" v-kttoggle
						data-kt-toggle="true" data-kt-toggle-state="active" data-kt-toggle-target="body"
						data-kt-toggle-name="app-sidebar-minimize">
						<span class="svg-icon rotate-180">
							<font-awesome-icon icon="fa-solid fa-angles-left" />
						</span>
					</div>
				</div>
				<nav class="app-sidebar-menu overflow-hidden flex-column-fluid">
					<div id="kt_app_sidebar_menu_wrapper" class="app-sidebar-wrapper hover-scroll-overlay-y my-5" v-ktscroll
						data-kt-scroll="true" data-kt-scroll-activate="true" data-kt-scroll-height="auto"
						data-kt-scroll-dependencies="#kt_app_sidebar_logo, #kt_app_sidebar_footer" data-kt-scroll-wrappers="#kt_app_sidebar_menu"
						data-kt-scroll-offset="5px">
						<div class="menu menu-column menu-rounded menu-sub-indention fw-semibold px-3" id="#kt_app_sidebar_menu"
							v-ktmenu data-kt-menu="true" data-kt-menu-expand="false">

              <!--#region Administrador -->
							<div class="menu-item">
								<router-link to="/tickets" class="menu-link">
								  <span class="menu-icon">
										<font-awesome-icon icon="fa-solid fa-ticket" />
									</span>
									<span class="menu-title">Tickets</span>
								</router-link>
							</div>
							<div class="menu-item">
								<router-link to="/empleados" class="menu-link">
								  <span class="menu-icon">
										<font-awesome-icon icon="fa-solid fa-user" />
									</span>
									<span class="menu-title">Empleados</span>
								</router-link>
							</div>
							<div class="menu-item">
								<router-link to="/computadoras" class="menu-link">
								  <span class="menu-icon">
										<font-awesome-icon icon="fa-solid fa-computer" />
									</span>
									<span class="menu-title">Computadoras</span>
								</router-link>
							</div>
							<!--#endregion -->
							

						</div>
					</div>
				</nav>
			</aside>
			<main id="kt_app_main" class="app-main flex-column flex-row-fluid">
				<div class="d-flex flex-column flex-column-fluid">
					<section id="kt_app_toolbar" class="app-toolbar py-3 py-lg-6">
						<div id="kt_app_toolbar_container" class="app-container container-xxl d-flex flex-stack">
							<div class="page-title d-flex flex-column justify-content-center flex-wrap me-3">
							</div>
							<div class="d-flex align-items-center">
							</div>
						</div>
					</section>
					<div id="kt_app_content" class="app-content flex-column-fluid">
						<div id="kt_app_content_container" class="app-container container-xxl">
							<router-view />
						</div>
					</div>
				</div>
				<footer id="kt_app_footer" class="app-footer ">
					<div class="app-container container-fluid d-flex flex-column flex-md-row flex-center flex-md-stack py-3">
						<div class="text-dark order-2 order-md-1">
							Hecho con <font-awesome-icon class="text-muted" icon="fa-regular fa-heart" /> en <a
								href="https://vuejs.org/" target="_blank">Vue.js</a>
						</div>
					</div>
				</footer>
			</main>
		</div>
	</div>
</template>

<script>
export default {
  mounted () {
    this.$setupLayout()
  },
  unmounted () {
    this.$destroyLayout()
  },
  //We are redirecting to corresponding dashboards
  RedirectToDashboards() {
    return "RedirectToDashboards";
  },
};
</script>
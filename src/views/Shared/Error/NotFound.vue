<template>
	<div class="card">
		<div class="card-body text-center d-flex flex-column flex-center py-15 px-10 py-lg-15 px-lg-15"
			style="min-height: 67vh">
			<h1 class="fw-bolder fs-2hx text-gray-900 mb-4">¡Oops!</h1>
			<div class="fw-semibold fs-6 text-gray-500 mb-9">No encontramos esa página.</div>
			<div class="mb-9">
				<img src="@/assets/media/auth/404.png" class="theme-light-show" style="width:80%; max-width: 320px" />
				<img src="@/assets/media/auth/404-dark.png" class="theme-dark-show" style="width:80%; max-width: 320px" />
			</div>
			<div class="mb-0">
				<button @click="$router.go(-1)" class="btn btn-sm btn-primary">Regresar</button>
			</div>
		</div>
	</div>
</template>
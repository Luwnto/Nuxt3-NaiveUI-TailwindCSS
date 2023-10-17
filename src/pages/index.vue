<script setup>

/**
 * message
 */
const handleShowMessage = () => {
  msgUtil.$message.error('Show Message Success!')
}

/**
 * dialog
 */
const handleShowDialog = () => {
  msgUtil.$dialog.warning({
    title: 'Title',
    content: 'Content',
    onAfterLeave: () => {
      msgUtil.$message.success('Close Success!')
    }
  })
}

/**
 * loadingBar
 */
const handleShowLoadingBar = () => {
  msgUtil.$loadingBar.start()
  setTimeout(() => {
    msgUtil.$loadingBar.finish()
  }, 500)
}

// pina, don't need to import, nuxt can auto import it
const userInfo = useUserStore()

/*
 * you can change value:
 * userInfo.name = 'Fe2'
 */

// VueUse
const { x, y } = useMouse()

// fetch
const handleLogin = async () => {
  const params = {
    phone: 'phone',
    password: 'password'
  }
  try {
    await apiLogin(params)
  } catch (e) {
  }
}
</script>

<template>
  <div class="container p-8">
    <div class="mb-8">
      <h2 class="text-2xl mb-4">
        NaiveUI
      </h2>
      <n-button
        type="success"
        @click="handleShowMessage"
      >
        Show Message
      </n-button>
      <span class="ml-3" />
      <n-button
        type="success"
        @click="handleShowDialog"
      >
        Show Dialog
      </n-button>
      <span class="ml-3" />
      <n-button
        type="success"
        @click="handleShowLoadingBar"
      >
        Show LoadingBar
      </n-button>
      <span class="ml-3" />
    </div>

    <div class="mb-8">
      <h2 class="text-2xl mb-4">
        Pinia
      </h2>
      <span class="text-[18px]">I'm {{ userInfo.name }}, I'm {{ userInfo.age }} year old.</span>
    </div>

    <div class="mb-8">
      <h2 class="text-2xl mb-4">
        VueUse
      </h2>
      <span class="text-[18px]">pos: {{ x }}, {{ y }}</span>
    </div>

    <div class="mb-8">
      <h2 class="text-2xl mb-4">
        Fetch
      </h2>
      <n-button
        type="success"
        @click="handleLogin"
      >
        Do Login
      </n-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  h1 {
    color: $textColor;
  }
}
</style>

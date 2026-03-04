<script setup>
import {useWindowsStore} from '@/stores/windows'
import { onMounted } from 'vue';

const windowsStore = useWindowsStore()

const gridHeight = ref("")

const openWindow = (windowId) => {
    const payload = {
        windowState: "open",
        windowId: windowId
    }
    windowsStore.setWindowState(payload)
}

const openHelloHand = () => {
    window.open("/hellohand/");
}


const getImagePath = (iconImage) => {
    const path = `../assets/win95Icons/${iconImage}`;
    const modules = import.meta.glob("../assets/win95Icons/*", { eager: true });
    const mod = modules[path]
    return mod.default;
};

onMounted(() => {
    let gridH = windowsStore.getFullscreenWindowHeight
    gridHeight.value = gridH.substring(0, gridH.length - 2) - 60 + "px"
})
</script>

<template>
    <nav class="grid-container" :style="{ height: gridHeight }">
    <li>
      <button
        class="icon"
        @touchstart="openHelloHand()"
        @dblclick="openHelloHand()"
      >
      <img class="icon-image" src="@/assets/FileWindow/file.png" alt="hellohand" />
        <div class="border-box">
          <p class="icon-text">
            HelloHand
          </p>
        </div>
      </button>
    </li>
    <li v-for="window in windowsStore.windows" :key="window.key">
      <button
        class="icon"
        v-if="window.showInAppGrid != false"
        @touchstart="openWindow(window.windowId)"
        @dblclick="openWindow(window.windowId)"
      >
      <img class="icon-image" :src=getImagePath(window.iconImage) :alt="window.altText" />
        <div class="border-box">
          <p class="icon-text">
            {{ window.displayName }}
          </p>
        </div>
      </button>
    </li>
  </nav>
</template>
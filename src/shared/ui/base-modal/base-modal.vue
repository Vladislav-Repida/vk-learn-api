<template>
  <teleport to="body">
    <transition>
      <div v-if="active" class="base-modal__wrapper" @mousedown.self="close">
        <div class="base-modal__content">
          <button class="base-modal__close-button" @mousedown="close">
            <span class="mdi mdi-close" />
          </button>
          <h2 v-if="title" class="base-modal__title">{{ title }}</h2>
          <slot></slot>
          <div class="base-modal__buttons">
            <slot name="buttons"></slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>
<script lang="ts" setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  title: String,
});
const emit = defineEmits(["close"]);

const close = () => emit("close");
</script>
<style lang="less" scoped>
.v-enter-active,
.v-leave-active {
  transition: 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(5px);
}

.base-modal {
  &__wrapper {
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(87, 91, 139, 0.25);
    z-index: 100;
    cursor: pointer;
  }

  &__content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);

    max-width: 600px;
    width: 100%;
    padding: 24px 28px;
    border-radius: 8px;
    background-color: #fff;

    cursor: default;
  }

  &__close-button {
    position: absolute;
    right: 4px;
    top: 4px;

    display: flex;
    align-items: center;
    justify-content: center;

    // padding: 5px;
    margin: 0;

    // line-height: 0;
    border-radius: 50%;
    outline: none;
    border: none;

    background-color: transparent;

    user-select: none;
    cursor: pointer;

    transition: 0.2s;
    font-size: 22px;
    color: #252525;

    &:hover {
      opacity: 0.75;
    }
  }

  &__title {
    display: block;
    font-size: 20px;
    font-weight: 500;

    margin-bottom: 20px;
  }

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    gap: 14px;

    margin-top: 20px;
  }
}
</style>

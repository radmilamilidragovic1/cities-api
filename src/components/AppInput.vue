<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: [String, undefined],
    default: undefined,
  },
  label: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="input-container">
    <input
      :id="props.id"
      :type="props.type"
      :value="props.modelValue"
      @input="(event) => emit('update:modelValue', event.target.value)"
      class="input px-lg pt-lg pb-xs"
      placeholder=" "
    />
    <label :for="props.id" class="label">{{ props.label }}</label>
  </div>
</template>

<style lang="css" scoped>
.input-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 16px;
}

.input {
  display: block;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  width: 100%;
  font-size: 16px;
  color: white;
  background-color: rgba(64, 64, 64, 0.5);
  padding: 16px 12px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  background-color: rgba(64, 64, 64, 0.7);
}

.input:hover {
  border-color: rgba(255, 255, 255, 0.5);
}

.label {
  transition:
    transform 0.2s ease-in-out,
    font-size 0.2s ease-in-out,
    color 0.2s ease-in-out;
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translateY(-50%);
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  pointer-events: none;
}

.input:focus + .label,
.input:not(:placeholder-shown) + .label {
  transform: translateY(-150%);
  font-size: 12px;
  color: rgba(255, 255, 255, 1);
}
</style>
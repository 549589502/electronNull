<template>
  <div>
    <h1>Login Page</h1>
    <input v-model="textToCopy" placeholder="输入要复制的文本" />
    <button @click="copyToClipboard">复制到剪贴板</button>
    <button @click="readFromClipboard">从剪贴板读取</button>
    <p v-if="clipboardText">剪贴板内容: {{ clipboardText }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
// 引入 clipboard 模块
const { clipboard } = require('electron');

// 定义要复制的文本
const textToCopy = ref('');
// 定义从剪贴板读取的文本
const clipboardText = ref('');

// 复制文本到剪贴板的方法
const copyToClipboard = () => {
  if (textToCopy.value) {
    clipboard.writeText(textToCopy.value);
    alert('文本已复制到剪贴板');
  }
};

// 从剪贴板读取文本的方法
const readFromClipboard = () => {
  clipboardText.value = clipboard.readText();
};
</script>
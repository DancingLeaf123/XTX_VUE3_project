import { computed, onUnmounted, ref } from "vue";
import dayjs from "dayjs";
export const useCountDown = () => {
  // 优化
  let timer = null;
  // 响应式数据
  const time = ref(0);
  const formatTime = computed(() => dayjs.unix(time.value).format("mm分ss秒"));
  // 开启倒计时的函数
  const start = (curTime) => {
    // 开始倒计时的逻辑
    time.value = curTime;
    setInterval(() => {
      time.value--;
    }, 1000);
  };
  onUnmounted(() => {
    timer && clearInterval(timer);
  });
  return {
    formatTime,
    start,
  };
};

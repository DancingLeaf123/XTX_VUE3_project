import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore(
  "cart",
  () => {
    // 定义state cartList
    const cartList = ref([]);
    // 定义action addCart
    const addCart = (goods) => {
      console.log("添加", goods);
      // 添加购物车操作
      const item = cartList.value.find((item) => goods.skuId === item.skuId);
      if (item) {
        item.count++;
      } else {
        cartList.value.push(goods);
      }
    };
    return {
      cartList,
      addCart,
    };
  },
  {
    persist: true,
  }
);

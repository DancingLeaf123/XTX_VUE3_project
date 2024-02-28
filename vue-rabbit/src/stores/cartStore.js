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

    // 删除购物车
    const delCart = (skuId) => {
      // 思路
      // 下标，splice
      const idx = cartList.value.findIndex((item) => {
        skuId = item.skuId;
      });
      cartList.value.splice(idx, 1);
    };
    return {
      cartList,
      addCart,
      delCart
    };
  },
  {
    persist: true,
  }
);

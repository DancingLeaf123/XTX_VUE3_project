import { defineStore } from "pinia";
import { ref, computed } from "vue";

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

    // 单选功能
    const singleCheck = (skuId, selected) => {
      const item = cartList.value.find((item) => item.skuId === skuId);
      item.selected = selected;
    };

    const allCount = computed(() =>
      cartList.value.reduce((a, c) => a + c.count, 0)
    );
    const allPrice = computed(() =>
      cartList.value.reduce((a, c) => a + c.count * c.price, 0)
    );
    return {
      cartList,
      allCount,
      allPrice,
      addCart,
      delCart,
      singleCheck
    };
  },
  {
    persist: true,
  }
);

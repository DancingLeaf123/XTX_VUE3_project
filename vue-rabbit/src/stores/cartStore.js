import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useUserStore } from "./user";
import { insertCartAPI, findNewCartListAPI, delCartAPI } from "@/apis/cart";
export const useCartStore = defineStore(
  "cart",
  () => {
    const userStore = useUserStore();
    const isLogin = computed(() => userStore.userInfo.token);
    // 定义state cartList
    const cartList = ref([]);
    const updateNewList = async () => {
      const res = await findNewCartListAPI();
      cartList.value = res.result;
    };
    // 定义action addCart
    const addCart = async (goods) => {
      const { skuId, count } = goods;
      if (isLogin.value) {
        await insertCartAPI({ skuId, count });
        updateNewList();
        // 登录之后的加入购物车逻辑
      } else {
        console.log("添加", goods);
        // 添加购物车操作
        const item = cartList.value.find((item) => goods.skuId === item.skuId);
        if (item) {
          item.count++;
        } else {
          cartList.value.push(goods);
        }
      }
    };

    // 删除购物车
    const delCart = async (skuId) => {
      if (isLogin.value) {
        // 接口购物车删除功能
        await delCartAPI([skuId]);
        updateNewList();
      } else {
        // 思路
        // 下标，splice
        const idx = cartList.value.findIndex((item) => {
          skuId = item.skuId;
        });
        cartList.value.splice(idx, 1);
      }
    };

    // 清除购物车
    const clearCart = () => { 
      cartList.value = [];
    }

    // 单选功能
    const singleCheck = (skuId, selected) => {
      const item = cartList.value.find((item) => item.skuId === skuId);
      item.selected = selected;
    };

    // 全选功能
    const allCheck = (selected) => {
      cartList.value.forEach((item) => (item.selected = selected));
    };

    // 计算属性
    const allCount = computed(() =>
      cartList.value.reduce((a, c) => a + c.count, 0)
    );
    const allPrice = computed(() =>
      cartList.value.reduce((a, c) => a + c.count * c.price, 0)
    );

    // 3.已选择数量
    const selectedCount = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count, 0)
    );
    // 价钱合计
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count * c.price, 0)
    );

    const isAll = computed(() => cartList.value.every((item) => item.selected));

    return {
      cartList,
      allCount,
      allPrice,
      isAll,
      selectedCount,
      selectedPrice,
      clearCart,
      allCheck,
      addCart,
      delCart,
      singleCheck,
    };
  },
  {
    persist: true,
  }
);

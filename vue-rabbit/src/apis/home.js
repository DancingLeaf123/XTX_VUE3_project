import httpInstance from "@/utils/http";

//  获取banner

export function getBannerAPI(paramas = {}) {
  // 默认为1 商品为2
  const { distributionSite = 1 } = paramas;
  return httpInstance({
    url: "/home/banner",
    params: {
      distributionSite,
    },
  });
}

/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const findNewAPI = () => {
  return httpInstance({
    url: "/home/new",
  });
};

export const getHotAPI = () => {
  return httpInstance({
    url: "/home/hot",
  });
};

/**
 * @description: 获取所有商品模块
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = () => {
  return httpInstance({
    url: "/home/goods",
  });
};

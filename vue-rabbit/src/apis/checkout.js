import httpInstance from "@/utils/http";

export function getCheckoutAPI() {
  return httpInstance({
    url: "/member/order/pre",
  });
}

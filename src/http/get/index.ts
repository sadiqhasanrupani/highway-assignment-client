import { getRequest } from "@/utils";

export default function getUserDetailHandler() {
  return getRequest("/user/current");
}

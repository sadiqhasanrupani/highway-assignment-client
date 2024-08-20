import { UpdatePassBody } from "@/types";
import { patchRequest } from "@/utils";

export function updatePasswordHandler(body: UpdatePassBody) {
  return patchRequest("/auth/reset-password", body);
}

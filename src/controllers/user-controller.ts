import { userService } from "@/services";

export const userController = {
  handleLogin(username: string) {
    return userService.login(username);
  },
};

import { userRepository } from "@/repositories/user-repository";

export const userService = {
  async login(username: string) {
    return (
      (await userRepository.findByUsername(username)) ??
      userRepository.create(username)
    );
  },
};

import { Controller, Post, Route, Tags } from "tsoa";

@Route("user")
@Tags("User Routes")
export class UserController extends Controller {
  @Post("")
  async registerUser() {
    return {};
  }
}

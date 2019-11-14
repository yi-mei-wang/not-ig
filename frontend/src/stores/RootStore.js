import UserStore from "./UserStore";
import LoadingStore from "./LoadingStore";

class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
    this.loadingStore = new LoadingStore(this);
  }
}

export default RootStore;

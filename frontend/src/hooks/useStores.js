import { MobXProviderContext } from "mobx-react";
import { useContext } from "react";

export default function useStore() {
  return useContext(MobXProviderContext);
}

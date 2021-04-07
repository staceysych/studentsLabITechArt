import { useState, useEffect } from "react";

import { PAGE_ACTIONS } from "../redux/actions/creators";

export function useFetchData(url: string, dispatch, products) {
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      try {
        console.log("fetching");
        setLoading(true);
        await dispatch(PAGE_ACTIONS.getProducts(url));
        setLoading(false);
      } catch (e) {
        setLoading(true);
        window.alert(e);
      }
    }

    loadData();
  }, [products]);

  return [isLoading];
}

import React, { useEffect } from "react";
import {
  useRouter,
  Redirect
} from "../../provider/routers";
import { useAuth } from "../../provider/auth";

const REDIRECT = "/employees"
export default React.memo(function Layout({props,children}) {
  const { authenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authenticated) {
      router.push("/login");
    }
  }, [authenticated, router]);

  return (
    <div className="app">
      <Redirect to={REDIRECT}/>
      {children}
    </div>
  );
});

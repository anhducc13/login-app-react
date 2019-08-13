import React, { useEffect, useState } from "react";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

export default ({ loader, loading }) => props => {
  const [loadedComponent, setComponent] = useState(null);

  // this works like componentwillMount
  if (!nprogress.isStarted()) nprogress.start();

  if (loadedComponent) nprogress.done();

  useEffect(() => {
    let mounted = true;

    if (mounted)
      loader().then(
        ({ default: C }) => mounted && setComponent(<C {...props} />)
      );

    // componentUnMount
    return () => (mounted = false);
  }, []);

  // return the loaded component
  const Component = loadedComponent || loading || <div />;
  return Component;
};
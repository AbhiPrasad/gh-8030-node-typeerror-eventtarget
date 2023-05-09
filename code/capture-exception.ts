// capture-exception.ts

import { captureException as sentryCaptureException } from "@sentry/nextjs";

import { FsError } from "../code/fserror";

// import { isBrowser } from "../hooks/use-device-info";
// import { isProd } from "../util/deploy-env";

const isBrowser = false;
const isProd = true;

export const captureException = (
  fsError: FsError,
  metadata: Record<string, unknown> = {}
) => {
  const extra = {
    originalException: fsError.error,
    originalExceptionStringified: JSON.stringify(fsError.error),
    ...metadata,
  };

  if (!isBrowser || (isBrowser && !isProd)) {
    /* eslint-disable no-console */
    // commenting these 2 lines out makes the error go away
    console.log("error", fsError);
    console.log("metadata", extra);
    /* eslint-enable no-console */
  }

  sentryCaptureException(fsError, {
    extra,
  });
};

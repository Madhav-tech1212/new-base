import { Client as WorkflowClient } from "@upstash/workflow";

import { QSTASH_TOKEN,QSTASH_URL } from "./env.js";

export const workflowClient = new WorkflowClient({
    baseUrl: QSTASH_URL,
    token: QSTASH_TOKEN,
//     signingKey: {
//         current: QSTASH_CURRENT_SIGNING_KEY,
//         next: QSTASH_NEXT_SIGNING_KEY,
//   },
});


// npx @upstash/qstash-cli dev
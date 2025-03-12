import {
  buildWispClient,
  GetPostsResult,
  GetPostResult,
} from "@wisp-cms/client";

export const wisp = buildWispClient({
  blogId: "cm84k9cdp0000djrb4s8p3cs0",
});

export type { GetPostsResult, GetPostResult };

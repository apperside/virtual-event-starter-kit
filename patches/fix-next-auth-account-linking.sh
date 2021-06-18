# This patch addresses this issue
# https://github.com/nextauthjs/next-auth/pull/1002
diff -Naur node_modules/next-auth/dist/server/lib/callback-handler.js patches/next-auth/dist/server/lib/callback-handler.js > patches/next-auth/dist/server/lib/callback-handler.js.patch
patch --forward node_modules/next-auth/dist/server/lib/callback-handler.js < patches/next-auth/dist/server/lib/callback-handler.js.patch
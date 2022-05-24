import {precacheAndRoute} from "workbox-precaching";
import {CacheFirst} from "workbox-strategies";
import {registerRoute} from "workbox-routing";

if (process.env['NODE_ENV'] === 'production') {
  registerRoute(
    /assets\/images\/icons\/icon-.+\.png$/,
    new CacheFirst({
      cacheName: 'icons'
    })
  );

  // @ts-ignore
  precacheAndRoute(self.__WB_MANIFEST);
}

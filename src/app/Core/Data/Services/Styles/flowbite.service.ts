import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FlowbiteService {
  constructor(@Inject(PLATFORM_ID) private readonly platformId: never) {}

  async initFlowbite() {
    if (isPlatformBrowser(this.platformId)) {
      const flowbite = await import('flowbite');
      flowbite.initFlowbite();
    }
  }
}

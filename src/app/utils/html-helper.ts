import { DomSanitizer } from "@angular/platform-browser";
import { ServiceLocator } from "./service-locator";

export function safeHtml(html: string) {
    const domSanitizer: DomSanitizer = ServiceLocator.injector.get(DomSanitizer);
    return domSanitizer.bypassSecurityTrustHtml(html);
}
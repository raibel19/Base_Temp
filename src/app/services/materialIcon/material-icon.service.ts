import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MaterialIconsEnum } from 'src/app/shared/models/icons.model';

@Injectable({
  providedIn: 'root'
})
export class MaterialIconService {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) { }

  public registerIcons(): void {
    this.loadIcons(Object.values(MaterialIconsEnum), '../../assets/icons/material/24dp');
  }

  private loadIcons(iconskeys: string[], iconUrl: string): void {
    iconskeys.forEach(key => {
      this.matIconRegistry.addSvgIcon(key, this.domSanitizer.bypassSecurityTrustResourceUrl(`${iconUrl}/${key}.svg`));
    });
  }
}

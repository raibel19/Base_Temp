import { AriaLivePoliteness } from '@angular/cdk/a11y';
import { ViewContainerRef } from '@angular/core';
import { Direction } from '@angular/cdk/bidi';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

export enum SnackBarIcons {
    success = 'check_circle',
    error = 'error',
    info = 'info',
    warning = 'warning',
    bug = 'bug_report',
    nube = 'cloud_circle',
    wiffiOff = 'signal_wifi_off',
    wiffiOn = 'signal_wifi_4_bar'
}

export interface SnackBarFC<D = any> {
    politeness?: AriaLivePoliteness;
    announcementMessage?: string;
    viewContainerRef?: ViewContainerRef;
    duration?: number;
    panelClass?: string | string[];
    direction?: Direction;
    data?: {
        message?: D | null;
        icon?: SnackBarIcons;
        colorIcon?: string;
        class?: string,
        closeBtn?: boolean;
        bugFlag?: boolean;
    };
    horizontalPosition?: MatSnackBarHorizontalPosition;
    verticalPosition?: MatSnackBarVerticalPosition;
}

export const snackBarDefaultFC: Partial<SnackBarFC> = {
    politeness: 'polite',
    announcementMessage: null,
    viewContainerRef: null,
    duration: 8000,
    panelClass: null,
    direction: null,
    data: {
        message: null,
        icon: SnackBarIcons.success,
        colorIcon: 'green',
        class: null,
        closeBtn: true,
        bugFlag: false
    },
    horizontalPosition: 'right',
    verticalPosition: 'top'
};

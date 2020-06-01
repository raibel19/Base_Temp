import { NavModel } from './models/nav.model';

export const MENU_ROUTES: Array<NavModel> = [
    new NavModel({
        icon: 'flash_on',
        path: '/log',
        showInHeader: true,
        useOnlyIcon: true,
        showInXs: true,
        showInMenu: true,
        title: 'Inicio Angular App'
    }),
    new NavModel({
        icon: 'notifications',
        path: '/swnotification',
        title: 'Notif. Push'
    }),
    new NavModel({
        icon: 'bug_report',
        path: '/log',
        title: 'Log'
    })
];

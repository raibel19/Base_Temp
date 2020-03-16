export interface IPushSubscription {
    endpoint?: string | undefined;
    auth?: string | undefined;
    p256Dh?: string | undefined;
}

export interface INotificationModel {
    title?: string | undefined;
    message?: string | undefined;
    url?: string | undefined;
    vapidDetails?: IVapidDetails | null;
}

export interface IVapidDetails {
    subject: string | undefined;
    publickey: string | undefined;
    privatekey: string |undefined;
}
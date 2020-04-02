export class NavModel {
    title: string;
    path: string;
    icon: string;
    translate: string;
    children: Array<NavModel>;
    // false: no muestra el icono en el header
    // true: muestra el icono en el header
    // nota: en cualquiera de las dos opciones se sigue mostrando en el menú
    showInHeader = false;
    // false: muestra un boton
    // true: muestra un icono como boton
    useOnlyIcon = false;
    // aun no se
    showInXs = false;
    // false: no muestra el icono en el menu
    // true: muestra el icono en el menú
    showInMenu = true;

    constructor(obj?: Partial<NavModel>) {
        Object.assign(this, obj);
    }
}

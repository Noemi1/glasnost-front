import { Component, OnDestroy, OnInit } from '@angular/core';
import { faCity, faHandHoldingDollar, faIdCard, faLink, faMagnifyingGlass, faPercent, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/models/account-perfil.model';
import { Header } from 'src/app/utils/header';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnDestroy {
    Role = Role;
    faHandHoldingDollar = faHandHoldingDollar;
    faMagnifyingGlass = faMagnifyingGlass;
    faUsers = faUsers;
    faPercent = faPercent;
    faCity = faCity;
    faIdCard = faIdCard;
    faLink = faLink;
    menuOpen: boolean = false;
    subscription: Subscription[] = [];
    search: string = '';
    gfg: any[] = [];


    constructor(
        private header: Header,
    ) {
        this.menuOpen = this.header.aside;

        var open = this.header.open.subscribe(res => this.menuOpen = res);
        this.subscription.push(open);
        this.setMenu();

    }

    ngOnDestroy(): void {
        this.subscription.forEach(item => item.unsubscribe());
    }

    toggleAside() {
        this.header.toggleMenuAside();
    }

    filtrarNodes(event: any) {
        var search = this.search.toLowerCase();
        this.gfg = this.gfg.map(menu => {
            var items = [];
            if (menu.items && menu.items.length > 0) {
                items = menu.items.map((subitem: any) => {
                    var name = subitem.label.toLowerCase();
                    subitem.visible = name.includes(search) || search.includes(name);
                    return subitem;
                })
            }

            var menuLabel = menu.label.toLowerCase();
            var filter = menuLabel.includes(search) || search.includes(menuLabel) 

            menu.visible = items.filter((x: any) => x.visible).length > 0 || filter;
            menu.collapsed = items.filter((x: any) => x.visible).length == 0;
            menu.items = items;
            return menu;
        });
    }
    setMenu() {
        var i = 1;
        this.gfg = [
            {
                id: i++,
                label: 'Dashboard',
                routerLink: '/dashboard',
                visible: true,
            },
            {
                id: i++,
                label: 'Gestão do Cliente',
                collapsed: true,
                visible: true,
                items: [
                    {
                        id: i++,
                        label: 'Acionistas',
                        routerLink: "/acionistas",
                        visible: true,
                    },
                    {
                        id: i++,
                        label: 'Comunicados',
                        routerLink: "/comunicados",
                        visible: true,
                    },
                    {
                        id: i++,
                        label: 'Denúncias',
                        routerLink: "/denuncias",
                        visible: true,
                    },
                    {
                        id: i++,
                        label: 'Denúncias - Relatórios',
                        routerLink: "/denuncias-relatorios",
                        visible: true,
                    },
                    {
                        id: i++,
                        label: 'Documentos',
                        routerLink: "/documentos",
                        visible: true,
                    },
                    {
                        id: i++,
                        label: 'DueDiligence',
                        routerLink: "/due-diligence",
                        visible: true,
                    },
                    {
                        id: i++,
                        label: 'Estatutários',
                        routerLink: "/estatutarios",
                        visible: true,
                    },
                    {
                        id: i++,
                        label: 'Organograma',
                        routerLink: "/organograma",
                        visible: true,
                    },
                    {
                        id: i++,
                        label: 'Partes Relacionadas',
                        routerLink: "/partes-relacionadas",
                        visible: true,
                    },
                    {
                        id: i++,
                        label: 'Pessoas/Empresas',
                        routerLink: "/pessoas-empresas",
                        visible: true,
                    },
                    {
                        id: i++,
                        label: 'Pessoas Qualificadas',
                        routerLink: "/pessoas-qualificadas",
                        visible: true,
                    },
                    {
                        id: i++,
                        label: 'Procuradores',
                        routerLink: "/procuradores",
                        visible: true,
                    },
                    {
                        id: i++,
                        label: 'Treinamentos',
                        routerLink: "/treinamentos",
                        visible: true,
                    },
                    {
                        id: i++,
                        label: 'Usuários',
                        routerLink: "/usuarios",
                        visible: true,
                    },
                    {
                        id: i++,
                        label: 'Usuários Responsáveis',
                        routerLink: "/usuarios-responsaveis",
                        visible: true,
                    },

                ],
            },
            {
                id: i++,
                label: 'Cadastros Gerais',
                collapsed: true,
                visible: true,
                items: [
                    {
                        id: i++,
                        label: 'Áreas / Cargos',
                        routerLink: "/areas-cargos",
                        visible: true,
                    },
                    {
                        id: i++,
                        label: 'Clientes',
                        routerLink: "/clientes",
                        visible: true,
                    },
                    {
                        id: i++,
                        label: 'Gestão de Treinamentos',
                        routerLink: "/gestao-de-treinamentos",
                        visible: true,
                    },
                    {
                        id: i++,
                        label: 'Prospects',
                        routerLink: "/prospects",
                        visible: true,
                    },
                    {
                        id: i++,
                        label: 'Qualificações',
                        routerLink: "/qualificacoes",
                        visible: true,
                    },
                ]
            }
        ];
    }
    setMenuCollapsed() {
      
    }
    
}

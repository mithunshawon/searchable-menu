import React, { Component} from 'react';

export default class MenuComponent extends Component{

    renderMenu = menu => {
        if(menu.childMenus.length){
            return (
                <li key={menu.Id}>
                    {menu.Name}
                    <ul>
                        {
                            menu.childMenus.map(c=> this.renderMenu(c))
                        }
                    </ul>
                </li>
            );
        }
        else if(!menu.childMenus.length){
            return (<li key={menu.Id} > {menu.Name} </li>);
        }
        return null;
    }

    getMenus = data => {
        let menus = data.filter(d=> !d['ParentCategoryId']);
        menus.forEach(menu => this.addChildMenus(data, menu));
        return menus;
    }

    addChildMenus = (data, parent) => {
        let children = data.filter(m => m['ParentCategoryId'] === parent['Id']);
        parent.childMenus = [...children];
        children.forEach(menu=>this.addChildMenus(data, menu));
    }

    render(){
        let menus = this.getMenus(this.props.menus);
        return (
            <ul>
                {menus.map(m=> this.renderMenu(m))}
            </ul>
        );
    }

}
import React, { Component} from 'react';
import rawData from './categories.json';
import TextSearchComponent from './TextSearch.component';
import MenuComponent from './Menu.component';

export default class HomeComponent extends Component {

    constructor(){
        super();
        let data = [...rawData];
        this.state={
            menus:data
        }
    }

    filterMenus = value => {
        let copyData = [...rawData];
        let filteredData = copyData.filter(c => c['ParentCategoryId'] === 0 || (c['Name'].toLowerCase().indexOf(value.toLowerCase()) > -1 ));
        let insertedIds = filteredData.map(({Id}) => Id);
        filteredData.forEach(f => {
            if(f['ParentCategoryId'] && insertedIds.findIndex(x => x === f['ParentCategoryId'] ) < 0)
            {
                let d = copyData.filter(c => c['Id'] === f['ParentCategoryId'])[0];
                filteredData.push(d);
                insertedIds.push(d['Id']);
            } 
        });

        this.setState({
            menus:[...filteredData]
        });
    }

    render(){
        return (
            <div style={{width: 400 , textAlign: 'left'  }}>
                <TextSearchComponent onTextSearch={this.filterMenus}/>
                <MenuComponent menus = {this.state.menus} />
            </div>
        );
    }

}
import * as React from "react";
import { ListItem } from 'material-ui/List';

import { Colors } from '../constants';

export interface DisplayListItemProps { title: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class DisplayListItem extends React.Component<DisplayListItemProps, undefined> {
    render() {
        return (
            <ListItem innerDivStyle={{ color: Colors.secondaryTextColor }}
                primaryText={this.props.title} />
        );
    }
}

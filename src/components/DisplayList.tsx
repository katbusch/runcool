import * as React from "react";
import { DisplayListItem } from "./DisplayListItem";
import { List } from 'material-ui/List';

export interface DisplayListProps { titles: Array<string>; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class DisplayList extends React.Component<DisplayListProps, undefined> {

    updateList(titles: Array<string>) {
        this.setState({ titles });
    }

    render() {
        return (
            <List>
                {this.props.titles.map((title) => <DisplayListItem key={title} title={title} />)}
            </List>
        );
    }
}

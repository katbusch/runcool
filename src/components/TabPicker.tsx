import * as React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';

export interface TabPickerProps {
    labels: string[];
    values: string[];
    initialSelectedValue?: string;
    onSelectionChange: (value: string) => void;
}

export class TabPicker extends React.Component<TabPickerProps, undefined> {
    render() {
        const tabs = this.props.values.map((value, index) =>
            <Tab key={index} value={value} label={this.props.labels[index]}
                onActive={() => this.props.onSelectionChange(value)}
            />);
        return <Tabs initialSelectedIndex={
            this.props.initialSelectedValue ?
                this.props.values.indexOf(this.props.initialSelectedValue) : 0
        }>
            {tabs}
        </Tabs>;
    }
}


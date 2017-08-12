import Paper from 'material-ui/Paper';
import * as React from "react";

interface PaperHolderProps {
    style?: React.CSSProperties;
}

export class PaperHolder extends React.Component<PaperHolderProps, undefined> {
    defaultStyle: React.CSSProperties = { borderRadius: '10px', padding: '30px', margin: '10px' };

    render() {
        return (
            <Paper zDepth={1} style={{ ...this.defaultStyle, ...this.props.style }}>
                {this.props.children}
            </Paper>
        );
    }
}

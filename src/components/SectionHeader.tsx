import * as React from "react";

export class SectionHeaderProps {
    subheaderText?: string;
}

export class SectionHeader extends React.Component<SectionHeaderProps, undefined> {
    render() {
        return (
            <div style={{
                paddingTop: '18px',
                paddingBottom: this.props.subheaderText ? '16px' : '0px',
                fontSize: '16px'
            }}>
                {this.props.children}
                {this.props.subheaderText ? <div style={{
                    paddingTop: '4px',
                    fontSize: '14px',
                    color: 'rgba(0, 0, 0, 0.54)',
                }}>{this.props.subheaderText}</div> : null}
            </div>
        );
    }
}

import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export class Task extends React.Component { 

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Card  variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {this.props.description}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {this.props.status}  - {this.props.dueDate.format('DD-MM-YYYY')} 
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {this.props.RName}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }

}
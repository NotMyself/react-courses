'use strict';

var React = require('react');
var TextInput = require('../common/textInput');

var AuthorForm = React.createClass({
    propTypes: {
        author: React.PropTypes.object.isRequired,
        onSave: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        errors: React.PropTypes.object
    },

    render: function() {
        return (
            <form>
                <h1>Manage Author</h1>
                <TextInput name="firstName"
                    label="First Name"
                    value={this.props.author.firstName}
                    error={this.props.errors.firstName}
                    onChange={this.props.onChange} />

                <TextInput name="lastName"
                    label="Last Name"
                    value={this.props.author.lastName}
                    error={this.props.errors.lastName}
                    onChange={this.props.onChange} />
               
                <input type="submit" value="Save" 
                    className="btn btn-default"
                    onClick={this.props.onSave} />
            </form>
        );
    }
});

module.exports = AuthorForm;
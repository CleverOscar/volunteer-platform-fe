import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import { Input, Form } from "antd";

const InputStyled = styled( Input )`
 && {
 
 }
`;

const formItemLayout = {
	labelCol: {
		xs: { span: 24 }, sm: { span: 8 },
	}, wrapperCol: {
		xs: { span: 24 }, sm: { span: 16 },
	},
};

export const StyledInput = ( props ) => {
	debugger;
	let camelCase = "";
	if( props.name ){
		camelCase = props.name.split( " " );
		for( let i = 0; i < camelCase.length; i++ ){
			camelCase[ i ] = camelCase[ i ].toLowerCase();
			if( i > 0 ){
				camelCase[ i ] = camelCase[ i ].charAt( 0 ).toUpperCase() +
					camelCase[ i ].slice( 1 );
			}
		}
		camelCase = camelCase.join( "" );
	}
	
	return ( <Form.Item { ...formItemLayout } label={ props.name }>
		<InputStyled name={ camelCase } value={ props.values[ camelCase ] }
								 onChange={ props.onChange }/>
		{ props.child && props.children }
	</Form.Item> );
};

StyledInput.propTypes = {
	name: PropTypes.string.required,
	values: PropTypes.objectOf(PropTypes.any),
};
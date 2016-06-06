import React from 'react';
import { ArrowIcon } from '../../../../index';

export default React.createClass({
	render() {
		return (
			<div>
				<div>
					<ArrowIcon />
				</div>
				<div>
					<ArrowIcon direction='up' />
					<ArrowIcon direction='down' />
					<ArrowIcon direction='left' />
					<ArrowIcon direction='right' />
				</div>
				<div>
					<ArrowIcon direction='up' isBadge />
					<ArrowIcon direction='down' isBadge />
					<ArrowIcon direction='left' isBadge />
					<ArrowIcon direction='right' isBadge />
				</div>
			</div>
		);
	},
});

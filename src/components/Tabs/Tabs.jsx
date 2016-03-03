import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';
import { bindClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition } from '../../util/component-definition';
import reducers from './Tabs.reducers';

const boundClassNames = bindClassNames('Tabs');

const {
	any,
	string,
	number,
	bool,
	func,
} = React.PropTypes;

/**
 *
 * {"categories": ["navigation"]}
 *
 * `Tabs` provides tabbed navigation. It has a flexible interface that allows
 * tab content to be passed as regular React children or through props.
 */
const Tabs = React.createClass(createLucidComponentDefinition({
	displayName: 'Tabs',

	childProps: {
		Tab: null, // we're only interested in children
		Title: null, // we're only interested in children
	},

	reducers,

	propTypes: {
		/**
		 * Styles that are passed through to the root container.
		 */
		style: any,

		/**
		 * While you can pass tab content through this prop, it's better to use the
		 * child component instead. See the examples for details.
		 */
		Tab: any.isRequired,

		/**
		 * `Title` can be a prop on `Tabs.Tab` or a child of `Tabs.Tab`. See the
		 * examples for details.
		 */
		Title: any,

		/**
		 * Class names that are appended to the defaults.
		 */
		className: string,

		/**
		 * Index of the currently selected tab.
		 */
		selectedIndex: number,

		/**
		 * Callback for when the user clicks a tab. Called with the index of the
		 * tab that was clicked.
		 */
		onSelect: func,

		/**
		 * If `true` then the active tab will appear open on the bottom.
		 */
		isOpen: bool,
	},

	getDefaultProps() {
		return {
			style: null,
			className: null,
			selectedIndex: 0,
			onSelect: _.noop,
			isOpen: true,
		};
	},

	render() {
		const {
			className,
			onSelect,
			selectedIndex,
			style,
			isOpen,
			...passThroughs,
		} = this.props;

		const tabChildProps = Tabs.Tab.findInAllAsProps(this.props);

		const rootClasses = classNames(className, boundClassNames('~'));

		return (
			<div
				{...passThroughs}
				style={style}
				className={rootClasses}
			>
				<ul className={boundClassNames('bar')}>
					{_.map(tabChildProps, (tabChildProp, index) => {
						return (
							<li
								className={boundClassNames('bar-item', {
									'bar-item-is-active': index === selectedIndex,
									'bar-item-is-active-and-open': isOpen && index === selectedIndex
								})}
								key={index}
								onClick={_.partial(onSelect, index)}
							>
								{_.get(_.first(Tabs.Title.findInAllAsProps(tabChildProp)), 'children', '')}
							</li>
						);
					})}
				</ul>
				<div className={boundClassNames('content')}>
					{_.get(tabChildProps[selectedIndex], 'children', '')}
				</div>
			</div>
		);
	}
}));

export default Tabs;

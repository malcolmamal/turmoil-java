import React from "react";
import {connect} from "react-redux";
import Window from "../../Window";
import ItemSlotStash from "./ItemSlotStash";
import '../../../stylesheets/window-stash.css';
import {initializeStash} from "../../../js/window-stash";
import {updateItemsInStashAction} from "../../../js/actions";

const mapStateToProps = state => {
	return { stashItems: state.stashItems };
};

function mapDispatchToProps(dispatch) {
	return {
		updateItems: stashItems => dispatch(updateItemsInStashAction(stashItems))
	};
}

class ConnectedStash extends React.Component
{
	constructor(props) {
		super(props);

		this.stashedItems = this.stashedItems.bind(this);
	}

	componentDidMount() {
		initializeStash()

		window.turmoil.ajax.exec({
			url: 'initializeStash',
			onSuccess: this.stashedItems
		});
	}

	stashedItems(content)
	{
		this.props.updateItems({stashItems: content});
	}

	render() {
		const background = {
			backgroundImage: "url('/images/windows/stash.png')",
			width: '500px',
			height: '700px',
		};

		return (
			<Window ident="stash" background={background}>
				<div id="stashItemContainerWrapper">
					<div id="stashItemContainer" className="stashItemContainer">
						<ul id="stashItemListContainer">

							{this.props.stashItems.map(item => (
								<ItemSlotStash item={item.ident}
											   rarity={item.rarity}
											   key={item.ident}
											   filePath={item.filePath}
											   fileCode={item.fileCode}
								/>
							))}

						</ul>
					</div>
				</div>
			</Window>
		);
	}
}

const Stash = connect(
	mapStateToProps,
	mapDispatchToProps
)(ConnectedStash);

export default Stash;
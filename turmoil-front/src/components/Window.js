import React from "react";
import Instance, {CharacterUnit, EnemyUnit} from "./Instance";
import {
	bringToTheTop,
	switchMinimizeMaximize,
	resizeToDefault,
	actionClose,
	actionMaximize,
	actionMinimize,
	switchShowClose
} from '../js/turmoil-windows'


class WindowIcon extends React.Component {
	render() {
		return (
			<div className="windowIcon instanceWindowIcon noSelection" onClick={() => switchShowClose('instance', true)}>
				<div className="windowIconHover"/>
				<div className="windowIconText noSelection">instance</div>
			</div>
		);
	}
}

export default class Window extends React.Component
{
	render() {
		const windowContainerInnerStyle = {
			backgroundImage: "url('/images/backgrounds/background_grunge_650x550.png')",
			width: '650px',
			height: '550px',
		}
		return (
			<div>
				<WindowIcon/>

				<div id="window_instance_resizer" className="windowResizer instanceWindowResizer" style={{display: 'none'}}>
					<div id="window_instance_wrapper" className="windowWrapper">
						<div id="handle_instance_container" className="handleContainer instanceHandleContainer"
							 style={{backgroundPosition: '0 -120px'}}
							 onClick={() => bringToTheTop('instance')}
							 onDoubleClick={() => switchMinimizeMaximize('instance')}
							 onContextMenu={() => resizeToDefault('instance')}
						>
							<div className="handleLeft" style={{backgroundPosition: '0 -120px'}}/>
							<div className="handleBox instanceHandleBox">Window: instance</div>
							<div className="handleRight" style={{backgroundPosition: '0 -120px'}}>
								<div id="windowButtons" style={{height: '40px', width: '75px'}}>
									<div id="instanceButtonMaximize"
										 className="icons iconMaximize"
										 style={{position: 'absolute', top: '7px', right: '33px', display: 'none'}}
										 title="maximize"
										 onClick={() => actionMaximize('instance')}>&nbsp;</div>
									<div id="instanceButtonMinimize"
										 className="icons iconMinimize"
										 style={{position: 'absolute', top: '7px', right: '33px'}}
										 title="minimize"
										 onClick={() => actionMinimize('instance')}>&nbsp;</div>
									<div className="icons iconClose"
										 style={{position: 'absolute', top: '7px', right: '8px'}}
										 title="close"
										 onClick={() => actionClose('instance')}
									>&nbsp;</div>
								</div>
							</div>
						</div>
						<div id="window_instance_content_wrapper"
							 style={{position: 'absolute', top: '40px', left: '0px'}}
							 onClick={() => bringToTheTop('instance')}
						>
							<div id="window_instance"
								 className="windowContent instanceWindowContent"
								 style={{transform: 'scale(1)', WebkitTransform: 'scale(1)', MozTransform: 'scale(1)', OTransform: 'scale(1)'}}>
								<div className="windowContentInner"
									 style={windowContainerInnerStyle}>
									<div id="instanceContainerWrapper" className="instanceContainerWrapper">
										<div id="instanceContainer" className="instanceContainer">

											<Instance/>
											<CharacterUnit/>
											<EnemyUnit/>

										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
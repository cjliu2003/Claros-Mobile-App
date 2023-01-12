// This JS defines an SVG for the padlock icon present onthe app native WebBrowser
import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

const Padlock = (props) => (
    <View style={{ height: props.height, width: props.width, transform: [{scale: props.scale}]}}>
        <Svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={props.width}
            height={props.height}
            >
                <Path
                    d="M2.74609 18.1006H11.2451C12.4229 18.1006 13.0029 17.5205 13.0029 16.2461V9.68066C13.0029 8.5293 12.5195 7.93164 11.5527 7.83496V5.66406C11.5527 2.32422 9.3291 0.71582 6.99121 0.71582C4.66211 0.71582 2.43848 2.32422 2.43848 5.66406V7.87012C1.5332 8.01074 0.988281 8.59082 0.988281 9.68066V16.2461C0.988281 17.5205 1.56836 18.1006 2.74609 18.1006ZM4.1084 5.49707C4.1084 3.43164 5.41797 2.31543 6.99121 2.31543C8.56445 2.31543 9.88281 3.43164 9.88281 5.49707V7.82617L4.1084 7.83496V5.49707Z"
                    fill="#1C1C1E"
                />
        </Svg>
    </View>
    
  );
  
export default Padlock;
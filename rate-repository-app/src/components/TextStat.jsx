import React from "react";
import { View } from "react-native";

import Text from "./Text";

const TextStat = ({number, text}) => (
  <View testID="textStat">
    <Text fontWeight="bold">
      {number >= 1000 
        ? number % 1000 === 0 
          ? number / 1000 + "k" 
          : (number / 1000).toFixed(1) + "k"
        : number
      }
    </Text>
    <Text color="textColorSecondary">
      {text}
    </Text>
  </View>
);

export default TextStat;
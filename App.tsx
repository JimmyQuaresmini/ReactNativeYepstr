/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  Switch,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';


const [isLoading, setLoading] = useState(true);
//const [data, setData] = useState([]);
const [cardImage, setCardImage] = useState("");
const [cardValue, setCardValue] = useState("");
const [cardSuit, setCardSuit] = useState("");
const [cardsLeft, setCardsLeft] = useState(52);
const [score, setScore] = useState(0);
const [isChecked, setChecked] = useState(false);

let previousCard = {rank: "", suit: ""};

const getCard = async () => {        
    try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
        const json = await response.json();        
        
        setCardImage(json.cards.image);
        setCardValue(json.cards.value);
        setCardSuit(json.cards.suit);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
}
useEffect(() => {
    getCard();
}, []);

const checkAndGetCard = () => {
    setCardsLeft(cardsLeft - 1);
    previousCard.rank = cardValue;
    previousCard.suit = cardSuit;

    getCard();        
    
    if (parseInt(cardValue) > parseInt(previousCard.rank) && { isChecked }  == "true") {
        setScore(score + 1);
    }
    else if (parseInt(cardValue) < parseInt(previousCard.rank) && { isChecked } === "false") {
        setScore(score + 1);
    }
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
      

  return (
    <SafeAreaView >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView>
        <View>          
          <Text >Guess higher (checked) or lower</Text>
          <Switch
            value={isChecked}
            onValueChange={(value) => setChecked(value)}
           />

          <Text >Currently picked card : {cardValue}, {cardSuit}</Text>
          <Image source={{uri: cardImage }} />
          <Button onPress={getCard} title="Pick card" accessibilityLabel="Pick a random new card via API" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


export default App;

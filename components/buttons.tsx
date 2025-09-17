import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type BellButtonProps = { 
  onPress: () => void; 
  isSelected: boolean; 
  id: string;
  image?: any;
  soundId?: string;
};

export const BellButton = ({ onPress, isSelected, id, image, soundId }: BellButtonProps) => (
  <Pressable onPress={onPress} style={styles.bellButton}>
    <View style={[styles.bellCircle, isSelected && styles.selectedBellCircle]}>
      {image && (
        <Image 
          source={image} 
          style={styles.bellImage}
          resizeMode="contain"
        />
      )}
    </View>
  </Pressable>
);

type GenericButtonProps = { 
  onPress: () => void; 
  text: string;
};

export const GenericButton = ({ onPress, text }: GenericButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable 
      onPress={onPress} 
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={[styles.genericButton, isPressed && styles.genericButtonPressed]}
    >
      <Text style={styles.genericButtonText}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  bellButton: {
    marginHorizontal: 12,
  },
  bellCircle: {
    width: 70, 
    height: 70, 
    borderRadius: 35, 
    backgroundColor: '#222', 
    borderWidth: 2,
    borderColor: '#444',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectedBellCircle: {
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    backgroundColor: '#ff6b35', 
    borderWidth: 3,
    borderColor: '#ff8c5a',
    shadowColor: '#ff6b35',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bellImage: {
    width: '80%',
    height: '80%',
  },
  genericButton: {
    backgroundColor: '#ff6b35', 
    paddingVertical: 18, 
    paddingHorizontal: 60, 
    borderRadius: 30,
    shadowColor: '#ff6b35',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8
  },
  genericButtonPressed: {
    transform: [{ scale: 1.05 }],
    backgroundColor: '#ff8c5a',
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  genericButtonText: {
    color: 'white', 
    fontSize: 20, 
    fontWeight: '700',
    letterSpacing: 1,
    textAlign: 'center'
  },
});